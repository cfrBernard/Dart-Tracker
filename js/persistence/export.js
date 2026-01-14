// persistence/export.js ===== data export/import =====

import { getGames } from './history.js';
import { clearGames } from './history.js';
// import { clearPlayers } from './stats.js';

export function exportData() {
  const data = {
    version: 1,
    games: getGames()
    // players: getPlayers()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `darttracker_export_${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

export function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data.version !== 1) throw new Error('Incompatible version');

      // Load games into localStorage
      if (data.games) {
        localStorage.setItem('darttracker:games', JSON.stringify(data.games));
      }

      alert('Import successful!');
    } catch (e) {
      alert('Failed to import data: ' + e.message);
    }
  };
  reader.readAsText(file);
}

// ===== Events =====
document.getElementById('btn-export').onclick = () => exportData();
document.getElementById('btn-import').onclick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = () => {
    if (input.files.length) importData(input.files[0]);
  };
  input.click();
};

document.getElementById('btn-clear-data').onclick = () => {
  const confirmClear = confirm('This will erase ALL saved game data. Continue?');
  if (confirmClear) clearAllData();
};

// ===== TESTING =====
export function clearAllData() {
  clearGames();
  // clearPlayers();
  alert('All saved data cleared!');
}