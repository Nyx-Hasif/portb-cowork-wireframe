"use client";
import Image from "next/image";
import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { assets } from "@/assets/asset";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#202020] text-gray-300 overflow-hidden">
      {/* Gradient Wave */}
      <div className="gradient-wave h-2 md:h-3 w-full" />

      {/* 🔥 REDUCED PADDING: py-14 → py-8 md:py-10 */}
      <div className="w-full max-w-[1300px] mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-10">
        {/* ---- Top Grid ---- */}
        {/* 🔥 REDUCED GAP: gap-10 md:gap-12 → gap-6 md:gap-8 */}
        {/* 🔥 REDUCED BOTTOM PADDING: pb-10 → pb-6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-6 border-b border-gray-700">
          {/* Logo & tagline */}
          <div>
            {/* 🔥 SMALLER LOGO: w-40 sm:w-48 → w-28 sm:w-32 */}
            <Image
              src={assets.portb_logo}
              alt="PortB logo"
              width={150}
              height={150}
              quality={100}
              priority
              className="object-contain w-28 sm:w-32"
              draggable={false}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400 text-base">
              {[
                { name: "Packages", href: "/coworking-space" },
                { name: "Community", href: "/previous-events" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <p className="text-base text-gray-400">+60 14 3298 981</p>
            <p className="text-base text-gray-400 mb-3">helloportb@gmail.com</p>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Mail size={18} className="text-emerald-400" />
              <span>{"We'd love to hear from you!"}</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 text-base mb-3">
              Subscribe for events & latest updates.
            </p>
            {/* Email input */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full overflow-hidden rounded-lg border border-gray-600 focus-within:ring-2 focus-within:ring-emerald-500"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 px-4 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send size={18} className="text-white" />
              </button>
            </form>
          </div>
        </div>

        {/* ---- Bottom Section ---- */}
        {/* 🔥 REDUCED TOP PADDING: pt-8 → pt-5 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-5">
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2025 PortB. All rights reserved.
          </p>

          {/* Social media icons */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            {/* Facebook */}
            <Link
              href="https://facebook.com/portb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] hover:bg-[#0c63d4] transition-colors"
            >
              <FaFacebook size={18} className="text-white" />
            </Link>

            {/* TikTok */}
            <Link
              href="https://tiktok.com/@portb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#000000] hover:bg-[#EE1D52] transition-colors"
            >
              <FaTiktok size={18} className="text-white" />
            </Link>

            {/* Instagram */}
            <Link
              href="https://instagram.com/portb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#F77737] to-[#C13584] hover:opacity-90 transition-opacity"
            >
              <FaInstagram size={18} className="text-white" />
            </Link>

            {/* Threads */}
            <Link
              href="https://threads.net/@portb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#000000] hover:bg-[#333333] transition-colors"
            >
              <span className="text-white font-bold text-lg">@</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
