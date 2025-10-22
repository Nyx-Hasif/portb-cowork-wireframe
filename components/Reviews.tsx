"use client";
import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import TestimonialCarouselDemo from "./testimonialsCarousel";
import LustreText from "@/components/ui/lustretext";

const Reviews = () => {
  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom...",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind...",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune...",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago — never mind how long precisely — I thought I would sail about...",
      name: "Herman Melville",
      title: "Moby‑Dick",
    },
  ];

  return (
    <section className="relative w-full md:py-8 py-6  md:space-y-6 bg-[#e9eef3]">
      {/* heading / intro stays centered and narrow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center space-y-4 md:space-y-6 px-4"
      >
        <LustreText
          className="text-3xl w-full sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          text="Loved by Creators & Teams"
        />
        <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl md:text-2xl tracking-tight">
          Here’s what our members say
        </p>
      </motion.div>

      {/* full‑width marquees */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full hidden lg:flex flex-col overflow-hidden"
      >
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full hidden lg:flex flex-col overflow-hidden"
      >
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
        />
      </motion.div>

      {/* mobile carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full lg:hidden flex justify-center px-2"
      >
        <TestimonialCarouselDemo/>
      </motion.div>
    </section>
  );
};

export default Reviews;
