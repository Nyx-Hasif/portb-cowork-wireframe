import React from 'react'

const cards = [
  {
    id: 1,
    icon: "WIFI_ICON",
    title: "High-Speed WiFi",
    description: "Lightning-fast internet for seamless video calls",
  },
  {
    id: 2,
    icon: "Coffee_ICON",
    title: "Coffee & Refreshments",
    description: "Complimentary beverages to keep you energized",
  },
  {
    id: 3,
    icon: "WC_ICON",
    title: "Washroom & Surau",
    description: "Conveniently located within the office",
  },
  {
    id: 4,
    icon: "SNOWFLAKE_ICON",
    title: "Climate Control",
    description: "Perfect temperature for productive meetings",
  },
  {
    id: 5,
    icon: "LAPTOP_ICON",
    title: "Display Technology",
    description: "Smart screens and presentation equipment",
  },
  {
    id: 6,
    icon: "TUKUL_ICON",
    title: "Technical Support",
    description: "On-site assistance when you need it",
  },
  {
    id: 7,
    icon: "LOCATION_ICON",
    title: "Prime Location",
    description:
      "Located in the heart of the tech district with easy access to transport",
  },
  {
    id: 8,
    icon: "COMMUNITY_ICON",
    title: "Community Events",
    description: "Regular networking events, workshops, and social gatherings",
  },
  {
    id: 9,
    icon: "SECURITY_ICON",
    title: "Security Access",
    description: "CCTV + staffed hours.",
  },
];

const Amenities = () => {
  return (
    <div className=" border border-black p-4">
      {/* container */}
      <div className="border border-black space-y-4 w-full max-w-[100rem] mx-auto">
        <div className="border border-black text-center">
          <h1 className="text-4xl p-4">Whats Always Included</h1>
        </div>
        {/* GRID CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-12 gap-4 ">
          {/* CARD_1 */}
          {cards.map((item,index) => (
            <div key={index} className="border border-black text-center  p-8 space-y-4">
              <div className="h-64 border border-black flex justify-center items-center">
                <i>{item.icon}</i>
              </div>
              <h1 className="text-xl font-medium">{item.title}</h1>
              <p className="text-lg">
                {item.description}
              </p>
            </div>
          ))}

          {/* end */}
        </div>
      </div>
    </div>
  );
}

export default Amenities
