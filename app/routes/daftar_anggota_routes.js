class DaftarAnggota{
    constructor(app){
        this.app = app;
        this.main();
    }

    main(){
        // Merender Halaman Daftar Anggota
        this.app.get("/daftar-anggota", (req, res) => {
            const path = "/daftar-anggota"
            const title = "Daftar Anggota"
            res.render("daftar_anggota", {
                username: "dhimasarista",
                path: path,
                title: title,
            })
        })
    }
}

module.exports = DaftarAnggota;