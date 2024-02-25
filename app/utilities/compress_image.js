const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function compressImage(inputFileName) {
    const inputImagePath = path.join(__dirname, '../uploads/before', inputFileName);
    const outputDirectory = path.join(__dirname, '../uploads/after');
    const outputImagePath = path.join(outputDirectory, inputFileName);

    // Pastikan folder output ada, jika tidak, buat folder tersebut
    if (!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory);
    }

    // Kompres gambar dengan menggunakan sharp
    sharp(inputImagePath)
        .resize({ width: 800 }) // Sesuaikan ukuran gambar jika diperlukan
        .toBuffer()
        .then(data => {
            const fileSize = Buffer.byteLength(data); // Ukuran file hasil kompresi
            if (fileSize <= 200 * 1024) { // Pastikan ukurannya kurang dari 200KB
                // Tulis hasil kompresi ke file
                fs.writeFileSync(outputImagePath, data);
                console.log('Image compressed successfully.');
            } else {
                console.log('Image cannot be compressed to less than 200KB.');
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

module.exports = compressImage;