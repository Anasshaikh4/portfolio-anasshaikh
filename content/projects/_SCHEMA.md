# How to add a new project

The portfolio's Projects section is **fully data-driven**. Every `.json` file in
this folder (`/content/projects/`) becomes a project card automatically — you
never touch any code.

## Steps

1. **Copy** `_TEMPLATE.json` and rename it to your project's slug, e.g.
   `pose-estimation.json`.
2. **Fill in the fields** (see the table below).
3. *(Optional)* Drop screenshots / GIFs into `/public/media/` and list their
   filenames in `media`.
4. **Rebuild & deploy**: `npm run build` then push (see the root `README.md`).
   The new project appears, correctly sorted and filterable.

> Files whose names start with an underscore (`_TEMPLATE.json`, this file) are
> **ignored** by the site. Keep that convention for anything that isn't a real
> project.

## Field reference

| Field          | Required | What it is |
|----------------|----------|------------|
| `title`        | ✅       | Display name of the project. |
| `slug`         | ✅       | URL-safe id, **must be unique**. Lowercase-with-dashes. Match the filename. |
| `domain`       | ✅       | One of: `Computer Vision`, `MLOps`, `NLP`, `Agentic`, `Edge AI`, `Automation`. Drives the filter + tag color. |
| `date`         | ✅       | `YYYY-MM`. Used to sort projects (newest first). |
| `featured`     | ❌       | `true` lifts it into the highlighted top row. Keep this to ~3–4 projects. |
| `oneLiner`     | ✅       | One sentence shown on the card. Make it punchy. |
| `objective`    | ✅       | 1–3 sentences: what the project set out to do. Shown in the detail view. |
| `stack`        | ✅       | Array of technologies. Shown as chips. |
| `achievements` | ✅       | Array of outcome bullets. Lead each with a verb; numbers help. |
| `links`        | ❌       | `{ "github": "", "demo": "", "video": "", "linkedin": "" }`. Blank values are hidden automatically. `linkedin` = the URL of your LinkedIn post for this project. |
| `media`        | ❌       | Array of filenames in `/public/media/`. Supports images (`.png`, `.jpg`, `.gif`) **and** video clips (`.mp4`, `.webm`, `.mov`) — videos render with a player. Blank = no gallery. |

### Recommended media workflow

You post demos on LinkedIn. For each project:

1. Save a **screenshot or short clip** of the demo into `/public/media/`
   (e.g. `weapons-detection.mp4` or `weapons-1.png`) and add it to `media`.
   This gives a fast, on-brand inline preview inside the project modal.
2. Put the **LinkedIn post URL** in `links.linkedin`. A "View on LinkedIn"
   button appears automatically, sending visitors to the full post.

This keeps the site elegant and fast while still driving traffic to LinkedIn.

### Adding a brand-new domain

If you want a domain that isn't in the list above:

1. Add it to the `Domain` union in `src/types.ts`.
2. Add a color for it in `src/lib/domains.ts`.

That's the only time code needs to change.
