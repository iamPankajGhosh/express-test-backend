import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { User } from "./models/user.model.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Connected to MongoDB"));

// // Routes
// // Route to get all employee
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await User.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

// //Route to login
// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && user.password === password) {
//       res.json({ message: "Login successful" });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to login" });
//   }
// });

//Route to create a new employee
app.post("/api/employees", async (req, res) => {
  try {
    const { username, email, employeeId, role, password } = req.body;
    const user = new User({ username, email, employeeId, role, password });
    await user.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create employee" });
  }
});

// // Route to mark attendance for a user
// app.post("/api/attendance", async (req, res) => {
//   try {
//     const { userId, status } = req.body;
//     const attendance = new Attendance({
//       user: userId,
//       status,
//     });
//     await attendance.save();
//     res.status(201).json({ message: "Attendance marked successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to mark attendance" });
//   }
// });

// // Route to apply for leave
// app.post("/api/leave", async (req, res) => {
//   try {
//     const { userId, startDate, endDate, reason } = req.body;
//     const leave = new Leave({
//       user: userId,
//       startDate,
//       endDate,
//       reason,
//     });
//     await leave.save();
//     res
//       .status(201)
//       .json({ message: "Leave application submitted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to submit leave application" });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
