const userAuthorization = app => {
    app.use((req, res, next) => {
        try {
            const session = req.session;
            const user = session.user;
            const currentPath = req.originalUrl;

            if (currentPath === "/") {
                return next();
            }

            if (currentPath === "/logout") {
                return next();
            }

            // Jika user belum login, alihkan ke halaman login
            if (!user && currentPath !== "/login") {
                return res.redirect("/login")
            }
            next();
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = userAuthorization;