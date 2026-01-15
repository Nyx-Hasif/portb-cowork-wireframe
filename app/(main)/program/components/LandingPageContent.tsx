// app/(main)/program/components/LandingPageContent.tsx

"use client";

import React from "react";
import Image from "next/image";
import { TrainerData } from "@/types/types";
import SteamGallery from "./SteamGallery";
import FaqSection from "./FaqSection";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";

interface LandingPageContentProps {
  data: TrainerData;
}

const LandingPageContent: React.FC<LandingPageContentProps> = ({ data }) => {
  return (
    <div className="bg-white text-black selection:bg-black selection:text-white mt-[-20px]">
      {/* ============================================= */}
      {/* 1. HERO SECTION - FIXED LAYOUT */}
      {/* ============================================= */}
      <section className="min-h-screen w-full">
        {/* Mobile: Stack vertically | Desktop: Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* LEFT SIDE - Text Content */}
          <div className="order-2 lg:order-1 flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 py-12 lg:py-0">
            <div className="w-full max-w-xl">
              {/* Subtitle */}
              <div className="mb-6 flex items-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-400">
                <span className="w-8 sm:w-12 h-[1px] bg-neutral-300"></span>
                Elite Performance Training
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                {data.heroHeader}
              </h1>

              {/* Subheader */}
              <p className="text-base sm:text-lg lg:text-xl mb-8 max-w-md font-light leading-relaxed text-neutral-600">
                {data.heroSubheader}
              </p>

              {/* Checklist - Desktop only */}
              <div className="hidden lg:flex flex-col gap-3 mb-10 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-black flex-shrink-0"
                  />
                  <span>Professional Guidance Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-black flex-shrink-0"
                  />
                  <span>Personalized Daily Progress Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-black flex-shrink-0"
                  />
                  <span>Exclusive Community Access</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl text-sm">
                  Reg Now <ArrowRight size={18} />
                </button>
                <button className="px-8 py-4 border-2 border-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-sm">
                  Chat Now <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Image */}
          <div className="order-1 lg:order-2 relative h-[50vh] sm:h-[60vh] lg:h-auto lg:min-h-screen bg-neutral-100">
            <Image
              src={data.trainerImage}
              alt={data.trainerName}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-top lg:object-center"
            />
            {/* Gradient overlay for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30 lg:hidden" />
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 2. ABOUT ME SECTION */}
      {/* ============================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 border-t border-black/10 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Image & About Text */}
            <div className="space-y-8">
              {/* Image */}
              <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 overflow-hidden border border-black shadow-2xl">
                <Image
                  src={data.trainerProfileImage}
                  alt="Professional trainer"
                  fill
                  sizes="(max-width: 1024px) 384px, 400px"
                  className="object-cover"
                />
              </div>

              {/* About Text */}
              <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
                <h3 className="text-2xl font-bold uppercase tracking-tighter underline underline-offset-8 decoration-2">
                  About Me
                </h3>
                <p className="text-base font-medium text-neutral-800">
                  {data.aboutIntro}
                </p>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {data.aboutBio}
                </p>
              </div>
            </div>

            {/* Right Column - Experience & Badges */}
            <div className="flex flex-col justify-center space-y-10">
              {/* Experience */}
              <div className="text-center lg:text-left">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">
                  {data.experience.years}
                </h3>
                <p className="text-lg font-bold mb-3 text-neutral-800">
                  {data.experience.description}
                </p>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {data.experience.background}
                </p>
              </div>

              {/* Credentials & Awards */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 text-center lg:text-left">
                  Credentials & Awards
                </h4>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {data.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-widest hover:invert transition-all cursor-default"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Connections */}
              <div className="space-y-4 pt-8 border-t border-neutral-200">
                <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 text-center lg:text-left">
                  Social Connections
                </h4>
                <div className="flex gap-5 items-center justify-center lg:justify-start">
                  <a
                    href="#"
                    className="hover:scale-125 active:scale-90 transition-transform duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="hover:scale-125 active:scale-90 transition-transform duration-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="hover:scale-125 active:scale-90 transition-transform duration-300"
                  >
                    <Twitter size={24} />
                  </a>
                  <a
                    href="#"
                    className="hover:scale-125 active:scale-90 transition-transform duration-300"
                  >
                    <Mail size={24} />
                  </a>
                  <a
                    href="#"
                    className="hover:scale-125 active:scale-90 transition-transform duration-300 font-black text-xs uppercase tracking-tighter border-b-2 border-black"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 3. GALLERY SECTION */}
      {/* ============================================= */}
      <section className="py-20 lg:py-28 bg-black text-white">
        <div className="px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 mb-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-center sm:text-left">
              Program Gallery
            </h2>
          </div>
        </div>
        <SteamGallery items={data.gallery} />
      </section>

      {/* ============================================= */}
      {/* 4. BENEFITS SECTION */}
      {/* ============================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 border-y border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
            Core Benefits
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {data.benefits.map((benefit, idx) => (
              <div key={idx} className="group flex flex-col space-y-5">
                {/* Benefit Image */}
                <div className="relative aspect-[4/3] overflow-hidden lg:grayscale group-hover:grayscale-0 transition-all duration-700 border border-neutral-100 shadow-sm rounded-sm">
                  <Image
                    src={benefit.imageUrl}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                  />
                </div>

                {/* Benefit Content */}
                <div className="space-y-2">
                  <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                    <span className="text-neutral-200 text-4xl">
                      0{idx + 1}
                    </span>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 5. FAQS SECTION */}
      {/* ============================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left - Title */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                Essential
                <br className="hidden lg:block" /> Inquiries
              </h2>
              <p className="text-sm text-neutral-400 font-medium max-w-sm mx-auto lg:mx-0 mb-8">
                Clear, concise, and professional answers regarding our elite
                training methodology and intake process.
              </p>

              {/* Support Info - Desktop */}
              <div className="hidden lg:block mt-auto">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300">
                  Support Terminal
                </div>
                <div className="text-xs font-medium text-neutral-400 mt-2 hover:text-black cursor-pointer transition-colors">
                  helloportb@gmail.com
                </div>
              </div>
            </div>

            {/* Right - FAQ Items */}
            <div className="lg:col-span-3">
              <FaqSection items={data.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 6. CTA SECTION */}
      {/* ============================================= */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden border-t border-black bg-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.ctaBg}
            alt="Facility"
            fill
            sizes="100vw"
            className="object-cover opacity-10 grayscale scale-110"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-20 flex flex-col items-center justify-center space-y-10 w-full max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-tight max-w-4xl">
            Begin Your Transformation Today
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full">
            <button className="w-full sm:w-auto px-12 sm:px-16 lg:px-20 py-5 lg:py-6 bg-black text-white text-sm sm:text-base lg:text-lg font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 active:scale-95 shadow-2xl">
              Join Now
            </button>
            <button className="w-full sm:w-auto px-12 sm:px-16 lg:px-20 py-5 lg:py-6 border-2 border-black text-black text-sm sm:text-base lg:text-lg font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 active:scale-95">
              Schedule Now
            </button>
          </div>

          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-neutral-400">
            Exclusive Group Sessions • Secure Your Preferred Slot
          </p>
        </div>
      </section>

      {/* ============================================= */}
      {/* BACK BUTTON */}
      {/* ============================================= */}
      <div className="py-10 flex justify-center border-t border-neutral-100 bg-white">
        <Link
          href="/program"
          className="text-xs font-black uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all flex items-center gap-3 group text-neutral-600 hover:text-black"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-2 transition-transform"
          />
          Back to Catalog
        </Link>
      </div>
    </div>
  );
};

export default LandingPageContent;
