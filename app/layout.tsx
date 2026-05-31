import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider, NoFlashScript } from "@/components/theme/ThemeProvider";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@/lib/i18n/dictionary";

// Self-host Google fonts at build time. Eliminates the render-blocking
// <link> to fonts.googleapis.com, ships only the subsets/weights we use,
// and lets Next.js inline a `font-display: swap` declaration + preload.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sinner-saved.xyz"
  ),
  title: {
    default: "SinnerSaved — Catatan Iman",
    template: "%s · SinnerSaved",
  },
  description:
    "Membaca Alkitab dengan jujur, berpikir dengan tertib, dan hidup dalam kasih karunia.",
  keywords: [
    "alkitab",
    "iman",
    "refleksi",
    "doktrin",
    "apologetika",
    "SinnerSaved",
  ],
  openGraph: {
    title: "SinnerSaved",
    description:
      "Membaca Alkitab dengan jujur, berpikir dengan tertib, dan hidup dalam kasih karunia.",
    type: "website",
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
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
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
