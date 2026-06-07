// app/(main)/gallery/components/SpaceShowcase.tsx
"use client";
import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useSwipeable } from "react-swipeable";
import {
  Building2,
  Users,
  CalendarCheck,
  TreePine,
  Handshake,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
} from "lucide-react";
import { assets } from "@/assets/asset";

interface SpaceImage {
  id: number;
  image_url: string;
  category: "fixed-desk" | "common-area" | "event-space" | "green-area" | "meeting-area";
  alt_text?: string;
  description?: string;
}

const SAMPLE_SPACES: SpaceImage[] = [
  {
    id: 1,
    image_url: assets.fixed_desk_guests.src,
    category: "fixed-desk",
    alt_text: "Fixed Desk Space 1",
    description: "Dedicated workspace with ergonomic setup",
  },
  {
    id: 2,
    image_url: assets.fixed_desk_area_1.src,
    category: "fixed-desk",
    alt_text: "Fixed Desk Space 2",
  },
  {
    id: 3,
    image_url: assets.fixed_desk_area_2.src,
    category: "fixed-desk",
    alt_text: "Fixed Desk Space 3",
  },
  {
    id: 4,
    image_url: assets.fixed_desk_area_3.src,
    category: "fixed-desk",
    alt_text: "Fixed Desk Space 4",
  },
  {
    id: 5,
    image_url: assets.common_area_guests.src,
    category: "common-area",
    alt_text: "Common Area 1",
    description: "Collaborative space for teams",
  },
  {
    id: 6,
    image_url: assets.common_area_1.src,
    category: "common-area",
    alt_text: "Common Area 1",
  },
  {
    id: 7,
    image_url: assets.common_area_2.src,
    category: "common-area",
    alt_text: "Common Area 2",
  },
  {
    id: 8,
    image_url: assets.common_area_3.src,
    category: "common-area",
    alt_text: "Common Area 3",
  },
  {
    id: 9,
    image_url: assets.event_area_1.src,
    category: "event-space",
    alt_text: "Event Space 1",
    description: "Perfect for corporate events",
  },
  {
    id: 10,
    image_url: assets.event_area_2.src,
    category: "event-space",
    alt_text: "Event Space 2",
    description: "Perfect for corporate events",
  },
  {
    id: 11,
    image_url: assets.event_area_3.src,
    category: "event-space",
    alt_text: "Event Space 3",
    description: "Perfect for corporate events",
  },
  {
    id: 12,
    image_url: assets.event_area_4.src,
    category: "event-space",
    alt_text: "Event Space 4",
    description: "Perfect for corporate events",
  },
  {
    id: 13,
    image_url: assets.event_area_5.src,
    category: "event-space",
    alt_text: "Event Space 5",
    description: "Perfect for corporate events",
  },
  {
    id: 14,
    image_url: assets.event_area_6.src,
    category: "event-space",
    alt_text: "Event Space 6",
    description: "Perfect for corporate events",
  },
  {
    id: 15,
    image_url: assets.green_area_guests.src,
    category: "green-area",
    alt_text: "Green Area 1",
    description: "Relaxing outdoor environment",
  },
  {
    id: 16,
    image_url: assets.green_area_1.src,
    category: "green-area",
    alt_text: "Green Area 2",
  },
  {
    id: 17,
    image_url: assets.green_area_2.src,
    category: "green-area",
    alt_text: "Green Area 3",
  },
  {
    id: 18,
    image_url: assets.green_area_3.src,
    category: "green-area",
    alt_text: "Green Area 4",
  },
  {
    id: 19,
    image_url: assets.green_area_4.src,
    category: "green-area",
    alt_text: "Green Area 5",
  },
  {
    id: 20,
    image_url: assets.green_area_5.src,
    category: "green-area",
    alt_text: "Green Area 6",
  },
  {
    id: 21,
    image_url: assets.green_area_6.src,
    category: "green-area",
    alt_text: "Green Area 6",
  },
  {
    id: 22,
    image_url: assets.meeting_area_1.src,
    category: "meeting-area",
    alt_text: "Meeting Area 1",
  },
  {
    id: 23,
    image_url: assets.meeting_area_2.src,
    category: "meeting-area",
    alt_text: "Meeting Area 2",
  },
  {
    id: 24,
    image_url: assets.meeting_area_3.src,
    category: "meeting-area",
    alt_text: "Meeting Area 3",
  },
  {
    id: 25,
    image_url: assets.meeting_area_4.src,
    category: "meeting-area",
    alt_text: "Meeting Area 4",
  },
  {
    id: 26,
    image_url: assets.meeting_area_5.src,
    category: "meeting-area",
    alt_text: "Meeting Area 5",
  },
  {
    id: 27,
    image_url: assets.meeting_area_6.src,
    category: "meeting-area",
    alt_text: "Meeting Area 6",
  },
];

