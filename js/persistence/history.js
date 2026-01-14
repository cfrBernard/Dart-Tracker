// persistence/history.js ===== Game History =====

const STORAGE_KEY = 'darttracker:games';

function loadGames() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveGames(games) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

export function addGame(game) {
  const games = loadGames();
  games.unshift(game); // plus récent en premier
  saveGames(games);
}

export function getGames() {
  return loadGames();
}

export function clearGames() {
  localStorage.removeItem(STORAGE_KEY);
}
