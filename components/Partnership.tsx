"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/assets/asset";
import React from "react";

const Partnership = () => {
  const partners = [
    { image: assets.b_logo, name: "B Logo" },
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
    { image: assets.sogno_logo, name: "Sogno Coffee" },
  ];

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Duplicate partners 4x untuk extra smoothness
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <section className="w-full bg-[#e9eef3] overflow-hidden py-16 md:py-24 text-gray-900">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-widest text-gray-500 mb-4 text-center"
        >
          Partnership
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-center text-gray-900"
        >
          We have worked with
        </motion.h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <div className={`marquee-wrapper ${mounted ? "is-animated" : ""}`}>
          {duplicatedPartners.map((p, i) => (
            <div
              key={i}
              className="marquee-item flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={160}
                height={80}
                quality={100}
                draggable={false}
                className="object-contain w-[120px] h-[60px] sm:w-[140px] sm:h-[70px] md:w-[160px] md:h-[80px] opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Gradient Edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#e9eef3] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#e9eef3] to-transparent pointer-events-none z-10" />
      </div>

      {/* Marquee Styles */}
      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          gap: 2rem;
          width: max-content;
        }

        .marquee-item {
          flex-shrink: 0;
          width: 180px;
          height: 100px;
        }

        @media (min-width: 640px) {
          .marquee-item {
            width: 200px;
            height: 110px;
          }
        }

        @media (min-width: 768px) {
          .marquee-item {
            width: 240px;
            height: 130px;
          }
          .marquee-wrapper {
            gap: 2.5rem;
          }
        }

        .is-animated {
          animation: scroll 90s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
};

export default Partnership;
