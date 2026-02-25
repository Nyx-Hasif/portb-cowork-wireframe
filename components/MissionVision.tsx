"use client";
import React from "react";
import Image from "next/image"; // 👈 Import Image dari next/image
import { assets } from "@/assets/asset";

const content = [
  {
    title: "Our Mission",
    description:
      "Transform the way people in Kota Bharu work and grow by turning ordinary space into a place that works for you.",
  },
  {
    title: "Our Vision",
    description:
      "Inspire entrepreneurs, freelancers, and creators to thrive, collaborate, and build meaningful connections that spark innovation.",
  },
  {
    title: "Core Values",
    description:
      "We believe in adaptability, community, and authenticity spaces and solutions that grow with your needs.",
  },
];

export default function MissionVisionValues() {
  return (
    <section
      id="mission"
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Abstract decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
            We believe workspace is a <br />{" "}
            <span className="text-gray-500">state of mind.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Column — menggunakan Next.js Image */}
          <div className="relative order-2 lg:order-1">
            {/* Outer border effect (still using div) */}
            <div className="absolute inset-0 border border-white/20 translate-x-3 translate-y-3 z-0"></div>

            {/* Next.js Image — perlu width & height */}
            <div className="relative z-10 w-full aspect-[3/4]">
              <Image
                src={assets.mission_vision}
                alt="Minimalist coworking space"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 50vw"
                // Optional: tambah placeholder jika mahu
                // placeholder="blur"
                // blurDataURL="data:image/svg+xml;base64,..."
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-12 order-1 lg:order-2 lg:py-8">
            {content.map((item, index) => (
              <div key={index} className="group">
                <h3 className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-4 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed border-l border-white/20 pl-6 transition-all group-hover:border-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
