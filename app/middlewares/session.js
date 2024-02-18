const session = require('express-session');

const sessionSetup = (app) => {
    app.use(session({
        secret: "210401010174",
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 5000, // Waktu kedaluwarsa sesi dalam milidetik (contoh: 1 jam)
        },
      }));

    app.use((req, res, next) => {
      if (req.session && req.session.user) {
        // Pengguna aktif, perbarui waktu kedaluwarsa sesi
        req.session.cookie.expires = new Date(Date.now() + 60 * 60 * 1000); // Perbarui sesi menjadi 1 jam lagi
        req.session.cookie.maxAge = 60 * 60 * 1000;
      }
      next();
    })
}

module.exports = sessionSetup;