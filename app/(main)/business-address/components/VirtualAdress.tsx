"use client";
import React, { useState } from "react";
import Image from "next/image"; // ✅ ADDED: Import Next.js Image
import { MapPin, Mail, Lock, Bell, Shield, ArrowRight } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Prestigious Address",
    desc: "Establish your presence in the city's premier industrial district.",
    icon: <MapPin className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 2,
    title: "Mail Management",
    desc: "Seamless handling of all your professional correspondence.",
    icon: <Mail className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 3,
    title: "Private Locking",
    desc: "Your own physical anchor in our space with secure mailboxes.",
    icon: <Lock className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 4,
    title: "Smart Alerts",
    desc: "Real-time digital notifications the moment your mail arrives.",
    icon: <Bell className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 5,
    title: "24/7 Shield",
    desc: "Round-the-clock secure access to your business parcels.",
    icon: <Shield className="w-5 h-5" />,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
];

const VirtualAddress: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="py-16 md:py-20 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          {/* Left Side: Text List */}
          <div className="md:w-1/2">
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4 block">
                Virtual Presence
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tighter leading-none mb-6">
                THE <br />
                <span className="italic text-gray-500">IDENTITY.</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed max-w-sm text-sm md:text-base">
                A secure, professional anchor for your business. Elevate your
                brand without the overhead of a physical suite.
              </p>
            </div>

            {/* Feature list with backgrounds */}
            <div className="space-y-2">
              {features.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveFeature(item)}
                  className={`group cursor-pointer py-4 md:py-5 px-4 border transition-all duration-500 flex items-center justify-between ${
                    activeFeature.id === item.id
                      ? "bg-white/[0.07] border-white/20 shadow-lg"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`text-xs font-serif transition-colors duration-500 ${
                        activeFeature.id === item.id
                          ? "text-white"
                          : "text-gray-600 group-hover:text-gray-500"
                      }`}
                    >
                      0{item.id}
                    </span>
                    <h3
                      className={`text-lg md:text-xl lg:text-2xl font-serif transition-all duration-500 ${
                        activeFeature.id === item.id
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className={`transition-all duration-500 ${
                      activeFeature.id === item.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4 group-hover:opacity-50"
                    }`}
                  >
                    <ArrowRight className="text-white w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Dynamic Visual Frame */}
          <div className="md:w-1/2 relative">
            <div className="md:sticky md:top-24 aspect-[3/4] overflow-hidden border border-white/10 bg-zinc-900 group rounded-lg">
              <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>

              {/* ✅ UPDATED: Replace img with Next.js Image */}
              <Image
                key={activeFeature.id}
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale brightness-75 transition-all duration-1000 opacity-80 group-hover:opacity-100 group-hover:brightness-100"
                priority={activeFeature.id === 1} // ✅ Priority load for first feature
              />

              {/* Detail Card Overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-20 p-6 bg-black/70 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-lg">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2.5 bg-white text-black">
                    {activeFeature.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40">
                    Feature Details
                  </span>
                </div>
                <p className="text-white text-base md:text-lg font-light leading-relaxed italic">
                  {activeFeature.desc}
                </p>
              </div>

              {/* Aesthetic Grid Lines */}
              <div className="absolute top-0 right-1/4 h-full w-px bg-white/5"></div>
              <div className="absolute top-1/4 left-0 w-full h-px bg-white/5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualAddress;
