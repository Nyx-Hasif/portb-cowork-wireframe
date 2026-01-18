// components/ui/carousel.tsx
"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useCallback } from "react";
import Image, { StaticImageData } from "next/image";

// Accept both StaticImageData and string URL
export interface CardData {
  id: number;
  icon: React.ReactNode;
  title: string;
  img: StaticImageData | string;
  description: string;
  category: string;
}

interface SlideProps {
  card: CardData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ card, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const hasValidImage =
    card.img && (typeof card.img === "string" ? card.img.length > 0 : true);

  return (
    <li
      ref={slideRef}
      className="flex-shrink-0 w-full px-4 transition-all duration-500"
      onClick={() => handleSlideClick(index)}
      style={{
        opacity: current === index ? 1 : 0.5,
        transform: current === index ? "scale(1)" : "scale(0.95)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="group relative bg-white rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          {/* Image */}
          <div className="relative w-full h-72 overflow-hidden">
            {hasValidImage ? (
              <Image
                src={card.img}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#004348] to-[#006d75] flex items-center justify-center">
                <span className="text-white/60 text-lg">No image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {card.icon}
              <span className="uppercase tracking-wide text-sm text-[#004348] font-medium">
                {card.category}
              </span>
            </div>
            <h2 className="text-2xl font-semibold">{card.title}</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center mx-2 justify-center 
        bg-white dark:bg-neutral-800 
        border border-gray-200 dark:border-neutral-700
        rounded-full 
        shadow-md hover:shadow-lg
        focus:ring-2 focus:ring-[#004348] focus:outline-none 
        hover:-translate-y-1 active:translate-y-0 
        transition-all duration-200 
        ${type === "previous" ? "rotate-180" : ""}`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-[#004348] dark:text-neutral-200" />
    </button>
  );
};

export interface CarouselProps {
  cards: CardData[];
}

export default function Carousel({ cards }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = useCallback(() => {
    const previous = current - 1;
    setCurrent(previous < 0 ? cards.length - 1 : previous);
  }, [current, cards.length]);

  const handleNextClick = useCallback(() => {
    const next = current + 1;
    setCurrent(next === cards.length ? 0 : next);
  }, [current, cards.length]);

  const handleSlideClick = useCallback(
    (index: number) => {
      if (current !== index) {
        setCurrent(index);
      }
    },
    [current]
  );

  const id = useId();

  // Handle empty cards
  if (!cards || cards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No items to display
      </div>
    );
  }

  return (
    // ⭐ Added: overflow-hidden to contain carousel
    <div
      className="relative w-full mx-auto overflow-hidden"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {cards.map((card, index) => (
          <Slide
            key={card.id}
            card={card}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Navigation buttons */}
      {cards.length > 1 && (
        <div className="flex justify-center w-full mt-12">
          <CarouselControl
            type="previous"
            title="Go to previous slide"
            handleClick={handlePreviousClick}
          />

          <CarouselControl
            type="next"
            title="Go to next slide"
            handleClick={handleNextClick}
          />
        </div>
      )}

    </div>
  );
}
