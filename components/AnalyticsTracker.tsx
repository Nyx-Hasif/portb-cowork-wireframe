// 📁 components/AnalyticsTracker.tsx
// REPLACE EXISTING FILE

"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Heartbeat every 10 seconds for real-time tracking
const HEARTBEAT_INTERVAL = 10 * 1000;
// Session expires after 30 minutes of inactivity
const SESSION_EXPIRY = 30 * 60 * 1000;

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const visitorIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const heartbeatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPageRef = useRef<string | null>(null);
  const isTrackingRef = useRef(false);

  // ============================================
  // GET OR CREATE VISITOR ID
  // ============================================
  const getVisitorId = useCallback((): string => {
    if (visitorIdRef.current) return visitorIdRef.current;

    if (typeof window === "undefined") return "";

    let vid = localStorage.getItem("_vid");
    if (!vid) {
      vid = `v_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem("_vid", vid);
    }
    visitorIdRef.current = vid;
    return vid;
  }, []);

  // ============================================
  // GET SESSION ID (Check if still valid)
  // ============================================
  const getSessionId = useCallback((): string | null => {
    if (sessionIdRef.current) return sessionIdRef.current;

    if (typeof window === "undefined") return null;

    const stored = sessionStorage.getItem("_sid");
    const expiry = sessionStorage.getItem("_sexp");

    if (stored && expiry && Date.now() < parseInt(expiry, 10)) {
      sessionIdRef.current = stored;
      // Extend expiry
      sessionStorage.setItem("_sexp", String(Date.now() + SESSION_EXPIRY));
      return stored;
    }

    // Session expired or doesn't exist
    sessionStorage.removeItem("_sid");
    sessionStorage.removeItem("_sexp");
    return null;
  }, []);

  // ============================================
  // SAVE SESSION ID
  // ============================================
  const saveSessionId = useCallback((sid: string) => {
    sessionIdRef.current = sid;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("_sid", sid);
      sessionStorage.setItem("_sexp", String(Date.now() + SESSION_EXPIRY));
    }
  }, []);

  // ============================================
  // SEND HEARTBEAT
  // ============================================
  const sendHeartbeat = useCallback(async (isLeaving = false) => {
    const sid = sessionIdRef.current;
    if (!sid) return;

    try {
      const payload = {
        sessionId: sid,
        page: lastPageRef.current,
        isLeaving,
      };

      if (isLeaving && navigator.sendBeacon) {
        // Use sendBeacon for reliability when leaving
        navigator.sendBeacon(
          "/api/analytics/heartbeat",
          JSON.stringify(payload),
        );
      } else {
        await fetch("/api/analytics/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: isLeaving,
        });
      }
    } catch {
      // Silently fail - don't break user experience
    }
  }, []);

  // ============================================
  // START HEARTBEAT INTERVAL
  // ============================================
  const startHeartbeat = useCallback(() => {
    // Clear existing
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
    }

    // Start new interval
    heartbeatTimerRef.current = setInterval(() => {
      sendHeartbeat(false);
    }, HEARTBEAT_INTERVAL);
  }, [sendHeartbeat]);

  // ============================================
  // STOP HEARTBEAT
  // ============================================
  const stopHeartbeat = useCallback(() => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }, []);

  // ============================================
  // TRACK PAGEVIEW
  // ============================================
  const trackPageView = useCallback(
    async (page: string) => {
      if (isTrackingRef.current) return;
      isTrackingRef.current = true;

      try {
        const visitorId = getVisitorId();
        const sessionId = getSessionId();

        const response = await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "pageview",
            page,
            title: document.title,
            referrer: document.referrer,
            visitorId,
            sessionId,
            userAgent: navigator.userAgent,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }),
        });

        const data = await response.json();

        if (data.success && data.sessionId) {
          saveSessionId(data.sessionId);
          lastPageRef.current = page;
          startHeartbeat();
        }
      } catch {
        // Silently fail
      } finally {
        isTrackingRef.current = false;
      }
    },
    [getVisitorId, getSessionId, saveSessionId, startHeartbeat],
  );

  // ============================================
  // HANDLE VISIBILITY CHANGE
  // ============================================
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden - pause heartbeat, send one last update
        sendHeartbeat(false);
        stopHeartbeat();
      } else {
        // Tab visible - resume heartbeat
        startHeartbeat();
      }
    };

    const handleBeforeUnload = () => {
      // User leaving - send final heartbeat to end session
      sendHeartbeat(true);
      stopHeartbeat();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
      stopHeartbeat();
    };
  }, [sendHeartbeat, startHeartbeat, stopHeartbeat]);

  // ============================================
  // TRACK ON ROUTE CHANGE
  // ============================================
  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = searchParams?.toString();
    const fullPath = search ? `${pathname}?${search}` : pathname;

    // Only track if path changed
    if (fullPath && fullPath !== lastPageRef.current) {
      trackPageView(fullPath);
    }
  }, [pathname, searchParams, trackPageView]);

  return null;
}
