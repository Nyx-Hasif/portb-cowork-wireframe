"use client";
import React, { useState } from "react";
import { images } from "@/assets/asset";

const CategoryYears = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="border border-black">
      <div className="p-4 space-y-4">
        {/* Years Category Button */}
        <div className="border border-black w-full max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2 justify-center p-4">
          {/* Button "All" */}
          <button
            onClick={() => setCategory("All")}
            className={`border p-4 text-xl ${
              category === "All" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            All
          </button>

          {/* Button tahun */}
          {images.map((yearGroup) => (
            <button
              key={yearGroup.year}
              onClick={() => setCategory(yearGroup.year)}
              className={`border p-4 text-xl ${
                category === yearGroup.year
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {yearGroup.year}
            </button>
          ))}
        </div>

        {/* GRID CARDS - RENDER TERUS DARI `images` */}
        <div className="border border-black w-full max-w-[100rem] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {images.map(
            (yearGroup) =>
              (category === "All" || category === yearGroup.year) &&
              yearGroup.items.map((item) => (
                <div
                  key={`${yearGroup.year}_${item.id}`} // ✅ KEY UNIK!
                  className="border h-40 flex flex-col justify-center items-center"
                >
                  <span>{item.image}</span>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryYears;
