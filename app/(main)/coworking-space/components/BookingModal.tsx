// components/BookingModal.tsx
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image, { StaticImageData } from "next/image";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Send,
  Coffee,
  Sun,
  CloudMoon,
  UtensilsCrossed,
  Plus,
  Minus,
  Trash2,
  Building2,
  Tag,
} from "lucide-react";

// ─── Catering Data ─────────────────────────────────────────
interface CateringPackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  inclusions: string[];
  image: string;
  minPax: number;
  category: "breakfast" | "lunch" | "teatime";
}

const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: "b1",
    title: "Continental Lite",
    subtitle: "Sandwiches & Cakes",
    price: 10,
    inclusions: [
      "Tuna Sandwich (2 pcs)",
      "Cake Slice (2 pcs)",
      "Hot Tea / Coffee",
    ],
    image:
      "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=800&auto=format&fit=crop",
    minPax: 5,
    category: "breakfast",
  },
  {
    id: "b2",
    title: "Local Favorite",
    subtitle: "Hot Savory Start",
    price: 10,
    inclusions: ["Mihun Goreng", "Cake Slice (2 pcs)", "Hot Tea / Coffee"],
    image:
      "https://images.unsplash.com/photo-1741243412484-558eb91fe8c7?q=80&w=800&auto=format&fit=crop",
    minPax: 5,
    category: "breakfast",
  },
  {
    id: "l1",
    title: "Beriani Royale",
    subtitle: "Signature Lunch",
    price: 15,
    inclusions: [
      "Nasi Hujan Panas / Beriani",
      "Ayam Pedas + Sambal",
      "Ulam & Dalca",
      "Fruits + Air Kordial",
    ],
    image:
      "https://images.unsplash.com/photo-1697155406055-2db32d47ca07?q=80&w=800&auto=format&fit=crop",
    minPax: 10,
    category: "lunch",
  },
  {
    id: "l2",
    title: "Daging Kerutuk",
    subtitle: "Heritage Menu",
    price: 18,
    inclusions: [
      "Nasi Hujan Panas / Beriani",
      "Daging Kerutuk Signature",
      "Sambal + Ulam",
      "Fruits + Air Kordial",
    ],
    image:
      "https://images.unsplash.com/photo-1740993382497-65dba6c7a689?q=80&w=800&auto=format&fit=crop",
    minPax: 10,
    category: "lunch",
  },
  {
    id: "l3",
    title: "Port B Nasi Ayam",
    subtitle: "Quick Lunch",
    price: 12,
    inclusions: [
      "Roasted Chicken Rice",
      "Soup & Chili",
      "Fruits + Air Kordial",
    ],
    image:
      "https://images.unsplash.com/photo-1666239308347-4292ea2ff777?q=80&w=800&auto=format&fit=crop",
    minPax: 5,
    category: "lunch",
  },
  {
    id: "t1",
    title: "Artisan Hi-Tea",
    subtitle: "Sweet & Savory",
    price: 10,
    inclusions: [
      "Blueberry Tart / Cream Puff",
      "Tuna Sandwich",
      "Fruits",
      "Beverage",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1663133727215-bf732c62d681?q=80&w=800&auto=format&fit=crop",
    minPax: 5,
    category: "teatime",
  },
];

interface SelectedCatering {
  packageId: string;
  quantity: number;
}

// ─── Component Props ───────────────────────────────────────
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageTitle: string;
  packageTier: string;
  packageCapacity: string;
  packageImage: string | StaticImageData;
  activeTrack: "standard" | "student" | "bni";
  rates: { period: string; price: string }[];
  whatsappNumber: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  duration?: string;
  customHours?: string;
  companyName?: string;
  eventName?: string;
}

const OPERATING_OPEN = 9;
const OPERATING_CLOSE = 18;

