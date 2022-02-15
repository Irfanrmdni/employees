import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { authPages } from "../../../middlewares/authenticationPages";

export async function getServerSideProps(ctx) {
    const { token } = await authPages(ctx);
    const { id_employee } = ctx.query;

    const detailReq = await fetch('http://localhost:3000/api/posts/detail/' + id_employee, {
        headers: {
            'authorization': 'Bearer ' + token
        }
    });

    const respDetail = await detailReq.json();

    return {
        props: {
            token,
            detailEmployees: respDetail.data
        }
    }
}

export default function PostCreate(props) {

    const { detailEmployees } = props;

    const [fields, setFields] = useState({
        nip: detailEmployees.nip,
        name: detailEmployees.name,
        tempat_lahir: detailEmployees.tempat_lahir,
        tanggal_lahir: detailEmployees.tanggal_lahir,
        jenis_kelamin: detailEmployees.jenis_kelamin,
        status_nikah: detailEmployees.status_nikah,
        agama: detailEmployees.agama,
        telepon: detailEmployees.telepon,
        alamat: detailEmployees.alamat
    });

    const [status, setStatus] = useState('normal');

    async function updateHandler(e) {
        e.preventDefault();
        const { token } = props;

        setStatus('loading');
        const update = await fetch('/api/posts/update/' + detailEmployees.id_employee, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if (!update.ok) return setStatus('error');
        const res = await update.json();

        setStatus('success');
        Router.push('/posts');
    }

    function fieldsHandler(e) {
        e.preventDefault();
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    function checkStatus(status) {
        if (status === 'loading') {
            return 'loading'
        } else if (status === 'error') {
            return 'error'
        } else if (status === 'success') {
            return 'success'
        } else {
            return 'normal';
        }
    }

    return (
        <div className="create_posts">
            <Head>
                <title>Update Karyawan</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <small className={checkStatus(status)}>Status: <span>{status}</span></small>
            <div className="posts">
                <h1>update data karyawan</h1>
                <form onSubmit={updateHandler.bind(this)} className="form_posts">
                    <label htmlFor="nip" name="nip">NIP</label>
                    <input onChange={fieldsHandler.bind(this)} type="number" name="nip" id="nip" placeholder="Contoh: 123456" required defaultValue={fields.nip} />

                    <label htmlFor="name" name="name">Nama</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="name" id="name" placeholder="Contoh: Anisa rahma" required defaultValue={fields.name} />

                    <label htmlFor="tempat_lahir" name="tempat_lahir">Tempat lahir</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="tempat_lahir" id="tempat_lahir" placeholder="Contoh: Jakarta" required defaultValue={fields.tempat_lahir} />

                    <label htmlFor="tanggal_lahir" name="tanggal_lahir">Tanggal lahir</label>
                    <input onChange={fieldsHandler.bind(this)} type="date" name="tanggal_lahir" id="tanggal_lahir" placeholder="Contoh: 22/09/2005" required defaultValue={fields.tanggal_lahir} />

                    <label htmlFor="jenis_kelamin" name="jenis_kelamin">Jenis kelamin</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="jenis_kelamin" id="jenis_kelamin" placeholder="Contoh: Pria" required defaultValue={fields.jenis_kelamin} />

                    <label htmlFor="status_nikah" name="status_nikah">Status</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="status_nikah" id="status_nikah" placeholder="Contoh: Belum menikah" required defaultValue={fields.status_nikah} />

                    <label htmlFor="agama" name="agama">Agama</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="agama" id="agama" placeholder="Contoh: Islam" required defaultValue={fields.agama} />

                    <label htmlFor="telepon" name="telepon">Telepon</label>
                    <input onChange={fieldsHandler.bind(this)} type="number" name="telepon" id="telepon" placeholder="Contoh: 0829835172222" required defaultValue={fields.telepon} />

                    <label htmlFor="alamat" name="alamat">Alamat</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="alamat" id="alamat" placeholder="Contoh: Jl.bengawan No.200" required defaultValue={fields.alamat} />

                    <button type="submit">Save Change</button>
                    <Link href="/posts"><a>Back</a></Link>
                </form>
            </div>
        </div>
    );
}