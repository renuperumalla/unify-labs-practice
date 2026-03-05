// Day 30 Logic Practice
console.log('Lab Session 30 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
const cartBtn=document.getElementById("cartBtn")
const cartSidebar=document.getElementById("cartSidebar")
const closeCart=document.getElementById("closeCart")

const checkoutBtn=document.getElementById("checkoutBtn")
const checkoutModal=document.getElementById("checkoutModal")
const closeCheckout=document.getElementById("closeCheckout")

cartBtn.onclick=()=>{

cartSidebar.classList.add("active")

}

closeCart.onclick=()=>{

cartSidebar.classList.remove("active")

}

checkoutBtn.onclick=()=>{

checkoutModal.style.display="flex"

}

closeCheckout.onclick=()=>{

checkoutModal.style.display="none"

}
{
  "name": "Smart Watch",
  "price": 99,
  "category": "electronics",
  "image": "image-url"
}{
  "customer": {
    "name": "John",
    "email": "john@email.com",
    "address": "USA"
  },
  "items": [
    { "productId": "123", "quantity": 1 }
  ],
  "total": 99
}

{
"routes": [
{
"src": "/api/(.*)",
"dest": "/api/index.js"
}
]
}
