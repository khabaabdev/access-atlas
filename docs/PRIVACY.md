# Privacy notes

Access Atlas is currently a client-side planning experience. The learner can choose a goal, enter an optional topic, select a confidence level, generate a plan, reveal a next step, and choose a reflection response. Those product interactions are held in browser memory for the current page session.

## What is stored

The current learner flow does not send the custom goal, confidence choice, generated plan, revealed step, or reflection response to an Access Atlas product database. Reading preferences such as Focus view, Larger text, Dyslexia-friendly font, High contrast, and Line spacing are stored in the browser’s `localStorage` so they can be remembered on the same browser.

The repository contains generic Manus platform authentication and user-schema scaffolding. If platform login or a database is enabled for a deployment, the platform may store account and authentication fields defined in `drizzle/schema.ts`, including an OAuth identifier, name, email, login method, role, and timestamps. The current public learner flow does not require an account.

## Why

Local-only learner inputs keep the MVP simple and avoid collecting private student records or real grades. Local accessibility preferences exist only to preserve a learner’s chosen reading experience between visits on the same browser.

## Protection and limitations

The current project does not provide a learner account, export/delete workflow, data retention dashboard, or cross-device preference sync. Browser `localStorage` is not a secure vault; do not enter sensitive student information. Examples should remain synthetic or permission-cleared.

If future versions persist plans, reflections, or progress, they should define a retention period, access controls, deletion/export behavior, encryption expectations, and a clear consent experience before collection begins.
