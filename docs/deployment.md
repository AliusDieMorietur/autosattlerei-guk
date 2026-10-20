# Deployment

The root `docker-compose.yaml` builds and runs the active production stack.

## Services

- `postgres` — PostgreSQL 16 with a persistent `dbdata` volume.
- `cms-migrate` — runs Payload migrations before CMS startup.
- `cms` — Payload standalone server, exposed on host port `3232`.
- `website` — Next.js standalone server, exposed on host port `3000`.

Inside the Compose network, the website reaches Payload at `http://cms:3000`. Browser-facing media requests continue through the website's `/cms-media/*` proxy.

## Required configuration

Start from `.env.example` and provide production values for:

- PostgreSQL credentials and `CMS_DATABASE_URL`.
- `PAYLOAD_SECRET`.
- `NEXT_PUBLIC_HOST_URL`.
- `RESEND_API_KEY`.
- Google Tag Manager / Analytics IDs when analytics is enabled.

Never commit the populated `.env` file.

## Build and start

```bash
docker compose up -d --build
```

Inspect startup and migration logs:

```bash
docker compose logs cms-migrate
docker compose logs cms website
```

## Pre-deployment checks

```bash
cd apps/website && bun run check && bun run build
cd ../cms && pnpm run lint && pnpm run test:int && pnpm run build
```

Also verify:

- migrations complete before CMS starts;
- the website can read slides and gallery content;
- `/cms-media/<filename>` serves an uploaded item;
- contact email succeeds with the production Resend domain;
- canonical and Open Graph URLs use the production host;
- the database and uploaded media have backups.
