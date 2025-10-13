import React from 'react'

const Partnership = () => {

  const cards_icon = ["icon_1", "icon_2", "icon_3", "icon_4", "icon_5", "icon_6"];
  const cards_title = ["Education", "Health", "Culture", "Art", "Science", "Technology"];
  const marquee_logo = ['logo_1', 'logo_2', 'logo_3', 'logo_4', 'logo_5', 'logo_6'];


  return (
    <div className=" p-4   border border-black ">
      <div className="w-full max-w-7xl mx-auto space-y-5">
        <div className="border border-black space-y-2">
          <h1 className="md:text-6xl text-4xl">
            Building Capacity and Vibrant Communities
          </h1>
          <p className="md:text-4xl text-2xl">
            We deliver social value across 6 main pillars
          </p>
        </div>

        {/* Card body */}
        <div className="">
          {/* start */}
          <div className="border border-black grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4">
            {cards_icon.map((item, index) => (
              <div
                key={index}
                className="border border-black flex flex-row gap-4"
              >
                <div className="p-12 border border-black">
                  <i>{item}</i>
                </div>
                <div className="flex justify-left items-center border border-black px-4 w-full">
                  <p className="md:text-xl text-lg">{cards_title[index]}</p>
                </div>
              </div>
            ))}
          </div>
          {/* end */}
        </div>

        {/* text content */}

        <div>
          <p className='text-2xl'>
            We continue building on our efforts over the last decade to better
            deliver societal value for Malaysians, ensuring greater inclusivity
            and equality via our internal activities and related entities below:
          </p>
        </div>
      </div>

      {/* marquee content logo partnership */}

      <div className="border border-black p-4 md:mt-5 mt-4 flex flex-row justify-between gap-4  overflow-hidden">
        {marquee_logo.map((item, index) => (
          <div key={index} className="border border-black p-16 flex flex-row gap-4">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partnership
