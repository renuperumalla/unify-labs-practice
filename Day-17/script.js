// Day 17 Logic Practice
console.log('Lab Session 17 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// Mock Database
const tasks = [
    { id: 1, title: "Build Landing Page", status: "Completed" },
    { id: 2, title: "Fix Login Bug", status: "Pending" },
    { id: 3, title: "Database Optimization", status: "Completed" },
    { id: 4, title: "Design Dashboard UI", status: "Pending" }
];

const prices = [120, 250, 75, 300];
const expenses = [5000, 7200, 3100, 6400, 2800];

// DOM Elements
const completedList = document.getElementById("completedList");
const pendingList = document.getElementById("pendingList");
const priceList = document.getElementById("priceList");
const totalBudget = document.getElementById("totalBudget");
const averageExpense = document.getElementById("averageExpense");
const processBtn = document.getElementById("processBtn");

processBtn.addEventListener("click", processData);

function processData() {

    // Clear previous results
    completedList.innerHTML = "";
    pendingList.innerHTML = "";
    priceList.innerHTML = "";

    // 1️⃣ FILTER Tasks
    const completedTasks = tasks.filter(task => task.status === "Completed");
    const pendingTasks = tasks.filter(task => task.status === "Pending");

    // Display Completed
    completedTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;
        completedList.appendChild(li);
    });

    // Display Pending
    pendingTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title;
        pendingList.appendChild(li);
    });

    // 2️⃣ MAP Prices (Add 10% Tax)
    const pricesWithTax = prices.map(price => price * 1.10);

    pricesWithTax.forEach(price => {
        const li = document.createElement("li");
        li.textContent = "$" + price.toFixed(2);
        priceList.appendChild(li);
    });

    // 3️⃣ REDUCE Expenses (Total Budget)
    const total = expenses.reduce((sum, expense) => sum + expense, 0);
    const average = total / expenses.length;

    totalBudget.textContent = "Total Company Budget: $" + total.toLocaleString();
    averageExpense.textContent = "Average Expense: $" + average.toFixed(2);
}