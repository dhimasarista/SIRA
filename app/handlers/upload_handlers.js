const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, "app/uploads/before/")
        } else if (file.mimetype === "application/pdf") {
            cb(null, "app/uploads/pdf")
        } else {
            cb(new Error("unsupported file type"));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

// Handler Menghapus File
function deleteImage(fileName) {
    if (fileName === null) {
        return 0;
    }
    const imagePathAfter = path.join(__dirname, "../uploads/after", fileName);
    const imagePathBefore = path.join(__dirname, "../uploads/before", fileName);
    // Pengecekan apakah file ada sebelum mencoba menghapusnya
    if (fs.existsSync(imagePathAfter)) {
        fs.unlink(imagePathAfter, (err) => {
            if (err) {
                console.log("Error deleting after image: " + err);
            }
        });
    }

    // Pengecekan apakah file ada sebelum mencoba menghapusnya
    if (fs.existsSync(imagePathBefore)) {
        fs.unlink(imagePathBefore, (err) => {
            if (err) {
                console.log("Error deleting before image: " + err);
            }
        });
    }
}

async function deletePDF(fileName) {
    const pdfPath = path.join(__dirname, "..", "app", "uploads", "pdf", fileName);
    try {
        await fs.promises.unlink(pdfPath)
    } catch (error) {
        console.log("Error deleting pdf: " + error)
    }
}

module.exports = {upload, deleteImage};