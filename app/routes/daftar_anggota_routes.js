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

            // Mengambil data anggota
            const dataAnggota = await anggota.findAll();
            res.render("daftar_anggota", {
                username: "dhimasarista",
                path: path,
                title: title,
                anggota:dataAnggota,
            })
        })
    }
}

module.exports = DaftarAnggota;