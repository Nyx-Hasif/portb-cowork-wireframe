// app/(main)/previous-events/components/PrevEvent.tsx
"use client";
import React, { useState, useEffect } from "react";
import Carousel from "@/components/ui/carousel";
import Image from "next/image";
import {
  HiLightBulb,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";
import { Loader2 } from "lucide-react";
import { getPreviousEvents } from "@/lib/database"; // ⭐ Changed: Use getPreviousEvents (no limit)

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  users: <HiOutlineUserGroup className="w-8 h-8 text-[#004348]" />,
  rocket: <HiOutlineRocketLaunch className="w-8 h-8 text-[#004348]" />,
  lightbulb: <HiLightBulb className="w-8 h-8 text-[#004348]" />,
  presentation: (
    <HiOutlinePresentationChartLine className="w-8 h-8 text-[#004348]" />
  ),
};

const defaultIcon = <HiOutlineUserGroup className="w-8 h-8 text-[#004348]" />;

interface PreviousEvent {
  id: number;
  title: string;
  description?: string;
  category: string;
  icon_name?: string;
  image_url?: string;
  created_at?: string;
}

const PrevEvent = () => {
  const [events, setEvents] = useState<PreviousEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ⭐ Changed: Get ALL previous events (no limit)
        const data = await getPreviousEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching previous events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Transform for Carousel
  const cards = events.map((event) => ({
    id: event.id,
    icon: event.icon_name
      ? iconMap[event.icon_name] || defaultIcon
      : defaultIcon,
    category: event.category,
    title: event.title,
    img: event.image_url || "",
    description: event.description || "",
  }));

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-[#f9fafb] text-gray-800 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#004348]" />
        </div>
      </section>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <section className="bg-[#f9fafb] text-gray-800 py-10">
        <header className="text-center space-y-4 lg:mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#004348]">
            Previous Events
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay tuned for our upcoming events!
          </p>
        </header>
      </section>
    );
  }

  return (
    // ⭐ Added: overflow-hidden to prevent content leaking
    <section className="bg-[#f9fafb] text-gray-800 py-10 overflow-hidden">
      {/* Hero */}
      <header className="text-center space-y-4 lg:mb-14 px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#004348]">
          Previous Events
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover how our multifunctional conference spaces bring every idea,
          meeting, and collaboration to life through thoughtful design.
        </p>
      </header>

      {/* Mobile & Tablet: Carousel - ⭐ Added overflow-hidden wrapper */}
      <div className="block lg:hidden relative w-full py-12 overflow-hidden">
        <Carousel cards={cards} />
      </div>

      {/* Desktop: Grid - ⭐ Changed to responsive grid that shows ALL events */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {events.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={90}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#004348] to-[#006d75] flex items-center justify-center">
                  <span className="text-white/60 text-lg">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {item.icon_name
                  ? iconMap[item.icon_name] || defaultIcon
                  : defaultIcon}
                <span className="uppercase tracking-wide text-sm text-[#004348] font-medium">
                  {item.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold line-clamp-2">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing section */}
      <footer className="lg:mt-16 text-center space-y-6 px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#004348]">
          Spaces That Adapt to You
        </h2>
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
          From intimate team sessions to large-scale presentations, our
          configurable spaces support innovation, collaboration, and success —
          all with quiet elegance.
        </p>
      </footer>
    </section>
  );
};

export default PrevEvent;
