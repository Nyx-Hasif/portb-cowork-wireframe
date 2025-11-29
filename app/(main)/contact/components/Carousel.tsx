"use client";
import React, { useState } from "react";

const Carousel = () => {
  const slide = ["apple", "banana", "cherry"];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slide.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-100 mx-auto py-8 relative">
      {/* Outer container - overflow hidden */}

      <div className="w-64 mx-auto  overflow-hidden">
        
        {/* Inner container - transform */}
        <div
          className="flex  transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slide.map((slide, index) => (
            <div
              className="border border-black w-full h-32 flex items-center justify-center flex-shrink-0"
              key={index}
            >
              {index + 1}.{slide}
            </div>
          ))}
        </div>
      </div>

      {/* buttons */}
      <div className="flex justify-between border border-black absolute w-full inset-0 px-4">
        <button onClick={prevSlide}>Prev</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;
