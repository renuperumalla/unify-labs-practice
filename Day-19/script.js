// Day 19 Logic Practice
console.log('Lab Session 19 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.querySelector("#taskList");

// Add Task Event
addBtn.addEventListener("click", addTask);

// Optional: Add task when pressing Enter
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create <li>
    const li = document.createElement("li");
    li.textContent = taskText;

    // Toggle completed class when clicking the task
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Prevent task toggle when clicking delete
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent triggering li click
        taskList.removeChild(li);
    });

    // Append delete button to li
    li.appendChild(deleteBtn);

    // Add li to task list
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
}