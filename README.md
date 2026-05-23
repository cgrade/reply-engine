# Reply Engine (Intimova)

AI-powered social reply generator.

## Local development

1. Add `GROQ_API_KEY` to `.env` (get one at [console.groq.com](https://console.groq.com) — keys start with `gsk_`).
2. Start the API: `npm run server` (port 3001).
3. Start the UI: `npm run dev` (port 5173). Vite proxies `/api` to the local server.

## Deploy to Vercel

1. Push the repo and import the project in Vercel.
2. Set **Environment variable**: `GROQ_API_KEY`.
3. Deploy. The UI is served from `dist`; `api/generate.js` runs as a serverless function at `/api/generate`.

You do **not** need `server.js` on Vercel — only the `api/` route and static build.
