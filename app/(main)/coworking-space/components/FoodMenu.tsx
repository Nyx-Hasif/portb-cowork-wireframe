
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

  const tabConfigs = {
    breakfast: { icon: <Coffee size={14} />, label: "Breakfast" },
    lunch: { icon: <Sun size={14} />, label: "Lunch" },
    teatime: { icon: <CloudMoon size={14} />, label: "Tea Time" },
  };

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

          {/* Interactive Tabs */}
          <div className="flex bg-zinc-900 p-1.5 rounded-sm shadow-xl w-full lg:w-auto">
            {(["breakfast", "lunch", "teatime"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 cursor-pointer lg:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest transition-all duration-500 rounded-sm ${
                  activeTab === tab
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white active:text-white"
                }`}
              >
                <span className="hidden sm:inline">{tabConfigs[tab].icon}</span>
                <span className="whitespace-nowrap">
                  {tabConfigs[tab].label}
                </span>
              </button>
            ))}
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
                    // ✅ FIXED: Removed grayscale class. Added scale effect on hover/active only.
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
      </div>
    </section>
  );
};

export default FoodMenu;