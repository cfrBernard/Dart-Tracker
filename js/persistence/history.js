// persistence/history.js ===== Game History =====

import { router } from '../router.js';

const STORAGE_KEY = 'darttracker:games';

function loadGames() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveGames(games) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

export function addGame(game) {
  const games = loadGames();
  games.unshift(game);
  saveGames(games);
}

export function getGames() {
  return loadGames();
}

export function clearGames() {
  localStorage.removeItem(STORAGE_KEY);
}

export function renderGameHistory() {
  const ul = document.getElementById('history-list');
  ul.innerHTML = '';

  const games = getGames();
  if (!games.length) {
    ul.innerHTML = '<li>No games played yet</li>';
    return;
  }

  games.forEach(game => {
    const li = document.createElement('li');
    li.textContent = `${new Date(game.date).toLocaleString()} — ${game.players.join(' vs ')} — Winner: ${game.winner}`;
    li.style.cursor = 'pointer';
    li.onclick = () => renderGameDetail(game);
    ul.appendChild(li);
  });
}

function renderGameDetail(game) {
  router.go('game-detail');

  const container = document.getElementById('game-detail-logs');
  container.innerHTML = game.logs.map(log => `<div>${log}</div>`).join('');
}
