# Frame & Flow Studio — Website

**frame&flow.** — *Better websites. Smarter businesses.*

Marketing website for **Frame & Flow Studio**, an independent digital solutions studio in Dallas, Texas, founded by Michael Li. It covers two services: **Website Design & Development** and **AI & Business Automation**.

A **React** single-page app built with **Vite**, **TypeScript**, **React Router**, **Tailwind CSS 4** and **Lucide** icons, using the self-hosted **Geist** typeface. At build time, every route is **prerendered to static HTML**, so pages load fast, are crawlable and carry correct metadata. React then hydrates them in the browser. It deploys to **GitHub Pages**.

---

## Quick start

Requires Node.js 20.19+ (developed on Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Vite dev server with hot reload (client-rendered)               |
| `npm run build`     | Client build, server render bundle, then prerender to `dist/`   |
| `npm run preview`   | Serve the production build locally                              |
| `npm run lint`      | ESLint (TypeScript + React Hooks rules)                         |
| `npm run typecheck` | `tsc --noEmit` for the app and the contact function             |
| `npm run check`     | Lint, typecheck and build. Run before pushing.                  |

To preview the GitHub Pages build locally, including the `/business-website/` base path:

```bash
VITE_BASE_PATH=/business-website npm run build && npm run preview
```

Then open http://localhost:4173/business-website/.

---

## Routes

| Route                | Page                                                  |
| -------------------- | ----------------------------------------------------- |
| `/`                  | Homepage                                              |
| `/services/websites` | Website Solutions                                     |
| `/services/ai`       | AI & Automation, with the interactive workflow demo   |
| `/work`              | Portfolio, with category filters                      |
| `/work/:slug`        | Case study (one per entry in `src/data/projects.ts`)  |
| `/about`             | About the studio and founder                          |
| `/contact`           | Project inquiry form. `?service=new-website` pre-selects a service. |
| `/privacy`           | Privacy policy                                        |
| anything else        | Not-found page (served as `404.html` on GitHub Pages) |

The router lives in `src/app/app.tsx`. The list of prerendered routes is in `src/app/routes.ts`, and new projects are added to it automatically.

---

## Project structure

```
index.html               HTML shell (prerender placeholders for head + app)
vite.config.ts           Vite config. Base path comes from VITE_BASE_PATH.
src/
  main.tsx               Browser entry: hydrates prerendered HTML (BrowserRouter)
  entry-server.tsx       Render entry used by the prerender script (StaticRouter)
  app/
    app.tsx              Layout and routes
    routes.ts            Routes to prerender
    head.tsx             <Seo>: title, description, canonical, Open Graph, JSON-LD
    scroll-manager.tsx   Scroll and focus handling on navigation
  pages/                 One component per route
  components/
    layout/              Navbar (dropdown + mobile menu), footer, logo
    sections/            Hero, service cards, project cards, process, ownership,
                         FAQ, CTA, workflow demo, project filter, contact form
    ui/                  Button, Link, TextLink, Eyebrow, SectionHeading, Badge,
                         Breadcrumbs, Accordion, CheckList, Reveal
    visuals/             SVG/HTML illustrations (hero, project mockups)
  config/
    identity.ts          Studio name, email, location (shared with the server)
    site.ts              Full site config: founder, SEO, URLs, social links
  data/                  All page content (services, projects, FAQs, …)
  lib/contact/schema.ts  Contact validation, shared by the form and the server
  styles/globals.css     Design tokens (@theme) and base styles
server/                  Optional contact-form backend (Resend), deployed separately
public/                  Favicon, app icons, og.png, brand SVGs
scripts/
  prerender.mjs          Renders each route to HTML; writes 404, sitemap, robots, manifest
  generate-brand.cjs     Regenerates logo, icon and og.png assets
.github/workflows/
  deploy-pages.yml       Build and deploy to GitHub Pages
```

Design tokens (colours, type scale, radii, shadows, container widths, motion) are defined in the `@theme` block of `src/styles/globals.css` and used as Tailwind utilities, for example `bg-canvas`, `text-ink-soft`, `text-headline` and `ease-out-soft`.

---

## Deploying to GitHub Pages

`.github/workflows/deploy-pages.yml` runs on every push to `main`, and on manual runs. **To deploy, merge your work into `main`.** It does the following:

1. Installs dependencies, then runs lint and typecheck.
2. Builds with `VITE_BASE_PATH` and `VITE_SITE_URL` taken from GitHub Pages, so links, assets, canonical URLs and the sitemap all match the published address.
3. Uploads `dist/` and deploys it.

**One-time repository settings:**

- **Settings → Pages → Build and deployment → Source:** set to **GitHub Actions**.
- **Deployment branch:** the `github-pages` environment only accepts the default branch, so deployments run from `main`.
- **Private repository:** Pages needs a paid GitHub plan, and the site is publicly reachable unless you use Enterprise Cloud's private Pages.

**Search engines:** this is a test deployment, so the workflow sets `VITE_NOINDEX=true`. Every page is `noindex` and robots.txt disallows crawling. Remove that line when the site should be indexed.

**How routes are served:** each route is written as its own HTML file (`about.html`, `work/independent-cafe.html` and so on), which GitHub Pages serves at the clean URL `/about`. Unknown paths get `404.html`, which renders the not-found page. No hash URLs or redirect tricks are needed.

---

## Configuration

Website settings are **public build-time** `VITE_*` variables: `.env.local` locally, and repository **Variables** (Settings → Secrets and variables → Actions) for the Pages workflow. **Never put secrets in a `VITE_*` variable**, because it's compiled into the public site. See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `VITE_BASE_PATH` | Path the site is served under. Set by the workflow (`/business-website`). |
| `VITE_SITE_URL` | Public URL used for canonical, sitemap and OG URLs. Set by the workflow. |
| `VITE_NOINDEX` | `true` makes every page noindex and has robots.txt disallow crawling |
| `VITE_CONTACT_ENDPOINT` | Contact form backend URL (see below). Empty = form not connected. |
| `VITE_LINKEDIN_URL`, `VITE_INSTAGRAM_URL`, `VITE_GITHUB_URL` | Social links. Hidden unless they're valid https profile URLs. |
| `VITE_BOOKING_URL` | Optional scheduling link on the contact page |
| `VITE_PRIVACY_LAST_UPDATED`, `VITE_PRIVACY_REVIEWED` | Privacy policy date and review flag |
| `VITE_HOSTING_PROVIDER` | Hosting provider named in the privacy policy |

The studio identity (name, founder, email, location, SEO text) lives in `src/config/identity.ts` and `src/config/site.ts`, not in environment variables.

### Domain

**No custom domain has been chosen.** The site currently uses the GitHub Pages address (`https://michaelli8899.github.io/business-website/`), provided by the workflow. When a domain is chosen:

- [ ] Add it under **Settings → Pages → Custom domain** and configure DNS. The workflow then picks up the new base URL and base path automatically.
- [ ] Remove `VITE_NOINDEX` from the workflow when ready to be indexed.
- [ ] Verify the domain in Resend and update `CONTACT_FROM_EMAIL` and `ALLOWED_ORIGINS` on the contact function.

---

## Contact form delivery

GitHub Pages only serves static files, and a browser app must never hold an email API key. So inquiries go to a **separate small backend**: `server/contact-handler.ts`.

- **Not connected (current state):** `VITE_CONTACT_ENDPOINT` is empty. The contact page says online inquiries aren't connected yet. Submitting validates the form and then offers a pre-filled email to `michaelmlidesign@gmail.com`. **Nothing is sent and success is never simulated.**
- **Connected:** the form POSTs JSON to `VITE_CONTACT_ENDPOINT`. Success is shown only when the backend returns `{ "ok": true }`. Errors, including the backend's own "not configured" response, show a message with the email fallback.

### The Resend backend (`server/contact-handler.ts`)

A portable Web-standard handler that exports `POST` and `OPTIONS` functions (`Request → Response`). It runs on Node serverless platforms such as Vercel Functions and Netlify Functions, with no framework required. For example, on Vercel, create `api/contact.ts` containing:

```ts
export { POST, OPTIONS } from "../server/contact-handler";
```

On each request, the handler:

- allows only origins listed in `ALLOWED_ORIGINS` (CORS)
- requires a JSON content type
- limits the body to 16 KB
- rate-limits each SHA-256-hashed IP to 5 submissions per 10 minutes (Upstash Redis if configured, otherwise in-memory)
- checks the honeypot field and that the form wasn't filled implausibly fast or slowly
- validates every field with the same schema as the form

The notification email (`server/deliver.ts`) includes the name, email, company, service interests, description, timeline and submission timestamp. **Reply-To** is the visitor's address. **From** is always your verified sender. User content is HTML-escaped. Logs are structured JSON with no personal data.

**Function environment variables** (set on the function host, never in the website build):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Recipient(s). Defaults to `michaelmlidesign@gmail.com`. |
| `CONTACT_FROM_EMAIL` | Sender on a domain verified in Resend. Required in production. |
| `CONTACT_ALLOW_TEST_SENDER` | `true` allows Resend's `onboarding@resend.dev` (testing only; it delivers only to the Resend account owner's address) |
| `ALLOWED_ORIGINS` | Site origin(s), e.g. `https://michaelli8899.github.io` |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Shared rate limiter (recommended on serverless) |

