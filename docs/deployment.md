# Deployment

Production website releases use [`.github/workflows/deployWebsite.yml`](../.github/workflows/deployWebsite.yml). The workflow follows the deployment pattern used by Subjektiv: GitHub Actions builds the Docker image, streams the compressed image over SSH, and recreates only the website service on the server.

The root `docker-compose.yaml` defines the complete production stack.

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

## Website deployment

Run **Deploy website** from the GitHub Actions page on the `main` branch. The workflow:

1. builds `autosattlerei-guk-website:latest` on the GitHub runner;
2. streams it to `DEPLOY_HOST` with `docker save | gzip | ssh`;
3. fast-forwards `/root/projects/autosattlerei-guk` to `origin/main`;
4. recreates only the Compose `website` service without building on the server;
5. checks `http://127.0.0.1:3000/` before reporting success.

Required GitHub configuration:

- Secret `DEPLOY_SSH_KEY` — private SSH key authorized for the production root user.
- Variable `DEPLOY_HOST` — production SSH hostname.
- Variables `NEXT_PUBLIC_SERVER_URL`, `NEXT_PUBLIC_HOST_URL`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA_ID`, and `NEXT_PUBLIC_GA_CONVERSION_ID` — build-time public website configuration.

Runtime secrets remain on the server and are not copied into the image or workflow logs.

## Full-stack manual start

For initial provisioning or CMS changes:

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
