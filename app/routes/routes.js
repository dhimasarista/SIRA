const Index = require("../routes/index_routes");
const DaftarAnggota = require("./daftar_anggota_routes");
const ErrorRoutes = require("../routes/error_routes");
const TambahAnggota = require("./tambah_anggota_routes");
function setupRoutes(app) {
    new Index(app);
    new DaftarAnggota(app);
    new TambahAnggota(app);
    new ErrorRoutes(app);
}

module.exports = setupRoutes;