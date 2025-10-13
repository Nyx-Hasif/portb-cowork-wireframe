"use client";
import React, { useState } from "react";

const AllEvents = () => {
  const [category, setCategory] = useState("All");

  const cards = [
    {
      id: 1,
      image: "img_1",
      category: "Networking",
      title: " Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
    },
    {
      id: 2,
      image: "img_2",
      category: "Panel",
      title: " Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
    },
    {
      id: 3,
      image: "img_3",
      category: "Workshop",
      title: " Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
    },
    {
      id: 4,
      image: "img_4",
      category: "Social",
      title: " Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
    },
    {
      id: 5,
      image: "img_3",
      category: "Workshop",
      title: " Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
    },
    {
      id: 6,
      image: "img_4",
      category: "Social",
      title: " Startup Pitch Night",
      description:
        "Present your startup idea to a panel of investors and get valuable feedback from the community.",
    },
  ];

  const filteredCards =
    category === "All"
      ? cards
      : cards.filter((card) => card.category === category);

  return (
    <div className="">
      {/* all events content */}
      <div className=" border border-black p-4 ">
        {/* title and category button */}
        <div className="border border-black w-full max-w-[100rem] mx-auto flex lg:flex-row flex-col justify-between md:items-center md:px-8 py-4 gap-4 ">
          <h1 className="md:text-6xl text-4xl font-medium">All Events</h1>
          {/* category button */}
          <div className="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-5 gap-2">
            {[
              { label: "All", value: "All" },
              { label: "Networking", value: "Networking" },
              { label: "Workshop", value: "Workshop" },
              { label: "Social", value: "Social" },
              { label: "Panel", value: "Panel" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setCategory(item.value)}
                className={`p-4 rounded-xl text-xl md:text-2xl font-medium transition-colors
          ${
            category === item.value
              ? "bg-black text-white"
              : "bg-white text-black border border-black hover:bg-gray-100"
          }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid for cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[100rem] mx-auto gap-8 py-4">
          {filteredCards.map((card) => (
            <div key={card.id} className=" border border-black">
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>{card.image}</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl text-xl">
                    <p>{card.category}</p>
                  </div>
                </div>
              </div>

              <div className="md:p-8 p-4 space-y-8">
                <div className="space-y-4">
                  <h2 className="md:text-4xl text-2xl">{card.title}</h2>
                  <p className="md:text-2xl text-xl">{card.description}</p>
                </div>

                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-2xl font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
