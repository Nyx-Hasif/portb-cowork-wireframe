"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cards } from "@/data/pricingData";
import type { Plan } from "@/data/pricingData";
import { Check } from "lucide-react"; // Added icon

export default function PricingTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Plan>("1 Hour");
  const [activePlan, setActivePlan] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const [buttonDisplay, setButtonDisplay] = useState("Daily");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Detect click outside
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

  // Trigger gentle entrance
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full max-w-[1300px] mx-auto px-6 md:py-20 py-12 z-0">
      {/* PLAN BUTTONS */}
      <div
        className={`relative z-10 flex flex-wrap justify-center md:justify-start gap-3 mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleButton}
            className={`px-6 py-2 rounded-lg border font-medium transition-all duration-300 transform hover:scale-105
                ${
                  activePlan === "daily"
                    ? "bg-[#004348] text-white border-[#004348] shadow-lg"
                    : "bg-white text-[#004348] border-gray-300 hover:bg-gray-100"
                }`}
          >
            {activePlan === "daily" ? buttonDisplay : "Daily"}
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-[160px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-dropdown">
              {["1 Hour", "4 Hour", "8 Hour"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt as Plan)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#004348] hover:text-white transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {["Weekly", "Monthly", "Yearly"].map((p, idx) => (
          <button
            key={p}
            onClick={() =>
              handleClickButton(
                p as Plan,
                p.toLowerCase() as "weekly" | "monthly" | "yearly",
                p
              )
            }
            className={`px-6 py-2 rounded-lg border font-medium transition-all duration-300 transform hover:scale-105
                ${
                  activePlan === p.toLowerCase()
                    ? "bg-[#004348] text-white border-[#004348] shadow-lg"
                    : "bg-white text-[#004348] border-gray-300 hover:bg-gray-100"
                }`}
            style={{
              animationDelay: `${(idx + 1) * 100}ms`,
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* GRID — Now explicitly behind dropdown */}
      <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {cards.map((item, index) => {
          let colClass = "md:col-span-2";
          if (index === 0) colClass += " md:col-start-1";
          if (index === 1) colClass += " md:col-start-3";
          if (index === 2) colClass += " md:col-start-1 md:row-start-2";
          if (index === 3) colClass += " md:col-start-3 md:row-start-2";
          if (index === 4) colClass += " md:col-start-2 md:row-start-3";
          if (index === 0) colClass += " lg:col-start-1 lg:row-start-1";
          if (index === 1) colClass += " lg:col-start-3 lg:row-start-1";
          if (index === 2) colClass += " lg:col-start-5 lg:row-start-1";
          if (index === 3) colClass += " lg:col-start-2 lg:row-start-2";
          if (index === 4) colClass += " lg:col-start-4 lg:row-start-2";

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden flex flex-col group hover:-translate-y-2 ${colClass} ${
                isVisible ? "animate-card-fade-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: "both",
              }}
            >
              {/* IMAGE */}
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* BODY */}
              <div className="flex flex-col flex-1 p-8 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[#004348] mb-1 transition-colors duration-300 group-hover:text-[#005057]">
                    {item.category}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* ✅ COOL LIST — compact & glowing */}
                <ul className="space-y-2 flex-1 pt-2">
                  {item.list.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 opacity-0 animate-list-item transition-all duration-300 hover:translate-x-1"
                      style={{
                        animationDelay: `${index * 150 + i * 50 + 200}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#007c84] to-teal-400 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-[0_0_10px_rgba(0,124,132,0.4)] transition-all">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                      <span className="text-gray-700 text-sm leading-snug group-hover:text-[#004348] transition-colors duration-200">
                        {f.replace(/^✅/g, "").trim()}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* FOOTER */}
                <div className="mt-auto text-center border-t border-gray-100 pt-6">
                  <p className="text-4xl font-bold text-[#004348] mb-3 transition-all duration-300 group-hover:scale-110">
                    {item.pricing[selected]}
                  </p>
                  <button className="w-full px-6 py-3 bg-[#004348] hover:bg-[#005057] text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/btn">
                    <span className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 group-hover/btn:left-full"></span>
                    <span className="relative">Book Now</span>
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
