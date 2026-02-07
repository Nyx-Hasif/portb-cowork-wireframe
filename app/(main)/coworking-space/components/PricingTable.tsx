"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  FileText,
  Download,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Briefcase, // ✅ Icon untuk BNI & Space Rental tab
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
  bniRates?: Rate[]; // ✅ NEW: BNI rates
  isStudentFriendly?: boolean;
  isBniFriendly?: boolean; // ✅ NEW: BNI availability
}

const personalPackages: RateItem[] = [
  {
    id: "p1",
    title: "Common Area",
    subtitle: "Fluid Workspace",
    tier: "Tier 01",
    capacity: "Hot Desking",
    isStudentFriendly: true,
    isBniFriendly: true, // ✅ BNI available
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
    bniRates: [
      { period: "Daily", price: "10" },
      { period: "Weekly", price: "50" },
      { period: "Monthly", price: "200" },
    ],
  },
  {
    id: "p2",
    title: "Fixed Desk",
    subtitle: "Dedicated Anchor",
    tier: "Tier 02",
    capacity: "Solo Professional",
    isBniFriendly: true, // ✅ BNI available
    description:
      "Your own permanent desk in a quiet zone. Includes a lockable pedestal and ergonomic chair for consistent productivity.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    standardRates: [
      { period: "Daily", price: "35" },
      { period: "Weekly", price: "150" },
      { period: "Monthly", price: "400" },
    ],
    bniRates: [
      { period: "Daily", price: "20" },
      { period: "Weekly", price: "100" },
      { period: "Monthly", price: "300" },
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
    isBniFriendly: true, // ✅ BNI available
    description:
      "Fully equipped with 4K displays and soundproofing. Ideal for board meetings, client presentations, and team huddles.",
    image:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
    standardRates: [
      { period: "Hourly", price: "100" },
      { period: "4 Hours", price: "300" },
      { period: "8 Hours", price: "500" },
    ],
    bniRates: [
      { period: "Hourly", price: "80" },
      { period: "4 Hours", price: "260" },
      { period: "8 Hours", price: "450" },
    ],
  },
  {
    id: "r2",
    title: "The Green Area",
    subtitle: "Biophilic Lounge",
    tier: "Space B",
    capacity: "10-15 Pax",
    isBniFriendly: true, // ✅ BNI available
    description:
      "A lush, light-filled space designed for creative brainstorming and informal networking. Nature meets productivity.",
    image:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1200&auto=format&fit=crop",
    standardRates: [
      { period: "Hourly", price: "100" },
      { period: "4 Hours", price: "300" },
      { period: "8 Hours", price: "500" },
    ],
    bniRates: [
      { period: "Hourly", price: "80" },
      { period: "4 Hours", price: "260" },
      { period: "8 Hours", price: "450" },
    ],
  },
  {
    id: "r3",
    title: "Event Space",
    subtitle: "Grand Hall",
    tier: "Space C",
    capacity: "25-35 Pax",
    isBniFriendly: true, // ✅ BNI available
    description:
      "A versatile open hall for workshops, seminars, and corporate launches. Features modular furniture and stage setup.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    standardRates: [
      { period: "Hourly", price: "200" },
      { period: "4 Hours", price: "500" },
      { period: "8 Hours", price: "800" },
    ],
    bniRates: [
      { period: "Hourly", price: "180" },
      { period: "4 Hours", price: "400" },
      { period: "8 Hours", price: "640" },
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
    "personal",
  );

  // ✅ Track untuk Common Area: standard / student / bni
  const [commonAreaTrack, setCommonAreaTrack] = useState<
    "standard" | "student" | "bni"
  >("standard");

  // ✅ Track untuk Fixed Desk: standard / bni
  const [fixedDeskTrack, setFixedDeskTrack] = useState<"standard" | "bni">(
    "standard",
  );

  // ✅ Track untuk Meeting Room: standard / bni
  const [meetingRoomTrack, setMeetingRoomTrack] = useState<"standard" | "bni">(
    "standard",
  );

  // ✅ Track untuk Green Area: standard / bni
  const [greenAreaTrack, setGreenAreaTrack] = useState<"standard" | "bni">(
    "standard",
  );

  // ✅ Track untuk Event Space: standard / bni
  const [eventSpaceTrack, setEventSpaceTrack] = useState<"standard" | "bni">(
    "standard",
  );

  const currentPackages =
    activeMainTab === "personal" ? personalPackages : rentalPackages;

  // ✅ Function untuk get rates based on track
  const getRatesForPackage = (pkg: RateItem) => {
    if (pkg.id === "p1") {
      // Common Area
      if (commonAreaTrack === "student") return pkg.studentRates;
      if (commonAreaTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }

    if (pkg.id === "p2") {
      // Fixed Desk
      if (fixedDeskTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }

    if (pkg.id === "r1") {
      // Meeting Room
      if (meetingRoomTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }

    if (pkg.id === "r2") {
      // Green Area
      if (greenAreaTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }

    if (pkg.id === "r3") {
      // Event Space
      if (eventSpaceTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }

    return pkg.standardRates;
  };

  // ✅ Function untuk check active track
  const getActiveTrack = (pkg: RateItem) => {
    if (pkg.id === "p1") return commonAreaTrack;
    if (pkg.id === "p2") return fixedDeskTrack;
    if (pkg.id === "r1") return meetingRoomTrack;
    if (pkg.id === "r2") return greenAreaTrack;
    if (pkg.id === "r3") return eventSpaceTrack;
    return "standard";
  };

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
              {/* Brochure Download */}
              <a
                href="/brochure/PortB_Latest_Brochure.pdf"
                download="PortB_Latest_Brochure.pdf"
                target="_blank"
                className="group relative flex items-center justify-between gap-5 pr-4 pl-1.5 py-1.5 bg-white border border-zinc-200 hover:border-zinc-900 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer rounded-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-zinc-50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover:bg-white group-hover:border-zinc-300 transition-colors duration-500">
                    <FileText
                      size={20}
                      className="text-zinc-400 group-hover:text-zinc-900 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-zinc-900 tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                      Full Brochure
                    </span>
                    <span className="text-[8px] uppercase text-zinc-400 font-medium tracking-wider flex items-center gap-1 group-hover:text-zinc-500 transition-colors">
                      PDF &bull; 2 MB
                    </span>
                  </div>
                </div>

                <div className="relative z-10 pl-4 border-l border-zinc-100 group-hover:border-zinc-300 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-all duration-300 group-hover:scale-110">
                    <Download
                      size={14}
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

          {/* Main Tab Switcher - REDESIGNED (Compact Version) */}
          <div className="relative w-full lg:w-auto">
            <div className="relative bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full lg:w-auto">
              {/* Active Indicator Background - Slides behind tabs */}
              <div
                className={`absolute top-0 h-full bg-zinc-900 transition-all duration-500 ease-out ${
                  activeMainTab === "personal"
                    ? "left-0 w-1/2"
                    : "left-1/2 w-1/2"
                }`}
              ></div>

              {/* Tabs Container */}
              <div className="relative flex">
                <button
                  onClick={() => setActiveMainTab("personal")}
                  className={`group relative flex-1 lg:flex-none px-6 lg:px-8 py-4 transition-all duration-500 cursor-pointer ${
                    activeMainTab === "personal"
                      ? "text-white"
                      : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        activeMainTab === "personal"
                          ? "border-white bg-white/10"
                          : "border-zinc-300 group-hover:border-zinc-900"
                      }`}
                    >
                      <Users
                        size={14}
                        className={
                          activeMainTab === "personal"
                            ? "text-white"
                            : "text-zinc-600 group-hover:text-zinc-900"
                        }
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                          activeMainTab === "personal"
                            ? "text-white"
                            : "text-zinc-900"
                        }`}
                      >
                        Personal
                      </span>
                      <span
                        className={`text-[8px] uppercase tracking-wider transition-all ${
                          activeMainTab === "personal"
                            ? "text-white/60"
                            : "text-zinc-400"
                        }`}
                      >
                        Workspace
                      </span>
                    </div>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative w-px bg-zinc-200 my-3"></div>

                <button
                  onClick={() => setActiveMainTab("space")}
                  className={`group relative flex-1 lg:flex-none px-6 lg:px-8 py-4 transition-all duration-500 cursor-pointer ${
                    activeMainTab === "space"
                      ? "text-white"
                      : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        activeMainTab === "space"
                          ? "border-white bg-white/10"
                          : "border-zinc-300 group-hover:border-zinc-900"
                      }`}
                    >
                      <Briefcase
                        size={14}
                        className={
                          activeMainTab === "space"
                            ? "text-white"
                            : "text-zinc-600 group-hover:text-zinc-900"
                        }
                      />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${
                          activeMainTab === "space"
                            ? "text-white"
                            : "text-zinc-900"
                        }`}
                      >
                        Space Rental
                      </span>
                      <span
                        className={`text-[8px] uppercase tracking-wider transition-all ${
                          activeMainTab === "space"
                            ? "text-white/60"
                            : "text-zinc-400"
                        }`}
                      >
                        Events & Meetings
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Pulse Indicator for Active Tab */}
              <div
                className={`absolute -top-1.5 transition-all duration-500 ${
                  activeMainTab === "personal" ? "left-1/4" : "left-3/4"
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

        {/* Visual Catalog Grid */}
        <div className="grid grid-cols-1 gap-12">
          {currentPackages.map((pkg, idx) => {
            const activeTrack = getActiveTrack(pkg);
            const displayRates = getRatesForPackage(pkg);

            return (
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

                    {/* ✅ Student Tag (only Common Area) */}
                    {pkg.isStudentFriendly && (
                      <span className="text-[9px] uppercase tracking-[0.3em] bg-blue-600 text-white px-4 py-2 self-start flex items-center gap-2 font-bold shadow-2xl animate-pulse">
                        <GraduationCap size={14} /> Student Price Available
                      </span>
                    )}

                    {/* ✅ BNI Tag (all categories) */}
                    {pkg.isBniFriendly && (
                      <span className="text-[9px] uppercase tracking-[0.3em] bg-red-600 text-white px-4 py-2 self-start flex items-center gap-2 font-bold shadow-2xl animate-pulse">
                        <Briefcase size={14} /> BNI Member Rate Available
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

                        {/* ✅ Show active promo indicator */}
                        {activeTrack === "student" && (
                          <div className="flex items-center gap-2 text-blue-600">
                            <Sparkles size={10} />
                            <span className="text-[8px] uppercase tracking-widest font-bold">
                              Academic Exclusive Rates
                            </span>
                          </div>
                        )}

                        {activeTrack === "bni" && (
                          <div className="flex items-center gap-2 text-red-600">
                            <Sparkles size={10} />
                            <span className="text-[8px] uppercase tracking-widest font-bold">
                              BNI Member Exclusive Rates
                            </span>
                          </div>
                        )}
                      </div>

                      {/* ✅ Rate Switcher - Different for each package */}
                      <div className="flex flex-col w-full lg:w-auto items-start lg:items-end gap-2">
                        <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1 animate-pulse">
                          Select Rate <ChevronDown size={10} />
                        </span>

                        {/* Common Area - 3 options */}
                        {pkg.id === "p1" && (
                          <div className="flex w-full lg:w-auto p-1.5 bg-zinc-100 border border-zinc-300 rounded-md shadow-md">
                            <button
                              onClick={() => setCommonAreaTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-3 md:px-4 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                commonAreaTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-black"
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setCommonAreaTrack("student")}
                              className={`flex-1 lg:flex-none justify-center px-3 md:px-4 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                commonAreaTrack === "student"
                                  ? "bg-blue-600 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-blue-600"
                              }`}
                            >
                              <GraduationCap size={14} />
                            </button>
                            <button
                              onClick={() => setCommonAreaTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-3 md:px-4 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                commonAreaTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-red-600"
                              }`}
                            >
                              <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Fixed Desk - 2 options */}
                        {pkg.id === "p2" && (
                          <div className="flex w-full lg:w-auto p-1.5 bg-zinc-100 border border-zinc-300 rounded-md shadow-md">
                            <button
                              onClick={() => setFixedDeskTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                fixedDeskTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-black"
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setFixedDeskTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                fixedDeskTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-red-600"
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Meeting Room - 2 options */}
                        {pkg.id === "r1" && (
                          <div className="flex w-full lg:w-auto p-1.5 bg-zinc-100 border border-zinc-300 rounded-md shadow-md">
                            <button
                              onClick={() => setMeetingRoomTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                meetingRoomTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-black"
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setMeetingRoomTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                meetingRoomTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-red-600"
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Green Area - 2 options */}
                        {pkg.id === "r2" && (
                          <div className="flex w-full lg:w-auto p-1.5 bg-zinc-100 border border-zinc-300 rounded-md shadow-md">
                            <button
                              onClick={() => setGreenAreaTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                greenAreaTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-black"
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setGreenAreaTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                greenAreaTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-red-600"
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Event Space - 2 options */}
                        {pkg.id === "r3" && (
                          <div className="flex w-full lg:w-auto p-1.5 bg-zinc-100 border border-zinc-300 rounded-md shadow-md">
                            <button
                              onClick={() => setEventSpaceTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                eventSpaceTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-black"
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setEventSpaceTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                eventSpaceTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : "text-zinc-500 hover:bg-zinc-200 hover:text-red-600"
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}
                      </div>
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
                    {displayRates?.map((rate, rIdx) => (
                      <div
                        key={rIdx}
                        className={`p-5 border transition-all relative overflow-hidden ${
                          activeTrack === "student"
                            ? "border-blue-200 bg-blue-50 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                            : activeTrack === "bni"
                              ? "border-red-200 bg-red-50 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                              : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-lg"
                        }`}
                      >
                        {/* Corner Badge */}
                        {activeTrack === "student" && (
                          <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                            <div className="absolute top-0 right-0 border-t-[32px] border-l-[32px] border-t-blue-500 border-l-transparent"></div>
                            <GraduationCap
                              size={10}
                              className="relative z-10 -mt-3 -mr-3 text-white"
                            />
                          </div>
                        )}

                        {activeTrack === "bni" && (
                          <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                            <div className="absolute top-0 right-0 border-t-[32px] border-l-[32px] border-t-red-500 border-l-transparent"></div>
                            <Briefcase
                              size={10}
                              className="relative z-10 -mt-3 -mr-3 text-white"
                            />
                          </div>
                        )}

                        <div className="flex justify-between items-start mb-2">
                          <span
                            className={`text-[9px] uppercase tracking-widest ${
                              activeTrack === "student"
                                ? "text-blue-600 font-bold"
                                : activeTrack === "bni"
                                  ? "text-red-600 font-bold"
                                  : "text-zinc-500"
                            }`}
                          >
                            {rate.period}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`text-[10px] font-bold ${
                              activeTrack === "student"
                                ? "text-blue-600"
                                : activeTrack === "bni"
                                  ? "text-red-600"
                                  : "text-zinc-400"
                            }`}
                          >
                            RM
                          </span>
                          <span
                            className={`text-3xl font-serif ${
                              activeTrack === "student"
                                ? "text-blue-600"
                                : activeTrack === "bni"
                                  ? "text-red-600"
                                  : "text-zinc-900"
                            }`}
                          >
                            {rate.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Requirement Notice */}
                  {activeTrack === "student" && (
                    <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-blue-50 border border-blue-200">
                      <CheckCircle2 size={14} className="text-blue-600" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600">
                        Valid Student ID Required for Academic Rate
                      </p>
                    </div>
                  )}

                  {activeTrack === "bni" && (
                    <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-red-50 border border-red-200">
                      <CheckCircle2 size={14} className="text-red-600" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-red-600">
                        Valid BNI Membership Card Required
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
            );
          })}
        </div>

        {/* Standard Facilities Inclusion Bar */}
        <div className="mt-16 p-8 md:p-10 bg-zinc-900 border border-zinc-800 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.03] skew-x-12 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="max-w-md text-center lg:text-left">
              <h4 className="text-2xl font-serif text-white mb-2">
                Standard Amenities
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
