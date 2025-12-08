# Deploying to Render (backend + frontend)

This guide walks through configuring Render to host both the backend (API) and the frontend (static site built by Vite).

Prereqs
- You have a Render account and the GitHub repo connected.

Backend (Node.js) — quick checklist

1. In Render, create a new **Web Service** (if not already created).
   - Environment: `Node`
   - Build Command: leave default (Render will run `npm install` and use `npm start` from `backend/package.json`) or set `npm install`.
   - Start Command: `node src/index.js` (should match `backend/package.json` `start` script).
   - Instance Type: choose as needed.

2. Set environment variables for the backend service:
   - `MONGODB_URI` = your MongoDB connection string (e.g., from MongoDB Atlas).
   - Any other secrets (do NOT commit these to the repo).

3. Deploy. Render will install dependencies and run the start command. Confirm logs show `MongoDB connected` and `Server running on port ...`.

Frontend (Vite) — static site setup

1. In Render, create a new **Static Site** (or Web Service that serves static files).
   - Build Command: `cd frontend && npm ci && npm run build`
   - Publish Directory: `frontend/dist`
   - Root Directory: repo root (default)

2. Set the environment variable for the frontend build (important):
   - `VITE_API_BASE_URL` = `https://<your-backend-domain>` (example: `https://trueb.onrender.com`).
   - Important: Set this **before** the build step so Vite inlines it into the production bundle.

3. Deploy. Render will run the build command and publish the `frontend/dist` directory.

Notes & troubleshooting
- If you see `sh: 1: vite: Permission denied` during build, update the frontend scripts to invoke Vite with Node: `node ./node_modules/vite/bin/vite.js build` (this repo already uses that fallback).
- CORS: the backend uses `cors()` and allows all origins by default. If you need stricter CORS, update `backend/src/index.js` to configure allowed origins.
- If you change `VITE_API_BASE_URL`, you must rebuild the frontend.

Automating deployments
- Optionally, create a `render.yaml` to define services as code (Render docs). This allows reproducible service creation and env var definitions. See Render docs: https://render.com/docs/yaml

Verify in browser
- Open your frontend URL (Render provides a default for the static site) and confirm API calls go to the backend URL (open DevTools Network tab to confirm). If you see 4xx/5xx errors, check backend logs in Render and confirm `MONGODB_URI` and other secrets are set correctly.

If you want, I can:
- Create a `render.yaml` for both services (I will include placeholders for secrets so you can fill them in on Render), or
- Walk through adding the `VITE_API_BASE_URL` in your Render UI step-by-step with screenshots (text instructions here), or
- Trigger a redeploy locally via the Render API (requires an API key you provide).
