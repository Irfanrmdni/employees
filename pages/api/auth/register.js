import db from '../../../libs/db';
import bcryptjs from 'bcryptjs';

// ? register account users
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    //? untuk melakukan hash password supaya bukan lagi plain text melainkan random string
    const salt = bcryptjs.genSaltSync(10);
    var passwordHash = bcryptjs.hashSync(password, salt);

    const register = await db('users').insert({
        email,
        password: passwordHash
    });

    const respRegister = await db('users').where({ id: register }).first();

    res.status(200);
    res.json({
        message: 'Register your account successfully',
        respRegister
    });
}