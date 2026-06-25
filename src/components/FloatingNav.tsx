import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "../hooks/useLenis";
import { PROFILE } from "../lib/content";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Exp." },
  { id: "contact", label: "Contact" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  // Show once the hero is mostly scrolled past
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is in the middle of the viewport
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:block"
        >
          <div className="flex items-center gap-0.5 rounded-full border border-[var(--color-ink-line)] bg-[var(--color-ink)]/90 px-2 py-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                  active === l.id
                    ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                    : "text-[var(--color-bone-dim)] hover:text-[var(--color-bone)]"
                }`}
              >
                {l.label}
              </button>
            ))}

            <span className="mx-1.5 h-3.5 w-px shrink-0 bg-[var(--color-ink-line)]" />

            <a
              href={`${import.meta.env.BASE_URL}${PROFILE.resume}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--color-gold)] transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
            >
              Résumé ↗
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
