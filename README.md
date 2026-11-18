# Independent Digital Studio — Website

Marketing website for an independent, founder-led digital studio offering **Website Design & Development** and **AI & Business Automation**.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4**, **Lucide** icons and the **Geist** typeface (self-hosted through the `geist` package, so no external font requests).

---

## Quick start

Requires Node.js 20.9+ (developed on Node 22).

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it
npm run dev                  # http://localhost:3000
```

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Development server with hot reload                     |
| `npm run build`     | Production build                                       |
| `npm start`         | Serve the production build                             |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)    |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit`        |
| `npm run check`     | Lint, typecheck and build together. Run before deploying |

---

## Routes

| Route                | Page                                                    |
| -------------------- | ------------------------------------------------------- |
| `/`                  | Homepage                                                |
| `/services/websites` | Website Solutions                                       |
| `/services/ai`       | AI & Automation, with the interactive workflow demo     |
| `/work`              | Portfolio, with category filters                        |
| `/work/[slug]`       | Case study (static, generated from `src/data/projects.ts`) |
| `/about`             | About the studio and founder                            |
| `/contact`           | Project inquiry form. `?service=new-website` pre-selects a service |
| `/privacy`           | Privacy policy (template)                               |
| `/api/contact`       | Contact form endpoint (POST)                            |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated SEO assets       |

---

## Project structure

```
src/
  app/                 Routes, layout, global styles, SEO files, API route
  components/
    layout/            Navbar (with dropdown + mobile menu), footer, logo
    sections/          Page sections: hero, service cards, project cards, process,
                       ownership, FAQ, CTA, workflow demo, project filter, contact form
    ui/                Primitives: Button, TextLink, Eyebrow, SectionHeading, Badge,
                       Breadcrumbs, Accordion, CheckList, Reveal
    visuals/           SVG/HTML illustrations (hero composition, project mockups)
  config/site.ts       Studio name, founder, contact details, social links
  data/                All page content: services, projects, process, FAQs,
                       maintenance options, about-page principles, navigation
  lib/
    contact/           Shared validation schema and delivery integrations
    rate-limit.ts      In-memory rate limiter for the contact endpoint
    metadata.ts        Per-page metadata helper
```

Design tokens (colours, type scale, radii, shadows, container widths, motion) are defined in the `@theme` block at the top of `src/app/globals.css` and are available as Tailwind utilities, for example `bg-canvas`, `text-ink-soft`, `text-headline` and `ease-out-soft`.

---

## Environment variables

See `.env.example`. Nothing is required to run the site locally.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Production URL. Enables canonical URLs, sitemap entries and absolute Open Graph URLs. On Vercel this falls back to the project's production domain. |
| `NEXT_PUBLIC_STUDIO_NAME` / `_SHORT_NAME` | public | Studio name (defaults to "Studio Name") |
| `NEXT_PUBLIC_FOUNDER_NAME` | public | Founder name on the About page |
| `NEXT_PUBLIC_CONTACT_EMAIL` | public | Business email shown site-wide |
| `NEXT_PUBLIC_BOOKING_URL` | public | Optional scheduling link on the contact page |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | **server** | Email delivery through Resend |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | **server** | Webhook delivery |

`NEXT_PUBLIC_*` values are built into the page at build time, so **rebuild after changing them**. Never put API keys in `NEXT_PUBLIC_*` variables.

---

## Contact form delivery

The form validates input in the browser and again on the server, using the same rules in `src/lib/contact/schema.ts`. The server (`src/app/api/contact/route.ts`) also:

- rejects cross-origin requests and oversized bodies
- uses a hidden honeypot field and a minimum fill time to block spam
- rate-limits each IP to 5 submissions per 10 minutes
- **never fakes success**. If no delivery channel is configured, it returns `503 not_configured`. The contact page shows a notice before anyone fills in the form, and after a submission it offers a pre-filled `mailto:` fallback.

### Option 1: Email (Resend)

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. Set:
   ```
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL="Studio Website <inquiries@yourdomain.com>"
   ```
   Each inquiry arrives as a formatted email, with `reply-to` set to the visitor's address.

### Option 2: Webhook (Zapier, Make, n8n, CRM, Slack…)

Set `CONTACT_WEBHOOK_URL` (and optionally `CONTACT_WEBHOOK_SECRET`, sent as `X-Webhook-Secret`). Each submission is POSTed as JSON:

