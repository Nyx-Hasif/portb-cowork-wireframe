"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type Variants } from "motion/react";
import React, { useEffect, useState, useCallback } from "react";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const loadImages = useCallback(() => {
    const loadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages as string[]);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: NodeJS.Timeout | null = null;
    if (autoplay) {
      // 👇 UBAH SINI: 8000ms = 8 saat (Masa tunggu sebelum tukar gambar)
      interval = setInterval(() => {
        handleNext();
      }, 10000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 1.05, // Kurangkan zoom sikit biar tak pening
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        // 👇 UBAH SINI: 2.5s (Transition lebih perlahan & smooth)
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0], // Easing yang lebih lembut
      },
    },
    upExit: {
      opacity: 0,
      scale: 1, // Tak perlu scale down masa exit biar nampak tenang
      y: "-10%", // Kurangkan pergerakan y supaya tak nampak drastik sangat
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
    downExit: {
      opacity: 0,
      scale: 1,
      y: "10%",
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/90 to-black/20 z-40",
            overlayClassName
          )}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
            style={{
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />
        </AnimatePresence>
      )}
    </div>
  );
};
