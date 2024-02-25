const {upload, deleteImage} = require("../handlers/upload_handlers");
const compressImage = require("../utilities/compress_image");

class Upload{
    constructor(app){
        this.app = app;
        this.main();
    };

    main(){
        // Routing Mengupload File
        this.app.post("/upload/image", upload.single("image"), (req, res) => {
            const filename = req.body;
            try {
                console.log(filename.filename);
                // Setelah mengupload image
                res.status(200).send(`Image success uploaded.`);
                // Compress Image
                compressImage(filename.filename);
            } catch (error) {
                return res.status(500).send(error);
            }
        });
        // Routing Menghapus File
        this.app.get("/delete/image/:filename", (req, res) => {
            const filename = req.params.filename;
            try {
                deleteImage(filename);
                return res.status(200).send(`Image ${filename} has been deleted from server.`);
            } catch (error) {
                return res.status(500).send(`Error deleteing ${filename} from server.`);
            }
        })
    }
}

module.exports = Upload;