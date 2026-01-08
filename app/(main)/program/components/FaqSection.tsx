// app/(main)/program/components/FaqSection.tsx

"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/types";
import { Plus, Minus } from "lucide-react";

interface FaqSectionProps {
  items: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`transition-all duration-300 border-b border-neutral-100 group ${
              isOpen
                ? "bg-neutral-50/50 -mx-4 px-4"
                : "hover:bg-neutral-50/30 active:bg-neutral-50 -mx-4 px-4"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between text-left group py-6 sm:py-8 outline-none"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <span
                  className={`text-xs font-black tracking-widest mt-1.5 transition-colors ${
                    isOpen ? "text-black" : "text-neutral-300"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight transition-all duration-300 ${
                    isOpen
                      ? "text-black"
                      : "text-neutral-400 md:group-hover:text-black group-active:text-black"
                  }`}
                >
                  {item.question}
                </span>
              </div>
              <div
                className={`p-1.5 sm:p-2 transition-all duration-500 shrink-0 ${
                  isOpen
                    ? "rotate-180 bg-black text-white"
                    : "bg-neutral-100 text-neutral-400 md:group-hover:text-black md:group-hover:bg-neutral-200 active:scale-90"
                }`}
              >
                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen
                  ? "max-h-[500px] opacity-100 pb-8 sm:pb-12"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex gap-4 sm:gap-6">
                <div className="w-[28px] sm:w-[34px] flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqSection;
