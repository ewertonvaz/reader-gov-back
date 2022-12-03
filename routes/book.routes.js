import { Router } from "express";
import BookModel from "../models/books.model.js";

const bookRoutes = new Router();

bookRoutes.delete("/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        const result = await BookModel.findByIdAndDelete( bookId );
        return res.status(200).json( result );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível excuir este livro!");
    }
});

bookRoutes.post("/", async (req, res) => {
    try {
        const newBook = await BookModel.create({
            ...req.body,
            dataInicio: req.body.dataInicio ? new Date(req.body.dataInicio) : null,
            dataConclusao: req.body.dataConclusao? new Date(req.body.dataConclusao) : null
        });
        return res.status(200).json( newBook );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível criar o livro!");
    }
});

bookRoutes.get("/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await BookModel.findById( bookId );
        return res.status(200).json( book );
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível recuperar o livro!");
    }
});

bookRoutes.get("/:key/:value", async (req, res) => {
    const { key, value } = req.params;
    const query = {};
    query[key] = value;
    try {
        const books = await BookModel.find(query);
        return res.status(200).json(books);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível realizar esta consulta!");
    }
});

bookRoutes.put("/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;
        const updBook = await BookModel.findByIdAndUpdate(
            bookId,
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