// router.js ===== screen navigation =====

import { state } from './state.js';

export const router = {
  go(screen) {
    state.screen = screen;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('is-active'));
    document.querySelector(`[data-screen="${screen}"]`).classList.add('is-active');
  }
};
