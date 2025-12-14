Proposed README (drop-in replacement)

# choufli-hal

This repository is a small React + Vite application (frontend) with a minimal Node.js backend in `back/`.

> Note: This file is a proposed replacement for the root `README.md`. It is documentation only and will not change application behavior.

Quick start

Prerequisites: Node.js 18+ and npm (or yarn).

Install dependencies:

```bash
npm install
```

Run the frontend in development (Vite):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the built site:

```bash
npm run preview
```

Backend (optional)

Start the backend API server for local development (requires Node.js and optional MongoDB):

```bash
node back/index.js
```

Environment variables:

- `MONGO_URI` — MongoDB connection string (default: `mongodb://127.0.0.1:27017/demo`)
- `JWT_SECRET` — JWT signing secret (default: `devsecret`)

Where to look

- `src/` — React app (entry in `src/main.tsx`, UI in `src/App.tsx`).
- `back/index.js` — Express API (auth and simple user CRUD).
- `public/` — static pages (HTML files used in the repo).
- `assets/` — images and binary assets used by the site.

If you want me to replace the root `README.md` with this content, confirm and I will update it for you.
