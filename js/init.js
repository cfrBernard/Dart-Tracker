// init.js ===== Restore IF "playing" =====

import { loadCurrentGame, clearCurrentGame } from './persistence/security.js';
import { state } from './state.js';
import { router } from './router.js';
import { ui } from './ui.js';

export function initApp() {
  const currentGame = loadCurrentGame();
  if (currentGame?.status === 'playing') {
    const resume = confirm(
      `You have a game in progress.\nResume the game?`
    );
    if (resume) {
      restoreGame(currentGame);
      return;
    } else {
      clearCurrentGame();
    }
  }
}

function restoreGame(snapshot) {
  const s = snapshot.state;
  state.screen = s.screen;
  state.players = s.players;
  state.currentPlayer = s.currentPlayer;
  state.turn = s.turn;
  state.history = s.history;

  document.getElementById('log-list').innerHTML = s.logHTML;
  
  ui.syncHeader();
  router.go('game');

  const throwInputs = document.querySelectorAll('.throw-input');
  throwInputs[0]?.focus();
}
