// Day 15 Logic Practice
console.log('Lab Session 15 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// Virtual Core Browser Version

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const enterBtn = document.getElementById('enter-btn');

// -----------------
// Boot & PIN
// -----------------
const MASTER_PIN = 9999;
let pinAttempts = 0;
let loggedIn = false;

function appendOutput(message) {
  terminalOutput.innerHTML += message + "<br>";
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Boot sequence
function bootSequence() {
  while (!loggedIn && pinAttempts < 3) {
    const pin = prompt(`Enter Master PIN (Attempts left: ${3 - pinAttempts}):`);
    if (parseInt(pin) === MASTER_PIN) {
      loggedIn = true;
      appendOutput("==============================");
      appendOutput(" Welcome to Virtual Core v1.0 ");
      appendOutput("==============================");
      appendOutput("Type commands: bank, shop, vault, exit");
      break;
    } else {
      pinAttempts++;
      if (pinAttempts >= 3) {
        appendOutput("💀 SYSTEM SELF-DESTRUCT! Too many failed PIN attempts.");
        throw new Error("System terminated.");
      } else {
        alert("❌ Incorrect PIN.");
      }
    }
  }
}

// -----------------
// Global State
// -----------------
let balance = 1000;
const UNIT_PRICE = 50;
const SECRET_WORD = "VCORE";
const SECRET_MESSAGE = "🎉 Congrats! Here's the hidden link: https://example.com/secret";

// -----------------
// Command Handler
// -----------------
function handleCommand(cmd) {
  cmd = cmd.toLowerCase();

  switch(cmd) {
    case "bank":
      bankModule();
      break;
    case "shop":
      shopModule();
      break;
    case "vault":
      vaultModule();
      break;
    case "exit":
      appendOutput("👋 Exiting Virtual Core...");
      terminalInput.disabled = true;
      enterBtn.disabled = true;
      break;
    default:
      appendOutput("❌ Unknown command. Available: bank, shop, vault, exit");
  }
}

// -----------------
// Banking Module
// -----------------
function bankModule() {
  while (true) {
    let bankCmd = prompt("[BANK]> Type command: deposit, withdraw, balance, back").toLowerCase();

    if (bankCmd === "deposit") {
      let dep = parseFloat(prompt("Enter deposit amount:"));
      if (!isNaN(dep) && dep > 0) {
        balance += dep;
        appendOutput(`✅ Deposited $${dep.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
      } else appendOutput("❌ Invalid deposit amount.");
    } else if (bankCmd === "withdraw") {
      let wd = parseFloat(prompt("Enter withdrawal amount:"));
      if (!isNaN(wd) && wd > 0) {
        if (wd > balance) appendOutput("💀 INSUFFICIENT FUNDS!");
        else {
          balance -= wd;
          appendOutput(`✅ Withdrawn $${wd.toFixed(2)}. Balance: $${balance.toFixed(2)}`);
        }
      } else appendOutput("❌ Invalid withdrawal amount.");
    } else if (bankCmd === "balance") {
      appendOutput(`💰 Balance: $${balance.toFixed(2)}`);
    } else if (bankCmd === "back") return;
    else appendOutput("❌ Invalid bank command.");
  }
}

// -----------------
// Shop Module
// -----------------
function shopModule() {
  let qty = parseInt(prompt("Enter quantity to buy:"));
  if (isNaN(qty) || qty <= 0) { appendOutput("❌ Invalid quantity."); return; }

  let discount = 0;
  if (qty >= 6 && qty <= 10) discount = 0.10;
  else if (qty > 10) discount = 0.20;

  let total = UNIT_PRICE * qty * (1 - discount);

  if (total > balance) appendOutput("💀 INSUFFICIENT FUNDS!");
  else {
    balance -= total;
    appendOutput(`🛒 Purchased ${qty} items. Total: $${total.toFixed(2)}. Remaining Balance: $${balance.toFixed(2)}`);
  }
}

// -----------------
// Vault Module
// -----------------
function vaultModule() {
  alert("🔒 Hint: Secret word has 5 letters and starts with 'V'");
  let guess = prompt("Enter secret word:");

  if (guess.toUpperCase() === SECRET_WORD) {
    appendOutput(`🎉 Correct! Secret Message: ${SECRET_MESSAGE}`);
  } else appendOutput("❌ Incorrect. Returning to main menu.");
}

// -----------------
// Event Listeners
// -----------------
enterBtn.addEventListener('click', () => {
  const cmd = terminalInput.value.trim();
  if (cmd) {
    appendOutput(`[V-CORE]> ${cmd}`);
    handleCommand(cmd);
    terminalInput.value = '';
  }
});

terminalInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') enterBtn.click();
});

// -----------------
// Initialize
// -----------------
bootSequence();