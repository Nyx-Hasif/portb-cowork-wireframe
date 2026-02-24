"use client";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { assets } from "@/assets/asset";
import { MapPin, Clock, Phone, Play, X, ExternalLink } from "lucide-react";
import {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipContent,
} from "@/components/ui/card-flip";

const Visit = () => {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="visit"
      className="py-20 md:py-32 bg-neutral-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* MOBILE LAYOUT: Content → Info → Image → Buttons */}
        {/* DESKTOP LAYOUT: Content (Left) → Image (Right) */}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start lg:items-center">
          {/* LEFT COLUMN - Content & Info (Always first) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 order-1"
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4 text-center lg:text-left">
                <motion.span
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-neutral-500 justify-center lg:justify-start w-full lg:w-auto"
                >
                  <span className="w-8 h-px bg-neutral-700 hidden sm:inline-block" />
                  Get In Touch
                  <span className="w-8 h-px bg-neutral-700 hidden sm:inline-block lg:hidden" />
                </motion.span>

                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1]"
                >
                  Visit Port B
                  <span className="block text-neutral-500 italic font-light mt-2">
                    Today
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-neutral-400 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  Experience exceptional workplace services at our premium
                  coworking space. Conveniently located near the mall with
                  dedicated parking.
                </motion.p>
              </div>

              {/* Info Cards */}
              <motion.div variants={itemVariants} className="space-y-4">
                {/* Address */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-1">
                      Location
                    </h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Mezzanine Floor, PT 178-179, Jalan Hamzah, Seksyen 19,
                      15050 Kota Bharu, Kelantan
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-3">
                      Operating Hours
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between sm:justify-start sm:gap-8 items-center text-sm">
                        <span className="text-white">Sun — Thu</span>
                        <span className="text-neutral-400 font-mono">
                          9:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between sm:justify-start sm:gap-8 items-center text-sm pt-2 border-t border-white/5">
                        <span className="text-neutral-500">Fri — Sat</span>
                        <span className="text-neutral-500 italic text-xs">
                          By Request
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm uppercase tracking-wider mb-1">
                      Contact
                    </h4>
                    <a
                      href="tel:+60143298981"
                      className="text-neutral-400 hover:text-white transition-colors text-sm font-mono"
                    >
                      +60 14-329 8981
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* MOBILE: Buttons appear after image (hidden on mobile, shown on desktop) */}
              <motion.div
                variants={itemVariants}
                className="hidden lg:flex flex-col sm:flex-row gap-3 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  <Play className="w-4 h-4 fill-black transition-transform group-hover:scale-110" />
                  <span>Watch Tour</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFlip((prev) => !prev)}
                  className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all duration-300 ${
                    flip
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
                  }`}
                >
                  {flip ? (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      <span>View Building</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4" />
                      <span>View on Map</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* IMAGE COLUMN - MOBILE: order-2, DESKTOP: order-2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="w-full lg:w-1/2 order-2"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-md sm:max-w-lg mx-auto lg:max-w-none">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] blur-2xl opacity-50" />

              {/* Main Card Container */}
              <div className="relative w-full h-full bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <CardFlip isFlipped={flip} className="w-full h-full">
                  <CardFlipFront>
                    <CardFlipContent className="w-full h-full relative">
                      <Image
                        src={assets.portb_location}
                        alt="Port B Building Exterior"
                        fill
                        sizes="(max-width: 1024px) 90vw, 50vw"
                        className="object-cover"
                        draggable={false}
                        quality={100}
                        priority
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </CardFlipContent>
                  </CardFlipFront>

                  <CardFlipBack>
                    <div className="relative w-full h-full bg-neutral-900 overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1052379941552!2d102.23847417498943!3d6.116533393870065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b6af1fb2d1a2ed%3A0x1b8a900bf3cb628f!2sPort%20B%20-%20Coworking%20Space%20%26%20Virtual%20Office!5e0!3m2!1sen!2smy!4v1761413265395!5m2!1sen!2smy"
                        className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Port B Location Map"
                      />
                      {/* Map Overlay */}
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <span className="text-white text-xs font-medium uppercase tracking-wider">
                          Google Maps
                        </span>
                      </div>
                    </div>
                  </CardFlipBack>
                </CardFlip>

                {/* Flip Indicator */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onClick={() => setFlip((prev) => !prev)}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all active:scale-95"
                    aria-label="Flip card"
                  >
                    <motion.div
                      animate={{ rotate: flip ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MOBILE ONLY: Buttons at the bottom (order-3) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:hidden order-3"
          >
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(true)}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] w-full sm:w-auto"
              >
                <Play className="w-4 h-4 fill-black transition-transform group-hover:scale-110" />
                <span>Watch Tour</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFlip((prev) => !prev)}
                className={`group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all duration-300 w-full sm:w-auto ${
                  flip
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5"
                }`}
              >
                {flip ? (
                  <>
                    <ExternalLink className="w-4 h-4" />
                    <span>View Building</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>View on Map</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {mounted &&
        open &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="video-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
              // Remove onClick here - don't close on backdrop click
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setOpen(false)} // Only close via this button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 z-[10000]"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Video Container - Stop propagation to prevent closing */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-sm aspect-[9/16] max-h-[85vh] bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20"
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
              >
                <video
                  src="/videos/portb_location.mp4"
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  poster="/images/video-poster.jpg"
                >
                  Your browser does not support the video tag.
                </video>
              </motion.div>

              {/* Hint - Optional: Add close instruction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                Click ✕ to close
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};

export default Visit;
