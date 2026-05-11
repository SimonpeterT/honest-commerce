import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Bot, ScanSearch, Eye, MessageSquareWarning,
  Wallet, ArrowRight, Sparkles, Activity, Lock, Network,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OmniCheck AI — Proof of Life for Social Commerce" },
      { name: "description", content: "Autonomous verification engine that bridges the trust gap between Nigerian social commerce vendors and consumers." },
      { property: "og:title", content: "OmniCheck AI — Proof of Life for Social Commerce" },
      { property: "og:description", content: "Agentic AI + Squad API. Money only moves when vendors are proven alive." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      <Stats />
      <Problem />
      <Solution />
      <Pipeline />
      <ScoreBands />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Smart Systems Challenge 01 · Proof of Life
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Eliminating <span className="text-gradient">"What I Ordered vs. What I Got"</span> through Autonomous Verification.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            OmniCheck AI is the trust layer for Nigerian social commerce. Agentic AI investigates every vendor before a single naira moves — and Squad enforces the verdict.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/demo" className="group inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
              Verify a vendor <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/how-it-works" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-semibold hover:bg-card">
              See the engine
            </Link>
          </div>
        </div>

        {/* Hero scanner card */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl glass shadow-elegant">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3 font-mono text-xs text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-danger/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
              <span className="ml-3">omnicheck://verify · ReAct agent · run #00417</span>
            </div>
            <div className="relative grid gap-4 p-6 md:grid-cols-2">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
              <AgentLog />
              <ScoreCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentLog() {
  const lines: { label: string; v: string; tone?: "ok" | "warn" }[] = [
    { label: "TARGET", v: "tiktok.com/@lagosglamstore" },
    { label: "AGENT", v: "ReAct · n8n + Apify actors" },
    { label: "TIKTOK BIO", v: "Consistent · 14mo old", tone: "ok" },
    { label: "GMB ADDRESS", v: "Verified · Lekki Phase 1", tone: "ok" },
    { label: "REVIEW NLP", v: "0 scam keywords · 92% positive", tone: "ok" },
    { label: "CV MATCH", v: "Product images: original (94%)", tone: "ok" },
    { label: "NUBAN RESOLVE", v: "Squad ✓ name match", tone: "ok" },
  ];
  return (
    <div className="space-y-2 font-mono text-xs">
      {lines.map((l) => (
        <div key={l.label} className="flex items-center justify-between gap-4 rounded-md border border-border/50 bg-background/40 px-3 py-2">
          <span className="text-muted-foreground">{l.label}</span>
          <span className={l.tone === "ok" ? "text-accent" : ""}>{l.v}</span>
        </div>
      ))}
    </div>
  );
}

function ScoreCard() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-primary/30 bg-gradient-card p-6 ring-glow">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">Trust Score</div>
      <div className="relative mt-2">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <circle cx="90" cy="90" r="76" stroke="oklch(0.27 0.04 252)" strokeWidth="12" fill="none" />
          <circle
            cx="90" cy="90" r="76"
            stroke="url(#grad)" strokeWidth="12" fill="none"
            strokeDasharray={`${(91/100) * 2 * Math.PI * 76} ${2 * Math.PI * 76}`}
            strokeLinecap="round"
            className="animate-pulse-ring"
          />
          <defs>
            <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.16 195)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 155)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-gradient">91</div>
          <div className="text-xs text-muted-foreground">/ 100</div>
        </div>
      </div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
        <ShieldCheck className="h-3.5 w-3.5" /> VERIFIED · Squad Payment Link issued
      </div>
    </div>
  );
}

