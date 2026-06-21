import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./primitives";
import { PROFILE, whatsappLink } from "../lib/content";
import { MailIcon, WhatsAppIcon, GitHubIcon, LinkedInIcon } from "./icons";

/**
 * Each channel shows only its name + an action — the raw email / number /
 * handle is never printed on the page. Clicking still opens the real link.
 */
const SOCIALS: {
  label: string;
  action: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  {
    label: "Email",
    action: "Send an email",
    href: `mailto:${PROFILE.email}`,
    Icon: MailIcon,
  },
  {
    label: "WhatsApp",
    action: "Start a chat",
    href: whatsappLink(PROFILE.whatsapp),
    Icon: WhatsAppIcon,
  },
  {
    label: "GitHub",
    action: "View profile",
    href: PROFILE.socials.github,
    Icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    action: "Connect",
    href: PROFILE.socials.linkedin,
    Icon: LinkedInIcon,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40"
    >
      <Reveal>
        <span className="eyebrow">05 · Contact</span>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] text-[var(--color-bone)]">
          Let's build something that{" "}
          <span className="text-gradient-gold italic">ships</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-xl text-lg text-[var(--color-bone-dim)]">
          Open to AI / Computer Vision and ML engineering roles — remote or
          on-site. The fastest way to reach me is email.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-7 py-3.5 font-sans text-sm font-medium text-[var(--color-ink)] transition-transform hover:scale-[1.03]"
          >
            Say hello
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={`${import.meta.env.BASE_URL}${PROFILE.resume}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink-line)] px-7 py-3.5 font-sans text-sm text-[var(--color-bone-dim)] transition-colors hover:border-[var(--color-bone-dim)] hover:text-[var(--color-bone)]"
          >
            Download résumé ↓
          </a>
        </div>
      </Reveal>

      {/* socials */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-ink-line)] bg-[var(--color-ink-line)] sm:grid-cols-2 lg:grid-cols-4">
        {SOCIALS.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="group flex flex-col gap-5 bg-[var(--color-ink)] px-6 py-7 transition-colors hover:bg-[var(--color-ink-soft)]"
          >
            <span className="flex items-center justify-between">
              <s.Icon className="h-5 w-5 text-[var(--color-bone-dim)] transition-colors group-hover:text-[var(--color-gold)]" />
              <span className="text-[var(--color-bone-faint)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--color-gold)]">
                ↗
              </span>
            </span>
            <span>
              <span className="block text-xs uppercase tracking-widest text-[var(--color-bone-faint)]">
                {s.label}
              </span>
              <span className="mt-1 block text-[var(--color-bone)]">
                {s.action}
              </span>
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
