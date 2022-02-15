import db from '../../../libs/db';
import authorization from '../../../middlewares/authorization';

//? api untuk membuat data employees
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const auth = await authorization(req, res);

    const { id_employee,
        nip,
        name,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        status_nikah,
        agama,
        telepon,
        alamat } = req.body;

    const create = await db('employees').insert({
        id_employee,
        nip,
        name,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        status_nikah,
        agama,
        telepon,
        alamat
    });

    const respData = await db('employees').where('id_employee', create).first();

    res.status(200);
    res.json({
        message: 'create data employees successfully',
        data: respData
    });
}