import db from '../../../libs/db';
import authorization from '../../../middlewares/authorization';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();

    // ? panggil authorization nya
    const auth = await authorization(req, res);

    const showEmplyees = await db('employees');

    res.status(200);
    res.json({
        message: 'Show data employees successfully',
        data: showEmplyees
    });
}