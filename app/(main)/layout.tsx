// 📁 app/(main)/layout.tsx
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Analytics Tracker - Auto track semua page views */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>

      <Navbar />
      {children}
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
