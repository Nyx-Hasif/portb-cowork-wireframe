import { assets } from "@/assets/asset";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden group bg-black -mb-1">
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src={assets.bg_cta_home}
          alt="Premium Coworking Space"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 opacity-50"
        />
        {/* Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="inline-block py-1 px-3 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] text-gray-300 mb-8 backdrop-blur-md">
          Flexible Workspace
        </span>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight tracking-tight">
          Define Your <br />
          <span className="italic text-gray-400">Legacy Here.</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
          Join a collective of visionaries in a space built for focus. Your best
          work is waiting to be created.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* Explore Packages Button */}
          <Link
            href="/coworking-space"
            className="relative overflow-hidden group/btn bg-white text-black px-12 py-5 text-sm uppercase tracking-widest font-bold transition-all hover:bg-gray-200"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Packages
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </span>
          </Link>

          {/* Chat with Us Button (Direct to WhatsApp) */}
          <a
            href="https://wa.me/60143298981?text=Hi%20PortB,%20I%20would%20like%20to%20inquire%20about..."
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 text-sm uppercase tracking-widest font-medium text-white border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm flex items-center gap-3"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Us
          </a>
        </div>
      </div>

      {/* Bottom gradient untuk smooth transition ke footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#202020] pointer-events-none z-20" />
    </section>
  );
};

export default CTA;
