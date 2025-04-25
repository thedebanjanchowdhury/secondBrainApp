import mongoose, { Schema, model } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
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

export const UserModel = new model("User", userSchema);
export const ContentModel = new model("Content", ContentSchema);
