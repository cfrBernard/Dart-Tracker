// ui.js ===== UI sync & logging =====

import { state } from './state.js';

export const ui = {
  syncHeader() {
    state.players.forEach((p, i) => {
      const el = document.getElementById(`player${i}`);
      el.querySelector('.name').textContent = p.name;
      el.querySelector('.score').textContent = p.score;
      el.querySelector('.score').classList.remove('bust');
      el.classList.toggle('active', i === state.currentPlayer);
    });
  },

  log(type, player, valueBefore = null, valueAfter = null) {
    const ul = document.getElementById('log-list');
    const turn = state.turn;
    const playerIndex = state.players.indexOf(player);
    const emojis = {
      SCORE: '⚡',
      BUST: '❌',
      SKIP: '⏩',
      WIN: '🎯'
    };

    let msg = `[T${turn} - P${playerIndex + 1}] ${type} ${emojis[type] ?? ''} ${player.name}`;

    if (type === 'SCORE') msg += `: ${valueBefore} → ${valueAfter}`;
    else if (type === 'BUST') msg += `: ${valueBefore}`;

    ul.insertAdjacentHTML('afterbegin', `<li>${msg}</li>`);
    ul.parentElement.scrollTop = 0;
  }
};
