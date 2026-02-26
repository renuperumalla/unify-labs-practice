// Day 16 Logic Practice
console.log('Lab Session 16 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// ------------------------
// Smart Text Formatter Functions
// ------------------------

// Title Case function: trims and capitalizes first letter of each word
const toTitleCase = (text) => {
  return text
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Count vowels function
const countVowels = (text) => {
  const matches = text.match(/[aeiouAEIOU]/g);
  return matches ? matches.length : 0;
};

// Secret Message generator: replaces specified words with ***
const secretMessage = (text, forbiddenWords = ['password', 'secret', 'confidential']) => {
  let result = text;
  forbiddenWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    result = result.replace(regex, '***');
  });
  return result;
};

// ------------------------
// DOM Elements
// ------------------------
const userText = document.getElementById('userText');
const titleCaseBtn = document.getElementById('titleCaseBtn');
const vowelCountBtn = document.getElementById('vowelCountBtn');
const secretMsgBtn = document.getElementById('secretMsgBtn');
const output = document.getElementById('output');

// ------------------------
// Event Listeners
// ------------------------
titleCaseBtn.addEventListener('click', () => {
  const result = toTitleCase(userText.value);
  output.textContent = `Title Case: ${result}`;
});

vowelCountBtn.addEventListener('click', () => {
  const count = countVowels(userText.value);
  output.textContent = `Vowels Count: ${count}`;
});

secretMsgBtn.addEventListener('click', () => {
  const result = secretMessage(userText.value);
  output.textContent = `Secret Message: ${result}`;
});