class Index{
    constructor(app){
        this.app = app;

        this.main(); // Memanggil Function ketika class di init
    }

    main(){
        this.app.get("/", (req, res) => {
            const path = "/daftar-anggota"
            res.render("index", {
                username: "dhimasarista",
                path: path,
            })
        })
    }
}

module.exports = Index;