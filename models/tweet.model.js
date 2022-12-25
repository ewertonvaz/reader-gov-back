import { Schema, model } from "mongoose";

const tweetSchema = new Schema(
    {
        body: { type: String, required: true, minLength: 2, maxLength: 248 },
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
      timestamps: true,
    }
);

const TweetModel = model("Tweet", tweetSchema);

export default TweetModel;