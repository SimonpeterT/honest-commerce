import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldCheck, CheckCircle2, AlertTriangle, CreditCard, X } from "lucide-react";
import { verifyNuban, initiatePayment } from "@/lib/squad.functions";

const BANKS = [
  { code: "058", name: "Guaranty Trust Bank" },
  { code: "044", name: "Access Bank" },
  { code: "057", name: "Zenith Bank" },
  { code: "011", name: "First Bank of Nigeria" },
  { code: "033", name: "United Bank for Africa" },
  { code: "232", name: "Sterling Bank" },
  { code: "035", name: "Wema Bank" },
  { code: "070", name: "Fidelity Bank" },
  { code: "50515", name: "Moniepoint MFB" },
  { code: "50211", name: "Kuda Bank" },
  { code: "50746", name: "OPay" },
];

type Verified = { account_name: string; account_number: string; bank_code: string; simulated: boolean };
type Initiated = { reference: string; checkout_url: string; simulated: boolean };

export function SquadPaymentModal({
  open, onClose, vendor, score,
}: { open: boolean; onClose: () => void; vendor: string; score: number }) {
  const verify = useServerFn(verifyNuban);
  const initiate = useServerFn(initiatePayment);

  const [bankCode, setBankCode] = useState("058");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const [step, setStep] = useState<"form" | "verifying" | "verified" | "paying" | "done">("form");
  const [verified, setVerified] = useState<Verified | null>(null);
  const [paid, setPaid] = useState<Initiated | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setStep("form"); setVerified(null); setPaid(null); setError(null);
  };

  const onVerify = async () => {
    setError(null);
    if (!/^\d{10}$/.test(accountNumber)) return setError("NUBAN must be 10 digits");
    if (!amount || Number(amount) <= 0) return setError("Enter a valid amount");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email");
    setStep("verifying");
    try {
      const r = await verify({ data: { bank_code: bankCode, account_number: accountNumber } });
      if ("error" in r && r.error) { setError(r.error); setStep("form"); return; }
      setVerified(r as Verified);
      setStep("verified");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed");
      setStep("form");
    }
  };

  const onPay = async () => {
    if (!verified) return;
    setStep("paying"); setError(null);
    try {
      const r = await initiate({
        data: {
          amount: Math.round(Number(amount) * 100), // NGN -> kobo
          email,
          account_name: verified.account_name,
          account_number: verified.account_number,
        },
      });
      if ("error" in r && r.error) { setError(r.error); setStep("verified"); return; }
      setPaid(r as Initiated);
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment init failed");
      setStep("verified");
    }
  };

  const close = () => { reset(); onClose(); };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-gradient-card p-6 shadow-elegant">
        <button onClick={close} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
          <ShieldCheck className="h-4 w-4" /> Trust score {score} · Auto-checkout unlocked
        </div>
        <h2 className="mt-2 text-2xl font-bold">Pay {vendor} via Squad</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We'll verify the NUBAN against the vendor name, then issue a Squad payment link.
        </p>

        {step === "form" || step === "verifying" ? (
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs text-muted-foreground">
                Bank
                <select value={bankCode} onChange={(e) => setBankCode(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none">
                  {BANKS.map((b) => <option key={b.code} value={b.code}>{b.name}</option>)}
                </select>
              </label>
              <label className="text-xs text-muted-foreground">
                Account number (NUBAN)
                <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="0123456789" inputMode="numeric"
                  className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none" />
              </label>
            </div>
            <label className="block text-xs text-muted-foreground">
              Amount (₦)
              <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="15000" inputMode="decimal"
                className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none" />
            </label>
            <label className="block text-xs text-muted-foreground">
              Buyer email
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm focus:border-primary focus:outline-none" />
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-md border border-danger/40 bg-danger/10 p-2 text-xs text-danger">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5" /> {error}
              </div>
            )}

            <button onClick={onVerify} disabled={step === "verifying"}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60">
              {step === "verifying"
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Resolving NUBAN via Squad…</>
                : <>Cross-check NUBAN</>}
            </button>
          </div>
        ) : null}

        {(step === "verified" || step === "paying") && verified && (
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-accent/40 bg-accent/10 p-4">
              <div className="flex items-center gap-2 text-xs text-accent">
                <CheckCircle2 className="h-4 w-4" /> NUBAN resolved {verified.simulated && "(sandbox sim)"}
              </div>
              <div className="mt-2 text-sm">
                <div className="text-muted-foreground">Account name</div>
                <div className="font-semibold">{verified.account_name}</div>
                <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div><span className="text-muted-foreground">NUBAN: </span>{verified.account_number}</div>
                  <div><span className="text-muted-foreground">Amount: </span>₦{Number(amount).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-md border border-danger/40 bg-danger/10 p-2 text-xs text-danger">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5" /> {error}
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={() => setStep("form")} className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm hover:bg-background/60">
                Edit
              </button>
              <button onClick={onPay} disabled={step === "paying"}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60">
                {step === "paying"
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Initiating Squad gateway…</>
                  : <><CreditCard className="h-4 w-4" /> Pay ₦{Number(amount).toLocaleString()}</>}
              </button>
            </div>
          </div>
        )}

        {step === "done" && paid && (
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-accent/40 bg-accent/10 p-4">
              <div className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 className="h-4 w-4" /> Squad checkout ready {paid.simulated && "(sandbox sim)"}
              </div>
              <div className="mt-2 font-mono text-xs text-muted-foreground">Ref: {paid.reference}</div>
            </div>
            <a href={paid.checkout_url} target="_blank" rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
              <CreditCard className="h-4 w-4" /> Open Squad Checkout
            </a>
            <button onClick={close} className="w-full rounded-lg border border-border px-4 py-2 text-sm hover:bg-background/60">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
