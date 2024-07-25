

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
// Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_KEY,
//     api_secret: process.env.CLOUD_SECRET
// });
cloudinary.config({
    cloud_name: 'dvqtwftb8',
    api_key: '211353651438646',
    api_secret: 's50Cdtor6C_eriiBQn1ILyd__jY'
});

const uploadOnCloudinary = async (localFilePath) => {

   try {
    const resp = await cloudinary.uploader.upload(localFilePath,
         {
             resource_type: "auto"
         }
     )
     console.log(`file has been uploaded successfully ${resp.url}`)
     return resp
   } catch (error) {
    fs.unlink(localFilePath)
    console.log("cloudinary file kaa error hai",error)
    return null
}
}
export {uploadOnCloudinary}




