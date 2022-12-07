import express from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const fileRoutes = express.Router();

fileRoutes.put('/upload', (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            //console.dir(req.headers);
            //console.log(fields);
            //console.log(files);

            const extension = files.file.originalFilename.split('.');
            const newName = files.file.newFilename + "." + extension[ extension.length - 1 ];
            const oldpath = files.file.filepath;
            const newpath = path.join('./uploaded/', newName);
            
            fs.renameSync(oldpath, newpath);
            res.status(201).json({ filename: newName });
        });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

fileRoutes.get('/download/:fileName', (req, res) => {
    const { fileName } = req.params;
    try {
        const file = path.resolve("./") + `/uploaded/${fileName}`;
        if (fs.existsSync(file)) {
            res.status(200).sendFile(file);
        } else {
            res.status(404).json("File not found!");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro interno! Não foi possível fazer o download este arquivo!");
    }
});

export default fileRoutes;