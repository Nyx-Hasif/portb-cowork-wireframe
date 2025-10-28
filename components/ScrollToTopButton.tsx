"use client";
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

useEffect(() => {
  const toggleVisibility = () => {
    const body = document.body;
    const html = document.documentElement;

    // ✅ detect bila modal buka oleh mana-mana library
    const modalOpen =
      body.style.overflow === "hidden" ||
      html.style.overflow === "hidden" ||
      body.classList.contains("overflow-hidden");

    if (modalOpen) {
      setVisible(false);
      return;
    }

    if (window.scrollY > 400) setVisible(true);
    else setVisible(false);
  };

  window.addEventListener("scroll", toggleVisibility);
  const interval = setInterval(toggleVisibility, 300); // fallback check

  return () => {
    window.removeEventListener("scroll", toggleVisibility);
    clearInterval(interval);
  };
}, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-[9999]
        flex items-center justify-center
        w-11 h-11 md:w-12 md:h-12
        rounded-full
        bg-gradient-to-r from-teal-500 to-blue-500
        text-white shadow-lg
        transition-all duration-300
        hover:scale-110 hover:shadow-xl cursor-pointer
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }
      `}
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  );
}
