"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Coffee,
  Sun,
  CloudMoon,
  Info,
  Box,
  Users,
} from "lucide-react";

interface MenuPackage {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  inclusions: string[];
  image: string;
  minPax: number;
  setup: string;
  idealFor: string;
}

const menuData: Record<"breakfast" | "lunch" | "teatime", MenuPackage[]> = {
  breakfast: [
    {
      id: "b1",
      title: "Continental Lite",
      subtitle: "Package A: Sandwiches & Cakes",
      price: "10",
      inclusions: [
        "Tuna Sandwich (2 pcs)",
        "Cake Slice (2 pcs)",
        "Premium Hot Tea or Coffee",
      ],
      image:
        "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=800&auto=format&fit=crop",
      minPax: 5,
      setup: "Individual Box / Platter Style",
      idealFor: "Morning Briefings",
    },
    {
      id: "b2",
      title: "Local Favorite",
      subtitle: "Package B: Hot Savory Start",
      price: "10",
      inclusions: [
        "Mihun Goreng (Traditional Style)",
        "Cake Slice (2 pcs)",
        "Premium Hot Tea or Coffee",
      ],
      image:
        "https://images.unsplash.com/photo-1741243412484-558eb91fe8c7?q=80&w=800&auto=format&fit=crop",
      minPax: 5,
      setup: "Buffet Style / Individual Box",
      idealFor: "Local Workshops",
    },
  ],
  lunch: [
    {
      id: "l1",
      title: "Beriani Royale",
      subtitle: "The Signature Lunch",
      price: "15",
      inclusions: [
        "Nasi Hujan Panas / Beriani",
        "Lauk Ayam Pedas + Sambal",
        "Timun Ulam & Dalca",
        "Fresh Fruits (Seasonal)",
        "Premium Air Kordial",
      ],
      image:
        "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?q=80&w=800&auto=format&fit=crop",
      minPax: 10,
      setup: "Executive Buffet Layout",
      idealFor: "Corporate Training",
    },
    {
      id: "l2",
      title: "Daging Kerutuk",
      subtitle: "Traditional Heritage Menu",
      price: "18",
      inclusions: [
        "Nasi Hujan Panas / Beriani",
        "Lauk Daging Kerutuk Signature",
        "Sambal + Ulam Timun",
        "Fresh Fruits (Seasonal)",
        "Premium Air Kordial",
      ],
      image:
        "https://images.unsplash.com/photo-1740993382497-65dba6c7a689?q=80&w=800&auto=format&fit=crop",
      minPax: 10,
      setup: "Full Buffet Service",
      idealFor: "VIP Meetings",
    },
    {
      id: "l3",
      title: "Port B Nasi Ayam",
      subtitle: "Executive Quick Lunch",
      price: "12",
      inclusions: [
        "Signature Roasted Chicken Rice",
        "Soup & Chili Sauce",
        "Fresh Fruits (Seasonal)",
        "Premium Air Kordial",
      ],
      image:
        "https://images.unsplash.com/photo-1666239308347-4292ea2ff777?q=80&w=800&auto=format&fit=crop",
      minPax: 5,
      setup: "Grab & Go Packed Box",
      idealFor: "Quick Working Lunches",
    },
  ],
  teatime: [
    {
      id: "t1",
      title: "Artisan Hi-Tea",
      subtitle: "Afternoon Sweet & Savory",
      price: "10",
      inclusions: [
        "Blueberry Tart / Cream Puff",
        "Tuna Sandwich",
        "Fresh Sliced Fruits",
        "Hot/Cold Beverage",
      ],
      image:
        "https://plus.unsplash.com/premium_photo-1663133727215-bf732c62d681?q=80&w=800&auto=format&fit=crop",
      minPax: 5,
      setup: "Tiered Stand / Individual Box",
      idealFor: "Networking Sessions",
    },
  ],
};

const FoodMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"breakfast" | "lunch" | "teatime">(
    "breakfast"
  );
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardInteraction = (cardId: string) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <section
      id="food-menu"
      className="py-20 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with Contextual Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div className="w-full max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-12 h-px bg-zinc-300"></div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.8em] text-zinc-500 font-bold">
                Event Catering Add-ons
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-zinc-900 tracking-tighter leading-[0.9] mb-8">
              CATERING <br />
              <span className="italic text-zinc-400">PACKAGES.</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex items-start gap-3 sm:gap-4 p-5 border border-zinc-200 bg-white w-full md:max-w-sm shadow-sm">
                <Info
                  size={16}
                  className="text-zinc-900 mt-1 shrink-0 sm:w-[18px] sm:h-[18px]"
                />
                <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wide sm:tracking-widest leading-relaxed font-medium">
                  Available exclusively for Meeting Room, Green Area & Event
                  Space bookings. Prices listed are per pax.
                </p>
              </div>

              <div className="flex items-start gap-3 sm:gap-4 p-5 border border-zinc-200 bg-white w-full md:max-w-sm shadow-sm">
                <Box
                  size={16}
                  className="text-zinc-900 mt-1 shrink-0 sm:w-[18px] sm:h-[18px]"
                />
                <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-wide sm:tracking-widest leading-relaxed font-medium">
                  Complimentary serving setup & cutlery included for all
                  buffet-style orders.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Tabs - REDESIGNED (Compact Version) */}
          <div className="relative w-full lg:w-auto">
            <div className="relative bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full lg:w-auto">
              {/* Active Indicator Background - Slides behind tabs */}
              <div
                className={`absolute top-0 h-full bg-zinc-900 transition-all duration-500 ease-out ${
                  activeTab === "breakfast"
                    ? "left-0 w-1/3"
                    : activeTab === "lunch"
                    ? "left-1/3 w-1/3"
                    : "left-2/3 w-1/3"
                }`}
              ></div>

              {/* Tabs Container */}
              <div className="relative flex">
                {/* Breakfast Tab */}
                <button
                  onClick={() => setActiveTab("breakfast")}
                  className={`group relative flex-1 lg:flex-none px-4 lg:px-6 py-4 transition-all duration-500 cursor-pointer ${
                    activeTab === "breakfast"
                      ? "text-white"
                      : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        activeTab === "breakfast"
                          ? "border-white bg-white/10"
                          : "border-zinc-300 group-hover:border-zinc-900"
                      }`}
                    >
                      <Coffee
                        size={14}
                        className={
                          activeTab === "breakfast"
                            ? "text-white"
                            : "text-zinc-600 group-hover:text-zinc-900"
                        }
                      />
                    </div>
                    
                    {/* Text */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                          activeTab === "breakfast"
                            ? "text-white"
                            : "text-zinc-900"
                        }`}
                      >
                        Breakfast
                      </span>
                      <span
                        className={`text-[8px] uppercase tracking-wider transition-all ${
                          activeTab === "breakfast"
                            ? "text-white/60"
                            : "text-zinc-400"
                        }`}
                      >
                        Morning
                      </span>
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative w-px bg-zinc-200 my-3"></div>

                {/* Lunch Tab */}
                <button
                  onClick={() => setActiveTab("lunch")}
                  className={`group relative flex-1 lg:flex-none px-4 lg:px-6 py-4 transition-all duration-500 cursor-pointer ${
                    activeTab === "lunch"
                      ? "text-white"
                      : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        activeTab === "lunch"
                          ? "border-white bg-white/10"
                          : "border-zinc-300 group-hover:border-zinc-900"
                      }`}
                    >
                      <Sun
                        size={14}
                        className={
                          activeTab === "lunch"
                            ? "text-white"
                            : "text-zinc-600 group-hover:text-zinc-900"
                        }
                      />
                    </div>
                    
                    {/* Text */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                          activeTab === "lunch"
                            ? "text-white"
                            : "text-zinc-900"
                        }`}
                      >
                        Lunch
                      </span>
                      <span
                        className={`text-[8px] uppercase tracking-wider transition-all ${
                          activeTab === "lunch"
                            ? "text-white/60"
                            : "text-zinc-400"
                        }`}
                      >
                        Afternoon
                      </span>
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative w-px bg-zinc-200 my-3"></div>

                {/* Tea Time Tab */}
                <button
                  onClick={() => setActiveTab("teatime")}
                  className={`group relative flex-1 lg:flex-none px-4 lg:px-6 py-4 transition-all duration-500 cursor-pointer ${
                    activeTab === "teatime"
                      ? "text-white"
                      : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2.5">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        activeTab === "teatime"
                          ? "border-white bg-white/10"
                          : "border-zinc-300 group-hover:border-zinc-900"
                      }`}
                    >
                      <CloudMoon
                        size={14}
                        className={
                          activeTab === "teatime"
                            ? "text-white"
                            : "text-zinc-600 group-hover:text-zinc-900"
                        }
                      />
                    </div>
                    
                    {/* Text */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                          activeTab === "teatime"
                            ? "text-white"
                            : "text-zinc-900"
                        }`}
                      >
                        Tea Time
                      </span>
                      <span
                        className={`text-[8px] uppercase tracking-wider transition-all ${
                          activeTab === "teatime"
                            ? "text-white/60"
                            : "text-zinc-400"
                        }`}
                      >
                        Evening
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Pulse Indicator for Active Tab */}
              <div
                className={`absolute -top-1.5 transition-all duration-500 ${
                  activeTab === "breakfast"
                    ? "left-1/6"
                    : activeTab === "lunch"
                    ? "left-1/2"
                    : "left-5/6"
                } -translate-x-1/2`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900"></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {menuData[activeTab].map((pkg, idx) => {
            const isActive = activeCard === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => handleCardInteraction(pkg.id)}
                onTouchStart={() => handleCardInteraction(pkg.id)}
                // Card Container
                className={`group flex flex-col animate-fadeUp transition-all duration-500 cursor-pointer relative bg-white border ${
                  isActive
                    ? "border-zinc-400 shadow-xl ring-1 ring-zinc-200"
                    : "border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1"
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Visual Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-all duration-[1.5s] ease-in-out ${
                      isActive
                        ? "scale-105"
                        : "group-hover:scale-105"
                    }`}
                    priority={idx === 0}
                  />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg border border-white/20">
                    <span className="text-xs font-serif text-zinc-900 font-bold">
                      RM {pkg.price} <span className="text-zinc-500 font-sans font-normal text-[10px] uppercase">/ Pax</span>
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    <span className="text-[9px] uppercase tracking-widest bg-zinc-900/90 text-white px-3 py-1.5 backdrop-blur-md flex items-center gap-1 shadow-md">
                      <Users size={10} /> Min {pkg.minPax} Pax
                    </span>
                    <span className="text-[9px] uppercase tracking-widest bg-white/90 text-zinc-800 px-3 py-1.5 backdrop-blur-md shadow-md font-bold">
                      {pkg.idealFor}
                    </span>
                  </div>
                </div>

                {/* Information Body */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 mb-2 block font-bold">
                      {pkg.subtitle}
                    </span>
                    <h3 className="text-3xl font-serif text-zinc-900 group-hover:text-black transition-colors">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Meta Info */}
                  <div className="flex gap-6 mb-6 border-y border-zinc-100 py-4">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-zinc-400 block mb-1 font-bold">
                        Service Style
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
                        {pkg.setup}
                      </span>
                    </div>
                  </div>

                  {/* Inclusion List - Full Height */}
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 block mb-3 font-bold">
                      Package Includes:
                    </span>
                    {pkg.inclusions.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 group/item">
                        <div className="mt-1 w-1 h-1 bg-zinc-300 rounded-full group-hover/item:bg-zinc-900 transition-colors"></div>
                        <span
                          className={`text-[11px] uppercase tracking-widest transition-colors ${
                            isActive
                              ? "text-zinc-900 font-medium"
                              : "text-zinc-500 group-hover:text-zinc-800"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* External Food Policy Warning - Red Border (Responsive) */}
        <div className="mt-16 bg-red-50 border-2 border-red-500 relative overflow-hidden shadow-lg">
          {/* Top Red Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
          
          {/* Decorative Blur - Hidden on mobile */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-100/30 rounded-full blur-3xl pointer-events-none hidden md:block"></div>
          
          <div className="relative z-10 p-5 md:p-8">
            {/* Header Section */}
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h4 className="text-sm md:text-base lg:text-lg font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] text-red-700 mb-2">
                  External Catering Policy
                </h4>
                <p className="text-[10px] md:text-[11px] lg:text-xs text-red-600 leading-relaxed mb-3">
                  Bringing <span className="font-bold text-red-700">external catering services or large-scale food setups</span> (buffets, event meals, bulk orders) will incur a{" "}
                  <span className="font-bold text-red-700">RM100 cleaning service fee</span>. 
                  This covers deep cleaning, waste management, and maintaining premium hygiene standards.
                </p>
                <p className="text-[9px] md:text-[10px] text-emerald-700 leading-relaxed bg-emerald-50 px-3 py-2 border-l-2 border-emerald-500">
                  ✓ Personal meals, snacks, coffee & light refreshments are{" "}
                  <span className="font-bold">welcome anytime</span> at no extra charge!
                </p>
              </div>
            </div>

            {/* Divider - Hidden on mobile */}
            <div className="hidden md:block w-full h-px bg-red-200 my-4"></div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5 md:mt-0">
              {/* Left Side - Optional Text (hidden on small mobile) */}
              <div className="hidden sm:block">
                <p className="text-[9px] md:text-[10px] uppercase tracking-wider text-red-500 font-medium">
                  💡 Planning an event?
                </p>
              </div>

              {/* Right Side - CTA Badge */}
              <div className="w-full sm:w-auto">
                <div className="flex items-center justify-between sm:justify-center gap-3 px-4 md:px-6 py-3 md:py-4 bg-white border-2 border-red-500 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-red-500">
                      Smart Choice:
                    </span>
                    <span className="text-[10px] md:text-[11px] uppercase tracking-wide text-zinc-700 font-medium">
                      Our catering packages
                    </span>
                  </div>
                  <span className="text-[10px] md:text-[11px] uppercase tracking-wide text-red-600 font-bold whitespace-nowrap">
                    — No fees!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodMenu;
  