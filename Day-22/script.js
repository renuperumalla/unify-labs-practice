// Day 22 Logic Practice
console.log('Lab Session 22 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
let cache = null;
let lastFetch = 0;

export async function fetchCoins() {
  const now = Date.now();

  if (cache && now - lastFetch < CONFIG.CACHE_DURATION) {
    return cache;
  }

  try {
    const response = await fetch(CONFIG.API_URL);
    if (!response.ok) throw new Error("Network Error");

    const data = await response.json();
    cache = data;
    lastFetch = now;
    return data;
  } catch (error) {
    throw new Error("API Fetch Failed");
  }
}
const app = document.getElementById("app");

export async function init() {
  State.favorites = Storage.load("favorites") || [];
  State.theme = Storage.load("theme") || "light";

  document.body.classList.toggle("dark", State.theme === "dark");

  showSkeleton(app);

  try {
    const data = await fetchCoins();
    State.coins = data;
    State.filtered = data;
    renderCoins(app, State.filtered, State.favorites, State.visibleCount);
  } catch (err) {
    app.innerHTML = "<p>Error loading data.</p>";
  }

  setupEvents();
}

function setupEvents() {
  document
    .getElementById("searchInput")
    .addEventListener("input", debounce(handleSearch, 300));

  document
    .getElementById("sortSelect")
    .addEventListener("change", handleSort);

  document
    .getElementById("themeToggle")
    .addEventListener("click", toggleTheme);

  app.addEventListener("click", handleFavorites);

  window.addEventListener("scroll", handleScroll);
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();

  State.filtered = State.coins.filter(c =>
    c.name.toLowerCase().includes(query)
  );

  renderCoins(app, State.filtered, State.favorites, State.visibleCount);
}

function handleSort(e) {
  const value = e.target.value;

  State.filtered = [...State.filtered].sort((a, b) =>
    value === "price_asc"
      ? a.current_price - b.current_price
      : b.current_price - a.current_price
  );

  renderCoins(app, State.filtered, State.favorites, State.visibleCount);
}

function handleFavorites(e) {
  if (!e.target.classList.contains("favBtn")) return;

  const id = e.target.dataset.id;

  State.favorites = State.favorites.includes(id)
    ? State.favorites.filter(f => f !== id)
    : [...State.favorites, id];

  Storage.save("favorites", State.favorites);

  renderCoins(app, State.filtered, State.favorites, State.visibleCount);
}

function toggleTheme() {
  State.theme = State.theme === "light" ? "dark" : "light";
  Storage.save("theme", State.theme);
  document.body.classList.toggle("dark");
}

function handleScroll() {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 200
  ) {
    State.visibleCount += 10;
    renderCoins(app, State.filtered, State.favorites, State.visibleCount);
  }
}


