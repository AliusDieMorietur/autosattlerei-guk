# Payload CMS

`apps/cms` is the Payload CMS 3 application used by the public website.

## Managed content

### Collections

- `users` — Payload admin users.
- `media` — uploaded images and videos.
- `gallery-sections` — ordered service/gallery groups and their media.
- `blog-posts` — published blog entries with media.

### Globals

- `slides` — home-page hero carousel.
- `service-cards` — home-page service links.

The public website reads these through Payload's REST API with relationship depth `1`.

## Commands

```bash
cd apps/cms
pnpm install
pnpm dev
pnpm run build
pnpm run lint
pnpm run test:int
pnpm run test:e2e
pnpm run generate:types
pnpm run generate:importmap
```

## Environment

```dotenv
DATABASE_URL=postgresql://postgres:password@localhost:2345/main
PAYLOAD_SECRET=replace-with-a-long-random-value
```

`DATABASE_URL` must be PostgreSQL despite the old blank-template text that previously referred to MongoDB.

## Schema changes

After changing a collection, global, or field:

1. Run `pnpm run generate:types`.
2. Generate a migration with the Payload CLI when persistence changes.
3. Review the migration and generated `src/payload-types.ts`.
4. Run the integration tests and production build.

Do not edit `src/payload-types.ts` manually.

## Seed

`src/seed.ts` imports source images from `apps/website/public`. It requires a running CMS and an existing Payload user through `CMS_URL`, `CMS_EMAIL`, and `CMS_PASSWORD`. The seed deletes existing gallery sections, blog posts, and media before recreating content, so do not run it against production unintentionally.
