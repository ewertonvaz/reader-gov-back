import { Router } from "express";
import fileUploader  from "../config/cloudnary.config.js";

const CloudnaryRoutes = new Router();

CloudnaryRoutes.put("/upload", await fileUploader.single("file"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  res.json({ filename: req.file.path });
});

export default CloudnaryRoutes;
