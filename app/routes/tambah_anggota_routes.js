// Import Modul
const { internalServerError } = require("../handlers/error_handlers");
const AnggotaModel = require("../models/anggota_model");
// Init Objek
const anggota = new AnggotaModel();
class TambahAnggota{
    constructor(app){
        this.app = app;

        this.main();
    }

    main(){
        this.app.get("/tambah-anggota", (req, res) => {
            const path = "/tambah-anggota"
            const title = "Tambah Anggota"
            return res.render("tambah_anggota", {
                username: "dhimasarista",
                path: path,
                title: title,
            })
        });

        this.app.post("/tambah-anggota/baru", async (req, res) => {
            const {
                nik, nama, gelar, tempat_lahir, tanggal_lahir, alamat, foto, ktp
            } = req.body;

            if (nik === "") {
                res.json({
                    status: 400,
                    message: "NIK Tidak boleh kosong!"
                })

                return 0;
            }
            if (nama === "") {
                res.json({
                    status: 400,
                    message: "Nama Tidak boleh kosong!"
                })

                return 0;
            }

            try {
                // Memeriksa NIK/No.Anggota
                const isNikExists = await anggota.checkNIK(nik);
                if (isNikExists) {
                    res.json({
                        status: 400,
                        message: "NIK telah digunakan"
                    })

                    return 0;
                }
                // Jika NIK tidak ada, maka tambahkan data baru
                const results = await anggota.addAnggota(nik, nama, gelar, tempat_lahir, tanggal_lahir, ktp, foto, alamat);
                res.json({
                    status: 200,
                    message: results,
                })
            } catch (error) {
                return res.status(500).send(error);
            }
        })
    }
}

module.exports = TambahAnggota;