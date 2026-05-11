import { createFileRoute } from "@tanstack/react-router";
import { Bot, ScanSearch, Network, Wallet, Cpu, Workflow } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How OmniCheck AI Works — Agentic Verification Pipeline" },
      { name: "description", content: "Inside the n8n + Apify ReAct agent that powers OmniCheck AI's autonomous trust scoring." },
      { property: "og:title", content: "Inside OmniCheck AI's Verification Engine" },
      { property: "og:description", content: "n8n, Apify actors, computer vision, NLP, and Squad — composed into a single trust pipeline." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">Technical Workflow</div>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">The Smart System under the hood</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          A composable pipeline of agentic AI, scrapers, and enforcement APIs — orchestrated by n8n.
        </p>
      </div>

      {/* Pipeline diagram */}
      <div className="mt-14 rounded-2xl border border-border bg-gradient-card p-6 shadow-elegant md:p-10">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { i: Network, t: "Link in", d: "TikTok / GMB URL" },
            { i: Bot, t: "ReAct Agent", d: "n8n + LLM reasoning" },
            { i: ScanSearch, t: "Multi-Layer Scoring", d: "CV + NLP + heuristics" },
            { i: Wallet, t: "Squad Enforcement", d: "Pay link · Escrow · NUBAN" },
          ].map(({ i: Icon, t, d }, idx) => (
            <div key={t} className="relative rounded-xl border border-border/70 bg-background/40 p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-trust text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{d}</div>
                </div>
              </div>
              {idx < 3 && (
                <div className="hidden md:block absolute right-[-22px] top-1/2 -translate-y-1/2 text-primary">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail sections */}
      <div className="mt-16 space-y-12">
        <Detail
          n="01"
          icon={Network}
          title="Link Submission"
          body="A user pastes a TikTok Business Profile URL or a Google My Business listing into the React frontend. The submission is validated, normalized, and dispatched to n8n via a secure webhook."
          bullets={[
            "Supports tiktok.com, vm.tiktok.com, and Google Maps share links",
            "URL fingerprinting prevents replay and abuse",
            "Idempotent run IDs let users resume incomplete checks",
          ]}
        />
        <Detail
          n="02"
          icon={Bot}
          title="Agentic Research with ReAct"
          body="n8n triggers an AI agent built on the ReAct framework. The agent reasons about which Apify actors to invoke, then synthesizes the evidence into structured features."
          bullets={[
            "TikTok actor: bio consistency, account age, post cadence, engagement quality",
            "GMB actor: physical address verification, hours, owner-uploaded 'proof of life' photos",
            "Cross-platform identity matching (handles, phone numbers, business names)",
          ]}
        />
        <Detail
          n="03"
          icon={Cpu}
          title="Multi-Layer Scoring"
          body="Signals from the agent feed two specialised models that produce explainable sub-scores. The final OmniCheck Score is a weighted, interpretable composite — not a black box."
          bullets={[
            "Computer Vision: reverse-image search detects product photos lifted from AliExpress, Shein, or Temu",
            "NLP Sentiment: classifies comment streams for keywords like 'scam', 'fake', 'not delivered'",
            "Heuristics: account age, review velocity anomalies, follower-to-engagement ratio",
          ]}
        />
        <Detail
          n="04"
          icon={Workflow}
          title="Squad API Enforcement"
          body="The score directly controls how money moves. Verified vendors get instant checkout; risky ones are forced through escrow; impostors are blocked entirely."
          bullets={[
            "Score > 85 → Squad Payment Gateway link generated",
            "Score 60–84 → Squad Virtual Account opened for escrow-style hold",
            "Squad Resolve NUBAN confirms vendor bank name matches researched business name",
          ]}
        />
      </div>
    </div>
  );
}

function Detail({
  n, icon: Icon, title, body, bullets,
}: { n: string; icon: React.ComponentType<{ className?: string }>; title: string; body: string; bullets: string[] }) {
  return (
    <div className="grid gap-6 rounded-2xl border border-border bg-gradient-card p-6 shadow-card md:grid-cols-[auto_1fr] md:p-8">
      <div className="flex items-start gap-4">
        <div className="font-mono text-sm text-primary">{n}</div>
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{body}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
