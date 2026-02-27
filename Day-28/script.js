// Day 28 Logic Practice
console.log('Lab Session 28 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("☁️ MongoDB Atlas Connected");
  } catch (error) {
    console.error("❌ Atlas Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
require("dotenv").config();
const connectDB = require("./db");

connectDB();
mongoose.connect("mongodb://127.0.0.1:27017/shopDB")