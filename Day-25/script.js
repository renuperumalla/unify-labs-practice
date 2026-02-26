// Day 25 Logic Practice
console.log('Lab Session 25 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const productTableBody = document.querySelector('#productTable tbody');

async function fetchProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  renderTable(products);
}

function renderTable(products) {
  productTableBody.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${p.price}</td>
      <td>${p.stock}</td>
      <td>${p.tags ? p.tags.join(', ') : ''}</td>
      <td>${p.featured ? '✅' : ''}</td>
    `;
    productTableBody.appendChild(tr);
  });
}

// Event Listeners
document.getElementById('increasePriceBtn').addEventListener('click', async () => {
  await fetch('/api/increase-price', { method: 'POST' });
  fetchProducts();
});

document.getElementById('featureExpensiveBtn').addEventListener('click', async () => {
  await fetch('/api/feature-expensive', { method: 'POST' });
  fetchProducts();
});

document.getElementById('addTagBtn').addEventListener('click', async () => {
  await fetch('/api/add-tag', { method: 'POST' });
  fetchProducts();
});

document.getElementById('deleteZeroBtn').addEventListener('click', async () => {
  const res = await fetch('/api/delete-zero-stock', { method: 'DELETE' });
  const result = await res.json();
  alert(`Deleted: ${result.deletedCount}, Remaining: ${result.remaining}`);
  fetchProducts();
});

document.getElementById('refreshBtn').addEventListener('click', fetch[
  { "name": "Laptop", "category": "Electronics", "price": 900, "stock": 5, "tags": [] },
  { "name": "Headphones", "category": "Electronics", "price": 120, "stock": 0, "tags": [] },
  { "name": "Sofa", "category": "Furniture", "price": 300, "stock": 2, "tags": [] },
  { "name": "T-Shirt", "category": "Clothing", "price": 50, "stock": 10, "tags": [] },
  { "name": "Smartphone", "category": "Electronics", "price": 650, "stock": 8, "tags": [] }
]Products);

// Initial Load
fetchProducts();const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // serve HTML, CSS, JS

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let collection;

async function connectDB() {
  await client.connect();
  const db = client.db('shopDB');
  collection = db.collection('products');
  console.log('Connected to MongoDB');
}

connectDB();

// -----------------------------
// Routes
// -----------------------------

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await collection.find({}).toArray();
  res.json(products);
});

// Mass price increase for Electronics (+10)
app.post('/api/increase-price', async (req, res) => {
  await collection.updateMany({ category: "Electronics" }, { $inc: { price: 10 } });
  res.json({ message: "Prices increased for Electronics" });
});

// Set featured true for items > 500
app.post('/api/feature-expensive', async (req, res) => {
  await collection.updateMany({ price: { $gt: 500 } }, { $set: { featured: true } });
  res.json({ message: "Featured flag set for items > 500" });
});

// Add 'new-arrival' tag to Electronics
app.post('/api/add-tag', async (req, res) => {
  await collection.updateMany({ category: "Electronics" }, { $push: { tags: "new-arrival" } });
  res.json({ message: "Tag 'new-arrival' added to Electronics" });
});

// Delete products with zero stock
app.delete('/api/delete-zero-stock', async (req, res) => {
  const result = await collection.deleteMany({ stock: 0 });
  const count = await collection.countDocuments();
  res.json({ deletedCount: result.deletedCount, remaining: count });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

