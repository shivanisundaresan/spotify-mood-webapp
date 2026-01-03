# Spotify Mood Webapp

Monorepo starter for the Spotify Mood personal web app.

Structure:
- apps/frontend — Next.js (TypeScript) app
- apps/backend — Express (TypeScript) API
- prisma — Prisma schema for Postgres

Quick dev (install pnpm first):

1. Install dependencies

```bash
pnpm install
```

2. Start frontend and backend (in separate terminals):

```bash
pnpm --filter frontend dev
pnpm --filter backend dev
```

Database:
- Provide a Postgres `DATABASE_URL` in `.env` before running Prisma commands.

Prisma:

```bash
cd prisma
npx prisma generate
npx prisma migrate dev
```

This is a scaffold. Next steps: implement Spotify OAuth, session generation, and frontend pages.

Demo backend endpoint

After starting the backend, try the sessionization demo:

```bash
curl http://localhost:4000/sessions/regenerate-demo
```

Todos

- Scaffolding: completed
- Backend endpoints: in-progress
- Session generation + tests: completed (utility in packages/utils)
