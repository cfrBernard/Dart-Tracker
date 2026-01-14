## [v0.3.1] – 2026/01/15

### Fixed
- Unique game ID fixed

### Improved
- Game history UI layout 

---

## [v0.3.0] – 2026/01/14

### Added
- Game history (JSON Based)
- Data export/import
- Clear data function

### Note
- Needs some UI polish / game history convention

---

## [v0.2.0] – 2026/01/14

### Added
- Security persistence (resume game)

### Note
- Resume popup needed (alert for now)

---

## [v0.1.0] – 2026/01/13

### Added
- Initial public prototype of Dart Tracker
- Two-player darts game support (301 / 501 / 701)
- Turn-based game engine with score validation
- Bust detection and handling
- Live score preview while typing throws
- Game log with turn history
- Undo last action
- Skip turn action
- Game reset and quit flow
- Basic screen routing (Welcome / Game)

### Technical
- Centralized application state
- Modular ES6 architecture (state, game logic, UI, routing)
- No external dependencies (pure HTML / CSS / JavaScript)
- Scaffolding for future persistence layers (security & stats)

### Known Limitations
- No persistence (game data is lost on refresh)
- Help screen not implemented
- Limited input validation and normalization
- Minimal UX feedback

---