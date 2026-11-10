/** Which Launchpad services this deployment is connected to (by their injected env vars). */
export function services() {
  return {
    database: Boolean(process.env.DATABASE_URL),
    email: Boolean(process.env.RESEND_API_KEY),
    botProtection: Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY),
  };
}

/** Verifies a Turnstile token; passes when bot protection isn't configured. */
export async function verifyHuman(token: FormDataEntryValue | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  return Boolean(((await res.json()) as { success?: boolean }).success);
}
