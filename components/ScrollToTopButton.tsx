"use client";
// This is called Circular Progress Indicator
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const body = document.body;
      const html = document.documentElement;

      const modalOpen =
        body.style.overflow === "hidden" ||
        html.style.overflow === "hidden" ||
        body.classList.contains("overflow-hidden");

      if (modalOpen) {
        setVisible(false);
        return;
      }

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;

      // ✅ FIX: Add check for scrollableHeight to prevent division by zero
      const progress =
        scrollableHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
          : 0;

      setScrollProgress(progress);

      // Detect if button is over dark section
      const buttonElement = document.querySelector("[data-scroll-to-top]");
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const elementBelow = document.elementFromPoint(centerX, centerY);

        if (elementBelow) {
          const bgColor = window.getComputedStyle(elementBelow).backgroundColor;
          // Simple dark detection (you can improve this)
          const isDark =
            bgColor.includes("0, 0, 0") ||
            bgColor.includes("rgb(0") ||
            elementBelow.classList.contains("bg-black");
          setIsDarkSection(isDark);
        }
      }

      if (window.scrollY > 400) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  // ✅ FIX: Add fallback to ensure strokeDashoffset is never NaN
  const safeProgress = Number.isFinite(scrollProgress) ? scrollProgress : 0;
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

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
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
    >
      {/* SVG Circle Progress */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
      >
        {/* Background circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className={isDarkSection ? "text-gray-200" : "text-gray-700"}
        />

        {/* Progress circle */}
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

      {/* Arrow Icon */}
      <ArrowUp
        className={`w-5 h-5 md:w-6 md:h-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 ${
          isDarkSection ? "text-black" : "text-white"
        }`}
      />
    </button>
  );
}
