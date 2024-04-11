import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.get("/api", (req, res) => {
  res.send(`<h1>Welcome Test Backend</h1>`);
});

app.get("/api/employee", (req, res) => {
  res.json("all employee");
});

app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
