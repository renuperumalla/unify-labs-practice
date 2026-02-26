// Day 13 Logic Practice
console.log('Lab Session 13 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// Magic 8-Ball & Calculator Script

// ------------------------
// Welcome Message
const welcomeBtn = document.getElementById('welcomeBtn');
const usernameInput = document.getElementById('username');
const welcomeMessage = document.getElementById('welcomeMessage');

welcomeBtn.addEventListener('click', () => {
  const name = usernameInput.value || "Guest";
  welcomeMessage.textContent = `Hello ${name}! Welcome to the Magic 8-Ball & Calculator!`;
});

// ------------------------
// Calculator
const calcBtn = document.getElementById('calcBtn');
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const calcResults = document.getElementById('calcResults');

calcBtn.addEventListener('click', () => {
  const num1 = Number(num1Input.value);
  const num2 = Number(num2Input.value);

  if (isNaN(num1) || isNaN(num2)) {
    calcResults.textContent = "Please enter valid numbers!";
    return;
  }

  const sum = num1 + num2;
  const product = num1 * num2;
  const remainder = num1 % num2;

  calcResults.textContent = `Sum: ${sum}, Product: ${product}, Remainder: ${remainder}`;
});

// ------------------------
// Magic 8-Ball
const magicBtn = document.getElementById('magicBtn');
const magicAnswer = document.getElementById('magicAnswer');

const answers = [
  "Yes",
  "No",
  "Maybe",
  "Ask again later",
  "Definitely",
  "Absolutely not"
];

magicBtn.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * answers.length);
  magicAnswer.textContent = `Magic 8-Ball says: ${answers[randomIndex]}`;
});