class Index{
    constructor(app){
        this.app = app;

        this.main(); // Memanggil Function ketika class di init
    }

    main(){
        // Mengalihkan halaman utama ke /daftar-anggota
        this.app.get("/", (req, res) => {
            res.render("login", {
                errors: [{}]
            })
        })
    }
}

module.exports = Index;