import { describe, expect, it } from "vitest";
import { createAdaptivePlan, learningPaths, type ConfidenceKey, type TopicKey } from "./adaptiveLearning";

describe("createAdaptivePlan", () => {
  it("builds a gentle default plan for a new learner", () => {
    const plan = createAdaptivePlan({ topic: "topic", confidence: "low" });

    expect(plan.learnerGoal).toBe("A new topic");
    expect(plan.personalizedFirstStep).toBe(plan.path.firstStep);
    expect(plan.adaptiveSteps[0]?.title).toBe("Make the question smaller");
    expect(plan.adaptiveSteps[3]?.title).toBe("Leave one breadcrumb");
  });

  it("personalizes a trimmed custom goal and caps oversized input", () => {
    const plan = createAdaptivePlan({
      topic: "skill",
      confidence: "some",
      customGoal: `  ${"understand a spreadsheet formula ".repeat(4)}  `,
    });

    expect(plan.learnerGoal.length).toBe(60);
    expect(plan.learnerGoal).not.toMatch(/^\s|\s$/);
    expect(plan.personalizedFirstStep).toContain("Write one useful question about");
  });

  it("adds a practice-oriented stretch for a ready learner", () => {
    const plan = createAdaptivePlan({ topic: "exam", confidence: "ready", customGoal: "fractions" });

    expect(plan.confidenceLabel).toBe("Ready-ish");
    expect(plan.personalizedFirstStep).toContain("Name the outcome you want about");
    expect(plan.adaptiveSteps[0]?.title).toBe("Name the outcome");
    expect(plan.adaptiveSteps[2]?.title).toBe("Test your understanding");
  });

  it("keeps the steady plan unchanged across every learning path", () => {
    const topics: TopicKey[] = ["topic", "exam", "skill"];
    topics.forEach((topic) => {
      const plan = createAdaptivePlan({ topic, confidence: "some" });
      expect(plan.adaptiveSteps).toEqual(learningPaths[topic].steps);
      expect(plan.adaptiveSteps.reduce((total, step) => total + Number.parseInt(step.time, 10), 0)).toBe(20);
    });
  });

  it("keeps every confidence mode within the 20-minute session", () => {
    const topics: TopicKey[] = ["topic", "exam", "skill"];
    const confidences: ConfidenceKey[] = ["low", "some", "ready"];
    topics.forEach((topic) => confidences.forEach((confidence) => {
      const plan = createAdaptivePlan({ topic, confidence, customGoal: "   " });
      expect(plan.adaptiveSteps).toHaveLength(4);
      expect(plan.adaptiveSteps.reduce((total, step) => total + Number.parseInt(step.time, 10), 0)).toBe(20);
    }));
  });
});
