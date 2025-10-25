"use client";
import React from "react";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
// ✅  Minimal outline icons dari Heroicons
import {
  MapPinIcon,
  EnvelopeOpenIcon,
  LockClosedIcon,
  BellAlertIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const VirtualAddress = () => {
  const features = [
    { id: 1, title: "Address at PortB", icon: MapPinIcon },
    { id: 2, title: "Receive Mail and Packages", icon: EnvelopeOpenIcon },
    { id: 3, title: "Your Own Secure Locking Mailbox", icon: LockClosedIcon },
    { id: 4, title: "Get Notified When Mail Arrives", icon: BellAlertIcon },
    { id: 5, title: "24/7 Secure Mail Access", icon: ShieldCheckIcon },
  ];

  return (
    <section className="w-full max-w-[100rem] mx-auto px-4 md:py-20 py-10  text-gray-100">
      {/* === HEADER === */}
      <div className="text-center mb-12 ">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
          Virtual Business Address
        </h1>
        <p className="mt-4 text-black text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          A secure, professional address for your business correspondence — accessible anytime.
        </p>
      </div>

      {/* === GRID (pyramid pattern) === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 place-items-center">
        {features.map((item, index) => {
          let colClass = "md:col-span-2 lg:col-span-2";
          if (index === 0) colClass += " md:col-start-1";
          if (index === 1) colClass += " md:col-start-3";
          if (index === 2) colClass += " md:col-start-1 md:row-start-2";
          if (index === 3) colClass += " md:col-start-3 md:row-start-2";
          if (index === 4) colClass += " md:col-start-2 md:row-start-3";
          if (index === 0) colClass += " lg:col-start-1 lg:row-start-1";
          if (index === 1) colClass += " lg:col-start-3 lg:row-start-1";
          if (index === 2) colClass += " lg:col-start-5 lg:row-start-1";
          if (index === 3) colClass += " lg:col-start-2 lg:row-start-2";
          if (index === 4) colClass += " lg:col-start-4 lg:row-start-2";

          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              className={`w-full h-full ${colClass}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <SpotlightCard
                spotlightColor="rgba(0, 19, 250, 0.2)"
                className="group flex flex-col justify-center items-center text-center h-60 
             rounded-3xl border border-gray-300 bg-[#e9eef3] text-black 
             shadow-sm transition-all duration-500 
             hover:shadow-2xl hover:-translate-y-1 
             hover:border-blue-400/60 
             hover:ring-1 hover:ring-blue-300/30 
             hover:ring-offset-2 hover:ring-offset-[#e9eef3]
             cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* ICON WRAPPER */}
                  <div
                    className="mx-auto flex items-center justify-center w-14 h-14 
                 bg-yellow-500 rounded-full backdrop-blur-sm 
                 transition-all duration-500 
                 group-hover:bg-blue-500 
                 group-hover:shadow-md group-hover:shadow-blue-200/70"
                  >
                    <Icon
                      className="w-7 h-7 text-black transition-colors duration-500 
                   group-hover:text-white"
                    />
                  </div>

                  <p className="text-lg md:text-2xl font-medium leading-snug">
                    {item.title}
                  </p>
                </motion.div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default VirtualAddress;
