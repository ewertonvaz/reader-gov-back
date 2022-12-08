import { Router } from "express";
import fileUploader  from "../config/cloudnary.config.js";

const CloudnaryRoutes = new Router();

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
CloudnaryRoutes.put("/upload", await fileUploader.single("file"), (req, res, next) => {
  //console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ filename: req.file.path });
});

export default CloudnaryRoutes;
