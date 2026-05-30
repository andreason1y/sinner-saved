import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { TrackPageView } from "@/components/analytics/TrackPageView";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TrackPageView />
      <GoogleAnalytics />
      <Navbar />
      <PageTransition>
        <main className="relative">{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
