# Editing your portfolio content

**You never need to touch any code (`.tsx`) to update content.** Everything the
site shows lives in this `content/` folder as JSON. Edit a file, rebuild
(`npm run build`) and push — the site updates.

There are two kinds of content:

- **Singletons** — one file for a section that has a single value
  (your profile, the about text, education, the automation story).
- **Collections** — a folder where **each item is its own file**
  (projects, experience, skills, certifications). Add a file = add an item.
  Delete a file = remove it. Files starting with `_` (templates) are ignored.

---

## 🗂 Collections — add a new item by adding a file

### ➕ Add a work experience
1. Copy [`experience/_TEMPLATE.json`](experience/_TEMPLATE.json) to a new file,
   e.g. `experience/04-new-company.json`.
2. Fill it in:
   | Field | Meaning |
   |-------|---------|
   | `company` | Company name |
   | `context` | Optional sub-label (client, "Remote") — delete the line if unused |
   | `role` | Your title |
   | `period` | Display text, e.g. `"Jan 2026 — Present"` |
   | `start` | `"YYYY-MM"` — **only used to sort** (newest first) |
   | `bullets` | Array of what you did |
3. Rebuild & push. It slots into the timeline automatically by `start`.

   > The number prefix (`04-`) is just for tidy file ordering on disk — the
   > site sorts by `start`, not the filename.

### ➕ Add a project
See [`projects/_SCHEMA.md`](projects/_SCHEMA.md) (copy `projects/_TEMPLATE.json`).

### ➕ Add a skill group
Copy [`skills/_TEMPLATE.json`](skills/_TEMPLATE.json) → `skills/06-cloud.json`.
Fields: `label`, `items` (array), `order` (lower = shown first).

### ➕ Add a certification
Copy [`certifications/_TEMPLATE.json`](certifications/_TEMPLATE.json) →
`certifications/05.json`. Fields: `title`, `issuer`, `url`, `order`.

---

## 📄 Singletons — edit the one file

### `profile.json` — your identity & contact
Name, role, tagline, location, email, **phone**, **whatsapp**, plus the file
names of your résumé/portrait in `/public`, and your GitHub/LinkedIn URLs.

- `whatsapp` can be in any format (`"+92 335 1253576"`); the site strips it to
  build the `wa.me` link, and shows the number as you typed it.
- The Contact section's Email / WhatsApp / GitHub / LinkedIn cards are all
  generated from this file.

### `about.json` — the About section
- `headline` — the big pull-quote. Wrap any part in `*asterisks*` to render it
  in the **gold gradient**, e.g. `"… *I ship them* …"`.
- `paragraphs` — array of body paragraphs.
- `stats` — the three highlighted numbers (`value` + `label`).

### `education.json`
`school`, `degree`, `detail` (e.g. GPA), `period`.

---

## Tips
- JSON is picky: use straight quotes `"`, commas between items, no trailing
  comma after the last one. If the build fails, it's almost always a missing
  comma or quote.
- To **reorder** experience, change `start`; for skills/certs, change `order`.
- To **remove** an item, delete its file.
- Run `npm run build` locally first to catch typos before pushing.
