"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cards } from "@/data/pricingData";
import type { Plan } from "@/data/pricingData";

export default function PricingTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Plan>("1 Hour");
  const [activePlan, setActivePlan] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const [buttonDisplay, setButtonDisplay] = useState("Daily");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleButton = () => setIsOpen((p) => !p);
  const handleOptionClick = (v: Plan) => {
    setSelected(v);
    setButtonDisplay(v);
    setActivePlan("daily");
    setIsOpen(false);
  };
  const handleClickButton = (
    period: Plan,
    type: "weekly" | "monthly" | "yearly",
    txt: string
  ) => {
    setSelected(period);
    setActivePlan(type);
    setButtonDisplay(txt);
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <section className="w-full max-w-[1300px] mx-auto px-6 md:py-20 py-12">
      {/* PLAN BUTTONS */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-12">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleButton}
            className={`px-6 py-2 rounded-lg border font-medium transition
              ${
                activePlan === "daily"
                  ? "bg-[#004348] text-white border-[#004348]"
                  : "bg-white text-[#004348] border-gray-300 hover:bg-gray-100"
              }`}
          >
            {activePlan === "daily" ? buttonDisplay : "Daily"}
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow z-20">
              {["1 Hour", "4 Hour", "8 Hour"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt as Plan)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#004348] hover:text-white"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {["Weekly", "Monthly", "Yearly"].map((p) => (
          <button
            key={p}
            onClick={() =>
              handleClickButton(
                p as Plan,
                p.toLowerCase() as "weekly" | "monthly" | "yearly",
                p
              )
            }
            className={`px-6 py-2 rounded-lg border font-medium transition
              ${
                activePlan === p.toLowerCase()
                  ? "bg-[#004348] text-white border-[#004348]"
                  : "bg-white text-[#004348] border-gray-300 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* GRID — keeps pyramid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {cards.map((item, index) => {
          let colClass = "md:col-span-2";

          // Tablet (5 items => 2 | 2 | 1 centered)
          if (index === 0) colClass += " md:col-start-1";
          if (index === 1) colClass += " md:col-start-3";
          if (index === 2) colClass += " md:col-start-1 md:row-start-2";
          if (index === 3) colClass += " md:col-start-3 md:row-start-2";
          if (index === 4) colClass += " md:col-start-2 md:row-start-3";

          // Desktop (pyramid 3 top | 2 bottom center)
          if (index === 0) colClass += " lg:col-start-1 lg:row-start-1";
          if (index === 1) colClass += " lg:col-start-3 lg:row-start-1";
          if (index === 2) colClass += " lg:col-start-5 lg:row-start-1";
          if (index === 3) colClass += " lg:col-start-2 lg:row-start-2";
          if (index === 4) colClass += " lg:col-start-4 lg:row-start-2";

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col ${colClass}`}
            >
              {/* IMAGE */}
              <div className="relative w-full h-[260px]">
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* BODY */}
              <div className="flex flex-col flex-1 p-8 space-y-5">
                <div>
                  <h2 className="text-2xl font-semibold text-[#004348] mb-1">
                    {item.category}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700 flex-1 pt-3">
                  {item.list.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#004348] font-semibold">✓</span>
                      <span>{f.replace(/^✅/g, "").trim()}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto text-center border-t border-gray-100 pt-6">
                  <p className="text-4xl font-bold text-[#004348] mb-3">
                    {item.pricing[selected]}
                  </p>
                  <button className="w-full px-6 py-3 bg-[#004348] hover:bg-[#005057] text-white rounded-lg font-medium transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
