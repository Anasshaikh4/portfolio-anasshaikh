import type { Project } from "../types";

/**
 * Auto-discovers every project JSON in /content/projects at build time.
 * Drop a new <slug>.json into that folder and it shows up here — no code
 * change needed. Files starting with "_" (template, schema) are excluded.
 */
const modules = import.meta.glob("../../content/projects/*.json", {
  eager: true,
}) as Record<string, { default: Project } | Project>;

function normalize(mod: { default: Project } | Project): Project {
  return "default" in mod ? mod.default : mod;
}

export const PROJECTS: Project[] = Object.entries(modules)
  .filter(([path]) => {
    const file = path.split("/").pop() ?? "";
    return !file.startsWith("_");
  })
  .map(([, mod]) => normalize(mod))
  // newest first by "YYYY-MM"
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
