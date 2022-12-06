import UserModel from "../models/user.model.js";

async function attachCurrentUser(req, res, next) {
    try {
        const { _id} = req.auth;
        const user = await UserModel.findOne({_id}, { passwordHash: 0 });
        if (!user) {
            return res.status(400).json({ message: "Este usuário não existe !" });
        }
        req.currentUser = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(err);
    }
}

export default attachCurrentUser;