```json
{
  "type": "project_inquiry",
  "submittedAt": "2026-01-01T12:00:00.000Z",
  "source": "https://yourdomain.com",
  "name": "…", "email": "…", "company": "…",
  "services": ["new-website"], "serviceLabels": ["New website"],
  "description": "…", "website": "https://…",
  "timeline": "", "contactMethod": "", "phone": ""
}
```

If both channels are configured, both are used. The submission succeeds when at least one delivers, and failures are logged on the server.

> **Rate limiting note:** the limiter keeps its state in memory. On serverless hosting, each instance has its own memory, so treat it as a first line of defence. For stricter protection, add your host's firewall or bot protection, or swap in a shared store such as Upstash Redis in `src/lib/rate-limit.ts`.

---

## Deployment

The site is a standard Next.js app. Every page is static except `/contact`, which reads the `?service=` query, and `/api/contact`.

**Vercel (recommended):** import the repository, add the environment variables above, and deploy. The production domain is picked up automatically for canonical URLs.

**Other Node hosts:** `npm ci && npm run build && npm start` (set `PORT` as needed). Any platform that supports Next.js route handlers works.

Before launch:

- [ ] Set the studio name, founder, email and social links (`src/config/site.ts` or environment variables)
- [ ] Set `NEXT_PUBLIC_SITE_URL` (unless the Vercel fallback applies)
- [ ] Configure contact delivery and send a test inquiry
- [ ] Review the privacy policy (`src/app/privacy/page.tsx`) with a professional
- [ ] Replace the founder portrait placeholder (`src/app/about/page.tsx`)
- [ ] Replace the placeholder logo mark (`src/components/layout/logo.tsx`, `src/app/icon.svg`)

---

## Editing content

All copy lives in plain TypeScript files, so no CMS is needed.

| To change… | Edit |
| --- | --- |
| Studio name, founder bio, email, location, socials, booking link | `src/config/site.ts` |
| Service cards, capability lists, AI principles | `src/data/services.ts` |
| Process steps (homepage, websites, AI) | `src/data/process.ts` |
| Managed vs self-managed options | `src/data/maintenance.ts` |
| FAQs | `src/data/faqs.ts` |
| About page principles and "what to expect" | `src/data/about.ts` |
| Navigation and footer links | `src/data/navigation.ts` |
| Contact form options | `src/lib/contact/schema.ts` |

### Adding a portfolio project

Add an entry to the `projects` array in `src/data/projects.ts`. Its page at `/work/<slug>` is generated automatically, and it appears in the grid, the filters, the sitemap and the related-projects lists.

- `isConcept: true` adds the **Concept Project** label everywhere and frames outcomes as *intended*. Use `false` only for real client work.
- `visual` picks one of the illustrated mockups. To use real screenshots instead, add `image: { src: "/work/my-project.jpg", alt: "…" }` with the file under `public/work/`. It is served through `next/image` and replaces the illustration.
- `caseStudy.measuredResults` should only ever contain genuinely measured results from client work.

### Updating branding

- **Name:** set `NEXT_PUBLIC_STUDIO_NAME` or edit `src/config/site.ts`
- **Logo:** replace `LogoMark` in `src/components/layout/logo.tsx` and `src/app/icon.svg`
- **Colours and type:** edit the tokens in `src/app/globals.css` (`@theme`). Keep secondary text at 4.5:1 contrast or better against the background.
- **Social image:** `src/app/opengraph-image.tsx`

---

## Accessibility & performance notes

- Skip link, semantic landmarks, one `h1` per page, labelled navigation regions
- The services dropdown supports click, hover, arrow keys and Escape, and returns focus to its button. The mobile menu locks scrolling, closes on Escape and moves focus into the menu.
- FAQs use native `<details>`, which needs no JavaScript.
- The form labels every field, links errors through `aria-describedby`, moves focus to the first invalid field, and announces status changes.
- Scroll-reveal motion is progressive enhancement: content is visible without JavaScript, and all motion stops under `prefers-reduced-motion`. The workflow demo autoplays only when motion is allowed, has a pause button, and waits for the visitor at the human-review step.
- Illustrations are inline SVG/HTML, so there are no image downloads and no layout shift.

## Routine maintenance

- **Monthly:** `npm outdated` and `npm audit`. Apply patch and minor updates, then `npm run check`.
- **After content edits:** `npm run check` before pushing.
- **Quarterly:** send a test inquiry through the live form, check that social links work, and review the privacy policy date.
- **When adding integrations:** list any new data processors in the privacy policy.
