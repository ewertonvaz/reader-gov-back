import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 60
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      minLength: 2,
      maxLength: 20
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    active: {
      type: Boolean,
      default: true,
    },
    tasks: [{ type: String }],
    passwordHash: { type: String, required: true },
    profilePic: { type: String },
    emailConfirm: { type: Boolean, default: false },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }]
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;