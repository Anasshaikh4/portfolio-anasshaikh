import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Standard scroll-reveal: fade + rise, triggered once on enter. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/** A numbered section wrapper with consistent rhythm + a heading row. */
export function Section({
  id,
  index,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-32 ${className}`}
    >
      <Reveal>
        <div className="mb-14 flex items-baseline gap-4 md:mb-20">
          <span className="font-sans text-sm font-medium tracking-widest text-[var(--color-gold)]">
            {index}
          </span>
          <span className="h-px flex-1 bg-[var(--color-ink-line)]" />
          <h2 className="text-2xl text-[var(--color-bone)] md:text-3xl">
            {title}
          </h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

/** Inline tech chip. */
export function Chip({
  children,
  rgb,
}: {
  children: ReactNode;
  rgb?: string;
}) {
  const style = rgb
    ? {
        backgroundColor: `rgb(${rgb} / 0.10)`,
        color: `rgb(${rgb})`,
        borderColor: `rgb(${rgb} / 0.25)`,
      }
    : undefined;
  return (
    <span
      style={style}
      className="inline-flex items-center rounded-full border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] px-3 py-1 text-xs font-medium text-[var(--color-bone-dim)]"
    >
      {children}
    </span>
  );
}
