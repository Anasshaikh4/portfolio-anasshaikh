# Anas Sheikh — Portfolio

A personal portfolio for **Muhammad Anas Sheikh**, AI Software Engineer.
Dark, editorial design built to showcase real-time Computer Vision, MLOps,
NLP and Agentic work — hostable for free on GitHub Pages.

Built with **React + TypeScript + Vite**, **Tailwind CSS v4**,
**Framer Motion** (animation) and **Lenis** (smooth scroll).

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build into /dist
npm run preview  # preview the production build locally
```

---

## ✍️ Adding / editing a project (no coding)

The Projects section is **fully data-driven**. Every `.json` file in
[`content/projects/`](content/projects/) becomes a project card automatically.

1. Copy [`content/projects/_TEMPLATE.json`](content/projects/_TEMPLATE.json)
   and rename it to your project's slug, e.g. `pose-estimation.json`.
2. Fill in the fields — see
   [`content/projects/_SCHEMA.md`](content/projects/_SCHEMA.md) for what each
   one means.
3. *(Optional)* Drop screenshots / GIFs into [`public/media/`](public/media/)
   and list their filenames in the project's `media` array.
4. Commit & push. The new project appears, sorted and filterable. **No code
   changes needed.**

Files starting with `_` (the template & schema) are ignored by the site.

## Editing every other section (no code)

All site content is JSON in [`content/`](content/) — you never edit `.tsx`
files. Full guide: [`content/_SCHEMA.md`](content/_SCHEMA.md).

- **Profile & contact** (incl. WhatsApp): [`content/profile.json`](content/profile.json)
- **About** (headline, paragraphs, stats): [`content/about.json`](content/about.json)
- **Education**: [`content/education.json`](content/education.json)
- **Work experience** — one file per role in [`content/experience/`](content/experience/) (copy `_TEMPLATE.json`)
- **Skills** — one file per group in [`content/skills/`](content/skills/)
- **Certifications** — one file per cert in [`content/certifications/`](content/certifications/)
- **Projects** — one file per project in [`content/projects/`](content/projects/)

To swap the portrait, replace `public/anas-portrait.jpeg` (keep the name) or
update `portrait` in `content/profile.json`. Same for the résumé PDF
(`public/Anas-Sheikh-Resume.pdf` ↔ `resume`).

---

## 🚀 Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that builds
and deploys automatically.

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source** →
   select **GitHub Actions**.
3. Push to `main`. The site builds and goes live at
   `https://<your-username>.github.io/<repo-name>/`.

The workflow sets the correct base path automatically:

- **Project page** (any repo name) → served from `/<repo-name>/`.
- **User page** (repo named `<your-username>.github.io`) → served from `/`.

### Manual deploy (alternative)

You can also publish from your machine:

```bash
# project page — replace with your repo name:
VITE_BASE="/your-repo-name/" npm run build
npm run deploy   # pushes /dist to the gh-pages branch (uses the gh-pages package)
```

On Windows PowerShell, set the env var first:

```powershell
$env:VITE_BASE="/your-repo-name/"; npm run build; npm run deploy
```

---

## 🔄 Updating the live site (after adding a project, etc.)

Your repo is **`portfolio-anasshaikh`** and **automatic deploy is ON** (GitHub
Actions). So updating the live site is just a normal `git push`:

```powershell
# 1. make your content change, e.g. add content/projects/new-thing.json

# 2. commit and push — that's it
git add .
git commit -m "Add new project: New Thing"
git push
```

On every push to `main`, the
[workflow](.github/workflows/deploy.yml) builds the site and deploys it to
GitHub Pages automatically (with the correct base path). It goes live within a
minute or two. You can watch progress in the repo's **Actions** tab.

> No local build needed — GitHub builds it for you. You only run `npm run build`
> locally if you want to **preview** before pushing.

### Manual deploy (fallback)

If you ever want to publish without Actions, you can push the built site to a
`gh-pages` branch directly:

```powershell
$env:VITE_BASE="/portfolio-anasshaikh/"; npm run build; npm run deploy
```

(You'd then set **Settings → Pages → Source → Deploy from a branch → `gh-pages`**.
Not needed while Actions deploy is on.)

---

## Project structure

```
content/               ← ALL editable content (see content/_SCHEMA.md)
  profile.json         ← identity + contact (email, WhatsApp, socials)
  about.json           ← about headline, paragraphs, stats
  education.json
  experience/*.json    ← one file per role
  skills/*.json        ← one file per skill group
  certifications/*.json
  projects/*.json      ← one file per project (+ _TEMPLATE, _SCHEMA)
public/                ← portrait, résumé PDF, favicon, /media for screenshots
src/
  lib/content.ts       ← loads the JSON above (don't edit for content changes)
  lib/projects.ts      ← auto-discovers the project JSON files
  lib/domains.ts       ← domain labels + colors
  components/          ← Nav, Hero, About, Projects, Skills, Experience, …
  types.ts             ← content type definitions
```
