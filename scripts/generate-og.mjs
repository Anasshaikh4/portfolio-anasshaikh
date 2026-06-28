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

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="18%" cy="14%" r="62%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.22" />
      <stop offset="55%" stop-color="${GOLD}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow2" cx="92%" cy="100%" r="55%">
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
  <text x="92" y="132" font-family="Fraunces, Georgia, 'Times New Roman', serif"
        font-size="42" font-weight="600" fill="${BONE}">Anas<tspan fill="${GOLD}">.</tspan></text>

  <!-- gold accent rule -->
  <rect x="92" y="296" width="64" height="3" rx="1.5" fill="${GOLD}" />

  <!-- eyebrow -->
  <text x="92" y="346" font-family="Inter, Arial, sans-serif" font-size="25"
        font-weight="600" letter-spacing="4" fill="${GOLD}">AI SOFTWARE ENGINEER · KARACHI</text>

  <!-- name -->
  <text x="90" y="446" font-family="Fraunces, Georgia, 'Times New Roman', serif"
        font-size="82" font-weight="600" fill="url(#nameFill)">Muhammad Anas Sheikh</text>

  <!-- tagline -->
  <text x="92" y="512" font-family="Inter, Arial, sans-serif" font-size="30"
        font-weight="400" fill="${BONE_DIM}">Real-time Computer Vision · MLOps · Agentic AI</text>

  <!-- footer wordmark -->
  <text x="92" y="566" font-family="Inter, Arial, sans-serif" font-size="22"
        font-weight="500" letter-spacing="1" fill="${BONE_FAINT}">anasshaikh4.github.io/portfolio-anasshaikh</text>
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
