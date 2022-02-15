import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

// ? update data employees
export default async function handler(req, res) {
    if (req.method !== 'PUT') return res.status(405).end();

    const auth = await authorization(req, res);

    const { id_employee } = req.query;
    const {
        nip,
        name,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        status_nikah,
        agama,
        telepon,
        alamat } = req.body;

    const update = await db('employees').where({ id_employee }).update({
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

    const updateData = await db('employees').where({ id_employee }).first();

    res.status(200);
    res.json({
        message: 'Update data employees successfully',
        data: updateData
    });
}