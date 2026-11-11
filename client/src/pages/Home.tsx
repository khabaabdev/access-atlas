import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Eye,
  Feather,
  LockKeyhole,
  Menu,
  Sparkles,
  Target,
  Type,
  X,
  Zap,
} from "lucide-react";

import { confidenceOptions, createAdaptivePlan, learningPaths, type ConfidenceKey, type TopicKey } from "@/lib/adaptiveLearning";

function scrollToId(id: string) {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

function readPreference(key: string) {
  try {
    return window.localStorage.getItem(`access-atlas:${key}`) === "true";
  } catch {
    return false;
  }
}

export default function Home() {
  const [topic, setTopic] = useState<TopicKey>("topic");
  const [confidence, setConfidence] = useState<ConfidenceKey>("low");
  const [customGoal, setCustomGoal] = useState("");
  const [built, setBuilt] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reflection, setReflection] = useState("");
  const [copied, setCopied] = useState(false);
  const [focusMode, setFocusMode] = useState(() => readPreference("focus"));
  const [largeText, setLargeText] = useState(() => readPreference("large-text"));
  const [dyslexiaMode, setDyslexiaMode] = useState(() => readPreference("dyslexia"));
  const [highContrast, setHighContrast] = useState(() => readPreference("contrast"));
  const [roomyText, setRoomyText] = useState(() => readPreference("spacing"));
  const [accessibilityStatus, setAccessibilityStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const preferences = { focus: focusMode, "large-text": largeText, dyslexia: dyslexiaMode, contrast: highContrast, spacing: roomyText };
    try {
      Object.entries(preferences).forEach(([key, value]) => window.localStorage.setItem(`access-atlas:${key}`, String(value)));
    } catch {
      // Preferences remain available for the current session when storage is blocked.
    }
  }, [dyslexiaMode, focusMode, highContrast, largeText, roomyText]);

  const adaptivePlan = useMemo(() => createAdaptivePlan({ topic, confidence, customGoal }), [confidence, customGoal, topic]);
  const { path, confidenceLabel, learnerGoal, adjustment, adaptiveSteps, personalizedFirstStep } = adaptivePlan;

  function buildPlan() {
    setBuilt(true);
    setRevealed(false);
    setReflection("");
    window.setTimeout(() => scrollToId("plan"), 80);
  }

  async function copyPlan() {
    const planText = `Access Atlas — ${learnerGoal}\n\nFirst step: ${personalizedFirstStep}\n\n20-minute plan:\n${adaptiveSteps.map((step) => `${step.time} — ${step.title}: ${step.detail}`).join("\n")}\n\nNext step: ${path.nextStep}`;
    try {
      await navigator.clipboard.writeText(planText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`site-shell ${focusMode ? "focus-mode" : ""} ${largeText ? "large-text" : ""} ${dyslexiaMode ? "dyslexia-mode" : ""} ${highContrast ? "high-contrast" : ""} ${roomyText ? "roomy-text" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="brand" href="#main-content" aria-label="Access Atlas home">
          <span className="brand-mark"><Compass size={20} strokeWidth={2.3} /></span>
          <span>access atlas</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#story">How it works</a>
          <a href="#demo">Try it</a>
          <a href="#about">About</a>
        </nav>
        <button className="header-cta" onClick={() => scrollToId("demo")}>
          Build a step <ArrowUpRight size={15} />
        </button>
        <button className="menu-button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>
      <aside className="access-toolbar page-width" aria-label="Reading options">
        <span>Reading options</span>
        <button aria-pressed={focusMode} onClick={() => { const next = !focusMode; setFocusMode(next); setAccessibilityStatus(`Focus view ${next ? "on" : "off"}.`); }}><Eye size={13} /> {focusMode ? "Exit focus view" : "Focus view"}</button>
        <button aria-pressed={largeText} onClick={() => { const next = !largeText; setLargeText(next); setAccessibilityStatus(`Larger text ${next ? "on" : "off"}.`); }}><Type size={13} /> {largeText ? "Default text" : "Larger text"}</button>
        <button aria-pressed={dyslexiaMode} onClick={() => { const next = !dyslexiaMode; setDyslexiaMode(next); setAccessibilityStatus(`Dyslexia-friendly font ${next ? "on" : "off"}.`); }}>Aa&nbsp; Dyslexia-friendly font</button>
        <button aria-pressed={highContrast} onClick={() => { const next = !highContrast; setHighContrast(next); setAccessibilityStatus(`High contrast ${next ? "on" : "off"}.`); }}>◐&nbsp; High contrast</button>
        <button aria-pressed={roomyText} onClick={() => { const next = !roomyText; setRoomyText(next); setAccessibilityStatus(`Extra line spacing ${next ? "on" : "off"}.`); }}>↕&nbsp; Line spacing</button>
        <span className="sr-only" role="status" aria-live="polite">{accessibilityStatus}</span>
      </aside>
      {menuOpen && (
        <div className="mobile-menu" id="mobile-navigation">
          <a href="#story" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#demo" onClick={() => setMenuOpen(false)}>Try it</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </div>
      )}

      <main id="main-content" tabIndex={-1}>
        <section className="hero-section page-width">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> A calmer way to learn</div>
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

        <section id="demo" className="demo-section page-width section-anchor">
          <div className="section-intro">
            <div>
              <div className="eyebrow">Find your first step</div>
              <h2>Give the goal a softer landing.</h2>
            </div>
            <p>Pick the thing you want to move forward. Atlas will make the first 20 minutes concrete — not perfect.</p>
          </div>

          <div className="demo-layout">
            <div className="demo-panel">
              <div className="panel-topline"><span className="live-dot" /> Your private starting point <span className="panel-topline-muted">No account needed</span></div>
              <div className="progress-rail"><span className="rail-active" /><span /><span /></div>
              <div className="demo-step-label">STEP 1 <span>/ 3</span></div>
              <h3>What are you trying to move forward?</h3>
              <div className="choice-stack">
                {(Object.keys(learningPaths) as TopicKey[]).map((key) => (
                  <button key={key} type="button" aria-pressed={topic === key} className={`choice-card ${topic === key ? "selected" : ""}`} onClick={() => { setTopic(key); setBuilt(false); }}>
                    <span className="choice-radio">{topic === key && <span />}</span>
                    <span><strong>{learningPaths[key].label}</strong><small>{key === "topic" ? "Make sense of a subject that feels big" : key === "exam" ? "Turn a syllabus into a starting point" : "Learn by following a real example"}</small></span>
                    <ChevronRight size={17} className="choice-arrow" />
                  </button>
                ))}
              </div>
              <label className="goal-input-label" htmlFor="learner-goal">OPTIONAL / MAKE IT YOURS</label>
              <div className="goal-input-wrap"><input id="learner-goal" value={customGoal} onChange={(event) => { setCustomGoal(event.target.value); setBuilt(false); }} placeholder="e.g. understand percentages" /><span>{customGoal.length}/60</span></div>
              <div className="confidence-block">
                <div className="demo-step-label">STEP 2 <span>/ 3</span></div>
                <h3>How does it feel right now?</h3>
                <div className="confidence-row">
                  {confidenceOptions.map((item) => (
                    <button key={item.id} type="button" aria-pressed={confidence === item.id} className={`confidence-chip ${confidence === item.id ? "selected" : ""}`} onClick={() => { setConfidence(item.id); setBuilt(false); }}>
                      <strong>{item.label}</strong><small>{item.note}</small>
                    </button>
                  ))}
                </div>
              </div>
              <button className="build-button" onClick={buildPlan}>Build my 20-minute step <ArrowRight size={17} /></button>
              <p className="privacy-note"><LockKeyhole size={13} /> Nothing is saved. Your plan stays yours.</p>
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
                  <p className="result-context">{path.context} {adjustment.context}</p>
                  <div className="first-step-box"><span className="first-step-label">FIRST STEP FOR · {learnerGoal.toUpperCase()}</span><strong>{personalizedFirstStep}</strong></div>
                  <div className="micro-plan-label">YOUR MICRO-PLAN</div>
                  <div className="micro-plan">
                    {adaptiveSteps.map((step, index) => (
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
                  <div className="result-actions"><button onClick={copyPlan}>{copied ? <Check size={14} /> : <Feather size={14} />}{copied ? "Copied" : "Copy plan"}</button><button onClick={() => window.print()}><ArrowUpRight size={14} /> Print / save PDF</button></div>
                  <div className="reflection-block">
                    <div className="micro-plan-label">AFTER YOUR SESSION</div>
                    <p>How manageable did this feel?</p>
                    <div className="reflection-row">
                      {["Manageable", "Okay-ish", "Still stuck"].map((answer) => (
                        <button key={answer} type="button" aria-pressed={reflection === answer} className={`reflection-chip ${reflection === answer ? "selected" : ""}`} onClick={() => setReflection(answer)}>{reflection === answer && <Check size={13} />}{answer}</button>
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
            <div><div className="eyebrow">How it works</div><h2>Learning gets lighter one move at a time.</h2></div>
            <p>Access Atlas keeps the horizon in view while giving you one small thing to do now.</p>
          </div>
          <div className="story-grid">
            <article className="story-card learner-card"><span className="story-card-number">01 / CHOOSE</span><Target size={22} /><h3>Choose a goal, not a whole curriculum.</h3><p>Start with the thing you want to understand or do. You can make it more specific as you go.</p><div className="quote-mark">1</div></article>
            <article className="story-card barrier-card"><span className="story-card-number">02 / FOCUS</span><Clock3 size={22} /><h3>Spend 20 minutes finding your footing.</h3><p>A short plan helps you read, try, and reflect without opening ten more tabs.</p><div className="barrier-graphic"><span /><span /><span /><span /><span /></div></article>
            <article className="story-card change-card"><span className="story-card-number">03 / CONTINUE</span><Feather size={22} /><h3>Leave a breadcrumb for next time.</h3><p>When you are ready, reveal one more step. Progress can be quiet and still count.</p><div className="change-graphic"><span>NOW</span><ArrowRight size={15} /><span className="change-highlight">NEXT</span></div></article>
          </div>
          <div className="learning-note"><span className="story-card-number">A SMALLER START</span><p>You do not need more tabs to make progress. You need one clear question and a place to begin.</p></div>
        </section>

        <section id="about" className="about-section page-width section-anchor">
          <div className="about-card"><div><div className="eyebrow">About Access Atlas</div><h2>Less searching. More starting.</h2></div><p>Access Atlas is a gentle planning tool for the moment when a learning goal feels bigger than the next move. It does not replace a teacher or tutor. It helps you arrive with a question, a little momentum, and a clearer sense of what to try next.</p></div>
        </section>

        <section className="final-cta page-width">
          <div><div className="eyebrow">Ready when you are</div><h2>Give yourself one small start.</h2></div>
          <button className="primary-button" onClick={() => scrollToId("demo")}>Build my first step <ArrowRight size={17} /></button>
        </section>

      </main>

      <footer className="site-footer page-width">
        <div className="footer-brand"><span className="brand-mark"><Compass size={18} /></span><span>access atlas</span></div>
        <p>One clear start is enough for today.</p>
        <span className="footer-date">Access Atlas</span>
      </footer>
    </div>
  );
}
