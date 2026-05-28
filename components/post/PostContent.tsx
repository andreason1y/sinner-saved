import Image from "next/image";
import type { ContentBlock } from "@/lib/types";

/**
 * Block renderer. Renders the same shape that the Phase 3 WYSIWYG will
 * serialize, so we don't need to re-write this when the CMS lands.
 */
export function PostContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="post-prose space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const id =
              block.id ??
              block.text
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  id={id}
                  className="serif-display scroll-mt-28 pt-6 text-3xl leading-snug tracking-tightest text-ink-900 dark:text-ink-50 sm:text-4xl"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3
                key={idx}
                id={id}
                className="serif-display scroll-mt-28 pt-2 text-2xl leading-snug tracking-tightest text-ink-900 dark:text-ink-50"
              >
                {block.text}
              </h3>
            );
          }

          case "paragraph":
            return (
              <p
                key={idx}
                className="text-lg leading-[1.8] text-ink-800 first-letter:text-ink-900 dark:text-ink-200 dark:first-letter:text-ink-50"
              >
                {block.text}
              </p>
            );

          case "blockquote":
            return (
              <figure
                key={idx}
                className="my-10 border-l-2 border-sacred-500 pl-6"
              >
                <blockquote className="serif-display text-2xl leading-snug italic text-ink-800 dark:text-ink-200 sm:text-3xl">
                  &ldquo;{block.text}&rdquo;
                </blockquote>
                {block.cite && (
                  <figcaption className="mt-3 text-sm uppercase tracking-[0.28em] text-ink-500 dark:text-ink-400">
                    — {block.cite}
                  </figcaption>
                )}
              </figure>
            );

          case "scripture":
            return (
              <figure
                key={idx}
                className="my-10 rounded-2xl border border-sacred-200 bg-sacred-50/50 p-7 dark:border-sacred-500/30 dark:bg-sacred-500/[0.06] sm:p-9"
              >
                <p className="text-xs uppercase tracking-[0.32em] text-sacred-700 dark:text-sacred-300">
                  Kitab Suci
                </p>
                <blockquote className="serif-display mt-4 text-xl leading-snug text-ink-900 dark:text-ink-50 sm:text-2xl">
                  {block.text}
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium tracking-wide text-sacred-700 dark:text-sacred-300">
                  — {block.reference}
                </figcaption>
              </figure>
            );

          case "code":
            return (
              <figure key={idx} className="my-8">
                <pre className="overflow-x-auto rounded-2xl bg-ink-950 p-6 text-sm leading-relaxed text-ink-100 shadow-card">
                  <code className="font-mono">{block.code}</code>
                </pre>
                {block.caption && (
                  <figcaption className="mt-2 text-xs text-ink-500">
                    {block.caption}
                    {block.lang && ` · ${block.lang}`}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            if (block.ordered) {
              return (
                <ol
                  key={idx}
                  className="ml-6 list-decimal space-y-2 text-lg leading-[1.8] text-ink-800 dark:text-ink-200 marker:text-sacred-600 dark:marker:text-sacred-400"
                >
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={idx}
                className="ml-6 list-disc space-y-2 text-lg leading-[1.8] text-ink-800 dark:text-ink-200 marker:text-sacred-500 dark:marker:text-sacred-400"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );

          case "image":
            return (
              <figure key={idx} className="my-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-xs text-ink-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "divider":
            return (
              <hr
                key={idx}
                className="my-10 flex items-center justify-center border-0 text-center text-sacred-500"
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
