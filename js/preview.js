// preview.js ===== score preview =====

import { state } from './state.js';
import { parseThrows } from './utils.js';

export function updatePreviewScore(throwInputs) {
  const p = state.players[state.currentPlayer];
  if (!p) return;

  const throws = parseThrows(throwInputs);
  const total = throws.reduce((a, b) => a + b, 0);

  let preview = p.score - total;
  const el = document.getElementById(`player${state.currentPlayer}`);
  const scoreEl = el.querySelector('.score');

  if (preview < 0) {
    preview = -(total - p.score);
    scoreEl.classList.add('bust');
  } else {
    scoreEl.classList.remove('bust');
  }

  scoreEl.textContent = preview;
}
