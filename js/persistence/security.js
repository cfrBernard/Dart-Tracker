// persistence/security.js ===== Restore IF "playing" =====

import { state } from '../state.js';

const STORAGE_KEY = 'darttracker:currentGame';

export function saveCurrentGame(status = 'playing') {
  const snapshot = {
    id: state.gameId ??= `game_${Date.now()}`,
    status,
    savedAt: Date.now(),
    state: {
      screen: state.screen,
      players: structuredClone(state.players),
      currentPlayer: state.currentPlayer,
      turn: state.turn,
      history: structuredClone(state.history),
      logHTML: document.getElementById('log-list')?.innerHTML ?? ''
    }
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function loadCurrentGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearCurrentGame() {
  localStorage.removeItem(STORAGE_KEY);
}
