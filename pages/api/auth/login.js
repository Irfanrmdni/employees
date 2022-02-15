import db from '../../../libs/db';
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';

// ? untuk login users
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    //? untuk melakukan cek email users dengan yang ada di database
    const checkUsers = await db('users').where({ email }).first();
    if (!checkUsers) return res.status(401).end();

    //? untuk melakukan cek password users dengan compare bcrypt yang ada di database
    const checkPassword = await bcryptjs.compareSync(password, checkUsers.password);
    if (!checkPassword) return res.status(401).end();

    const token = Jwt.sign({
        id: checkUsers.id,
        email: checkUsers.email
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.status(200);
    res.json({
        message: 'Login account employees successfully',
        token
    });
}