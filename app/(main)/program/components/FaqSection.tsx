// app/(main)/program/components/FaqSection.tsx

"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/types";
import { Plus, Minus } from "lucide-react";

interface FaqSectionProps {
  items: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  // Split into 2 columns for desktop
  const half = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  return (
    <div className="w-full">
      {/* ================================ */}
      {/* MOBILE & TABLET: Single Column   */}
      {/* ================================ */}
      <div className="flex flex-col lg:hidden divide-y divide-neutral-100 border-t border-neutral-100">
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div key={idx} className="group">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left py-4 px-1 gap-4 transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-black tracking-widest text-neutral-300 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm font-bold uppercase tracking-tight transition-colors leading-snug ${
                      isActive
                        ? "text-black"
                        : "text-neutral-500 group-hover:text-black"
                    }`}
                  >
                    {item.question}
                  </span>
                </div>
                <div
                  className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "bg-black border-black text-white"
                      : "border-neutral-200 text-neutral-400 group-hover:border-black group-hover:text-black"
                  }`}
                >
                  {isActive ? <Minus size={12} /> : <Plus size={12} />}
                </div>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-in-out ${
                  isActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-neutral-500 leading-relaxed pb-5 pl-7 pr-2">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================ */}
      {/* DESKTOP: 2-Column Accordion      */}
      {/* ================================ */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Left Column */}
        <div className="flex flex-col divide-y divide-neutral-100 border-t border-neutral-100">
          {leftItems.map((item, idx) => {
            const realIdx = idx;
            const isActive = activeIndex === realIdx;
            return (
              <div key={realIdx} className="group">
                <button
                  onClick={() => toggle(realIdx)}
                  className="w-full flex items-center justify-between text-left py-4 gap-4 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-black tracking-widest text-neutral-300 shrink-0">
                      {String(realIdx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-bold uppercase tracking-tight transition-colors leading-snug ${
                        isActive
                          ? "text-black"
                          : "text-neutral-500 group-hover:text-black"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "bg-black border-black text-white"
                        : "border-neutral-200 text-neutral-400 group-hover:border-black group-hover:text-black"
                    }`}
                  >
                    {isActive ? <Minus size={11} /> : <Plus size={11} />}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-neutral-500 leading-relaxed pb-5 pl-7 pr-2">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col divide-y divide-neutral-100 border-t border-neutral-100">
          {rightItems.map((item, idx) => {
            const realIdx = idx + half;
            const isActive = activeIndex === realIdx;
            return (
              <div key={realIdx} className="group">
                <button
                  onClick={() => toggle(realIdx)}
                  className="w-full flex items-center justify-between text-left py-4 gap-4 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-black tracking-widest text-neutral-300 shrink-0">
                      {String(realIdx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-bold uppercase tracking-tight transition-colors leading-snug ${
                        isActive
                          ? "text-black"
                          : "text-neutral-500 group-hover:text-black"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? "bg-black border-black text-white"
                        : "border-neutral-200 text-neutral-400 group-hover:border-black group-hover:text-black"
                    }`}
                  >
                    {isActive ? <Minus size={11} /> : <Plus size={11} />}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isActive ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-neutral-500 leading-relaxed pb-5 pl-7 pr-2">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