**To connect the form:**

1. Deploy the function and set the variables above.
2. Set the repository variable `VITE_CONTACT_ENDPOINT` to its URL.
3. Re-run the Pages workflow.
4. Send a test inquiry.

If you use a different form service instead, it must accept JSON and return `{ "ok": true }`. Name that service in the privacy policy.

---

## Security

| Area | Implementation |
| --- | --- |
| Secrets | None in the website. Only public `VITE_*` values are compiled in. The Resend key lives only on the function host. |
| Validation | Shared schema in the browser and on the server. Allow-listed options, length limits, control characters stripped from single-line fields. |
| Spam and abuse | Honeypot field, fill-time window, rate limiting with hashed IPs, CORS origin allow-list, body size limit |
| Output | HTML-escaped email content; sanitised subject line |
| Monitoring | The function logs structured JSON (`server/log.ts`) for delivery, spam, rate-limit and origin events. Forward `logError()` to Sentry or similar if wanted. |

On serverless hosts the in-memory rate limiter is per instance, so configure Upstash and/or a platform firewall rule for the function.

---

## Editing content

All copy lives in plain TypeScript files, so no CMS is needed.

| To change… | Edit |
| --- | --- |
| Studio name, email, location | `src/config/identity.ts` |
| Founder bio, SEO title and description, tagline | `src/config/site.ts` |
| Service cards, capability lists, AI principles | `src/data/services.ts` |
| Process steps (homepage, websites, AI) | `src/data/process.ts` |
| Managed vs self-managed options | `src/data/maintenance.ts` |
| FAQs | `src/data/faqs.ts` |
| About page principles and "what to expect" | `src/data/about.ts` |
| Navigation and footer links | `src/data/navigation.ts` |
| Contact form options | `src/lib/contact/schema.ts` |
| Page titles and descriptions | The `<Seo>` element at the top of each file in `src/pages/` |

