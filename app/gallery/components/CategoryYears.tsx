"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { images, type GalleryItem } from "@/assets/asset";
import Image, { StaticImageData } from "next/image";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_BATCH = 20; // how many images per load

const CategoryYears = () => {
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // rebuild visibleCount when category changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [category]);

  const slides: GalleryItem[] = useMemo(() => {
    if (category === "All") return images.flatMap((g) => g.items);
    const found = images.find((g) => g.year === category);
    return found ? found.items : [];
  }, [category]);

  const openModal = (idx: number) => {
    setCurrentIndex(idx);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }, [slides.length]);
  const prevSlide = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }, [slides.length]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isModalOpen, nextSlide, prevSlide]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
  }, [isModalOpen]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    onSwipedDown: closeModal,
    preventScrollOnSwipe: true,
  });

  const findIndex = (
    img: StaticImageData | string,
    groupItems: GalleryItem[]
  ) =>
    category === "All"
      ? images.flatMap((g) => g.items).findIndex((it) => it.image === img)
      : groupItems.findIndex((it) => it.image === img);

  /* ---------- LOAD MORE ---------- */
  const handleLoadMore = () =>
    setVisibleCount((prev) => prev + ITEMS_PER_BATCH);

  const hasMore =
    category === "All" && visibleCount < images.flatMap((g) => g.items).length;

  // -------------- RENDER --------------
  return (
    <section className="bg-[#f9fafb] text-gray-800 py-14 md:py-20">
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
          {images.map((g) => (
            <button
              key={g.year}
              onClick={() => setCategory(g.year)}
              className={`px-5 py-2.5 text-sm md:text-base rounded-full border transition-all font-semibold ${
                category === g.year
                  ? "bg-[#004348] text-white border-[#004348]"
                  : "bg-white text-[#004348] border-gray-200 hover:border-[#004348]/50"
              }`}
            >
              {g.year}
            </button>
          ))}
        </div>

        {/* GRID */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
        >
          {images.map(
            (group) =>
              (category === "All" || category === group.year) &&
              group.items.map((item, idx) => {
                const index = findIndex(item.image, group.items);
                // For All category, hide items beyond visibleCount
                const globalIndex =
                  category === "All"
                    ? images
                        .flatMap((g) => g.items)
                        .findIndex((it) => it.image === item.image)
                    : idx;
                if (category === "All" && globalIndex >= visibleCount)
                  return null;
                return (
                  <motion.figure
                    layout
                    key={`${group.year}_${item.id}`}
                    onClick={() => openModal(index)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg cursor-pointer"
                  >
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={item.image}
                        alt={`${group.year}-${item.id}`}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        quality={95}
                        draggable={false}
                      />
                    </div>
                    <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="p-3 text-white text-sm font-medium tracking-wide">
                        {group.year}
                      </p>
                    </figcaption>
                  </motion.figure>
                );
              })
          )}
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

      {/* MODAL VIEWER (unchanged) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            {...handlers}
            key={`modal-${currentIndex}`} // single unique key for AnimatePresence
            id="modalRoot"
            onClick={(e) => {
              if ((e.target as HTMLElement).id === "modalRoot") closeModal();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-3"
          >
            {/* ✅ one container child inside AnimatePresence */}
            <React.Fragment key="modal-content">
              {/* Close (desktop) */}
              <button
                key="closeDesktop"
                onClick={closeModal}
                className="hidden md:block absolute top-5 right-5 text-white text-3xl hover:text-gray-300 transition"
              >
                <AiOutlineClose />
              </button>

              {/* Image box */}
              <motion.div
                key={`image-${currentIndex}`}
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative max-w-5xl w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-black/20"
              >
                <Image
                  src={slides[currentIndex]?.image}
                  alt="gallery"
                  fill
                  className="object-contain select-none"
                  quality={100}
                  draggable={false}
                />
                {/* Mobile close */}
                <button
                  key="closeMobile"
                  onClick={closeModal}
                  className="md:hidden absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white hover:bg-black transition"
                >
                  <AiOutlineClose className="text-xl" />
                </button>
              </motion.div>

              {/* Nav buttons (desktop) */}
              {slides.length > 1 && (
                <>
                  <button
                    key="prevBtn"
                    onClick={prevSlide}
                    className="hidden md:flex absolute left-[4vw] text-white bg-black/70 hover:bg-black rounded-full w-12 h-12 items-center justify-center shadow-lg transition-transform hover:scale-110"
                    aria-label="Previous"
                  >
                    <GrLinkPrevious className="text-2xl" />
                  </button>
                  <button
                    key="nextBtn"
                    onClick={nextSlide}
                    className="hidden md:flex absolute right-[4vw] text-white bg-black/70 hover:bg-black rounded-full w-12 h-12 items-center justify-center shadow-lg transition-transform hover:scale-110"
                    aria-label="Next"
                  >
                    <GrLinkNext className="text-2xl" />
                  </button>
                </>
              )}
            </React.Fragment>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CategoryYears;
