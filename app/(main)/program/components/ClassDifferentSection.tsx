// app/(main)/program/components/ClassDifferentSection.tsx

"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { EnglishClassMethod } from "@/types/types";

interface ClassDifferentSectionProps {
  methods: EnglishClassMethod[];
}

export function ClassDifferentSection({ methods }: ClassDifferentSectionProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragDirection, setDragDirection] = useState<null | "left" | "right">(
    null,
  );
  const total = methods.length;

  // Touch/swipe refs
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setIndex((next + total) % total);
      setTimeout(() => {
        setIsAnimating(false);
        setDragDirection(null);
      }, 500);
    },
    [isAnimating, total],
  );

  const prev = () => {
    setDragDirection("right");
    goTo(index - 1);
  };

  const next = () => {
    setDragDirection("left");
    goTo(index + 1);
  };

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  // Mouse drag handlers (desktop)
  const mouseStartX = useRef<number>(0);
  const isMouseDragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isMouseDragging.current = true;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDragging.current) return;
    isMouseDragging.current = false;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
  };

  const onMouseLeave = () => {
    isMouseDragging.current = false;
  };

  // Visible offsets
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <section className="w-full bg-white text-neutral-900 overflow-hidden">
      <div className="mx-auto grid max-w-[87.5rem] grid-cols-1 items-center gap-0 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:py-28">
        {/* ======================== */}
        {/* LEFT — Text Content      */}
        {/* ======================== */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-neutral-700">
            NOT YOUR TYPICAL ENGLISH CLASS
          </p>
          <h2 className="mt-6 font-black uppercase leading-[0.95] tracking-tight text-neutral-950 text-5xl sm:text-6xl lg:text-7xl">
            How is the
            <br />
            class
            <br />
            different?
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-700">
            Instead of only focusing on grammar drills and memorising answers,
            students learn English through real, meaningful activities.
          </p>

          {/* Quote box */}
          <div className="mt-10 max-w-md">
            <div className="ml-2 h-px w-28 bg-neutral-900" />
            <div className="mt-2 ml-2 h-px w-16 bg-neutral-900" />
            <div className="relative mt-3 border border-neutral-900 px-6 py-5">
              <p className="text-[15px] italic leading-relaxed text-neutral-800">
                <span className="mr-1">&ldquo;</span>The goal is not just for
                students to{" "}
                <strong className="font-bold not-italic">know English</strong>.
                The goal is for students to{" "}
                <strong className="font-bold not-italic">use English</strong>
                .&rdquo;
              </p>
            </div>
            <div className="ml-auto mt-2 mr-2 h-px w-28 bg-neutral-900" />
            <div className="ml-auto mt-2 mr-2 h-px w-16 bg-neutral-900" />
          </div>
        </div>

        {/* ======================== */}
        {/* RIGHT — 3D Card Stack    */}
        {/* ======================== */}
        <div className="flex flex-col items-center  w-full min-w-0">
          {/* Card Stack Wrapper — overflow hidden prevent bleed */}
          <div
            className="relative w-full "
            style={{ height: "clamp(20rem, 55vw, 38rem)" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          >
            {/* Inner 3D scene — clipped inside wrapper */}
            <div
              className="absolute inset-0 flex items-center justify-center select-none"
              style={{ perspective: "1200px" }}
            >
              {offsets.map((off) => {
                const i = (index + off + total) % total;
                const abs = Math.abs(off);

                // Desktop spread
                const spreadDesktop = 130;

                // Use CSS clamp via inline for spread
                const translateX = off * spreadDesktop;

                const rotateY = off * -16;
                const scale = 1 - abs * 0.08;
                const z = 50 - abs * 10;
                const opacity = abs >= 3 ? 0 : 1 - abs * 0.15;

                // Slide-in animation offset based on drag direction
                const slideOffset =
                  dragDirection === "left"
                    ? -20
                    : dragDirection === "right"
                      ? 20
                      : 0;

                return (
                  <div
                    key={`${i}-${off}`}
                    onClick={() =>
                      !isAnimating && goTo((index + off + total) % total)
                    }
                    className="absolute cursor-pointer will-change-transform"
                    style={{
                      // Desktop
                      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex: z,
                      opacity,
                      transition: isAnimating
                        ? `transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                           opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                        : "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 500ms",
                      // Slide hint when animating
                      ...(isAnimating && off === 0
                        ? {
                            transform: `translateX(${translateX + slideOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                          }
                        : {}),
                    }}
                  >
                    <div className="overflow-hidden bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] ring-1 ring-neutral-200 rounded-sm">
                      <Image
                        src={methods[i].imageUrl}
                        alt={methods[i].label}
                        width={1024}
                        height={1536}
                        loading="lazy"
                        className="block object-cover pointer-events-none"
                        style={{
                          width: "clamp(7rem, 16vw, 17.5rem)",
                          height: "clamp(10.5rem, 24vw, 26.25rem)",
                        }}
                        draggable={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile spread override — tighter translateX via CSS var */}
            <style jsx>{`
              @media (max-width: 640px) {
                .card-item {
                  --spread: 70px;
                }
              }
            `}</style>
          </div>

          {/* ======================== */}
          {/* Controls                 */}
          {/* ======================== */}
          <div className="flex flex-col gap-2 items-center w-full">
            {/* Counter */}
            <span className="text-xs tracking-widest text-neutral-400 font-medium uppercase">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>

            {/* Arrows + Dots */}
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              {/* Prev */}
              <button
                onClick={prev}
                aria-label="Previous"
                disabled={isAnimating}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all duration-200 active:scale-90 disabled:opacity-40 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>

              {/* Dots */}
              <div className="lg:flex items-center gap-1.5 sm:gap-2 hidden ">
                {methods.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 flex-shrink-0
                      ${
                        i === index
                          ? "bg-neutral-900 w-6 h-2 sm:w-6 sm:h-2 lg:w-5 lg:h-1.5"
                          : "bg-neutral-300 hover:bg-neutral-500 w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-2 lg:h-1.5"
                      }`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                onClick={next}
                aria-label="Next"
                disabled={isAnimating}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all duration-200 active:scale-90 disabled:opacity-40 flex-shrink-0"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
