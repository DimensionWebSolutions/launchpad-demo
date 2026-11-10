"use client";
import Script from "next/script";
import { useActionState } from "react";
import { sign, type FormState } from "./actions";

export default function SignForm({ siteKey }: { siteKey?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sign, {});
  return (
    <form action={action} className="form">
      <input name="message" maxLength={280} required placeholder="Say hello" aria-label="Message" />
      {siteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={siteKey} />
        </>
      )}
      <button disabled={pending}>{pending ? "Signing…" : "Sign the guestbook"}</button>
      {state.error && <p role="alert" className="error">{state.error}</p>}
    </form>
  );
}
