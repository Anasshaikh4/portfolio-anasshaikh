import { PROFILE } from "../lib/content";
import { scrollToId } from "../hooks/useLenis";
import { GitHubIcon, LinkedInIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-ink-line)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row md:px-10">
        <button
          onClick={() => scrollToId("top")}
          className="font-serif text-lg text-[var(--color-bone)] transition-colors hover:text-[var(--color-gold)]"
        >
          Anas<span className="text-[var(--color-gold)]">.</span>
        </button>

        <p className="text-center text-xs text-[var(--color-bone-faint)]">
          Designed & built by {PROFILE.name} · {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ink-line)] text-[var(--color-bone-dim)] transition-colors hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
          >
            <GitHubIcon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ink-line)] text-[var(--color-bone-dim)] transition-colors hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
          >
            <LinkedInIcon className="h-[18px] w-[18px] transition-transform group-hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
}
