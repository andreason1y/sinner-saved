import type { Metadata } from "next";
import "./globals.css";

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
  return (
    <html lang="id">
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
      </head>
      <body className="min-h-screen bg-parchment text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
