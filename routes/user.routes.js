import express from "express";
//import TaskModel from "../model/task.model.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwt.config.js";
import isAuth from "../middleware/isAuth.middleware.js";
import attachCurrentUser from "../middleware/attachCurrentUser.middleware.js";
import isAdmin from "../middleware/isAdmin.middleware.js";
import SendMail from "../services/send-mail.service.js";

const userRoute = express.Router();
const serverAddr = {
  development: "http://localhost:8080",
  production: "https://reader-gov-back.cyclic.app"
};

const saltRounds = 10;

userRoute.post("/sign-up", async (req, res) => {

    const { email, password } = req.body;
    try {
        if(
            !password ||
            !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/)
        ) {
            return res.status(400).json({ msg: "Senha não atende aos requisitos de segurança!"});
        }

        //Gerar o salt
        const salt = await bcrypt.genSalt(saltRounds);

        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({
            ...req.body,
            passwordHash: passwordHash
        });

        delete newUser._doc.passwordHash;

        await SendMail(
          email,
          "Ativação de Conta",
          `<h1>Clique no link para ativar sua conta:</h1>
            <a href=${serverAddr[process.env.NODE_ENV] || serverAddr["development"]}/user/activate-account/${newUser._id}>
          Ativar minha conta</a>`
        );

        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Não foi possível criar usuário!"});
    }
});

//login
userRoute.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ msg: "Usuário não cadastrado" });
      }
  
      if (await bcrypt.compare(password, user.passwordHash)) {
        if (!user.emailConfirm) {
          return res.status(401).json({ message: "Usuário não ativado" });
        }
        
        delete user._doc.passwordHash;
        const token = generateToken(user);
  
        return res.status(200).json({
          user: user,
          token: token,
        });
      } else {
        //as senhas são diferentes!!
        return res.status(401).json({ msg: "Email ou Senha inválidos!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.errors);
    }
  });

  userRoute.get('/profile', isAuth, attachCurrentUser, (req, res) => {
    try {
        const loggedUser = req.currentUser;
        if (!loggedUser){
            return res.status(404).json({ msg: "Usuário não encontrado." });
        }

        delete loggedUser._doc.passwordHash;
        delete loggedUser._doc.__v;
            
        return res.status(200).json(loggedUser);
    } catch (error) {
        return res.status(500).json(error.errors);
    }

  })

  userRoute.get("/all-users", isAuth, isAdmin, attachCurrentUser, async (req, res) => {
    try {
      
      const users = await UserModel.find({}, { passwordHash: 0 });
  
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.errors);
    }
  });
  
  userRoute.get("/activate-account/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await UserModel.findOne({ _id: userId });
    try {
      if (!user) {
        return res.send("Erro na ativação da conta");
      }

      await UserModel.findByIdAndUpdate(userId, {
        emailConfirm: true,
      });

      res.send("Usuário ativado!");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

userRoute.put("/edit", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { _id } = req.currentUser;

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

userRoute.delete("/delete", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { _id } = req.currentUser;

    const deletedUser = await UserModel.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(400).json({ msg: "Usuário não encontrado!" });
    }

    const users = await UserModel.find();

    //deletar TODAS as tarefas que o usuário é dono
    // await TaskModel.deleteMany({ user: _id });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

userRoute.post("/create-user", isAuth, isAdmin, async (req, res) => {
  try {
    const form = req.body;

    //quer criar um documento dentro da sua collection -> .create()
    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

userRoute.get("/oneUser/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.find({_id: id})
    // const user = await UserModel.findById(id).populate("tasks");

    if (!user) {
      return res.status(400).json({ msg: " Usuário não encontrado!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default userRoute;