# Accessibility audit

## Scope

This audit covers the primary Access Atlas page at `/`. The product is a single-page learner flow with a goal selector, custom goal input, confidence controls, generated plan, progressive next step, reflection controls, and reading preferences.

## Implemented improvements

- Added a keyboard-focusable **Skip to main content** link.
- Added global visible focus styles for links, buttons, and inputs.
- Added semantic `main`, `nav`, `aside`, `section`, and `footer` landmarks.
- Added `aria-expanded` and `aria-controls` to the mobile navigation control.
- Added `aria-pressed` state to goal, confidence, reflection, and reading-preference controls.
- Added a polite live region for accessibility-preference changes and retained the live region for generated plans.
- Added Focus view, Larger text, Dyslexia-friendly font, High contrast, and Line spacing controls.
- Persisted reading preferences in `localStorage` when browser storage is available.
- Added `prefers-reduced-motion` CSS and avoided smooth scrolling when the preference is active.
- Removed the viewport restriction that prevented zooming.
- Corrected the Lighthouse and axe-detected contrast/landmark issues.

## Automated results

Commands were run against the local page served at `http://127.0.0.1:3000/`.

| Audit | Before final Phase 2 fixes | After fixes |
|---|---:|---:|
| Lighthouse accessibility | 0.90 | 1.00 |
| Lighthouse failed audits | Contrast; viewport zoom restriction | None |
| axe-core | Not available in the first run because the installed ChromeDriver supported Chrome 152 while the available Chromium was 156 | 0 violations |

The successful axe run used axe-core 4.14.0 with a matching ChromeDriver for Chromium 156. The axe CLI reported that automated checks do not detect every accessibility issue.

The project regression checks also passed after the changes:

```text
pnpm check  -> passed
pnpm test   -> 2 test files, 6 tests passed
pnpm build:static -> passed
```

## Manual review still needed

Automated audits cannot verify the full experience. Before submitting, manually test the page with a keyboard only, a screen reader such as VoiceOver/NVDA, browser zoom at 200%, and a mobile screen reader. Confirm that focus is visible after every action, the generated plan is announced at a useful time, the custom goal and confidence choices are understandable without visual styling, and the font/contrast/spacing settings remain comfortable across the whole page.

The current preference settings are local to the browser and are not synchronized across devices. The app does not yet provide a dedicated dyslexia research validation study or a user-configurable text-size scale beyond the Larger text toggle.
