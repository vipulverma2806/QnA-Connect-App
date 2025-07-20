const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const qSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    question: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", qSchema);

const ansSchema = mongoose.Schema({
  queId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  answer: { type: String },
});

const Answer = mongoose.model("Answer", ansSchema);
module.exports = { User, Question, Answer };
