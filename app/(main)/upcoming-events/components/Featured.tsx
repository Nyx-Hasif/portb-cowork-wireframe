// components/Featured.tsx
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiArrowTopRightOnSquare,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { Loader2 } from "lucide-react";
import { getUpcomingEvents } from "@/lib/database";

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
  location?: string;
  register_url?: string;
}

// ─── HELPERS ─────────────────────────────────────────────────
const formatDate = (dateString?: string): string => {
  if (!dateString) return "TBA";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const formatTime = (timeString?: string): string => {
  if (!timeString) return "TBA";
  try {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const min = minutes || "00";
    if (isNaN(hour)) return timeString;
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${min} ${period}`;
  } catch {
    return timeString;
  }
};

const formatFullDate = (dateString?: string): string => {
  if (!dateString) return "To Be Announced";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

// ─── EVENT DETAIL MODAL ──────────────────────────────────────
const EventDetailModal = ({
  event,
  isOpen,
  onClose,
}: {
  event: UpcomingEvent | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        ref={modalContentRef}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* ── Modal Image — original ratio, no crop ── */}
        <div className="relative w-full flex-shrink-0">
          {event.image_url ? (
            <div className="relative w-full max-h-[50vh] overflow-hidden bg-gray-950">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  fill
                  className="object-contain"
                  quality={95}
                  priority
                  sizes="(max-width: 768px) 100vw, 750px"
                />
              </div>

              {/* Gradient overlay for title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#004348] to-[#006d75] flex items-center justify-center">
              <HiOutlineCalendar className="w-16 h-16 text-white/30" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-[#3998ff] text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg">
              {event.category}
            </span>
            {event.is_featured && (
              <span className="bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-lg">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2
              id="modal-title"
              className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-lg"
            >
              {event.title}
            </h2>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain min-h-0">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-[#f0f9f9] rounded-xl p-4">
                <div className="w-10 h-10 bg-[#004348] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiOutlineCalendar className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-gray-800 break-words">
                    {formatFullDate(event.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#f0f9f9] rounded-xl p-4">
                <div className="w-10 h-10 bg-[#004348] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiOutlineClock className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Time
                  </p>
                  <p className="text-sm font-semibold text-gray-800 break-words">
                    {formatTime(event.time)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#f0f9f9] rounded-xl p-4">
                <div className="w-10 h-10 bg-[#004348] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiOutlineUserGroup className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Guest / Capacity
                  </p>
                  <p className="text-sm font-semibold text-gray-800 break-words">
                    {event.guests || "Open to Everyone"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#f0f9f9] rounded-xl p-4">
                <div className="w-10 h-10 bg-[#004348] rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiOutlineCurrencyDollar className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Fee
                  </p>
                  <p className="text-sm font-semibold text-gray-800 break-words">
                    {event.fee || "Free Admission"}
                  </p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About This Event
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line break-words overflow-wrap-anywhere">
                {event.description ||
                  "More details about this event will be announced soon. Stay tuned for updates!"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Sticky Footer ── */}
        <div className="flex-shrink-0 border-t border-gray-100 bg-white px-6 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-500">Registration Fee</p>
              <p className="text-2xl font-bold text-[#004348]">
                {event.fee || "Free"}
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {event.register_url ? (
                <a
                  href={event.register_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#004348] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#005a5f] transition-colors"
                >
                  Register Now
                  <HiArrowTopRightOnSquare className="w-4 h-4" />
                </a>
              ) : (
                <button
                  disabled
                  className="flex-1 sm:flex-none bg-gray-200 text-gray-400 px-6 py-2.5 rounded-xl text-sm font-medium cursor-not-allowed"
                  title="Registration coming soon"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────
const Featured = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
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

  const openModal = useCallback((event: UpcomingEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 200);
  }, []);

  if (isLoading) {
    return (
      <section className="bg-[#f9fafb] text-gray-800 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#004348]" />
        </div>
      </section>
    );
  }

  if (events.length === 0) return null;

  const featuredEvents = events.filter((e) => e.is_featured);
  const regularEvents = events.filter((e) => !e.is_featured);

  return (
    <>
      <section className="bg-[#f9fafb] text-gray-800 py-10 overflow-hidden">
        {/* ═══ FEATURED EVENTS ═══ */}
        {featuredEvents.length > 0 && (
          <>
            <header className="text-center mb-12 px-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#004348]">
                Upcoming Events
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience our most anticipated gatherings where creativity,
                learning, and professional connections come alive.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 mb-16">
              {featuredEvents.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                >
                  {/* ✅ Featured: aspect-[4/3] — lebih besar */}
                  <div
                    className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    {item.image_url ? (
                      <>
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#004348] to-[#006d75] flex items-center justify-center">
                        <HiOutlineCalendar className="w-12 h-12 text-white/30" />
                      </div>
                    )}

                    <div className="absolute top-4 inset-x-0 flex justify-between px-4">
                      <span className="bg-[#3998ff] text-white text-sm font-medium px-3 py-1 rounded-lg shadow-md">
                        {item.category}
                      </span>
                      <span className="bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-lg shadow-md">
                        ⭐ Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-5">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">
                        {item.description || "Join us for this exciting event!"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <HiOutlineCalendar className="text-[#004348] w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">
                          {formatDate(item.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlineClock className="text-[#004348] w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">
                          {formatTime(item.time)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiOutlineUserGroup className="text-[#004348] w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium truncate">
                          {item.guests || "Open"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
                      <h3 className="text-2xl font-semibold text-[#004348]">
                        {item.fee || "Free"}
                      </h3>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => openModal(item)}
                          className="flex-1 sm:flex-none border-2 border-[#004348] text-[#004348] px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#004348] hover:text-white transition-all duration-200"
                        >
                          Learn More
                        </button>
                        {item.register_url ? (
                          <a
                            href={item.register_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#004348] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#005a5f] transition-colors"
                          >
                            Register
                            <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="flex-1 sm:flex-none bg-gray-100 text-gray-400 px-5 py-2 rounded-xl text-sm font-medium cursor-not-allowed"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ═══ REGULAR EVENTS ═══ */}
        {regularEvents.length > 0 && (
          <>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
              {regularEvents.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-[0_3px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]"
                >
                  {/* ✅ Regular: aspect-[3/2] — bigger than 16:9 */}
                  <div
                    className="relative w-full aspect-[3/2] overflow-hidden cursor-pointer"
                    onClick={() => openModal(item)}
                  >
                    {item.image_url ? (
                      <>
                        <Image
                          src={item.image_url}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          quality={90}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#004348] to-[#006d75] flex items-center justify-center">
                        <HiOutlineCalendar className="w-10 h-10 text-white/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#3998ff] text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {item.description || "Join us for this exciting event!"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 text-gray-600 text-sm">
                      <div className="flex items-center gap-1.5">
                        <HiOutlineCalendar className="text-[#004348] w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HiOutlineClock className="text-[#004348] w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">
                          {formatTime(item.time)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
                      <span className="text-lg font-semibold text-[#004348]">
                        {item.fee || "Free"}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(item)}
                          className="flex-1 border-2 border-[#004348] text-[#004348] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#004348] hover:text-white transition-all duration-200"
                        >
                          Learn More
                        </button>
                        {item.register_url ? (
                          <a
                            href={item.register_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#004348] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#005a5f] transition-colors"
                          >
                            Register
                            <HiArrowTopRightOnSquare className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="flex-1 bg-gray-100 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium cursor-not-allowed"
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Featured;
