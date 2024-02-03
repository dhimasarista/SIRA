class DaftarAnggota{
    constructor(app){
        this.app = app;

        this.main();
    }

    main(){
        // Merender Halaman Daftar Anggota
        this.app.get("/daftar-anggota", (req, res) => {
            const path = "/daftar-anggota"
            res.render("daftar_anggota", {
                username: "dhimasarista",
                path: path,
            })
        })
    }
}

module.exports = DaftarAnggota;