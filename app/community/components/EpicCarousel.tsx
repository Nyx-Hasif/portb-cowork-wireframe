
import React from "react";

const EpicCarousel = () => {
  const cards = [
    { id: 1, image: "img_1", title: "Coffee Session" },
    { id: 2, image: "img_2", title: "Event Session" },
    { id: 3, image: "img_3", title: "Night Session" },
    { id: 4, image: "img_4", title: "Class Session" },
    { id: 5, image: "img_5", title: "Workshop Session" },
  ];

  return (
    <div className="border border-black md:min-h-[80vh]">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1.5fr] gap-4 p-4 w-full lg:max-w-[100rem] mx-auto">
        {/* Display_1 */}
        <div className="">
          <div className="border border-black md:h-200 h-100">big_images</div>
        </div>

        {/* Display_2 */}
        <div className="border border-black flex flex-col justify-between">
          {cards.map((item,index) => (
            <div key={index} className="flex flex-row gap-4 items-center border border-black p-4">
              <span className="border border-black p-10"> {item.image}</span>
              <p>{item.title}</p>
            </div>
          ))}
          {/* end */}
        </div>
      </div>
    </div>
  );
};

export default EpicCarousel;
