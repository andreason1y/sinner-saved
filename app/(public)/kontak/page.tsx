"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, AlertOctagon, Lightbulb, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Reveal, StaggerContainer, FadeInUp } from "@/components/motion/Reveal";
import { ADMIN_EMAIL, mailto } from "@/components/sections/Contact";

export default function KontakPage() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ADMIN_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const cards = [
    {
      icon: <MessageCircle size={18} />,
      title: t.contact.questions,
      body: t.contact.questionsBody,
      subject:
        t.contact.questions === "Pertanyaan"
          ? "[SinnerSaved] Pertanyaan"
          : "[SinnerSaved] Question",
    },
    {
      icon: <AlertOctagon size={18} />,
      title: t.contact.feedback,
      body: t.contact.feedbackBody,
      subject:
        t.contact.feedback === "Kritik"
          ? "[SinnerSaved] Kritik"
          : "[SinnerSaved] Criticism",
    },
    {
      icon: <Lightbulb size={18} />,
      title: t.contact.suggestions,
      body: t.contact.suggestionsBody,
      subject:
        t.contact.suggestions === "Saran"
          ? "[SinnerSaved] Saran"
          : "[SinnerSaved] Suggestion",
    },
  ];

  return (
    <section className="relative pb-32 pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="kicker shrink-0 text-gold-600 dark:text-gold-300">
              {t.contact.eyebrow}
            </span>
            <span className="h-px flex-1 bg-gold-leaf" />
          </div>
          <h1 className="serif-display mt-6 text-5xl font-medium leading-[1.04] text-ink-900 dark:text-ink-50 sm:text-7xl">
            {t.contact.fullPageTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {t.contact.fullPageIntro}
          </p>
        </Reveal>

        {/* Email card */}
        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-ink-900/10 bg-white p-7 shadow-card dark:border-white/10 dark:bg-ink-900 sm:p-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink-400 dark:text-ink-500">
              {t.contact.eyebrow}
            </p>
            <a
              href={mailto("[SinnerSaved] Halo")}
              className="serif-display mt-3 inline-flex items-center gap-3 text-3xl text-ink-900 hover:text-ink-600 dark:text-ink-50 dark:hover:text-ink-300 sm:text-4xl"
            >
              <Mail size={22} className="opacity-70" />
              {ADMIN_EMAIL}
            </a>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={mailto("[SinnerSaved] Halo")}
                className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-parchment transition-transform hover:scale-[1.02] dark:bg-ink-50 dark:text-ink-950"
              >
                <Mail size={14} />
                {t.contact.sendEmail}
                <ArrowUpRight size={12} className="opacity-60" />
              </a>
              <span className="text-xs uppercase tracking-[0.24em] text-ink-400 dark:text-ink-500">
                {t.contact.or}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white/60 px-5 py-2.5 text-sm text-ink-800 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/[0.04] dark:text-ink-100 dark:hover:bg-white/[0.08]"
              >
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="inline-flex"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </motion.span>
                {copied
                  ? t.contact.eyebrow === "Kontak"
                    ? "Tersalin"
                    : "Copied"
                  : t.contact.eyebrow === "Kontak"
                  ? "Salin email"
                  : "Copy email"}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Reasons grid */}
        <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <FadeInUp key={card.title}>
              <a
                href={mailto(card.subject)}
                className="group block h-full rounded-2xl border border-ink-900/10 bg-white p-6 transition-colors hover:border-ink-900/25 dark:border-white/10 dark:bg-ink-900 dark:hover:border-white/25"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/5 text-ink-700 dark:bg-white/5 dark:text-ink-200">
                  {card.icon}
                </div>
                <h3 className="serif-display mt-5 text-xl text-ink-900 dark:text-ink-50">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {card.body}
                </p>
              </a>
            </FadeInUp>
          ))}
        </StaggerContainer>

        {/* Closing note */}
        <Reveal delay={0.2}>
          <p className="mt-16 max-w-2xl border-l-2 border-sacred-500/60 pl-5 text-sm italic leading-relaxed text-ink-600 dark:text-ink-300">
            {t.contact.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
