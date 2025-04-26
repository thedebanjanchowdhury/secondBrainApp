import mongoose, { Schema, model } from "mongoose";

const MONGODB_URI =
  "mongodb+srv://admin:admin%40123@cluster0.hqzc1wy.mongodb.net/secondBrain";

mongoose.connect(MONGODB_URI);

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});
const ContentSchema = new Schema({
  title: { type: String, required: true },
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});
const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});
const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export const UserModel = new model("User", userSchema);
export const LinkModel = new model("Link", LinkSchema);
export const ContentModel = new model("Content", ContentSchema);
export const TagModel = new model("Tag", TagSchema);
