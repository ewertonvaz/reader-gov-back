import express from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const fileRoutes = express.Router();

fileRoutes.post('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        //console.dir(req.headers);
        //console.log(fields);
        //console.log(files);

        const oldpath = files.file.filepath;
        const newpath = path.join('./uploaded/', files.file.newFilename);
        console.log(newpath);
        
        fs.renameSync(oldpath, newpath);

        res.status(201).json({ filename: newpath });
    });
});

export default fileRoutes;