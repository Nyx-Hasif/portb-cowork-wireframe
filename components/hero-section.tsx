"use client";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Image from "next/image";
import { AuroraText } from "./ui/aurora-text";

export function ImagesSliderDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const preloadImage = new window.Image();
    preloadImage.src = "/images/hero.png";
    preloadImage.onload = () => setImagesLoaded(true);
  }, []);

  const images = isMobile
    ? [
        "/images/hero.png",
        "https://images.unsplash.com/photo-1758873272000-d3763373f863?w=800&h=1200&q=75&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=800&h=1200&q=75&auto=format&fit=crop",
      ]
    : [
        "/images/hero.png",
        "https://images.unsplash.com/photo-1758873272000-d3763373f863?w=1920&h=1080&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=1920&h=1080&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1714976326715-96d4a22f8da8?w=1920&h=1080&q=80&auto=format&fit=crop",
      ];

  return (
    <section className="relative w-full bg-black">
      {/* Loading Skeleton */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-40 bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-white/60 text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* ✅ FIXED: Removed direction prop, only use autoplay */}
      <ImagesSlider
        className="h-svh min-h-[600px] w-full"
        images={images}
        autoplay={!isMobile}
        // ✅ REMOVED: direction={isMobile ? "up" : "right"}
        // Component only accepts "up" | "down", so we use default behavior
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: imagesLoaded ? 1 : 0, y: imagesLoaded ? 0 : -50 }}
          transition={{ duration: 0.8 }}
          className="relative z-50 flex flex-col items-center justify-center text-center text-white px-4 md:px-6"
        >
          {/* Main Heading */}
          <motion.h1
            className="enhanced-aurora-text font-extrabold tracking-tight text-neutral-50 drop-shadow-2xl uppercase"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 11rem)",
              lineHeight: "1",
              letterSpacing: "0.05em",
              WebkitFontSmoothing: "antialiased",
              willChange: "transform",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: imagesLoaded ? 1 : 0,
              y: imagesLoaded ? 0 : 30,
            }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <AuroraText>EMPOWERING</AuroraText>
          </motion.h1>

          {/* Subtext + Button Row */}
          <motion.div
            className="mt-4 md:mt-6 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-6 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: imagesLoaded ? 1 : 0,
              y: imagesLoaded ? 0 : 20,
            }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Subtext */}
            <div className="flex md:flex-row justify-center md:justify-start gap-2 md:gap-3 text-center md:text-left leading-tight max-w-lg">
              {["Your", "Work", "Experience", "At", "PortB"].map((word, i) => (
                <span
                  key={i}
                  className="font-light text-white"
                  style={{
                    fontSize: "clamp(1.2rem, 3.5vw, 3.2rem)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                document.getElementById("next-section")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="bg-white hover:bg-gray-100 text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95 touch-manipulation"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                padding:
                  "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 3vw, 1.8rem)",
              }}
            >
              Explore Now
            </button>
          </motion.div>

          {/* Ratings & Avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imagesLoaded ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="hidden mt-6 md:mt-8 md:flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {/* Avatar Stack */}
            <div className="flex -space-x-3 sm:-space-x-4">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=75&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&q=75&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=75&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&h=100&q=75&auto=format&fit=crop",
                "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=100&h=100&q=75&auto=format&fit=crop",
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative rounded-full border-2 sm:border-3 border-white overflow-hidden"
                  style={{
                    width: "clamp(2rem, 5vw, 3rem)",
                    height: "clamp(2rem, 5vw, 3rem)",
                  }}
                >
                  <Image
                    src={src}
                    alt={`User ${i + 1}`}
                    fill
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                    draggable={false}
                    sizes="48px"
                  />
                </div>
              ))}

              {/* +99 Badge */}
              <div
                className="relative rounded-full border-2 sm:border-3 border-white bg-black flex items-center justify-center"
                style={{
                  width: "clamp(2rem, 5vw, 3rem)",
                  height: "clamp(2rem, 5vw, 3rem)",
                }}
              >
                <span
                  className="font-semibold text-white"
                  style={{
                    fontSize: "clamp(0.65rem, 1.2vw, 0.9rem)",
                  }}
                >
                  +99
                </span>
              </div>
            </div>

            {/* Rating Text */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div
                className="font-semibold text-white flex items-center gap-1"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                }}
              >
                <span>5.0</span>
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              </div>
              <p
                className="text-neutral-300 font-light"
                style={{
                  fontSize: "clamp(0.75rem, 1.2vw, 0.95rem)",
                }}
              >
                (1.5k+ trusted reviews)
              </p>
            </div>
          </motion.div>
        </motion.div>
      </ImagesSlider>
    </section>
  );
}
