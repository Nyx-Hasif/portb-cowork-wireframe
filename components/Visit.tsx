"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/asset";
import { MapPinIcon } from "lucide-react";
import {
  CardFlip,
  CardFlipFront,
  CardFlipBack,
  CardFlipContent,
} from "@/components/ui/card-flip";

const Visit = () => {
  const [open, setOpen] = useState(false);
  const [flip, setFlip] = useState(false);

  // ESC to close modal (desktop)
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && window.innerWidth >= 768) setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  return (
    <section className="relative bg-[#f8fafb] py-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto px-4 md:px-8 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center lg:text-left"
        >
          <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight text-gray-900">
            Visit{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
              PortB
            </span>{" "}
            Today
          </h1>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Ready to experience exceptional workplace services at PortB? Visit
            our space, conveniently located near the mall. Our friendly team is
            here to provide you with the highest standard of comfort and care.
          </p>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(true)}
              className="inline-flex items-center cursor-pointer justify-center px-8 py-4 rounded-2xl text-lg md:text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:shadow-lg transition"
            >
              🎬 View Video
            </motion.button>

            {/* Flip control */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFlip((prev) => !prev)}
              className={`inline-flex items-center cursor-pointer justify-center px-8 py-4 rounded-2xl text-lg md:text-xl font-semibold text-white shadow-md hover:shadow-lg transition ${
                flip
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-r from-sky-500 to-blue-600"
              }`}
            >
              <MapPinIcon className="w-6 h-6 mr-2" />
              {flip ? "View Building  " : "View Location"}
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT (Flip Card) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-xl flex justify-center"
        >
          <CardFlip
            isFlipped={flip}
            className="w-full max-w-[800px] mx-auto aspect-auto h-110 lg:h-130"
          >
            {/* FRONT SIDE - Image PortB */}
            <CardFlipFront>
              <CardFlipContent>
                <Image
                  src={assets.portb_location}
                  alt="PortB Location"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="w-full h-full object-cover bg-white"
                  draggable={false}
                  quality={100}
                />
              </CardFlipContent>
            </CardFlipFront>

            {/* BACK SIDE - Google Maps Embed */}
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
        </motion.div>
      </div>

      {/* Modal Video */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4"
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
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20"
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
