const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  description: String,
  grades: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      grade: { type: String, enum: ["A", "B", "C", "D", "F"], required: true },
    },
  ],
});
module.exports = mongoose.model("Course", courseSchema);
