export type TopicKey = "topic" | "exam" | "skill";
export type ConfidenceKey = "low" | "some" | "ready";

export type LearningStep = { time: string; title: string; detail: string };
export type LearningPath = {
  label: string;
  shortLabel: string;
  firstStep: string;
  context: string;
  steps: LearningStep[];
  nextStep: string;
};

export const learningPaths: Record<TopicKey, LearningPath> = {
  topic: {
    label: "Understand a new topic",
    shortLabel: "A new topic",
    firstStep: "Write one question you want answered. Do not try to learn the whole subject yet.",
    context: "We will trade the giant subject for one useful question.",
    steps: [
      { time: "2 min", title: "Name your question", detail: "Write what you want to be able to explain." },
      { time: "8 min", title: "Read one short explainer", detail: "Look for the answer to your question, not every new word." },
      { time: "6 min", title: "Say it in your words", detail: "Explain the idea as if you were texting a friend." },
      { time: "4 min", title: "Leave a breadcrumb", detail: "Write one question to pick up next time." },
    ],
    nextStep: "Try a three-question practice check using your own example.",
  },
  exam: {
    label: "Prepare for an exam",
    shortLabel: "An upcoming exam",
    firstStep: "Open your study guide and circle the first concept you can explain in one sentence.",
    context: "We will start with one visible concept, not the whole syllabus.",
    steps: [
      { time: "3 min", title: "Choose one concept", detail: "Circle the first idea on your guide that feels familiar." },
      { time: "7 min", title: "Find the anchor", detail: "Read one worked example or class note about it." },
      { time: "6 min", title: "Close the notes", detail: "Write the idea from memory in three plain sentences." },
      { time: "4 min", title: "Mark the wobble", detail: "Put a star beside the part you want to revisit." },
    ],
    nextStep: "Turn your starred wobble into one small practice question.",
  },
  skill: {
    label: "Build a work skill",
    shortLabel: "A work skill",
    firstStep: "Find one example of the skill in action and name the first move you can copy.",
    context: "We will study one real example before collecting more resources.",
    steps: [
      { time: "2 min", title: "Pick one example", detail: "Choose a short demo, artifact, or model you trust." },
      { time: "8 min", title: "Spot the first move", detail: "Notice what happens before the impressive result." },
      { time: "6 min", title: "Copy the shape", detail: "Make a tiny version with your own subject or data." },
      { time: "4 min", title: "Name the gap", detail: "Write the next question that would make your version better." },
    ],
    nextStep: "Make one more tiny version with a new example.",
  },
};

export const confidenceOptions: { id: ConfidenceKey; label: string; note: string }[] = [
  { id: "low", label: "Not yet", note: "I need a gentler start" },
  { id: "some", label: "A little", note: "I know a few pieces" },
  { id: "ready", label: "Ready-ish", note: "I can try a stretch" },
];

export const confidenceAdjustments: Record<ConfidenceKey, { label: string; context: string; firstStepPrefix: string }> = {
  low: { label: "Gentle start", context: "We kept the language simple and made the first move extra small.", firstStepPrefix: "Start with one question" },
  some: { label: "Steady start", context: "We balanced a clear explanation with one small practice move.", firstStepPrefix: "Write one useful question" },
  ready: { label: "Stretch start", context: "We added a little more practice so you can test the idea as you go.", firstStepPrefix: "Name the outcome you want" },
};

export type AdaptivePlan = {
  path: LearningPath;
  confidenceLabel: string;
  learnerGoal: string;
  adjustment: (typeof confidenceAdjustments)[ConfidenceKey];
  adaptiveSteps: LearningStep[];
  personalizedFirstStep: string;
};

/**
 * Builds a transparent 20-minute plan. This is intentionally rule-based:
 * topic selects the base path, confidence changes two actions, and a custom
 * goal personalizes the first step. No learner history or performance data is used.
 */
export function createAdaptivePlan({
  topic,
  confidence,
  customGoal = "",
}: {
  topic: TopicKey;
  confidence: ConfidenceKey;
  customGoal?: string;
}): AdaptivePlan {
  const path = learningPaths[topic] ?? learningPaths.topic;
  const adjustment = confidenceAdjustments[confidence] ?? confidenceAdjustments.low;
  const trimmedGoal = customGoal.trim().slice(0, 60);
  const learnerGoal = trimmedGoal || path.shortLabel;
  const adaptiveSteps = confidence === "low"
    ? path.steps.map((step, index) => index === 0
      ? { ...step, title: "Make the question smaller", detail: "Use one sentence. Circle only one unfamiliar word." }
      : index === 3
        ? { ...step, title: "Leave one breadcrumb", detail: "Write the next question without solving it today." }
        : step)
    : confidence === "ready"
      ? path.steps.map((step, index) => index === 0
        ? { ...step, title: "Name the outcome", detail: "Write what you want to be able to explain or make." }
        : index === 2
          ? { ...step, title: "Test your understanding", detail: "Try a fresh example without looking back at the notes." }
          : step)
      : path.steps;
  const personalizedFirstStep = trimmedGoal
    ? `${adjustment.firstStepPrefix} about “${trimmedGoal}”: what is the first thing you need to be able to explain or do?`
    : confidence === "ready"
      ? `Write the result you want from ${path.shortLabel.toLowerCase()} in one sentence, then choose one example to try.`
      : path.firstStep;

  return {
    path,
    confidenceLabel: confidenceOptions.find((item) => item.id === confidence)?.label ?? confidenceOptions[0].label,
    learnerGoal,
    adjustment,
    adaptiveSteps,
    personalizedFirstStep,
  };
}
