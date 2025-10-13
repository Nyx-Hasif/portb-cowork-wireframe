import React from "react";

const MissionVision = () => {
  const sections = [
    {
      id: 1,
      image: "img_1",
      title: "MISSION",
      description:
        "To transform the way people in Kota Bharu work and grow by turning ordinary space into a space that works for you.",
    },
    {
      id: 2,
      image: "img_2",
      title: "VISION",
      description:
        "To create an inspiring workspace where entrepreneurs, freelancers, and remote workers can thrive, collaborate, and build meaningful connections that drive innovation and success..",
    },
    {
      id: 3,
      image: "img_3",
      title: "VALUES",
      description:
        "Offering adaptable spaces and solutions that grow with your needs..",
    },
  ];

  return (
    <div className="p-4 border border-black flex flex-col items-center">
      <div className="w-full max-w-7xl space-y-5">
        {/*  content */}
        {sections.map((item, index) => (
          // <React.Fragment> pembungkus div dlm mapping (wajib guna nanti error sbb jsx tak detect)
          <React.Fragment key={index}>
            <div className="border border-black flex flex-row gap-4">
              <div className="border border-black md:min-w-[200px] min-w-[100px] md:h-[400px]">
                {item.image}
              </div>
              <div className="border border-black md:space-y-12 space-y-6 md:p-4 p-2 w-full">
                <div className="md:text-7xl text-5xl">
                  <h1>OUR</h1>
                  <h1>{item.title}</h1>
                </div>
                <p className="text-2xl">{item.description}</p>
              </div>
            </div>

            {index < sections.length - 1 && (
              <div className="h-2 border-t-4 border-black w-full"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
