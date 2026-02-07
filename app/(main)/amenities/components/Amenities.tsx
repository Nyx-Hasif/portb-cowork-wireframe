"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Wifi,
  Coffee,
  Droplets,
  Monitor,
  Wrench,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const amenities = [
  {
    icon: <Wifi className="w-5 h-5" />,
    title: "High-Speed WiFi",
    description: "Enterprise-grade fiber with redundant failover.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: "Refreshments",
    description: "Artisan coffee and curated snacks.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: "Surau & WC",
    description: "Clean, minimalist facilities for comfort.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: "Display Tech",
    description: "4K smart screens & wireless casting.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Admin Support",
    description: "On-site help for all your hardware needs.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Prime Location",
    description: "Heart of the city, easily accessible.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Security Access",
    description: "24/7 CCTV ",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
    className: "md:col-span-1 md:row-span-1",
  },
];

const Amenities: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleInteraction = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section
      id="amenities"
      className="py-20 bg-zinc-50 overflow-hidden border-t border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* 
            FIXED HEADER SECTION:
            1. `items-start`: Mobile (kiri)
            2. `md:items-end`: Desktop (alignment bawah kalau ada item sebelah kanan)
            3. `mb-12 md:mb-20`: Kurangkan gap sikit kat mobile supaya tak jauh sangat
        */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-zinc-400"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-zinc-500 font-bold">
                Amenities
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 leading-tight">
              Standard <br />
              <span className="italic text-zinc-400">Infrastructure.</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {amenities.map((item, idx) => {
            const isActive = activeCard === idx;

            return (
              <div
                key={idx}
                onClick={() => handleInteraction(idx)}
                className={`group relative overflow-hidden border transition-all duration-700 cursor-pointer ${
                  item.className
                } ${
                  isActive
                    ? "border-zinc-500 shadow-2xl bg-zinc-100 scale-[1.01] z-10"
                    : "border-zinc-200 bg-zinc-100 hover:border-zinc-400 hover:shadow-lg"
                }`}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0 bg-zinc-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-all duration-1000 ease-out ${
                      isActive
                        ? "opacity-100 scale-110"
                        : "opacity-90 scale-100 group-hover:opacity-100 group-hover:scale-110"
                    }`}
                    priority={idx < 3}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
                </div>

                {/* Content Layer */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-3 backdrop-blur-md border transition-all duration-500 shadow-sm ${
                        isActive
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white/90 border-zinc-200 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <ArrowUpRight
                      className={`transition-all duration-500 drop-shadow-md ${
                        isActive
                          ? "text-zinc-900 opacity-100"
                          : "text-zinc-900 opacity-0 group-hover:opacity-100"
                      }`}
                      size={24}
                    />
                  </div>

                  {/* Text Container */}
                  <div
                    className={`p-5 backdrop-blur-md border-l-2 transition-all duration-500 ${
                      isActive
                        ? "bg-white/95 border-zinc-900 shadow-md translate-y-0"
                        : "bg-white/90 border-transparent translate-y-2 group-hover:bg-white/95 group-hover:border-zinc-900 group-hover:shadow-md group-hover:translate-y-0"
                    }`}
                  >
                    <h3 className="text-xl font-serif text-zinc-900 mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-zinc-600 text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Aesthetic Grid Line */}
                <div className="absolute top-0 right-0 h-full w-px bg-white/20"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
