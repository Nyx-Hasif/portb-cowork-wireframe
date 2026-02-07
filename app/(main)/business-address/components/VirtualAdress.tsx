"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Lock, Bell, Shield, ArrowRight } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Prestigious Address",
    desc: "Establish your presence in the city's premier industrial district.",
    icon: <MapPin className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 2,
    title: "Mail Management",
    desc: "Seamless handling of all your professional correspondence.",
    icon: <Mail className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 3,
    title: "Private Locking",
    desc: "Your own physical anchor in our space with secure mailboxes.",
    icon: <Lock className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
  {
    id: 4,
    title: "24/7 CCTV",
    desc: "Round-the-clock secure access to your business parcels.",
    icon: <Shield className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop&grayscale=true",
  },
];

const VirtualAddress: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  // Fungsi Helper untuk render senarai supaya kod tidak berulang
  const FeatureList = ({ className }: { className?: string }) => (
    <div className={`space-y-3 ${className}`}>
      {features.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setActiveFeature(item)}
          onClick={() => setActiveFeature(item)} // Penting untuk mobile user
          className={`group cursor-pointer py-5 px-6 border transition-all duration-500 flex items-center justify-between ${
            activeFeature.id === item.id
              ? "bg-zinc-900 border-zinc-900 shadow-xl scale-[1.02]"
              : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6">
            <span
              className={`text-xs font-serif transition-colors duration-500 ${
                activeFeature.id === item.id ? "text-zinc-500" : "text-zinc-300 group-hover:text-zinc-400"
              }`}
            >
              0{item.id}
            </span>
            <h3
              className={`text-lg md:text-xl font-serif transition-all duration-500 ${
                activeFeature.id === item.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-900"
              }`}
            >
              {item.title}
            </h3>
          </div>
          <div
            className={`transition-all duration-500 ${
              activeFeature.id === item.id
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:text-zinc-400"
            }`}
          >
            <ArrowRight
              className={`w-5 h-5 ${activeFeature.id === item.id ? "text-white" : "text-zinc-900"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-12 md:py-20 bg-zinc-50 overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Container Utama dengan flex-col */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
          
          {/* SEKSYEN 1: TAJUK (Order 1 pada mobile) */}
          <div className="md:w-1/2 order-1">
            <div className="mb-0 md:mb-10">
              <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-4 block font-bold">
                Virtual Presence
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-zinc-900 tracking-tighter leading-none mb-3">
                THE <br />
                <span className="italic text-zinc-400">IDENTITY.</span>
              </h2>
              <p className="text-zinc-500 font-light leading-relaxed max-w-sm text-sm md:text-base">
                A secure, professional anchor for your business. Elevate your
                brand without the overhead of a physical suite.
              </p>
            </div>

            {/* List Desktop - Hanya muncul pada skrin MD ke atas */}
            <FeatureList className="hidden md:block" />
          </div>

          {/* SEKSYEN 2: GAMBAR (Order 2 pada mobile) */}
          <div className="md:w-1/2 relative order-2 md:order-2">
            <div className="md:sticky md:top-24 aspect-[3/4] overflow-hidden border border-zinc-200 bg-zinc-900 group shadow-2xl">
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>

              <Image
                key={activeFeature.id}
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale brightness-90 transition-all duration-1000 opacity-90 group-hover:opacity-100 group-hover:brightness-100"
                priority
              />

              {/* Detail Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-20 p-6 md:p-8 bg-white/95 backdrop-blur-md border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-3 md:mb-4">
                  <div className="p-2 md:p-3 bg-zinc-900 text-white shadow-lg">
                    {activeFeature.icon}
                  </div>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Feature Details
                  </span>
                </div>
                <p className="text-zinc-800 text-sm md:text-lg font-serif leading-relaxed italic">
                  {activeFeature.desc}
                </p>
              </div>

              {/* Aesthetic Grid Lines */}
              <div className="absolute top-0 right-1/4 h-full w-px bg-white/10"></div>
              <div className="absolute top-1/4 left-0 w-full h-px bg-white/10"></div>
            </div>
          </div>

          {/* SEKSYEN 3: SENARAI UNTUK MOBILE (Order 3 pada mobile) */}
          <div className="block md:hidden order-3">
             <FeatureList />
          </div>

        </div>
      </div>
    </section>
  );
};

export default VirtualAddress;