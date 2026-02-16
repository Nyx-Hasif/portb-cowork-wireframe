"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // ✅ Track modal state

  // ✅ Detect modal open/close
  const checkModalOpen = useCallback((): boolean => {
    return (
      document.body.style.overflow === "hidden" ||
      document.documentElement.style.overflow === "hidden" ||
      document.body.classList.contains("overflow-hidden") ||
      !!document.querySelector('[role="dialog"]')
    );
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        // ✅ Check modal state on every scroll
        const isModal = checkModalOpen();
        setModalOpen(isModal);

        if (isModal) {
          ticking = false;
          return;
        }

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollableHeight = documentHeight - windowHeight;

        const progress =
          scrollableHeight > 0
            ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
            : 0;

        setScrollProgress(progress);

        // Detect dark section
        const buttonElement = document.querySelector("[data-scroll-to-top]");
        if (buttonElement) {
          const rect = buttonElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const elementBelow = document.elementFromPoint(centerX, centerY);

          if (elementBelow) {
            const bgColor =
              window.getComputedStyle(elementBelow).backgroundColor;
            const isDark =
              bgColor.includes("0, 0, 0") ||
              bgColor.includes("rgb(0") ||
              elementBelow.classList.contains("bg-black");
            setIsDarkSection(isDark);
          }
        }

        setVisible(window.scrollY > 400);
        ticking = false;
      });
    };

    // ✅ MutationObserver — detect modal DOM changes instantly
    const observer = new MutationObserver(() => {
      const isModal = checkModalOpen();
      setModalOpen(isModal);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style", "class"],
      childList: true,
      subtree: true,
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [checkModalOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Number.isFinite(scrollProgress) ? scrollProgress : 0;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

  // ✅ Final visibility: show only if scrolled enough AND modal NOT open
  const shouldShow = visible && !modalOpen;

  return (
    <button
      data-scroll-to-top
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-12 h-12 md:w-14 md:h-14
        rounded-full
        transition-all duration-300
        hover:scale-110
        group
        ${
          isDarkSection
            ? "bg-white border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            : "bg-black border-gray-800 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
        }
        border
        ${
          shouldShow
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
    >
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className={isDarkSection ? "text-gray-200" : "text-gray-700"}
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={
            Number.isFinite(strokeDashoffset) ? strokeDashoffset : circumference
          }
          className={`transition-all duration-300 ease-out ${
            isDarkSection ? "text-black" : "text-white"
          }`}
          strokeLinecap="round"
        />
      </svg>

      <ArrowUp
        className={`w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 ${
          isDarkSection ? "text-black" : "text-white"
        }`}
      />
    </button>
  );
}
