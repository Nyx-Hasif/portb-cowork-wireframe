// components/Membership.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import {
  ArrowRight,
  Users,
  FileText,
  Download,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Briefcase,
  Star,
  Calendar,
} from "lucide-react";
import { assets } from "@/assets/asset";
import BookingModal from "./BookingModal";

interface Rate {
  period: string;
  price: string;
  originalPrice?: string;
  isPromo?: boolean;
}

interface RateItem {
  id: string;
  title: string;
  subtitle: string;
  image: string | StaticImageData;
  description: string;
  capacity: string;
  tier: string;
  standardRates: Rate[];
  studentRates?: Rate[];
  bniRates?: Rate[];
  isStudentFriendly?: boolean;
  isBniFriendly?: boolean;
  hasMerdekaPromo?: boolean;
}

const MERDEKA_PROMO_PERIOD = "16 Ogos – 16 September";

// ─── Merdeka Promo Banner — Clean Blue & Gold Theme ──────────────────────────
const MerdekaPromoBanner: React.FC = () => (
  <div className="relative overflow-hidden rounded-md mb-6 border border-blue-900/15 shadow-[0_8px_30px_-8px_rgba(30,58,138,0.2)]">
    {/* Base gradient - clean blue tones */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-800" />

    {/* Subtle gold texture lines */}
    <div className="absolute inset-0 opacity-[0.06]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, #fbbf24 10px, #fbbf24 11px)",
        }}
      />
    </div>

    {/* Gold decorative star - subtle, top right */}
    <div className="absolute -top-4 -right-4 opacity-[0.08]">
      <Star size={100} className="text-amber-300 fill-amber-300" />
    </div>

    {/* Bottom gold accent line */}
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
    {/* Top gold hairline */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

    <div className="relative z-10 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full bg-amber-300/10 border border-amber-300/30 flex items-center justify-center">
            <Star size={16} className="text-amber-300 fill-amber-300" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] uppercase tracking-[0.5em] text-amber-300 font-bold">
              Merdeka Special
            </span>
          </div>
          <p className="text-white font-serif text-xl leading-tight tracking-tight">
            Sempena Bulan Kemerdekaan
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0 pl-[60px] sm:pl-0">
        <div className="bg-amber-300 text-blue-900 px-4 py-1.5 rounded-sm font-black text-[9px] uppercase tracking-[0.2em] shadow-lg">
          Harga Istimewa
        </div>
        <div className="flex items-center gap-1.5 text-white/70">
          <Calendar size={10} />
          <span className="text-[8px] uppercase tracking-wider font-medium">
            {MERDEKA_PROMO_PERIOD}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Promo Rate Card — Clean Blue & Gold Theme ───────────────────────────────
