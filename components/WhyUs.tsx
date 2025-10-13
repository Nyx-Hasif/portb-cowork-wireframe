import React from "react";

const WhyUs = () => {
  const cards = [
    {
      id: 1,
      icon: "👥",
      text: "Putting our community needs and well-being above all else",
      category: "Community",
    },
    {
      id: 2,
      icon: "🤝",
      text: "Working together to achieve common goals and drive innovation",
      category: "Collaboration",
    },
    {
      id: 3,
      icon: "🌐",
      text: "Building networks that open doors to new opportunities",
      category: "Connection",
    },
    {
      id: 4,
      icon: "🎉",
      text: "Creating experiences that inspire learning and growth",
      category: "Event",
    },
  ];

  return (
    <div className="p-4 border border-black ">
      <div className=" w-full max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 border border-black md:p-6 p-4 gap-6 md:min-h-[70vh] ">
        {/* intro content */}
        <div className=" md:space-y-10 space-y-3 flex flex-col justify-center border border-black ">
          <div className="border border-black ">
            <h1 className="font-bold md:text-7xl text-5xl text-center ">
              Why Choose PortB
            </h1>
          </div>
          <div className="border border-black md:text-4xl text-2xl space-y-4 md:space-x-6">
            <p>
              At Port B, we dont just care about the tables, chairs, or Wi-Fi.
            </p>
            <p>
              We care about the people who step into our space their stories,
              their goals, their struggles, and their growth.
            </p>
          </div>
        </div>

        {/* cards content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card  */}
          {cards.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md bg-green-600 text-white flex flex-col justify-between"
            >
              {/* icon */}
              <div className="">
                <i className="md:text-4xl ">{item.icon}</i>
              </div>

              {/* content container */}
              <div>
                {/* text */}
                <p className="font-medium md:text-3xl text-2xl">{item.text}</p>
                {/* divider */}
                <div className="border-b border-white my-2"></div>
                {/* category */}
                <p className="font-bold md:text-3xl text-2xl">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