const CATEGORIES = [
  {
    id: "fixed-desk",
    name: "Fixed Desk",
    icon: Building2,
    coverImage: assets.fixed_desk.src,
    overlayClass: "from-black/60 via-black/30 to-black/10",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-400",
    ringColor: "ring-blue-400",
    description: "Your own dedicated workspace",
  },
  {
    id: "common-area",
    name: "Common Area",
    icon: Users,
    coverImage: assets.common_area.src,
    overlayClass: "from-black/60 via-black/30 to-black/10",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "border-purple-400",
    ringColor: "ring-purple-400",
    description: "Collaborative shared spaces",
  },
  {
    id: "event-space",
    name: "Event Space",
    icon: CalendarCheck,
    coverImage: assets.event_space_area.src,
    overlayClass: "from-black/60 via-black/30 to-black/10",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-400",
    ringColor: "ring-orange-400",
    description: "Perfect for meetings & events",
  },
  {
    id: "green-area",
    name: "Green Area",
    icon: TreePine,
    coverImage: assets.green_area.src,
    overlayClass: "from-black/60 via-black/30 to-black/10",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-400",
    ringColor: "ring-green-400",
    description: "Relaxing outdoor environment",
  },
  {
    id: "meeting-area",
    name: "Meeting Room",
    icon: Handshake,
    coverImage: assets.meeting_room.src,
    overlayClass: "from-black/60 via-black/30 to-black/10",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-400",
    ringColor: "ring-red-400",
    description: "Perfect for meetings & collaborations",
  },
] as const;

