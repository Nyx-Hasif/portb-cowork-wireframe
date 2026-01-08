"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image, { StaticImageData } from "next/image";
import { GalleryItem } from "@/types/types";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize,
  X,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
} from "lucide-react";

interface SteamGalleryProps {
  items: GalleryItem[];
}

// ============================================
// HELPERS
// ============================================
const getImageSrc = (src: string | StaticImageData): string => {
  return typeof src === "string" ? src : src.src;
};

const formatTime = (time: number): string => {
  if (isNaN(time) || !isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// ============================================
// MODERN VIDEO PLAYER (Cinematic UI)
// ============================================
interface ModernVideoPlayerProps {
  src: string;
  poster?: string;
  initialTime?: number;
  initialMuted?: boolean;
  onTimeUpdate?: (time: number) => void;
  onMutedChange?: (muted: boolean) => void;
  onPlayingChange?: (playing: boolean) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onReady?: () => void;
}

const ModernVideoPlayer: React.FC<ModernVideoPlayerProps> = ({
  src,
  poster,
  initialTime = 0,
  initialMuted = false,
  onTimeUpdate,
  onMutedChange,
  onPlayingChange,
  videoRef,
  onReady,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // UI States
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Initialize Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (!isReady) {
        video.currentTime = initialTime;
        video.muted = initialMuted;
        setIsReady(true);
        onReady?.();
        video.play().catch(() => {});
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlayingChange?.(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPlayingChange?.(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    if (video.readyState >= 3) handleCanPlay();
    if (video.readyState >= 1) handleLoadedMetadata();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [
    videoRef,
    initialTime,
    initialMuted,
    onReady,
    isReady,
    onTimeUpdate,
    onPlayingChange,
  ]);

  // Player Actions
  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    },
    [videoRef]
  );

  // Seek function
  const seekToPosition = useCallback(
    (clientX: number) => {
      if (!progressRef.current || !videoRef.current || duration === 0) return;
      const rect = progressRef.current.getBoundingClientRect();
      const pos = Math.max(0, Math.min((clientX - rect.left) / rect.width, 1));
      const newTime = pos * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [videoRef, duration]
  );

  // Handle click on progress bar
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      seekToPosition(e.clientX);
    },
    [seekToPosition]
  );

  // Handle mouse down on progress bar (start dragging)
  const handleProgressMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsDragging(true);
      seekToPosition(e.clientX);
    },
    [seekToPosition]
  );

  // Dragging Logic
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      seekToPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, seekToPosition]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="relative w-full h-full bg-black group/player select-none"
      onClick={togglePlay}
    >
      {/* Loading Spinner */}
      {!isReady && initialTime > 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={initialTime > 0 ? undefined : poster}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          !isReady && initialTime > 0 ? "opacity-0" : "opacity-100"
        }`}
        playsInline
        loop
      />

      {/* Center Play Button (Only when paused) */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
          !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="p-6 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
          <Play size={40} fill="white" className="text-white ml-1" />
        </div>
      </div>

      {/* Bottom Controls - SENTIASA KELIHATAN & BOLEH KLIK */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className="group/bar relative h-2 sm:h-1.5 hover:h-3 sm:hover:h-2.5 bg-white/20 w-full rounded-full cursor-pointer transition-all duration-200 mb-4"
          onClick={handleProgressClick}
          onMouseDown={handleProgressMouseDown}
        >
          {/* Progress Fill */}
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          >
            {/* Scrubber Handle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isPlaying ? (
                <Pause size={24} fill="white" />
              ) : (
                <Play size={24} fill="white" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                  setIsMuted(videoRef.current.muted);
                  onMutedChange?.(videoRef.current.muted);
                }
              }}
              className="text-white hover:text-white/80 transition-colors"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>

            <span className="text-white/80 text-xs font-medium font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// LIGHTBOX MODAL (Fullscreen Container)
// ============================================
interface LightboxModalProps {
  items: GalleryItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClose: (currentTime: number, isMuted: boolean, isPlaying: boolean) => void;
  initialVideoTime?: number;
  initialIsMuted?: boolean;
  initialIsPlaying?: boolean;
}

const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  activeIndex,
  setActiveIndex,
  onClose,
  initialVideoTime = 0,
  initialIsMuted = false,
  initialIsPlaying = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const uiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Video state refs (to avoid stale closures)
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStateRef = useRef({
    time: initialVideoTime,
    muted: initialIsMuted,
    playing: initialIsPlaying,
  });

  const currentItem = items[activeIndex];

  // Global Interaction Handler
  const handleInteraction = useCallback(() => {
    setShowUI(true);
    if (uiTimeoutRef.current) clearTimeout(uiTimeoutRef.current);
    uiTimeoutRef.current = setTimeout(() => setShowUI(false), 3000);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    handleInteraction();
    return () => setMounted(false);
  }, [handleInteraction]);

  // Handle close - sync video state back
  const handleClose = useCallback(() => {
    const state = videoStateRef.current;
    onClose(state.time, state.muted, state.playing);
  }, [onClose]);

  // Navigation
  const next = useCallback(() => {
    setActiveIndex((activeIndex + 1) % items.length);
    setIsZoomed(false);
  }, [activeIndex, items.length, setActiveIndex]);

  const prev = useCallback(() => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
    setIsZoomed(false);
  }, [activeIndex, items.length, setActiveIndex]);

  // Keyboard handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      handleInteraction();
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " " && currentItem.type === "video") {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, next, prev, handleInteraction, currentItem.type]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black z-[99999] flex flex-col overflow-hidden"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      {/* ===== TOP BAR (Auto-hide) ===== */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-start z-40 transition-all duration-300 ${
          showUI
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/10">
          {activeIndex + 1} / {items.length}
        </div>

        <div className="flex gap-2">
          {currentItem.type === "image" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              className="p-3 bg-black/50 hover:bg-white hover:text-black backdrop-blur-md rounded-full text-white transition-all border border-white/10"
            >
              {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="p-3 bg-black/50 hover:bg-red-600 hover:border-red-600 backdrop-blur-md rounded-full text-white transition-all border border-white/10"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ===== CONTENT AREA ===== */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center">
        {/* Arrows (Auto-hide) - Hidden on mobile, shown on tablet+ */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className={`absolute left-2 sm:left-4 p-2 sm:p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-full z-30 transition-all duration-300 ${
            showUI
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10 pointer-events-none"
          }`}
        >
          <ChevronLeft size={32} className="sm:w-10 sm:h-10" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className={`absolute right-2 sm:right-4 p-2 sm:p-4 text-white/60 hover:text-white hover:bg-white/10 rounded-full z-30 transition-all duration-300 ${
            showUI
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 pointer-events-none"
          }`}
        >
          <ChevronRight size={32} className="sm:w-10 sm:h-10" />
        </button>

        {/* Media */}
        <div className="w-full h-full">
          {currentItem.type === "video" ? (
            <ModernVideoPlayer
              videoRef={videoRef}
              src={getImageSrc(currentItem.url)}
              poster={getImageSrc(currentItem.thumbnail)}
              initialTime={initialVideoTime}
              initialMuted={initialIsMuted}
              onTimeUpdate={(t) => {
                videoStateRef.current.time = t;
              }}
              onMutedChange={(m) => {
                videoStateRef.current.muted = m;
              }}
              onPlayingChange={(p) => {
                videoStateRef.current.playing = p;
              }}
            />
          ) : (
            <div
              className={`relative w-full h-full transition-transform duration-500 ease-out cursor-zoom-in ${
                isZoomed ? "scale-[2] cursor-zoom-out" : "scale-100"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            >
              <Image
                src={currentItem.url}
                alt="Fullscreen"
                fill
                sizes="100vw"
                quality={100}
                className="object-contain select-none"
                draggable={false}
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* ===== THUMBNAIL STRIP (Auto-hide) ===== */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-40 transition-all duration-300 ${
          showUI
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-t from-black via-black/80 to-transparent pt-6 sm:pt-8 pb-4 sm:pb-6 px-4">
          <div
            className="flex justify-center gap-2 max-w-4xl mx-auto overflow-x-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                  setIsZoomed(false);
                }}
                className={`relative flex-shrink-0 w-16 sm:w-20 md:w-24 aspect-video rounded-lg overflow-hidden transition-all duration-300 ${
                  activeIndex === idx
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100 scale-105"
                    : "opacity-50 hover:opacity-100 hover:scale-105"
                }`}
              >
                <Image
                  src={item.thumbnail}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                  draggable={false}
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play size={14} fill="white" className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ============================================
// MAIN GALLERY
// ============================================
const SteamGallery: React.FC<SteamGalleryProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [videoState, setVideoState] = useState({
    time: 0,
    muted: false,
    playing: false,
  });

  // Main video ref
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync active thumbnail scroll
  useEffect(() => {
    const activeThumb = thumbRefs.current[activeIndex];
    if (activeThumb && scrollRef.current) {
      scrollRef.current.scrollTo({
        left:
          activeThumb.offsetLeft -
          scrollRef.current.offsetWidth / 2 +
          activeThumb.offsetWidth / 2,
        behavior: "smooth",
      });
    }
    // Reset state when changing item
    setVideoState({ time: 0, muted: false, playing: false });
    setHasStartedPlaying(false);
  }, [activeIndex]);

  const currentItem = items[activeIndex];

  // Open Lightbox
  const handleOpenLightbox = useCallback(() => {
    // Get current video state before opening
    if (mainVideoRef.current && currentItem.type === "video") {
      const video = mainVideoRef.current;
      setVideoState({
        time: video.currentTime,
        muted: video.muted,
        playing: !video.paused,
      });
      video.pause();
    }
    setIsLightboxOpen(true);
  }, [currentItem.type]);

  // Close Lightbox and sync back
  const handleCloseLightbox = useCallback(
    (time: number, muted: boolean, playing: boolean) => {
      setIsLightboxOpen(false);

      // Sync video state back to main video
      if (mainVideoRef.current && currentItem.type === "video") {
        const video = mainVideoRef.current;
        video.currentTime = time;
        video.muted = muted;

        // Mark as started if time > 0
        if (time > 0) {
          setHasStartedPlaying(true);
        }

        // Continue playing if it was playing in lightbox
        if (playing) {
          video.play().catch(() => {});
        }

        setVideoState({ time, muted, playing });
      }
    },
    [currentItem.type]
  );

  // Toggle main video play
  const toggleMainPlay = useCallback(() => {
    if (!mainVideoRef.current) return;
    const video = mainVideoRef.current;

    if (video.paused) {
      video.muted = false;
      video.play();
      setHasStartedPlaying(true);
      setVideoState((s) => ({ ...s, playing: true, muted: false }));
    } else {
      video.pause();
      setVideoState((s) => ({ ...s, playing: false }));
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!mainVideoRef.current) return;
    mainVideoRef.current.muted = !mainVideoRef.current.muted;
    setVideoState((s) => ({
      ...s,
      muted: mainVideoRef.current?.muted || false,
    }));
  }, []);

  return (
    <>
      {/* Global styles for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto px-4">
        {/* MAIN DISPLAY */}
        <div className="relative aspect-video bg-neutral-900 rounded-xl overflow-hidden shadow-2xl group border border-neutral-800">
          {currentItem.type === "video" ? (
            <>
              {/* Thumbnail Overlay - Only show before video has started */}
              {!hasStartedPlaying && (
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={toggleMainPlay}
                >
                  <Image
                    src={currentItem.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover"
                    priority
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="p-5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl hover:scale-110 transition-transform">
                      <Play
                        size={40}
                        fill="white"
                        className="text-white ml-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Video Element - Always renders but hidden behind thumbnail initially */}
              <video
                ref={mainVideoRef}
                src={getImageSrc(currentItem.url)}
                className="w-full h-full object-contain bg-black"
                muted={videoState.muted}
                loop
                playsInline
                onClick={toggleMainPlay}
                onTimeUpdate={() => {
                  if (mainVideoRef.current) {
                    setVideoState((s) => ({
                      ...s,
                      time: mainVideoRef.current?.currentTime || 0,
                    }));
                  }
                }}
                onPlay={() => {
                  setHasStartedPlaying(true);
                  setVideoState((s) => ({ ...s, playing: true }));
                }}
                onPause={() => setVideoState((s) => ({ ...s, playing: false }))}
              />

              {/* Center Play/Pause Button - Only shows after video started and is paused */}
              {hasStartedPlaying && !videoState.playing && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer z-10"
                  onClick={toggleMainPlay}
                >
                  <div className="p-5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl hover:scale-110 transition-transform">
                    <Play size={40} fill="white" className="text-white ml-1" />
                  </div>
                </div>
              )}

              {/* Bottom Controls Bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center transition-opacity duration-300 z-20 ${
                  hasStartedPlaying
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMainPlay();
                    }}
                    className="p-2 sm:p-2.5 bg-black/50 hover:bg-white hover:text-black text-white rounded-full backdrop-blur transition-all"
                  >
                    {videoState.playing ? (
                      <Pause size={16} className="sm:w-[18px] sm:h-[18px]" />
                    ) : (
                      <Play
                        size={16}
                        className="ml-0.5 sm:w-[18px] sm:h-[18px]"
                      />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="p-2 sm:p-2.5 bg-black/50 hover:bg-white hover:text-black text-white rounded-full backdrop-blur transition-all"
                  >
                    {videoState.muted ? (
                      <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" />
                    ) : (
                      <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    )}
                  </button>
                  <span className="text-white/80 text-[10px] sm:text-xs font-mono">
                    {formatTime(videoState.time)}
                  </span>
                </div>

                {/* Fullscreen Button - Always visible */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenLightbox();
                  }}
                  className="p-2 sm:p-2.5 bg-black/50 hover:bg-white hover:text-black text-white rounded-full backdrop-blur transition-all"
                >
                  <Maximize size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </>
          ) : (
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
            >
              {/* Main display images use object-cover to fill container */}
              <Image
                src={currentItem.url}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/60 backdrop-blur rounded-full text-white text-xs sm:text-sm font-medium flex items-center gap-2">
                  <Maximize size={14} className="sm:w-4 sm:h-4" /> Expand
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex - 1 + items.length) % items.length);
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/40 hover:bg-white hover:text-black text-white rounded-full backdrop-blur opacity-0 group-hover:opacity-100 transition-all z-30"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex + 1) % items.length);
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/40 hover:bg-white hover:text-black text-white rounded-full backdrop-blur opacity-0 group-hover:opacity-100 transition-all z-30"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Gallery Counter */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/50 backdrop-blur rounded-full text-white/90 text-[10px] sm:text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity z-30">
            {activeIndex + 1} / {items.length}
          </div>
        </div>

        {/* THUMBNAIL STRIP */}
        <div
          className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 overflow-x-auto pb-2 hide-scrollbar"
          ref={scrollRef}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              ref={(el) => {
                thumbRefs.current[idx] = el;
              }}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-shrink-0 w-20 sm:w-28 md:w-32 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                activeIndex === idx
                  ? "border-white opacity-100 scale-105"
                  : "border-transparent opacity-50 grayscale hover:grayscale-0 hover:opacity-100"
              }`}
            >
              <Image
                src={item.thumbnail}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
                draggable={false}
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play
                    size={16}
                    fill="white"
                    className="text-white drop-shadow-lg sm:w-5 sm:h-5"
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <LightboxModal
          items={items}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onClose={handleCloseLightbox}
          initialVideoTime={videoState.time}
          initialIsMuted={videoState.muted}
          initialIsPlaying={videoState.playing}
        />
      )}
    </>
  );
};

export default SteamGallery;
