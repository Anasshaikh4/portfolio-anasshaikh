/**
 * ============================================================
 * CONTENT TYPES
 * Every section of the site is driven by JSON in /content.
 * - Singletons  -> one file   (profile.json, about.json, …)
 * - Collections -> one file per item in a folder (experience/, skills/, …)
 * See /content/_SCHEMA.md for how to edit each part.
 * ============================================================
 */

export type Domain =
  | "Computer Vision"
  | "MLOps"
  | "NLP"
  | "Agentic"
  | "Edge AI"
  | "Automation";

export interface ProjectLinks {
  github?: string;
  demo?: string;
  video?: string;
  /** Link to the LinkedIn post where you showcased this project. */
  linkedin?: string;
}

export interface Project {
  title: string;
  slug: string;
  domain: Domain;
  /** "YYYY-MM" — used for sorting (newest first). */
  date: string;
  featured?: boolean;
  oneLiner: string;
  objective: string;
  stack: string[];
  achievements: string[];
  links?: ProjectLinks;
  /** Filenames in /public/media — images or video clips. */
  media?: string[];
}

/** profile.json — your identity + contact details. */
export interface Profile {
  name: string;
  shortName: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  /** Phone in international format, e.g. "+923351253576". */
  phone: string;
  /** WhatsApp number in international format. A wa.me link is built from it. */
  whatsapp: string;
  /** Résumé PDF filename in /public. */
  resume: string;
  /** Portrait image filename in /public. */
  portrait: string;
  socials: {
    github: string;
    linkedin: string;
  };
}

/** about.json — the About section copy. */
export interface AboutContent {
  /** Big pull-quote at the top of About. */
  headline: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
}

/** experience/*.json — one file per role. */
export interface ExperienceEntry {
  company: string;
  context?: string;
  role: string;
  /** Human-readable display range, e.g. "Jul 2024 — Present". */
  period: string;
  /** "YYYY-MM" — used only to sort entries (newest first). */
  start: string;
  bullets: string[];
}

/** education.json — single education entry. */
export interface Education {
  school: string;
  degree: string;
  detail: string;
  period: string;
}

/** skills/*.json — one file per skill group. */
export interface SkillGroup {
  label: string;
  items: string[];
  /** Lower numbers appear first. */
  order: number;
}

/** certifications/*.json — one file per certification. */
export interface Certification {
  title: string;
  issuer: string;
  url: string;
  /** Lower numbers appear first. */
  order: number;
}

