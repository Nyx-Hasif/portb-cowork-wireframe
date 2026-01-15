// app/(main)/program/components/FaqSection.tsx

"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/types";
import { ArrowRight, Plus, Minus } from "lucide-react";

interface FaqSectionProps {
  items: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* LEFT COLUMN: Question List */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                className={`group border-b border-neutral-100 lg:border-none transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-50/50 lg:bg-transparent"
                    : "hover:bg-neutral-50"
                }`}
              >
                {/* Button Header */}
                <button
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full flex items-center justify-between text-left py-5 sm:py-6 px-4 lg:px-0 lg:py-4 transition-all duration-300 outline-none ${
                    isActive ? "lg:translate-x-4" : "lg:hover:translate-x-2"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`text-xs font-black tracking-widest transition-colors ${
                        isActive
                          ? "text-black"
                          : "text-neutral-300 group-hover:text-neutral-400"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-black uppercase tracking-tight transition-colors ${
                        isActive
                          ? "text-black"
                          : "text-neutral-400 group-hover:text-black"
                      }`}
                    >
                      {item.question}
                    </span>
                  </div>

                  {/* Icon: Arrow for Desktop, Plus/Minus for Mobile */}
                  <div className="shrink-0 ml-4">
                    {/* Desktop Icon */}
                    <div
                      className={`hidden lg:block transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <ArrowRight size={16} />
                    </div>

                    {/* Mobile Icon */}
                    <div
                      className={`block lg:hidden p-1.5 transition-all duration-300 ${
                        isActive
                          ? "bg-black text-white rotate-180"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {isActive ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </div>
                </button>

                {/* MOBILE ONLY: Accordion Content */}
                <div
                  className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    isActive
                      ? "max-h-[500px] opacity-100 pb-8"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex gap-4 px-4">
                    <div className="w-[28px] shrink-0"></div>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Desktop Content Display (Sticky) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col pt-4">
          <div className="sticky top-24 min-h-[300px] bg-neutral-50 p-10 rounded-sm border border-neutral-100/50">
            {/* Key changes to trigger animation on index change */}
            <div
              key={activeIndex}
              className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="flex items-baseline gap-4 mb-6 opacity-30">
                <span className="text-6xl font-black tracking-tighter text-neutral-900">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">
                {items[activeIndex].question}
              </h3>

              <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl">
                {items[activeIndex].answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
