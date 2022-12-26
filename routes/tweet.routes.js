import express from "express";
import UserModel from "../models/user.model.js";
import TweetModel from "../models/tweet.model.js";

const tweetRoutes = express.Router();
const serverAddr = {
  development: "http://localhost:8080",
  production: "https://reader-gov-back.cyclic.app"
};

tweetRoutes.get("/", async (req, res) => {
    try {
      const tweets = await TweetModel.find({}).populate("user", ["name", "email", "username", "profilePic"]);
  
      return res.status(200).json(tweets);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.errors);
    }
});


export default tweetRoutes;