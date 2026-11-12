# Angular application guidance

Generated apps target Angular 21; framework dependency ranges allow patch updates, while only the builder is pinned. The Angular AI guidance at https://angular.dev/ai/develop-with-ai includes Angular 22+ defaults: `OnPush` is still opt-in in Angular 21, Signal Forms are not yet stable, and `@Injectable({ providedIn: 'root' })` remains the standard singleton service pattern.

## New Angular code

- Prefer standalone components, directives, and pipes. Standalone is the default; omit `standalone: true`. List every component, directive, and pipe used by a standalone template in its `imports`.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on new components.
- Use `input()` and `output()` for new component APIs, and `inject()` for dependency injection.
- Use signals for local component state and `computed()` for derived values. Keep established NgRx feature state as the source of truth for shared or feature state; do not replace it with component signals.
- Use native template control flow (`@if`, `@for`, `@switch`) in new templates. Prefer direct `class` and `style` bindings over `NgClass` and `NgStyle`.
- Prefer lazy-loaded feature routes. Use Reactive Forms for new forms; Signal Forms are not stable in Angular 21.
- Use `NgOptimizedImage` for static image assets when applicable; inline data images are an exception.
- Put host bindings in the component or directive `host` metadata.
- Keep templates focused and accessible: use semantic elements, associated labels, keyboard-operable controls, and deliberate focus handling. Meet WCAG AA and pass applicable axe accessibility checks.
- Use strict types, infer obvious types, and prefer `unknown` to `any` when a value is uncertain.

## OneCX integration and existing code

- Preserve the NgModule adapters required by OneCX remote registration and bootstrap, along with existing NgRx feature wiring. Do not remove or redesign these integration boundaries as part of routine component work.
- Follow established patterns in untouched code; modernize only code in scope rather than mass-rewriting templates, state, or module boundaries.

## Completion

Add or update focused tests for changed behavior. Run the relevant quality checks using scripts defined by this app's `package.json`; allow configured pre-commit hooks to run.
