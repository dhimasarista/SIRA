const { internalServerError } = require("../handlers/error_handlers");

class TambahAnggota{
    constructor(app){
        this.app = app;

        this.main();
    }

    main(){
        this.app.get("/tambah-anggota", (req, res) => {
            const path = "/tambah-anggota"
            const title = "Tambah Anggota"
            res.render("tambah_anggota", {
                username: "dhimasarista",
                path: path,
                title: title,
            })
        })
    }
}

module.exports = TambahAnggota;