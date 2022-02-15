import cookies from "next-cookies";

// ? untuk melakukan authentication login dan register. kemudian memberikan token ketika berhasil login.
// ? setelah itu di redirect ke halaman posts
export function unAuthPages(ctx) {
    return new Promise((resolve, reject) => {
        const myCookies = cookies(ctx);

        if (myCookies.token)
            return ctx.res.writeHead(302, {
                Location: '/posts'
            }).end();

        return resolve('unAuthorized');
    });
}

// ? untuk melakukan authentication login dan register. kemudian jika gagal akan di arahkan ke halaman login lagi
// ? jika berhasil atau resolve dia akan mendapatkan token
export function authPages(ctx) {
    return new Promise((resolve, reject) => {
        const myCookies = cookies(ctx);

        if (!myCookies.token)
            return ctx.res.writeHead(302, {
                Location: '/auth/login'
            }).end();

        //? ketika sudah berhasil login dia akan resolve dan mendapatkan token
        return resolve({
            token: myCookies.token
        })
    });
}