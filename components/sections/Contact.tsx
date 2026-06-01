"use client";

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
    <section id="kontak" className="relative border-t border-ink-900/10 py-24 dark:border-white/10 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="kicker shrink-0">{t.contact.eyebrow}</span>
            <span className="h-px flex-1 bg-gold-leaf" />
          </div>
          <h2 className="serif-display mt-6 max-w-3xl text-4xl font-medium leading-[1.06] text-ink-900 dark:text-ink-50 sm:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
            {t.contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={mailto("[SinnerSaved] Halo")}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-parchment shadow-card transition-all hover:shadow-card-hover hover:ring-1 hover:ring-gold-400/60 dark:bg-ink-50 dark:text-ink-950"
          >
            <Mail size={16} className="text-gold-300 dark:text-gold-600" />
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
                className={`group block h-full overflow-hidden rounded-2xl p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover ${
                  card.tone === "dark"
                    ? "bg-ink-950 text-ink-50 ring-1 ring-white/10 hover:ring-gold-300/45 dark:bg-ink-900"
                    : card.tone === "sacred"
                    ? "bg-parchment-deep ring-1 ring-ink-900/10 hover:ring-gold-400/60 dark:bg-white/[0.04] dark:ring-white/10 dark:hover:ring-gold-300/40"
                    : "bg-parchment-light ring-1 ring-ink-900/10 hover:ring-gold-400/60 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-gold-300/40"
                }`}
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${
                    card.tone === "dark"
                      ? "bg-gold-300/15 text-gold-300"
                      : "bg-gold-500/10 text-gold-600 dark:bg-gold-300/10 dark:text-gold-300"
                  }`}
                >
                  {card.icon}
                </div>
                <h3
                  className={`serif-display mt-5 text-2xl font-medium leading-snug ${
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
                  className={`mt-6 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] ${
                    card.tone === "dark"
                      ? "text-gold-300"
                      : "text-gold-700 dark:text-gold-300"
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
