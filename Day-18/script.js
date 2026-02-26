// Day 18 Logic Practice
console.log('Lab Session 18 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// Digital Pet Class
class Pet {
    constructor(name, type) {
        this.name = name;
        this.type = type;

        this._health = 80;
        this.hunger = 50;
        this.energy = 70;
    }

    // Getter for health
    get health() {
        return this._health;
    }

    // Setter with validation (0–100)
    set health(value) {
        if (value > 100) {
            this._health = 100;
        } else if (value < 0) {
            this._health = 0;
        } else {
            this._health = value;
        }
    }

    feed() {
        this.hunger -= 15;
        this.energy += 5;
        this.health += 10;

        if (this.hunger < 0) this.hunger = 0;

        return `${this.name} enjoyed the meal! 🍖`;
    }

    play() {
        if (this.energy <= 10) {
            return `${this.name} is too tired to play! 😴`;
        }

        this.energy -= 15;
        this.hunger += 10;
        this.health += 5;

        return `${this.name} had fun playing! 🎾`;
    }

    getStatus() {
        if (this.health === 0) {
            return `${this.name} needs urgent care! 🚑`;
        }
        if (this.hunger > 80) {
            return `${this.name} is very hungry! 🍽`;
        }
        if (this.energy < 20) {
            return `${this.name} is feeling tired. 😴`;
        }
        return `${this.name} is happy and healthy! 😊`;
    }
}

// Create a Pet instance
const myPet = new Pet("Buddy", "Dog");

// DOM Elements
const petName = document.getElementById("petName");
const petType = document.getElementById("petType");
const healthEl = document.getElementById("health");
const hungerEl = document.getElementById("hunger");
const energyEl = document.getElementById("energy");
const statusMessage = document.getElementById("statusMessage");

const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");

// Update UI
function updateUI(message = "") {
    petName.textContent = myPet.name;
    petType.textContent = `Type: ${myPet.type}`;
    healthEl.textContent = myPet.health;
    hungerEl.textContent = myPet.hunger;
    energyEl.textContent = myPet.energy;
    statusMessage.textContent = message || myPet.getStatus();
}

// Event Listeners
feedBtn.addEventListener("click", () => {
    const msg = myPet.feed();
    updateUI(msg);
});

playBtn.addEventListener("click", () => {
    const msg = myPet.play();
    updateUI(msg);
});

// Initial UI Load
updateUI();