// ─── Hook: detect screen size ──────────────────────────────
const useScreenSize = () => {
  const [size, setSize] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setSize("mobile");
      else if (w < 1024) setSize("tablet");
      else setSize("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return size;
};

// ─── Universal Fullscreen Viewer ───────────────────────────
const FullscreenViewer = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
  onSelectIndex,
  categoryName,
  screenSize,
}: {
  images: SpaceImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (i: number) => void;
  categoryName: string;
  screenSize: "mobile" | "tablet" | "desktop";
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    preventScrollOnSwipe: true,
    delta: 40,
  });

  // ✅ Hanya tunjuk dots kalau images <= 10
  // Kalau lebih, tunjuk counter sahaja
  const showDots = images.length <= 10;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black"
      // ✅ flex column - bagi image ambil semua space
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* ── Top Bar (absolute - float above image) ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div>
            <p className="text-white/60 text-[9px] uppercase tracking-widest font-bold leading-none mb-0.5">
              {categoryName}
            </p>
            <p className="text-white text-xs font-bold leading-none">
              {currentIndex + 1}
              <span className="text-white/40"> / {images.length}</span>
            </p>
          </div>
        </div>

        {/* ✅ Close button */}
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors backdrop-blur-sm border border-white/10 active:scale-95"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* ── ✅ MAIN IMAGE - flex-1 + relative, fully centered ── */}
      <div
        {...handlers}
        className="flex-1 relative"
        // ✅ Pastikan image area ambil semua height yang ada
        style={{ minHeight: 0 }}
      >
        {images.map((img, i) => (
          <div
            key={img.id}
            className="absolute inset-0"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              transition: "opacity 0.25s ease-in-out",
              pointerEvents: i === currentIndex ? "auto" : "none",
              // ✅ Center image dengan flexbox
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={img.image_url}
                alt={img.alt_text || "Space"}
                fill
                // ✅ object-contain + padding bagi ruang top/bottom bar
                className="object-contain"
                style={{
                  padding:
                    screenSize === "mobile"
                      ? "72px 16px 100px"
                      : "80px 80px 110px",
                }}
                quality={100}
                priority={i === currentIndex}
                draggable={false}
                sizes="100vw"
              />
            </div>
          </div>
        ))}

        {/* ✅ Nav Arrows - vertically centered dalam image area */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all z-10 backdrop-blur-sm border border-white/10 active:scale-95"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all z-10 backdrop-blur-sm border border-white/10 active:scale-95"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* ── ✅ Bottom Bar (absolute - float below image) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-5 px-4 sm:px-6">
        {/* Description */}
        {images[currentIndex].description && (
          <p className="text-white/55 text-[11px] sm:text-xs text-center mb-3 leading-relaxed">
            {images[currentIndex].description}
          </p>
        )}

        {/* ✅ Dots - kecil dan proper */}
        {showDots ? (
          <div className="flex justify-center items-center gap-1 mb-0">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelectIndex(i)}
                className="flex items-center justify-center p-1 rounded-full"
                aria-label={`Go to image ${i + 1}`}
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "16px" : "5px",
                    height: "5px",
                    backgroundColor:
                      i === currentIndex
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              </button>
            ))}
          </div>
        ) : (
          // Kalau banyak images, tunjuk counter sahaja
          <div className="flex justify-center">
            <span className="text-white/50 text-xs font-medium tabular-nums">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* ✅ Mobile swipe hint - sangat kecil */}
        {screenSize === "mobile" && (
          <p className="text-white/20 text-[8px] uppercase tracking-widest text-center mt-2">
            Swipe to navigate
          </p>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────
const SpaceShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const screenSize = useScreenSize();
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredImages = useMemo(() => {
    if (!selectedCategory) return [];
    return SAMPLE_SPACES.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const categoryName =
    CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? "";

  const openViewer = (idx: number) => {
    setCurrentIndex(idx);
    setIsViewerOpen(true);
  };

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((i) => (i === filteredImages.length - 1 ? 0 : i + 1));
  }, [filteredImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
  }, [filteredImages.length]);

  const selectIndex = useCallback((i: number) => {
    setCurrentIndex(i);
  }, []);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isViewerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isViewerOpen]);

  // Keyboard nav
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!isViewerOpen) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closeViewer();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isViewerOpen, nextSlide, prevSlide, closeViewer]);

  // Auto scroll
  useEffect(() => {
    if (selectedCategory && galleryRef.current) {
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (catId: string) => {
    if (selectedCategory === catId) {
      setSelectedCategory(null);
      setIsViewerOpen(false);
    } else {
      setSelectedCategory(catId);
      setIsViewerOpen(false);
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <section className="bg-[#f9fafb] py-16 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-bold mb-3">
              Our Facilities
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#004348] mb-4">
              Explore Our Spaces
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Discover the perfect workspace that matches your vision. Browse
              through our premium facilities.
            </p>
          </motion.div>
       
          {/* ── Category Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 mb-12">
            {CATEGORIES.map((category, idx) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              const imageCount = SAMPLE_SPACES.filter(
                (img) => img.category === category.id,
              ).length;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`
          relative group cursor-pointer rounded-2xl overflow-hidden
          transition-all duration-500 min-h-[180px] md:min-h-[300px]
          ${
            isSelected
              ? `ring-4 ring-offset-2 ring-offset-white ${category.ringColor} shadow-2xl scale-[1.02]`
              : "hover:shadow-2xl hover:scale-[1.02]"
          }
        `}
                >
                  {/* Background Image */}
                  <Image
                    src={category.coverImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    quality={85}
                  />

                  {/* Dark overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.overlayClass} transition-opacity duration-300 ${
                      isSelected
                        ? "opacity-100"
                        : "opacity-80 group-hover:opacity-90"
                    }`}
                  />

                  {/* ✅ Content - responsive padding */}
                  <div className="relative z-10 p-3 sm:p-5 md:p-7 h-full flex flex-col justify-between">
                    {/* Top: Icon + Title */}
                    <div>
                      {/* ✅ Icon - kecil mobile, besar desktop */}
                      <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white"
                          strokeWidth={2}
                        />
                      </div>

                      {/* ✅ Title - responsive size */}
                      <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-white leading-tight drop-shadow-sm">
                        {category.name}
                      </h3>

                      {/* Description - hidden mobile, show md+ */}
                      <p className="text-white/80 text-xs md:text-sm hidden md:block leading-relaxed mt-1">
                        {category.description}
                      </p>
                    </div>

                    {/* ✅ Bottom: photo count + status */}
                    <div className="flex items-center justify-between mt-2 sm:mt-4 gap-1">
                      {/* Photo count */}
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                        <span className="text-white/70 text-[9px] sm:text-xs font-semibold leading-none">
                          {imageCount}{" "}
                          <span className="hidden xs:inline">
                            {imageCount === 1 ? "Photo" : "Photos"}
                          </span>
                          <span className="xs:hidden">
                            {imageCount === 1 ? "pic" : "pics"}
                          </span>
                        </span>
                      </div>

                      {/* ✅ Status badge - compact mobile */}
                      <div
                        className={`
                flex items-center gap-1 rounded-full font-bold uppercase tracking-wider
                transition-all duration-300 flex-shrink-0
                text-[8px] sm:text-[10px]
                px-2 py-1 sm:px-3 sm:py-1.5
                ${
                  isSelected
                    ? "bg-white text-gray-900"
                    : "bg-white/20 text-white group-hover:bg-white/30"
                }
              `}
                      >
                        {isSelected ? "Viewing" : "Browse"}
                        <ChevronRight
                          className={`
                  transition-transform duration-300 flex-shrink-0
                  w-2 h-2 sm:w-3 sm:h-3
                  ${isSelected ? "rotate-90" : "group-hover:translate-x-0.5"}
                `}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Gallery Section ── */}
          <div ref={galleryRef}>
            <AnimatePresence mode="wait">
              {selectedCategory && (
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl p-6 md:p-10 w-full">
                    {/* Gallery Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3 md:gap-4">
                        {(() => {
                          const cat = CATEGORIES.find(
                            (c) => c.id === selectedCategory,
                          );
                          if (!cat) return null;
                          const Icon = cat.icon;
                          return (
                            <>
                              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                <Image
                                  src={cat.coverImage}
                                  alt={cat.name}
                                  fill
                                  className="object-cover"
                                  sizes="56px"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                  {cat.name}
                                </h3>
                                <p className="text-gray-500 text-xs md:text-sm">
                                  {filteredImages.length} images available
                                  {screenSize === "desktop"
                                    ? " — click to expand"
                                    : " — tap to view"}
                                </p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setIsViewerOpen(false);
                        }}
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors flex-shrink-0"
                        aria-label="Close gallery"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                      {filteredImages.map((image, idx) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.06 }}
                          onClick={() => openViewer(idx)}
                          className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group bg-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
                        >
                          <Image
                            src={image.image_url}
                            alt={image.alt_text || "Space"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            quality={90}
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <div className="flex items-center justify-between">
                                <p className="text-white text-xs font-semibold">
                                  {screenSize === "desktop" ? "Expand" : "View"}
                                </p>
                                <Maximize2 className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ✅ Portal - semua device */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isViewerOpen && filteredImages.length > 0 && (
              <FullscreenViewer
                key="viewer"
                images={filteredImages}
                currentIndex={currentIndex}
                onClose={closeViewer}
                onNext={nextSlide}
                onPrev={prevSlide}
                onSelectIndex={selectIndex}
                categoryName={categoryName}
                screenSize={screenSize}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default SpaceShowcase;
