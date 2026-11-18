# Frame & Flow Studio — Website

**frame&flow.** — *Better websites. Smarter businesses.*

Marketing website for **Frame & Flow Studio**, an independent digital solutions studio in Dallas, Texas, founded by Michael Li. It covers two services: **Website Design & Development** and **AI & Business Automation**.

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
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/og.png` | Generated SEO assets (`og.png` is referenced in metadata only when an absolute URL is known) |

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
    contact/           Shared validation schema and Resend delivery
    rate-limit.ts      Rate limiter (Upstash Redis when configured, in-memory fallback)
    log.ts             Structured server logging
    metadata.ts        Per-page metadata helper
  instrumentation.ts   Server error hook (onRequestError)
public/brand/          Wordmark (light/dark), monogram, PNG app icons
scripts/
  generate-brand.cjs   Regenerates every logo and icon asset from Geist SemiBold
```

Design tokens (colours, type scale, radii, shadows, container widths, motion) are defined in the `@theme` block at the top of `src/app/globals.css` and are available as Tailwind utilities, for example `bg-canvas`, `text-ink-soft`, `text-headline` and `ease-out-soft`.

---

## Environment variables

See `.env.example`. Nothing is required to run the site locally. Studio identity (name, founder, public email, location) lives in `src/config/site.ts` rather than in environment variables.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Production URL. **Not set yet; no domain has been chosen.** See *Domain configuration*. |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_GITHUB_URL` | public | Social profiles. Each is hidden unless it is a valid https profile URL on the matching domain. |
| `NEXT_PUBLIC_BOOKING_URL` | public | Optional scheduling link on the contact page |
| `NEXT_PUBLIC_PRIVACY_LAST_UPDATED` | public | Publication date shown on `/privacy` |
| `NEXT_PUBLIC_PRIVACY_REVIEWED` | public | `true` hides the "pending review" notice on `/privacy` |
| `RESEND_API_KEY` | **server** | Resend API key |
| `CONTACT_TO_EMAIL` | **server** | Inquiry recipient(s). Defaults to `michaelmlidesign@gmail.com`. |
| `CONTACT_FROM_EMAIL` | **server** | Verified Resend sender. Required in production. |
| `CONTACT_ALLOW_TEST_SENDER` | **server** | `true` allows Resend's test sender outside `next dev` (testing only) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | **server** | Shared rate limiter (recommended for serverless) |

`NEXT_PUBLIC_*` values are built into the page at build time, so **rebuild after changing them**. Never put API keys in `NEXT_PUBLIC_*` variables. Server-only values are read only in `src/lib/` and the API route, and never reach the browser.

---

## Contact form delivery (Resend)

Inquiries are emailed to the studio through [Resend](https://resend.com). The flow is:

1. The browser validates input using the shared rules in `src/lib/contact/schema.ts`.
2. `POST /api/contact` (`src/app/api/contact/route.ts`) runs these checks in order:
   - same-origin
   - JSON content type
   - body size limit (16 KB)
   - rate limit (5 per 10 minutes per hashed IP)
   - honeypot field and plausible fill time
   - server-side validation with per-field length limits
3. `src/lib/contact/deliver.ts` sends the email. It includes the visitor's name, email, company, service interests, project description, timeline, website, preferred contact method and the submission timestamp. All user content is HTML-escaped, and the subject line is stripped of control characters.
4. **Reply-To** is the visitor's address. **From** is always the configured sender, never the visitor's unverified address.
5. Success is shown **only** when Resend returns a 2xx response:
   - If Resend rejects the request or times out, the visitor sees an error and a pre-filled `mailto:` fallback.
   - If delivery isn't configured, the API returns `503 not_configured`, and the contact page says so before anyone fills in the form.

### Setup

1. Create a Resend account and an API key. Set `RESEND_API_KEY` in the hosting provider (server-side only).
2. `CONTACT_TO_EMAIL=michaelmlidesign@gmail.com` (this is also the default).
3. **Development testing:** leave `CONTACT_FROM_EMAIL` empty and run `npm run dev`. Resend's test sender `onboarding@resend.dev` is used. Resend only delivers test-sender mail to the address that **owns the Resend account**, so this works only if that account is registered with the recipient address. To test a production build locally, set `CONTACT_ALLOW_TEST_SENDER=true`.
4. **Before public launch:** verify a sender domain in Resend (DNS records). Then set, for example, `CONTACT_FROM_EMAIL="Frame & Flow Studio <inquiries@your-domain.com>"`. Production builds report "not configured" until a sender is set, and refuse to fall back to the test sender.
5. Send a real test inquiry and confirm it arrives. Check the server logs for `contact.delivered` or `contact.delivery_failed` events.

---

## Domain configuration

**No custom domain has been selected.** Nothing in the code assumes one. The production URL is resolved in `src/config/site.ts` in this order:

1. `NEXT_PUBLIC_SITE_URL`, when explicitly set.
2. A production URL supplied by the host: `VERCEL_PROJECT_PRODUCTION_URL` on Vercel *production* deployments, or `URL` in Netlify's production context.
3. Otherwise **none**. Canonical tags, sitemap entries, the robots `Sitemap:` line and absolute Open Graph URLs are omitted, rather than pointing at a guessed domain.

Relative metadata such as the OG image resolves against the deployment URL on previews, or `http://localhost:<PORT>` locally. That base is never used for canonical URLs. Preview deployments (Vercel/Netlify) are marked `noindex` and disallowed in robots.txt.

