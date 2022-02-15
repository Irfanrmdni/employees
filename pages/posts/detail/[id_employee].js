import { useState } from "react";
import { authPages } from "../../../middlewares/authenticationPages";
import Link from "next/link";
import Head from "next/head";

export async function getServerSideProps(ctx) {
    const { token } = await authPages(ctx);
    const { id_employee } = ctx.query;

    const detailEmployee = await fetch('http://localhost:3000/api/posts/detail/' + id_employee, {
        headers: {
            'authorization': 'Bearer ' + token
        }
    });

    const detailResp = await detailEmployee.json();

    return {
        props: {
            token,
            detailEmployee: detailResp.data
        }
    }
}

export default function DetailEmployee(props) {
    const { token } = props;
    const { detailEmployee } = props;
    const [status, setStatus] = useState('normal');

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
        <div className="detail_posts">
            <Head>
                <title>Detail Karyawan</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <small className={checkStatus(status)}>Status: <span>{status}</span></small>
            <div className="posts">
                <h1>Detail data karyawan</h1>
                <form className="form_posts">
                    <label htmlFor="id_employee" name="id_employee">ID</label>
                    <input type="number" name="id_employee" id="id_employee" placeholder="Contoh: 123456" readOnly="readonly" defaultValue={detailEmployee.id_employee} />

                    <label htmlFor="nip" name="nip">NIP</label>
                    <input type="number" name="nip" id="nip" placeholder="Contoh: 123456" readOnly="readonly" defaultValue={detailEmployee.nip} />

                    <label htmlFor="name" name="name">Nama</label>
                    <input type="text" name="name" id="name" placeholder="Contoh: Anisa rahma" readOnly="readonly" defaultValue={detailEmployee.name} />

                    <label htmlFor="tempat_lahir" name="tempat_lahir">Tempat lahir</label>
                    <input type="text" name="tempat_lahir" id="tempat_lahir" placeholder="Contoh: Jakarta" readOnly="readonly" defaultValue={detailEmployee.tempat_lahir} />

                    <label htmlFor="tanggal_lahir" name="tanggal_lahir">Tanggal lahir</label>
                    <input type="text" name="tanggal_lahir" id="tanggal_lahir" placeholder="Contoh: 22/09/2005" readOnly="readonly" defaultValue={new Date(detailEmployee.tanggal_lahir).toLocaleDateString()} />

                    <label htmlFor="jenis_kelamin" name="jenis_kelamin">Jenis kelamin</label>
                    <input type="text" name="jenis_kelamin" id="jenis_kelamin" placeholder="Contoh: Pria" readOnly="readonly" defaultValue={detailEmployee.jenis_kelamin} />

                    <label htmlFor="status_nikah" name="status_nikah">Status</label>
                    <input type="text" name="status_nikah" id="status_nikah" placeholder="Contoh: Belum menikah" readOnly="readonly" defaultValue={detailEmployee.status_nikah} />

                    <label htmlFor="agama" name="agama">Agama</label>
                    <input type="text" name="agama" id="agama" placeholder="Contoh: Islam" readOnly="readonly" defaultValue={detailEmployee.agama} />

                    <label htmlFor="telepon" name="telepon">Telepon</label>
                    <input type="number" name="telepon" id="telepon" placeholder="Contoh: 0829835172222" readOnly="readonly" defaultValue={detailEmployee.telepon} />

                    <label htmlFor="alamat" name="alamat">Alamat</label>
                    <input type="text" name="alamat" id="alamat" placeholder="Contoh: Jl.bengawan No.200" readOnly="readonly" defaultValue={detailEmployee.alamat} />

                    <Link href="/posts" id="btn_back"><a>Back</a></Link>
                </form>
            </div>
        </div>
    );
}