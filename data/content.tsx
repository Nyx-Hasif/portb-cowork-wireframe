"use client";
import Image, { StaticImageData } from "next/image"; // 👈 Import StaticImageData type
import { assets } from "@/assets/asset";

// Updated type definition to accept both string URL and local imports
const ResponsiveImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
}: {
  src: string | StaticImageData; // 👈 Accept both types
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    quality={95}
    sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 800px"
    className={`w-full max-w-3xl h-auto mx-auto object-cover rounded-xl mt-6 ${className}`}
  />
);

// Meeting Room Content
export const MeetingRoomContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Professional Meeting Spaces for Every Occasion.
          </span>{" "}
          Our fully-equipped meeting rooms come with high-speed WiFi, smart
          displays, whiteboard walls, and comfortable seating for 4-12 people.
          Perfect for client presentations, team huddles, workshops, or video
          conferences. Book by the hour or full day with flexible packages.
        </p>
        <ResponsiveImage src={assets.meeting_room} alt="PortB Meeting Room" />
      </div>

     
    </>
  );
};

// Fixed Desk Content
export const FixedDeskContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Your Dedicated Workspace, Reserved Just for You.
          </span>{" "}
          Get your own permanent desk in a shared office environment. Enjoy the
          stability of a fixed workspace with lockable storage, ergonomic chair,
          and 24/7 access. Perfect for freelancers, remote workers, and small
          teams who value consistency.
        </p>
        <ResponsiveImage src={assets.fixed_desk} alt="PortB Fixed Desk" />
      </div>

    </>
  );
};

// Common Area Content
export const CommonAreaContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Flexible Spaces for Connection and Collaboration.
          </span>{" "}
          Our common areas are designed for spontaneous meetings, casual work
          sessions, and community building. From lounge seating to high-top
          tables, find the perfect spot that matches your mood and work style
          throughout the day.
        </p>
        <ResponsiveImage src={assets.common_area} alt="PortB Common Area" />
      </div>
    </>
  );
};

// Green Area Content
export const GreenAreaContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Work Surrounded by Nature.
          </span>{" "}
          Our outdoor green space offers a refreshing escape from your desk.
          Whether you need fresh air for a phone call, want to work under the
          shade of trees, or simply recharge with some sunshine – this is your
          urban oasis.
        </p>
        <ResponsiveImage src={assets.green_area} alt="PortB Green Area" />
      </div>

    </>
  );
};

// Space Event Content
export const SpaceEventContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Host Memorable Events in Style.
          </span>{" "}
          Our versatile event space accommodates 30-80 people for workshops,
          product launches, networking sessions, training seminars, and
          community gatherings. Flexible layout options with professional AV
          equipment and dedicated event support.
        </p>
        <ResponsiveImage
          src={assets.event_space_area}
          alt="PortB Event Space"
        />
      </div>

    </>
  );
};


