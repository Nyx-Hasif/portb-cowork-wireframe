// app/(main)/program/components/TestimonialSection.tsx

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { TestimonialVideo } from "@/types/types";
import { Play, Pause, Quote, Star } from "lucide-react";

interface TestimonialSectionProps {
  testimonial: TestimonialVideo;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonial,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setShowVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-neutral-500 mb-4">
            Don&apos;t take our word for it
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
            Real Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT - Video Player */}
          <div className="relative group">
            {/* Video Container */}
            <div className="relative aspect-[9/16] sm:aspect-[3/4] max-w-sm mx-auto overflow-hidden border border-white/10">
              {/* Thumbnail / Video */}
              {!showVideo ? (
                <>
                  <Image
                    src={testimonial.thumbnail}
                    alt={`${testimonial.participantName} testimonial`}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Play Button */}
                  <button
                    onClick={handlePlayClick}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="relative">
                      {/* Pulse ring */}
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                        <Play
                          size={32}
                          className="text-black ml-1 fill-black"
                        />
                      </div>
                    </div>
                  </button>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
                    1:25
                  </div>
                </>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={testimonial.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    onClick={togglePlay}
                    onEnded={() => {
                      setIsPlaying(false);
                      setShowVideo(false);
                    }}
                  />

                  {/* Play/Pause overlay on click */}
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 z-10 flex items-center justify-center"
                  >
                    <div
                      className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-opacity duration-300 ${
                        isPlaying
                          ? "opacity-0 hover:opacity-100"
                          : "opacity-100"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause size={24} className="text-white" />
                      ) : (
                        <Play size={24} className="text-white ml-1" />
                      )}
                    </div>
                  </button>
                </>
              )}
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-white/20" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-white/20" />
          </div>

          {/* RIGHT - Quote & Info */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Quote icon */}
            <Quote size={48} className="text-white/10" />

            {/* The quote */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Divider */}
            <div className="w-16 h-[2px] bg-white/30" />

            {/* Participant info */}
            <div className="space-y-2">
              <p className="text-lg sm:text-xl font-black uppercase tracking-wider">
                {testimonial.participantName}
              </p>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
                {testimonial.participantTitle}
              </p>
            </div>

            {/* Star rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-white fill-white" />
              ))}
            </div>

            {/* Premium Tags */}
            <div className="flex flex-wrap gap-3 pt-6">
              {[
                "Verified Participant",
                "Authentic Testimonial",
                "Unscripted Experience",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="relative px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
