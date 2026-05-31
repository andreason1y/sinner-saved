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
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
            {t.contact.eyebrow}
          </p>
          <h2 className="serif-display mt-3 max-w-3xl text-3xl leading-[1.08] text-ink-900 dark:text-ink-50 sm:text-4xl">
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
                className={`group block h-full overflow-hidden rounded-2xl p-7 transition-colors ${
                  card.tone === "dark"
                    ? "bg-ink-900 text-ink-50 ring-1 ring-white/10 hover:ring-white/25 dark:bg-ink-800"
                    : card.tone === "sacred"
                    ? "bg-parchment-deep ring-1 ring-ink-900/10 hover:ring-ink-900/25 dark:bg-white/[0.04] dark:ring-white/10 dark:hover:ring-white/25"
                    : "bg-white ring-1 ring-ink-900/10 hover:ring-ink-900/25 dark:bg-ink-900 dark:ring-white/10 dark:hover:ring-white/25"
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
                      ? "text-ink-300"
                      : "text-ink-600 dark:text-ink-300"
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
