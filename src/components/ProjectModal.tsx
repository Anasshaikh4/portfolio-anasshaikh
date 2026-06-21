import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../types";
import { DOMAIN_META } from "../lib/domains";

const LINK_LABELS: Record<string, string> = {
  github: "Source",
  demo: "Live demo",
  video: "Watch demo",
  linkedin: "View on LinkedIn",
};

const VIDEO_RE = /\.(mp4|webm|mov)$/i;

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (project) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-[var(--color-ink)]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] sm:rounded-3xl"
          >
            {/* header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-ink-line)] bg-[var(--color-ink-soft)]/95 px-7 py-6 backdrop-blur">
              <div>
                <span
                  className="mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `rgb(${DOMAIN_META[project.domain].rgb} / 0.12)`,
                    color: `rgb(${DOMAIN_META[project.domain].rgb})`,
                  }}
                >
                  {project.domain}
                </span>
                <h3 className="font-serif text-2xl text-[var(--color-bone)] md:text-3xl">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-ink-line)] text-[var(--color-bone-dim)] transition-colors hover:border-[var(--color-bone-dim)] hover:text-[var(--color-bone)]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-8 px-7 py-7">
              {/* media gallery, if any — supports images and video clips */}
              {project.media && project.media.length > 0 && (
                <div className="grid gap-3">
                  {project.media.map((m) =>
                    VIDEO_RE.test(m) ? (
                      <video
                        key={m}
                        src={`${import.meta.env.BASE_URL}media/${m}`}
                        className="w-full rounded-xl border border-[var(--color-ink-line)]"
                        controls
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        key={m}
                        src={`${import.meta.env.BASE_URL}media/${m}`}
                        alt={`${project.title} preview`}
                        className="w-full rounded-xl border border-[var(--color-ink-line)]"
                        loading="lazy"
                      />
                    ),
                  )}
                </div>
              )}

              <div>
                <h4 className="eyebrow mb-3">Objective</h4>
                <p className="leading-relaxed text-[var(--color-bone-dim)]">
                  {project.objective}
                </p>
              </div>

              <div>
                <h4 className="eyebrow mb-3">What I built</h4>
                <ul className="space-y-3">
                  {project.achievements.map((a, i) => (
                    <li key={i} className="flex gap-3 text-[var(--color-bone-dim)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="eyebrow mb-3">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--color-ink-line)] bg-[var(--color-ink)] px-3 py-1 text-xs text-[var(--color-bone-dim)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* links, only if present */}
              {project.links &&
                Object.entries(project.links).some(([, v]) => v) && (
                  <div className="flex flex-wrap gap-3 border-t border-[var(--color-ink-line)] pt-6">
                    {Object.entries(project.links).map(([k, v]) =>
                      v ? (
                        <a
                          key={k}
                          href={v}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-4 py-2 text-sm text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)]"
                        >
                          {LINK_LABELS[k] ?? k} ↗
                        </a>
                      ) : null,
                    )}
                  </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
