"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Image from "next/image";
import { AuroraText } from "./ui/aurora-text";
import { assets } from "@/assets/asset";

export function ImagesSliderDemo() {
  const images = [
    "/images/hero.png",
    assets.hero_1.src,
    assets.hero_2.src,
    assets.hero_3.src,
    assets.hero_4.src,
    assets.hero_5.src,
  ];

  return (
    <section className="relative w-full bg-black">
      <ImagesSlider className="h-svh min-h-[600px] w-full" images={images}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-50 flex flex-col items-center justify-center text-center text-white px-4 md:px-6"
        >
          {/* === MAIN HEADING === */}
          <motion.h1
            className="enhanced-aurora-text font-extrabold tracking-tight text-neutral-50 drop-shadow-2xl uppercase"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 11rem)",
              lineHeight: "1",
              letterSpacing: "0.05em",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <AuroraText>EMPOWERING</AuroraText>
          </motion.h1>

          {/* === SUBTEXT + BUTTON ROW === */}
          {/* 
            FIX: Changed md:flex-row → lg:flex-row
            Tablet landscape (~1024-1280px) sekarang kekal column layout,
            hanya desktop (1024px+) sahaja jadi row layout.
            Ditambah flex-wrap sebagai safety net.
          */}
          <motion.div
            className="mt-4 md:mt-6 w-full max-w-5xl flex flex-col lg:flex-row flex-wrap items-center justify-center lg:justify-between px-4 md:px-6 gap-4 lg:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Subtext - Added flex-wrap + gap-y for safe wrapping */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-2 gap-y-1 lg:gap-x-3 text-center lg:text-left leading-tight">
              {["Your", "Work", "Experience", "At", "Port", "B"].map(
                (word, i) => (
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
                ),
              )}
            </div>

            {/* CTA Button - Added shrink-0 to prevent squishing */}
            <button
              onClick={() => {
                document.getElementById("next-section")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="shrink-0 bg-white hover:bg-gray-100 text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap cursor-pointer hover:scale-105 active:scale-95"
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                padding:
                  "clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 3vw, 1.8rem)",
              }}
            >
              Explore Now
            </button>
          </motion.div>

          {/* === RATINGS & AVATARS === */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="hidden mt-6 md:mt-8 md:flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {/* Avatar Stack */}
            <div className="flex -space-x-3 sm:-space-x-4">
              {[
                assets.profile_ariff,
                assets.profile_thaqif,
                assets.profile_maji,
                assets.profile_carl,
                assets.profile_amirah,
                assets.profile_july_lai,
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
                    quality={95}
                    draggable={false}
                    sizes="(max-width: 640px) 32px, 48px"
                  />
                </div>
              ))}

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
