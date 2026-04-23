"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { CATEGORIES, PHASE_NAMES } from "@/lib/mizan/types";
import type {
  MediumPath,
  CategoryId,
  SubType,
  Question,
  VerdictResult,
  Finding,
  VerdictClass,
} from "@/lib/mizan/types";
import { SUBS, QS } from "@/lib/mizan/data";
import { computeVerdict } from "@/lib/mizan/engine";

/* ================================================================
   Mizan - Islamic Finance Diagnostic
   ================================================================ */

type Step = "setup" | "quiz" | "verdict";

export default function MizanPage() {
  const [step, setStep] = useState<Step>("setup");
  const [medium, setMedium] = useState<MediumPath | null>(null);
  const [cat, setCat] = useState<CategoryId | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [cur, setCur] = useState(0);
  const [result, setResult] = useState<VerdictResult | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);

  const scrollTop = useCallback(() => {
    wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ── Path selector ── */
  function pickPath(p: MediumPath) {
    setMedium(p);
  }

  /* ── Category ── */
  function pickCat(c: CategoryId) {
    setCat(c);
    setSub(null);
  }

  /* ── Sub-type ── */
  function pickSub(id: string) {
    setSub(id);
  }

  /* ── Start quiz ── */
  function startQuiz() {
    if (!medium || !sub) return;
    const qs = QS[sub] || [];
    if (!qs.length) return;
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(undefined));
    setCur(0);
    setStep("quiz");
    setTimeout(scrollTop, 50);
  }

  /* ── Answer a question ── */
  function pickAnswer(i: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[cur] = i;
      return next;
    });
  }

  /* ── Navigation ── */
  function goBack() {
    if (cur > 0) setCur(cur - 1);
  }
  function goNext() {
    if (cur < questions.length - 1) {
      setCur(cur + 1);
    } else {
      showVerdict();
    }
  }

  /* ── Verdict ── */
  function showVerdict() {
    if (!medium || !sub) return;
    const effectiveMedium = medium === "fiat-classical" ? "classical" : medium;
    const r = computeVerdict(sub, questions, answers, effectiveMedium, medium);
    setResult(r);
    setStep("verdict");
    setTimeout(scrollTop, 50);
  }

  /* ── Reset ── */
  function resetAll() {
    setStep("setup");
    setMedium(null);
    setCat(null);
    setSub(null);
    setQuestions([]);
    setAnswers([]);
    setCur(0);
    setResult(null);
    setTimeout(scrollTop, 50);
  }

  return (
    <div ref={wrapRef} className="mizan max-w-[880px] mx-auto px-5 md:px-10 py-14 pb-24">
      <MizanHeader />
      {step === "setup" && (
        <SetupView
          medium={medium}
          cat={cat}
          sub={sub}
          onPickPath={pickPath}
          onPickCat={pickCat}
          onPickSub={pickSub}
          onStart={startQuiz}
        />
      )}
      {step === "quiz" && questions.length > 0 && (
        <QuizView
          questions={questions}
          answers={answers}
          cur={cur}
          onPickAnswer={pickAnswer}
          onBack={goBack}
          onNext={goNext}
        />
      )}
      {step === "verdict" && result && (
        <VerdictView result={result} onReset={resetAll} />
      )}
    </div>
  );
}

/* ================================================================
   Header
   ================================================================ */
function MizanHeader() {
  return (
    <header className="mb-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1.5rem",
          marginBottom: 4,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--brand)",
              marginBottom: 6,
            }}
          >
            Islamic Finance Diagnostic
          </p>
          <p
            style={{
              fontSize: 17,
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "var(--fg2)",
              maxWidth: "30ch",
            }}
          >
            Does your financial transaction hold up to Islamic first principles?
          </p>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            fontVariationSettings: "'opsz' 144",
            display: "flex",
            alignItems: "baseline",
            gap: "0.4em",
            flexShrink: 0,
          }}
        >
          Mizan
          <span style={{ color: "var(--fg4)", fontWeight: 300 }}>|</span>
          <span style={{ fontFamily: "var(--font-arabic-family)" }}>&#1605;&#1610;&#1586;&#1575;&#1606;</span>
        </h1>
      </div>
      <p
        style={{
          fontSize: 13,
          color: "var(--fg4)",
          marginTop: 12,
        }}
      >
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/azim-gx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          M Azim Abdul Majeed
        </a>
      </p>
    </header>
  );
}

/* ================================================================
   Setup View (Path + Category + Sub-type)
   ================================================================ */
