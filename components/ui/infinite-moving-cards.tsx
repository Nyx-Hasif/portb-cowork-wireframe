"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

interface Item {
  quote: string;
  name: string;
  title: string;
  image?: string;
}

interface Props {
  items: Item[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: Props) {
  const scrollSpeed =
    speed === "fast" ? "25s" : speed === "slow" ? "70s" : "45s";

  /** pick keyframes name for direction */
  const animationName = direction === "right" ? "scroll-x-reverse" : "scroll-x";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none py-6",
        className
      )}
    >
      <div
        className={cn(
          "flex gap-6 w-max",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationName,
          animationDuration: scrollSpeed,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {/* render twice for seamless loop */}
        {[...Array(2)].map((_, loopIdx) =>
          items.map((item, i) => (
            <div
              key={`${loopIdx}-${i}`}
              className="w-[280px] sm:w-[340px] md:w-[400px] shrink-0"
            >
              <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow h-55 flex flex-col justify-between">
                <div className="flex items-start gap-3 mb-4">
                  {/* avatar */}
                  <div className="relative h-15 w-15 overflow-hidden rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-500 font-semibold">
                        {item.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  {/* name */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      {item.title}
                    </p>
                  </div>
                </div>
                    {/* quote */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4">
                  “{item.quote}”
                </p>
              </article>
            </div>
          ))
        )}
      </div>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-x-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
