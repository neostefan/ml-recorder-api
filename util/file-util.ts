import multer from "multer";

const customStorage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  "public/data/samples")
    },

    filename: (req, file, cb) => {
        cb(null, req.body.name + "_sample_" + file.originalname)
    }
})

const fileHandler = multer({storage: customStorage})

export default fileHandler