"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  FileText, // ✅ Guna icon FileText untuk nampak macam dokumen
  Download, // ✅ Guna icon Download yang jelas
  GraduationCap,
  CheckCircle2,
  Sparkles,
  ChevronDown,
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
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
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
      className="py-16 md:py-20 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.8em] text-zinc-500 mb-4 block font-medium">
              Pricing Inventory
            </span>
            <h2 className="text-5xl md:text-8xl font-serif text-zinc-900 tracking-tighter leading-none mb-6">
              RATES & <br />
              <span className="italic text-zinc-400">OFFERINGS.</span>
            </h2>

            <div className="flex flex-wrap gap-4 items-center">
              {/* ✅ NEW DESIGN: Document Card Style for Brochure */}
              <a
                href="/brochure/PortB_Latest_Brochure.pdf"
                download="PortB_Latest_Brochure.pdf"
                target="_blank"
                // ✅ Container Card
                className="group relative flex items-center justify-between gap-5 pr-4 pl-1.5 py-1.5 bg-white border border-zinc-200 hover:border-zinc-900 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer rounded-sm overflow-hidden"
              >
                {/* 
      ✅ ADVANCED: Background Slide Effect 
      Bila hover, ada background kelabu cair slide dari kiri ke kanan.
  */}
                <div className="absolute inset-0 bg-zinc-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>

                <div className="flex items-center gap-4 relative z-10">
                  {/* Icon Box */}
                  <div className="h-12 w-12 bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover:bg-white group-hover:border-zinc-300 transition-colors duration-500">
                    <FileText
                      size={20}
                      className="text-zinc-400 group-hover:text-zinc-900 transition-colors"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-zinc-900 tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                      Full Brochure
                    </span>
                    <span className="text-[8px] uppercase text-zinc-400 font-medium tracking-wider flex items-center gap-1 group-hover:text-zinc-500 transition-colors">
                      PDF &bull; 2 MB
                    </span>
                  </div>
                </div>

                {/* ✅ THE "NOTIFY" ANIMATION ARROW 
                        Ini bahagian penting. 
                        1. Kita letak dalam bulat (rounded-full).
                        2. Kita guna 'animate-bounce' supaya dia melompat-lompat panggil user.
                */}
                <div className="relative z-10 pl-4 border-l border-zinc-100 group-hover:border-zinc-300 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-all duration-300 group-hover:scale-110">
                    <Download
                      size={14}
                      // Animate-bounce: Arrow akan melompat.
                      // Group-hover:animate-none: Bila mouse masuk, dia berhenti melompat (jadi fokus).
                      className="text-zinc-500 animate-bounce group-hover:animate-none group-hover:text-white transition-colors"
                    />
                  </div>
                </div>
              </a>

              {/* Updated Badge */}
              <div className="flex items-center gap-3 px-6 py-4 border border-zinc-200 bg-white text-[9px] uppercase tracking-widest text-zinc-600 font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Updated: Jan 2026
              </div>
            </div>
          </div>

          {/* Main Tab Switcher */}
          <div className="flex bg-zinc-900 p-1 rounded-sm border border-zinc-800 w-full lg:w-auto shadow-lg">
            <button
              onClick={() => setActiveMainTab("personal")}
              className={`flex-1 lg:flex-none px-4 lg:px-10 py-5 text-[10px] uppercase tracking-widest transition-all duration-500 cursor-pointer text-center whitespace-nowrap ${
                activeMainTab === "personal"
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setActiveMainTab("space")}
              className={`flex-1 lg:flex-none px-4 lg:px-10 py-5 text-[10px] uppercase tracking-widest transition-all duration-500 cursor-pointer text-center whitespace-nowrap ${
                activeMainTab === "space"
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white"
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
              {/* Image Container */}
              <div className="lg:w-1/2 relative group overflow-hidden bg-zinc-900 aspect-[16/10] lg:aspect-auto lg:min-h-[500px] shadow-2xl">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-all duration-[2s] group-hover:scale-105"
                  priority={idx === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  <span className="text-[9px] uppercase tracking-[0.4em] bg-white text-black px-4 py-2 font-bold self-start shadow-md">
                    {pkg.tier}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md text-white/90 px-4 py-2 self-start border border-white/10 flex items-center gap-2">
                    <Users size={12} /> {pkg.capacity}
                  </span>

                  {pkg.isStudentFriendly && (
                    <span className="text-[9px] uppercase tracking-[0.3em] bg-blue-600 text-white px-4 py-2 self-start flex items-center gap-2 font-bold shadow-2xl animate-pulse">
                      <GraduationCap size={14} /> Student Price Available
                    </span>
                  )}
                </div>

              
              </div>

              {/* Information Section */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start mb-6 lg:mb-3 gap-6 lg:gap-0">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 block">
                        {pkg.subtitle}
                      </span>
                      {pkg.isStudentFriendly && (
                        <div className="flex items-center gap-2 text-blue-600">
                          <Sparkles size={10} />
                          <span className="text-[8px] uppercase tracking-widest font-bold">
                            Academic Exclusive Rates
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Switcher Section */}
                    {pkg.id === "p1" && (
                      <div className="flex flex-col w-full lg:w-auto items-start lg:items-end gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1 animate-pulse">
                          Select Rate <ChevronDown size={10} />
                        </span>

                        <div className="flex w-full lg:w-auto p-1.5 bg-zinc-100 border border-zinc-300 rounded-md shadow-md">
                          <button
                            onClick={() => setCommonAreaTrack("standard")}
                            className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                              commonAreaTrack === "standard"
                                ? "bg-zinc-900 text-white font-bold shadow-sm"
                                : "text-zinc-500 hover:bg-zinc-200 hover:text-black"
                            }`}
                          >
                            Standard
                          </button>
                          <button
                            onClick={() => setCommonAreaTrack("student")}
                            className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                              commonAreaTrack === "student"
                                ? "bg-blue-600 text-white font-bold shadow-sm"
                                : "text-zinc-500 hover:bg-zinc-200 hover:text-blue-600"
                            }`}
                          >
                            Student <GraduationCap size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="text-5xl md:text-6xl font-serif text-zinc-900 mb-4 tracking-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-zinc-600 font-light leading-relaxed text-lg max-w-xl">
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
                          ? "border-blue-200 bg-blue-50 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                          : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-lg"
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
                              ? "text-blue-600 font-bold"
                              : "text-zinc-500"
                          }`}
                        >
                          {rate.period}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-[10px] font-bold ${
                            pkg.id === "p1" && commonAreaTrack === "student"
                              ? "text-blue-600"
                              : "text-zinc-400"
                          }`}
                        >
                          RM
                        </span>
                        <span
                          className={`text-3xl font-serif ${
                            pkg.id === "p1" && commonAreaTrack === "student"
                              ? "text-blue-600"
                              : "text-zinc-900"
                          }`}
                        >
                          {rate.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {pkg.id === "p1" && commonAreaTrack === "student" && (
                  <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-blue-50 border border-blue-200">
                    <CheckCircle2 size={14} className="text-blue-600" />
                    <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600">
                      Valid Student ID Required for Academic Rate
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="w-full px-8 py-5 bg-zinc-900 text-white text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-black transition-all flex items-center justify-center gap-4 shadow-lg cursor-pointer">
                    Reserve Space <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Standard Facilities Inclusion Bar */}
        <div className="mt-16 p-8 md:p-10 bg-zinc-900 border border-zinc-800 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.03] skew-x-12 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="max-w-md text-center lg:text-left">
              <h4 className="text-2xl font-serif text-white mb-2">
                Standard Inclusions
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">
                Every booking comes with these premium amenities as standard.
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-center gap-4 group/inc">
                  <div className="w-1.5 h-1.5 bg-white/30 rounded-full group-hover/inc:bg-white group-hover/inc:scale-150 transition-all"></div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 group-hover/inc:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Membership;
