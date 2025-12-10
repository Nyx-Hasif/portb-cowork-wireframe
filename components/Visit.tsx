"use client";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/asset";
import { MapPinIcon, MapPin, Clock, Phone, Play } from "lucide-react";
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

  return (
    <section
      id="visit"
      className="py-16 md:py-24 bg-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN */}
          <div className="lg:w-1/2 lg:order-1 w-full">
            <div className="space-y-8 text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-white"
              >
                Visit Port B Today
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-400 text-base md:text-lg font-light max-w-md mx-auto lg:mx-0"
              >
                Ready to experience exceptional workplace services at PortB?
                Visit our space, conveniently located near the mall. Our
                friendly team is here to provide you with the highest standard
                of comfort and care.
              </motion.p>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6 pt-4 max-w-md mx-auto lg:mx-0"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <MapPin className="w-6 h-6 text-white shrink-0" />
                  <div className="text-center sm:text-left">
                    <h4 className="text-white font-medium uppercase tracking-widest mb-1">
                      Address
                    </h4>
                    <p className="text-gray-400">
                      Jalan Telipot, Kampung Telipot
                      <br />
                      15200 Kota Bharu, Kelantan
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Clock className="w-6 h-6 text-white shrink-0" />
                  <div className="text-center sm:text-left">
                    <h4 className="text-white font-medium uppercase tracking-widest mb-1">
                      Staffed Hours
                    </h4>
                    <p className="text-gray-400">
                      Sun-Thu: 9:00 AM – 5:00 PM
                    </p>
                   
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Phone className="w-6 h-6 text-white shrink-0" />
                  <div className="text-center sm:text-left">
                    <h4 className="text-white font-medium uppercase tracking-widest mb-1">
                      Contact
                    </h4>
                    <p className="text-gray-400">+60 12-345 6789</p>
                  </div>
                </div>
              </motion.div>

              {/* Buttons - Black & White Theme */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
              >
                {/* Primary Button - White bg, black text */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(true)}
                  className="group inline-flex items-center cursor-pointer justify-center px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2 md:w-5 md:h-5 fill-black group-hover:scale-110 transition-transform" />
                  View Video
                </motion.button>

                {/* Secondary Button - Outline style */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFlip((prev) => !prev)}
                  className={`group inline-flex items-center cursor-pointer justify-center px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold border-2 transition-all duration-300 ${
                    flip
                      ? "bg-white text-black border-white hover:bg-gray-100"
                      : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                  }`}
                >
                  <MapPinIcon className="w-5 h-5 mr-2 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                  {flip ? "View Building" : "View Location"}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-1/2 lg:order-2 w-full flex justify-center">
            <div className="w-full max-w-md lg:max-w-none h-[400px] lg:h-[500px] bg-neutral-800 relative overflow-hidden border border-white/10 rounded-3xl">
              <CardFlip isFlipped={flip} className="w-full h-full">
                <CardFlipFront>
                  <CardFlipContent className="w-full h-full">
                    <Image
                      src={assets.portb_location}
                      alt="PortB Location"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover"
                      draggable={false}
                      quality={100}
                    />
                  </CardFlipContent>
                </CardFlipFront>

                <CardFlipBack>
                  <div className="relative w-full h-full bg-white overflow-hidden rounded-3xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1052379941552!2d102.23847417498943!3d6.116533393870065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b6af1fb2d1a2ed%3A0x1b8a900bf3cb628f!2sPort%20B%20-%20Coworking%20Space%20%26%20Virtual%20Office!5e0!3m2!1sen!2smy!4v1761413265395!5m2!1sen!2smy"
                      className="absolute inset-0 w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      title="PortB Location Map"
                    />
                  </div>
                </CardFlipBack>
              </CardFlip>
            </div>
          </div>
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
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-3 sm:p-6"
              style={{ margin: 0 }}
            >
              {/* Close Button - Black & White */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-8 md:right-10 text-black bg-white hover:bg-gray-200 active:bg-gray-300 transition-all rounded-full h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-2xl hover:scale-110 active:scale-95 z-[10000] touch-manipulation"
                aria-label="Close video"
              >
                ✕
              </button>

              {/* Video Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl aspect-video max-h-[70vh] bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ring-1 sm:ring-2 ring-white/20"
              >
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="PortB Tour Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </motion.div>

              {/* Mobile Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm sm:hidden animate-pulse">
                Tap ✕ to close
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default Visit;
