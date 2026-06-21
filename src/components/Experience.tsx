import { Section, Reveal } from "./primitives";
import { EXPERIENCE, EDUCATION } from "../lib/content";

export default function Experience() {
  return (
    <Section id="experience" index="04" title="Experience">
      <div className="relative">
        {/* timeline rail */}
        <div className="absolute left-0 top-2 bottom-2 hidden w-px bg-[var(--color-ink-line)] md:block" />

        <div className="space-y-12">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={`${e.company}-${e.role}`} delay={i * 0.06}>
              <div className="relative md:pl-10">
                {/* node */}
                <span className="absolute left-[-4px] top-2 hidden h-2 w-2 rounded-full bg-[var(--color-gold)] md:block" />

                <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline">
                  <h3 className="font-serif text-xl text-[var(--color-bone)]">
                    {e.role}
                  </h3>
                  <span className="text-sm text-[var(--color-bone-faint)]">
                    {e.period}
                  </span>
                </div>
                <div className="mt-1 text-sm text-[var(--color-gold)]">
                  {e.company}
                  {e.context && (
                    <span className="text-[var(--color-bone-faint)]">
                      {" "}
                      · {e.context}
                    </span>
                  )}
                </div>

                <ul className="mt-4 space-y-2">
                  {e.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm leading-relaxed text-[var(--color-bone-dim)]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-bone-faint)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* education */}
      <Reveal>
        <div className="mt-16 flex flex-col justify-between gap-2 rounded-2xl border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] px-6 py-6 md:flex-row md:items-center md:px-8">
          <div>
            <div className="eyebrow mb-2">Education</div>
            <div className="font-serif text-xl text-[var(--color-bone)]">
              {EDUCATION.degree}
            </div>
            <div className="mt-1 text-sm text-[var(--color-bone-dim)]">
              {EDUCATION.school} · {EDUCATION.detail}
            </div>
          </div>
          <span className="text-sm text-[var(--color-bone-faint)]">
            {EDUCATION.period}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
