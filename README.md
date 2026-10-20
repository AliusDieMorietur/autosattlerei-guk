# Autosattlerei Guk

Website and content-management stack for Autosattlerei Guk. The repository contains a Next.js storefront, a Payload CMS backed by PostgreSQL, and older server/mobile applications.

## Documentation

- [Project structure](./docs/project-structure.md)
- [Local development](./docs/development.md)
- [Frontend](./docs/frontend.md)
- [Payload CMS](./docs/cms.md)
- [Deployment](./docs/deployment.md)

## Quick start

### Docker Compose

```bash
cp .env.example .env
# Set NEXT_PUBLIC_HOST_URL, RESEND_API_KEY, and production-safe secrets.
docker compose up --build
```

The website is available at `http://localhost:3000` and the Payload admin at `http://localhost:3232/admin`.

### Run the active apps directly

Start PostgreSQL first:

```bash
docker compose -f docker-compose.dev.yaml up -d
```

Then run the CMS and website in separate terminals. See [Local development](./docs/development.md) for environment variables and commands.

## Validation

```bash
cd apps/website && bun run check && bun run build
cd apps/cms && pnpm run lint && pnpm run build
```
