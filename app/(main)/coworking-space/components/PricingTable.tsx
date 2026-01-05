"use client";
import React, { useState } from "react";
import Image from "next/image"; // ✅ ADDED: Import Next.js Image
import {
  ArrowRight,
  Users,
  Calendar,
  Clock,
  FileDown,
  Maximize2,
  GraduationCap,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface Rate {
  period: string;
  price: string;
}

interface RateItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  capacity: string;
  tier: string;
  standardRates: Rate[];
  studentRates?: Rate[];
  isStudentFriendly?: boolean;
}

const personalPackages: RateItem[] = [
  {
    id: "p1",
    title: "Common Area",
    subtitle: "Fluid Workspace",
    tier: "Tier 01",
    capacity: "Hot Desking",
    isStudentFriendly: true,
    description:
      "Access to our vibrant open-plan lounge. Perfect for digital nomads and students who thrive in a dynamic, social environment.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop&grayscale=true",
    standardRates: [
      { period: "Daily", price: "25" },
      { period: "Weekly", price: "125" },
      { period: "Monthly", price: "300" },
    ],
    studentRates: [
      { period: "Daily", price: "15" },
      { period: "Weekly", price: "50" },
      { period: "Monthly", price: "150" },
    ],
  },
  {
    id: "p2",
    title: "Fixed Desk",
    subtitle: "Dedicated Anchor",
    tier: "Tier 02",
    capacity: "Solo Professional",
    description:
      "Your own permanent desk in a quiet zone. Includes a lockable pedestal and ergonomic chair for consistent productivity.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop&grayscale=true",
    standardRates: [
      { period: "Daily", price: "35" },
      { period: "Weekly", price: "150" },
      { period: "Monthly", price: "400" },
    ],
  },
];

const rentalPackages: RateItem[] = [
  {
    id: "r1",
    title: "Meeting Room",
    subtitle: "Executive Suite",
    tier: "Space A",
    capacity: "10-15 Pax",
    description:
      "Fully equipped with 4K displays and soundproofing. Ideal for board meetings, client presentations, and team huddles.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop&grayscale=true",
    standardRates: [
      { period: "Hourly", price: "100" },
      { period: "4 Hours", price: "300" },
      { period: "8 Hours", price: "500" },
    ],
  },
  {
    id: "r2",
    title: "The Green Area",
    subtitle: "Biophilic Lounge",
    tier: "Space B",
    capacity: "10-15 Pax",
    description:
      "A lush, light-filled space designed for creative brainstorming and informal networking. Nature meets productivity.",
    image:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop&grayscale=true",
    standardRates: [
      { period: "Hourly", price: "100" },
      { period: "4 Hours", price: "300" },
      { period: "8 Hours", price: "500" },
    ],
  },
  {
    id: "r3",
    title: "Event Space",
    subtitle: "Grand Hall",
    tier: "Space C",
    capacity: "25-35 Pax",
    description:
      "A versatile open hall for workshops, seminars, and corporate launches. Features modular furniture and stage setup.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop&grayscale=true",
    standardRates: [
      { period: "Hourly", price: "200" },
      { period: "4 Hours", price: "500" },
      { period: "8 Hours", price: "800" },
    ],
  },
];

const inclusions = [
  "Surau Access",
  "Fiber Internet",
  "Pantry Access",
  "Mineral Water",
  "Unlimited Coffee",
];

