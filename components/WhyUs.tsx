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
      icon: <UsersIcon className="w-6 h-6" />,
      text: "Putting our community needs and well‑being above all else.",
      category: "Community",
    },
    {
      id: 2,
      icon: <HandshakeIcon className="w-6 h-6" />,
      text: "Working together to achieve common goals and drive innovation.",
      category: "Collaboration",
    },
    {
      id: 3,
      icon: <GlobeIcon className="w-6 h-6" />,
      text: "Building networks that open doors to new opportunities.",
      category: "Connection",
    },
    {
      id: 4,
      icon: <SparklesIcon className="w-6 h-6" />,
      text: "Creating experiences that inspire learning and growth.",
      category: "Inspiration",
    },
  ];

  return (
    <section className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
            Why Choose Us?
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif text-black">
            Engineered for people, not just productivity.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {cards.map((card) => (
            <div key={card.id} className="group">
              <div className="mb-6 p-4 border border-black/10 inline-block rounded-none group-hover:border-black transition-colors">
                {card.icon}
              </div>
              <h4 className="text-xl font-medium text-black mb-3">
                {card.category}
              </h4>
              <p className="text-gray-400 font-light leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
