import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { authPages } from "../../middlewares/authenticationPages";

export async function getServerSideProps(ctx) {
    const { token } = await authPages(ctx);

    const postReq = await fetch('http://localhost:3000/api/posts', {
        headers: {
            'authorization': 'Bearer ' + token
        }
    });

    const postResp = await postReq.json();

    return {
        props: {
            token,
            postResp: postResp.data
        },
    }
}

export default function PostIndex(props) {
    const [employees, setEmployees] = useState(props.postResp);
    const [status, setStatus] = useState('normal');

    async function deleteHandler(id_employee, e) {
        e.preventDefault();
        const { token } = props;

        setStatus('loading');
        const ask = confirm('Apakah anda yakin ingin menghapus data?');

        if (ask) {
            const deleteEmployee = await fetch('/api/posts/delete/' + id_employee, {
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + token
                }
            });

            const deleteResp = await deleteEmployee.json();

            const filterData = employees.filter((employee) => {
                if (employee.id_employee !== id_employee) return employee;
            });
            setEmployees(filterData);

            setStatus('success');
        }
    }

    function detailHandler(id_employee, e) {
        e.preventDefault();
        Router.push('/posts/detail/' + id_employee);
    }

    function updateHandler(id_employee, e) {
        e.preventDefault();
        Router.push('/posts/update/' + id_employee);
    }

    function logoutHandler(e) {
        e.preventDefault();

        Cookies.remove('token');
        Router.push('/auth/login');
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
        <div className="index_posts">
            <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <small className={checkStatus(status)}>Status: <span>{status}</span></small>
            <div className="show_posts">
                <h1>Sistem Informasi Pengelolaan <span>Data Karyawan.</span></h1>
                <Link href="/posts/create"><a className="btn_addEmployee">add employee</a></Link>
                <a className="btn_logout" href="#" onClick={logoutHandler.bind(this)}>logout</a>

                <table cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NIP</th>
                            <th>Nama</th>
                            <th>Tempat Lahir</th>
                            <th>Tanggal lahir</th>
                            <th>jenis kelamin</th>
                            <th className="action">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((dataEmployees) => {
                            return (
                                <>
                                    <tr>
                                        <td>{dataEmployees.id_employee}</td>
                                        <td>{dataEmployees.nip}</td>
                                        <td>{dataEmployees.name}</td>
                                        <td>{dataEmployees.tempat_lahir}</td>
                                        <td>{new Date(dataEmployees.tanggal_lahir).toLocaleDateString()}</td>
                                        <td>{dataEmployees.jenis_kelamin}</td>
                                        <td>
                                            <button type="submit" className="btn_detail" onClick={detailHandler.bind(this, dataEmployees.id_employee)}>Show Detail</button>
                                            <button type="submit" className="btn_update" onClick={updateHandler.bind(this, dataEmployees.id_employee)}>Update</button>
                                            <button type="submit" className="btn_delete" onClick={deleteHandler.bind(this, dataEmployees.id_employee)}>Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}