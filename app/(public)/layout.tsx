import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { TrackPageView } from "@/components/analytics/TrackPageView";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TrackPageView />
      <Navbar />
      <PageTransition>
        <main className="relative">{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
