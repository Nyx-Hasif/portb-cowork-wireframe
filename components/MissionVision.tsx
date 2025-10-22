"use client";
import React from "react";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/asset";

type Section = {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  duotone: { highlight: string; shadow: string };
};

const MissionVision = () => {
  const sections: Section[] = [
    {
      id: 1,
      title: "Mission",
      description:
        "Transform the way people in Kota Bharu work and grow by turning ordinary space into a place that works for you.",
      image: assets.our_mission,
      duotone: { highlight: "#EEead0", shadow: "#CA3D33" },
    },
    {
      id: 2,
      title: "Vision",
      description:
        "Inspire entrepreneurs, freelancers, and creators to thrive, collaborate, and build meaningful connections that spark innovation.",
      image: assets.our_vision,
      duotone: { highlight: "#2887BF", shadow: "#242659" },
    },
    {
      id: 3,
      title: "Values",
      description:
        "We believe in adaptability, community, and authenticity — spaces and solutions that grow with your needs.",
      image: assets.our_values,
      duotone: { highlight: "#02AA6D", shadow: "#251863" },
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-[#fafafa] dark:bg-gray-900">
      {/* subtle ambience */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-32 h-96 w-96 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 h-96 w-96 bg-teal-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-[40rem] bg-indigo-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 md:space-y-24">
        {sections.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={`relative isolate flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* image side */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative md:w-1/2 w-full overflow-hidden rounded-3xl shadow-xl dark:shadow-gray-800"
            >
              <div className="relative h-full min-h-[450px] md:min-h-[500px] [aspect-ratio:4/5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={100}
                  className="object-cover object-center grayscale hover:grayscale-0 transition duration-700"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${item.duotone.highlight}33, ${item.duotone.shadow}66)`,
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </motion.div>

            {/* text side */}
            <div className="md:w-1/2 w-full flex flex-col justify-center min-h-[350px] md:min-h-[500px] space-y-6 text-center md:text-left">
              <h3
                className="text-5xl md:text-6xl font-extrabold tracking-tight"
                style={{ color: item.duotone.shadow }}
              >
                {item.title}
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-md mx-auto md:mx-0">
                {item.description}
              </p>
              <div
                className="mx-auto md:mx-0 h-[3px] w-24 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${item.duotone.highlight}, transparent)`,
                }}
              />
            </div>

            {/* glow halo */}
            <div
              className="absolute -z-10 h-[65%] w-[60%] blur-3xl opacity-25 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${item.duotone.highlight}55, transparent 70%)`,
                top: "50%",
                left: i % 2 === 0 ? "65%" : "20%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionVision;
