"use client";
import { assets } from "@/assets/asset";
import Image from "next/image";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const EpicCarousel = () => {
  const cards = [
    { id: 1, image: assets.coffee_session, title: "Coffee Session" },
    { id: 2, image: assets.event_session, title: "Event Session" },
    { id: 3, image: assets.night_pitch, title: "Night Session" },
    { id: 4, image: assets.codekids, title: "Class Session" },
    { id: 5, image: assets.workshop_session, title: "Workshop Session" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === cards.length - 1 ? 0 : prevIndex + 1;
        setKey((prev) => prev + 1);
        return nextIndex;
      });
    }, 10000);
  }, [cards.length]);

  const handleNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
    setKey((prev) => prev + 1);
    resetTimer();
  }, [cards.length, resetTimer]);

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    setKey((prev) => prev + 1);
    resetTimer();
  };

  const handleClick = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? "next" : "prev");
    setCurrentIndex(newIndex);
    setKey((prev) => prev + 1);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  return (
    <div className="bg-[#f9fafb] ">
      {/* ✅ Added items-stretch to force equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 p-6 w-full max-w-[1400px] mx-auto lg:items-stretch">
        {/* Left - Big Image */}
        <div className="relative w-full h-[500px] lg:h-auto rounded-2xl overflow-hidden shadow-xl bg-gray-900">
          {/* Background blur layer */}
          <Image
            src={cards[currentIndex].image}
            alt={cards[currentIndex].title}
            fill
            className="object-cover opacity-40 blur-sm"
            quality={100}
          />

          {/* Main sliding image */}
          <div
            key={currentIndex}
            className={`absolute inset-0 z-10 ${
              direction === "next"
                ? "animate-slideInFromRight"
                : "animate-slideInFromLeft"
            }`}
          >
            <Image
              src={cards[currentIndex].image}
              alt={cards[currentIndex].title}
              fill
              className="object-cover"
              quality={100}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex justify-between items-center px-6 z-20">
            <button
              onClick={handlePrev}
              className="w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <GrLinkPrevious className="text-xl text-white" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <GrLinkNext className="text-xl text-white" />
            </button>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 z-20">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4 animate-fadeIn">
              {cards[currentIndex].title}
            </h2>
            {/* <button className="bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all hover:scale-105">
              Learn More
            </button> */}
          </div>
        </div>

        {/* Right - Thumbnails (✅ Now matches left side height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:h-full">
          {cards.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(index)}
              className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white shadow-lg"
                  : "bg-gray-100 hover:bg-white hover:shadow-md"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-28 lg:h-28 z-10 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  quality={95}
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 128px, 112px"
                  draggable={false}
                />
              </div>

              {currentIndex === index && (
                <div key={key} className="loading-bar"></div>
              )}

              <p className="text-base lg:text-lg font-medium text-gray-800 z-10">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes loadingAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loading-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          background-color: #d2d8e0;
          animation: loadingAnimation 10s linear forwards;
          border-radius: 12px;
          z-index: 0;
        }

        .animate-slideInFromRight {
          animation: slideInFromRight 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-slideInFromLeft {
          animation: slideInFromLeft 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default EpicCarousel;
