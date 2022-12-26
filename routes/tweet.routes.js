import express from "express";
import UserModel from "../models/user.model.js";
import TweetModel from "../models/tweet.model.js";

const tweetRoutes = express.Router();
const serverAddr = {
  development: "http://localhost:8080",
  production: "https://reader-gov-back.cyclic.app"
};

tweetRoutes.get("/", async (req, res) => {
    const { page, perpage} = req.query;
    const pageNum = page ? page : 1;
    const pageLimit = perpage ? perpage : 10;
    try {
      const tweets = await TweetModel
        .find({})
        .skip( (pageNum - 1) * pageLimit)
        .limit(pageLimit)
        .populate("user", ["name", "email", "username", "profilePic"]);
  
      return res.status(200).json(tweets);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.errors);
    }
});


export default tweetRoutes;