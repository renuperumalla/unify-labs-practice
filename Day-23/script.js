// Day 23 Logic Practice
console.log('Lab Session 23 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/unify_labs")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const internSchema = new mongoose.Schema({
  name: String,
  role: String,
  joinedDate: Date
});

const Intern = mongoose.model("Intern", internSchema);

// Insert Intern
app.post("/add-intern", async (req, res) => {
  const intern = new Intern(req.body);
  await intern.save();
  res.send("Intern Added");
});

// Get All Interns
app.get("/interns", async (req, res) => {
  const interns = await Intern.find();
  res.json(interns);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
