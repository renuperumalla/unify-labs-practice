// Day 24 Logic Practice
console.log('Lab Session 24 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ======================
   MongoDB Connection
====================== */
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* ======================
   Schema & Model
====================== */
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    specs: {
        color: String,
        weight: String
    }
});

const Product = mongoose.model("Product", productSchema);

/* ======================
   Insert Many Products
====================== */
app.get("/seed", async (req, res) => {
    await Product.deleteMany({}); // Clear old data

    const products = [
        {
            name: "Smartphone X",
            category: "Electronics",
            price: 1200,
            stock: 15,
            specs: { color: "Black", weight: "180g" }
        },
        {
            name: "Laptop Pro",
            category: "Electronics",
            price: 2500,
            stock: 8,
            specs: { color: "Silver", weight: "1.5kg" }
        },
        {
            name: "Denim Jacket",
            category: "Clothing",
            price: 120,
            stock: 30,
            specs: { color: "Blue", weight: "700g" }
        },
        {
            name: "Sofa Set",
            category: "Furniture",
            price: 1800,
            stock: 5,
            specs: { color: "Gray", weight: "40kg" }
        },
        {
            name: "Office Chair",
            category: "Furniture",
            price: 600,
            stock: 12,
            specs: { color: "Black", weight: "15kg" }
        }
    ];

    await Product.insertMany(products);
    res.send("Database Seeded Successfully!");
});

/* ======================
   Query: Electronics
====================== */
app.get("/electronics", async (req, res) => {
    const electronics = await Product.find({ category: "Electronics" });
    res.json(electronics);
});

/* ======================
   Query: Top 2 Most Expensive
====================== */
app.get("/top-products", async (req, res) => {
    const topProducts = await Product
        .find()
        .sort({ price: -1 })
        .limit(2);

    res.json(topProducts);
});

/* ======================
   Start Server
====================== */
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});