import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Hanken_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider, NoFlashScript } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@/lib/i18n/dictionary";
import { SITE } from "@/lib/site";

// Self-host Google fonts at build time. Eliminates the render-blocking
// <link> to fonts.googleapis.com, ships only the subsets we use, and lets
// Next.js inline a `font-display: swap` declaration + preload.
//
// "Old-master / sacred" pairing: Cormorant Garamond is a high-contrast
// Garamond in the lineage of printed Scripture — thin hairlines, generous
// contrast, beautiful italics — used large for display and drop-caps.
// Hanken Grotesk is the quiet grotesque workhorse for UI, labels and body.
// The CSS variable names are kept as `--font-inter` / `--font-playfair`
// so the stylesheet and components keep working without a sweeping rename.
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "alkitab",
    "iman",
    "refleksi",
    "doktrin",
    "apologetika",
    "SinnerSaved",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: SITE.name }],
    },
  },
  verification: {
    google: "Loo644KZKKDJ2DiGP363U48GSOAkasP1CbB0baL_TZ0",
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
    <html
      lang={locale}
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash dark-mode bootstrap. Runs before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: NoFlashScript }} />
      </head>
      <body className="min-h-screen bg-parchment text-ink-900 antialiased dark:bg-ink-950 dark:text-ink-50">
        <ThemeProvider>
          <ErrorBoundary>
            <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
