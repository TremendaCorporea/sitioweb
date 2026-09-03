# tremendacorporea.net

A plain static website (HTML + CSS + a few lines of JS). No build step, no
framework, no database — the same approach as rlfbckr.io.

## Structure

```
index.html                     home: statement + performances grid
about.html                     about us + members
contact.html                   contact
performances/
  lithium-love-stories.html
  bodies-of-resonance.html
  paradoxical-myth.html
assets/
  css/style.css                all the styling (edit colours/type at the top)
  js/main.js                    mobile menu + image fade-in
  img/                          put photos here (see assets/img/README.md)
CNAME                           custom domain for GitHub Pages
.nojekyll                       tell GitHub Pages not to run Jekyll
404.html                       shown for unknown URLs
robots.txt
```

To add a performance: copy a file in `performances/`, edit the text, then add a
card `<a class="card" …>` to the grid in `index.html`.

## Preview locally

```bash
cd tremenda-corporea
python3 -m http.server 8000
```

Open http://localhost:8000 — image boxes are grey until you add the photos.

## Deploy — GitHub Pages (this is what rlfbckr.io uses)

rlfbckr.io is not on a private server. It is served by **GitHub Pages**, a free
static-hosting service from GitHub. Anyone can use it. Steps:

1. Create a free account at github.com (use a shared collective login).
2. New repository, name it `tremendacorporea` (public). Don't add a README.
3. Upload this whole folder:
   ```bash
   cd tremenda-corporea
   git init
   git add .
   git commit -m "First version of the site"
   git branch -M main
   git remote add origin https://github.com/<user>/tremendacorporea.git
   git push -u origin main
   ```
   (Or use github.com's "upload files" button and drag the folder in.)
4. Repo → **Settings → Pages** → Source: "Deploy from a branch" → branch `main`,
   folder `/ (root)` → Save. In ~1 minute the site is live at
   `https://<user>.github.io/tremendacorporea/`.
5. Custom domain: in the same Settings → Pages screen, set "Custom domain" to
   `tremendacorporea.net`. The `CNAME` file in this repo already contains it.
6. Point the domain at GitHub (DNS — see below). Once it resolves, tick
   "Enforce HTTPS".

Every `git push` after that redeploys automatically.

## Moving the domain off Cargo

`tremendacorporea.net` is currently registered through Cargo (registrar eNom)
and its DNS is run by Cargo's nameservers (`ns1.cargo.site` / `ns2.cargo.site`).
Two options:

**A. Keep the domain at Cargo, just change DNS.** In Cargo's domain settings,
switch from Cargo's nameservers to a DNS host you control (Cloudflare is free),
then add these records:

| Type  | Name                | Value                       |
|-------|---------------------|-----------------------------|
| A     | @                   | 185.199.108.153             |
| A     | @                   | 185.199.109.153             |
| A     | @                   | 185.199.110.153             |
| A     | @                   | 185.199.111.153             |
| CNAME | www                 | `<user>.github.io`          |

(These four IPs are GitHub Pages' — the same ones rlfbckr.io resolves to.)

**B. Transfer the domain to another registrar** (Cloudflare, Namecheap,
Porkbun…) and set the records above there. Cleaner long-term, takes ~5 days and
needs an auth/EPP code from Cargo.

Either way: once DNS is pointed and propagated, cancel the Cargo subscription.
Nothing else depends on it.

## Notes / TODO

- Add real photos in `assets/img/` (filenames listed in `assets/img/README.md`).
- Replace the contact email in `contact.html` with the real one.
- Add real documentation links in the performance pages (search for `TODO`).
- Optional: add a `sitemap.xml`, a favicon, and analytics if you want them.
