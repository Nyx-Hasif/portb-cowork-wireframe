"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/asset";
import { MapPinIcon, MapPin, Clock, Phone } from "lucide-react";
import {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipContent,
} from "@/components/ui/card-flip";

const Visit = () => {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && window.innerWidth >= 768) setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  return (
    <section
      id="visit"
      className="py-16 md:py-24 bg-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Flex container: column on mobile, row on desktop */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN — Content & Info */}
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
                      Mon-Fri: 8:00 AM – 7:00 PM
                      <br />
                      Sat: 10:00 AM – 4:00 PM
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      *Members have 24/7 access
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

              {/* Buttons — centered on mobile, left on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center cursor-pointer justify-center px-6 py-3 md:px-8 md:py-4 rounded-2xl text-base md:text-lg font-semibold text-white bg-[#217885] shadow-md hover:shadow-lg transition"
                >
                  🎬 View Video
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFlip((prev) => !prev)}
                  className={`inline-flex items-center cursor-pointer justify-center px-6 py-3 md:px-8 md:py-4 rounded-2xl text-base md:text-lg font-semibold text-white shadow-md hover:shadow-lg transition ${
                    flip
                      ? "bg-[#217885] hover:bg-[#217885]"
                      : "bg-gradient-to-r from-sky-500 to-blue-600"
                  }`}
                >
                  <MapPinIcon className="w-5 h-5 mr-2 md:w-6 md:h-6" />
                  {flip ? "View Building" : "View Location"}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN — Flip Card */}
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

      {/* Video Modal (unchanged) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-8 right-10 text-white bg-white/20 backdrop-blur-md hover:bg-white/40 transition rounded-full h-12 w-12 flex items-center justify-center text-3xl shadow-lg"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            >
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="PortB Tour Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Visit;
