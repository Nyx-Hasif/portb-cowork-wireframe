import { assets } from "@/assets/asset";
import Carousel from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import {
  HiLightBulb,
  HiOutlineRocketLaunch,
  HiOutlineUserGroup,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

const PrevEvent = () => {
  const cards = [
    {
      id: 1,
      icon: <HiOutlineUserGroup className="w-8 h-8 text-[#004348]" />,
      title: "Training Programs & Skill Development",
      img: assets.codekids,
      description:
        "Transform your space into a dynamic learning hub for professional development and interactive workshops. Our rooms are equipped to inspire engagement and growth.",
    },
    {
      id: 2,
      icon: <HiOutlineRocketLaunch className="w-8 h-8 text-[#004348]" />,
      title: "Recruitment & Candidate Interviews",
      img: assets.recruit,
      description:
        "Leave a lasting impression with interviews and recruitment sessions in a polished, modern setting designed to highlight your brand professionalism.",
    },
    {
      id: 3,
      icon: <HiLightBulb className="w-8 h-8 text-[#004348]" />,
      title: "Digital Events & Online Conferences",
      img: assets.digital_event,
      description:
        "Host seamless virtual or hybrid events using top-tier conferencing technology. Connect participants from across the world effortlessly and dynamically.",
    },
    {
      id: 4,
      icon: (
        <HiOutlinePresentationChartLine className="w-8 h-8 text-[#004348]" />
      ),
      title: "Business Pitches & Client Showcases",
      img: assets.meeting_pitch,
      description:
        "Deliver compelling presentations that captivate clients and investors. Designed for clarity, focus, and premium professional impact.",
    },
  ];

  return (
    <section className="bg-[#f9fafb] text-gray-800 py-10">
      {/* Hero */}
      <header className="text-center space-y-4 lg:mb-14">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#004348]">
          Previous and Upcoming Events
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover how our multifunctional conference spaces bring every idea,
          meeting, and collaboration to life through thoughtful design.
        </p>
      </header>

      {/* Mobile & Tablet: Carousel */}
      <div className="block lg:hidden relative w-full py-12">
        <Carousel cards={cards} />
      </div>

      {/* Desktop: Grid 2x2 */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-4">
        {cards.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl shadow-[0_3px_15px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-300 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="relative w-full h-72 overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="uppercase tracking-wide text-sm text-[#004348] font-medium">
                  Professional Event
                </span>
              </div>
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing section */}
      <footer className="lg:mt-16 text-center space-y-6">
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
