// AppleModal.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
// ❌ REMOVE THIS - don't need outside click
// import { useOutsideClick } from "@/hooks/use-outside-click";
import Image, { StaticImageData } from "next/image";

type CardProps = {
  src: string;
  title: string;
  category: string;
  content?: React.ReactNode;
  description?: string;
  modalImage?: string | StaticImageData;
  features?: string[];
};

export default function AppleModal({
  isOpen,
  onClose,
  card,
}: {
  isOpen: boolean;
  onClose: () => void;
  card: CardProps;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ❌ REMOVE THIS LINE
  // useOutsideClick(containerRef, onClose);

  // ESC key handler - KEEP THIS (good UX)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-8"
        style={{ margin: 0 }}
      >
        {/* ✅ Backdrop - Remove onClick */}
        <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-md" />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          ref={containerRef}
          className="relative z-10 w-full max-w-3xl bg-neutral-900 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            className="sticky cursor-pointer top-4 right-4 ml-auto mr-4 z-20 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-red-500/90 hover:bg-red-600 transition-all border border-white/10 shadow-lg"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Image Section */}
          <div className="relative w-full h-48 sm:h-56 md:h-72 -mt-14">
            <Image
              src={card.modalImage || card.src}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
          </div>

          {/* Text Content */}
          <div className="p-5 sm:p-6 md:p-8 -mt-6 sm:-mt-8 relative">
            <span className="inline-block text-xs sm:text-sm uppercase tracking-wider text-amber-400 font-semibold mb-2 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              {card.category}
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mb-3 sm:mb-4 leading-tight">
              {card.title}
            </h2>

            {card.description && (
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                {card.description}
              </p>
            )}

            {card.features && card.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-2.5 mb-5 sm:mb-6">
                {card.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <button className="w-full py-3 sm:py-3.5 bg-white text-black text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-100 active:scale-98 transition-all shadow-md">
              Book This Space
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
