// Impor Modul
const express = require("express");
const http = require("http");
const path = require("path");
const nocache = require("nocache"); // Import middleware nocache
const setupRoutes = require("./app/routes/routes");

const app = express(); // Init Aplikasi
const port = 9999; // Init Port
const server = http.createServer(app); // Init Server

// Middlewares & Routes
app.set('view engine', 'ejs'); // Mengatur View Engine ke EJS
app.set('views', path.join(__dirname, 'views')); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files dari folder "public" 
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); // Parsing Permintaan JSON
app.use(nocache()); // Gunakan middleware nocache di sini untuk menonaktifkan caching
setupRoutes(app); // Mengatur Routing
app.use((req, res, next) => {
    res.status(404).redirect('/404'); // Middleware untuk halaman error
});

// Running Aplikasi
server.listen(port, function() {
    console.clear(); // Membersihkan Console
    console.log(`Server started on http://localhost:${port}`)
});