function SetupView({
  medium,
  cat,
  sub,
  onPickPath,
  onPickCat,
  onPickSub,
  onStart,
}: {
  medium: MediumPath | null;
  cat: CategoryId | null;
  sub: string | null;
  onPickPath: (p: MediumPath) => void;
  onPickCat: (c: CategoryId) => void;
  onPickSub: (id: string) => void;
  onStart: () => void;
}) {
  const subs: SubType[] = cat ? SUBS[cat] || [] : [];
  const canStart = !!medium && !!sub;

  return (
    <>
      {/* Path selector */}
      <div className="mb-6">
        <div className="mz-slabel mt-2">
          Step 0 | Which monetary medium is involved?
        </div>
        <div className="mz-path-intro">
          Choose your analytical track. This is the most important choice in the
          diagnostic - it determines which framework is applied to every finding.
          There are two analytical tracks and three entry points.
        </div>
        <div className="mz-path-grid">
          <PathCard
            id="classical"
            icon="&#x2696;&#xFE0F;"
            tag="Full Ribawi rules"
            name="Classical monetary medium"
            desc="Gold, silver, wheat, barley, dates, salt or any item that genuinely meets the seven Ribawi characteristics"
            examples="Gold Dinar, silver Dirham, physical commodity, gold-backed instruments"
            variant="classical"
            selected={medium === "classical"}
            onClick={() => onPickPath("classical")}
          />
          <PathCard
            id="fiat-classical"
            icon="&#x1F3DB;&#xFE0F;"
            tag="Classical rules on fiat"
            name="Fiat - treated as classical money"
            desc="Mainstream scholarly position: fiat currency carries Thamaniyyah (monetary nature) and is subject to the same rules as gold and silver"
            examples="Dollar, Pound, Euro - applying full Ribawi conditions as the traditional majority position"
            variant="fiat-classical"
            redirect="Routes to classical rules track"
            selected={medium === "fiat-classical"}
            onClick={() => onPickPath("fiat-classical")}
          />
          <PathCard
            id="fiat"
            icon="&#x1F52C;"
            tag="Open question"
            name="Fiat - research framework"
            desc="Research position: fiat fails all seven Ribawi characteristics and may require a different analytical framework from classical monetary media"
            examples="Fiat-denominated finance where the status of interest on fiat is examined as an open scholarly question"
            variant="fiat"
            selected={medium === "fiat"}
            onClick={() => onPickPath("fiat")}
          />
        </div>

        {/* Path notice */}
        {medium === "fiat-classical" && (
          <div className="mz-notice mz-notice-amber">
            <strong>
              Transparent note - Classical rules applied to fiat currency:
            </strong>{" "}
            You have chosen to treat fiat currency as equivalent to gold and
            silver for the purposes of this diagnostic. This is the mainstream
            scholarly position. Under this view, interest on fiat currency is
            Riba in the classical sense. This tool will apply the full classical
            Ribawi rules. The verdict will include a note confirming this
            assumption.{" "}
            <em>
              This is a transparent re-routing, not a different analysis.
            </em>
          </div>
        )}
        {medium === "fiat" && (
          <div className="mz-notice mz-notice-purple">
            <strong>
              Research framework - Fiat fails the Ribawi characteristics:
            </strong>{" "}
            This track applies the research position that fiat currency fails
            all seven characteristics of the six Ribawi items. Under this
            framework, what is commonly called &quot;interest&quot; on{" "}
            <strong>institutional</strong> fiat transactions is analysed
            separately from Riba.
            <br />
            <br />
            <strong>
              Important sub-distinction - personal loans between individuals:
            </strong>{" "}
            Even on this track, personal loans (Qard) between individuals are
            held to the full classical Qard Hasan standard.
            <br />
            <br />
            <em>This is a scholarly research position, not a Fatwa.</em>
          </div>
        )}
      </div>

      {/* Category selector */}
      <div className="mz-slabel mt-2">
        Step 1 | What best describes your situation?
      </div>
      <div className="mz-cat-grid">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`mz-cat${cat === c.id ? " on" : ""}`}
            onClick={() => onPickCat(c.id)}
          >
            <div className="mz-cat-icon">{c.icon}</div>
            <div className="mz-cat-name">{c.name}</div>
            <div className="mz-cat-hint">{c.hint}</div>
          </button>
        ))}
      </div>

      {/* Sub-type selector */}
      {cat && subs.length > 0 && (
        <>
          <div className="mz-slabel">Step 2 | Be more specific</div>
          <div className="mz-sub-grid">
            {subs.map((s) => (
              <button
                key={s.id}
                className={`mz-sub${sub === s.id ? " on" : ""}`}
                onClick={() => onPickSub(s.id)}
              >
                <div className="mz-sub-name">{s.name}</div>
                <div className="mz-sub-desc">{s.desc}</div>
              </button>
            ))}
          </div>
        </>
      )}

      <button
        className="mz-btn mz-btn-start"
        disabled={!canStart}
        onClick={onStart}
      >
        Begin diagnostic &rarr;
      </button>
    </>
  );
}

