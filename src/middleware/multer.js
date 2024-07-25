
import multer from "multer";

const storage =  multer.diskStorage({
  
    destination: function(req, file, cb){
        cb(null, "public/temp")
        // console.log("destination fun has been called")
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)
        // console.log("file fun has been called")
    }
})

export const upload = multer({
    storage
})