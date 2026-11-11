# Adaptive learning rules

Access Atlas uses a transparent, rule-based planner in `client/src/lib/adaptiveLearning.ts`. It does not use a trained model, learner history, grades, correctness signals, or hidden personalization.

## Inputs

`createAdaptivePlan` accepts:

- `topic`: `topic`, `exam`, or `skill`.
- `confidence`: `low`, `some`, or `ready`.
- `customGoal`: an optional learner-entered string. Whitespace is trimmed and the value is capped at 60 characters.

## Rules

1. The topic selects one of three hand-authored learning paths.
2. A custom goal personalizes the first-step wording. An empty or whitespace-only goal falls back to the selected path’s short label and default first step.
3. `low` selects a gentle mode: the first action becomes “Make the question smaller” and the final action becomes “Leave one breadcrumb.”
4. `some` selects the baseline path without replacing the authored actions.
5. `ready` selects a stretch mode: the first action becomes “Name the outcome” and the practice action becomes “Test your understanding.”
6. All modes preserve four actions totalling 20 minutes.
7. The next step is not shown until the learner chooses to reveal it in the UI.

## Outputs

The module returns:

- The selected base path.
- The confidence label and explanatory adjustment.
- A normalized learner goal.
- The adapted four-step micro-plan.
- The personalized first step.

## Before and after example

Input: `topic=topic`, `confidence=ready`, `customGoal="understand percentages"`.

Before adaptation, the generic topic path begins with “Name your question.” After the ready-mode rule is applied, the first action becomes “Name the outcome,” the practice action becomes “Test your understanding,” and the first-step prompt includes the learner’s topic.

## What it does not do

This is a planning aid, not an assessment engine. It does not infer ability, evaluate answers, store learner history, recommend resources from a curriculum database, or claim that a learner has learned something. Those capabilities would require permission-cleared research, user testing, and a separate product/data design.
