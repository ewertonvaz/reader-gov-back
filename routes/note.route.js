import express from "express";
import UserModel from "../models/user.model.js";
import isAuth from "../middleware/isAuth.middleware.js";
import attachCurrentUser from "../middleware/attachCurrentUser.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import BookModel from "../models/books.model.js";
import DocumentModel from "../models/document.model.js";

const noteRoute = express.Router();

noteRoute.post("/:docId", isAuth, attachCurrentUser, async (req, res) => {
    const { docId } = req.params;
    let document = null;
    try {
        document = await BookModel.findById(docId);
        if (!document) {
            document = await DocumentModel.findById(docId);
        }
        if (!document) {
            return res.status(400).json({msg: "O documento / livro não existe!"});
        }
        
    } catch(e) {
        console.log(error);
        return res.status(500).json({msg: "Não foi possível selecionar o documento / livro!"});
    }
});

export default noteRoute;