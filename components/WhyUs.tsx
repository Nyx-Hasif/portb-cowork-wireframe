"use client";
import React from "react";
import {
  UsersIcon,
  HandshakeIcon,
  GlobeIcon,
  SparklesIcon,
} from "lucide-react";

const WhyUs = () => {
  const cards = [
    {
      id: 1,
      icon: UsersIcon,
      text: "Putting our community needs and well‑being above all else.",
      category: "Community",
    },
    {
      id: 2,
      icon: HandshakeIcon,
      text: "Working together to achieve common goals and drive innovation.",
      category: "Collaboration",
    },
    {
      id: 3,
      icon: GlobeIcon,
      text: "Building networks that open doors to new opportunities.",
      category: "Connection",
    },
    {
      id: 4,
      icon: SparklesIcon,
      text: "Creating experiences that inspire learning and growth.",
      category: "Inspiration",
    },
  ];

  return (
    <section className="py-10 px-4 md:px-10 bg-[#e9eef3] ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ---------- Left side ---------- */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 className="font-extrabold text-4xl md:text-6xl text-gray-900 leading-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">
              PortB
            </span>
          </h1>

          <div className="text-lg md:text-2xl text-gray-700 space-y-4">
            <p>At PortB, we don’t just care about tables, chairs, or Wi‑Fi.</p>
            <p>
              We care about the people who step into our space — their stories,
              goals, struggles, and growth.
            </p>
          </div>
        </div>

        {/* ---------- Right cards ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="group relative p-8 rounded-3xl border border-gray-100 bg-white 
                           shadow-sm text-gray-900 transition-all duration-500 
                           hover:-translate-y-1 hover:shadow-lg hover:border-sky-300 
                           hover:bg-sky-50"
              >
                {/* icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 mb-5 
                             rounded-2xl bg-sky-100 text-sky-600 
                             transition-colors duration-300 
                             group-hover:bg-sky-500 group-hover:text-white"
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* text */}
                <p className="font-medium text-lg md:text-xl mb-3 leading-relaxed">
                  {c.text}
                </p>

                <div className="border-t border-gray-200 mb-3" />
                <p className="font-bold text-xl tracking-tight text-gray-900">
                  {c.category}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
