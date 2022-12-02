import express from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const fileRoutes = express.Router();

fileRoutes.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const oldpath = files.filetoupload.filepath;
        const newpath = path.join('./uploaded/', files.filetoupload.newFilename);
        console.log(newpath);
        
        fs.renameSync(oldpath, newpath);

        res.status(201).json({ filename: newpath });
    });
});

export default fileRoutes;