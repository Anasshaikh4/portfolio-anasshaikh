/**
 * Loads all site content from /content. You edit the JSON files there —
 * never this file — to update the site. See /content/_SCHEMA.md.
 *
 *   Singletons  -> imported directly  (profile.json, about.json, …)
 *   Collections -> auto-discovered    (experience/, skills/, certifications/)
 */
import type {
  Profile,
  AboutContent,
  Education,
  ExperienceEntry,
  SkillGroup,
  Certification,
} from "../types";

import profileJson from "../../content/profile.json";
import aboutJson from "../../content/about.json";
import educationJson from "../../content/education.json";

// ---- singletons ----
export const PROFILE = profileJson as Profile;
export const ABOUT = aboutJson as AboutContent;
export const EDUCATION = educationJson as Education;

// Convenience re-exports so section components stay simple.
export const ABOUT_PARAGRAPHS = ABOUT.paragraphs;
export const STATS = ABOUT.stats;

/** Build a wa.me link from a phone number in any format. */
export const whatsappLink = (number: string) =>
  `https://wa.me/${number.replace(/[^\d]/g, "")}`;

// ---- collections: auto-discover every JSON in the folder ----
function loadCollection<T>(
  modules: Record<string, unknown>,
  sort: (a: T, b: T) => number,
): T[] {
  return Object.entries(modules)
    .filter(([path]) => {
      const file = path.split("/").pop() ?? "";
      return !file.startsWith("_"); // ignore _TEMPLATE / _SCHEMA helpers
    })
    .map(([, mod]) => {
      const m = mod as { default: T } | T;
      return (m && typeof m === "object" && "default" in m
        ? (m as { default: T }).default
        : m) as T;
    })
    .sort(sort);
}

export const EXPERIENCE = loadCollection<ExperienceEntry>(
  import.meta.glob("../../content/experience/*.json", { eager: true }),
  (a, b) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0), // newest first
);

export const SKILL_GROUPS = loadCollection<SkillGroup>(
  import.meta.glob("../../content/skills/*.json", { eager: true }),
  (a, b) => a.order - b.order,
);

export const CERTIFICATIONS = loadCollection<Certification>(
  import.meta.glob("../../content/certifications/*.json", { eager: true }),
  (a, b) => a.order - b.order,
);
