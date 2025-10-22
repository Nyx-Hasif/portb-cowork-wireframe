"use client";
import React from "react";

const WhyUs = () => {
  const cards = [
    {
      id: 1,
      icon: "👥",
      text: "Putting our community needs and well‑being above all else",
      category: "Community",
    },
    {
      id: 2,
      icon: "🤝",
      text: "Working together to achieve common goals and drive innovation",
      category: "Collaboration",
    },
    {
      id: 3,
      icon: "🌐",
      text: "Building networks that open doors to new opportunities",
      category: "Connection",
    },
    {
      id: 4,
      icon: "🎉",
      text: "Creating experiences that inspire learning and growth",
      category: "Event",
    },
  ];

  return (
    <section className="p-4 md:min-h-[70vh] md:px-10 md:flex md:flex-col md:justify-center bg-[#f8fafb]  ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 ">
        {/* left side */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 className="font-extrabold text-4xl md:text-6xl text-gray-900 dark:text-black leading-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
              PortB
            </span>
          </h1>
          <div className="text-lg md:text-2xl text-gray-700 dark:text-black space-y-4">
            <p>
              At PortB, we don’t just care about the tables, chairs, or Wi‑Fi.
            </p>
            <p>
              We care about the people who step into our space — their stories,
              goals, struggles, and growth.
            </p>
          </div>
        </div>

        {/* right side cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div
              key={c.id}
              className="
                group relative p-6 rounded-xl border border-gray-200
                bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
                transition-all duration-500 hover:-translate-y-2
                hover:border-lime-400 hover:bg-lime-100/60 dark:hover:bg-lime-400/10
                hover:shadow-[0_0_25px_rgba(163,230,53,0.4)]
              "
            >
              <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">
                {c.icon}
              </div>
              <p className="font-medium text-lg md:text-xl mb-3">{c.text}</p>
              <div className="border-t border-gray-300 dark:border-gray-700 mb-2"></div>
              <p className="font-bold text-xl tracking-tight">{c.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
