# Chat Prototype

A minimal WebSocket chat app — one server file, one HTML/JS file, no frontend framework.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:8080 in a couple of browser tabs to test.

## Deploy to Railway

1. Push this folder to a new GitHub repo (public is fine).
2. Go to https://railway.app, sign in with GitHub.
3. "New Project" → "Deploy from GitHub repo" → select this repo.
4. Railway auto-detects Node and runs `npm start`.
5. In your Railway project: Settings → Networking → "Generate Domain".
6. Open the generated `https://your-app.up.railway.app` URL — that's it.
   The frontend auto-detects `wss://` vs `ws://`, so no code changes needed
   between local dev and the deployed version.

Share the Railway URL with your friend — they don't need a GitHub or
Railway account, just the link.