const PromoRateCard: React.FC<{ rate: Rate; index: number }> = ({
  rate,
  index,
}) => {
  if (!rate.isPromo || !rate.originalPrice) {
    return (
      <div className="p-5 border border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-lg transition-all relative overflow-hidden">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[9px] uppercase tracking-widest text-zinc-500">
            {rate.period}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-bold text-zinc-400">RM</span>
          <span className="text-3xl font-serif text-zinc-900">
            {rate.price}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative border border-blue-900/15 bg-white overflow-hidden shadow-[0_4px_20px_-4px_rgba(30,58,138,0.1)] transition-all duration-500 hover:shadow-[0_8px_30px_-6px_rgba(30,58,138,0.18)] hover:-translate-y-1 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top accent bar - blue to gold gradient */}
      <div className="h-[3px] w-full bg-gradient-to-r from-blue-800 via-amber-300 to-blue-800" />

      {/* Corner badge */}
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1 bg-blue-800 px-2 py-1 rounded-full">
          <Star size={8} className="text-amber-300 fill-amber-300" />
          <span className="text-[7px] text-white font-bold uppercase tracking-wider">
            Promo
          </span>
        </div>
      </div>

      <div className="p-5">
        <span className="text-[9px] uppercase tracking-widest text-blue-800 font-bold block mb-3">
          {rate.period}
        </span>

        {/* Harga asal - strikethrough */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[9px] text-zinc-400 font-medium">
            Harga Asal
          </span>
          <div className="flex items-baseline gap-0.5 relative">
            <span className="text-[10px] text-zinc-400">RM</span>
            <span className="text-base text-zinc-400 font-serif relative">
              {rate.originalPrice}
              <span className="absolute inset-0 flex items-center">
                <span className="w-full h-px bg-zinc-400 block" />
              </span>
            </span>
          </div>
        </div>

        {/* Harga promo */}
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-bold text-blue-800">RM</span>
          <span className="text-3xl font-serif text-blue-800">
            {rate.price}
          </span>
        </div>

        {/* Gold accent underline on hover */}
        <div className="mt-3 h-px w-full bg-zinc-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-amber-300 w-0 group-hover:w-full transition-all duration-700" />
        </div>
      </div>
    </div>
  );
};

const personalPackages: RateItem[] = [
  {
    id: "p1",
    title: "Common Area",
    subtitle: "Fluid Workspace",
    tier: "Tier 01",
    capacity: "Hot Desking",
    isStudentFriendly: true,
    isBniFriendly: true,
    description:
      "Access to our vibrant open-plan lounge. Perfect for digital nomads and students who thrive in a dynamic, social environment.",
    image: assets.common_area,
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
    isBniFriendly: true,
    hasMerdekaPromo: true,
    description:
      "Your own permanent desk in a quiet zone. Includes a lockable pedestal and ergonomic chair for consistent productivity.",
    image: assets.fixed_desk,
    standardRates: [
      { period: "Daily", price: "20", originalPrice: "35", isPromo: true },
      { period: "Weekly", price: "100", originalPrice: "150", isPromo: true },
      { period: "Monthly", price: "300", originalPrice: "400", isPromo: true },
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
    capacity: "10 Pax",
    isBniFriendly: true,
    hasMerdekaPromo: true,
    description:
      "Fully equipped with 4K displays and soundproofing. Ideal for board meetings, client presentations, and team huddles.",
    image: assets.meeting_room_v2,
    standardRates: [
      { period: "Hourly", price: "80", originalPrice: "100", isPromo: true },
      { period: "4 Hours", price: "300", originalPrice: "300", isPromo: false },
      { period: "8 Hours", price: "500", originalPrice: "500", isPromo: false },
    ],
    bniRates: [
      { period: "Hourly", price: "80" },
      { period: "4 Hours", price: "300" },
      { period: "8 Hours", price: "500" },
    ],
  },
  {
    id: "r2",
    title: "The Green Area",
    subtitle: "Biophilic Lounge",
    tier: "Space B",
    capacity: "10 Pax",
    isBniFriendly: true,
    description:
      "A lush, light-filled space designed for creative brainstorming and informal networking. Nature meets productivity.",
    image: assets.green_area,
    standardRates: [
      { period: "Hourly", price: "100" },
      { period: "4 Hours", price: "300" },
      { period: "8 Hours", price: "500" },
    ],
    bniRates: [
      { period: "Hourly", price: "80" },
      { period: "4 Hours", price: "240" },
      { period: "8 Hours", price: "400" },
    ],
  },
  {
    id: "r3",
    title: "Event Space",
    subtitle: "Grand Hall",
    tier: "Space C",
    capacity: "40 Pax",
    isBniFriendly: true,
    description:
      "A versatile open hall for workshops, seminars, and corporate launches. Features modular furniture and stage setup.",
    image: assets.event_space_v2,
    standardRates: [
      { period: "Hourly", price: "200" },
      { period: "4 Hours", price: "500" },
      { period: "8 Hours", price: "800" },
    ],
    bniRates: [
      { period: "Hourly", price: "180" },
      { period: "4 Hours", price: "500" },
      { period: "8 Hours", price: "800" },
    ],
  },
];

const inclusions = [
  "Surau Access",
  "Fiber Internet",
  "Pantry Access",
  "Filtered Water",
  "Unlimited Coffee",
];

const SLUG_TO_PRICING: Record<
  string,
  { tab: "personal" | "space"; packageId: string }
> = {
  "common-area": { tab: "personal", packageId: "p1" },
  "fixed-desk": { tab: "personal", packageId: "p2" },
  "meeting-room": { tab: "space", packageId: "r1" },
  "green-area": { tab: "space", packageId: "r2" },
  "event-space": { tab: "space", packageId: "r3" },
};

const WHATSAPP_NUMBER = "60143298981";

const Membership: React.FC = () => {
  const searchParams = useSearchParams();

  const [activeMainTab, setActiveMainTab] = useState<"personal" | "space">(
    "personal",
  );
  const [highlightedPackage, setHighlightedPackage] = useState<string | null>(
    null,
  );
  const packageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [commonAreaTrack, setCommonAreaTrack] = useState<
    "standard" | "student" | "bni"
  >("standard");
  const [fixedDeskTrack, setFixedDeskTrack] = useState<"standard" | "bni">(
    "standard",
  );
  const [meetingRoomTrack, setMeetingRoomTrack] = useState<"standard" | "bni">(
    "standard",
  );
  const [greenAreaTrack, setGreenAreaTrack] = useState<"standard" | "bni">(
    "standard",
  );
  const [eventSpaceTrack, setEventSpaceTrack] = useState<"standard" | "bni">(
    "standard",
  );

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    packageTitle: string;
    packageTier: string;
    packageCapacity: string;
    packageImage: string | StaticImageData;
    activeTrack: "standard" | "student" | "bni";
    rates: { period: string; price: string }[];
  }>({
    isOpen: false,
    packageTitle: "",
    packageTier: "",
    packageCapacity: "",
    packageImage: "",
    activeTrack: "standard",
    rates: [],
  });

  useEffect(() => {
    const spaceParam = searchParams.get("space");
    if (!spaceParam || !SLUG_TO_PRICING[spaceParam]) return;

    const { tab, packageId } = SLUG_TO_PRICING[spaceParam];
    setActiveMainTab(tab);

    let attempts = 0;
    const maxAttempts = 30;

    const interval = setInterval(() => {
      attempts++;
      const el = packageRefs.current[packageId];

      if (el) {
        clearInterval(interval);
        const rect = el.getBoundingClientRect();
        const top =
          window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        setHighlightedPackage(packageId);
        setTimeout(() => setHighlightedPackage(null), 30000);
        window.history.replaceState({}, "", "/coworking-space");
      }

      if (attempts >= maxAttempts) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [searchParams]);

  const currentPackages =
    activeMainTab === "personal" ? personalPackages : rentalPackages;

  const getRatesForPackage = (pkg: RateItem) => {
    if (pkg.id === "p1") {
      if (commonAreaTrack === "student") return pkg.studentRates;
      if (commonAreaTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }
    if (pkg.id === "p2") {
      if (fixedDeskTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }
    if (pkg.id === "r1") {
      if (meetingRoomTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }
    if (pkg.id === "r2") {
      if (greenAreaTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }
    if (pkg.id === "r3") {
      if (eventSpaceTrack === "bni") return pkg.bniRates;
      return pkg.standardRates;
    }
    return pkg.standardRates;
  };

  const getActiveTrack = (pkg: RateItem) => {
    if (pkg.id === "p1") return commonAreaTrack;
    if (pkg.id === "p2") return fixedDeskTrack;
    if (pkg.id === "r1") return meetingRoomTrack;
    if (pkg.id === "r2") return greenAreaTrack;
    if (pkg.id === "r3") return eventSpaceTrack;
    return "standard";
  };

  const isShowingPromo = (pkg: RateItem) => {
    if (!pkg.hasMerdekaPromo) return false;
    const track = getActiveTrack(pkg);
    return track === "standard";
  };

  const openBookingModal = (pkg: RateItem) => {
    const track = getActiveTrack(pkg);
    const rates = getRatesForPackage(pkg) || pkg.standardRates;

    const cleanRates = rates.map((r) => ({
      period: r.period,
      price: r.price,
    }));

    setBookingModal({
      isOpen: true,
      packageTitle: pkg.title,
      packageTier: pkg.tier,
      packageCapacity: pkg.capacity,
      packageImage: pkg.image,
      activeTrack: track as "standard" | "student" | "bni",
      rates: cleanRates,
    });
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
          <div className="relative w-full lg:w-auto">
            <div className="relative bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full lg:w-auto">
              <div
                className={`absolute top-0 h-full bg-zinc-900 transition-all duration-500 ease-out ${
                  activeMainTab === "personal"
                    ? "left-0 w-1/2"
                    : "left-1/2 w-1/2"
                }`}
              />

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

                <div className="relative w-px bg-zinc-200 my-3" />

                <button
                  onClick={() => setActiveMainTab("space")}
                  className={`group relative flex-1 lg:flex-none px-6 lg:px-8 py-4 transition-all duration-500 cursor-pointer ${
                    activeMainTab === "space"
                      ? "text-white"
                      : "text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
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

              <div
                className={`absolute -top-1.5 transition-all duration-500 ${
                  activeMainTab === "personal" ? "left-1/4" : "left-3/4"
                } -translate-x-1/2`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-900 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900" />
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
            const isHighlighted = highlightedPackage === pkg.id;
            const showingPromo = isShowingPromo(pkg);

            const rateSwitcherClass = isHighlighted
              ? "bg-amber-100/50 border-amber-400/40 shadow-[0_4px_30px_-4px_rgba(251,191,36,0.25)] ring-1 ring-amber-300/40 rounded-lg border-breathe"
              : "bg-zinc-100 border-zinc-300 shadow-md";

            const getUnselectedClass = (
              type: "standard" | "student" | "bni",
            ) => {
              if (!isHighlighted) return "text-zinc-500 hover:bg-zinc-200";
              switch (type) {
                case "standard":
                  return "animate-pulse bg-gradient-to-r from-amber-100/60 to-yellow-100/40 text-amber-800 border border-amber-300/40 shadow-[0_0_16px_rgba(217,175,90,0.15)] rounded-sm";
                case "student":
                  return "animate-pulse bg-gradient-to-r from-blue-100/80 to-indigo-100/60 text-blue-700 border border-blue-400/50 shadow-[0_0_16px_rgba(59,130,246,0.25)] rounded-sm";
                case "bni":
                  return "animate-pulse bg-gradient-to-r from-red-100/80 to-rose-100/60 text-red-700 border border-red-400/50 shadow-[0_0_16px_rgba(239,68,68,0.25)] rounded-sm";
              }
            };

            return (
              <div
                key={pkg.id}
                ref={(el) => {
                  packageRefs.current[pkg.id] = el;
                }}
                className={`flex flex-col ${
                  idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 animate-fadeUp transition-all duration-1000 ${
                  isHighlighted
                    ? "ring-2 ring-amber-400/40 ring-offset-8 ring-offset-zinc-50 p-5 rounded-2xl border-2 border-amber-400/30 border-breathe premium-glow"
                    : "ring-0 ring-transparent ring-offset-0 shadow-none scale-100 p-0 rounded-none border-transparent"
                }`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Merdeka Promo overlay - Blue & Gold */}
                  {showingPromo && (
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div className="bg-blue-800/90 backdrop-blur-md border border-amber-300/30 px-4 py-3 shadow-xl flex items-center justify-between rounded-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-300/15 border border-amber-300/40 flex items-center justify-center flex-shrink-0">
                            <Star
                              size={12}
                              className="text-amber-300 fill-amber-300"
                            />
                          </div>
                          <div>
                            <p className="text-[8px] uppercase tracking-[0.4em] text-amber-300 font-bold">
                              Merdeka Special
                            </p>
                            <p className="text-white text-[10px] uppercase tracking-wider font-medium">
                              Harga Promosi Aktif
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 text-white/60 flex-shrink-0">
                          <Calendar size={10} />
                          <span className="text-[8px] uppercase tracking-wider">
                            {MERDEKA_PROMO_PERIOD}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

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
                        {showingPromo && (
                          <div className="flex items-center gap-2 text-blue-800">
                            <Star
                              size={10}
                              className="fill-amber-400 text-amber-400"
                            />
                            <span className="text-[8px] uppercase tracking-widest font-bold">
                              Merdeka Promotion 
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Rate Switcher */}
                      <div className="flex flex-col w-full lg:w-auto items-start lg:items-end gap-2">
                        <span
                          className={`text-[9px] uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all duration-700 ${
                            isHighlighted
                              ? "text-amber-700 scale-105 bg-amber-100/70 px-3 py-1.5 rounded-full border border-amber-400/40 shadow-[0_2px_16px_rgba(251,191,36,0.2)]"
                              : "text-zinc-400 animate-pulse"
                          }`}
                        >
                          {isHighlighted && (
                            <Sparkles
                              size={10}
                              className="animate-spin text-amber-500"
                            />
                          )}
                          Select Rate <ChevronDown size={10} />
                        </span>

                        {/* Common Area — 3 options */}
                        {pkg.id === "p1" && (
                          <div
                            className={`flex w-full lg:w-auto p-1.5 border rounded-md transition-all duration-700 ${rateSwitcherClass}`}
                          >
                            <button
                              onClick={() => setCommonAreaTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-3 md:px-4 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                commonAreaTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : getUnselectedClass("standard")
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setCommonAreaTrack("student")}
                              className={`flex-1 lg:flex-none justify-center px-3 md:px-4 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                commonAreaTrack === "student"
                                  ? "bg-blue-600 text-white font-bold shadow-sm"
                                  : getUnselectedClass("student")
                              }`}
                            >
                              <GraduationCap size={14} />
                            </button>
                            <button
                              onClick={() => setCommonAreaTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-3 md:px-4 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                commonAreaTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : getUnselectedClass("bni")
                              }`}
                            >
                              <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Fixed Desk — 2 options */}
                        {pkg.id === "p2" && (
                          <div
                            className={`flex w-full lg:w-auto p-1.5 border rounded-md transition-all duration-700 ${rateSwitcherClass}`}
                          >
                            <button
                              onClick={() => setFixedDeskTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                fixedDeskTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : getUnselectedClass("standard")
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setFixedDeskTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                fixedDeskTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : getUnselectedClass("bni")
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Meeting Room — 2 options */}
                        {pkg.id === "r1" && (
                          <div
                            className={`flex w-full lg:w-auto p-1.5 border rounded-md transition-all duration-700 ${rateSwitcherClass}`}
                          >
                            <button
                              onClick={() => setMeetingRoomTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                meetingRoomTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : getUnselectedClass("standard")
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setMeetingRoomTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                meetingRoomTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : getUnselectedClass("bni")
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Green Area — 2 options */}
                        {pkg.id === "r2" && (
                          <div
                            className={`flex w-full lg:w-auto p-1.5 border rounded-md transition-all duration-700 ${rateSwitcherClass}`}
                          >
                            <button
                              onClick={() => setGreenAreaTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                greenAreaTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : getUnselectedClass("standard")
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setGreenAreaTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                greenAreaTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : getUnselectedClass("bni")
                              }`}
                            >
                              BNI <Briefcase size={14} />
                            </button>
                          </div>
                        )}

                        {/* Event Space — 2 options */}
                        {pkg.id === "r3" && (
                          <div
                            className={`flex w-full lg:w-auto p-1.5 border rounded-md transition-all duration-700 ${rateSwitcherClass}`}
                          >
                            <button
                              onClick={() => setEventSpaceTrack("standard")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm cursor-pointer flex items-center gap-2 ${
                                eventSpaceTrack === "standard"
                                  ? "bg-zinc-900 text-white font-bold shadow-sm"
                                  : getUnselectedClass("standard")
                              }`}
                            >
                              Standard
                            </button>
                            <button
                              onClick={() => setEventSpaceTrack("bni")}
                              className={`flex-1 lg:flex-none justify-center px-4 md:px-6 py-3 text-[10px] uppercase tracking-widest transition-all rounded-sm flex items-center gap-2 cursor-pointer ${
                                eventSpaceTrack === "bni"
                                  ? "bg-red-600 text-white font-bold shadow-sm"
                                  : getUnselectedClass("bni")
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

                  {/* ─── Merdeka Promo Banner (Blue & Gold) ──────── */}
                  {showingPromo && <MerdekaPromoBanner />}

                  {/* Rate Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {displayRates?.map((rate, rIdx) => {
                      if (showingPromo) {
                        return (
                          <PromoRateCard key={rIdx} rate={rate} index={rIdx} />
                        );
                      }

                      return (
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
                          {activeTrack === "student" && (
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                              <div className="absolute top-0 right-0 border-t-[32px] border-l-[32px] border-t-blue-500 border-l-transparent" />
                              <GraduationCap
                                size={10}
                                className="relative z-10 -mt-3 -mr-3 text-white"
                              />
                            </div>
                          )}
                          {activeTrack === "bni" && (
                            <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center">
                              <div className="absolute top-0 right-0 border-t-[32px] border-l-[32px] border-t-red-500 border-l-transparent" />
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
                      );
                    })}
                  </div>

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

                  {/* Merdeka Promo Note — Blue & Gold, dengan tempoh sah */}
                  {showingPromo && (
                    <div className="flex items-start gap-3 mb-6 px-4 py-3 bg-blue-50 border border-blue-200">
                      <Calendar
                        size={14}
                        className="text-blue-700 mt-0.5 shrink-0"
                      />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-blue-800 font-bold leading-relaxed">
                          Sah Tempoh: {MERDEKA_PROMO_PERIOD}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.1em] text-blue-600/80 leading-relaxed">
                          Harga Promosi Merdeka · Tertakluk Kepada Ketersediaan
                          Slot
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => openBookingModal(pkg)}
                      className={`w-full px-8 py-5 text-[10px] uppercase tracking-[0.5em] font-bold transition-all flex items-center justify-center gap-4 shadow-lg cursor-pointer group ${
                        showingPromo
                          ? "bg-gradient-to-r from-blue-800 to-blue-700 hover:from-blue-900 hover:to-blue-800 text-white border border-amber-300/20"
                          : "bg-zinc-900 hover:bg-black text-white"
                      }`}
                    >
                      {showingPromo ? (
                        <>
                          <Star
                            size={14}
                            className="fill-amber-300 text-amber-300"
                          />
                          Tuntut Harga Merdeka
                        </>
                      ) : (
                        "Reserve Space"
                      )}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Standard Facilities */}
        <div className="mt-16 p-8 md:p-10 bg-zinc-900 border border-zinc-800 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.03] skew-x-12 translate-x-1/2" />
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
                  <div className="w-1.5 h-1.5 bg-white/30 rounded-full group-hover/inc:bg-white group-hover/inc:scale-150 transition-all" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 group-hover/inc:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Booking Modal ─────────────────────────────────── */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
        packageTitle={bookingModal.packageTitle}
        packageTier={bookingModal.packageTier}
        packageCapacity={bookingModal.packageCapacity}
        packageImage={bookingModal.packageImage}
        activeTrack={bookingModal.activeTrack}
        rates={bookingModal.rates}
        whatsappNumber={WHATSAPP_NUMBER}
      />
    </section>
  );
};

export default Membership;