function Stats() {
  const items = [
    { k: "₦25B+", v: "lost annually to social commerce fraud (est.)" },
    { k: "7s", v: "average end-to-end verification" },
    { k: "4-layer", v: "agentic scoring pipeline" },
    { k: "100%", v: "Squad-enforced money flow" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.k}>
            <div className="text-3xl font-bold text-gradient">{i.k}</div>
            <div className="mt-1 text-xs text-muted-foreground">{i.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-primary">The Problem</div>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Verification failures cause <span className="text-gradient">measurable financial harm</span> in the intelligent economy.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Nigerian social commerce runs on DMs, screenshots, and blind trust. Vendors disappear after payment. Products differ from listings. There is no neutral system that proves a vendor is alive, legitimate, and accountable before money changes hands.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { i: MessageSquareWarning, t: "Fake storefronts", d: "Stock images stolen from AliExpress, no real inventory." },
            { i: Eye, t: "No proof of life", d: "Bios and addresses go unchecked across platforms." },
            { i: Wallet, t: "Irreversible payments", d: "Direct transfers leave buyers with zero recourse." },
            { i: Activity, t: "Trust by vibes", d: "Comments and 'WhatsApp testimonials' are easily faked." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-border bg-gradient-card p-5 shadow-card">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-semibold">{t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const cards = [
    { i: Bot, t: "Agentic AI Research", d: "A ReAct agent orchestrates n8n workflows and Apify actors to investigate any TikTok or GMB profile autonomously." },
    { i: ScanSearch, t: "Computer Vision", d: "Reverse-image checks compare product photos against AliExpress and the open web to detect stolen inventory." },
    { i: MessageSquareWarning, t: "NLP Sentiment", d: "Comment streams are scanned for 'scam', 'fake', 'not delivered' and weighted by recency and engagement." },
    { i: Lock, t: "Squad Enforcement", d: "Squad NUBAN, Virtual Accounts, and Payment Gateway turn the trust score into a hard financial rule." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">The Solution</div>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">A Smart System, not a chat interface.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          OmniCheck AI goes beyond conversation — it performs autonomous trust-scoring work across vision, language, and finance.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ i: Icon, t, d }) => (
          <div key={t} className="group rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all hover:border-primary/40 hover:shadow-glow">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-gradient-trust group-hover:text-primary-foreground transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-4 font-semibold">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pipeline() {
  const steps = [
    { n: "01", t: "Link Submission", d: "User pastes a TikTok Business or Google My Business link.", i: Network },
    { n: "02", t: "Agentic Research", d: "n8n triggers a ReAct AI agent. Apify actors extract bio consistency, account age, GMB address, reviews, and 'proof of life' photos.", i: Bot },
    { n: "03", t: "Multi-Layer Scoring", d: "Computer Vision detects stolen product imagery. NLP scans review streams for fraud signals. Signals fuse into one interpretable score.", i: ScanSearch },
    { n: "04", t: "Squad Enforcement", d: "Verified → Squad Payment Link. High-risk → Squad Virtual Account escrow. Funds only release when goods are confirmed.", i: Wallet },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">The Workflow</div>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Inside the engine</h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ n, t, d, i: Icon }) => (
          <div key={n} className="relative rounded-2xl border border-border bg-gradient-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">STEP {n}</span>
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-4 text-lg font-semibold">{t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScoreBands() {
  const bands = [
    { range: "85 – 100", label: "VERIFIED", tone: "accent", action: "Squad Payment Link issued — instant, secure checkout.", border: "border-accent/40", bg: "bg-accent/10", text: "text-accent" },
    { range: "60 – 84", label: "HIGH-RISK", tone: "warning", action: "Squad Virtual Account escrow — funds released on receipt confirmation.", border: "border-warning/40", bg: "bg-warning/10", text: "text-warning" },
    { range: "0 – 59", label: "BLOCKED", tone: "danger", action: "Transaction halted. Buyer warned with explainable trust report.", border: "border-danger/40", bg: "bg-danger/10", text: "text-danger" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">Score → Money flow</div>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Interpretable trust, enforced by Squad</h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {bands.map((b) => (
          <div key={b.label} className={`rounded-2xl border ${b.border} ${b.bg} p-6 shadow-card`}>
            <div className="font-mono text-xs text-muted-foreground">{b.range}</div>
            <div className={`mt-2 text-2xl font-bold ${b.text}`}>{b.label}</div>
            <p className="mt-3 text-sm text-foreground/80">{b.action}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-card p-10 text-center shadow-elegant">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative">
          <h2 className="text-3xl font-bold md:text-4xl">Try the Proof of Life engine</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Drop any TikTok or GMB link. Watch the agent investigate, score, and route the payment in real time.
          </p>
          <Link to="/demo" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
            Launch the demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
