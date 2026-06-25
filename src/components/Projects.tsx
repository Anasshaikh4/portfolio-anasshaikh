import { forwardRef, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, Domain } from "../types";
import { PROJECTS } from "../lib/projects";
import { DOMAIN_META, DOMAIN_ORDER } from "../lib/domains";
import { Reveal } from "./primitives";
import ProjectModal from "./ProjectModal";

type Filter = "All" | Domain;

const ProjectCard = forwardRef<
  HTMLButtonElement,
  { project: Project; onOpen: () => void; featured?: boolean }
>(function ProjectCard({ project, onOpen, featured }, ref) {
  const meta = DOMAIN_META[project.domain];
  return (
    <motion.button
      ref={ref}
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] p-6 text-left transition-colors duration-500 hover:border-[var(--color-bone-faint)]/40 md:p-8 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* hover wash in the domain color */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 100% at 0% 0%, rgb(${meta.rgb} / 0.08), transparent 60%)`,
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: `rgb(${meta.rgb} / 0.12)`,
            color: `rgb(${meta.rgb})`,
          }}
        >
          {project.domain}
        </span>
        <span className="text-xs tracking-wide text-[var(--color-bone-faint)]">
          {formatDate(project.date)}
        </span>
      </div>

      <h3 className="relative mt-5 font-serif text-xl text-[var(--color-bone)] md:text-2xl">
        {project.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-[var(--color-bone-dim)]">
        {project.oneLiner}
      </p>

      <div className="relative mt-6 flex flex-wrap items-center gap-2">
        {project.stack.slice(0, featured ? 6 : 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--color-ink-line)] px-2.5 py-1 text-[0.7rem] text-[var(--color-bone-faint)]"
          >
            {t}
          </span>
        ))}
        {project.stack.length > (featured ? 6 : 4) && (
          <span className="text-[0.7rem] text-[var(--color-bone-faint)]">
            +{project.stack.length - (featured ? 6 : 4)}
          </span>
        )}
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-sm text-[var(--color-gold)]">
        <span>View case study</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </motion.button>
  );
});

function formatDate(d: string) {
  const [y, m] = d.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[Number(m) - 1] ?? ""} ${y}`;
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const availableDomains = useMemo(
    () => DOMAIN_ORDER.filter((d) => PROJECTS.some((p) => p.domain === d)),
    [],
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.domain === filter),
    [filter],
  );

  const filters: Filter[] = ["All", ...availableDomains];

  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-32"
    >
      <Reveal>
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-sans text-sm font-medium tracking-widest text-[var(--color-gold)]">
            02
          </span>
          <span className="h-px flex-1 bg-[var(--color-ink-line)]" />
          <h2 className="text-2xl text-[var(--color-bone)] md:text-3xl">
            Selected Work
          </h2>
        </div>
      </Reveal>

      <Reveal>
        <p className="mb-10 max-w-2xl text-[var(--color-bone-dim)]">
          A living record of what I've built across Computer Vision, MLOps, NLP
          and Agentic AI. Filter by domain, then open any project for the full
          case study.
        </p>
      </Reveal>

      {/* filter bar */}
      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = filter === f;
            const rgb = f !== "All" ? DOMAIN_META[f].rgb : "201 161 74";
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full border px-4 py-1.5 text-sm transition-all duration-300"
                style={{
                  borderColor: isActive
                    ? `rgb(${rgb} / 0.5)`
                    : "var(--color-ink-line)",
                  backgroundColor: isActive
                    ? `rgb(${rgb} / 0.12)`
                    : "transparent",
                  color: isActive ? `rgb(${rgb})` : "var(--color-bone-dim)",
                }}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    {PROJECTS.filter((p) => p.domain === f).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* grid */}
      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <ProjectCard
              key={p.slug}
              project={p}
              featured={filter === "All" && p.featured}
              onOpen={() => setActive(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
