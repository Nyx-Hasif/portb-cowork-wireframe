// app/(main)/gallery/components/CategoryYears.tsx
"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { Loader2 } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { getGalleryImages } from "@/lib/database";

interface GalleryImage {
  id: number;
  image_url: string;
  year: string;
  alt_text?: string;
  created_at?: string;
}

const ITEMS_PER_BATCH = 20;

const CategoryYears = () => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState(0); // ⭐ NEW: Track slide direction

  // Check if component is mounted (for portal)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Fetch images from database
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGalleryImages();
        setAllImages(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Get unique years for filter buttons
  const years = useMemo(() => {
    const uniqueYears = [...new Set(allImages.map((img) => img.year))];
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, [allImages]);

  // Filter images based on category
  const filteredImages = useMemo(() => {
    if (category === "All") return allImages;
    return allImages.filter((img) => img.year === category);
  }, [allImages, category]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [category]);

  // Modal functions
  const openModal = (idx: number) => {
    setCurrentIndex(idx);
    setDirection(0);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ⭐ UPDATED: Track direction for slide animation
  const nextSlide = useCallback(() => {
    setDirection(1); // Slide from right
    setCurrentIndex((i) => (i === filteredImages.length - 1 ? 0 : i + 1));
  }, [filteredImages.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1); // Slide from left
    setCurrentIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
  }, [filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextSlide, prevSlide]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    onSwipedDown: closeModal,
    preventScrollOnSwipe: true,
  });

  // Load more handler
  const handleLoadMore = () =>
    setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
  const hasMore = visibleCount < filteredImages.length;

  // ⭐ NEW: Smooth slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 1,
    }),
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-[#f9fafb] text-gray-800 py-14 md:py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#004348]" />
        </div>
      </section>
    );
  }

  // Empty state
  if (allImages.length === 0) {
    return (
      <section className="bg-[#f9fafb] text-gray-800 py-14 md:py-20">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#004348] mb-4">
            Gallery
          </h2>
          <p className="text-gray-600">
            No images available yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  // Modal Component with smooth slide animation
  const ModalContent = () => (
    <AnimatePresence initial={false} mode="wait">
      {isModalOpen && filteredImages[currentIndex] && (
        <motion.div
          {...handlers}
          id="modalRoot"
          onClick={(e) => {
            if ((e.target as HTMLElement).id === "modalRoot") closeModal();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-[10000] text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
            aria-label="Close modal"
          >
            <AiOutlineClose className="text-xl md:text-2xl" />
          </button>

          {/* ⭐ Image container with SLIDE animation */}
          <div className="relative w-[90vw] h-[80vh] max-w-6xl overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 40 },
                  opacity: { duration: 0 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={filteredImages[currentIndex].image_url}
                  alt={filteredImages[currentIndex].alt_text || "Gallery image"}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                  sizes="90vw"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>

          {/* Navigation buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all hover:scale-105 z-[10000]"
                aria-label="Previous image"
              >
                <GrLinkPrevious className="text-lg md:text-xl" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all hover:scale-105 z-[10000]"
                aria-label="Next image"
              >
                <GrLinkNext className="text-lg md:text-xl" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <section className="bg-[#f9fafb] text-gray-800 py-14 md:py-20 overflow-hidden">
        <div className="max-w-[100rem] mx-auto px-6 space-y-14">
          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setCategory("All")}
              className={`px-5 py-2.5 text-sm md:text-base rounded-full border transition-all font-semibold ${
                category === "All"
                  ? "bg-[#004348] text-white border-[#004348]"
                  : "bg-white text-[#004348] border-gray-200 hover:border-[#004348]/50"
              }`}
            >
              All
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setCategory(year)}
                className={`px-5 py-2.5 text-sm md:text-base rounded-full border transition-all font-semibold ${
                  category === year
                    ? "bg-[#004348] text-white border-[#004348]"
                    : "bg-white text-[#004348] border-gray-200 hover:border-[#004348]/50"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* GRID */}
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
          >
            {filteredImages.slice(0, visibleCount).map((item, idx) => (
              <motion.figure
                layout
                key={item.id}
                onClick={() => openModal(idx)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg cursor-pointer"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.alt_text || `Gallery ${item.year}`}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    quality={95}
                    draggable={false}
                  />
                </div>
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="p-3 text-white text-sm font-medium tracking-wide">
                    {item.year}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          {/* LOAD MORE BUTTON */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex justify-center"
            >
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 rounded-full bg-[#004348] text-white font-semibold hover:bg-[#00575d] transition-all shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* MODAL - Rendered via Portal to document.body */}
      {isMounted && createPortal(<ModalContent />, document.body)}
    </>
  );
};

export default CategoryYears;
