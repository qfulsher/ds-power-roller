# Copilot Instructions for PowerRolls

## Project Overview
- **PowerRolls** is an Angular application for simulating dice rolls with RPG mechanics and 3D dice visualization.
- The app uses Angular 20+ with standalone components, signals, and reactive forms.
- 3D dice rendering is handled by the `@3d-dice/dice-box` library, with assets in `public/assets/`.
- Theming and user preferences are managed via signals and stored in `sessionStorage`.

## Key Architecture & Patterns
- Main UI logic is in `src/app/app.component.ts` and its template/scss.
- Components are organized under `src/app/components/` (e.g., `aura-icon`, `roll-card`).
- State is managed with Angular signals (`signal`, `computed`, `effect`) for reactivity.
- Forms use Angular Reactive Forms (`FormGroup`, `FormControl`).
- Roll history and user settings are persisted in `sessionStorage`.
- The app supports light/dark themes, toggled via a signal and `<html data-theme>`.
- DiceBox is initialized in `ngAfterViewInit` and attached to `.content__dice__box`.

## Developer Workflows
- **Start dev server:** `ng serve` (see README for details)
- **Build for production:** `ng build -c production`
- **Run unit tests:** `ng test` (Karma)
- **E2E tests:** `ng e2e` (framework not included by default)
- **Scaffold components:** `ng generate component <name>`
- **Custom tasks:** See `.vscode/tasks.json` for npm-based tasks.

## Project-Specific Conventions
- Use Angular standalone components (no NgModules).
- Use signals for all reactive state; avoid RxJS `BehaviorSubject` for UI state.
- Persist user state (forms, theme, history) in `sessionStorage`.
- All dice logic and roll modifiers are handled in `AppComponent`.
- The characteristic select uses a string value of `'null'` to represent 'None'.
- The roll button is always enabled; validation and feedback are handled in the click/submit handlers.
- Flashing outline feedback is triggered on the characteristic select if the user attempts to roll without selecting a characteristic.
- 3D dice assets and themes are in `public/assets/themes/`.

## Integration Points
- 3D dice: `@3d-dice/dice-box` (see DiceBox usage in `app.component.ts`).
- Theming: theme assets and config in `public/assets/themes/default/`.
- No backend/API integration; all logic is client-side.

## Examples
- See `app.component.ts` for signal usage, DiceBox integration, and form logic.
- See `app.component.html` for template patterns, including the roll form and history rendering.
- See `app.component.scss` for custom styles, including the flash-outline animation.

---

For more, see the [README.md](../README.md) and Angular CLI docs. When in doubt, follow the patterns in `app.component.ts` and use signals for state.
