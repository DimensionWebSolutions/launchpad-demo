# Launchpad Next.js starter

A small Next.js 15 app that shows Launchpad wiring work end to end:

- **Postgres**: a guestbook stored in the database Launchpad creates (`DATABASE_URL`). The table is created on first use, in its own `app` schema with row-level security on, so Supabase's REST API can't read or change it.
- **Bot protection**: the guestbook form is protected by Cloudflare Turnstile when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are set.
- **Email**: shown as connected when `RESEND_API_KEY` is set.
- **Analytics**: Vercel Web Analytics and Speed Insights (count once turned on in the Vercel project), and Google Analytics when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (the console sets it). See `app/analytics.tsx`.
- **Health check**: `GET /api/health` returns `200 {"ok":true,"database":"ok"}`, or `503` when the database can't be reached.

Every service is optional. Without its env vars the page says "not added" and keeps working.

## Use it

```sh
cp -r templates/next-starter ../my-starter && cd ../my-starter
git init && git add -A && git commit -m "Starter"
# push it to GitHub, then edit launchpad.json: set "repo" (and "name" if you like)
launchpad plan
launchpad up
```

To run it locally against the services `up` created:

```sh
launchpad env --dotenv > .env.local
npm install && npm run dev
```
