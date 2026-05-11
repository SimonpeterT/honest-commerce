import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Landmark, Vault, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/squad")({
  head: () => ({
    meta: [
      { title: "Squad API Integration — OmniCheck AI" },
      { name: "description", content: "How OmniCheck AI uses Squad Resolve NUBAN, Virtual Accounts, and Payment Gateway to enforce trust scores." },
      { property: "og:title", content: "Squad-Powered Financial Innovation" },
      { property: "og:description", content: "Three Squad APIs turn an AI trust score into a hard financial rule." },
    ],
  }),
  component: SquadPage,
});

function SquadPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <div className="text-xs font-mono uppercase tracking-widest text-primary">Squad API Integration</div>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Trust score → <span className="text-gradient">money rule</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          OmniCheck AI relies on three Squad APIs to convert agentic verification into a financial guarantee — the heart of our Financial Innovation.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <SquadCard
          icon={Landmark}
          title="Squad Resolve NUBAN"
          tag="Identity proof"
          body="Confirms the vendor's bank account name matches the business name discovered during AI research. Stops impostors using mismatched accounts to siphon payments."
          when="Run on every vendor before any payment instrument is issued."
        />
        <SquadCard
          icon={Vault}
          title="Squad Virtual Accounts"
          tag="Escrow innovation"
          body="For high-risk vendors (score 60–84), funds land in a unique virtual account and are only released to the vendor once the buyer confirms receipt of goods."
          when="Triggered automatically when the OmniCheck Score falls into the high-risk band."
        />
        <SquadCard
          icon={CreditCard}
          title="Squad Payment Gateway"
          tag="Verified checkout"
          body="For trusted vendors (score > 85), OmniCheck generates a direct Squad payment link for an instant, frictionless checkout — backed by full proof of life."
          when="Issued the moment the agent clears the verified threshold."
        />
      </div>

      {/* Flow */}
      <div className="mt-16 rounded-2xl border border-border bg-gradient-card p-8 shadow-elegant">
        <h2 className="text-2xl font-bold">End-to-end financial flow</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <FlowRow
            band="VERIFIED · 85+"
            color="text-accent"
            steps={["Squad Resolve NUBAN ✓", "Squad Payment Gateway link", "Instant settlement to vendor"]}
          />
          <FlowRow
            band="HIGH-RISK · 60–84"
            color="text-warning"
            steps={["Squad Resolve NUBAN ✓", "Squad Virtual Account opened", "Funds released on buyer confirmation"]}
          />
          <FlowRow
            band="BLOCKED · <60"
            color="text-danger"
            steps={["Squad APIs not invoked", "Buyer shown trust report", "Money never leaves the buyer"]}
          />
        </div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-3 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" />
        Squad acts as the enforcement layer — OmniCheck never touches funds directly.
      </div>
    </div>
  );
}

function SquadCard({
  icon: Icon, title, tag, body, when,
}: { icon: React.ComponentType<{ className?: string }>; title: string; tag: string; body: string; when: string }) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all hover:border-primary/40 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-trust text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary">{tag}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-4 rounded-md border border-border/60 bg-background/40 p-3 text-xs text-foreground/80">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">When</span>
        <div className="mt-1">{when}</div>
      </div>
    </div>
  );
}

function FlowRow({ band, color, steps }: { band: string; color: string; steps: string[] }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/40 p-5">
      <div className={`font-mono text-xs ${color}`}>{band}</div>
      <ol className="mt-3 space-y-2 text-sm">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-2">
            <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-[10px] text-primary">{i + 1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
