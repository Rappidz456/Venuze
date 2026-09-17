# Venuze

Frontend assessment for **Hashed System**: a venue discovery product built to the supplied Figma tokens (Poppins, coral/gold brand, 70px hero type, pill CTAs).

Public site is browseable without an account. Login uses the [ReqRes](https://reqres.in) demo API. After a successful sign-in, the user returns home.

## Live credentials

```
email: eve.holt@reqres.in
password: cityslicka
```

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js 15 + Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |

## What’s in the app

- **Home** — hero search (Where / When / Guests), occasion tiles, featured carousel, host CTA, trust stats, path steps, destinations, vendor strip, footer
- **Explore** — filterable listings, filter modal, skeleton loaders, “No data found” empty state, sort
- **Venue detail** — gallery, amenities, inquiry form
- **Login** — React Hook Form + Zod, ReqRes login, error toasts
- **Dark mode** — class strategy via `next-themes`

## Technical decisions

**App Router, mixed server/client.** Marketing sections that only render static content stay as Server Components (`Hero` image, category tiles, destinations). Anything that searches, filters, authenticates, or carousels is a Client Component. The venue detail page is a server page that reads local catalog data so the first paint doesn’t wait on a client fetch.

**BFF for ReqRes.** The browser never talks to `reqres.in` directly. `POST /api/auth/login` adds the `x-api-key` header, validates with Zod, and sets an **httpOnly** cookie. That keeps the API key off the client and gives `middleware.ts` something it can actually read.

**URL as the source of truth for search.** City, guests, category, price, amenities, and sort live in the query string. That makes listings shareable and keeps TanStack Query’s cache key honest. Zustand only holds UI chrome (filter modal, mobile nav, saved hearts).

**Catalog is local.** There is no public venue API in the brief. I served a typed catalog from `data/venues.ts` through `/api/venues` so the client still has a real fetching/caching/error path.

**Design tokens in CSS, not a second Tailwind config.** The Figma export was written for Tailwind v3. This app is on Tailwind v4, so the same values live in `app/globals.css` `@theme`. Primitive names (`bg-brand`, `rounded-pill`, `text-6xl`, `shadow-card`) match the export so a reviewer can map Figma → code without a translation layer. See `DESIGN_SYSTEM.md`.

## State management

| Tool | Owns |
| --- | --- |
| **TanStack Query** | Venues list/detail, session. Query keys for search filters. |
| **Zustand** | Auth user (persisted), filter drawer, mobile nav, saved venue IDs. |
| **React Hook Form + Zod** | Login, hero search, venue inquiry. Schema is shared with the login API route so the server doesn’t trust the client. |
| **Cookies + middleware** | A logged-in visit to `/login` bounces home. |

Zustand is not used as a server-state dump. If a value can go stale and needs a refetch, it belongs in Query.

## Project layout

```
app/
  (site)/          public chrome (header + footer): home, venues
  login/           split-screen auth, no marketing chrome
  api/             BFF routes (auth, venues)
  globals.css      design tokens
components/
  ui/              primitives (Button, Field, Modal, Skeleton, EmptyState)
  home/            landing sections
  venues/          cards, filters, inquiry form
  layout/          header, footer
lib/               cn, constants, filter helpers, axios client, zod schemas
stores/            zustand
hooks/             useVenuesQuery, useLoginMutation, useLockBody
data/              catalog + marketing copy
middleware.ts      cookie gate
```

## Assumptions

- The Figma MCP export covered **desktop Home** plus notes that Search Results, a Filter popup, and a “No data found” state exist. I implemented those three, then a venue detail page because the export never reached those frames.
- Photography is Unsplash stand-ins. The original Figma asset URLs expire (~7 days) and need a logged-in Figma session.
- ReqRes only authenticates; it does not return a profile. The signed-in name is derived from the email local-part (`eve.holt` → `Eve Holt`).
- “List your venue” in the header is an entry point to login, not a host onboarding flow — that flow is not in the extracted frames.
- Tablet/mobile were not in the export. Breakpoints are implemented from the same tokens (stacking search fields, 1/2/4 category grid, carousel that becomes a snap scroller).

## Challenges

1. **Partial Figma.** Only desktop Home tokens were extracted before the Figma Starter MCP cap. Pixel-perfect claims on unexported frames would be dishonest; I locked the token scale and reconstructed the named sections instead of inventing a second visual language.
2. **ReqRes API key.** The public login route now 401s without `x-api-key: reqres-free-v1`. That’s handled server-side so a reviewer can use the demo credentials as printed in the brief.
3. **Middleware vs. Zustand.** The cookie is the source of truth for the session; Zustand hydrates the header from `/api/auth/me`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set `REQRES_API_URL` and `REQRES_API_KEY` (see `.env.example`).
4. Deploy. No extra build command — `next build` is enough.
