import postgres from "postgres";

// DATABASE_URL is injected by `launchpad up` (Supabase's transaction pooler, which needs prepare: false).
const url = process.env.DATABASE_URL;
export const sql = url ? postgres(url, { prepare: false, max: 5 }) : null;

let ready: Promise<unknown> | null = null;
/**
 * Creates the guestbook table the first time it's needed. It sits in its own schema with row-level
 * security on, so Supabase's REST API can't reach it, even with the project's public anon key: only
 * this server, connecting with DATABASE_URL, reads and writes it.
 */
export function ensureSchema() {
  if (!sql) return Promise.resolve();
  ready ??= sql.unsafe(`
    create schema if not exists app;
    create table if not exists app.guestbook (
      id bigint generated always as identity primary key,
      message text not null check (length(message) between 1 and 280),
      created_at timestamptz not null default now()
    );
    alter table app.guestbook enable row level security;
  `);
  return ready;
}

export type Entry = { id: number; message: string; created_at: Date };
