"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useCallback } from "react";
import Image, { StaticImageData } from "next/image";

interface CardData {
  id: number;
  icon: React.ReactNode;
  title: string;
  img: StaticImageData; // ✅ Fix: ganti 'any' dengan proper type
  description: string;
}

interface SlideProps {
  card: CardData; // ✅ Tukar dari cards[] kepada card (single)
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ card, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

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
      {/* Single Card */}
      <div className="max-w-2xl mx-auto">
        <div className="group relative bg-white rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-300 hover:-translate-y-2">
          {/* Image */}
          <div className="relative w-full h-72 overflow-hidden">
            <Image
              src={card.img}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {card.icon}
              <span className="uppercase tracking-wide text-sm text-[#004348] font-medium">
                Professional Event
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

interface CarouselProps {
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

  return (
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
            card={card} // ✅ Pass single card
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Navigation buttons */}
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

      {/* Slide indicators (dots) */}
      <div className="flex justify-center gap-2 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-[#004348] w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
