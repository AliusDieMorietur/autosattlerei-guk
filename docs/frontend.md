# Frontend

`apps/website` is the customer-facing Next.js application.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- `next-intl`
- shadcn/Radix primitives
- Embla Carousel
- Resend for contact email

## Run locally

```bash
cd apps/website
bun install
bun run dev
```

See [Local development](./development.md) for the required environment variables and CMS setup.

## Structure

- `src/app/[locale]` — localized pages and route-level components.
- `src/app/api` — website-owned route handlers for contact submission and blog pagination.
- `src/components` — shared app components and UI primitives.
- `src/i18n` — locale routing and message loading.
- `src/lib/api` — typed Payload REST client and media URL helpers.
- `messages` — translation dictionaries.
- `public` — static and seed source assets.

Only German is currently enabled in `src/i18n/routing.ts`. Routes omit the locale prefix.

## Content and caching

Pages read content on the server from `CMS_URL`. The API client uses Next's `revalidate` option with a 60-second default. Fetch failures currently fall back to empty content, allowing the storefront to render while the CMS is unavailable.

Payload media is rendered through `/cms-media/<filename>`. `next.config.mjs` rewrites that path to `${CMS_URL}/api/media/file/<filename>` so the browser does not need direct access to the internal CMS hostname.

## Frontend conventions

- Keep static page markup in Server Components. Add `"use client"` only around interaction boundaries such as forms, menus, carousels, and infinite loading.
- Use `next/image` for content images. Every `fill` image must include an accurate `sizes` value.
- Give the above-the-fold image `priority`; leave offscreen images lazy-loaded.
- Load third-party embeds only when they approach the viewport.
- Use semantic headings and meaningful alt text; use `alt=""` for decorative images.
- Keep canonical URLs, Open Graph metadata, and structured data in route files.
- Use the centralized CMS client instead of fetching Payload directly from components.

## Performance notes

The frontend follows the same practical approach used by Subjektiv's storefront: server-render initial content, keep client boundaries narrow, serve responsive images, delay expensive media/embeds, and validate SEO metadata at route level.

Current optimizations include:

- home and gallery shells rendered as Server Components;
- responsive `sizes` on carousel, card, and gallery images;
- only the font weights used by the UI are emitted;
- Google Maps is created near the viewport via `IntersectionObserver`;
- CMS calls for independent home-page sections run in parallel.

When adding media, avoid committing duplicate full-resolution JPG and WebP variants unless both are actively used. The tracked `public` directory is large; new website content should normally be uploaded to Payload.

## Validation

```bash
cd apps/website
bun run check
bun run build
```

Use Lighthouse on a production build, not the development server. Test at least the home page, gallery index, gallery detail, and blog on a mobile viewport.
