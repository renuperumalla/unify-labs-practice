// Day 14 Logic Practice
console.log('Lab Session 14 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// Number Guessing Game Browser Version

let targetNumber;
let maxAttempts = 7;
let attemptsLeft;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');

function initGame() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = maxAttempts;
  feedback.textContent = '';
  attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;
  resetBtn.style.display = 'none';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  guessInput.value = '';
}

function checkGuess() {
  const guess = Number(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    feedback.textContent = "⚠️ Enter a valid number between 1 and 100.";
    return;
  }

  attemptsLeft--;

  if (guess === targetNumber) {
    feedback.textContent = `🎉 Congratulations! You guessed it! The number was ${targetNumber}.`;
    endGame();
  } else if (guess < targetNumber) {
    feedback.textContent = "⬆️ Too low!";
  } else {
    feedback.textContent = "⬇️ Too high!";
  }

  attemptsDisplay.textContent = `Attempts left: ${attemptsLeft}`;

  if (attemptsLeft === 0 && guess !== targetNumber) {
    feedback.textContent = `💀 Game Over! The number was ${targetNumber}.`;
    endGame();
  }

  guessInput.value = '';
}

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  resetBtn.style.display = 'inline-block';
}

guessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', initGame);

// Initialize game on page load
initGame();