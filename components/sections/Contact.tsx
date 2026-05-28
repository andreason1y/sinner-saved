"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Lightbulb, AlertOctagon, ArrowUpRight } from "lucide-react";
import { Reveal, StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { useLocale } from "@/components/i18n/LocaleProvider";

const ADMIN_EMAIL = "andreassina6a@gmail.com";

function mailto(subject: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `mailto:${ADMIN_EMAIL}?${params.toString()}`;
}

export function Contact() {
  const { t } = useLocale();

  const cards = [
    {
      icon: <MessageCircle size={16} />,
      title: t.contact.questions,
      body: t.contact.questionsBody,
      subject:
        t.contact.questions === "Pertanyaan"
          ? "[SinnerSaved] Pertanyaan"
          : "[SinnerSaved] Question",
      tone: "neutral" as const,
    },
    {
      icon: <AlertOctagon size={16} />,
      title: t.contact.feedback,
      body: t.contact.feedbackBody,
      subject:
        t.contact.feedback === "Kritik"
          ? "[SinnerSaved] Kritik"
          : "[SinnerSaved] Criticism",
      tone: "dark" as const,
    },
    {
      icon: <Lightbulb size={16} />,
      title: t.contact.suggestions,
      body: t.contact.suggestionsBody,
      subject:
        t.contact.suggestions === "Saran"
          ? "[SinnerSaved] Saran"
          : "[SinnerSaved] Suggestion",
      tone: "sacred" as const,
    },
  ];

  return (
    <section id="kontak" className="relative py-24 sm:py-32">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[480px] bg-radial-glow opacity-50 dark:opacity-30" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-sacred-600 dark:text-sacred-300">
            {t.contact.eyebrow}
          </p>
          <h2 className="serif-display mt-3 max-w-3xl text-4xl leading-[1.05] tracking-tightest text-ink-900 dark:text-ink-50 sm:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
            {t.contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={mailto("[SinnerSaved] Halo")}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-parchment transition-transform hover:scale-[1.02] dark:bg-ink-50 dark:text-ink-950"
          >
            <Mail size={16} />
            <span>{ADMIN_EMAIL}</span>
            <ArrowUpRight
              size={14}
              className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        <StaggerContainer className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <FadeInUp key={card.title}>
              <a
                href={mailto(card.subject)}
                className={`group block h-full overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-1 ${
                  card.tone === "dark"
                    ? "bg-ink-900 text-ink-50 shadow-card hover:shadow-card-hover dark:bg-ink-800"
                    : card.tone === "sacred"
                    ? "bg-gradient-to-br from-sacred-50 to-parchment-deep ring-1 ring-sacred-200/60 hover:ring-sacred-300 dark:from-sacred-500/10 dark:to-white/[0.03] dark:ring-sacred-500/20 dark:hover:ring-sacred-500/40"
                    : "bg-white shadow-card ring-1 ring-ink-900/5 hover:shadow-card-hover dark:bg-ink-900 dark:ring-white/5"
                }`}
              >
                <div
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                    card.tone === "dark"
                      ? "bg-white/10 text-ink-100"
                      : "bg-ink-900/5 text-ink-700 dark:bg-white/5 dark:text-ink-200"
                  }`}
                >
                  {card.icon}
                </div>
                <h3
                  className={`serif-display mt-5 text-2xl leading-snug ${
                    card.tone === "dark"
                      ? "text-ink-50"
                      : "text-ink-900 dark:text-ink-50"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    card.tone === "dark"
                      ? "text-ink-300"
                      : "text-ink-600 dark:text-ink-300"
                  }`}
                >
                  {card.body}
                </p>
                <span
                  className={`mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.24em] ${
                    card.tone === "dark"
                      ? "text-sacred-300"
                      : "text-sacred-700 dark:text-sacred-300"
                  }`}
                >
                  {t.contact.cta}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </FadeInUp>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export { ADMIN_EMAIL, mailto };
