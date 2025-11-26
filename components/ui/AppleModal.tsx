// AppleModal.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
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
  useOutsideClick(containerRef, onClose);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container - Vertical Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={containerRef}
            className="relative z-10 w-full max-w-3xl bg-neutral-900 rounded-2xl overflow-hidden border border-white/10"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors border border-white/10"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Image Section - Top */}
            <div className="relative w-full h-56 md:h-72">
              <Image
                src={card.modalImage || card.src}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
            </div>

            {/* Text Content Section - Bottom */}
            <div className="p-6 md:p-8 -mt-8 relative">
              {/* Category Badge */}
              <span className="inline-block text-xs uppercase tracking-wider text-amber-400 font-medium mb-2">
                {card.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Features Grid */}
              {card.features && card.features.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                  {card.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <button className="w-full py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Book This Space
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
