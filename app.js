// Impor Modul
const express = require("express");
const http = require("http");
const path = require("path");

// Init Aplikasi
const app = express();
const port = 9999;
// Init Server
const server = http.createServer(app);

// Middlewares
app.set('view engine', 'ejs'); // Mengatur View Engine ke EJS
app.set('views', path.join(__dirname, 'views')); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files dari folder "public" 
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); // Parsing Permintaan JSON
// app.use(cookieParser()); // Menggunakan cookie-parser

// Routes
const setupRoutes = require("./app/routes/routes");
setupRoutes(app);

// Running Aplikasi
server.listen(port, function() {
    console.clear(); // Membersihkan Console
    console.log(`Server started on http://localhost:${port}`)
})