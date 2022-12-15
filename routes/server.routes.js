import { Router } from "express";
import isAuth from "../middleware/isAuth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import attachCurrentUser from "../middleware/attachCurrentUser.middleware.js";

const ServerRoutes = new Router();

ServerRoutes.get("/env", isAuth, isAdmin, (req, res) => {
    console.log(req.query);
    res.status(200).json(process.env);
});

ServerRoutes.post("/sei", isAuth, attachCurrentUser, async (req, res) => {
    const usuario = { ...req.body, reader_id: req.currentUser._id};
    console.log(usuario);
    try {
        return res.status(200).json(`O usuário ${req.currentUser._id} acessou o SEI!`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Não foi possível acessar o SEI!"});
    }
});

export default ServerRoutes;