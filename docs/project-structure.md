# Project structure

This repository is organized as independent applications rather than a package-manager workspace. Install dependencies and run scripts from the application being changed.

## Active stack

- `apps/website` — public Next.js 16 / React 19 website.
- `apps/cms` — Payload CMS 3 admin and content API.
- PostgreSQL 16 — Payload database, started by Docker Compose.
- Resend — sends contact-form emails from the website route handler.

## Other applications

- `apps/server` — older Fastify/Drizzle contact and admin API. It is commented out in the main Compose file and is not used by the current website contact route.
- `apps/mobile` and `apps/expo-mobile` — Expo applications/prototypes. They are not part of the website deployment.

## Root files

- `docker-compose.yaml` — production-style stack: PostgreSQL, CMS migration, CMS, and website.
- `docker-compose.dev.yaml` — PostgreSQL only, exposed on local port `2345`.
- `.env.example` — root Compose environment template.

## Data flow

1. Editors manage slides, service cards, galleries, blog posts, and media in Payload.
2. Server Components in `apps/website` request Payload's REST API through `CMS_URL`.
3. Media URLs are exposed to the browser as `/cms-media/*`; a Next.js rewrite proxies those requests to Payload.
4. CMS reads are cached with a 60-second revalidation interval by default.
5. The contact form posts to the website's `/api/contact/submit` route, which sends mail through Resend.

## Documentation convention

Keep the root README short. Put app-specific setup, architecture, and operational details in `docs/`, following the same split used in the Subjektiv repository.
