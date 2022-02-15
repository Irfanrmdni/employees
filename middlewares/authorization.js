import Jwt from 'jsonwebtoken';

// ? authorization employees. untuk digunakan di setiap api posts
export default async function authorization(req, res) {
    return new Promise((resolve, reject) => {
        const { authorization } = req.headers;
        if (!authorization) return res.status(401).end();

        const authSplit = authorization.split(' ');
        const [type, token] = [authSplit[0], authSplit[1]];
        if (type !== 'Bearer') return res.status(401).end();

        //  ? untuk melakukan verify / decode dari request headers
        return Jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) return res.status(401).end();
            return resolve(decoded);
        });
    });

}