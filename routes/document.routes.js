import { Router } from "express";
import DocumentModel from "../models/document.model.js";
import UserModel from "../models/user.model.js";
import isAuth from "../middleware/isAuth.middleware.js";
import attachCurrentUser from "../middleware/attachCurrentUser.middleware.js";

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

DocumentRoutes.post("/", isAuth, attachCurrentUser, async (req, res) => {
    try {
        const newDocument = await DocumentModel.create({
            ...req.body,
            user: req.currentUser._id
        });
        // encodeURI()
        const userUpdated = await UserModel.findByIdAndUpdate(
            req.currentUser._id,
            {
                $push: {
                    documents: newDocument._id,
                },
            },
            { new: true, runValidators: true }
         );
        return res.status(200).json(newDocument);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao criar o documento!");
    }
});

DocumentRoutes.post("/dou",  async (req, res) => {
    try {
        const newDocument = await DocumentModel.create({
            ...req.body
        });
        // encodeURI()
        return res.status(200).json(newDocument);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao criar o documento!");
    }
});

DocumentRoutes.put("/:docId", isAuth, attachCurrentUser, async (req, res) => {
    const { docId } = req.params;

    try {
        const document = await DocumentModel.findByIdAndUpdate( 
            docId,
            {
                ...req.body,
                user: req.currentUser._id,
                dataPublicacao: req.body.dataPublicacao ? new Date(req.body.dataPublicacao) : null
                //encodeURI()
            },
            { new: true, runValidators: true }
         );
         await UserModel.findByIdAndUpdate(
            req.currentUser._id,
            {
              $push: {
                documents: docId,
              },
            },
            { new: true, runValidators: true }
        );
        return res.status(200).json(document);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível atualizar o documento!");
    }
});

DocumentRoutes.delete("/:docId", isAuth, attachCurrentUser, async (req, res) => {
    const { docId } = req.params;

    try {
        const result = await DocumentModel.findByIdAndRemove(docId);
        
        await UserModel.findByIdAndUpdate(
            result.user,
            {
              $pull: {
                documents: docId,
              },
            },
            { new: true, runValidators: true }
        );
        
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível deletar o documento!");
    }
});

DocumentRoutes.get("/get-all", isAuth, attachCurrentUser, async (req, res) => {
    const { dt, s, ps, q } = req.query;
    let query = {};
    const startindex = s ? s : 0;
    const pagesize = ps ? ps : 0;
    if ( req.currentUser.role != "ADMIN") {
        query = { $or: [{ user: req.currentUser._id }, {user: {$exists: false }}]};
    }
    try {
        if ( dt ) { query["tipo"] = dt.toLowerCase()}
        // console.log(query);
        // db.collection.find({}).skip(perPage * page).limit(perPage)
        const documents = await DocumentModel.find( query ).skip( startindex ).limit( pagesize )
            .sort( {user: -1});      
        return res.status(200).json(documents);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível obter a lista de documentos!");
    }
});

// DocumentRoutes.get("/change-all", async (req, res) =>{
//     const documents = await DocumentModel.updateMany(
//         { tipo: {$exists: false}},
//         { tipo: "dou"},
//         { new: true, runValidators: true }
//     );
//     return res.status(200).json(documents);
// });

export default DocumentRoutes;