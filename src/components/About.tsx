import { motion } from "framer-motion";
import { Reveal } from "./primitives";
import { PROFILE, ABOUT, ABOUT_PARAGRAPHS, STATS } from "../lib/content";

/** Render text with *segments* wrapped in asterisks shown in the gold gradient. */
function renderHeadline(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span key={i} className="text-gradient-gold">
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-32"
    >
      <Reveal>
        <div className="mb-14 flex items-baseline gap-4 md:mb-20">
          <span className="font-sans text-sm font-medium tracking-widest text-[var(--color-gold)]">
            01
          </span>
          <span className="h-px flex-1 bg-[var(--color-ink-line)]" />
          <h2 className="text-2xl text-[var(--color-bone)] md:text-3xl">
            About
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:gap-16">
        {/* copy */}
        <div>
          <Reveal>
            <p className="mb-8 font-serif text-2xl leading-snug text-[var(--color-bone)] md:text-3xl">
              {renderHeadline(ABOUT.headline)}
            </p>
          </Reveal>
          <div className="space-y-5 text-[var(--color-bone-dim)]">
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <div className="border-t border-[var(--color-ink-line)] pt-4">
                  <div className="font-serif text-2xl text-[var(--color-gold)] md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-[var(--color-bone-faint)]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* portrait — editorial, duotone */}
        <Reveal delay={0.15}>
          <div className="group relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(201,161,74,0.18),transparent_70%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)]">
              {/* gold duotone wash */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-[var(--color-gold)] opacity-20 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-60" />
              <motion.img
                src={`${import.meta.env.BASE_URL}${PROFILE.portrait}`}
                alt={PROFILE.name}
                className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="font-serif text-sm text-[var(--color-bone)]">
                {PROFILE.name}
              </span>
              <span className="text-xs text-[var(--color-bone-faint)]">
                {PROFILE.location}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
