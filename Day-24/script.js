// Day 24 Logic Practice
console.log('Lab Session 24 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
db.products.insertMany([
  {
    name: "Smartphone X",
    category: "Electronics",
    price: 999,
    stock: 50,
    specs: {
      color: "Black",
      weight: "180g"
    }
  },
  {
    name: "Laptop Pro",
    category: "Electronics",
    price: 1499,
    stock: 30,
    specs: {
      color: "Silver",
      weight: "1.5kg"
    }
  },
  {
    name: "Denim Jacket",
    category: "Clothing",
    price: 120,
    stock: 100,
    specs: {
      color: "Blue",
      weight: "800g"
    }
  },
  {
    name: "Office Chair",
    category: "Furniture",
    price: 350,
    stock: 20,
    specs: {
      color: "Gray",
      weight: "12kg"
    }
  },
  {
    name: "Wooden Desk",
    category: "Furniture",
    price: 700,
    stock: 15,
    specs: {
      color: "Brown",
      weight: "25kg"
    }
  }
])