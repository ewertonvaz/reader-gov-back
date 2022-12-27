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
    const pageNum = page ? +page : 1;
    const pageLimit = perpage ? +perpage : 10;

    try {
      const baseUrl = req.protocol + '://' + req.get('host') + '/tweets';
      const numPages = Math.ceil( await TweetModel.count() / pageLimit );
      const navigator = {
        numpages: numPages,
        current: pageNum,
        perpage: pageLimit,
        url: {
          current:`${baseUrl}?page=${pageNum}&perpage=${pageLimit}`,
          previous: pageNum > 1 ? `${baseUrl}?page=${pageNum - 1}&perpage=${pageLimit}` : null,
          next: pageNum < numPages ? `${baseUrl}?page=${pageNum + 1}&perpage=${pageLimit}` : null,
          first: `${baseUrl}?page=1&perpage=${pageLimit}`,
          last: `${baseUrl}?page=${numPages}&perpage=${pageLimit}`
        }
      }
      const data = await TweetModel
        .find({})
        .skip( (pageNum - 1) * pageLimit)
        .limit(pageLimit)
        .populate("user", ["name", "email", "username", "profilePic"]);
  
      return res.status(200).json({navigator, data});
    } catch (error) {
      console.log(error);
      return res.status(500).json(error.errors);
    }
});

tweetRoutes.get("/:tweetId", async (req, res) => {
  const { tweetId } = req.params;
  try {
    const tweet = await TweetModel
      .findById( tweetId )
      .populate("user", ["name", "email", "username", "profilePic"]);
    return res.status(200).json(tweet);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
export default tweetRoutes;