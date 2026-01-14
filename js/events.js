// events.js ===== DOM event handlers =====

import { state } from './state.js';
import { router } from './router.js';
import { ui } from './ui.js';
import { playTurn, saveState } from './game.js';
import { parseThrows } from './utils.js';
import { updatePreviewScore } from './preview.js';
import { saveCurrentGame } from './persistence/security.js';
import { clearCurrentGame } from './persistence/security.js';
import { initApp } from './init.js';

const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const throwInputs = document.querySelectorAll('.throw-input');
const startingScore = document.getElementById('startingScore');

// ===== Init (Restore IF "playing") =====
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// ===== Welcome / Start =====
document.getElementById('start').onclick = () => {
  state.players = [
    { name: p1.value || 'Player 1', score: +startingScore.value },
    { name: p2.value || 'Player 2', score: +startingScore.value }
  ];
  state.currentPlayer = 0;
  state.turn = 1;
  state.history = [];
  ui.syncHeader();
  router.go('game');
  throwInputs[0].focus();
};

// ===== Validate Turn =====
document.getElementById('validate').onclick = () => {
  saveState();
  const throws = parseThrows(throwInputs);
  playTurn(throws);
  saveCurrentGame('playing');
  throwInputs.forEach(i => i.value = '');
};

// ===== Skip / Undo =====
document.getElementById('skip').onclick = () => {
  saveState();
  ui.log('SKIP', state.players[state.currentPlayer]);
  state.currentPlayer = 1 - state.currentPlayer;
  ui.syncHeader();
  saveCurrentGame('playing');
};

document.getElementById('undo').onclick = () => {
  if (!state.history.length) return;
  const previous = state.history.pop();
  state.players = previous.players;
  state.currentPlayer = previous.currentPlayer;
  state.turn = previous.turn;
  document.getElementById('log-list').innerHTML = previous.log;
  ui.syncHeader();
  saveCurrentGame('playing');
};

// ===== Reset / Home / Help =====
document.getElementById('reset').onclick = () => {
  clearCurrentGame();
  const startScore = +startingScore.value;
  state.players.forEach(p => p.score = startScore);
  state.currentPlayer = 0;
  state.turn = 1;
  state.history = [];
  document.getElementById('log-list').innerHTML = '';
  throwInputs.forEach(i => i.value = '');
  ui.syncHeader();
  throwInputs[0].focus();
};

document.getElementById('home').onclick = () => {
  clearCurrentGame();
  state.history = [];
  document.getElementById('log-list').innerHTML = '';
  throwInputs.forEach(i => i.value = '');
  router.go('welcome');
};

document.getElementById('help').onclick = () => {
  alert('Help page coming soon');
};

// ===== Score preview =====
throwInputs.forEach(input => {
  input.addEventListener('input', () => updatePreviewScore(throwInputs));
});

// ===== Autofocus Enter =====
throwInputs.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < throwInputs.length - 1) throwInputs[index + 1].focus();
      else {
        document.getElementById('validate').click();
        setTimeout(() => throwInputs[0].focus(), 0);
      }
    }
  });
});
