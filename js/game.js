// game.js ===== game logic =====

import { state } from './state.js';
import { ui } from './ui.js';
import { saveCurrentGame } from './persistence/security.js';
import { clearCurrentGame } from './persistence/security.js';

export function playTurn(throws) {
  const p = state.players[state.currentPlayer];
  const total = throws.reduce((a,b) => a+b, 0);
  const before = p.score;
  let after = before - total;

  if (after < 0) {
    after = before;
    ui.log('BUST', p, total);
  } else {
    p.score = after;
    ui.log('SCORE', p, total, after);
  }

  if (after === 0) {
    ui.log('WIN', p);
    saveCurrentGame('finished');
    clearCurrentGame(); // fix ? 
    return;
  }

  state.currentPlayer = 1 - state.currentPlayer;
  if (state.currentPlayer === 0) state.turn++;
  ui.syncHeader();
}

export function saveState() {
  state.history.push({
    players: state.players.map(p => ({ ...p })),
    currentPlayer: state.currentPlayer,
    turn: state.turn,
    log: document.getElementById('log-list').innerHTML
  });
}
