// infinite-moving-cards.tsx
"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for seamless loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Set direction
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }

      // Set speed
      const duration =
        speed === "fast" ? "20s" : speed === "slow" ? "80s" : "40s";
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-5 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[300px] sm:w-[340px] shrink-0 will-change-transform"
          >
            <article className="group relative rounded-2xl bg-[#f8f9fb] border border-gray-100 p-6 h-[200px] flex flex-col transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-1">
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200 group-hover:text-gray-300 transition-colors" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                {item.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-gray-200 to-gray-300 ring-2 ring-white">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-600 font-medium text-sm">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{item.title}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
