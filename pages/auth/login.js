import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import { unAuthPages } from "../../middlewares/authenticationPages";

export async function getServerSideProps(ctx) {
    await unAuthPages(ctx);

    return {
        props: {},
    }
}

export default function Login() {
    const [passwordShow, setPasswordShow] = useState(true);
    const [fields, setfields] = useState({
        email: '',
        password: ''
    });
    const [status, setStatus] = useState('normal');

    async function loginHandler(e) {
        e.preventDefault();

        setStatus('loading');
        const login = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!login.ok) return setStatus('error');

        const respData = await login.json();

        setStatus('success');

        Cookies.set('token', respData.token);
        Router.push('/posts');
    }

    function fieldsHandler(e) {
        e.preventDefault();
        const name = e.target.getAttribute('name');

        setfields({
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

    function showPassword() {
        setPasswordShow(!passwordShow);
    }

    return (
        <div className="users">
            <Head>
                <title>Sign in</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <div className="hero_users">
                <h1>Sistem Informasi Pengelolaan <span>Data Karyawan.</span></h1>
                <div className="img">
                    <Image src="/logo.svg" alt="logo" width={200} height={200} />
                </div>
                <small>© 2022 irfan ramdani, Inc.</small>
            </div>

            <div className="input_users">
                <small className={checkStatus(status)}>Status: <span>{status}</span></small>
                <h5>Selamat Datang</h5>
                <h1>Masuk ke akun anda</h1>

                <form onSubmit={loginHandler.bind(this)} className="form_users">
                    <label htmlFor="email" name="email">Email</label>
                    <input type="email" required name="email" placeholder="example@gmail.com" onChange={fieldsHandler.bind(this)} />

                    <label htmlFor="password" required className="label_password" name="password">Password</label>
                    <input type={passwordShow ? "password" : "text"} name="password" onChange={fieldsHandler.bind(this)} />

                    <div className="toggle_check">
                        <input type="checkbox" name="showPassword" onClick={showPassword} />
                        <label htmlFor="showPassword" name="showPassword">Lihat Password</label>
                    </div>

                    <button type="submit">Sign in</button>

                    <p>Belum mempunyai akun?</p>
                    <Link href="/auth/register"><a>Sign up now</a></Link>
                </form>
            </div>
        </div>
    );
}