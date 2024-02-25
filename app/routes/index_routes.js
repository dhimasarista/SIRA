// Impor Modul
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user_model");
const { max } = require("../config/knex");
// Init Object
const user = new UserModel();
class Index{
    constructor(app){
        this.app = app;
        this.main(); // Memanggil Function ketika class di init
    }

    main(){
        // Mengalihkan halaman utama ke /daftar-anggota
        this.app.get("/", (req, res) => {
            res.redirect("/login");
        });

        this.app.get("/login", (req, res) => {
            const user = req.session.user;
            if (user) {
                return res.redirect("/daftar-anggota");
            }
            return res.render("login", {
                errors: [{}]
            })
        })
        this.app.post("/login", 
    check('username').notEmpty().withMessage('Username harus diisi.'),
    check('password').notEmpty().withMessage('Password harus diisi.'),
    // Validasi ke DBMS
    async (req, res) => {
        try {
            // Jika form login kosong, render halaman + errror message
            const errors = validationResult(req); // Memvalidasi hasil dari inputan
            if (!errors.isEmpty()) { // Jika terdapat error dalam validasi
                return res.render("login", { errors: errors.array() });
            }

            // Mengambil data dari permintaan HTTP yang dikirim oleh pengguna dari form
            const username = req.body.username;
            const password = req.body.password;
            // const stayLoggedIn = req.body.stay;
            // Pengecekan ke database untuk mendapatkan data pengguna berdasarkan username
            const userData = await user.getUserByUsername(username);

            // Jika pengguna tidak ditemukan, tampilkan pesan kesalahan
            if (!userData) {
                return res.render("login", {
                    errors: [{ message: "Username salah!" }]
                });
            }

            // Memeriksa apakah password cocok dengan hash yang disimpan di database
            const isPasswordMatch = await bcrypt.compare(password, userData["password"]);

            // Jika password cocok, lakukan tindakan selanjutnya
            if (isPasswordMatch) {
                // let maxAge = 36000;
                // if (stayLoggedIn !== undefined) {
                //     maxAge = undefined;
                // }

                // Set cookie sesuai dengan informasi pengguna yang berhasil login
                // res.cookie("user", {
                //     id: userData["id"],
                //     username: userData["username"],
                //     role: "admin",
                // }, {
                //     maxAge: maxAge,
                // });

                // Authentication Menggunakan Session
                req.session.user = {
                    id: userData["id"],
                    username: userData["username"],
                    role: "admin",
                }

                // Redirect ke halaman yang sesuai setelah login berhasil
                return res.redirect("/daftar-anggota");
            } else {
                // Jika password tidak cocok, tampilkan pesan kesalahan
                return res.render("login", {
                    errors: [{ message: "Password salah!" }]
                });
            }
        } catch (error) {
        
            return res.render("login", { errors: [{ message: "Terjadi kesalahan saat login." }] });
        }
    }
);


        this.app.get("/logout", (req, res) => {
            res.clearCookie("user");
            req.session.destroy();
            res.redirect("/");
        })
    }
}

module.exports = Index;