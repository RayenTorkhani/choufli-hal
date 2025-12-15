Overview — choufli-hal

This document helps you read and navigate the project quickly without changing site behaviour.

Top-level folders

- src/

  - Frontend source (React + TypeScript) used by Vite.
  - Entry points: `main.tsx` and `App.tsx`.
  - UI pages/components: `menu.tsx`, `therapist.tsx`, `PlayButton.tsx`, `SettingsButton.tsx`.

- public/

  - Static HTML pages used for testing or fallback pages such as `game3.html` and `chatbox (1).html`.

- back/

  - Minimal Node.js backend (Express) with simple auth and user routes. See `back/index.js`.

- assets/
  - Media and images used by the frontend (textures, images, etc.).

Important files

- `package.json` — scripts you will use:

  - `npm run dev` — start Vite dev server
  - `npm run build` — build the project
  - `npm run preview` — preview built site

- `vite.config.ts` — Vite configuration for the frontend.
- `tsconfig.*.json` — TypeScript configuration files.
- `eslint.config.js` — lint rules for the project.

Backend notes

- Start the backend with `node back/index.js` (requires Node.js and optional MongoDB).
- Environment variables:
  - `MONGO_URI` (default: `mongodb://127.0.0.1:27017/demo`)
  - `JWT_SECRET` (default: `devsecret`)

How I rephrased the project

- I added this `docs/OVERVIEW.md` to provide a concise map of the repository and how to run the app locally.
- No code or UI behavior was changed — only documentation was added to improve readability.

If you want, I can also:

- Replace the root `README.md` with a cleaned, concise README (I prepared the content) — tell me to proceed.
- Add a short `CONTRIBUTING.md` or a `docs/DEVELOPMENT.md` with step-by-step local dev instructions.
