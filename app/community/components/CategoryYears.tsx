import React from "react";

const CategoryYears = () => {
  const images = [
    { id: 1, year: "2019", image: "img_1" },
    { id: 2, year: "2020", image: "img_2" },
    { id: 3, year: "2021", image: "img_3" },
    { id: 4, year: "2022", image: "img_4" },
    { id: 5, year: "2023", image: "img_5" },
    { id: 6, year: "2024", image: "img_6" },
    { id: 7, year: "2025", image: "img_7" },
    { id: 8, year: "2022", image: "img_8" },
    { id: 9, year: "2021", image: "img_9" },
    { id: 10, year: "2022", image: "img_10" },
    { id: 11, year: "2024", image: "img_11" },
    { id: 12, year: "2025", image: "img_12" },
  ];

  return (
    <div className="border border-black">
      <div className="p-4 space-y-4">
        {/* Years Category Button */}
        <div className="border border-black w-full max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2 justify-center p-4">
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            All
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2019
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2020
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2021
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2022
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2023
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2024
          </button>
          <button className="border border-black md:py-2 md:px-6 p-4 text-xl">
            2025
          </button>
        </div>

        {/* Cards_catergory by years */}

        {/* GRID CARDS */}
        <div className="border border-black  grid grid-cols-1 w-full lg:max-w-[120rem] mx-auto  md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {/* CARD */}
          {images.map((item, index) => (
            <div
              key={index}
              className="border border-black h-70 flex flex-col justify-center items-center"
            >
              <span>{item.image}</span>
            </div>
          ))}

          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default CategoryYears;
