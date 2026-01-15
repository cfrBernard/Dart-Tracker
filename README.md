# Dart-Tracker

A lightweight web application to track darts games (301 / 501 / 701) in real time. Designed for simplicity, speed, and focus during gameplay, Dart Tracker helps players manage scores, turns, and game history without friction.

![Version](https://img.shields.io/badge/version-v0.3.2-blue)
[![License](https://img.shields.io/github/license/cfrBernard/Dart-Tracker)](./LICENSE.md)

## Features

- **Two-player** darts game (301 / 501 / 701)
- Simple screen routing (Welcome → Game)
- Real-time score tracking
- Turn-based logic with automatic player switching
- Bust handling (invalid scores revert the turn)
- Live score preview while typing throws
- Game log with turn history
- Undo last action, Skip turn, Reset game
- Security persistence (resume game)
- Game history (with data export/import)

---

## Getting Started

### Prerequisites

- Modern web browser o_o
- No backend, no build step, no dependencies

### Installation

```bash
git clone https://github.com/cfrBernard/Dart-Tracker.git
cd dart-tracker
```

### Run the App 

Simply open index.html in your browser:

```
open index.html
```

> OR use a local static server. (Needed with ES Modules)

---

## How to Use

### 1. Start a Game

- Enter player names (optional)
- Select a starting score (301 / 501 / 701)
- Click Start game

### 2. Play Turns

- Enter up to 3 throws per turn
- Supported inputs:
    - 20
    - D20, T19, S20
    - 2.20 (multiplier.base format)
    - 3,20 (multiplier.base format)
- Score preview updates live
- Busts are visually indicated

### 3. Actions

- **Validate**: Apply the turn
- **Undo**: Revert the last action
- **Skip**: Skip current player's turn
- **Reset**: Restart the game with the same settings
- **Quit**: Return to the welcome screen

--- 

## Technical Overview 

- Pure **HTML / CSS / Vanilla JavaScript**
- ES Modules (`type="module"`)
- Centralized state management
- No framework, no external libraries
- Designed to be extended with persistence later

### Project Structure

```
Dart-Tracker/
├── assets/
│   └── icons/
├── css/
│   └── style.css
├── docs/
│   └── CHANGELOG.md
├── index.html
├── js/
│   ├── events.js
│   ├── game.js
│   ├── init.js
│   ├── persistence/
│   │   ├── export.js
│   │   ├── history.js
│   │   ├── security.js
│   │   └── stats.js
│   ├── preview.js
│   ├── router.js
│   ├── state.js
│   ├── ui.js
│   └── utils.js
├── LICENSE.md
└── README.md
```

---

### Architecture (Current)

- State-driven UI
    - A single state object represents the app state
- Unidirectional flow
    - Events → Game Logic → State Update → UI Sync
- Screen routing
    - Managed via simple DOM class toggling
- History stack
    - Enables undo functionality

--- 

## Roadmap

### Short Term

- Help popup (rules & input format)
- Resume game popup
- CSS polish
    - Animations
    - Game action feedback
    - Global visual consistency
- iOS icons & PWA readiness
- Implement player stats

### UX Improvements

- Disable Reset button when game is already at zero state
- More visual feedback for actions (bust, win, skip, undo)
- Normalize invalid inputs

> Currently scaffolded but not implemented in v0.3.2

---

## Notes

- This project is intentionally minimal and framework-free to keep full control over logic, state, and UX.
- The current version focuses on core gameplay correctness before long-term persistence and polish.
- For more information about the version, please refer to the [changelog](docs/CHANGELOG.md) section.
- This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.

---

## Contact

For issues, suggestions, or contributions, feel free to open an issue on the GitHub repository.