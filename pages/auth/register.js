import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { unAuthPages } from "../../middlewares/authenticationPages";

export async function getServerSideProps(ctx) {
    await unAuthPages(ctx);

    return {
        props: {},
    }
}

export default function Register() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    const [passwordShow, setPasswordShow] = useState(true);

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

    async function registerHandler(e) {
        e.preventDefault();
        setStatus('loading');

        const register = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!register.ok) return setStatus('error');

        const respData = await register.json();

        setStatus('success');
    }

    function fieldsHandler(e) {
        e.preventDefault();
        const name = e.target.getAttribute('name');

        setFields({
            ...fields,
            [name]: e.target.value
        });
    }

    function showPassword() {
        setPasswordShow(!passwordShow);
    }

    return (
        <div className="users">
            <Head>
                <title>Sign up</title>
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
                <h1>Daftarkan akun anda</h1>

                <form onSubmit={registerHandler.bind(this)} className="form_users">
                    <label htmlFor="email" name="email">Email</label>
                    <input type="email" required name="email" placeholder="example@gmail.com" onChange={fieldsHandler.bind(this)} />

                    <label htmlFor="password" required className="label_password" name="password">Password</label>
                    <input type={passwordShow ? "password" : "text"} name="password" onChange={fieldsHandler.bind(this)} />

                    <div className="toggle_check">
                        <input type="checkbox" name="showPassword" onClick={showPassword} />
                        <label htmlFor="showPassword" name="showPassword">Lihat Password</label>
                    </div>

                    <button type="submit">Sign up</button>

                    <p>Sudah mempunyai akun?</p>
                    <Link href="/auth/login"><a>Sign in now</a></Link>
                </form>
            </div>
        </div>
    )
}