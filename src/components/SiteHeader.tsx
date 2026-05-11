import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-trust shadow-glow">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            OmniCheck<span className="text-primary"> AI</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link to="/how-it-works" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">How it works</Link>
          <Link to="/squad" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">Squad Integration</Link>
          <Link to="/demo" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">Live Demo</Link>
        </nav>
        <Link
          to="/demo"
          className="inline-flex items-center justify-center rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
        >
          Run a check
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>OmniCheck AI · Proof of Life for the Intelligent Economy</span>
        </div>
        <div className="font-mono text-xs">Smart Systems Challenge 01 · Powered by Squad API</div>
      </div>
    </footer>
  );
}
