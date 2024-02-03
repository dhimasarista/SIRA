const { internalServerError } = require("../handlers/error_handlers");

class TambahAnggota{
    constructor(app){
        this.app = app;

        this.main();
    }

    main(){
        this.app.get("/tambah-anggota", (req, res) => {
            internalServerError(res, "Halaman Belum Dibuat.")
        })
    }
}

module.exports = TambahAnggota;