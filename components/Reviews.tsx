"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import TestimonialCarouselDemo from "./testimonialsCarousel";
import LustreText from "@/components/ui/lustretext";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "@/assets/asset";
import Image from "next/image";

// Helper function untuk format seconds ke mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

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
      videoUrl: "/videos/feedback_1.mp4",
      thumbnail: assets.feedback_thumbnail_1.src,
      name: "Sarah Santos",
      role: "Accountant",
      duration: "0:32",
    },
    {
      id: 2,
      videoUrl: "/videos/feedback_2.mp4",
      thumbnail: assets.feedback_thumbnail_2.src,
      name: "Nadia Nordin",
      role: "Make Up Artist",
      duration: "0:25",
    },
    {
      id: 3,
      videoUrl: "/videos/feedback_3.mp4",
      thumbnail: assets.feedback_thumbnail_3.src,
      name: "Ameer Zikri",
      role: "University Students",
      duration: "0:37",
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
    <section className="relative w-full md:py-8 py-6 md:space-y-6 bg-white">
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

// Video Card Component for Desktop - FIXED PAUSE ISSUE
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
  const [showVideo, setShowVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect untuk stop & reset video bila video lain play
  React.useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.load();
      setIsPlaying(false);
      setShowVideo(false);
      setCurrentTime(0);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // PAUSE - jangan reset, just pause je
        videoRef.current.pause();
        setIsPlaying(false);
        // TAK PANGGIL onStop() dan TAK reset showVideo!
      } else {
        if (!showVideo) {
          // First time play
          setShowVideo(true);
          onPlay();
        }
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle video end - reset balik ke thumbnail
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowVideo(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
    onStop();
  };

  // Handle time update - track current playback time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata - get video duration
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <div className="relative group cursor-pointer">
      <div
        className="relative rounded-xl overflow-hidden bg-gray-900 cursor-pointer"
        onClick={togglePlay}
      >
        {/* Thumbnail Overlay - Show bila tak playing */}
        {!showVideo && (
          <div className="absolute inset-0 z-10 cursor-pointer">
            <Image
              src={video.thumbnail}
              alt={video.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            {/* Play Button HANYA di thumbnail */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 hover:scale-110 transition-all cursor-pointer">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
            {/* Duration Badge - Show total duration */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-white text-xs">
                {duration > 0 ? formatTime(duration) : video.duration}
              </span>
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full aspect-[9/16] object-cover cursor-pointer"
          src={video.videoUrl}
          poster={video.thumbnail}
          muted
          playsInline
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* BILA PLAYING/PAUSED - TAK ADA BUTTON! */}
        {showVideo && (
          <div className="absolute inset-0 cursor-pointer">
            {/* Duration Badge */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1 z-20">
              <span className="text-white text-xs">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Playing Indicator - Show HANYA bila tengah playing */}
            {isPlaying && isActive && (
              <div className="absolute top-4 left-4 bg-red-600 rounded px-2 py-1 flex items-center gap-1 z-20">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs">Playing</span>
              </div>
            )}

            {/* Paused Indicator - Show bila paused */}
            {!isPlaying && (
              <div className="absolute top-4 left-4 bg-gray-600 rounded px-2 py-1 flex items-center gap-1 z-20">
                <span className="text-white text-xs">Paused</span>
              </div>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {showVideo && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-30">
            <div
              className="h-full bg-red-500 transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
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
  const [showVideo, setShowVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const resetVideo = () => {
    setIsPlaying(false);
    setShowVideo(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.load();
    }
  };

  const nextVideo = () => {
    resetVideo();
    setDuration(0);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    resetVideo();
    setDuration(0);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // PAUSE - jangan reset, just pause je
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        if (!showVideo) {
          setShowVideo(true);
        }
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    resetVideo();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="relative">
        {/* Video Container */}
        <div
          className="relative rounded-xl overflow-hidden bg-gray-900 cursor-pointer"
          onClick={togglePlay}
        >
          {/* Thumbnail Overlay - Show bila video TAK playing */}
          {!showVideo && (
            <div className="absolute inset-0 z-10 cursor-pointer">
              <Image
                src={videos[currentIndex].thumbnail}
                alt={videos[currentIndex].name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Play Button on Thumbnail */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 hover:scale-110 transition-all cursor-pointer">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
              {/* Duration Badge */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-white text-sm">
                  {duration > 0
                    ? formatTime(duration)
                    : videos[currentIndex].duration}
                </span>
              </div>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full aspect-[9/16] object-cover cursor-pointer"
            src={videos[currentIndex].videoUrl}
            poster={videos[currentIndex].thumbnail}
            muted
            playsInline
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {/* Overlay - Show bila video playing (TAK ADA PAUSE BUTTON!) */}
          {showVideo && (
            <div className="absolute inset-0 cursor-pointer">
              {/* Duration Badge - Always show bila video dah start */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1 z-20">
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Playing Indicator - Show bila tengah playing */}
              {isPlaying && (
                <div className="absolute top-4 left-4 bg-red-600 rounded px-2 py-1 flex items-center gap-1 z-20">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white text-xs">Playing</span>
                </div>
              )}

              {/* Paused Indicator - Show bila paused */}
              {!isPlaying && (
                <div className="absolute top-4 left-4 bg-gray-600 rounded px-2 py-1 flex items-center gap-1 z-20">
                  <span className="text-white text-xs">Paused</span>
                </div>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {showVideo && duration > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 z-30">
              <div
                className="h-full bg-red-500 transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevVideo();
          }}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition z-40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextVideo();
          }}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition z-40 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
        </button>
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
