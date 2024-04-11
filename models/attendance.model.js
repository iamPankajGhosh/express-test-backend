import mongoose from "mongoose";

const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "present",
  },
});

export const Attendance = model("Attendance", attendanceSchema);
