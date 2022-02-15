import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { authPages } from "../../middlewares/authenticationPages";

export async function getServerSideProps(ctx) {
    const { token } = await authPages(ctx);

    return {
        props: {
            token
        }
    }
}

export default function PostCreate(props) {
    const { token } = props;
    const [fields, setFields] = useState({
        id_employee: '',
        nip: '',
        name: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        status_nikah: '',
        agama: '',
        telepon: '',
        alamat: ''
    });

    const [status, setStatus] = useState('normal');

    async function createHandler(e) {
        e.preventDefault();

        setStatus('loading');
        const create = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        });

        if (!create.ok) return setStatus('error');
        const createResp = await create.json();

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
                <title>Create Karyawan</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <small className={checkStatus(status)}>Status: <span>{status}</span></small>
            <div className="posts">
                <h1>buat karyawan baru</h1>
                <form onSubmit={createHandler.bind(this)} className="form_posts">
                    <label htmlFor="id_employee" name="id_employee">ID</label>
                    <input onChange={fieldsHandler.bind(this)} type="number" name="id_employee" id="id_employee" placeholder="Contoh: 123456" required />

                    <label htmlFor="nip" name="nip">NIP</label>
                    <input onChange={fieldsHandler.bind(this)} type="number" name="nip" id="nip" placeholder="Contoh: 123456" required />

                    <label htmlFor="name" name="name">Nama</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="name" id="name" placeholder="Contoh: Anisa rahma" required />

                    <label htmlFor="tempat_lahir" name="tempat_lahir">Tempat lahir</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="tempat_lahir" id="tempat_lahir" placeholder="Contoh: Jakarta" required />

                    <label htmlFor="tanggal_lahir" name="tanggal_lahir">Tanggal lahir</label>
                    <input onChange={fieldsHandler.bind(this)} type="date" name="tanggal_lahir" id="tanggal_lahir" placeholder="Contoh: 22/09/2005" required />

                    <label htmlFor="jenis_kelamin" name="jenis_kelamin">Jenis kelamin</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="jenis_kelamin" id="jenis_kelamin" placeholder="Contoh: Pria" required />

                    <label htmlFor="status_nikah" name="status_nikah">Status</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="status_nikah" id="status_nikah" placeholder="Contoh: Belum menikah" required />

                    <label htmlFor="agama" name="agama">Agama</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="agama" id="agama" placeholder="Contoh: Islam" required />

                    <label htmlFor="telepon" name="telepon">Telepon</label>
                    <input onChange={fieldsHandler.bind(this)} type="number" name="telepon" id="telepon" placeholder="Contoh: 0829835172222" required />

                    <label htmlFor="alamat" name="alamat">Alamat</label>
                    <input onChange={fieldsHandler.bind(this)} type="text" name="alamat" id="alamat" placeholder="Contoh: Jl.bengawan No.200" required />

                    <button type="submit">Create</button>
                    <Link href="/posts"><a>Back</a></Link>
                </form>
            </div>
        </div>
    );
}