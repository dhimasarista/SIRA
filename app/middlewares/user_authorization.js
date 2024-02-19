const userAuth = app => {
    app.use((req, res, next) => {
        try {
            const user = req.cookies.user;
            const currentPath = req.originalUrl;

            if (user && currentPath === "/") {
                return res.redirect("/daftar-anggota")
            }
        } catch (error) {
            throw error;
        }
    })
}