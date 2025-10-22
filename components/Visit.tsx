"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/asset";

const Visit = () => {
  const [open, setOpen] = useState(false);

  // ✅ Close modal with ESC for desktop only
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && window.innerWidth >= 768) setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  return (
    <section className=" relative py-20 overflow-hidden bg-[#f8fafb]">
      {/* ambient blobs */}
      {/* <div className="absolute inset-0">
        <div className="absolute top-0 left-20 h-64 w-64 bg-green-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-32 h-80 w-80 bg-blue-400/20 rounded-full blur-3xl" />
      </div> */}

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-6 md:px-10 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center md:text-left"
        >
          <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight text-gray-900 dark:text-black">
            Visit{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600">
              PortB
            </span>{" "}
            Today
          </h1>

          <p className="text-lg md:text-2xl text-gray-700 dark:text-black leading-relaxed">
            Ready to experience exceptional workplace services at PortB? Visit
            our space, conveniently located near the mall. Our friendly team is
            here to provide you with the highest standard of comfort and care.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center px-10 py-4 rounded-2xl text-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-400/30 hover:shadow-green-400/50 transition"
          >
            🎬 View Video
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center items-center rounded-3xl overflow-hidden shadow-xl dark:shadow-gray-800"
        >
          <Image
            src={assets.portb_location}
            alt="PortB Location"
            width={800}
            height={800}
            quality={100}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/20 opacity-60" />
        </motion.div>
      </div>

      {/* ✅ Modal Layer */}
      <div className={open ? "pointer-events-auto" : "pointer-events-none"}>
        <AnimatePresence>
          {open && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            >
              {/* clearly visible close button outside video */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-8 right-10 text-white bg-white/20 backdrop-blur-md hover:bg-white/40 transition rounded-full h-12 w-12 flex items-center justify-center text-3xl shadow-lg z-[1000]"
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
                  title="PortB Tour Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Visit;
