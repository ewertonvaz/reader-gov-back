import * as cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import * as dotenv from "dotenv";

dotenv.config();

const cloudnaryInst = cloudinary.v2;
cloudnaryInst.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudnaryInst,
  params: {
    allowed_formats: ["jpg", "png", "pdf", "epub"],
    folder: "docs-collection", // The name of the folder in cloudinary
    //resource_type: "raw", // => this is in case you want to upload other types of files, not just images
  }
});

const fileUploader = multer({ storage });
export default fileUploader;
