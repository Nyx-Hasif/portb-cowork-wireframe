"use client";
import React, { useState } from "react";
import Image from "next/image"; // ✅ ADDED: Import Next.js Image
import {
  Utensils,
  Coffee,
  Sun,
  CloudMoon,
  Check,
  Info,
  CalendarCheck,
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
        "https://images.unsplash.com/photo-1593560734541-5843c7518f66?q=80&w=800&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=800&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=800&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
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

  const tabConfigs = {
    breakfast: { icon: <Coffee size={14} />, label: "Breakfast" },
    lunch: { icon: <Sun size={14} />, label: "Lunch" },
    teatime: { icon: <CloudMoon size={14} />, label: "Tea Time" },
  };

  return (
    <section
      id="food-menu"
      className="py-16 md:py-20 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header with Contextual Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-white/20"></div>
              <span className="text-[10px] uppercase tracking-[0.8em] text-gray-500 font-medium">
                Event Catering Add-ons
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-[0.9] mb-6">
              CATERING <br />
              <span className="italic text-gray-400">PACKAGES.</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-start gap-4 p-4 border border-white/10 bg-white/5 max-w-sm">
                <Info size={18} className="text-gray-400 mt-1 shrink-0" />
                <p className="text-[10px] text-gray-300 uppercase tracking-widest leading-relaxed">
                  Available exclusively for Meeting Room, Green Area & Event
                  Space bookings. Prices listed are per pax.
                </p>
              </div>
              <div className="flex items-start gap-4 p-4 border border-white/10 bg-white/5 max-w-sm">
                <Box size={18} className="text-gray-400 mt-1 shrink-0" />
                <p className="text-[10px] text-gray-300 uppercase tracking-widest leading-relaxed">
                  Complimentary serving setup & cutlery included for all
                  buffet-style orders.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="flex bg-zinc-900 p-1 rounded-sm border border-white/10 w-full lg:w-auto">
            {(["breakfast", "lunch", "teatime"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 text-[10px] uppercase tracking-widest transition-all duration-500 ${
                  activeTab === tab
                    ? "bg-white text-black font-bold"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tabConfigs[tab].icon}
                {tabConfigs[tab].label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {menuData[activeTab].map((pkg, idx) => (
            <div
              key={pkg.id}
              className="group bg-white/5 border border-white/10 overflow-hidden flex flex-col animate-fadeUp transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* ✅ UPDATED: Visual Cover with Next.js Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  priority={idx === 0} // ✅ First visible image gets priority
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/10">
                  <span className="text-xs font-serif text-white">
                    RM {pkg.price} / Pax
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="text-[9px] uppercase tracking-widest bg-white/10 text-white/60 px-2 py-1 backdrop-blur-md flex items-center gap-1">
                    <Users size={10} /> Min {pkg.minPax} Pax
                  </span>
                  <span className="text-[9px] uppercase tracking-widest bg-black/40 text-white px-2 py-1 backdrop-blur-md border border-white/10">
                    {pkg.idealFor}
                  </span>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mb-2 block">
                    {pkg.subtitle}
                  </span>
                  <h3 className="text-3xl font-serif text-white">
                    {pkg.title}
                  </h3>
                </div>

                {/* Meta Info */}
                <div className="flex gap-6 mb-5 border-y border-white/5 py-3">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-gray-500 block mb-1">
                      Service Style
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-300">
                      {pkg.setup}
                    </span>
                  </div>
                </div>

                {/* Inclusion List */}
                <div className="flex-1 space-y-3 mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 block mb-2">
                    Package Includes:
                  </span>
                  {pkg.inclusions.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Check
                        size={12}
                        className="text-gray-400 mt-1 shrink-0"
                      />
                      <span className="text-[11px] uppercase tracking-widest text-gray-300 group-hover:text-gray-200 transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-[0.5em] text-white font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4">
                  <CalendarCheck size={14} /> Add to My Event Space
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Catering Support Footer */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10 bg-white/5 border border-white/10 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-6 mb-3">
              <Utensils size={32} className="text-gray-400" />
              <h4 className="text-2xl font-serif text-white">
                Full Event Customization
              </h4>
            </div>
            <p className="text-sm text-gray-300 font-light max-w-2xl leading-relaxed uppercase tracking-widest">
              Our kitchen can accommodate specific dietary needs including
              Halal, Vegetarian, and Gluten-Free requirements. For events larger
              than 25 pax, custom bespoke menus are available upon request.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end gap-4 flex-col sm:flex-row">
            <button className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gray-200 shadow-2xl transition-all">
              Contact Catering Lead
            </button>
            <button className="px-10 py-5 border border-white/10 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white/5 transition-all">
              Download Menu PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodMenu;
