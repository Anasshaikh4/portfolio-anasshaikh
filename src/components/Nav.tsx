import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "../hooks/useLenis";
import { PROFILE } from "../lib/content";

const LINKS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-[var(--color-ink-line)] bg-[var(--color-ink)]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={() => go("top")}
          className="font-serif text-lg tracking-tight text-[var(--color-bone)] transition-colors hover:text-[var(--color-gold)]"
        >
          Anas<span className="text-[var(--color-gold)]">.</span>
        </button>

        {/* desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="group relative font-sans text-sm text-[var(--color-bone-dim)] transition-colors hover:text-[var(--color-bone)]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
          <li>
            <a
              href={`${import.meta.env.BASE_URL}${PROFILE.resume}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--color-gold)]/40 px-4 py-1.5 font-sans text-sm text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
            >
              Résumé
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-px w-6 bg-[var(--color-bone)] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-[var(--color-bone)] transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 bg-[var(--color-bone)] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--color-ink-line)] bg-[var(--color-ink)]/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="w-full py-3 text-left font-serif text-xl text-[var(--color-bone)]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href={`${import.meta.env.BASE_URL}${PROFILE.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block py-3 font-serif text-xl text-[var(--color-gold)]"
                >
                  Résumé ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
