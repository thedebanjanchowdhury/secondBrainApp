import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ContentModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Atleas 3 character required" })
    .max(10, { message: "Max 10 character allowed" }),
  password: z
    .string()
    .min(8, { message: "Atleast 8 character required" })
    .max(20, { message: "Max 20 character allowed" })
    .refine(
      (val) =>
        /[a-z]/.test(val) &&
        /[A-Z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[!@#$%^&*()]/.test(val),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
  email: z.string().email(),
});

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // User already exists
  const alreadyExists = await UserModel.findOne({
    username: username,
    email: email,
  });
  if (alreadyExists) {
    res.status(403).json({ message: "User already exists" });
  }

  // Input parsing
  const result = userSchema.safeParse({ username, password, email });
  if (!result.success) {
    return res
      .status(411)
      .json({ message: "Invalid Data", error: result.error.issues });
  }

  // Hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await UserModel.create({
    username,
    password: hashedPassword,
    email,
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username });
  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser?.password
  );

  if (!isPasswordValid) {
    res.status(404).json({ message: "Invalid Password" });
  }

  if (existingUser) {
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.USER_JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(200).json({ token });
  } else {
    res.status(203).json({ message: "Invalid Credentials" });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;

  await ContentModel.create({
    link,
    type,
    userId: res.userId,
    tags: [],
  });
  return res.json({ message: "Content Added" });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({ userId }).populate(
    "userId",
    "username"
  );
  return res.json(content);
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  await ContentModel.deleteOne({
    contentId,
    userId: res.userId
  })
})

app.listen(port);
