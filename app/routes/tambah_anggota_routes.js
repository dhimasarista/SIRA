"use strict";
// Import Modul
const fs = require("fs");
const path = require("path");
const { internalServerError } = require("../handlers/error_handlers");
const AnggotaModel = require("../models/anggota_model");
const { deleteImage } = require("../handlers/upload_handlers");
// Init Objek
const anggota = new AnggotaModel();
class TambahAnggota {
    constructor(app) {
        this.app = app;

        this.main();
    }

    main() {
        this.app.get("/tambah-anggota", (req, res) => {
            const path = "/tambah-anggota";
            const title = "Tambah Anggota"
            const username = req.session.user.username;
            return res.render("tambah_anggota", {
                username: username,
                path: path,
                title: title,
            })
        });

        this.app.post("/tambah-anggota/baru", async (req, res) => {
            const {
                nik, nama, gelar, tempat_lahir, tanggal_lahir, alamat, foto, ktp
            } = req.body;

            // Membaca data gambar dari file
            let fileKTP = null;
            if (ktp !== null) {
                const imagePath = path.join('./app/uploads/after/', ktp);
                if (fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile()) {
                    fileKTP = fs.readFileSync(imagePath);
                }
            }
            let fileFoto = null;
            if (foto !== null) {
                const imagePath = path.join('./app/uploads/after/', foto);
                if (fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile()) {
                    fileFoto = fs.readFileSync(imagePath);
                }
            }
            // Memeriksa input nik & nama tidak boleh kosong
            if (nik === "" || nama === "") {
                res.status(400).json({
                    status: 400,
                    message: "NIK dan Nama tidak boleh kosong!"
                });
                return;
            }

            try {
                // Memeriksa NIK/No.Anggota
                const isNikExists = await anggota.checkNIK(nik);
                if (isNikExists) {
                    res.status(400).json({
                        status: 400,
                        message: "NIK telah digunakan"
                    });
                    return;
                }

                // Jika NIK tidak ada, maka tambahkan data baru ke basis data
                await anggota.addAnggota(nik, nama, gelar, tempat_lahir, tanggal_lahir, fileKTP, fileFoto, alamat);
                res.status(200).json({
                    status: 200,
                    message: "Anggota baru ditambahkan."
                });
                deleteImage(ktp);
                deleteImage(foto);
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({
                    status: 500,
                    message: "Internal server error"
                });
            }
        });
    }
}

module.exports = TambahAnggota;
