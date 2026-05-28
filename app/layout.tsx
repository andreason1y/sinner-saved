import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { ThemeProvider, NoFlashScript } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: {
    default: "SinnerSaved — Theological Journal & Biblical Literacy",
    template: "%s · SinnerSaved",
  },
  description:
    "SinnerSaved adalah jurnal teologi independen — membaca Alkitab dengan jujur, berpikir dengan tertib, dan hidup dalam kasih karunia.",
  keywords: [
    "teologi",
    "alkitab",
    "biblical literacy",
    "doktrin",
    "apologetika",
    "refleksi",
    "SinnerSaved",
  ],
  openGraph: {
    title: "SinnerSaved",
    description:
      "Jurnal teologi independen — membaca Alkitab dengan jujur, berpikir dengan tertib, dan hidup dalam kasih karunia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read locale cookie at render time so SSR markup matches the chosen
  // language and there's no flicker on first paint.
  const cookieLocale = cookies().get("ss-locale")?.value;
  const locale: Locale =
    cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)
      ? (cookieLocale as Locale)
      : DEFAULT_LOCALE;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        {/* No-flash dark-mode bootstrap. Runs before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: NoFlashScript }} />
      </head>
      <body className="min-h-screen bg-parchment text-ink-900 antialiased dark:bg-ink-950 dark:text-ink-50">
        <ThemeProvider>
          <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
