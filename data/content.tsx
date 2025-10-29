"use client";
import Image, { StaticImageData } from "next/image"; // 👈 Import StaticImageData type
import { assets, galleries } from "@/assets/asset";

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

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Modern Tech Integration.
          </span>{" "}
          Wireless screen sharing, HD video conferencing equipment, and premium
          sound systems ensure your meetings run smoothly. Climate-controlled
          environment with natural lighting and soundproof walls for maximum
          privacy and productivity.
        </p>
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1712903911104-cf22c142c04f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1631"
          alt="Modern Meeting Technology"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Complimentary Services.
          </span>{" "}
          Enjoy free coffee, tea, and water during your booking. On-demand
          catering options available. Dedicated reception support to welcome
          your guests and handle all your meeting logistics seamlessly.
        </p>
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1562757062-4e81ece6b86f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1632"
          alt="Meeting Room Services"
        />
        <ResponsiveImage src={assets.coffee_machine} alt="Coffee Machine" />
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

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Everything You Need to Stay Productive.
          </span>{" "}
          Ultra-fast fiber internet, dual monitor setup available, personal desk
          lamp, and drawer storage for your belongings. Customize your desk
          space and make it truly yours while enjoying the energy of a
          collaborative environment.
        </p>
        <ResponsiveImage
          src={assets.fixed_desk_guests}
          alt="Fixed Desk Workspace"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Premium Perks Included.
          </span>{" "}
          Unlimited coffee, printing credits, meeting room hours, access to all
          community events, and a professional business address. Join a vibrant
          community of like-minded professionals and grow your network
          organically.
        </p>
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1666101041092-468eb2818c87?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172"
          alt="Premium Workspace Perks"
        />
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

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Inspiring Design Meets Functionality.
          </span>{" "}
          Natural light floods through floor-to-ceiling windows, plants bring
          life to every corner, and carefully curated artwork creates an
          atmosphere that sparks creativity. Free WiFi and power outlets are
          accessible everywhere.
        </p>
        <ResponsiveImage
          src={assets.common_area_light}
          alt="Common Area Natural Light"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Where Ideas Come to Life.
          </span>{" "}
          Host informal brainstorming sessions, take calls in cozy nooks, or
          simply unwind with fellow members. Our common areas foster the
          unexpected conversations that often lead to the best collaborations
          and opportunities.
        </p>
        <ResponsiveImage
          src={assets.common_area_guests}
          alt="Common Area Collaboration"
        />
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

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Wellness Meets Productivity.
          </span>{" "}
          Studies show that exposure to nature boosts creativity, reduces
          stress, and improves focus. Our green area features comfortable
          outdoor furniture, WiFi coverage, and lush landscaping designed to
          enhance your wellbeing.
        </p>
        <ResponsiveImage
          src={assets.green_area_guests}
          alt="Green Area Outdoor Workspace"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Perfect for Every Season.
          </span>{" "}
          Morning coffee on the terrace, lunch breaks with colleagues, afternoon
          reading sessions, or evening networking drinks – our green space
          adapts to your needs throughout the day and year.
        </p>
        <ResponsiveImage
          src={assets.event_session}
          alt="Green Area Event Session"
        />
        <ResponsiveImage
          src={galleries.gallery_2020_2}
          alt="Green Area Gallery"
        />
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

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Everything You Need, All in One Place.
          </span>{" "}
          High-quality projector and screen, wireless microphone system,
          livestream capabilities, customizable lighting, and high-speed
          internet. Our team handles setup and technical support so you can
          focus on your event content.
        </p>
        <ResponsiveImage
          src={assets.featured_event_1}
          alt="Event Technology Setup"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Catering and Hospitality Services.
          </span>{" "}
          Partner with our preferred caterers or bring your own. We provide
          event registration, attendee management, and post-event cleanup. Make
          your event effortless and impactful with PortB&apos;s full-service
          event hosting.
        </p>
        <ResponsiveImage
          src={assets.birthday_event}
          alt="Event Catering Services"
        />
      </div>
    </>
  );
};

// Coffee Breaks Content
export const CoffeeBreaksContent = () => {
  return (
    <>
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Fuel Your Productivity with Premium Coffee.
          </span>{" "}
          Our barista-quality coffee bar serves specialty brews, fresh pastries,
          and healthy snacks throughout the day. Whether you need a morning
          boost or an afternoon pick-me-up, we&apos;ve got you covered – all
          complimentary for members.
        </p>
        <ResponsiveImage
          src="https://images.unsplash.com/photo-1707734801620-55d09054aa9f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
          alt="Premium Coffee Bar"
        />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Surrounded by Delicious Options.
          </span>{" "}
          Located in the heart of the city, PortB is surrounded by diverse
          dining choices. Craving pizza? Authentic Italian joints are just steps
          away. Want local favorites? Chicken rice shops serve up comfort food
          at its finest. Need a quick bite? KFC and other fast-food chains are
          within walking distance – perfect for those busy workdays.
        </p>
        <ResponsiveImage src={assets.pizza} alt="Local Dining Options" />
      </div>

      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            The Heart of Community.
          </span>{" "}
          Our coffee area is where members connect, collaborate, and build
          relationships. Strike up conversations, find your next business
          partner, or simply enjoy a moment of pause in our cozy, cafe-style
          setting.
        </p>
        <ResponsiveImage
          src={assets.sogno_cafe}
          alt="Sogno Cafe Community Space"
        />
        <ResponsiveImage src={assets.sogno_menu} alt="Sogno Cafe Menu" />
        <ResponsiveImage
          src={assets.sogno_signature}
          alt="Sogno Signature Drinks"
        />
      </div>
    </>
  );
};
