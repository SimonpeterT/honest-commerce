import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bot, CheckCircle2, ShieldCheck, Loader2, Vault, CreditCard } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — OmniCheck AI Verification" },
      { name: "description", content: "Paste a TikTok or GMB link and watch the agentic AI verification engine run end-to-end." },
      { property: "og:title", content: "OmniCheck AI Live Demo" },
      { property: "og:description", content: "Watch the Proof of Life engine score a vendor in real time." },
    ],
  }),
  component: Demo,
});

type Step = { id: string; label: string; detail: string };
const STEPS: Step[] = [
  { id: "ingest", label: "Validating link", detail: "Normalizing URL · creating run ID" },
  { id: "agent", label: "ReAct agent dispatched via n8n", detail: "Selecting Apify actors" },
  { id: "tiktok", label: "Scraping TikTok signals", detail: "Bio · age · engagement · cadence" },
  { id: "gmb", label: "Cross-checking Google My Business", detail: "Address · reviews · photos" },
  { id: "cv", label: "Computer Vision sweep", detail: "Reverse-image vs AliExpress / Shein" },
  { id: "nlp", label: "NLP sentiment on review stream", detail: "Scanning for scam / fake / not delivered" },
  { id: "nuban", label: "Squad Resolve NUBAN", detail: "Matching bank account name to business" },
  { id: "score", label: "Composing trust score", detail: "Fusing weighted sub-scores" },
];

type Result = { score: number; tier: "verified" | "risk" | "blocked"; vendor: string };

export default function Demo() {
  const [url, setUrl] = useState("");
  const [running, setRunning] = useState(false);
  const [active, setActive] = useState(-1);
  const [result, setResult] = useState<Result | null>(null);

  const run = async () => {
    if (!url.trim() || running) return;
    setResult(null);
    setRunning(true);
    setActive(-1);
    for (let i = 0; i < STEPS.length; i++) {
      setActive(i);
      await sleep(550 + Math.random() * 450);
    }
    // deterministic-ish score from URL
    const score = scoreFromUrl(url);
    const tier: Result["tier"] = score >= 85 ? "verified" : score >= 60 ? "risk" : "blocked";
    setResult({ score, tier, vendor: vendorFromUrl(url) });
    setRunning(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">Live Demo</div>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Run a Proof of Life check</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Paste any TikTok Business or Google My Business link. The agent will investigate and route the payment via Squad.
        </p>
      </div>

      {/* Input */}
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-gradient-card p-3 shadow-elegant md:flex-row md:items-center">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="https://www.tiktok.com/@vendorhandle  or  https://maps.google.com/..."
            className="flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <button
            onClick={run}
            disabled={running || !url.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
          >
            {running ? <><Loader2 className="h-4 w-4 animate-spin" /> Running</> : <>Verify <ArrowRight className="h-4 w-4" /></>}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>Try:</span>
          {[
            "https://tiktok.com/@lagosglamstore",
            "https://tiktok.com/@quickdealsng",
            "https://maps.google.com/?cid=imposter9",
          ].map((s) => (
            <button key={s} onClick={() => setUrl(s)} className="rounded-md border border-border bg-background/40 px-2 py-1 font-mono hover:border-primary/40">
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bot className="h-4 w-4 text-primary" />
            Agent log
          </div>
          <ol className="mt-4 space-y-2 font-mono text-xs">
            {STEPS.map((s, i) => {
              const state = i < active || (i === active && !running) ? "done"
                : i === active ? "active" : "pending";
              return (
                <li
                  key={s.id}
                  className={`flex items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                    state === "done" ? "border-accent/30 bg-accent/5"
                    : state === "active" ? "border-primary/40 bg-primary/5 ring-glow"
                    : "border-border/60 bg-background/30"
                  }`}
                >
                  <span className="mt-0.5">
                    {state === "done" ? <CheckCircle2 className="h-4 w-4 text-accent" />
                      : state === "active" ? <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      : <span className="block h-4 w-4 rounded-full border border-border" />}
                  </span>
                  <div className="flex-1">
                    <div className={state === "pending" ? "text-muted-foreground" : ""}>{s.label}</div>
                    <div className="text-muted-foreground/70">{s.detail}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Result */}
        <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card">
          <div className="text-sm text-muted-foreground">Verdict</div>
          {!result ? (
            <div className="mt-8 grid place-items-center text-center text-sm text-muted-foreground/80">
              <ShieldCheck className="h-10 w-10 text-primary/40" />
              <div className="mt-3">Awaiting verification…</div>
            </div>
          ) : (
            <ResultPanel result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: Result }) {
  const cfg = result.tier === "verified"
    ? { color: "text-accent", border: "border-accent/40", bg: "bg-accent/10", label: "VERIFIED", action: "Squad Payment Link issued", Icon: CreditCard }
    : result.tier === "risk"
    ? { color: "text-warning", border: "border-warning/40", bg: "bg-warning/10", label: "HIGH-RISK", action: "Routed to Squad Virtual Account (escrow)", Icon: Vault }
    : { color: "text-danger", border: "border-danger/40", bg: "bg-danger/10", label: "BLOCKED", action: "Transaction halted · buyer protected", Icon: ShieldCheck };
  const C = cfg.Icon;
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Vendor</div>
          <div className="font-mono text-sm">{result.vendor}</div>
        </div>
        <div className={`rounded-full border ${cfg.border} ${cfg.bg} px-3 py-1 text-xs font-semibold ${cfg.color}`}>{cfg.label}</div>
      </div>

      <div className="mt-6 grid place-items-center">
        <div className="relative">
          <svg width="160" height="160" viewBox="0 0 180 180" className="-rotate-90">
            <circle cx="90" cy="90" r="76" stroke="oklch(0.27 0.04 252)" strokeWidth="12" fill="none" />
            <circle cx="90" cy="90" r="76" stroke="url(#gd2)" strokeWidth="12" fill="none"
              strokeDasharray={`${(result.score/100) * 2 * Math.PI * 76} ${2 * Math.PI * 76}`} strokeLinecap="round" />
            <defs>
              <linearGradient id="gd2" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.16 195)" />
                <stop offset="100%" stopColor="oklch(0.72 0.18 155)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gradient">{result.score}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Trust score</div>
          </div>
        </div>
      </div>

      <div className={`mt-6 flex items-center gap-3 rounded-lg border ${cfg.border} ${cfg.bg} p-4`}>
        <C className={`h-5 w-5 ${cfg.color}`} />
        <div className="text-sm">{cfg.action}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <Sub label="Bio consistency" value={pct(result.score, 6)} />
        <Sub label="Account age" value={pct(result.score, -3)} />
        <Sub label="Review NLP" value={pct(result.score, 2)} />
        <Sub label="CV originality" value={pct(result.score, -7)} />
      </div>
    </div>
  );
}

function Sub({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-3">
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono">{value}/100</div>
    </div>
  );
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
function scoreFromUrl(u: string) {
  const lower = u.toLowerCase();
  if (/imposter|scam|fake|quickdeals/.test(lower)) return 30 + (hash(u) % 25);
  if (/glam|store|official|verified/.test(lower)) return 86 + (hash(u) % 10);
  return 60 + (hash(u) % 25);
}
function vendorFromUrl(u: string) {
  const m = u.match(/@([\w.\-]+)/);
  if (m) return "@" + m[1];
  try { return new URL(u).hostname; } catch { return u.slice(0, 40); }
}
function pct(score: number, delta: number) {
  return Math.max(10, Math.min(99, score + delta + ((hash(String(delta)) % 6) - 3)));
}
