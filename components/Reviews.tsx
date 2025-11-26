"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import TestimonialCarouselDemo from "./testimonialsCarousel";
import LustreText from "@/components/ui/lustretext";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// Define types
type VideoReview = {
  id: number;
  videoUrl: string;
  thumbnail: string;
  name: string;
  role: string;
  duration: string;
};

type Testimonial = {
  quote: string;
  name: string;
  title: string;
  image: string;
};

const Reviews = () => {
  // State untuk track video mana yang tengah play
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom...",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind...",
      name: "William Shakespeare",
      title: "Hamlet",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune...",
      name: "Jane Austen",
      title: "Pride and Prejudice",
      image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=200",
    },
    {
      quote:
        "Call me Ishmael. Some years ago — never mind how long precisely — I thought I would sail about...",
      name: "Herman Melville",
      title: "Moby‑Dick",
      image:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=200",
    },
  ];

  // Video Reviews Data
  const videoReviews: VideoReview[] = [
    {
      id: 1,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
      name: "Ahmad Razak",
      role: "Startup Founder",
      duration: "0:45",
    },
    {
      id: 2,
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500",
      name: "Sarah Lee",
      role: "Creative Director",
      duration: "1:02",
    },
    {
      id: 3,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500",
      name: "David Chen",
      role: "Tech Lead",
      duration: "0:58",
    },
    {
      id: 4,
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      thumbnail:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500",
      name: "Maria Santos",
      role: "Marketing Manager",
      duration: "1:15",
    },
  ];

  return (
    <section className="relative w-full md:py-8 py-6 md:space-y-6 bg-[#e9eef3]">
      {/* Heading / Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center space-y-4 md:space-y-6 px-4"
      >
        <LustreText
          className="text-3xl w-full sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          text="Loved by Creators & Teams"
        />
        <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl md:text-2xl tracking-tight">
          Here&apos;s what our members say
        </p>
      </motion.div>

      {/* Full-width marquees */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full hidden lg:flex flex-col overflow-hidden"
      >
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full hidden lg:flex flex-col overflow-hidden"
      >
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
        />
      </motion.div>

      {/* Mobile carousel for text testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full lg:hidden flex justify-center px-2"
      >
        <TestimonialCarouselDemo />
      </motion.div>

      {/* Video Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full mt-16"
      >
        {/* Section Title */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Customer Feedbacks
          </h3>
          <p className="text-gray-600">Real stories from our Coworking Space</p>
        </div>

        {/* Desktop: 4 Videos Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
          {videoReviews.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={activeVideoId === video.id}
              onPlay={() => setActiveVideoId(video.id)}
              onStop={() => setActiveVideoId(null)}
            />
          ))}
        </div>

        {/* Mobile/Tablet: Video Carousel */}
        <div className="lg:hidden">
          <VideoCarousel videos={videoReviews} />
        </div>
      </motion.div>
    </section>
  );
};

// Video Card Component for Desktop
interface VideoCardProps {
  video: VideoReview;
  isActive: boolean;
  onPlay: () => void;
  onStop: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive,
  onPlay,
  onStop,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect untuk stop video bila video lain play
  React.useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true; // Mute bila stop
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = true; // Mute bila pause
        setIsPlaying(false);
        onStop();
      } else {
        onPlay(); // Notify parent that this video is playing
        videoRef.current.muted = false; // Auto unmute bila play
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.muted = true; // Mute bila video end
    }
    onStop();
  };

  return (
    <div className="relative group">
      <div className="relative rounded-xl overflow-hidden bg-gray-900">
        {/* Video - Start muted for autoplay policy compliance */}
        <video
          ref={videoRef}
          className="w-full aspect-[9/16] object-cover"
          src={video.videoUrl}
          poster={video.thumbnail}
          muted
          playsInline
          onEnded={handleVideoEnd}
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition"
          >
            {isPlaying && isActive ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Duration Badge */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-white text-xs">{video.duration}</span>
          </div>
        </div>

        {/* Playing Indicator */}
        {isPlaying && isActive && (
          <div className="absolute top-4 left-4 bg-red-600 rounded px-2 py-1 flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs">Playing</span>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-3">
        <h4 className="font-semibold text-gray-900">{video.name}</h4>
        <p className="text-sm text-gray-600">{video.role}</p>
      </div>
    </div>
  );
};

// Video Carousel Component for Mobile/Tablet
interface VideoCarouselProps {
  videos: VideoReview[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = true; // Mute bila pause
      } else {
        videoRef.current.muted = false; // Auto unmute bila play
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="relative">
        {/* Video Container */}
        <div className="relative rounded-xl overflow-hidden bg-gray-900">
          <video
            ref={videoRef}
            className="w-full aspect-[9/16] object-cover"
            src={videos[currentIndex].videoUrl}
            poster={videos[currentIndex].thumbnail}
            muted
            playsInline
            onEnded={handleVideoEnd}
          />

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </button>

            {/* Duration Badge */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-white text-sm">
                {videos[currentIndex].duration}
              </span>
            </div>

            {/* Playing Indicator */}
            {isPlaying && (
              <div className="absolute top-4 left-4 bg-red-600 rounded px-2 py-1 flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs">Playing</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevVideo}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>
        <button
          onClick={nextVideo}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-900" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(false);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.muted = true;
                }
              }}
              className={`w-2 h-2 rounded-full transition ${
                index === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-4 text-center">
        <h4 className="font-semibold text-gray-900 text-lg">
          {videos[currentIndex].name}
        </h4>
        <p className="text-gray-600">{videos[currentIndex].role}</p>
      </div>
    </div>
  );
};

export default Reviews;
