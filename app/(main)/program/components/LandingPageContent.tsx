// app/(main)/program/components/LandingPageContent.tsx

"use client";

import React from "react";
import Image from "next/image";
import { TrainerData } from "@/types/types";
import SteamGallery from "./SteamGallery";
import FaqSection from "./FaqSection";
import TestimonialSection from "./TestimonialSection";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Instagram,
  Facebook,
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
      {/* 1. HERO SECTION */}
      {/* ============================================= */}
      <section className="min-h-screen w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="order-2 lg:order-1 flex items-center justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 py-12 lg:py-0">
            <div className="w-full max-w-xl">
              <div className="mb-6 flex items-center gap-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-neutral-400">
                <span className="w-8 sm:w-12 h-[1px] bg-neutral-300"></span>
                Elite Performance Training
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-6">
                {data.heroHeader}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-8 max-w-md font-light leading-relaxed text-neutral-600">
                {data.heroSubheader}
              </p>
              <div className="hidden lg:flex flex-col gap-3 mb-10 text-xs font-medium text-neutral-500 uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-black flex-shrink-0"
                  />
                  <span>Guided with Care by Experienced Practitioners</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-black flex-shrink-0"
                  />
                  <span>Support That Honours Where You Are Today</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    className="text-black flex-shrink-0"
                  />
                  <span>A Welcoming Circle of people on Similar Journeys</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={data.ctaLinks.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl text-sm"
                >
                  Reg Now <ArrowRight size={18} />
                </a>
                <a
                  href={data.ctaLinks.chatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                >
                  Chat Now <MessageSquare size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative h-[50vh] sm:h-[60vh] lg:h-auto lg:min-h-screen bg-neutral-100">
            <Image
              src={data.trainerImage}
              alt={data.trainerName}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-top lg:object-center"
            />
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
            <div className="space-y-8">
              <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 overflow-hidden border border-black shadow-2xl">
                <Image
                  src={data.trainerProfileImage}
                  alt="Professional trainer"
                  fill
                  sizes="(max-width: 1024px) 384px, 400px"
                  className="object-cover"
                />
              </div>
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
            <div className="flex flex-col justify-center space-y-10">
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
              {/* Social Connections */}
              {data.socialLinks && (
                <div className="space-y-4 pt-8 border-t border-neutral-200">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 text-center lg:text-left">
                    Social Connections
                  </h4>

                  <div className="flex gap-6 items-center justify-center lg:justify-start">
                    {/* Instagram */}
                    {data.socialLinks.instagram && (
                      <a
                        href={data.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition-all duration-300 hover:-translate-y-1"
                      >
                        <Instagram
                          size={22}
                          className="text-neutral-600 group-hover:text-black transition-colors"
                        />
                      </a>
                    )}

                    {/* Facebook */}
                    {data.socialLinks.facebook && (
                      <a
                        href={data.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition-all duration-300 hover:-translate-y-1"
                      >
                        <Facebook
                          size={22}
                          className="text-neutral-600 group-hover:text-black transition-colors"
                        />
                      </a>
                    )}

                    {/* ✅ Threads Official (Boxicons SVG) */}
                    {data.socialLinks?.threads && (
                      <a
                        href={data.socialLinks.threads}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group transition-all duration-300 hover:-translate-y-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-[22px] h-[22px] text-neutral-600 group-hover:text-black transition-colors duration-300"
                          fill="currentColor"
                        >
                          <path d="M16.39 11.27c-.09-.04-.17-.08-.26-.12-.15-2.84-1.71-4.47-4.32-4.49h-.04c-1.56 0-2.86.67-3.66 1.88l1.44.98c.6-.91 1.53-1.1 2.22-1.1h.02c.86 0 1.51.26 1.93.74.31.35.51.84.61 1.46-.76-.13-1.59-.17-2.47-.12-2.48.14-4.08 1.59-3.97 3.6.05 1.02.56 1.9 1.43 2.47.73.48 1.68.72 2.66.67 1.3-.07 2.32-.57 3.03-1.47.54-.69.88-1.58 1.03-2.7.62.37 1.08.86 1.33 1.45.43 1 .46 2.65-.89 4-1.18 1.18-2.6 1.69-4.74 1.7-2.38-.02-4.17-.78-5.34-2.26-1.09-1.39-1.66-3.4-1.68-5.97.02-2.57.59-4.58 1.68-5.97 1.17-1.49 2.97-2.25 5.34-2.26 2.39.02 4.22.78 5.43 2.28.59.73 1.04 1.65 1.34 2.73l1.68-.45c-.36-1.32-.92-2.46-1.69-3.4-1.56-1.91-3.83-2.89-6.76-2.91h-.01c-2.92.02-5.17 1-6.68 2.92C3.71 6.64 3.01 9.02 2.99 12c.02 3 .72 5.37 2.06 7.08C6.56 21 8.81 21.98 11.73 22h.01c2.6-.02 4.43-.7 5.94-2.21 1.98-1.97 1.92-4.45 1.26-5.97-.47-1.09-1.36-1.97-2.58-2.56Zm-4.49 4.22c-1.09.06-2.22-.43-2.27-1.47-.04-.78.55-1.64 2.34-1.74.2-.01.41-.02.6-.02.65 0 1.26.06 1.81.18-.21 2.57-1.41 2.99-2.48 3.05" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
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
                <div className="relative aspect-[4/3] overflow-hidden lg:grayscale group-hover:grayscale-0 transition-all duration-700 border border-neutral-100 shadow-sm rounded-sm">
                  <Image
                    src={benefit.imageUrl}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                  />
                </div>
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
      {/* 5. TESTIMONIAL VIDEO — ✅ NEW */}
      {/* ============================================= */}
      {data.testimonial && (
        <TestimonialSection testimonial={data.testimonial} />
      )}

      {/* ============================================= */}
      {/* 6. FAQS SECTION */}
      {/* ============================================= */}
      <section className="py-20 lg:py-28 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                Essential
                <br className="hidden lg:block" /> Inquiries
              </h2>
              <p className="text-sm text-neutral-400 font-medium max-w-sm mx-auto lg:mx-0 mb-8">
                Clear, concise, and professional answers regarding our elite
                training methodology and intake process.
              </p>
              <div className="hidden lg:block mt-auto">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300">
                  Support Terminal
                </div>
                <div className="text-xs font-medium text-neutral-400 mt-2 hover:text-black cursor-pointer transition-colors">
                  helloportb@gmail.com
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <FaqSection items={data.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* 7. FINAL CTA */}
      {/* ============================================= */}
      <section className="relative min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden border-t border-black bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={data.ctaBg}
            alt="Facility"
            fill
            sizes="100vw"
            className="object-cover opacity-10 grayscale scale-110"
          />
        </div>
        <div className="relative z-10 text-center px-6 py-20 flex flex-col items-center justify-center space-y-8 w-full max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-neutral-400">
            You&apos;ve read this far for a reason
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-tight">
            {data.ctaHeadline}
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-lg leading-relaxed">
            {data.ctaDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
            {data.ctaSocialProof.map((proof, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                {proof}
              </span>
            ))}
          </div>
          <a
            href={data.ctaLinks.chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-12 sm:px-16 lg:px-20 py-5 lg:py-6 bg-black text-white text-sm sm:text-base lg:text-lg font-black uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-300 active:scale-95 shadow-2xl flex items-center justify-center gap-3"
          >
            <MessageSquare size={20} />
            Talk to Us Now
          </a>
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
