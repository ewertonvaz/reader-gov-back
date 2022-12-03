import express from "express"
import UserModel from "../models/user.model.js";

const userRoutes = express.Router();

userRoutes.get("/:key/:value", async (req, res) => {
    const { key, value } = req.params;
    const query = {};
    query[key] = value;
    console.log(query);
    try {
        const user = await UserModel.findOne(query);
        // delete user.password;
        return res.status(200).json(user);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível recuperar dados do usuário!");
    }
});

userRoutes.post("/", async (req, res) => {
    try {
        const newUser = await UserModel.create( {...req.body });
        return res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível criar o usuário!");
    }
});

userRoutes.put("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const updUser = await UserModel.findByIdAndUpdate(
            userId,
            {...req.body},
            { new: true, runValidators: true }
        );
        return res.status(200).json(updUser);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível editar o usuário!");
    }
});

userRoutes.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await UserModel.findByIdAndDelete(userId);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possível apagar o usuário!");
    }
});

export default userRoutes;