// Import Modul
const AnggotaModel = require("../models/anggota_model");
// Init Objek
const anggota = new AnggotaModel();
class DaftarAnggota{
    constructor(app){
        this.app = app;
        this.main();
    }

    main(){
        // Merender Halaman Daftar Anggota
        this.app.get("/daftar-anggota", async (req, res) => {
            const path = "/daftar-anggota";
            const title = "Daftar Anggota";
            const username = req.session.user.username;
            // Mengambil data anggota
            const dataAnggota = await anggota.findAll();
            res.render("daftar_anggota", {
                username: username,
                path: path,
                title: title,
                anggota:dataAnggota,
            })
        });

        // Get Data By ID
        this.app.get("/anggota/:id", async (req, res) => {
            const id = req.params.id;
            try {
                const dataAnggota = await anggota.getAnggotaByID(id);
                res.json({
                    status: 200,
                    anggota: dataAnggota,
                });
            } catch (error) {
                res.json({
                    status: 500,
                    anggota: null,
                    message: error,
                })
            }
        });

        this.app.delete("/anggota/:id", async (req, res) => {
            const id = req.params.id;
            try {
                const dataToDelete = await anggota.hardDelete(id);
                res.json({
                    status: 200,
                    message: "Data berhasil dihapus",
                })
            } catch (error) {
                res.json({
                    status: 500,
                    message: error,
                })
            }
        })
    }
}

module.exports = DaftarAnggota;