import { motion } from "framer-motion";
import { PROFILE } from "../lib/content";
import { scrollToId } from "../hooks/useLenis";

const line = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* slow-drifting warm glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-1/4 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,161,74,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[50vh] w-[50vh] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(224,122,95,0.10),transparent_60%)] blur-3xl" />
      </motion.div>

      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* oversized name backdrop */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center overflow-hidden"
      >
        <span
          className="select-none whitespace-nowrap font-serif font-semibold leading-[0.78] tracking-tight text-transparent"
          style={{
            fontSize: "clamp(4rem, 19vw, 18rem)",
            WebkitTextStroke: "1px rgba(237,231,221,0.10)",
            backgroundImage:
              "linear-gradient(180deg, rgba(201,161,74,0.20), rgba(237,231,221,0.05) 70%, rgba(237,231,221,0) 92%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            transform: "translateY(14%)",
          }}
        >
          ANAS SHEIKH
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.p
          custom={0}
          variants={line}
          initial="hidden"
          animate="show"
          className="eyebrow mb-6"
        >
          {PROFILE.role} · {PROFILE.location}
        </motion.p>

        <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-[var(--color-bone)]">
          <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
            I build <span className="italic text-gradient-gold">real-time AI</span>
          </motion.span>
          <motion.span custom={2} variants={line} initial="hidden" animate="show" className="block">
            from the edge to the cloud.
          </motion.span>
        </h1>

        <motion.p
          custom={3}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-bone-dim)]"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          custom={4}
          variants={line}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollToId("work")}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 font-sans text-sm font-medium text-[var(--color-ink)] transition-transform hover:scale-[1.03]"
          >
            View selected work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => scrollToId("contact")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink-line)] px-6 py-3 font-sans text-sm text-[var(--color-bone-dim)] transition-colors hover:border-[var(--color-bone-dim)] hover:text-[var(--color-bone)]"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--color-bone-faint)]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[var(--color-gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
