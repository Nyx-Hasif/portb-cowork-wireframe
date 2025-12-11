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

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    // 🔥 REDUCED: py-20 md:py-32 → py-12 md:py-16
    <section className="w-full bg-black overflow-hidden py-12 md:py-16 relative">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header - 🔥 REDUCED SPACING */}
        <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            // 🔥 REDUCED: space-y-4 → space-y-3
            className="text-center space-y-3"
          >
            {/* Eyebrow */}
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">
              Trusted By Industry Leaders
            </p>

            {/* Main Heading - 🔥 REDUCED SIZE */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight">
              We&apos;ve Worked With
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Great Companies
              </span>
            </h2>

            {/* Subtext - 🔥 REMOVED mt-6 */}
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join over 20+ organizations that trust PortB for their workspace
              needs
            </p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden min-h-[130px] md:min-h-[150px]">
          {!mounted ? (
            <div className="flex items-center justify-center h-[130px] md:h-[150px]">
              <div className="flex gap-8 opacity-30">
                {partners.slice(0, 5).map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100"
                    style={{
                      width: "180px",
                      height: "100px",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={160}
                      height={80}
                      quality={100}
                      draggable={false}
                      className="object-contain w-[140px] h-[70px] opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="marquee-wrapper is-animated">
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
          )}

          {/* Gradient Edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-black via-black/95 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-black via-black/95 to-transparent pointer-events-none z-10" />
        </div>

        {/* Bottom Decorative Line - 🔥 REMOVED (optional, uncomment if needed) */}
        {/* <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div> */}
      </div>

      {/* Marquee Styles */}
      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          gap: 2rem;
          width: max-content;
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
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
          animation: scroll 120s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .marquee-wrapper {
          opacity: 0;
          animation: scroll 120s linear infinite, fadeIn 0.5s ease-in forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Partnership;
