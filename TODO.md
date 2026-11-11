# Access Atlas engineering checklist

## Completed

- [x] Product README, setup instructions, screenshots, live demo, license, env template, privacy notes, adaptive-learning notes, and accessibility audit are documented.
- [x] The primary page has Skip to content, visible focus, semantic landmarks, reduced-motion support, persisted reading preferences, high contrast, dyslexia-friendly font, larger text, and line spacing controls.
- [x] Adaptive learning rules are isolated in `client/src/lib/adaptiveLearning.ts` and covered by edge-case unit tests.
- [x] Public and protected tRPC route behavior has focused tests.
- [x] Unused starter dashboards, UI primitives, showcase page, chat/map helpers, and unused AI/image/voice/map server integrations have been removed.
- [x] Template-only dependencies were removed and `pnpm-lock.yaml` was regenerated.
- [x] Error, Not Found, empty-plan, and clipboard-blocked states have clear next actions.

## Deliberate MVP limitations

- [ ] Add permission-cleared learner testing before making claims about learning outcomes.
- [ ] Add persisted plans only after defining consent, retention, access, export, and deletion behavior.
- [ ] Expand the three hand-authored learning paths with teacher-reviewed content.
- [ ] Perform manual screen-reader, keyboard-only, 200% zoom, and mobile assistive-technology review before a broad public launch.
- [ ] Replace the owner placeholder in the project story with the actual contributor names and design/testing statement before final submission.
