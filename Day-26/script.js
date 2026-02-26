// Day 26 Logic Practice
console.log('Lab Session 26 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const tableBody = document.querySelector('#productTable tbody');
const refreshBtn = document.getElementById('refreshBtn');

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();
    renderTable(products);
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="4">Failed to fetch products</td></tr>`;
    console.error(err);
  }
}

function renderTable(products) {
  tableBody.innerHTML = '';
  products.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${p.price}</td>
      <td>${p.stock}</td>
    `;
    tableBody.appendChild(tr);
  });
}

refreshBtn.addEventListener('click', fetchProducts);

// Initial load
fetchProducts();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // serve HTML/CSS/JS

// MongoDB connection
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useUnifiedTopology: true });

let collection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db('unify_labs');
    collection = db.collection('products');
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect:", err.message);
  }
}

connectDB();

// API endpoint to fetch products
app.get('/api/products', async (req, res) => {
  try {
    const products = await collection.find({}).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
