// components/Featured.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { Loader2 } from "lucide-react";
import { getUpcomingEvents } from "@/lib/database"; // ⭐ Changed: Get ALL upcoming events

interface UpcomingEvent {
  id: number;
  title: string;
  description?: string;
  category: string;
  is_featured?: boolean;
  fee?: string;
  date?: string;
  time?: string;
  guests?: string;
  image_url?: string;
  created_at?: string;
}

const Featured = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // ⭐ Changed: Get ALL upcoming events (no limit)
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    return null;
  }

  // ⭐ Separate featured and regular events
  const featuredEvents = events.filter((e) => e.is_featured);
  const regularEvents = events.filter((e) => !e.is_featured);

  return (
    // ⭐ Added: overflow-hidden to prevent content leaking to footer
    <section className="bg-[#f9fafb] text-gray-800 py-10 overflow-hidden">
      {/* Featured Events Section */}
      {featuredEvents.length > 0 && (
        <>
          {/* Header for Featured */}
          <header className="text-center mb-12 px-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#004348]">
              Featured Events
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience our most anticipated gatherings where creativity,
              learning, and professional connections come alive.
            </p>
          </header>

          {/* Featured Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 mb-16">
            {featuredEvents.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Image + badges */}
                <div className="relative w-full h-64">
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
                  <div className="absolute top-4 inset-x-0 flex justify-between px-4">
                    <span className="bg-[#3998ff] text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                      {item.category}
                    </span>
                    <span className="bg-[#275382] text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                      ⭐ Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-2">
                      {item.description || "Join us for this exciting event!"}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-3 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar className="text-[#004348] w-5 h-5 flex-shrink-0" />
                      <p className="text-sm truncate">{item.date || "TBA"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineClock className="text-[#004348] w-5 h-5 flex-shrink-0" />
                      <p className="text-sm truncate">{item.time || "TBA"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineUserGroup className="text-[#004348] w-5 h-5 flex-shrink-0" />
                      <p className="text-sm truncate">
                        {item.guests || "Open"}
                      </p>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <h3 className="text-2xl font-semibold text-[#004348]">
                      {item.fee || "Free"}
                    </h3>
                    <button className="bg-[#004348] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#005a5f] transition-colors duration-200">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* All Upcoming Events Section */}
      {regularEvents.length > 0 && (
        <>
          {/* Header for All Events */}
          <header className="text-center mb-12 px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#004348]">
              {featuredEvents.length > 0
                ? "More Upcoming Events"
                : "Upcoming Events"}
            </h2>
            {featuredEvents.length === 0 && (
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Check out our upcoming events and join us!
              </p>
            )}
          </header>

          {/* Regular Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
            {regularEvents.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full h-48">
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
                      <span className="text-white/60">No image</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#3998ff] text-white text-xs font-medium px-2 py-1 rounded shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {item.description || "Join us for this exciting event!"}
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                      <HiOutlineCalendar className="text-[#004348] w-4 h-4" />
                      <span>{item.date || "TBA"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineClock className="text-[#004348] w-4 h-4" />
                      <span>{item.time || "TBA"}</span>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-lg font-semibold text-[#004348]">
                      {item.fee || "Free"}
                    </span>
                    <button className="bg-[#004348] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#005a5f] transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Featured;
