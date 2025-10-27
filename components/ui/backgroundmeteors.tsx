"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface Beam {
  id: number;
  x: number;
  duration: number;
}

interface BackgroundMeteorsProps {
  children?: ReactNode;
}

export default function BackgroundMeteors({
  children,
}: BackgroundMeteorsProps) {
  const [beams, setBeams] = useState<Beam[]>([]);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const gridSize = 40;
  const totalLines = 35;

  // 🧠 Detect full document height dynamically
  useEffect(() => {
    const updateHeight = () => setPageHeight(document.body.scrollHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // 🎯 Generate safe random X positions
  const generateSafeGridPositions = (count: number): number[] => {
    const available: number[] = [];
    for (let i = 0; i < totalLines - 1; i++) available.push(i);

    const selected: number[] = [];
    while (available.length > 0 && selected.length < count) {
      const idx = Math.floor(Math.random() * available.length);
      const value = available[idx];
      selected.push(value);
      available.splice(
        0,
        available.length,
        ...available.filter((v) => Math.abs(v - value) > 1)
      );
    }
    return selected.map((line) => line * gridSize);
  };

  // 🌠 Continuous meteor generation (smooth slow version)
  useEffect(() => {
    const spawnMeteors = () => {
      const count = Math.floor(Math.random() * 3) + 3; // 3–6 per batch
      const xPositions = generateSafeGridPositions(count);

      const newBeams: Beam[] = xPositions.map((x) => ({
        id: Math.random(),
        x,
        duration: 18 + Math.random() * 8, // 🕊️ slower fall (18–26 seconds)
      }));

      setBeams((prev) => [...prev, ...newBeams]);
    };

    const interval = setInterval(spawnMeteors, 2500); // spawn new every 2.5s
    spawnMeteors();
    return () => clearInterval(interval);
  }, []);

  // 🧹 Cleanup old meteors
  useEffect(() => {
    const cleanup = setInterval(() => {
      setBeams((prev) => prev.slice(-60));
    }, 5000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-black">
      {/* Grid Background (light) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
        }}
      />

      {/* Grid Background (dark) */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage:
            "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #024e6b 1px, transparent 1px)",
        }}
      />

      {/* Center fade mask */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black 
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />

      {/* Meteor Beams */}
      {beams.map((b) => (
        <motion.div
          key={b.id}
          className="absolute top-0"
          style={{ left: b.x, zIndex: 2 }}
          initial={{ y: -150 }}
          animate={{ y: pageHeight + 200 }} // full page fall
          transition={{
            duration: b.duration, // 👈 slow smooth fall
            ease: "linear",
          }}
          onAnimationComplete={() =>
            setBeams((prev) => prev.filter((beam) => beam.id !== b.id))
          }
        >
          <div
            className="h-14 w-px rounded-full
              bg-gradient-to-t from-black to-transparent
              dark:from-indigo-400 dark:via-teal-500 dark:to-transparent"
            style={{ margin: "0 auto" }}
          />
        </motion.div>
      ))}

      {/* Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
