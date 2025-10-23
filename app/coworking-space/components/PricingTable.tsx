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
    <section className="w-full max-w-[1100px] mx-auto px-4 md:py-10 py-8">
      {/* PLAN BUTTONS */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
        {/* Daily dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleButton}
            className={`px-6 py-2 rounded-md border font-medium transition
              ${
                activePlan === "daily"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
          >
            {activePlan === "daily" ? buttonDisplay : "Daily"}
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow z-10">
              {["1 Hour", "4 Hour", "8 Hour"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt as Plan)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-black hover:text-white"
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
            className={`px-6 py-2 rounded-md border font-medium transition
              ${
                activePlan === p.toLowerCase()
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {cards.map((item, index) => {
          // basic span for all cards
          let colClass = "md:col-span-2 lg:col-span-2";

          // 🟢 Medium (tablet) layout (1-2 | 3-4 | 5 center)
          if (index === 0) colClass += " md:col-start-1";
          if (index === 1) colClass += " md:col-start-3";
          if (index === 2) colClass += " md:col-start-1 md:row-start-2";
          if (index === 3) colClass += " md:col-start-3 md:row-start-2";
          if (index === 4) colClass += " md:col-start-2 md:row-start-3";

          // 🖥️ Large layout (1-2-3 top | 4-5 centered below)
          if (index === 0) colClass += " lg:col-start-1 lg:row-start-1";
          if (index === 1) colClass += " lg:col-start-3 lg:row-start-1";
          if (index === 2) colClass += " lg:col-start-5 lg:row-start-1";
          if (index === 3) colClass += " lg:col-start-2 lg:row-start-2";
          if (index === 4) colClass += " lg:col-start-4 lg:row-start-2";

          return (
            <div
              key={item.id}
              className={`border rounded-xl shadow-sm hover:shadow-lg overflow-hidden bg-white flex flex-col transition-all ${colClass}`}
            >
              {/* IMAGE */}
              <div className="relative w-full h-56">
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* BODY */}
              <div className="flex flex-col flex-1 p-6 space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {item.category}
                </h2>
                <p className="text-gray-600">{item.description}</p>

                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-1 text-sm text-gray-700 flex-1">
                  {item.list.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>✓</span>
                      <span>{f.replace(/^✅/g, "").trim()}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto text-center border-t border-gray-100 pt-5">
                  <p className="text-3xl font-bold mb-3">
                    {item.pricing[selected]}
                  </p>
                  <button className="w-full px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition-colors font-medium">
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
