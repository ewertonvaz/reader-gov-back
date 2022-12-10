import { Router } from "express";
import DocumentModel from "../models/document.model.js";

const DocumentRoutes = new Router();

DocumentRoutes.get("/get-one/:docId", async (req, res) => {
    const { docId } = req.params;

    try {
        const document = await DocumentModel.findById( docId );
        //decodeURI()
        return res.status(200).json(document);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível recuperar o documento!");
    }
});

DocumentRoutes.post("/", async (req, res) => {
    try {
        const newDocument = await DocumentModel.create({...req.body });
        // encodeURI()
        return res.status(200).json(newDocument);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao criar o documento!");
    }
});

DocumentRoutes.put("/:docId", async (req, res) => {
    const { docId } = req.params;

    try {
        const document = await DocumentModel.findByIdAndUpdate( 
            docId,
            {
                ...req.body,
                dataPublicacao: req.body.dataPublicacao ? new Date(req.body.dataPublicacao) : null
                //encodeURI()
            },
            { new: true, runValidators: true }
         );        return res.status(200).json(document);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível atualizar o documento!");
    }
});

DocumentRoutes.delete("/:docId", async (req, res) => {
    const { docId } = req.params;

    try {
        const document = await DocumentModel.findByIdAndRemove(docId);        
        return res.status(200).json(document);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível deletar o documento!");
    }
});

DocumentRoutes.get("/get-all", async (req, res) => {
    try {
        const documents = await DocumentModel.find({});        
        return res.status(200).json(documents);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível obter a lista de documentos!");
    }
})

export default DocumentRoutes;