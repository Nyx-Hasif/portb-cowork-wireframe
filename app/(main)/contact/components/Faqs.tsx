import React from "react";

const Faqs = () => {
  const cards = [
    {
      id: 1,
      title: "What is included in membership?",
      description:
        "All memberships include high-speed internet, printing, coffee/tea, access to common areas, and community events.",
    },
    {
      id: 2,
      title: "How do I renew my membership?",
      description:
        "To renew your membership, simply visit our membership renewal page and follow the instructions provided.",
    },
    {
      id: 3,
      title: "What payment methods are accepted?",
      description:
        "We accept a wide range of payment methods, including credit cards, debit cards, and PayPal.",
    },
    {
      id: 4,
      title: "Can I cancel my membership?",
      description:
        "Yes, you can cancel your membership at any time by visiting our membership cancellation page.",
    },
  ];

  return (
    <div className=" md:py-4">
      <div className="p-4 border border-black w-full max-w-[100rem] mx-auto space-y-4 ">
        {/* text content */}
        <div className="border border-black text-center md:p-8 p-4">
          <h1 className="text-4xl font-bold">FAQs</h1>
          <p className="text-xl">
            Quick answers to common questions about our coworking space
          </p>
        </div>

        {/* faqs cards container*/}
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* card */}
          {cards.map((item, index) => (
            <div
              key={index}
              className="border border-black flex flex-col gap-4 justify-center items-center md:p-16 p-4 md:h-70"
            >
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-xl">{item.description}</p>
            </div>
          ))}

          {/* end */}
        </div>

        {/* load more button */}
        <div className="border border-black max-w-[max-content] mx-auto py-2 px-8 rounded-4xl">
          <button className="text-xl ">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
