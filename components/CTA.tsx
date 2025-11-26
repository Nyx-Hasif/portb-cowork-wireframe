import { assets } from "@/assets/asset";
import Image from "next/image";
import Link from "next/link";
import { SparklesText } from "./ui/sparkles-text";
import { ArrowRight } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="relative h-[400px] md:h-[550px] lg:h-[700px] w-full">
        <Image
          src={assets.bg_cta_home}
          alt="Coworking environment"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center scale-105 animate-slow-zoom"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-transparent" />

        {/* Decorative floating dots (very subtle, fewer) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-3 h-3 bg-cyan-400/30 rounded-full blur-[2px] animate-float" />
          <div className="absolute top-1/2 right-16 w-4 h-4 bg-blue-400/30 rounded-full blur-[2px] animate-float-delay-1" />
          <div className="absolute bottom-14 left-1/3 w-2 h-2 bg-teal-400/30 rounded-full blur-[1px] animate-float-delay-2" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight animate-fade-in-up">
              <span className="text-white">Your Next Big Idea</span>
              <br />
              <SparklesText >
                Starts Here
              </SparklesText>
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Discover inspiring coworking spaces designed to spark creativity,
              boost productivity & connect vibrant communities.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up animation-delay-400 pt-2">
              <Link
                href="/coworking-space"
                className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-white to-white hover:from-teal-500 hover:to-blue-600 text-black font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-105 relative overflow-hidden group"
              >
                {/* Smooth shine line */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-overlay group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">Explore Packages</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Optional soft bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#e9eef3] to-transparent" />
    </section>
  );
};

export default CTA;
