Overview — choufli-hal

This document helps you read and navigate the project quickly. The repository was reorganized so the frontend and backend are in separate top-level folders to make the structure clearer and safer for publishing.

Top-level folders

- `frontend/`
  - Frontend source (React + TypeScript) used by Vite.
  - Entry points: `frontend/src/main.tsx` and `frontend/src/App.tsx`.
  - UI pages/components: `frontend/src/menu.tsx`, `frontend/src/therapist.tsx`, `frontend/src/components/PlayButton.tsx`, etc.
  - `frontend/package.json` contains the scripts for local dev and build.

- `backend/`
  - Minimal Node.js backend (Express) with simple auth and user CRUD routes. See `backend/index.js`.
  - Start locally with `node backend/index.js` (Node.js required). To use the API fully, provide a MongoDB connection.

- `docs/` — documentation and proposed README files.
- `public/` / `frontend/public/` — static HTML and assets for the frontend.
- `assets/` — media and images used by the frontend (textures, images, etc.).

Important files and scripts

- `frontend/package.json` — scripts you will use (run from repo root or cd into `frontend/`):
  - `npm run dev` — start Vite dev server
  - `npm run build` — build the project
  - `npm run preview` — preview built site

- `backend/package.json` (if present) — backend dependencies and scripts.
- `docs/OVERVIEW.md` — this file (updated to match current layout).
- `.env.example` — example environment variables (do NOT commit real secrets).

Environment variables

Keep secrets out of the repo. Use a local `.env` (ignored) based on `.env.example`.

- `VITE_GROQ_KEY` — API key for Groq (used by the chat widget). Do not commit.
- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://user:pass@host:27017/dbname`).
- `JWT_SECRET` — JWT signing secret used by the backend.

Backend API summary

- `GET /` — health check
- `POST /auth/signup` — register (expects `email`, `username`, `password`)
- `POST /auth/signin` — sign in (expects `username`, `password`)
- `POST /users` / `POST /users/add` — create user
- `GET /users` / `GET /users/:id` — list / get user
- `PUT /users/:id` — update user
- `DELETE /users/:id` — delete user

Security and publishing notes

- I removed hardcoded API keys and added `.env.example`. Keep your real `.env` local and never commit it.
- The repository history was cleaned to remove an accidentally committed secret. If you or collaborators previously cloned the repo, re-clone after this change because history was rewritten.

Local dev quick steps

1. Copy `.env.example` -> `.env` and fill real values locally.
2. Start backend (from repo root):

```bash
node backend/index.js
```

3. Start frontend (from repo root):

```bash
cd frontend
npm install
npm run dev
```

If you want, I can also replace the root `README.md` with the proposed cleaned README and commit it. If you'd like that, I will proceed and push the change.
