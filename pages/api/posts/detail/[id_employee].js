import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    const { id_employee } = req.query;
    const auth = await authorization(req, res);
    const detail = await db('employees').where({ id_employee }).first();

    if (!detail) return res.status(404).end();

    res.status(200);
    res.json({
        message: 'detail employees successfully',
        data: detail
    });
}