### Adding a portfolio project

Add an entry to `projects` in `src/data/projects.ts`. Its page at `/work/<slug>` is created and prerendered automatically. It also appears in the grid, the filters, the sitemap and the related-projects lists.

- `isConcept: true` adds the **Concept Project** label and frames outcomes as *intended*. Use `false` only for real client work.
- `visual` picks an illustrated mockup. To use a real screenshot, add `image: { src: "/work/my-project.jpg", alt: "…" }` and put the file in `public/work/`.
- `caseStudy.measuredResults` should only contain genuinely measured results from client work.

### Updating branding

- **Identity:** `src/config/identity.ts` and `src/config/site.ts`
- **Logo, icons and social image:** the wordmark **frame&flow.** and the monogram **f&f.** are Geist SemiBold converted to SVG paths. To regenerate all assets:
  ```bash
  npm i --no-save opentype.js@1.3.4 geist@1.9.2
  node scripts/generate-brand.cjs
  ```
  This writes `src/components/layout/brand-glyphs.ts`, `public/brand/*`, `public/icon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png` and `public/og.png`. Raster output needs Playwright with Chromium; pass `--svg-only` to skip it.
- **Colours and type:** the `@theme` tokens in `src/styles/globals.css`. Keep secondary text at 4.5:1 contrast or better.

---

## Launch checklist

- [ ] Deploy the contact function and set `VITE_CONTACT_ENDPOINT`. Verify a Resend sender domain, then send a test inquiry.
- [ ] **Owner/legal review of the privacy policy**, then set `VITE_PRIVACY_LAST_UPDATED` and `VITE_PRIVACY_REVIEWED=true`
- [ ] Choose a domain, if any (see *Domain*), and remove `VITE_NOINDEX` when ready to be indexed
- [ ] Add verified social profile URLs, if any
- [ ] Update the privacy policy before adding analytics, cookies or new third-party services

---

## Accessibility & performance notes

- Skip link, semantic landmarks, one `h1` per page, labelled navigation regions
- On client-side navigation, the page scrolls to the top (or to the `#hash` target), focus moves to the main content, and the document title and metadata update.
- The services dropdown supports click, hover, arrow keys and Escape. The mobile menu locks scrolling, closes on Escape and moves focus into the menu.
- FAQs use native `<details>`.
- The form labels every field, links errors through `aria-describedby`, focuses the first invalid field, and announces status changes.
- Every page is prerendered, so content and metadata are present before JavaScript loads. Scroll-reveal motion is progressive enhancement and stops under `prefers-reduced-motion`.
- Illustrations are inline SVG/HTML, so there are no image downloads and no layout shift. Fonts are self-hosted.

## Routine maintenance

- **Monthly:** `npm outdated` and `npm audit`. Apply updates, then `npm run check`.
- **After content edits:** `npm run check` before pushing.
- **Quarterly:** send a test inquiry, check that social links work, and review the privacy policy date.
- **When adding integrations:** list any new data processors in the privacy policy.
