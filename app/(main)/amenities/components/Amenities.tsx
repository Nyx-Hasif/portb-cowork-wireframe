"use client";
import React from "react";
import { motion, easeOut, easeInOut } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const cards = [
  {
    id: 1,
    icon: "WIFI_ICON",
    title: "High‑Speed WiFi",
    description: "Lightning‑fast internet for seamless video calls.",
    // link: "#",
  },
  {
    id: 2,
    icon: "Coffee_ICON",
    title: "Coffee & Refreshments",
    description: "Complimentary beverages to keep you energized.",
    // link: "#",
  },
  {
    id: 3,
    icon: "WC_ICON",
    title: "Washroom & Surau",
    description: "Conveniently located within the workspace.",
    // link: "#",
  },
  {
    id: 4,
    icon: "SNOWFLAKE_ICON",
    title: "Climate Control",
    description: "Perfect temperature for productive sessions.",
    // link: "#",
  },
  {
    id: 5,
    icon: "LAPTOP_ICON",
    title: "Display Technology",
    description: "Smart screens and presentation equipment.",
    // link: "#",
  },
  {
    id: 6,
    icon: "TUKUL_ICON",
    title: "Technical Support",
    description: "On‑site assistance whenever you need it.",
    // link: "#",
  },
  {
    id: 7,
    icon: "LOCATION_ICON",
    title: "Prime Location",
    description: "Located in the heart of the city with easy public access.",
    // link: "#",
  },
  {
    id: 8,
    icon: "COMMUNITY_ICON",
    title: "Community Events",
    description: "Regular networking events & creative workshops.",
    // link: "#",
  },
  {
    id: 9,
    icon: "SECURITY_ICON",
    title: "Security Access",
    description: "24/7 CCTV and secure keycard entry.",
    // link: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      duration: 0.6,
      ease: easeOut, // ✅ gunakan easing import bukan string
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut, // ✅ easing function
    },
  },
};

const Amenities = () => (
  <section className="w-full bg-[#e9eef3] py-16 overflow-hidden md:mt-[-10px]">
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center md:mb-10" variants={itemVariants}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 ">
          What’s Always Included
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 max-w-2xl mx-auto">
          Every PortB workspace includes the essentials for comfort,
          productivity and community.
        </p>
      </motion.div>

      {/* Card Grid */}
      <motion.div variants={itemVariants}>
        <HoverEffect items={cards} />
      </motion.div>
    </motion.div>
  </section>
);

export default Amenities;
