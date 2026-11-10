import { ensureSchema, sql, type Entry } from "@/lib/db";
import { services } from "@/lib/services";
import SignForm from "./sign-form";

export const dynamic = "force-dynamic";

export default async function Home() {
  const connected = services();
  let entries: Entry[] = [];
  let dbError: string | null = null;
  if (sql) {
    try {
      await ensureSchema();
      entries = await sql<Entry[]>`select id, message, created_at from app.guestbook order by id desc limit 20`;
    } catch (err) {
      dbError = err instanceof Error ? err.message : "Database error";
    }
  }

  return (
    <main>
      <h1>Your app is live.</h1>
      <p className="muted">Deployed with Launchpad. Every service below was created and connected for you.</p>
      <ul className="services">
        <li data-on={connected.database}>Postgres {connected.database ? "connected" : "not added"}</li>
        <li data-on={connected.botProtection}>Bot protection {connected.botProtection ? "on" : "not added"}</li>
        <li data-on={connected.email}>Email {connected.email ? "connected" : "not added"}</li>
      </ul>

      <h2>Guestbook</h2>
      {dbError ? <p role="alert" className="error">Couldn’t reach the database: {dbError}</p> : <SignForm siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />}
      <ol className="entries">
        {entries.map((e) => (
          <li key={e.id}><span>{e.message}</span> <time dateTime={new Date(e.created_at).toISOString()}>{new Date(e.created_at).toUTCString()}</time></li>
        ))}
      </ol>
    </main>
  );
}
