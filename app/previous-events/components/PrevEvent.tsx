import React from "react";

const PrevEvent = () => {
  const cards = [
    {
      id: 1,
      icon: "dart_icon",
      title: "Training Programs & Skill Development",
      img: "IMG_1",
      description:
        "Transform your space into a dynamic learning environment forprofessional development sessions and hands-on skill workshops,complete with all necessary equipment for interactivee xperiences.",
    },
    {
      id: 2,
      icon: "rocket_icon",
      title: "Recruitment & Candidate Interviews",
      img: "IMG_2",
      description:
        "Create lasting first impressions by conducting interviews and hiring events in our sophisticated professional setting, ensuring a premium experience for potential candidates.",
    },
    {
      id: 3,
      icon: "bulb_icon",
      title: "Digital Events & Online Conferences",
      img: "IMG_3",
      description:
        "Leverage our advanced video conferencing technology to seamlessly host virtual meetings, online seminars, and hybrid events that connect global participants.",
    },
    {
      id: 4,
      icon: "brain_icon",
      title: "Business Pitches & Client Showcases",
      img: "IMG_4",
      description:
        "Make a powerful impact on clients and investors with our premium environment designed to support compelling presentations and seamless professional communication.",
    },
  ];

  return (
    <div className="">
      <div className="space-y-4">
        {/* Previous and Upcoming events */}
        <div className="border border-black py-8 space-y-4 text- bg-[#004348] text-white text-center">
          <h1 className="text-4xl font-bold ">Previous and Upcoming events</h1>
          <p className="text-2xl">
            Discover the Multiple Applications of Our Conference Spaces
          </p>
        </div>

        {/* text content title */}
        <div className="text-center border border-black w-full max-w-7xl  mx-auto py-4 ">
          <p className="text-2xl">
            Our conference facilities offer incredible flexibility and can serve
            multiple functions beyond conventional business meetings, providing
            the perfect environment for various professional activities.
          </p>
        </div>

        {/* Grid_cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl mx-auto md:pb-8  ">
          {/* card_1 */}
          {cards.map((item, index) => (
            <div key={index} className="border border-black  p-8 space-y-4 ">
              <div className="border border-black h-15 w-20 flex justify-center items-center">
                <i>{item.icon}</i>
              </div>
              <div className="border border-black">
                <h2 className="text-3xl text-center">{item.title}</h2>
              </div>
              <div className="border-3 border-green-500 md:h-40 h-30 flex justify-center items-center ">
                <p>{item.img}</p>
              </div>
              <div className="border border-black">
                <p className="text-2xl leading-[1.7]">{item.description}</p>
              </div>
            </div>
          ))}
          {/* end */}
        </div>

        {/* Previous and Upcoming events */}
        <div className="border border-black py-8 space-y-4 text- bg-[#004348] text-white text-center">
          <h1 className="text-4xl font-bold ">
            Flexible Spaces for Every Occasion
          </h1>
          <p className="text-2xl md:max-w-6xl mx-auto">
            Whether you are hosting intimate team discussions or large-scale
            presentations, our versatile meeting rooms adapt to your specific
            needs with professional-grade facilities and modern amenities.
          </p>
        </div>
        {/* end */}
      </div>
    </div>
  );
};

export default PrevEvent;
