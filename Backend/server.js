const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { User, Question, Answer } = require("./DBModel.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    credentials: true,
  })
);

//-------------DB connection-------------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
  });

//-------------register--------------------
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });
    res.json("okkkkkkkkk");
  } catch (err) {
    console.log(err);
  }
});

//------------------Login----------------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  try {
    const found = await User.findOne({ email });

    if (!found) return res.status(401).json("NA");
    const compared = await bcrypt.compare(password, found.password);

    if (!compared) return res.status(401).json("NAa");
    const token = jwt.sign(
      { email: found.email, id: found._id },
      "SECRET_KEY",
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token);
    res.status(202).json("Login success");
  } catch (err) {
    console.log(err);
  }
});

//----------------------logout-------------------
app.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json("Logout success");
  } catch (err) {
    console.log(err);
  }
});

//--------------------Post Question-----------
app.post("/postQue", async (req, res) => {
  const { question, description } = req.body;
  const token = req.cookies.token;
  const verified = jwt.verify(token, "SECRET_KEY");

  try {
    const data = await Question.create({
      question,
      description,
      userId: verified.id,
    });
    console.log(data);
    res.status(201).json("question Added");
  } catch (err) {
    console.log(err);
  }
});

//--------------------Post Answer-----------
app.post("/postAns/:queId", async (req, res) => {
  const { answer } = req.body;
  const token = req.cookies.token;
  if (!token) return res.status(401).json("Please login to Answer");
  const queId = req.params.queId;
  const verified = jwt.verify(token, "SECRET_KEY");
  console.log(answer);
  try {
    const data = await Answer.create({
      answer,
      userId: verified.id,
      queId: queId,
    });
    console.log(data);
    res.status(201).json("ok");
  } catch (err) {
    console.log(err);
  }
});

//---------------show Posted question----------
app.get("/getQue", async (req, res) => {
  const token = req.cookies.token;
  const verified = jwt.verify(token, "SECRET_KEY");
  // console.log(verified);
  try {
    const allQues = await Question.find({ userId: verified.id }).sort({
      updatedAt: -1,
    });
    // console.log(allQues);
    res.status(200).json(allQues);
  } catch (err) {
    console.log(err);
  }
});

//---------------show Feed question----------
app.get("/allQue", async (req, res) => {
  try {
    const allQues = await Question.find().populate("userId", "name").sort({
      updatedAt: -1,
    });
    res.status(200).json(allQues);
  } catch (err) {
    console.log(err);
  }
});

//---------------get Answers----------
app.get("/allAns", async (req, res) => {
  try {
    const allAns = await Answer.find()
      // .populate("queId")
      .populate("userId", "name");

    res.status(200).json(allAns);
  } catch (err) {
    console.log(err);
  }
});

//-----------------Delete Question----------------
app.delete("/delete/:id", async (req, res) => {
  const token = req.cookies.token;
  const verified = jwt.verify(token, "SECRET_KEY");
  const id = req.params.id;
  try {
    const deleted = await Question.findByIdAndDelete(id);

    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

//-----------------Edit Question----------------
app.put("/edit/:id", async (req, res) => {
  const token = req.cookies.token;
  const verified = jwt.verify(token, "SECRET_KEY");
  const id = req.params.id;
  const data = req.body;
  try {
    const edited = await Question.findOneAndUpdate(
      {
        _id: id,
        userId: verified.id,
      },
      { $set: data },
      { new: true }
    );

    res.status(200).json("Edited");
  } catch (err) {
    console.log(err.message);
  }
});
//-------------checkAuth-----------
app.get("/checkAuth", async (req, res) => {
  if (req.cookies.token) return res.status(202).json("okkkkk");
  res.status(403).json("forbiddionioen");
});

app.listen("4000", () => console.log("server running on port 4000"));
