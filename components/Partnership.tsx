import React from 'react'

const Partnership = () => {
  return (
    <div className=" p-4   border border-black">
      <div className="w-full max-w-7xl mx-auto space-y-5">
        <div className="border border-black space-y-2">
          <h1 className="text-4xl">
            Building Capacity and Vibrant Communities
          </h1>
          <p className="text-2xl">
            We deliver social value across 6 main pillars
          </p>
        </div>
        {/* Card body */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-4">
          {/* Card 1 */}
          <div className="border border-black flex flex-row gap-4 md:max-w-xs">
            <div className="p-12 border border-black">
              <i>icon_1</i>
            </div>
            <div className="flex justify-center items-center border border-black px-4">
              <p className="md:text-xl text-lg">Education</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-black flex flex-row gap-4 md:max-w-xs">
            <div className="p-12 border border-black">
              <i>icon_2</i>
            </div>
            <div className="flex justify-center items-center border border-black px-4">
              <p className="md:text-xl text-lg">Community Development</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-black flex flex-row gap-4 md:max-w-xs">
            <div className="p-12 border border-black">
              <i>icon_3</i>
            </div>
            <div className="flex justify-center items-center border border-black px-4">
              <p className="md:text-xl text-lg">Environment</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="border border-black flex flex-row gap-4 md:max-w-xs">
            <div className="p-12 border border-black">
              <i>icon_4</i>
            </div>
            <div className="flex justify-center items-center border border-black px-4">
              <p className="md:text-xl text-lg">Arts & Public Spaces</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="border border-black flex flex-row gap-4 md:max-w-xs">
            <div className="p-12 border border-black">
              <i>icon_5</i>
            </div>
            <div className="flex justify-center items-center border border-black px-4">
              <p className="md:text-xl text-lg">Knowledge</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="border border-black flex flex-row gap-4 md:max-w-xs">
            <div className="p-12 border border-black">
              <i>icon_6</i>
            </div>
            <div className="flex justify-center items-center border border-black px-4">
              <p className="md:text-xl text-lg">Create Support</p>
            </div>
          </div>
        </div>

        {/* text content */}

        <div>
          <p>
            We continue building on our efforts over the last decade to better
            deliver societal value for Malaysians, ensuring greater inclusivity
            and equality via our internal activities and related entities below:
          </p>
        </div>
      </div>

      {/* marquee content logo partnership */}

      <div className='border border-black p-4 md:mt-5 mt-4'>
        <div className='border border-black p-16 flex flex-row gap-4'>
          <p>logo_1</p>
          <p>logo_2</p>
          <p>logo_3</p>
          <p>logo_4</p>
          <p>logo_5....</p>
        </div>
      </div>

    </div>
  );
}

export default Partnership
