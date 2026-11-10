import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { services } from "@/lib/services";

export const dynamic = "force-dynamic";

/** Used by Launchpad (and you) to confirm the deployment and its services work. */
export async function GET() {
  const connected = services();
  let database: "ok" | "not added" | "error" = connected.database ? "ok" : "not added";
  if (sql) {
    try { await sql`select 1`; } catch { database = "error"; }
  }
  const healthy = database !== "error";
  return NextResponse.json({ ok: healthy, database, botProtection: connected.botProtection, email: connected.email }, { status: healthy ? 200 : 503 });
}
