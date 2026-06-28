// Generates public/og-image.png (1200x630) — the social-share card.
// Run:  npm run og
//
// Typographic, on-brand with the site's "Warm Editorial Dark" theme.
// For pixel-accurate fonts, drop Fraunces + Inter .ttf files into scripts/fonts/
// (any static weights). Otherwise it falls back to system serif/sans, which still
// looks clean at unfurl-thumbnail size.

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 1200;
const H = 630;

// theme palette (mirrors src/index.css)
const INK = "#0b0a09";
const BONE = "#ede7dd";
const BONE_DIM = "#b3aa9c";
const BONE_FAINT = "#7c756a";
const GOLD = "#c9a14a";

// Centered, "square-safe" composition: chat apps (WhatsApp) crop the center
// square out of the 1200x630, so all key text stays inside the middle column.
const CX = W / 2;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="8%" r="70%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.20" />
      <stop offset="55%" stop-color="${GOLD}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="50%" cy="108%" r="60%">
      <stop offset="0%" stop-color="#e07a5f" stop-opacity="0.10" />
      <stop offset="100%" stop-color="#e07a5f" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="nameFill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BONE}" />
      <stop offset="100%" stop-color="#cfc6b8" />
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}" />
  <rect width="${W}" height="${H}" fill="url(#glow)" />
  <rect width="${W}" height="${H}" fill="url(#glow2)" />

  <!-- editorial inset frame -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="18"
        fill="none" stroke="${BONE}" stroke-opacity="0.08" stroke-width="1" />

  <!-- brand mark -->
  <text x="${CX}" y="150" text-anchor="middle"
        font-family="Fraunces, Georgia, 'Times New Roman', serif"
        font-size="38" font-weight="600" fill="${BONE}">Anas<tspan fill="${GOLD}">.</tspan></text>

  <!-- eyebrow -->
  <text x="${CX}" y="232" text-anchor="middle" font-family="Inter, Arial, sans-serif"
        font-size="23" font-weight="600" letter-spacing="5" fill="${GOLD}">AI SOFTWARE ENGINEER</text>

  <!-- gold accent rule -->
  <rect x="${CX - 28}" y="256" width="56" height="3" rx="1.5" fill="${GOLD}" />

  <!-- name (two lines, fits the center square) -->
  <text x="${CX}" y="356" text-anchor="middle"
        font-family="Fraunces, Georgia, 'Times New Roman', serif"
        font-size="78" font-weight="600" fill="url(#nameFill)">Muhammad</text>
  <text x="${CX}" y="440" text-anchor="middle"
        font-family="Fraunces, Georgia, 'Times New Roman', serif"
        font-size="78" font-weight="600" fill="url(#nameFill)">Anas Sheikh</text>

  <!-- tagline -->
  <text x="${CX}" y="506" text-anchor="middle" font-family="Inter, Arial, sans-serif"
        font-size="27" font-weight="400" fill="${BONE_DIM}">Computer Vision · MLOps · Agentic AI</text>

  <!-- footer wordmark -->
  <text x="${CX}" y="566" text-anchor="middle" font-family="Inter, Arial, sans-serif"
        font-size="20" font-weight="500" letter-spacing="1" fill="${BONE_FAINT}">anasshaikh4.github.io</text>
</svg>`;

// optional vendored fonts
const fontsDir = join(__dirname, "fonts");
let fontFiles = [];
if (existsSync(fontsDir)) {
  fontFiles = readdirSync(fontsDir)
    .filter((f) => /\.(ttf|otf)$/i.test(f))
    .map((f) => join(fontsDir, f));
}

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: {
    loadSystemFonts: true,
    fontFiles,
    defaultFontFamily: "Georgia",
  },
});

const png = resvg.render().asPng();
const out = join(root, "public", "og-image.png");
writeFileSync(out, png);

const { width, height } = resvg.render();
console.log(
  `og-image.png written → ${out}\nsize: ${png.length} bytes` +
    (fontFiles.length ? `\nfonts: ${fontFiles.map((f) => f.split(/[\\/]/).pop()).join(", ")}` : "\nfonts: system fallback (no scripts/fonts/*.ttf)"),
);
