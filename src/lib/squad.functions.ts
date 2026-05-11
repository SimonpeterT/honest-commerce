import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SANDBOX = "https://sandbox-api-d.squadco.com";

const NubanInput = z.object({
  bank_code: z.string().min(3).max(6),
  account_number: z.string().regex(/^\d{10}$/, "NUBAN must be 10 digits"),
});

export const verifyNuban = createServerFn({ method: "POST" })
  .inputValidator((d) => NubanInput.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.SQUAD_SECRET_KEY;
    if (!key) {
      // Simulated fallback so the demo still works without a real key
      return {
        simulated: true,
        account_name: "DEMO VENDOR LIMITED",
        account_number: data.account_number,
        bank_code: data.bank_code,
      };
    }
    const res = await fetch(`${SANDBOX}/payout/account/lookup`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.data) {
      return { simulated: false, error: json?.message || `NUBAN lookup failed (${res.status})` };
    }
    return {
      simulated: false,
      account_name: json.data.account_name as string,
      account_number: json.data.account_number as string,
      bank_code: json.data.bank_code as string,
    };
  });

const InitInput = z.object({
  amount: z.number().int().min(100).max(10_000_000), // kobo
  email: z.string().email(),
  account_name: z.string().min(2).max(120),
  account_number: z.string().regex(/^\d{10}$/),
});

export const initiatePayment = createServerFn({ method: "POST" })
  .inputValidator((d) => InitInput.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.SQUAD_SECRET_KEY;
    const ref = `OMNI-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    if (!key) {
      return {
        simulated: true,
        reference: ref,
        checkout_url: `https://sandbox-pay.squadco.com/checkout/${ref}`,
      };
    }
    const res = await fetch(`${SANDBOX}/transaction/initiate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: data.amount,
        email: data.email,
        currency: "NGN",
        initiate_type: "inline",
        transaction_ref: ref,
        customer_name: data.account_name,
        metadata: { account_number: data.account_number },
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.data) {
      return { simulated: false, error: json?.message || `Payment init failed (${res.status})` };
    }
    return {
      simulated: false,
      reference: json.data.transaction_ref as string,
      checkout_url: json.data.checkout_url as string,
    };
  });