const Membership: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<"personal" | "space">(
    "personal"
  );
  const [commonAreaTrack, setCommonAreaTrack] = useState<
    "standard" | "student"
  >("standard");

  const currentPackages =
    activeMainTab === "personal" ? personalPackages : rentalPackages;

  return (
    <section
      id="membership"
      className="py-16 md:py-20 bg-[#0a0a0a] border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.8em] text-gray-500 mb-4 block font-medium">
              Pricing Inventory
            </span>
            <h2 className="text-6xl md:text-8xl font-serif text-white tracking-tighter leading-none mb-6">
              RATES & <br />
              <span className="italic text-gray-400">OFFERINGS.</span>
            </h2>

            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-200 transition-all shadow-2xl"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Downloading Brochure...");
                }}
              >
                <FileDown
                  size={16}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
                Download Full Brochure
              </a>
              <div className="flex items-center gap-3 px-6 py-4 border border-emerald-500/20 bg-emerald-500/10 text-[9px] uppercase tracking-widest text-emerald-400">
                <Clock size={12} className="text-emerald-400" />
                Updated: Jan 2025
              </div>
            </div>
          </div>

          <div className="flex bg-zinc-900 p-1 rounded-sm border border-white/10 w-full md:w-auto">
            <button
              onClick={() => setActiveMainTab("personal")}
              className={`flex-1 md:flex-none px-10 py-5 text-[10px] uppercase tracking-widest transition-all duration-500 ${
                activeMainTab === "personal"
                  ? "bg-white text-black font-bold"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setActiveMainTab("space")}
              className={`flex-1 md:flex-none px-10 py-5 text-[10px] uppercase tracking-widest transition-all duration-500 ${
                activeMainTab === "space"
                  ? "bg-white text-black font-bold"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Space Rental
            </button>
          </div>
        </div>

        {/* Visual Catalog Grid */}
        <div className="grid grid-cols-1 gap-12">
          {currentPackages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`flex flex-col ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 animate-fadeUp`}
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              {/* ✅ UPDATED: Image Section with Next.js Image */}
              <div className="lg:w-1/2 relative group overflow-hidden bg-zinc-900 aspect-[16/10] lg:aspect-auto lg:min-h-[500px]">
                {/* ✅ ADDED: lg:min-h-[500px] for better desktop height */}
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
                  priority={idx === 0} // ✅ First image gets priority loading
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                {/* Floating Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  <span className="text-[9px] uppercase tracking-[0.4em] bg-white text-black px-4 py-2 font-bold self-start">
                    {pkg.tier}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md text-white/80 px-4 py-2 self-start border border-white/10 flex items-center gap-2">
                    <Users size={12} /> {pkg.capacity}
                  </span>

                  {pkg.isStudentFriendly && (
                    <span className="text-[9px] uppercase tracking-[0.3em] bg-blue-600 text-white px-4 py-2 self-start flex items-center gap-2 font-bold shadow-2xl animate-pulse">
                      <GraduationCap size={14} /> Student Price Available
                    </span>
                  )}
                </div>

                <div className="absolute bottom-6 right-6 z-10">
                  <button className="p-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>

              {/* Information Section */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[0.6em] text-gray-500 block">
                        {pkg.subtitle}
                      </span>
                      {pkg.isStudentFriendly && (
                        <div className="flex items-center gap-2 text-blue-500">
                          <Sparkles size={10} />
                          <span className="text-[8px] uppercase tracking-widest font-bold">
                            Academic Exclusive Rates
                          </span>
                        </div>
                      )}
                    </div>

                    {pkg.id === "p1" && (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[8px] uppercase tracking-widest text-gray-500">
                          Switch View
                        </span>
                        <div className="flex p-1 bg-white/5 border border-white/10 rounded-sm">
                          <button
                            onClick={() => setCommonAreaTrack("standard")}
                            className={`px-4 py-2 text-[8px] uppercase tracking-widest transition-all ${
                              commonAreaTrack === "standard"
                                ? "bg-white text-black font-bold"
                                : "text-gray-500 hover:text-white"
                            }`}
                          >
                            Standard
                          </button>
                          <button
                            onClick={() => setCommonAreaTrack("student")}
                            className={`px-4 py-2 text-[8px] uppercase tracking-widest transition-all flex items-center gap-2 ${
                              commonAreaTrack === "student"
                                ? "bg-blue-600 text-white font-bold"
                                : "text-gray-500 hover:text-white"
                            }`}
                          >
                            Student <GraduationCap size={10} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-5xl md:text-6xl font-serif text-white mb-4 tracking-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-lg max-w-xl">
                    {pkg.description}
                  </p>
                </div>

                {/* Rate Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {(pkg.id === "p1" && commonAreaTrack === "student"
                    ? pkg.studentRates
                    : pkg.standardRates
                  )?.map((rate, rIdx) => (
                    <div
                      key={rIdx}
                      className={`p-5 border transition-all relative overflow-hidden ${
                        pkg.id === "p1" && commonAreaTrack === "student"
                          ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {pkg.id === "p1" && commonAreaTrack === "student" && (
                        <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                          <div className="absolute top-0 right-0 border-t-[32px] border-l-[32px] border-t-blue-500 border-l-transparent"></div>
                          <GraduationCap
                            size={10}
                            className="relative z-10 -mt-3 -mr-3 text-white"
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`text-[9px] uppercase tracking-widest ${
                            pkg.id === "p1" && commonAreaTrack === "student"
                              ? "text-blue-400 font-bold"
                              : "text-gray-400"
                          }`}
                        >
                          {rate.period}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-[10px] font-bold ${
                            pkg.id === "p1" && commonAreaTrack === "student"
                              ? "text-blue-400"
                              : "text-gray-400"
                          }`}
                        >
                          RM
                        </span>
                        <span
                          className={`text-3xl font-serif ${
                            pkg.id === "p1" && commonAreaTrack === "student"
                              ? "text-blue-400"
                              : "text-white"
                          }`}
                        >
                          {rate.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {pkg.id === "p1" && commonAreaTrack === "student" && (
                  <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-blue-500/10 border border-blue-500/20">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400">
                      Valid Student ID Required for Academic Rate
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="w-full px-8 py-5 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-4">
                    Reserve Space <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Standard Facilities Inclusion Bar */}
        <div className="mt-16 p-8 md:p-10 bg-white/5 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.03] skew-x-12 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="max-w-md text-center lg:text-left">
              <h4 className="text-2xl font-serif text-white mb-2">
                Standard Inclusions
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Every booking comes with these premium amenities as standard.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group/inc">
                  <div className="w-1.5 h-1.5 bg-white/30 rounded-full group-hover/inc:bg-white group-hover/inc:scale-150 transition-all"></div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gray-300 group-hover/inc:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operational Footer */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/5">
          <div className="flex items-center gap-8 mb-8 md:mb-0">
            <div className="flex items-center gap-4">
              <Calendar size={16} className="text-gray-600" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400">
                Sun - Thu: 9AM - 5PM
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Clock size={16} className="text-gray-600" />
              <span className="text-[10px] uppercase tracking-widest text-gray-400">
                24/7 Access for Fixed Members
              </span>
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-[0.6em] text-gray-700 italic">
            Port B &bull; Aesthetic Purpose
          </p>
        </div>
      </div>
    </section>
  );
};

export default Membership;
