import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET_KEY
})

export const uploadProducts = async(localFilePath) => {
    try {
        if(!localFilePath) return null;

       const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });

        fs.unlinkSync(localFilePath);
        return res 
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error found uploading file",error);
        return null
    }
}