/* ── Path Card ── */
function PathCard({
  icon,
  tag,
  name,
  desc,
  examples,
  variant,
  redirect,
  selected,
  onClick,
}: {
  id: string;
  icon: string;
  tag: string;
  name: string;
  desc: string;
  examples: string;
  variant: "classical" | "fiat-classical" | "fiat";
  redirect?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`mz-path-card mz-path-${variant}${selected ? " on" : ""}`}
      onClick={onClick}
    >
      <div className={`mz-path-tag mz-path-tag-${variant}`}>{tag}</div>
      <div className="mz-path-icon">{icon}</div>
      <div className="mz-path-name">{name}</div>
      <div className="mz-path-desc">{desc}</div>
      <div className={`mz-path-examples mz-path-examples-${variant}`}>
        {examples}
      </div>
      {redirect && <div className="mz-path-redirect">&rarr; {redirect}</div>}
    </button>
  );
}

/* ================================================================
   Quiz View
   ================================================================ */
function QuizView({
  questions,
  answers,
  cur,
  onPickAnswer,
  onBack,
  onNext,
}: {
  questions: Question[];
  answers: (number | undefined)[];
  cur: number;
  onPickAnswer: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const q = questions[cur];
  const total = questions.length;
  const progress = ((cur / total) * 100).toFixed(1);
  const isLast = cur === total - 1;

  return (
    <>
      {/* Progress */}
      <div className="mb-6">
        <div className="mz-prog-meta">
          <span>Phase {q.phase + 1}</span>
          <span>
            {cur + 1} of {total}
          </span>
        </div>
        <div className="mz-prog-track">
          <div className="mz-prog-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Phase badge */}
      <div className="mz-pbadge">
        <div className="mz-pdot" />
        <span>{PHASE_NAMES[q.phase] || ""}</span>
      </div>

      {/* Question card */}
      <div className="mz-qcard">
        <div className="mz-qnum">
          Question {cur + 1} of {total}
        </div>
        <div className="mz-qtext">{q.text}</div>
        {q.plain && <div className="mz-qplain">{q.plain}</div>}
        {q.principle && <div className="mz-qprinc">{q.principle}</div>}
        <div className="mz-opts">
          {q.opts.map((o, i) => (
            <button
              key={i}
              className={`mz-opt${answers[cur] === i ? " on" : ""}`}
              onClick={() => onPickAnswer(i)}
            >
              <div
                className={`mz-oradio${answers[cur] === i ? " selected" : ""}`}
              />
              <div>
                <div className="mz-olabel">{o.label}</div>
                {o.sub && <div className="mz-osub">{o.sub}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div className="mz-nav">
        <button
          className="mz-btn mz-btn-back"
          disabled={cur === 0}
          onClick={onBack}
        >
          &larr; Back
        </button>
        <button
          className="mz-btn mz-btn-next"
          disabled={answers[cur] === undefined}
          onClick={onNext}
        >
          {isLast ? "Get verdict \u2192" : "Next \u2192"}
        </button>
      </div>
    </>
  );
}

/* ================================================================
   Verdict View
   ================================================================ */
function VerdictView({
  result,
  onReset,
}: {
  result: VerdictResult;
  onReset: () => void;
}) {
  const { verdict, findings, summary, ribawiGrid, medium, entryPath, isPersonalFiat } =
    result;

  const fails = findings.filter((f) => f.t === "f");
  const warns = findings.filter((f) => f.t === "w");
  const passes = findings.filter((f) => f.t === "p");
  const infos = findings.filter((f) => f.t === "i");

  return (
    <>
      {/* Report header */}
      <div style={{ marginBottom: "1.25rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)" }}>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--brand)",
          margin: 0,
        }}>
          Diagnostic Report
        </p>
      </div>

      {/* Verdict header */}
      <div className={`mz-vhdr mz-vhdr-${verdict.cls}`}>
        <div className={`mz-vstamp mz-vstamp-${verdict.cls}`}>
          {verdict.stamp}
        </div>
        <div className="mz-vtitle">{verdict.title}</div>
        <div className="mz-vbody">{verdict.body}</div>
      </div>

      {/* Framework panels */}
      {medium === "classical" && entryPath !== "fiat-classical" && (
        <ClassicalPanel />
      )}
      {entryPath === "fiat-classical" && <FiatClassicalPanel />}
      {medium === "fiat" && isPersonalFiat && <FiatPersonalPanel />}
      {medium === "fiat" && !isPersonalFiat && <FiatPanel />}

      {/* Ribawi grid */}
      {ribawiGrid && <RibawiGridView grid={ribawiGrid} />}

      {/* Findings */}
      {fails.length > 0 && (
        <FindingSection
          title="Critical failures - primary source violations"
          findings={fails}
        />
      )}
      {warns.length > 0 && (
        <FindingSection title="Concerns and cautions" findings={warns} />
      )}
      {infos.length > 0 && (
        <FindingSection
          title="Scholarly context and open questions"
          findings={infos}
        />
      )}
      {passes.length > 0 && (
        <FindingSection
          title="What this arrangement gets right"
          findings={passes}
        />
      )}

      {/* Summary table */}
      <div className="mz-sum-card">
        <div className="mz-sum-hdr">
          <span>Your answers - complete summary</span>
        </div>
        {summary.map((s, i) => (
          <div key={i} className="mz-sum-row">
            <div className="mz-sum-q">{s.q}</div>
            <div className={`mz-sum-a ${answerClass(s.val)}`}>{s.a}</div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mz-disc">
        <strong>Important:</strong> Mizan is a diagnostic tool built on primary
        source definitions - Riba, Qard, Dayn, Bay&apos;, and the Ribawi
        characteristics as established by the Quran, the Sunnah, and the
        classical scholarly tradition. It is not a Fatwa. It does not replace
        qualified scholarship. It is designed to help you ask the right questions
        from first principles. Any errors of interpretation are those of the
        research owner. Any clarity is guidance from Allah alone.
      </div>

      <button className="mz-btn mz-btn-reset" onClick={onReset}>
        &#8634; Start a new assessment
      </button>
    </>
  );
}

/* ── Finding section ── */
function FindingSection({
  title,
  findings,
}: {
  title: string;
  findings: Finding[];
}) {
  const iconMap: Record<string, string> = {
    f: "\u2717",
    w: "\u26A0",
    p: "\u2713",
    i: "\u2139",
  };
  const clsMap: Record<string, string> = {
    f: "mz-fnd-fail",
    w: "mz-fnd-warn",
    p: "mz-fnd-pass",
    i: "mz-fnd-info",
  };

  return (
    <div className="mz-asec">
      <div className="mz-ahead">{title}</div>
      {findings.map((f, i) => (
        <div key={i} className={`mz-fnd ${clsMap[f.t] || "mz-fnd-info"}`}>
          <div className="mz-ficon">{iconMap[f.t] || "\u2022"}</div>
          <div>
            <div className="mz-flabel">{f.label}</div>
            <div className="mz-ftext">{f.text}</div>
            {f.src && (
              <div className="mz-fsrc">Primary sources: {f.src}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Ribawi Grid ── */
function RibawiGridView({ grid }: { grid: NonNullable<VerdictResult["ribawiGrid"]> }) {
  const colLabel: Record<string, string> = {
    fiat: "Fiat currency",
    crypto_b: "Bitcoin",
    crypto_a: "Altcoins / stablecoins",
    commodity: "Physical commodity",
  };

  function badgeClass(val: string) {
    if (val.startsWith("Passes")) return "mz-rb-pass";
    if (val.startsWith("Fails")) return "mz-rb-fail";
    if (
      val.startsWith("Partial") ||
      val.startsWith("Uncertain") ||
      val.startsWith("Varies")
    )
      return "mz-rb-warn";
    return "mz-rb-na";
  }

  return (
    <div className="mz-rchar-card">
      <div className="mz-rchar-hdr">
        <span>
          Ribawi characteristics test - {colLabel[grid.activeCol] || grid.activeCol}
        </span>
      </div>
      {grid.items.map((it, i) => {
        const val = it[grid.activeCol] || "N/A";
        return (
          <div key={i} className="mz-rchar-row">
            <div>
              <div className="mz-rchar-name">{it.name}</div>
              <div className="mz-rchar-ar">{it.ar}</div>
            </div>
            <div className={`mz-rchar-badge ${badgeClass(val)}`}>{val}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Framework Panels ── */
function ClassicalPanel() {
  return (
    <div className="mz-classical-confirm">
      <div className="mz-classical-title">
        &#x2696;&#xFE0F; Classical monetary medium - full Ribawi rules applied
      </div>
      <div className="mz-classical-body">
        You selected a <strong>classical monetary medium</strong>: gold, silver,
        or a genuine Ribawi commodity. On this path, the seven Ribawi
        characteristics are fully met, and the Ribawi conditions apply without
        qualification. Every finding in this assessment is evaluated under the
        complete Quranic and Prophetic framework for monetary exchange.
      </div>
    </div>
  );
}

function FiatClassicalPanel() {
  return (
    <div className="mz-fcn">
      <div className="mz-fcn-title">
        &#x1F3DB;&#xFE0F; Fiat currency - classical rules applied by your
        choice
      </div>
      <div className="mz-fcn-body">
        You chose to apply the classical Ribawi rules to fiat currency. This is
        a transparent re-routing: the diagnostic has run on the classical
        analytical track, and all findings are evaluated under the full Ribawi
        conditions.
        <br />
        <br />
        <strong>The scholarly basis for this choice:</strong> The mainstream
        contemporary position holds that fiat currency carries Thamaniyyah
        (monetary nature), and therefore the full Ribawi conditions apply to it.
        Under this view, interest on fiat-denominated loans is Riba.
      </div>
    </div>
  );
}

function FiatPersonalPanel() {
  return (
    <div className="mz-fcn">
      <div className="mz-fcn-title">
        &#x1F91D; Personal transaction on the fiat track - classical Qard rules
        applied
      </div>
      <div className="mz-fcn-body">
        You selected the fiat research framework - but the transaction you are
        assessing is a <strong>personal arrangement between individuals</strong>
        . For this type of arrangement, this tool applies the classical Qard
        Hasan rules in full, regardless of the monetary medium.
        <br />
        <br />
        <strong>Why:</strong> The inflation/Hifz al-Mal argument for
        interest-on-fiat applies to institutional capital deployment, not to one
        person lending to another in need. In a personal loan on fiat currency,
        only the Mithl (exact equivalent) returns.
      </div>
    </div>
  );
}

function FiatPanel() {
  return (
    <div className="mz-fiat-framework">
      <div className="mz-fiat-title">
        &#x1F4B5; Fiat currency - the two-path analytical framework
      </div>
      <div className="mz-fiat-body">
        You selected <strong>fiat currency</strong> as the monetary medium. This
        diagnostic applies the research framework that distinguishes Riba from
        interest-on-fiat. Fiat currency fails all seven characteristics of the
        six Ribawi items.
      </div>
      <div className="mz-fiat-distinction">
        <div className="mz-fd-box mz-fd-riba">
          <div className="mz-fd-label">
            Riba - &#x627;&#x644;&#x631;&#x650;&#x628;&#x627; (Quranic
            prohibition)
          </div>
          <div className="mz-fd-text">
            Riba is the Quranic absolute prohibition. It applies with full force
            to genuine Ribawi media. Whether Riba applies to fiat is the open
            question. This prohibition is not questioned here, in any context, in
            any way.
          </div>
        </div>
        <div className="mz-fd-box mz-fd-interest">
          <div className="mz-fd-label">
            Interest on fiat - a different analysis
          </div>
          <div className="mz-fd-text">
            If fiat currency is not a genuine Ribawi medium, then what is called
            &quot;interest&quot; on fiat transactions requires a different
            framework. This does not make exploitative interest permissible.
          </div>
        </div>
      </div>
      <div className="mz-fiat-openq">
        <strong>Open scholarly question:</strong> &quot;Is fiat currency even the
        same Jins as gold? And if not, what are the implications?&quot; - This
        question is left open for qualified scholars. This framework is the
        position of the research paper. It is not a Fatwa.
      </div>
    </div>
  );
}

/* ── Helper ── */
function answerClass(val: string): string {
  const good = [
    "same", "no", "spot", "free", "atomic", "fixed", "yes", "own",
    "both_risk", "principled", "genuine", "separate", "bank", "mudarabah",
    "backed", "art", "utility", "clean", "productive", "manageable", "ok",
    "percentage",
  ];
  const bad = [
    "more", "grows", "no_own", "no_risk", "hila", "guaranteed", "cash",
    "cash_gen", "cash_commodity", "financial_return", "tawarruq", "conv_mort",
    "heavy", "forward", "cfd", "deferred", "meme", "lending", "farming",
    "riba_core", "haram",
  ];
  if (good.some((g) => val?.includes(g))) return "mz-sa-pass";
  if (bad.some((b) => val?.includes(b))) return "mz-sa-fail";
  return "mz-sa-warn";
}