**Current status:** unresolved. Until a domain is chosen, the site has no canonical URLs or sitemap entries, unless it is deployed to a Vercel production environment, where the platform-provided domain is used.

**When a domain is selected:**

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy. Canonical URLs, the sitemap, robots.txt and OG URLs all update automatically.
- [ ] Check `/sitemap.xml`, `/robots.txt` and a page's `<link rel="canonical">`.
- [ ] Verify the domain in Resend and update `CONTACT_FROM_EMAIL` to an address on it.
- [ ] Update the privacy policy if hosting or providers changed.

---

## Security

| Area | Implementation |
| --- | --- |
| Input validation | Shared schema, enforced on the server. Allow-listed option values and length limits on every field. |
| Body size | `Content-Length` checked before reading, and the actual byte length checked after (16 KB max) |
| Spam | Hidden honeypot field, plus a minimum (3 s) and maximum (24 h) form fill time |
| Rate limiting | 5 submissions per 10 minutes per client. IPs are SHA-256 hashed before use. |
| Origin | Cross-origin POSTs rejected; JSON content type required |
| Output | User content HTML-escaped in the notification email; subject line stripped of control characters |
| Secrets | Read only server-side (`server-only` modules); never `NEXT_PUBLIC_`; `.env*` files are git-ignored |
| Error monitoring | Structured JSON logs (`src/lib/log.ts`) for delivery, spam and rate-limit events, plus `onRequestError` in `src/instrumentation.ts` for every uncaught server error. No personal data is logged. |

**Rate limiting on serverless.** The in-memory fallback is per instance, so on Vercel/Netlify it is not a reliable limit by itself. Use one or both of:

- **Upstash Redis (built in):** create a free Redis database at upstash.com and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. The limiter then uses a shared fixed window and needs no extra dependency.
- **Platform protection:** for example, a Vercel Firewall rate-limit rule on `POST /api/contact`, or the equivalent at your CDN/WAF.

**Error monitoring.** Logs are visible in the hosting provider's log viewer; alert on `"level":"error"`. To use Sentry or similar, forward errors from `logError()` in `src/lib/log.ts` and from `onRequestError` in `src/instrumentation.ts`.

---

## Deployment

The site is a standard Next.js app. Every page is static except `/contact`, which reads the `?service=` query, and `/api/contact`.

- **Vercel:** import the repository, add the environment variables, and deploy.
- **Other Node hosts:** run `npm ci && npm run build && npm start` (set `PORT` as needed).

### Launch checklist

- [ ] Configure Resend: `RESEND_API_KEY`, a verified sender domain, `CONTACT_FROM_EMAIL`. Then send a test inquiry and confirm it arrives.
- [ ] Choose a domain and set `NEXT_PUBLIC_SITE_URL` (see *Domain configuration*)
- [ ] Configure shared rate limiting (Upstash) and/or a platform firewall rule
- [ ] **Owner/legal review of the privacy policy**, then set `NEXT_PUBLIC_PRIVACY_LAST_UPDATED` to the publication date and `NEXT_PUBLIC_PRIVACY_REVIEWED=true`
- [ ] Add verified social profile URLs, if any
- [ ] If analytics, cookies or new third-party services are added, update `/privacy` first

---

## Editing content

All copy lives in plain TypeScript files, so no CMS is needed.

| To change… | Edit |
| --- | --- |
| Studio name, wordmark text, founder bio, email, location, SEO title/description | `src/config/site.ts` |
| Social links, booking link, privacy date | Environment variables (see above) |
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

- **Identity:** `src/config/site.ts`. The name, display name, founder, email, location and SEO copy are all defined here and flow through to the navigation, pages, metadata, structured data and email notifications.
- **Logo and icons:** the wordmark **frame&flow.** and the monogram **f&f.** are Geist SemiBold outlined to SVG paths, in charcoal `#20231F`, ivory `#F7F7F2` and sage `#526B50` / `#B4C9AE`. To regenerate every asset after a design change:
  ```bash
  npm i --no-save opentype.js@1.3.4
  node scripts/generate-brand.cjs
  ```
  This writes `src/components/layout/brand-glyphs.ts` (used by `<Logo>`), the files in `public/brand/` (wordmark, light, dark and monogram SVGs, plus 192 px and 512 px PNGs), `src/app/icon.svg`, `src/app/favicon.ico` and `src/app/apple-icon.png`. PNG/ICO output needs Playwright with Chromium; pass `--svg-only` to skip it.
- **Colours and type:** edit the tokens in `src/app/globals.css` (`@theme`). Keep secondary text at 4.5:1 contrast or better against the background.
- **Social image:** `src/app/og.png/route.tsx`

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
