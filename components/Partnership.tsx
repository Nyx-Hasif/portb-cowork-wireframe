"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/assets/asset";
import {
  GraduationCap,
  HeartHandshake,
  Leaf,
  Palette,
  Microscope,
  Laptop,
} from "lucide-react";
import React from "react";

const Partnership = () => {
  /** pillars */
  const pillars = [
    {
      id: 1,
      icon: GraduationCap,
      title: "Education",
      text: "Empowering young minds with knowledge and mentorship.",
    },
    {
      id: 2,
      icon: HeartHandshake,
      title: "Community Development",
      text: "Nurturing inclusive communities through shared initiatives.",
    },
    {
      id: 3,
      icon: Leaf,
      title: "Environment",
      text: "Championing sustainability alongside our partners.",
    },
    {
      id: 4,
      icon: Palette,
      title: "Arts & Public Spaces",
      text: "Fostering creativity and vibrant urban life.",
    },
    {
      id: 5,
      icon: Microscope,
      title: "Knowledge",
      text: "Encouraging research, experimentation, and discovery.",
    },
    {
      id: 6,
      icon: Laptop,
      title: "Creative Support",
      text: "Providing technology & creative tools for modern work.",
    },
  ];

  const partners = [
    { image: assets.b_logo, name: "B Logo" },
    { image: assets.canon_logo, name: "Canon" },
    { image: assets.petron_logo, name: "Petron" },
    { image: assets.vci_logo, name: "VCI" },
    { image: assets.bni_logo, name: "BNI" },
    { image: assets.boehringer_ingelheim_logo, name: "Boehringer Ingelheim" },
    { image: assets.khr_logo, name: "KHR" },
    { image: assets.medisavers_logo, name: "Medisavers" },
    { image: assets.petronas_logo, name: "Petronas" },
    { image: assets.prudential_logo, name: "Prudential" },
    { image: assets.redwheels_logo, name: "Redwheels" },
    { image: assets.samurai_logo, name: "Samurai" },
    { image: assets.shell_logo, name: "Shell" },
    { image: assets.sme_logo, name: "SME" },
  ];

  /** ✅ trigger animation only after mount to avoid SSR compression */
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <section className="w-full bg-[#e9eef3] overflow-hidden py-10 md:py-16 text-gray-900">
      {/* intro */}
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4 mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Building Capacity &amp; Vibrant Communities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700"
        >
          Delivering social value across six core pillars
        </motion.p>
      </div>

      {/* grid cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-white p-8 flex flex-col justify-between shadow-sm border border-gray-100 hover:shadow-md hover:border-sky-300 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-sky-100 text-sky-600">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-600 text-base">{p.text}</p>
            </motion.div>
          );
        })}
      </div>

      {/* description */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center text-base md:text-xl leading-relaxed text-gray-700 px-6"
      >
        For over a decade, we’ve driven social initiatives across Malaysia — 
        ensuring inclusivity and equality through every one of our partnerships.
      </motion.p>

      {/* === PARTNERS MARQUEE === */}
      <div className="relative w-full overflow-hidden bg-[#e9eef3] mt-20">
        <div
          className={`marquee-track inline-flex items-center gap-10 ${
            mounted ? "animate-scroll" : ""
          }`}
        >
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-white rounded-2xl w-[220px] h-[120px] sm:w-[240px] sm:h-[130px] md:w-[260px] md:h-[140px] shadow-sm hover:shadow-md border border-gray-100 transition"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={160}
                height={80}
                quality={100}
                draggable={false}
                className="object-contain w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] md:w-[180px] md:h-[100px] opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* styles */}
        <style jsx global>{`
          @keyframes scroll-loop {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee-track {
            min-width: 200%;
            will-change: transform;
          }
          .animate-scroll {
            animation: scroll-loop 40s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Partnership;
