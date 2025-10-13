"use client";
import React, { useEffect, useRef, useState } from "react";
import { cards } from "@/data/pricingData";
import type { Plan } from "@/data/pricingData";

const PricingTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Plan>("1 Hour"); // default
  const [activePlan, setActivePlan] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("daily");
  const dropdownRef = useRef<HTMLDivElement>(null); // ref for the  dropdown

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: Plan) => {
    setSelected(value); // value is parameter [1 hour is the value] save in selected (updated)
    setActivePlan("daily"); // ✅ dropdown = daily
    setIsOpen(false); // close the dropdown
  };

  const handleClickButton = (
    period: Plan,
    planType: "weekly" | "monthly" | "yearly"
  ) => {
    setSelected(period); //Weekly, Monthly, Yearly
    setActivePlan(planType);
  };

  // close the dropdown when click outside of it or anywhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // tutup dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      {/* Parent_container */}
      <div className="grid grid-cols-1 gap-8 w-full md:max-w-[100rem] mx-auto border-black md:py-8 p-4">
        {/* container all button */}
        <div className="flex md:flex-row flex-col gap-4 border border-black  ">
          {/* container button daily + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleButton}
              className={`px-4 py-2 border border-black rounded-lg font-medium w-full  transition-all duration-200 ease-in-out
    ${
      activePlan === "daily"
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`}
            >
              Daily
            </button>
            {/* dropdown for daily button */}
            {isOpen && (
              <div className="grid grid-cols-[1fr] border border-black absolute top-full  z-10 w-full bg-white text-black  ">
                <button
                  onClick={() => handleOptionClick("1 Hour")}
                  className="hover:bg-black hover:text-white duration 500 transition-all ease-in-out cursor-pointer"
                >
                  1 Hour
                </button>
                <button
                  onClick={() => handleOptionClick("4 Hour")}
                  className="hover:bg-black hover:text-white duration 500 transition-all ease-in-out cursor-pointer"
                >
                  4 Hour
                </button>
                <button
                  onClick={() => handleOptionClick("8 Hour")}
                  className="hover:bg-black hover:text-white duration 500 transition-all ease-in-out cursor-pointer"
                >
                  8 Hour
                </button>
              </div>
            )}
          </div>
          {/* button weekly */}
          <button
            onClick={() => handleClickButton("Weekly", "weekly")}
            className={`px-4 py-2 border border-black rounded-lg font-medium  transition-all duration-200 ease-in-out
    ${
      activePlan === "weekly"
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`}
          >
            Weekly
          </button>
          {/* button monthly */}
          <button
            onClick={() => handleClickButton("Monthly", "monthly")}
            className={`px-4 py-2 border border-black rounded-lg font-medium  transition-all duration-200 ease-in-out
    ${
      activePlan === "monthly"
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`}
          >
            Monthly
          </button>
          {/* button yearly */}
          <button
            onClick={() => handleClickButton("Yearly", "yearly")}
            className={`px-4 py-2 border border-black rounded-lg font-medium  transition-all duration-200 ease-in-out
    ${
      activePlan === "yearly"
        ? "bg-black text-white"
        : "bg-white text-black hover:bg-gray-100"
    }`}
          >
            Yearly
          </button>
        </div>

        {/* Card_container */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {cards.map((item, index) => {
            let colClass = "md:col-span-2"; // default untuk card 1,2,3

            if (index === 3) {
              // Card ke-4 (index 3): start dari column 2, span 2
              colClass = "md:col-start-2 md:col-span-2";
            } else if (index === 4) {
              // Card ke-5 (index 4): span 2 (auto center dalam 6-col)
              colClass = "md:col-span-2";
            }

            return (
              <div
                key={item.id} // ✅ lebih baik guna item.id
                className={`border border-black space-y-3 w-full p-4 md:p-8 ${colClass}`}
              >
                {/* gambar */}
                <div className="border border-black">
                  <div className="h-64 flex justify-center items-center">
                    <p>{item.image}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* text content */}
                  <div>
                    <h1 className="md:text-4xl text-2xl font-bold">
                      {item.category}
                    </h1>
                    <p className="text-xl">{item.description}</p>
                  </div>

                  {/* packages_list */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xl">
                    {item.list.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex flex-row gap-2 border border-black"
                      >
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* price */}
                <div className="border border-black flex justify-center items-center h-25 md:text-4xl text-2xl font-bold">
                  {item.pricing[selected]}
                </div>

                {/* button */}
                <div className="border border-black flex justify-center md:text-2xl text-xl py-2">
                  <button>Book now</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* end */}
      </div>
    </div>
  );
};

export default PricingTable;
