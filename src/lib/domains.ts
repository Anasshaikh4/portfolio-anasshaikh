import type { Domain } from "../types";

/**
 * Visual identity per domain. Adding a new domain? Add it to the `Domain`
 * union in types.ts and give it an entry here.
 *
 * `tag` colors are applied inline as rgb so we can tune opacity for the
 * chip background vs. its text/border.
 */
export const DOMAIN_META: Record<Domain, { label: string; rgb: string }> = {
  "Computer Vision": { label: "Computer Vision", rgb: "201 161 74" }, // gold
  "Edge AI": { label: "Edge AI", rgb: "224 122 95" }, // terracotta
  MLOps: { label: "MLOps", rgb: "138 160 138" }, // sage
  NLP: { label: "NLP", rgb: "143 154 196" }, // periwinkle
  Agentic: { label: "Agentic", rgb: "176 140 196" }, // mauve
  Automation: { label: "Automation", rgb: "120 168 168" }, // teal
};

export const DOMAIN_ORDER: Domain[] = [
  "Computer Vision",
  "Edge AI",
  "MLOps",
  "NLP",
  "Agentic",
  "Automation",
];
