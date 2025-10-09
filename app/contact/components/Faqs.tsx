import React from 'react'

const Faqs = () => {
  return (
    <div className="bg-white md:py-4">
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
          <div className="border border-black flex flex-col gap-4 justify-center items-center md:p-16 p-4 md:h-70">
            <h1 className="text-2xl font-bold">
              What is included in membership?
            </h1>
            <p className="text-xl">
              All memberships include high-speed internet, printing, coffee/tea,
              access to common areas, and community events.
            </p>
          </div>

          <div className="border border-black flex flex-col gap-4 justify-center items-center md:p-16 p-4 md:h-70">
            <h1 className="text-2xl font-bold">Can I try before I commit?</h1>
            <p className="text-xl">
              All memberships include high-speed internet, printing, coffee/tea,
              access to common areas, and community events.
            </p>
          </div>

          <div className="border border-black flex flex-col gap-4 justify-center items-center md:p-16 p-4 md:h-70">
            <h1 className="text-2xl font-bold">Do you have parking?</h1>
            <p className="text-xl">
              All memberships include high-speed internet, printing, coffee/tea,
              access to common areas, and community events.
            </p>
          </div>

          <div className="border border-black flex flex-col gap-4 justify-center items-center md:p-16 p-4 md:h-70">
            <h1 className="text-2xl font-bold">Can I book meeting rooms?</h1>
            <p className="text-xl">
              All memberships include high-speed internet, printing, coffee/tea,
              access to common areas, and community events.
            </p>
          </div>
        </div>

        {/* load more button */}
        <div className="border border-black max-w-[max-content] mx-auto py-2 px-8 rounded-4xl">
          <button className="text-xl ">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default Faqs
