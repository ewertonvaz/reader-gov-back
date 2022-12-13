import { Router } from "express";
import BookModel from "../models/books.model.js";
import isAuth from "../middleware/isAuth.middleware.js";
import attachCurrentUser from "../middleware/attachCurrentUser.middleware.js";
import UserModel from "../models/user.model.js";

const bookRoutes = new Router();

bookRoutes.delete("/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        const result = await BookModel.findByIdAndDelete( bookId );

        await UserModel.findByIdAndUpdate(
            result.user,
            {
              $pull: {
                books: bookId,
              },
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json( result );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível excuir este livro!");
    }
});

bookRoutes.post("/", isAuth, attachCurrentUser, async (req, res) => {
    try {
        const newBook = await BookModel.create({
            ...req.body,
            dataInicio: req.body.dataInicio ? new Date(req.body.dataInicio) : null,
            dataConclusao: req.body.dataConclusao? new Date(req.body.dataConclusao) : null,
            user: req.currentUser._id
        });

        const userUpdated = await UserModel.findByIdAndUpdate(
            req.currentUser._id,
            {
                $push: {
                    books: newBook._id,
                },
            },
            { new: true, runValidators: true }
         );
        
        return res.status(200).json( newBook );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível criar o livro!");
    }
});

bookRoutes.get("/:bookId", isAuth, attachCurrentUser, async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await BookModel.findById( bookId ).populate("notes");
        return res.status(200).json( book );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível recuperar o livro!");
    }
});

bookRoutes.get("/:key/:value", isAuth, attachCurrentUser, async (req, res) => {
    const { key, value } = req.params;
    const query = {};
    query[key] = value;
    if ( req.currentUser.role != "ADMIN") {
        query["user"] = req.currentUser._id;
    }
    try {
        const books = await BookModel.find(query);
        return res.status(200).json(books);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível realizar esta consulta!");
    }
});

bookRoutes.get("/get-all", isAuth, attachCurrentUser, async (req, res) => {
    const { dt, s, ps, q } = req.query;
    const query = {};
    const startindex = s ? s : 0;
    const pagesize = ps ? ps : 0;
    if ( req.currentUser.role != "ADMIN") {
        query["user"] = req.currentUser._id;
    }
    try {
        if ( dt ) { query["status"] = dt.toLowerCase()}
        // console.log(query);
        // db.collection.find({}).skip(perPage * page).limit(perPage)
        const documents = await DocumentModel.find( query ).skip( startindex ).limit( pagesize );        
        return res.status(200).json(documents);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível obter a lista de documentos!");
    }
});

bookRoutes.put("/:bookId", isAuth, attachCurrentUser, async (req, res) => {
    const { bookId } = req.params;
    const query = {};
    query["_id"] = bookId;
    if ( req.currentUser.role != "ADMIN") {
        query["user"] = req.currentUser._id;
    }
    try {
        const updBook = await BookModel.findOneAndUpdate(
            query,
            {
                ...req.body,
                dataInicio: req.body.dataInicio ? new Date(req.body.dataInicio) : null,
                dataConclusao: req.body.dataConclusao? new Date(req.body.dataConclusao) : null
            },
            { new: true, runValidators: true }
        );
        return res.status(200).json( updBook );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi atualizar este livro!");
    }
});

export default bookRoutes;