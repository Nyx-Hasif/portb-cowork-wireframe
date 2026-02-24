"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  UsersIcon,
  HandshakeIcon,
  GlobeIcon,
  SparklesIcon,
  LucideIcon,
} from "lucide-react";

interface CardData {
  id: number;
  icon: LucideIcon;
  text: string;
  category: string;
}

const WhyUs = () => {
  const cards: CardData[] = [
    {
      id: 1,
      icon: UsersIcon,
      text: "A space where freelancers, founders, and teams feel like they belong not just rent a seat.",
      category: "Community",
    },
    {
      id: 2,
      icon: HandshakeIcon,
      text: "Side by side with people who get it. Breakthroughs happen when the right minds share the same room.",
      category: "Collaboration",
    },
    {
      id: 3,
      icon: GlobeIcon,
      text: "Your next client, partner, or co-founder might already be working two desks away.",
      category: "Connection",
    },
    {
      id: 4,
      icon: SparklesIcon,
      text: "Designed down to the lighting, the layout, and the coffee because your environment shapes your output.",
      category: "Inspiration",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            <span className="text-sm uppercase tracking-widest text-black/50 font-medium">
              Why Choose Us?
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            More than a{" "}
            <span className="text-black-600">workspace</span>
            , <br className="hidden md:block" />A place where work actually
            happens.
          </h2>

          <p className="text-lg text-black/50 max-w-2xl mx-auto leading-relaxed">
            We didnt build desks and chairs. We built a place where ambition
            feels at home
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group relative"
              >
                <div className="relative h-full bg-white rounded-2xl border border-black/10 overflow-hidden transition-all duration-500 group-hover:border-black group-hover:shadow-2xl group-hover:shadow-black/15">
                  {/* Black fill sweeps in on hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl border border-black/15 group-hover:border-white/20 bg-black/5 group-hover:bg-white/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-500" />
                    </div>

                    {/* Category label */}
                    <div className="mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-black/35 group-hover:text-white/45 transition-colors duration-500">
                        {card.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-black group-hover:text-white mb-3 transition-colors duration-500">
                      {card.category}
                    </h3>

                    {/* Description */}
                    <p className="text-black/50 group-hover:text-white/65 leading-relaxed text-sm flex-grow transition-colors duration-500">
                      {card.text}
                    </p>

                 
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
