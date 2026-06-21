import { Section, Reveal } from "./primitives";
import { SKILL_GROUPS, CERTIFICATIONS } from "../lib/content";

export default function Skills() {
  return (
    <Section id="skills" index="03" title="Skills & Toolkit">
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.06}>
            <div>
              <h3 className="mb-4 flex items-center gap-3 font-sans text-sm font-medium tracking-wide text-[var(--color-bone)]">
                <span className="text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] px-3 py-1.5 text-sm text-[var(--color-bone-dim)] transition-colors hover:border-[var(--color-gold)]/40 hover:text-[var(--color-bone)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* certifications */}
      <Reveal>
        <div className="mt-20">
          <h3 className="eyebrow mb-6">Certifications</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {CERTIFICATIONS.map((c) => (
              <a
                key={c.title}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] px-5 py-4 transition-colors hover:border-[var(--color-gold)]/40"
              >
                <div>
                  <div className="text-sm text-[var(--color-bone)]">
                    {c.title}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--color-bone-faint)]">
                    {c.issuer}
                  </div>
                </div>
                <span className="text-[var(--color-bone-faint)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-gold)]">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
