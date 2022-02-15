import db from '../../../../libs/db';
import authorization from '../../../../middlewares/authorization';

// ? delete data employees
export default async function handler(req, res) {
    if (req.method !== 'DELETE') return res.status(405).end();

    const auth = await authorization(req, res);

    const { id_employee } = req.query;

    const deleteEmployees = await db('employees').where({ id_employee }).del();

    res.status(200);
    res.json({
        message: 'Delete data employees successfully',
        data: deleteEmployees
    });
}