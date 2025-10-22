"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/asset";

const Partnership = () => {
  const pillars = [
    { icon: "🎓", title: "Education" },
    { icon: "💊", title: "Community Development" },
    { icon: "🎭", title: "Environment" },
    { icon: "🎨", title: "Arts & Public Spaces" },
    { icon: "🔬", title: "Knowledge" },
    { icon: "💻", title: "Creative Support" },
  ];

  /** ✅ put all your real logos here */
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

  return (
    <section className="relative w-full bg-[#e9eef3] text-black overflow-hidden">
      {/* centered content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-16">
        {/* intro */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Building Capacity & Vibrant Communities
          </h2>
          <p className="text-lg md:text-2xl">
            Delivering social value across six main pillars
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 rounded-xl border border-white/10 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-gray-900/30 transition-all"
            >
              <div className="text-6xl mb-4">{p.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {p.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* description */}
        <p className="max-w-3xl mx-auto text-center text-base md:text-xl text-black leading-relaxed">
          For over a decade, we’ve advanced social value for Malaysians —
          ensuring inclusivity and equality across all our pillars and partner
          entities.
        </p>
      </div>

      {/* ===== full‑width marquee (pure CSS) ===== */}
      <div className="relative w-full py-10 overflow-hidden">
        <div className="marquee flex gap-12">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="flex items-center bg-white rounded-2xl md:py-4 py-2 justify-center min-w-[160px] sm:min-w-[200px] md:min-w-[240px]"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={180}
                height={80}
                quality={100}
                className="object-contain w-32 sm:w-40 md:w-48 lg:w-56 h-32 opacity-90 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>

        {/* keyframes */}
        <style jsx global>{`
          .marquee {
            width: max-content;
            animation: scroll-left 35s linear infinite;
          }
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Partnership;
