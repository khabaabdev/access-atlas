# Access Atlas — Devpost submission draft

## Name
Access Atlas — Make the next step visible

## Short pitch
Most learning tools add more content. Access Atlas removes the uncertainty before learning begins by turning one intimidating goal into a plain-language first step and a manageable 20-minute session.

## Intended learner and barrier
Access Atlas is designed for an adult learner returning to study who is capable but overwhelmed by dense resources, unfamiliar vocabulary, and not knowing where to begin. The barrier is cognitive overload and poor wayfinding, not lack of motivation.

## What the learner can do
The learner chooses a goal, optionally names a specific topic, and selects how ready they feel. Access Atlas adapts the first step and the 20-minute plan to that confidence level. The learner can reveal the next step only when ready, reflect on manageability, and copy or print the plan.

## What changed in the MVP
The first version treated confidence mostly as a label. The current version makes it meaningful: “Not yet” creates a gentler plan with simpler actions, “A little” provides the steady baseline plan, and “Ready-ish” adds a small stretch and practice move. The product also includes Focus view and Larger text controls so the access tool is more accessible itself.

## Concrete before-and-after example
Before: “Learn the basics of personal finance.”

After: “Write one question about percentages, read one short explanation, try one example, and leave one breadcrumb for next time.”

## Tools and technical approach
React, TypeScript, Vite, Tailwind CSS, lucide-react, and the managed Webdev starter. The current plan library is hand-authored so the behavior is transparent and easy to evaluate. The app is client-side for this MVP and requires no account, database, or API key.

## Challenges and what we learned
The core challenge was resisting the temptation to add more resources. We learned that access can mean reducing uncertainty before adding content. We also learned that a confidence question only matters if it changes the support the learner receives; that is why the current prototype uses three genuinely different plan modes.

## Validation plan
Before making an impact claim, run five permission-cleared sessions with volunteers or synthetic scenarios. Observe time to first action, whether the learner completes the 20-minute session, perceived manageability, and whether they can name a next step. Do not collect private student records or real grades.

## Demo walkthrough
1. Enter “understand percentages” in the optional goal field.
2. Select “Not yet” and build the plan.
3. Show the gentler first step and time-boxed actions.
4. Switch to “Ready-ish” and rebuild to show the adaptive change.
5. Reveal the next step, reflect, and copy or print the plan.
6. Toggle Focus view and Larger text.

## Transparency
Examples are synthetic or permission-cleared. No private student records or real grades are used. AI assistance supported ideation, copy shaping, and code generation; product direction, interaction design, requirements mapping, and review were human-led. Pre-existing work is limited to the managed React starter, project scaffolding, and baseline tooling. Product-specific content, visual system, adaptive flow, accessibility controls, and submission story were created during the event contribution window of October 17–November 20, 2026.

## Team
Add every contributing team member and role here before submitting.
