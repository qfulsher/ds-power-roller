# PowerRolls 

PowerRolls is an Angular application for simulating 3d dice rolls for the Draw Steel RPG.

## Features
- **3D Dice Simulation:** Realistic dice rolling using the `@3d-dice/dice-box` library.
- **Mechanics:** Supports characteristic selection, roll modifiers, and roll history.
- **Theming:** Light/dark mode toggle, with user preferences and roll history persisted in `sessionStorage`.
- **No Backend:** All logic is client-side; no API or server required.

## Getting Started

### Development Server
Start the local dev server:

```bash
ng serve
```
Visit [http://localhost:4200/](http://localhost:4200/) in your browser. The app reloads automatically on code changes.

### Building for Production
To build the project:

```bash
ng build -c production
```
Build artifacts are output to the `dist/` directory.

### Running Unit Tests
To run unit tests with Karma:

```bash
ng test
```

## Project Structure & Conventions
- Main logic: `src/app/app.component.ts` (signals, forms, DiceBox integration)
- Components: `src/app/components/`
- 3D assets & themes: `public/assets/themes/`
- State: Managed with Angular signals, persisted in `sessionStorage`
- Theming: `<html data-theme>` and theme assets

For more, see the [copilot-instructions.md](.github/copilot-instructions.md) and code comments in `app.component.ts`.
