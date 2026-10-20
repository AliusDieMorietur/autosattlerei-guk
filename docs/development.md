# Local development

## Prerequisites

- Bun 1.3 or newer for `apps/website`
- Node.js 20 or newer and pnpm 9/10 for `apps/cms`
- Docker with Docker Compose

## 1. Start PostgreSQL

```bash
docker compose -f docker-compose.dev.yaml up -d
```

The development database is available at `localhost:2345` with database/user/password `main`/`postgres`/`password`.

## 2. Start Payload CMS

```bash
cd apps/cms
cp .env.example .env
```

Use these local values in `apps/cms/.env`:

```dotenv
DATABASE_URL=postgresql://postgres:password@localhost:2345/main
PAYLOAD_SECRET=replace-with-a-long-random-value
```

Then install, migrate, and start:

```bash
pnpm install
pnpm payload migrate
pnpm dev
```

Payload runs at `http://localhost:3000` by default. If the website will also run directly, start Payload on another port:

```bash
pnpm dev -- --port 3232
```

The admin panel is then at `http://localhost:3232/admin`.

## 3. Start the website

Create `apps/website/.env` from the template:

```bash
cd apps/website
cp .env.example .env
```

The defaults target the local CMS on port `3232`. Set `RESEND_API_KEY` when testing contact email; analytics IDs can remain empty.

`NEXT_PUBLIC_SERVER_URL` supports the legacy `/api/*` rewrite. Current blog and contact routes are handled by the website itself, so the old Fastify server is not required for normal storefront development.

Start the app:

```bash
cd apps/website
bun install
bun run dev
```

## Content seed

The CMS seed uploads images from `apps/website/public`, clears the managed collections, and recreates German slides, cards, and gallery sections. It is destructive.

With Payload running:

```bash
cd apps/cms
CMS_URL=http://localhost:3232 \
CMS_EMAIL='<payload-user-email>' \
CMS_PASSWORD='<payload-user-password>' \
pnpm run seed
```

## Checks

```bash
cd apps/website
bun run check
bun run build

cd ../cms
pnpm run lint
pnpm run test:int
pnpm run build
```

Run `pnpm run generate:types` after changing Payload collections, globals, or fields.
