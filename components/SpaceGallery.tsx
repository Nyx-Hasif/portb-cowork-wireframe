// SpacesGallery.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import AppleModal from "@/components/ui/AppleModal";
import { spaceStationsData } from "@/data/contentData";
import { StaticImageData } from "next/image";

type SpaceCardData = {
  category: string;
  title: string;
  src: string;
  modalImage?: string | StaticImageData;
  description?: string;
  features?: string[];
  content?: React.ReactNode;
};

export default function SpacesGallery() {
  return (
    <section
      id="next-section"
      className="py-24 bg-black border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">
              The Space Station
            </h2>
            <p className="text-gray-400 max-w-md font-light">
              Meticulously designed environments tailored to different modes of
              work.
            </p>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
          <SpaceCard card={spaceStationsData[0]} colSpan="md:col-span-1" />
          <SpaceCard card={spaceStationsData[2]} colSpan="md:col-span-2" />
          <SpaceCard card={spaceStationsData[1]} colSpan="md:col-span-2" />
          <SpaceCard card={spaceStationsData[3]} colSpan="md:col-span-1" />
          <SpaceCard card={spaceStationsData[4]} colSpan="md:col-span-3" />
        </div>

        {/* Mobile: show all cards in 1 column */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {spaceStationsData.map((card, index) => (
            <SpaceCard
              key={card.title || index}
              card={card}
              colSpan="col-span-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const SpaceCard = ({
  card,
  colSpan = "col-span-1",
}: {
  card: SpaceCardData;
  colSpan?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!card) {
    return null;
  }

  const features = card.features || [];

  return (
    <>
      {/* ✅ Modal will render to body via Portal */}
      <AppleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        card={card}
      />

      {/* Card */}
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative h-[500px] overflow-hidden border border-white/5 cursor-pointer ${colSpan} rounded-lg`}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={card.src || "/placeholder.svg"}
            alt={card.title || "Space"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale opacity-60 group-hover:opacity-80"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h3 className="text-3xl font-serif font-light mb-2 text-white">
            {card.title}
          </h3>
          <p className="text-gray-400 mb-4 text-sm tracking-wide uppercase">
            {card.category}
          </p>
          <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            {features.map((feat, i) => (
              <span
                key={i}
                className="text-xs border border-white/20 px-2 py-1 rounded-full text-gray-300"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
