"use server";
import { revalidatePath } from "next/cache";
import { ensureSchema, sql } from "@/lib/db";
import { verifyHuman } from "@/lib/services";

export type FormState = { error?: string };

export async function sign(_: FormState, form: FormData): Promise<FormState> {
  if (!sql) return { error: "No database connected yet. Run launchpad up." };
  const message = String(form.get("message") ?? "").trim();
  if (!message || message.length > 280) return { error: "Write between 1 and 280 characters." };
  if (!(await verifyHuman(form.get("cf-turnstile-response")))) return { error: "Bot check failed. Please try again." };
  await ensureSchema();
  await sql`insert into app.guestbook (message) values (${message})`;
  revalidatePath("/");
  return {};
}
