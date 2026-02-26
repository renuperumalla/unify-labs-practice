// Day 21 Logic Practice
console.log('Lab Session 21 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
// settings.js

const STORAGE_KEY = "userSettings";

const defaultSettings = {
    theme: "light",
    language: "en"
};

// Load settings from localStorage
export function loadSettings() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        return defaultSettings;
    }
// main.js

import { loadSettings, saveSettings } from "./settings.js";

const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("languageSelect");
const themeLabel = document.getElementById("themeLabel");
const previewTitle = document.getElementById("previewTitle");
const previewText = document.getElementById("previewText");

// Load saved settings
let settings = loadSettings();

// Apply settings on page load
applySettings(settings);

// Event: Theme Toggle
themeToggle.addEventListener("change", () => {
    settings.theme = themeToggle.checked ? "dark" : "light";
    saveSettings(settings);
    applySettings(settings);
});

// Event: Language Change
languageSelect.addEventListener("change", () => {
    settings.language = languageSelect.value;
    saveSettings(settings);
    applySettings(settings);
});

// Apply settings to UI
function applySettings(settings) {
    // Theme
    if (settings.theme === "dark") {
        document.body.classList.add("dark");
        themeToggle.checked = true;
        themeLabel.textContent = "Dark Mode";
    } else {
        document.body.classList.remove("dark");
        themeToggle.checked = false;
        themeLabel.textContent = "Light Mode";
    }

    // Language
    languageSelect.value = settings.language;
    updateLanguage(settings.language);
}

// Update UI Text Based on Language
function updateLanguage(lang) {
    const translations = {
        en: {
            title: "Welcome!",
            text: "Your preferences are saved automatically."
        },
        es: {
            title: "¡Bienvenido!",
            text: "Tus preferencias se guardan automáticamente."
        },
        fr: {
            title: "Bienvenue!",
            text: "Vos préférences sont enregistrées automatiquement."
        }
    };

    previewTitle.textContent = translations[lang].title;
    previewText.textContent = translations[lang].text;
}
    return JSON.parse(stored);
}

// Save settings to localStorage
export function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
