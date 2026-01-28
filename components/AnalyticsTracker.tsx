// 📁 components/AnalyticsTracker.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string>("");

  useEffect(() => {
    // Prevent duplicate tracking
    const fullPath =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    if (lastTrackedPath.current === fullPath) return;
    lastTrackedPath.current = fullPath;

    // Small delay to ensure page title is updated
    const timer = setTimeout(() => {
      trackPageView(pathname);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