const formatTo12Hour = (time24: string): string => {
  if (!time24) return "";
  const [h, m] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

const formatTo12HourShort = (time24: string): string => {
  if (!time24) return "";
  const [h] = time24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour12} ${period}`;
};

const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let h = OPERATING_OPEN; h < OPERATING_CLOSE; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
};

const ALL_TIME_SLOTS = generateTimeSlots();

// ─── Which packages get catering & extra fields ────────────
const CATERING_ELIGIBLE = ["Event Space"];
const SPACE_RENTAL_TITLES = ["Meeting Room", "The Green Area", "Event Space"];

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  packageTitle,
  packageTier,
  packageCapacity,
  packageImage,
  activeTrack,
  rates,
  whatsappNumber,
}) => {
  const showCateringStep = CATERING_ELIGIBLE.includes(packageTitle);
  const isSpaceRental = SPACE_RENTAL_TITLES.includes(packageTitle);
  const totalSteps = showCateringStep ? 4 : 3;

  const [step, setStep] = useState(1);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [selectedRate, setSelectedRate] = useState("");
  const [customHours, setCustomHours] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pax, setPax] = useState("1");
  const [notes, setNotes] = useState("");

  // ─── Space Rental extra fields ───────────────────────────
  const [companyName, setCompanyName] = useState("");
  const [eventName, setEventName] = useState("");

  // ─── Catering state ──────────────────────────────────────
  const [selectedCatering, setSelectedCatering] = useState<SelectedCatering[]>(
    [],
  );
  const [cateringTab, setCateringTab] = useState<
    "breakfast" | "lunch" | "teatime"
  >("breakfast");

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [shakeStep, setShakeStep] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ─── Step type mapping ───────────────────────────────────
  const getStepType = useCallback(
    (s: number): "duration" | "schedule" | "addons" | "confirm" => {
      if (s === 1) return "duration";
      if (s === 2) return "schedule";
      if (showCateringStep) {
        if (s === 3) return "addons";
        if (s === 4) return "confirm";
      }
      return s === 3 ? "confirm" : "confirm";
    },
    [showCateringStep],
  );

  const currentStepType = getStepType(step);

  const stepLabels = showCateringStep
    ? ["Duration", "Schedule", "Add-ons", "Confirm"]
    : ["Duration", "Schedule", "Confirm"];

  // ─── Time helpers ────────────────────────────────────────
  const getTimeBasedHours = useCallback((): number => {
    if (selectedRate === "Hourly" && customHours)
      return parseInt(customHours) || 1;
    if (selectedRate === "4 Hours") return 4;
    if (selectedRate === "8 Hours") return 8;
    return 0;
  }, [selectedRate, customHours]);

  const getMaxBookableHours = useCallback(
    () => OPERATING_CLOSE - OPERATING_OPEN,
    [],
  );

  const calculateEndTime24 = useCallback(
    (startTime24: string): string => {
      if (!startTime24) return "";
      const hours = getTimeBasedHours();
      if (hours <= 0) return "";
      const [h, m] = startTime24.split(":").map(Number);
      const endH = h + hours;
      if (endH > OPERATING_CLOSE)
        return `${String(OPERATING_CLOSE).padStart(2, "0")}:00`;
      return `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    },
    [getTimeBasedHours],
  );

  const getTimeRangeDisplay = useCallback((): string => {
    if (!selectedTime) return "";
    const end = calculateEndTime24(selectedTime);
    if (!end) return formatTo12Hour(selectedTime);
    return `${formatTo12Hour(selectedTime)} – ${formatTo12Hour(end)}`;
  }, [selectedTime, calculateEndTime24]);

  const getAvailableStartTimes = useCallback((): string[] => {
    const hours = getTimeBasedHours();
    if (hours <= 0) return ALL_TIME_SLOTS;
    return ALL_TIME_SLOTS.filter((t) => {
      const [h] = t.split(":").map(Number);
      return h + hours <= OPERATING_CLOSE;
    });
  }, [getTimeBasedHours]);

  const getTrackLabel = () => {
    switch (activeTrack) {
      case "student":
        return "Student Rate";
      case "bni":
        return "BNI Member Rate";
      default:
        return "Standard Rate";
    }
  };

  const getTrackColor = () => {
    switch (activeTrack) {
      case "student":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-600",
          accent: "bg-blue-600",
          gradient: "from-blue-600 to-indigo-600",
        };
      case "bni":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-600",
          accent: "bg-red-600",
          gradient: "from-red-600 to-rose-600",
        };
      default:
        return {
          bg: "bg-zinc-50",
          border: "border-zinc-200",
          text: "text-zinc-900",
          accent: "bg-zinc-900",
          gradient: "from-zinc-800 to-zinc-900",
        };
    }
  };

  const colors = getTrackColor();
  const today = new Date().toISOString().split("T")[0];
  const isTimeBased = ["Hourly", "4 Hours", "8 Hours"].includes(selectedRate);
  const isPeriodBased = ["Daily", "Weekly", "Monthly"].includes(selectedRate);

  const getSuggestedEndDate = useCallback(() => {
    if (!selectedDate || !isPeriodBased) return "";
    const start = new Date(selectedDate);
    switch (selectedRate) {
      case "Daily":
        return selectedDate;
      case "Weekly":
        start.setDate(start.getDate() + 6);
        return start.toISOString().split("T")[0];
      case "Monthly":
        start.setMonth(start.getMonth() + 1);
        start.setDate(start.getDate() - 1);
        return start.toISOString().split("T")[0];
      default:
        return "";
    }
  }, [selectedDate, selectedRate, isPeriodBased]);

  useEffect(() => {
    const s = getSuggestedEndDate();
    if (s) setEndDate(s);
  }, [getSuggestedEndDate]);

  useEffect(() => {
    if (selectedTime && isTimeBased) {
      const avail = getAvailableStartTimes();
      if (!avail.includes(selectedTime)) setSelectedTime("");
    }
  }, [
    selectedRate,
    customHours,
    selectedTime,
    isTimeBased,
    getAvailableStartTimes,
  ]);

  // ─── Catering helpers ────────────────────────────────────
  const getCateringQuantity = (pkgId: string): number => {
    return selectedCatering.find((c) => c.packageId === pkgId)?.quantity || 0;
  };

  const updateCateringQuantity = (pkgId: string, delta: number) => {
    const pkg = CATERING_PACKAGES.find((p) => p.id === pkgId);
    if (!pkg) return;

    setSelectedCatering((prev) => {
      const existing = prev.find((c) => c.packageId === pkgId);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0 || newQty < pkg.minPax) {
          return prev.filter((c) => c.packageId !== pkgId);
        }
        return prev.map((c) =>
          c.packageId === pkgId ? { ...c, quantity: newQty } : c,
        );
      } else if (delta > 0) {
        return [
          ...prev,
          { packageId: pkgId, quantity: Math.max(pkg.minPax, delta) },
        ];
      }
      return prev;
    });
  };

  const removeCatering = (pkgId: string) => {
    setSelectedCatering((prev) => prev.filter((c) => c.packageId !== pkgId));
  };

  const getCateringTotal = (): number => {
    return selectedCatering.reduce((total, item) => {
      const pkg = CATERING_PACKAGES.find((p) => p.id === item.packageId);
      return total + (pkg ? pkg.price * item.quantity : 0);
    }, 0);
  };

  const getSpacePrice = useCallback((): number => {
    const r = rates.find((r) => r.period === selectedRate);
    const p = parseInt(r?.price || "0");
    if (selectedRate === "Hourly" && customHours)
      return p * parseInt(customHours || "1");
    return p;
  }, [rates, selectedRate, customHours]);

  // ─── Validation ──────────────────────────────────────────
  const scrollToFirstError = useCallback(() => {
    if (!bodyRef.current) return;
    setTimeout(() => {
      const el = bodyRef.current?.querySelector("[data-error='true']");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  const triggerShake = useCallback(() => {
    setShakeStep(true);
    setTimeout(() => setShakeStep(false), 600);
  }, []);

  const validateStep = (s: number): boolean => {
    const type = getStepType(s);
    const newErrors: FormErrors = {};
    const maxH = getMaxBookableHours();

    if (type === "duration") {
      if (!selectedRate) newErrors.duration = "Please select a duration";
      if (selectedRate === "Hourly" && !customHours.trim())
        newErrors.customHours = "Please enter number of hours";
      if (selectedRate === "Hourly" && customHours) {
        const h = parseInt(customHours);
        if (h < 1) newErrors.customHours = "Minimum 1 hour";
        else if (h > maxH) newErrors.customHours = `Maximum ${maxH} hours`;
      }
      setTouched((p) => ({ ...p, duration: true, customHours: true }));
    }

    if (type === "schedule") {
      if (!selectedDate) newErrors.date = "Please select a date";
      if (isTimeBased && !selectedTime)
        newErrors.time = "Please select a start time";
      setTouched((p) => ({ ...p, date: true, time: true }));
    }

  if (type === "confirm") {
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    // Space rental extra fields — required
    if (isSpaceRental) {
      if (!companyName.trim())
        newErrors.companyName = "Company / Organization name is required";
      if (!eventName.trim()) newErrors.eventName = "Event name is required";
    }

    setTouched((p) => ({
      ...p,
      name: true,
      phone: true,
      email: true,
      companyName: true,
      eventName: true,
    }));
  }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      triggerShake();
      scrollToFirstError();
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((p) => Math.min(p + 1, totalSteps));
      setTouched({});
      bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((p) => Math.max(p - 1, 1));
    setErrors({});
    setTouched({});
    bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setStep(1);
      setSelectedRate("");
      setCustomHours("");
      setSelectedDate("");
      setSelectedTime("");
      setEndDate("");
      setName("");
      setEmail("");
      setPhone("");
      setPax("1");
      setNotes("");
      setCompanyName("");
      setEventName("");
      setSelectedCatering([]);
      setCateringTab("breakfast");
      setErrors({});
      setTouched({});
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen, handleClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ─── WhatsApp Message ────────────────────────────────────
  const generateWhatsAppMessage = () => {
    const rateObj = rates.find((r) => r.period === selectedRate);
    const price = rateObj?.price || "N/A";

    const fmtDate = (d: string) => {
      if (!d) return "";
      return new Date(d).toLocaleDateString("en-MY", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    let dur = selectedRate;
    if (selectedRate === "Hourly" && customHours)
      dur = `${customHours} Hour${parseInt(customHours) > 1 ? "s" : ""}`;

    let prc = `RM ${price}`;
    if (selectedRate === "Hourly" && customHours) {
      const tot = parseInt(price) * parseInt(customHours || "1");
      prc = `RM ${price}/hr x ${customHours} hrs = RM ${tot}`;
    }

    let msg = `Assalamualaikum & Hi,\n\n`;
    msg += `I would like to *reserve a space* at Port B Coworking.\n\n`;

    msg += `*BOOKING DETAILS*\n`;
    msg += `------------------------------\n`;
    msg += `- Space: ${packageTitle}\n`;
    msg += `- Tier: ${packageTier}\n`;
    msg += `- Capacity: ${packageCapacity}\n`;
    msg += `- Rate Type: ${getTrackLabel()}\n`;
    msg += `- Duration: ${dur}\n`;
    msg += `- Space Price: ${prc}\n`;
    msg += `- Date: ${fmtDate(selectedDate)}\n`;

    if (isTimeBased && selectedTime)
      msg += `- Time: ${getTimeRangeDisplay()}\n`;
    if (isPeriodBased && endDate && selectedRate !== "Daily")
      msg += `- End Date: ${fmtDate(endDate)}\n`;

    // Catering
    if (selectedCatering.length > 0) {
      msg += `\n*CATERING ADD-ONS*\n`;
      msg += `------------------------------\n`;
      selectedCatering.forEach((item) => {
        const pkg = CATERING_PACKAGES.find((p) => p.id === item.packageId);
        if (pkg) {
          msg += `*${pkg.title}* (${pkg.subtitle})\n`;
          msg += `RM ${pkg.price}/pax x ${item.quantity} pax = RM ${pkg.price * item.quantity}\n`;
          msg += `Inclusions:\n`;
          pkg.inclusions.forEach((inc) => {
            msg += `  • ${inc}\n`;
          });
          msg += `\n`;
        }
      });
      msg += `*Catering Total: RM ${getCateringTotal()}*\n`;
    }

    // Grand total
    const grandTotal = getSpacePrice() + getCateringTotal();
    msg += `\n*TOTAL ESTIMATE: RM ${grandTotal}*\n`;

    msg += `\n*CONTACT INFORMATION*\n`;
    msg += `------------------------------\n`;

    // Space rental extra fields
    if (isSpaceRental) {
      msg += `- Company / Org: ${companyName}\n`;
      msg += `- Event Name: ${eventName}\n`;
    }

    msg += `- Name: ${name}\n`;
    msg += `- Phone: ${phone}\n`;
    if (email) msg += `- Email: ${email}\n`;
    msg += `- No. of Pax: ${pax}\n`;

    if (activeTrack === "student")
      msg += `\n_I will present my valid Student ID upon arrival._\n`;
    if (activeTrack === "bni")
      msg += `\n_I will present my BNI Membership Card upon arrival._\n`;
    if (notes.trim()) msg += `\n*Additional Notes:*\n${notes}\n`;

    msg += `\nLooking forward to your confirmation. Thank you!`;

    return encodeURIComponent(msg);
  };;

  const handleSendWhatsApp = () => {
    if (!validateStep(step)) return;
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    handleClose();
  };

  if (!mounted || (!isOpen && !isClosing)) return null;

  const errorCount = Object.keys(errors).length;
  const availableSlots = getAvailableStartTimes();
  const maxHours = getMaxBookableHours();
  const cateringTotal = getCateringTotal();
  const spacePrice = getSpacePrice();
  const grandTotal = spacePrice + cateringTotal;

  const filteredCateringPackages = CATERING_PACKAGES.filter(
    (p) => p.category === cateringTab,
  );

  const modalContent = (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
      style={{ zIndex: 99999 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <div
        ref={modalRef}
        className={`relative w-full max-w-3xl mx-4 max-h-[94vh] bg-white shadow-2xl border border-zinc-200 flex flex-col transform transition-all duration-300 ${isClosing ? "scale-95 opacity-0 translate-y-4" : "scale-100 opacity-100 translate-y-0"}`}
        style={{ zIndex: 100000 }}
      >
        {/* ─── Hero Header ─────────────────────────────── */}
        <div className="relative flex-shrink-0">
          <div className="relative h-36 sm:h-44 w-full overflow-hidden">
            <Image
              src={packageImage}
              alt={packageTitle}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20 mix-blend-multiply`}
            />
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 group w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-white hover:border-white transition-all cursor-pointer"
            >
              <X
                size={16}
                className="text-white group-hover:text-zinc-900 transition-colors"
              />
            </button>
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="text-[8px] uppercase tracking-[0.5em] font-bold px-3 py-1.5 bg-white text-zinc-900 shadow-lg">
                {packageTier}
              </span>
              <span
                className={`text-[8px] uppercase tracking-[0.4em] font-bold px-3 py-1.5 flex items-center gap-1.5 shadow-lg ${activeTrack === "student" ? "bg-blue-600 text-white" : activeTrack === "bni" ? "bg-red-600 text-white" : "bg-zinc-900 text-white"}`}
              >
                {activeTrack === "student" && <GraduationCap size={10} />}
                {activeTrack === "bni" && <Briefcase size={10} />}
                {getTrackLabel()}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-16">
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight leading-tight drop-shadow-lg">
                Reserve {packageTitle}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-white/70">
                <Users size={12} />
                <span className="text-[10px] uppercase tracking-widest">
                  {packageCapacity}
                </span>
              </div>
            </div>
          </div>

          <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient}`} />

          {/* Step Indicator */}
          <div className="px-6 md:px-8 py-3 bg-white border-b border-zinc-100">
            <div className="flex items-center gap-1.5">
              {stepLabels.map((label, i) => {
                const sn = i + 1;
                const active = step === sn;
                const done = step > sn;
                return (
                  <React.Fragment key={label}>
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-500 ${done ? `${colors.accent} text-white` : active ? `${colors.accent} text-white scale-110 shadow-lg` : "bg-zinc-100 text-zinc-400 border border-zinc-200"}`}
                      >
                        {done ? <CheckCircle2 size={12} /> : sn}
                      </div>
                      <span
                        className={`text-[8px] uppercase tracking-widest font-medium hidden sm:block ${active || done ? "text-zinc-900" : "text-zinc-300"}`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div
                        className={`flex-1 h-px ${done ? colors.accent : "bg-zinc-200"}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Body ────────────────────────────────────── */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          {/* Error Banner */}
          {errorCount > 0 && Object.values(touched).some(Boolean) && (
            <div className="mb-5 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 animate-fadeUp">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertCircle size={14} className="text-red-600" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-red-700">
                  Please complete all required fields
                </p>
                <p className="text-[10px] text-red-500">
                  {errorCount}{" "}
                  {errorCount === 1 ? "field needs" : "fields need"} attention.
                </p>
              </div>
            </div>
          )}

          {/* ─── STEP: DURATION ──────────────────────────── */}
          {currentStepType === "duration" && (
            <div
              className={`animate-fadeUp ${shakeStep ? "animate-shake" : ""}`}
            >
              <div className="mb-6">
                <h4 className="text-lg font-serif text-zinc-900 mb-1">
                  Select Your Duration
                </h4>
                <p className="text-sm text-zinc-500">
                  Choose how long you&apos;d like to reserve this space.
                </p>
              </div>

              <div className="flex items-center gap-2 mb-4 px-3 py-2.5 bg-amber-50 border border-amber-200 text-amber-700">
                <Clock size={14} className="flex-shrink-0" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Operating Hours: {formatTo12HourShort(`${OPERATING_OPEN}:00`)}{" "}
                  – {formatTo12HourShort(`${OPERATING_CLOSE}:00`)}
                </span>
              </div>

              <div data-error={errors.duration ? "true" : undefined}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {rates.map((rate) => {
                    const sel = selectedRate === rate.period;
                    return (
                      <button
                        key={rate.period}
                        onClick={() => {
                          setSelectedRate(rate.period);
                          setErrors((p) => ({ ...p, duration: undefined }));
                        }}
                        className={`group relative p-5 border-2 transition-all duration-300 text-left cursor-pointer ${sel ? `${colors.border} ${colors.bg} shadow-lg scale-[1.02]` : errors.duration && touched.duration ? "border-red-300 bg-red-50/30" : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-md"}`}
                      >
                        {sel && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle2 size={16} className={colors.text} />
                          </div>
                        )}
                        <span
                          className={`text-[9px] uppercase tracking-[0.4em] block mb-2 font-bold ${sel ? colors.text : "text-zinc-400"}`}
                        >
                          {rate.period}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`text-[10px] font-bold ${sel ? colors.text : "text-zinc-400"}`}
                          >
                            RM
                          </span>
                          <span
                            className={`text-3xl font-serif ${sel ? "text-zinc-900" : "text-zinc-700"}`}
                          >
                            {rate.price}
                          </span>
                        </div>
                        {rate.period === "Hourly" && (
                          <span className="text-[8px] text-zinc-400 mt-1 block">
                            per hour
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {errors.duration && touched.duration && (
                  <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-red-50 border border-red-200 text-red-600 animate-fadeUp">
                    <AlertCircle size={14} />
                    <span className="text-[11px] uppercase tracking-wider font-bold">
                      {errors.duration}
                    </span>
                  </div>
                )}
              </div>

              {selectedRate === "Hourly" && (
                <div
                  className="mt-4 p-4 bg-zinc-50 border border-zinc-200 animate-fadeUp"
                  data-error={errors.customHours ? "true" : undefined}
                >
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 block">
                    How many hours? <span className="text-red-400">*</span>
                    <span className="text-zinc-400 normal-case tracking-normal ml-2">
                      (max {maxHours} hrs)
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max={maxHours}
                      value={customHours}
                      onChange={(e) => {
                        setCustomHours(e.target.value);
                        if (e.target.value.trim())
                          setErrors((p) => ({ ...p, customHours: undefined }));
                      }}
                      placeholder="e.g. 3"
                      className={`w-24 px-4 py-3 border text-lg font-serif text-zinc-900 focus:outline-none transition-all ${errors.customHours && touched.customHours ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                    />
                    <span className="text-sm text-zinc-500">hours</span>
                    {customHours &&
                      parseInt(customHours) >= 1 &&
                      parseInt(customHours) <= maxHours && (
                        <span className="text-sm font-medium text-zinc-700 ml-auto">
                          RM{" "}
                          {parseInt(
                            rates.find((r) => r.period === "Hourly")?.price ||
                              "0",
                          ) * parseInt(customHours || "1")}
                        </span>
                      )}
                  </div>
                  {errors.customHours && touched.customHours && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 animate-fadeUp">
                      <AlertCircle size={12} />
                      <span className="text-[10px] uppercase tracking-wider font-medium">
                        {errors.customHours}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ─── STEP: SCHEDULE ──────────────────────────── */}
          {currentStepType === "schedule" && (
            <div
              className={`animate-fadeUp ${shakeStep ? "animate-shake" : ""}`}
            >
              <div className="mb-6">
                <h4 className="text-lg font-serif text-zinc-900 mb-1">
                  Pick Your Schedule
                </h4>
                <p className="text-sm text-zinc-500">
                  When would you like to use the space?
                </p>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 mb-6 text-[9px] uppercase tracking-widest font-bold ${colors.bg} ${colors.text} ${colors.border} border`}
              >
                <Clock size={12} />
                {selectedRate}
                {selectedRate === "Hourly" && customHours
                  ? ` x ${customHours}hrs`
                  : ""}{" "}
                — RM {spacePrice}
              </div>

              <div className="space-y-5">
                <div data-error={errors.date ? "true" : undefined}>
                  <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                    <Calendar size={12} />
                    {isPeriodBased ? "Start Date" : "Date"}{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setErrors((p) => ({ ...p, date: undefined }));
                      setTouched((p) => ({ ...p, date: false })); // ✅ Reset touched
                    }}
                    className={`w-full px-4 py-3.5 border text-zinc-900 text-sm focus:outline-none transition-all ${errors.date && touched.date ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                  />
                  {errors.date && touched.date && (
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-50 border border-red-200 text-red-600 animate-fadeUp">
                      <AlertCircle size={12} />
                      <span className="text-[10px] uppercase tracking-wider font-bold">
                        {errors.date}
                      </span>
                    </div>
                  )}
                </div>

                {isPeriodBased && selectedRate !== "Daily" && (
                  <div className="animate-fadeUp">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                      <Calendar size={12} /> End Date
                    </label>
                    <input
                      type="date"
                      min={selectedDate || today}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3.5 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                )}

                {isTimeBased && (
                  <div
                    className="animate-fadeUp"
                    data-error={errors.time ? "true" : undefined}
                  >
                    <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                      <Clock size={12} /> Start Time{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-2 mb-3 text-[9px] text-amber-600 font-medium">
                      <AlertCircle size={11} />
                      <span>
                        All bookings must end by{" "}
                        {formatTo12HourShort(`${OPERATING_CLOSE}:00`)}.
                      </span>
                    </div>
                    <div
                      className={`grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 border rounded ${errors.time && touched.time ? "border-red-300 bg-red-50/30" : "border-transparent"}`}
                    >
                      {availableSlots.map((t24) => {
                        const sel = selectedTime === t24;
                        const end = calculateEndTime24(t24);
                        return (
                          <button
                            key={t24}
                            onClick={() => {
                              setSelectedTime(t24);
                              setErrors((p) => ({ ...p, time: undefined }));
                            }}
                            className={`py-3 px-2 text-center border-2 transition-all cursor-pointer rounded-sm ${sel ? `${colors.accent} text-white border-transparent shadow-lg scale-[1.03]` : "border-zinc-200 text-zinc-600 hover:border-zinc-400 bg-white"}`}
                          >
                            <span className="text-[12px] font-bold block">
                              {formatTo12HourShort(t24)}
                            </span>
                            {end && (
                              <span
                                className={`text-[9px] block mt-1 ${sel ? "text-white/70" : "text-zinc-400"}`}
                              >
                                to {formatTo12HourShort(end)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {selectedTime && (
                      <div
                        className={`mt-3 flex items-center gap-3 px-4 py-3 ${colors.bg} ${colors.border} border rounded-sm`}
                      >
                        <Clock size={16} className={colors.text} />
                        <span className={`text-base font-bold ${colors.text}`}>
                          {getTimeRangeDisplay()}
                        </span>
                        <span className="text-[9px] uppercase tracking-widest text-zinc-400 ml-2">
                          ({getTimeBasedHours()}{" "}
                          {getTimeBasedHours() === 1 ? "hour" : "hours"})
                        </span>
                      </div>
                    )}
                    {errors.time && touched.time && (
                      <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-red-50 border border-red-200 text-red-600 animate-fadeUp">
                        <AlertCircle size={12} />
                        <span className="text-[10px] uppercase tracking-wider font-bold">
                          {errors.time}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── STEP: ADD-ONS (CATERING) ────────────────── */}
          {currentStepType === "addons" && (
            <div className="animate-fadeUp">
              <div className="mb-6">
                <h4 className="text-lg font-serif text-zinc-900 mb-1">
                  Catering Add-ons
                </h4>
                <p className="text-sm text-zinc-500">
                  Optional — enhance your event with our catering packages.
                  Prices are per pax.
                </p>
              </div>

              {/* Catering Tabs */}
              <div className="flex border-2 border-zinc-900 mb-6 bg-white relative">
                <div
                  className={`absolute top-0 h-full bg-zinc-900 transition-all duration-400 ease-out ${cateringTab === "breakfast" ? "left-0 w-1/3" : cateringTab === "lunch" ? "left-1/3 w-1/3" : "left-2/3 w-1/3"}`}
                />
                {[
                  {
                    key: "breakfast" as const,
                    label: "Breakfast",
                    icon: Coffee,
                  },
                  { key: "lunch" as const, label: "Lunch", icon: Sun },
                  {
                    key: "teatime" as const,
                    label: "Tea Time",
                    icon: CloudMoon,
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCateringTab(tab.key)}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${cateringTab === tab.key ? "text-white" : "text-zinc-500 hover:text-zinc-900"}`}
                  >
                    <tab.icon size={14} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Package Cards — with images */}
              <div className="space-y-4">
                {filteredCateringPackages.map((pkg) => {
                  const qty = getCateringQuantity(pkg.id);
                  const isAdded = qty > 0;

                  return (
                    <div
                      key={pkg.id}
                      className={`border-2 transition-all duration-300 overflow-hidden ${isAdded ? "border-zinc-900 shadow-md" : "border-zinc-200 hover:border-zinc-300"}`}
                    >
                      {/* Image + Info Layout */}
                      <div className="flex">
                        {/* Image */}
                        <div className="relative w-28 sm:w-36 flex-shrink-0">
                          <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            sizes="144px"
                            className="object-cover"
                          />
                          {isAdded && (
                            <div className="absolute inset-0 bg-zinc-900/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                                <CheckCircle2
                                  size={16}
                                  className="text-emerald-600"
                                />
                              </div>
                            </div>
                          )}
                          {/* Min pax badge */}
                          <div className="absolute bottom-2 left-2">
                            <span className="text-[8px] uppercase tracking-widest bg-black/70 text-white px-2 py-1 backdrop-blur-sm font-bold">
                              Min {pkg.minPax} Pax
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <h5 className="text-base font-serif text-zinc-900">
                                  {pkg.title}
                                </h5>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
                                  {pkg.subtitle}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="flex items-baseline gap-0.5">
                                  <span className="text-[9px] font-bold text-zinc-400">
                                    RM
                                  </span>
                                  <span className="text-xl font-serif text-zinc-900">
                                    {pkg.price}
                                  </span>
                                </div>
                                <span className="text-[8px] uppercase tracking-widest text-zinc-400">
                                  /pax
                                </span>
                              </div>
                            </div>

                            {/* Inclusions */}
                            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-3">
                              {pkg.inclusions.map((item, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] text-zinc-500 flex items-center gap-1"
                                >
                                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between">
                            {isAdded ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() =>
                                    updateCateringQuantity(pkg.id, -1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center border border-zinc-300 hover:border-zinc-900 cursor-pointer bg-white"
                                >
                                  <Minus size={12} />
                                </button>
                                <div className="w-12 h-8 flex items-center justify-center border-y border-zinc-300 text-sm font-bold text-zinc-900 bg-white">
                                  {qty}
                                </div>
                                <button
                                  onClick={() =>
                                    updateCateringQuantity(pkg.id, 1)
                                  }
                                  className="w-8 h-8 flex items-center justify-center border border-zinc-300 hover:border-zinc-900 cursor-pointer bg-white"
                                >
                                  <Plus size={12} />
                                </button>
                                <button
                                  onClick={() => removeCatering(pkg.id)}
                                  className="w-8 h-8 flex items-center justify-center border border-red-200 hover:border-red-500 hover:bg-red-50 cursor-pointer ml-1"
                                >
                                  <Trash2 size={12} className="text-red-400" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  updateCateringQuantity(pkg.id, 1)
                                }
                                className="flex items-center gap-2 px-4 py-2 border-2 border-zinc-900 text-[9px] uppercase tracking-widest font-bold text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer"
                              >
                                <Plus size={12} />
                                Add
                              </button>
                            )}

                            {isAdded && (
                              <span className="text-[10px] font-bold text-zinc-700">
                                RM {pkg.price * qty}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Bar */}
              {selectedCatering.length > 0 && (
                <div className="mt-6 p-4 bg-zinc-900 text-white animate-fadeUp">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">
                      Catering Summary
                    </span>
                    <button
                      onClick={() => setSelectedCatering([])}
                      className="text-[9px] uppercase tracking-widest text-red-400 hover:text-red-300 cursor-pointer font-bold"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2 mb-3">
                    {selectedCatering.map((item) => {
                      const pkg = CATERING_PACKAGES.find(
                        (p) => p.id === item.packageId,
                      );
                      if (!pkg) return null;
                      return (
                        <div
                          key={item.packageId}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-zinc-300">
                            {pkg.title}{" "}
                            <span className="text-zinc-500">
                              x{item.quantity} pax
                            </span>
                          </span>
                          <span className="font-bold">
                            RM {pkg.price * item.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-zinc-700 pt-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                      Catering Total
                    </span>
                    <span className="text-lg font-serif font-bold">
                      RM {cateringTotal}
                    </span>
                  </div>
                </div>
              )}

              {selectedCatering.length === 0 && (
                <div className="mt-6 flex items-center gap-3 px-4 py-3 bg-zinc-100 border border-zinc-200 text-zinc-500">
                  <UtensilsCrossed size={16} />
                  <p className="text-[10px] uppercase tracking-widest font-medium">
                    No catering selected — you can skip this step
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ─── STEP: CONFIRM ───────────────────────────── */}
          {currentStepType === "confirm" && (
            <div
              className={`animate-fadeUp ${shakeStep ? "animate-shake" : ""}`}
            >
              <div className="mb-6">
                <h4 className="text-lg font-serif text-zinc-900 mb-1">
                  Confirm Your Booking
                </h4>
                <p className="text-sm text-zinc-500">
                  Review, fill in your details, and send via WhatsApp.
                </p>
              </div>

              {/* Summary */}
              <div
                className={`mb-6 border-2 ${colors.border} ${colors.bg} relative overflow-hidden`}
              >
                <div className="flex">
                  <div className="relative w-24 sm:w-32 flex-shrink-0 hidden sm:block">
                    <Image
                      src={packageImage}
                      alt={packageTitle}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20 mix-blend-multiply`}
                    />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                      <Sparkles size={80} />
                    </div>
                    <span
                      className={`text-[8px] uppercase tracking-[0.5em] font-bold ${colors.text} mb-3 block`}
                    >
                      Booking Summary
                    </span>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                      <div className="text-zinc-500">Space</div>
                      <div className="font-medium text-zinc-900">
                        {packageTitle}
                      </div>
                      <div className="text-zinc-500">Duration</div>
                      <div className="font-medium text-zinc-900">
                        {selectedRate}
                        {selectedRate === "Hourly" && customHours
                          ? ` (${customHours}hrs)`
                          : ""}
                      </div>
                      <div className="text-zinc-500">Date</div>
                      <div className="font-medium text-zinc-900">
                        {new Date(selectedDate).toLocaleDateString("en-MY", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      {isTimeBased && selectedTime && (
                        <>
                          <div className="text-zinc-500">Time</div>
                          <div className="font-bold text-zinc-900">
                            {getTimeRangeDisplay()}
                          </div>
                        </>
                      )}
                      {isPeriodBased && endDate && selectedRate !== "Daily" && (
                        <>
                          <div className="text-zinc-500">End Date</div>
                          <div className="font-medium text-zinc-900">
                            {new Date(endDate).toLocaleDateString("en-MY", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </>
                      )}
                      <div className="text-zinc-500">Space Rate</div>
                      <div className={`font-bold ${colors.text}`}>
                        RM {spacePrice}
                      </div>

                      {selectedCatering.length > 0 && (
                        <>
                          <div className="col-span-2 border-t border-zinc-200 mt-1 pt-2">
                            <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 font-bold">
                              Catering
                            </span>
                          </div>
                          {selectedCatering.map((item) => {
                            const pkg = CATERING_PACKAGES.find(
                              (p) => p.id === item.packageId,
                            );
                            if (!pkg) return null;
                            return (
                              <React.Fragment key={item.packageId}>
                                <div className="text-zinc-500 text-[11px]">
                                  {pkg.title}
                                </div>
                                <div className="font-medium text-zinc-900 text-[11px]">
                                  {item.quantity} pax — RM{" "}
                                  {pkg.price * item.quantity}
                                </div>
                              </React.Fragment>
                            );
                          })}
                          <div className="text-zinc-500">Catering Total</div>
                          <div className="font-bold text-zinc-900">
                            RM {cateringTotal}
                          </div>
                        </>
                      )}

                      <div className="col-span-2 border-t border-zinc-300 mt-2 pt-2 flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">
                          Total Estimate
                        </span>
                        <span
                          className={`text-xl font-serif font-bold ${colors.text}`}
                        >
                          RM {grandTotal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Form Fields ─────────────────────────── */}
              <div className="space-y-4">
                {/* ── Space Rental Fields: Company & Event ── */}
                {isSpaceRental && (
                  <>
                    <div data-error={errors.companyName ? "true" : undefined}>
                      <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                        <Building2 size={12} /> Company / Organization{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                          if (e.target.value.trim()) {
                            setErrors((p) => ({
                              ...p,
                              companyName: undefined,
                            }));
                            setTouched((p) => ({ ...p, companyName: false })); // ✅ Reset touched
                          }
                        }}
                        placeholder="e.g. Syarikat ABC Sdn Bhd"
                        className={`w-full px-4 py-3.5 border text-zinc-900 text-sm focus:outline-none transition-all placeholder:text-zinc-300 ${errors.companyName && touched.companyName ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                      />
                      {errors.companyName && touched.companyName && (
                        <span className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 animate-fadeUp">
                          <AlertCircle size={10} /> {errors.companyName}
                        </span>
                      )}
                    </div>

                    <div data-error={errors.eventName ? "true" : undefined}>
                      <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                        <Tag size={12} /> Event Name{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={eventName}
                        onChange={(e) => {
                          setEventName(e.target.value);
                          if (e.target.value.trim()) {
                            setErrors((p) => ({ ...p, eventName: undefined }));
                            setTouched((p) => ({ ...p, eventName: false })); // ✅ Reset touched
                          }
                        }}
                        placeholder="e.g. Q1 Team Planning Workshop"
                        className={`w-full px-4 py-3.5 border text-zinc-900 text-sm focus:outline-none transition-all placeholder:text-zinc-300 ${errors.eventName && touched.eventName ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                      />
                      {errors.eventName && touched.eventName && (
                        <span className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 animate-fadeUp">
                          <AlertCircle size={10} /> {errors.eventName}
                        </span>
                      )}
                    </div>

                    {/* Subtle divider */}
                    <div className="border-t border-zinc-200 pt-2" />
                  </>
                )}

                <div data-error={errors.name ? "true" : undefined}>
                  <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                    <User size={12} />{" "}
                    {isSpaceRental ? "Contact Person" : "Full Name"}{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) {
                        setErrors((p) => ({ ...p, name: undefined }));
                        setTouched((p) => ({ ...p, name: false })); // ✅ Reset touched
                      }
                    }}
                    placeholder="e.g. Ahmad Firdaus"
                    className={`w-full px-4 py-3.5 border text-zinc-900 text-sm focus:outline-none transition-all placeholder:text-zinc-300 ${errors.name && touched.name ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                  />
                  {errors.name && touched.name && (
                    <span className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 animate-fadeUp">
                      <AlertCircle size={10} /> {errors.name}
                    </span>
                  )}
                </div>

                <div data-error={errors.phone ? "true" : undefined}>
                  <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                    <Phone size={12} /> Phone Number{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value.trim()) {
                        setErrors((p) => ({ ...p, phone: undefined }));
                        setTouched((p) => ({ ...p, phone: false })); // ✅ Reset touched
                      }
                    }}
                    placeholder="e.g. 012-345 6789"
                    className={`w-full px-4 py-3.5 border text-zinc-900 text-sm focus:outline-none transition-all placeholder:text-zinc-300 ${errors.phone && touched.phone ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                  />
                  {errors.phone && touched.phone && (
                    <span className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 animate-fadeUp">
                      <AlertCircle size={10} /> {errors.phone}
                    </span>
                  )}
                </div>

                <div data-error={errors.email ? "true" : undefined}>
                  <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                    <Mail size={12} /> Email{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value.trim()) {
                        setErrors((p) => ({ ...p, email: undefined }));
                        setTouched((p) => ({ ...p, email: false })); // ✅ Reset touched
                      }
                    }}
                    placeholder="e.g. ahmad@email.com"
                    className={`w-full px-4 py-3.5 border text-zinc-900 text-sm focus:outline-none transition-all placeholder:text-zinc-300 ${errors.email && touched.email ? "border-red-400 bg-red-50/50" : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"}`}
                  />
                  {errors.email && touched.email && (
                    <span className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1 animate-fadeUp">
                      <AlertCircle size={10} /> {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                    <Users size={12} /> Number of Pax
                  </label>
                  <select
                    value={pax}
                    onChange={(e) => setPax(e.target.value)}
                    className="w-full px-4 py-3.5 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 appearance-none bg-white cursor-pointer"
                  >
                    {Array.from({ length: 40 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold mb-2 flex items-center gap-2">
                    <MessageCircle size={12} /> Additional Notes{" "}
                    <span className="text-zinc-300 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requirements?"
                    rows={3}
                    className="w-full px-4 py-3.5 border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 placeholder:text-zinc-300 resize-none"
                  />
                </div>
              </div>

              {activeTrack === "student" && (
                <div className="flex items-center gap-3 mt-4 px-4 py-3 bg-blue-50 border border-blue-200">
                  <GraduationCap size={16} className="text-blue-600" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-medium">
                    Please bring your valid Student ID
                  </p>
                </div>
              )}
              {activeTrack === "bni" && (
                <div className="flex items-center gap-3 mt-4 px-4 py-3 bg-red-50 border border-red-200">
                  <Briefcase size={16} className="text-red-600" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-medium">
                    Please bring your BNI Membership Card
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ─── Footer ──────────────────────────────────── */}
        <div className="flex-shrink-0 border-t border-zinc-200 px-6 md:px-8 py-4 bg-zinc-50">
          {showCateringStep && cateringTotal > 0 && step < totalSteps && (
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                <UtensilsCrossed size={12} />
                Space RM {spacePrice} + Catering RM {cateringTotal}
              </div>
              <span className="text-sm font-serif font-bold text-zinc-900">
                Total: RM {grandTotal}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-600 hover:text-zinc-900 border border-zinc-300 hover:border-zinc-900 cursor-pointer"
              >
                Back
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-3 text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                className={`px-8 py-3.5 text-[10px] uppercase tracking-[0.4em] font-bold text-white flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer ${colors.accent} hover:opacity-90`}
              >
                {currentStepType === "addons" && selectedCatering.length === 0
                  ? "Skip"
                  : "Continue"}
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleSendWhatsApp}
                className="px-8 py-3.5 text-[10px] uppercase tracking-[0.4em] font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-3 shadow-lg hover:shadow-xl cursor-pointer group"
              >
                <Send
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
                Confirm & Send
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 text-[8px] uppercase tracking-[0.3em] text-zinc-400">
            <MessageCircle size={10} />
            <span>
              You&apos;ll be redirected to WhatsApp to confirm your booking
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default BookingModal;
