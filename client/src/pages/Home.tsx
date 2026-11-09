import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Eye,
  Feather,
  Layers3,
  LockKeyhole,
  Menu,
  Play,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";

type TopicKey = "topic" | "exam" | "skill";
type ConfidenceKey = "low" | "some" | "ready";

const learningPaths: Record<
  TopicKey,
  {
    label: string;
    shortLabel: string;
    firstStep: string;
    context: string;
    steps: { time: string; title: string; detail: string }[];
    nextStep: string;
  }
> = {
  topic: {
    label: "Understand a new topic",
    shortLabel: "A new topic",
    firstStep:
      "Write one question you want answered. Do not try to learn the whole subject yet.",
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
    firstStep:
      "Open your study guide and circle the first concept you can explain in one sentence.",
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
    firstStep:
      "Find one example of the skill in action and name the first move you can copy.",
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

const confidenceOptions: { id: ConfidenceKey; label: string; note: string }[] = [
  { id: "low", label: "Not yet", note: "I need a gentler start" },
  { id: "some", label: "A little", note: "I know a few pieces" },
  { id: "ready", label: "Ready-ish", note: "I can try a stretch" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [topic, setTopic] = useState<TopicKey>("topic");
  const [confidence, setConfidence] = useState<ConfidenceKey>("low");
  const [built, setBuilt] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reflection, setReflection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const path = useMemo(() => learningPaths[topic], [topic]);
  const confidenceLabel = confidenceOptions.find((item) => item.id === confidence)?.label ?? "Not yet";

  function buildPlan() {
    setBuilt(true);
    setRevealed(false);
    setReflection("");
    window.setTimeout(() => scrollToId("plan"), 80);
  }

  return (
    <div className="site-shell">
      <div className="top-strip">
        <span>EVENT BUILD · OCT 17 — NOV 20, 2026</span>
        <span className="top-strip-separator">•</span>
        <span>ACCESS, ONE SMALL STEP AT A TIME</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Access Atlas home">
          <span className="brand-mark"><Compass size={20} strokeWidth={2.3} /></span>
          <span>access atlas</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#story">The story</a>
          <a href="#demo">Try the demo</a>
          <a href="#evidence">Evidence</a>
        </nav>
        <button className="header-cta" onClick={() => scrollToId("demo")}>
          Build a step <ArrowUpRight size={15} />
        </button>
        <button className="menu-button" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#story" onClick={() => setMenuOpen(false)}>The story</a>
          <a href="#demo" onClick={() => setMenuOpen(false)}>Try the demo</a>
          <a href="#evidence" onClick={() => setMenuOpen(false)}>Evidence</a>
        </div>
      )}

      <main id="top">
        <section className="hero-section page-width">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Education access prototype</div>
            <h1>Make the next step <em>visible.</em></h1>
            <p className="hero-lede">
              Access Atlas turns an intimidating learning goal into one clear, doable 20-minute session — so learners can begin before they feel ready.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollToId("demo")}>
                Find my first step <ArrowRight size={17} />
              </button>
              <button className="text-button" onClick={() => scrollToId("story")}>
                Why this exists <ChevronRight size={16} />
              </button>
            </div>
            <div className="hero-note"><Sparkles size={15} /> Built for the moment when “where do I start?” becomes the barrier.</div>
            <div className="team-line"><span>TEAM</span><strong>Add every contributing member here</strong><small>Name — role · Name — role</small></div>
          </div>

          <div className="hero-art" aria-label="Illustration showing a path from an overwhelming map to a clear next step">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-card art-card-back"><span>TOO MUCH</span><div className="scribble-lines"><i /><i /><i /><i /></div></div>
            <div className="art-path-line"><span className="path-dot dot-one" /><span className="path-dot dot-two" /><span className="path-dot dot-three" /></div>
            <div className="art-card art-card-front">
              <div className="card-label"><span className="card-icon"><Zap size={14} /></span> YOUR NEXT STEP</div>
              <strong>Ask one useful<br />question.</strong>
              <small>20 min · gentle start</small>
            </div>
            <div className="art-sticker">LESS<br /><span>searching</span><br />MORE<br /><span>starting</span></div>
          </div>
        </section>

        <section className="proof-row page-width" aria-label="Project focus">
          <div className="proof-item"><span className="proof-number">01</span><div><strong>Choose a learner</strong><p>Adult learners returning to study.</p></div></div>
          <div className="proof-item"><span className="proof-number">02</span><div><strong>Name a barrier</strong><p>Cognitive overload + poor wayfinding.</p></div></div>
          <div className="proof-item"><span className="proof-number">03</span><div><strong>Show a change</strong><p>From “learn everything” to “do this next”.</p></div></div>
        </section>

        <section id="demo" className="demo-section page-width section-anchor">
          <div className="section-intro">
            <div>
              <div className="eyebrow">01 / Working prototype</div>
              <h2>Give the goal a softer landing.</h2>
            </div>
            <p>Pick the thing you want to move forward. Atlas will make the first 20 minutes concrete — not perfect.</p>
          </div>

          <div className="demo-layout">
            <div className="demo-panel">
              <div className="panel-topline"><span className="live-dot" /> Interactive demo <span className="panel-topline-muted">No account · synthetic example</span></div>
              <div className="progress-rail"><span className="rail-active" /><span /><span /></div>
              <div className="demo-step-label">STEP 1 <span>/ 3</span></div>
              <h3>What are you trying to move forward?</h3>
              <div className="choice-stack">
                {(Object.keys(learningPaths) as TopicKey[]).map((key) => (
                  <button key={key} className={`choice-card ${topic === key ? "selected" : ""}`} onClick={() => { setTopic(key); setBuilt(false); }}>
                    <span className="choice-radio">{topic === key && <span />}</span>
                    <span><strong>{learningPaths[key].label}</strong><small>{key === "topic" ? "Make sense of a subject that feels big" : key === "exam" ? "Turn a syllabus into a starting point" : "Learn by following a real example"}</small></span>
                    <ChevronRight size={17} className="choice-arrow" />
                  </button>
                ))}
              </div>
              <div className="confidence-block">
                <div className="demo-step-label">STEP 2 <span>/ 3</span></div>
                <h3>How does it feel right now?</h3>
                <div className="confidence-row">
                  {confidenceOptions.map((item) => (
                    <button key={item.id} className={`confidence-chip ${confidence === item.id ? "selected" : ""}`} onClick={() => { setConfidence(item.id); setBuilt(false); }}>
                      <strong>{item.label}</strong><small>{item.note}</small>
                    </button>
                  ))}
                </div>
              </div>
              <button className="build-button" onClick={buildPlan}>Build my 20-minute step <ArrowRight size={17} /></button>
              <p className="privacy-note"><LockKeyhole size={13} /> Nothing is saved. This is a synthetic learning scenario.</p>
            </div>

            <div className={`result-panel ${built ? "is-ready" : ""}`} id="plan" aria-live="polite">
              {!built ? (
                <div className="result-empty">
                  <div className="empty-icon"><Target size={25} /></div>
                  <div className="eyebrow">Your plan will appear here</div>
                  <h3>Start with one honest choice.</h3>
                  <p>Once you pick a goal and a confidence level, we’ll turn it into a small plan you can actually begin.</p>
                  <div className="empty-line"><span /> <span /> <span /></div>
                </div>
              ) : (
                <div className="result-content">
                  <div className="result-kicker"><span className="success-mark"><Check size={13} /></span> Your starting point <span className="result-kicker-tag">{confidenceLabel}</span></div>
                  <div className="result-heading-row"><h3>{path.shortLabel}, made smaller.</h3><span className="time-badge"><Clock3 size={14} /> 20 min</span></div>
                  <p className="result-context">{path.context}</p>
                  <div className="first-step-box"><span className="first-step-label">FIRST STEP</span><strong>{path.firstStep}</strong></div>
                  <div className="micro-plan-label">YOUR MICRO-PLAN</div>
                  <div className="micro-plan">
                    {path.steps.map((step, index) => (
                      <div className="micro-step" key={step.title}>
                        <span className="micro-index">0{index + 1}</span><span className="micro-time">{step.time}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div>
                      </div>
                    ))}
                  </div>
                  {!revealed ? (
                    <button className="reveal-button" onClick={() => setRevealed(true)}>I’m ready for the next step <Eye size={16} /></button>
                  ) : (
                    <div className="next-step-box"><div className="next-step-title"><span><Sparkles size={14} /> REVEALED WHEN READY</span><Check size={16} /></div><strong>{path.nextStep}</strong><p>Keep it small. The goal is a breadcrumb, not a finish line.</p></div>
                  )}
                  <div className="reflection-block">
                    <div className="micro-plan-label">AFTER YOUR SESSION</div>
                    <p>How manageable did this feel?</p>
                    <div className="reflection-row">
                      {["Manageable", "Okay-ish", "Still stuck"].map((answer) => (
                        <button key={answer} className={`reflection-chip ${reflection === answer ? "selected" : ""}`} onClick={() => setReflection(answer)}>{reflection === answer && <Check size={13} />}{answer}</button>
                      ))}
                    </div>
                    {reflection && <div className="reflection-thanks"><Feather size={14} /> Noted. Your next session can start from here.</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="story" className="story-section page-width section-anchor">
          <div className="section-intro story-intro">
            <div><div className="eyebrow">02 / The learning story</div><h2>Access is a wayfinding problem, too.</h2></div>
            <p>When learning resources multiply, “more” can quietly become a barrier. Access Atlas is designed for the learner who has the will — but not a clear first move.</p>
          </div>
          <div className="story-grid">
            <article className="story-card learner-card"><span className="story-card-number">THE LEARNER</span><Users size={22} /><h3>“I’m capable. I just don’t know where to begin.”</h3><p>An adult learner returning to study after time away, navigating unfamiliar language and too many open tabs.</p><div className="quote-mark">“</div></article>
            <article className="story-card barrier-card"><span className="story-card-number">THE BARRIER</span><Layers3 size={22} /><h3>The starting line keeps moving.</h3><p>Dense explanations, unclear vocabulary, and endless resource lists make the first 20 minutes feel like a test before learning even starts.</p><div className="barrier-graphic"><span /><span /><span /><span /><span /></div></article>
            <article className="story-card change-card"><span className="story-card-number">THE CHANGE</span><ArrowUpRight size={22} /><h3>One visible move creates momentum.</h3><p>Access Atlas translates a big goal into a plain-language first step, a tiny session, and a choice about what comes next.</p><div className="change-graphic"><span>GOAL</span><ArrowRight size={15} /><span className="change-highlight">NEXT STEP</span></div></article>
          </div>
          <div className="learning-note"><span className="story-card-number">WHAT WE LEARNED</span><p>When access is blocked by uncertainty, reducing choice is a form of support. The smallest useful intervention is not more content; it is a better first question.</p></div>
        </section>

        <section className="before-after-section page-width">
          <div className="before-after-head"><div className="eyebrow">03 / Before → after</div><h2>Same learner. Different starting line.</h2><p>A concrete, synthetic example of the change Access Atlas is built to make.</p></div>
          <div className="before-after-board">
            <div className="ba-column before-column"><div className="ba-label"><span className="ba-icon x-icon"><X size={15} /></span> BEFORE</div><h3>“Learn the basics of personal finance.”</h3><p>It sounds useful. It is also too large to act on. Where should the learner click? What counts as “basics”?</p><div className="ba-meta"><span>12 open tabs</span><span>0 clear starts</span></div></div>
            <div className="ba-arrow"><ArrowRight size={24} /></div>
            <div className="ba-column after-column"><div className="ba-label"><span className="ba-icon check-icon"><Check size={15} /></span> AFTER</div><h3>“Sort five purchases into needs or wants.”</h3><p>One question. One example. Four time-boxed moves. The learner can begin now and leave a breadcrumb for next time.</p><div className="ba-meta"><span>20 minutes</span><span>1 visible start</span></div></div>
          </div>
        </section>

        <section id="evidence" className="evidence-section page-width section-anchor">
          <div className="evidence-heading"><div className="eyebrow">04 / Submission evidence</div><h2>Built to be looked at, tried, and questioned.</h2><p>This is an MVP contribution, not a claim that one interface solves access. Here is what is real, what is synthetic, and what comes next.</p></div>
          <div className="evidence-grid">
            <div className="evidence-block"><div className="evidence-icon"><Play size={17} /></div><h3>Working demo</h3><p>Use the live interactive flow above: choose a goal, choose confidence, build a plan, reveal the next step, and reflect.</p><div className="walkthrough-list"><span><b>01</b> Choose a goal</span><span><b>02</b> Build the 20-minute plan</span><span><b>03</b> Reveal + reflect</span></div></div>
            <div className="evidence-block"><div className="evidence-icon"><Zap size={17} /></div><h3>Setup in 60 seconds</h3><p>Clone the project, install dependencies, and run the Vite development server. No database, account, or API key is required for the demo.</p><code>pnpm install<br />pnpm dev:static</code></div>
            <div className="evidence-block"><div className="evidence-icon"><CircleHelp size={17} /></div><h3>Known limitations</h3><p>The plan library is hand-authored for three synthetic scenarios. It does not yet adapt to reading level, collect outcomes, or replace a teacher, tutor, or learning specialist.</p><a href="#credits" className="inline-link">Read the credits <ArrowUpRight size={14} /></a></div>
          </div>
          <div className="visual-evidence"><div><div className="evidence-icon"><Eye size={17} /></div><h3>Visual evidence</h3><p>Two captured views show the responsive landing page, empty demo state, story, before/after example, and transparent credits. Use them as Devpost screenshots or as a quick visual walkthrough.</p></div><div className="visual-links"><a href="/screenshots/access-atlas-desktop.png" target="_blank" rel="noreferrer"><span>DESKTOP CAPTURE</span><strong>Open 1280 × full-page <ArrowUpRight size={14} /></strong></a><a href="/screenshots/access-atlas-mobile.png" target="_blank" rel="noreferrer"><span>MOBILE CAPTURE</span><strong>Open 375 × full-page <ArrowUpRight size={14} /></strong></a></div></div>
          <div id="credits" className="credits-panel"><div className="credits-title"><Feather size={17} /> Transparent credits</div><div className="credits-copy"><p><strong>Examples:</strong> Synthetic scenarios only. No private student records or real grades are used. Any future learner research would require permission-cleared participation.</p><p><strong>Tools + libraries:</strong> React, TypeScript, Vite, Tailwind CSS, lucide-react, and the managed Webdev starter. <strong>Datasets:</strong> None. <strong>Assets:</strong> Interface shapes and icons are original / library-provided; no stock photos.</p><p><strong>AI assistance:</strong> AI-assisted ideation, copy shaping, and code generation were used; the product direction, requirements mapping, interaction design, and review were human-led.</p><p><strong>Pre-existing foundation:</strong> The managed React starter, project scaffolding, and baseline tooling existed before the event contribution window. Product-specific content, visual system, interactive flow, and submission story were built during October 17–November 20, 2026.</p></div></div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <div className="footer-brand"><span className="brand-mark"><Compass size={18} /></span><span>access atlas</span></div>
        <p>Choose a learner. Name a barrier. Show a change.</p>
        <span className="footer-date">Event build · 2026</span>
      </footer>
    </div>
  );
}
