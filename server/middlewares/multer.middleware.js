import multer from "multer";
// import hello from './public/temp'



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const multerUpload = multer({ storage: storage });