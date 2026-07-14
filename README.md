# Tang Software LLC — Company Website

A real, production-ready marketing website for **Tang Software LLC**, an independent game
studio. Built as a fast, dependency-free **static site** so it can be hosted anywhere with
free, automatic HTTPS.

Games featured:

- **Bubble Merge - Classic** — a calm merge puzzler (marked *Out now*)
- **Apartment 520** — an atmospheric narrative mystery (marked *Launching soon*, with a
  launch-notify form)

---

## What's included

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Company homepage, branding, games preview, studio story |
| Games | `games.html` | Overview of all games |
| Bubble Merge - Classic | `bubblemerge.html` | Marketing page: features, screenshots, how-to-play, FAQ, download |
| Apartment 520 | `apartment-520.html` | Marketing page: premise, features, screenshots, roadmap, notify form |
| Support | `support.html` | Per-game help + FAQs, privacy/data help |
| Contact | `contact.html` | Contact form (mailto) + direct contact info |
| Privacy Policy | `privacy.html` | Full, plain-English privacy policy (App Store requirement) |
| Terms of Use | `terms.html` | Full terms of use |
| 404 | `404.html` | Friendly not-found page |

Supporting files: `css/styles.css`, `js/main.js`, `assets/*.svg` (logo, icons, screenshots,
social share image), `robots.txt`, `sitemap.xml`.

### Requirement checklist

- [x] Real multi-page company homepage (not a one-page placeholder)
- [x] Branding consistent across the site: company name, game names, logo/icons, screenshots, art direction
- [x] Clear navigation to Game/marketing pages, Support, Privacy Policy, Terms, Contact
- [x] Mobile-first responsive layout (single-column → multi-column at breakpoints)
- [x] Loads publicly with no login
- [x] No "coming soon" voids, lorem ipsum, broken buttons, dead links, or empty sections
- [x] HTTPS — guaranteed by every recommended host below
- [x] Accessibility: skip link, focus styles, semantic landmarks, ARIA labels, alt text, reduced-motion support
- [x] SEO: per-page titles/descriptions, Open Graph, JSON-LD structured data, sitemap & robots

---

## Run locally

It's plain HTML/CSS/JS — just open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

```bash
# Node (if you have it)
npx serve .
```

---

## Deploy with HTTPS

The site is static, so HTTPS is free and automatic on all of these. Pick one.

### Option A — Netlify or Cloudflare Pages (drag-and-drop, easiest)
1. Create a free account.
2. Drag this whole folder into the Netlify "Sites" page (or connect a Git repo).
3. Done — you get a `https://<name>.netlify.app` URL with HTTPS already on.
4. Add your custom domain (`tangsoftware.com`) in **Domain settings**; a TLS certificate is
   issued automatically (Let's Encrypt). No build command or publish directory needed — it's
   a static root.

### Option B — GitHub Pages
1. Push these files to a GitHub repo (e.g. `tang-software-site`).
2. Repo **Settings → Pages →** Source: deploy from branch, `main`, `/ (root)`.
3. Your site goes live at `https://<user>.github.io/<repo>/` with HTTPS.
4. For a custom domain, add it under **Pages → Custom domain** and check **Enforce HTTPS**.
   (Add a `CNAME` file containing your domain if you want it tracked in the repo.)

### Option C — AWS S3 + CloudFront (custom infra)
1. Create an S3 bucket (e.g. `tangsoftware-site`). Upload all files, preserving folders.
2. **Keep "Block all public access" ON.** Do *not* make the bucket public — serve it
   privately through CloudFront with Origin Access Control (OAC). This is the secure pattern.
3. Request a certificate for `tangsoftware.com` / `www.tangsoftware.com` in **AWS Certificate
   Manager (ACM) in us-east-1**.
4. Create a CloudFront distribution with the S3 bucket as origin (via OAC), attach the ACM
   certificate, set **Viewer protocol policy: Redirect HTTP to HTTPS**, and set the default
   root object to `index.html`.
5. Add a custom error response: HTTP 403/404 → `/404.html` (or `/index.html`) as needed.
6. Point your DNS (Route 53 or your registrar) at the CloudFront distribution.

> Security note: the S3+CloudFront path intentionally keeps the bucket **private** with
> Block Public Access enabled and serves content only through CloudFront. Avoid the older
> "public bucket website endpoint" approach — it can't do HTTPS on a custom domain and
> exposes the bucket directly.

---

## Customizing

- **Contact / support email** is `support@tangsoftware.net` throughout. To change it,
  find-and-replace that string across the `.html` files and update the `data-mailto`
  attributes on the two forms.
- **App Store links**: the Bubble Merge - Classic "Download on the App Store" button points to a
  placeholder (`https://apps.apple.com/`). Replace it with your real listing URL once the app
  is approved (search for `apps.apple.com` in `bubblemerge.html`).
- **Domain**: canonical URLs, Open Graph URLs, and the sitemap use
  `https://www.tangsoftware.com/`. Update these if your domain differs.
- **Forms**: the contact and notify forms work without a backend by opening the visitor's
  email client with a pre-filled message (no server, no tracking). To capture submissions
  server-side instead, point the `<form>` at a form provider (Netlify Forms, Formspree, etc.)
  and remove the `data-mailto` handling in `js/main.js`.
- **Colors & fonts** live as CSS variables at the top of `css/styles.css`.

---

## Design notes

Aesthetic direction: **"Swiss Editorial"** — International Typographic Style. One grotesque
typeface (Archivo) used at a dramatic scale, paired with a monospace (Spline Sans Mono) for
technical labels, section numbers, and metadata. A strict 12-column grid is made *visible*
through hairline rules; sections are numbered (№ 00, № 01…); games are presented as an
inverting numbered index rather than cards. Near-monochrome warm-paper-and-ink palette with a
single Swiss-red accent (`--accent`). No drop shadows, no rounded corners, no decorative icons
— personality comes entirely from typography, asymmetry, and the red accent. All game art is
original SVG, so it stays crisp at any size and adds almost nothing to page weight.

To tune the look, the key CSS variables at the top of `css/styles.css` are `--paper`, `--ink`,
and `--accent` (change the red to re-skin the whole site), plus the `--grotesque` / `--mono`
font stacks.
