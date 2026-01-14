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
  const gameWithId = {
    ...game,
    id: `game_${Date.now()}` 
  };
  games.unshift(gameWithId);
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

  // Styles (temporary fix)
  li.style.cursor = 'pointer';
  li.style.padding = '12px 0';
  li.style.borderBottom = '1px solid #ccc';
  li.style.listStyle = 'none';

  const date = new Date(game.date).toLocaleDateString('fr-FR');

  const playersHTML = game.players.map(player => {
    if (player === game.winner) {
      return `<span style="color: green; font-weight: bold;">${player}</span>`;
    }
    return player;
  }).join(' vs ');

  li.innerHTML = `
    ${date} – ${game.mode} – ${game.turns} Turns<br>
    ${playersHTML}
    <span style="font-size: 0.7em; color: #888;">
      ID: ${game.id.replace('game_', '')}
    </span>
  `;

  li.onclick = () => renderGameDetail(game);

  document.getElementById('history-list').appendChild(li);
});
}

function renderGameDetail(game) {
  router.go('game-detail');

  const container = document.getElementById('game-detail-logs');
  container.innerHTML = game.logs.map(log => `<div>${log}</div>`).join('');
}
