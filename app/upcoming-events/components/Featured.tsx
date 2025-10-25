import { assets } from "@/assets/asset";
import Image from "next/image";
import React from "react";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const Featured = () => {
  const cards = [
    {
      id: 1,
      image: assets.featured_event_1,
      category: "Networking",
      feature: "Featured",
      title: "Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
      fee: "Free",
      date: "Mon, Oct 15",
      time: "18:00 - 20:00",
      guests: "45 attending",
    },
    {
      id: 2,
      image: assets.featured_event_2,
      category: "Workshop",
      feature: "Featured",
      title: "Creative Collaboration",
      description:
        "Join professionals from multiple industries for this interactive event focused on teamwork and innovation.",
      fee: "$30",
      date: "Wed, Oct 18",
      time: "14:00 - 17:00",
      guests: "60 attending",
    },
  ];

  return (
    <section className="bg-[#f9fafb] text-gray-800 py-10 ">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#004348]">
          Featured Events
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Experience our most anticipated gatherings where creativity, learning,
          and professional connections come alive.
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-4">
        {cards.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Image + badges */}
            <div className="relative w-full h-72">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
                priority
              />
              <div className="absolute top-4 inset-x-0 flex justify-between px-4">
                <span className="bg-white/90 text-[#004348] text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                  {item.category}
                </span>
                <span className="bg-[#004348] text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                  {item.feature}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-8">
              {/* Title and description */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="text-[#004348] w-5 h-5" />
                  <p className="text-sm md:text-base">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="text-[#004348] w-5 h-5" />
                  <p className="text-sm md:text-base">{item.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineUserGroup className="text-[#004348] w-5 h-5" />
                  <p className="text-sm md:text-base">{item.guests}</p>
                </div>
              </div>

              {/* Price + Button */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <h3 className="text-2xl font-semibold text-[#004348]">
                  {item.fee}
                </h3>
                <button className="bg-[#004348] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#005a5f] transition-colors duration-200">
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
