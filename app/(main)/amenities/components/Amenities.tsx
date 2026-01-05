"use client";
import React from "react";
import Image from "next/image"; // ✅ ADDED: Import Next.js Image
import {
  Wifi,
  Coffee,
  Droplets,
  Wind,
  Monitor,
  Wrench,
  MapPin,
  Users,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const amenities = [
  {
    icon: <Wifi className="w-5 h-5" />,
    title: "High-Speed WiFi",
    description: "Enterprise-grade fiber with redundant failover.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: "Refreshments",
    description: "Artisan coffee and curated snacks.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: "Surau & WC",
    description: "Clean, minimalist facilities for comfort.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Wind className="w-5 h-5" />,
    title: "Climate Control",
    description: "Smart temperature & air purification.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: "Display Tech",
    description: "4K smart screens & wireless casting.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Tech Support",
    description: "On-site help for all your hardware needs.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Prime Location",
    description: "Heart of the city, easily accessible.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Community Events",
    description: "Networking & creative workshops.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Security Access",
    description: "24/7 CCTV & biometric entry.",
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop&grayscale=true",
    className: "md:col-span-1 md:row-span-1",
  },
];

const Amenities: React.FC = () => {
  return (
    <section id="amenities" className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-white/20"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-gray-500">
                Amenities
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              Standard <br />
              <span className="italic text-gray-400">Infrastructure.</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden border border-white/10 bg-zinc-900 transition-all duration-700 hover:border-white/40 ${item.className}`}
              // ✅ CHANGED: bg-brand-dark → bg-zinc-900
            >
              {/* ✅ UPDATED: Image Layer with Next.js Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-20 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 ease-out"
                  priority={idx < 3} // ✅ Load first 3 images with priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                {/* ✅ CHANGED: from-brand-black → from-black */}
              </div>

              {/* Content Layer */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 text-white transition-all duration-500 group-hover:bg-white group-hover:text-black">
                    {item.icon}
                  </div>
                  <ArrowUpRight
                    className="text-white/0 group-hover:text-white/40 transition-all duration-500"
                    size={20}
                  />
                </div>

                <div className="p-4 bg-black/40 backdrop-blur-sm border-l-2 border-white/0 group-hover:border-white transition-all duration-500">
                  <h3 className="text-xl font-serif text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Aesthetic Grid Line */}
              <div className="absolute top-0 right-0 h-full w-px bg-white/5"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
