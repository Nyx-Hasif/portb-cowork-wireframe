"use client";
import Image from "next/image";
import { assets } from "@/assets/asset";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#343434]">
      {/* Gradient hijau */}
      <div className="gradient-wave md:h-3 h-2 w-full" />

      <div className="px-6 lg:px-12 py-14 border-t border-gray-200 dark:border-gray-700">
        {/* grid */}
        <div className="grid grid-cols-1  lg:grid-cols-4 gap-10 pb-12 border-b border-gray-200 dark:border-gray-700">
          {/* logo */}
          <div className="flex flex-col space-y-5">
            <Image
              src={assets.portb_logo}
              alt="PortB logo"
              width={800}
              height={800}
              quality={100}
              className="object-contain w-32 sm:w-40 md:w-48 lg:w-64 xl:w-72 h-auto transition-all"
              priority
              draggable={false}
            />
          </div>

          {/* quick links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-lg text-gray-700 dark:text-gray-300">
              {["Packages", "Community", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-green-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Contact
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              +60 14 3298 981
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              helloportB@gmail.com
            </p>
          </div>

          {/* newsletter */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Stay Updated with Us
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Subscribe to our newsletter for events and updates.
            </p>

            {/* ✅ simple stacked layout */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col w-full space-y-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-400 dark:border-gray-600 bg-transparent px-4 py-3 text-base md:text-lg text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-base md:text-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-4 md:space-y-0 text-base md:text-lg text-gray-600 dark:text-gray-400">
          <p>© 2025 PortB. All rights reserved.</p>
          <div className="flex gap-4">
            {["Facebook", "TikTok", "Instagram", "Threads"].map((item) => (
              <a
                key={item}
                href="#"
                className="capitalize hover:text-green-600 dark:hover:text-emerald-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
