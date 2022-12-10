import { Router } from "express";
import isAuth from "../middleware/isAuth.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";

const ServerRoutes = new Router();

ServerRoutes.get("/env", isAuth, isAdmin, (req, res) => {
    console.log(req.query);
    res.status(200).json(process.env);
});

export default ServerRoutes;