import express from "express";
import UserModel from "../models/user.model.js";
import isAuth from "../middleware/isAuth.middleware.js";
import attachCurrentUser from "../middleware/attachCurrentUser.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import BookModel from "../models/books.model.js";
import DocumentModel from "../models/document.model.js";
import NoteModel from "../models/notes.model.js";

const noteRoute = express.Router();

noteRoute.post("/:docId", isAuth, attachCurrentUser, async (req, res) => {
    const { docId } = req.params;
    let document = null;
    let docType = "book";
    try {
        document = await BookModel.findById(docId);
        if (!document) {
            docType = "document";
            document = await DocumentModel.findById(docId);
        }
        if (!document) {
            return res.status(400).json({msg: "O documento / livro não existe!"});
        }

        if (document.user && !document.user.equals(req.currentUser._id)) {
           return res.status(403).json({msg: `Usuário não pode incluir anotação neste ${docType} !`});
        };

        if (docType === "book"){
            const newNote = await NoteModel.create({
                ...req.body,
                book: docId
            });
            await BookModel.findByIdAndUpdate(
                docId, {$push: { notes: newNote._id}}, { new: true, runValidators: true }
            );
            return res.status(200).json({msg: `A anotação no livro foi incluída com sucesso!`});
        }

        if (docType === "document"){
            const newNote = await NoteModel.create({
                ...req.body,
                document: docId
            });
            await DocumentModel.findByIdAndUpdate(
                docId, {$push: { notes: newNote._id}}, { new: true, runValidators: true }
            );
            return res.status(200).json({msg: `A anotação no documento foi incluída com sucesso!`});
        }

        return res.status(404).json({msg: "O tipo de documento não existe!"});
    } catch(e) {
        return res.status(500).json({msg: "Não foi possível selecionar o documento / livro!"});
    }
});

noteRoute.get("/book/:docId", isAuth, attachCurrentUser, async (req, res) => {
    const { docId } = req.params;
    try {
        const result = await NoteModel.find( { book : docId} );
        return res.status(200).json(result);
    } catch(e){
        console.log(e);
        return res.status(500).json({msg: "Não foi possível recuperar as anotações!"});
    }
});

export default noteRoute;