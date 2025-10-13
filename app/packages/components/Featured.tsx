import React from 'react'

const Featured = () => {

  const cards = [
    {
      id: 1,
      image: "img_1",
      category: "Networking",
      feature: "Featured",
      title: "Startup Pitch Night",
      description: "Present your startup idea to a panel of investors and get valuable feedback from the community.",
      fee:"Free",
    },
    {
      id: 2,
      image: "img_2",
      category: "Networking",
      feature: "Featured",
      title: "Startup Pitch Night",
      description: "Present your startup idea to a panel of investors and get valuable feedback from the community.",
      fee:"Free",
    },

  ];

  return (
    <div className="">
      <div className=" border border-black p-4 md:space-y-4">
        {/* title */}
        <div className="border border-black  text-center">
          <h1 className='md:text-6xl text-3xl font-medium'>Featured Events</h1>
        </div>

        {/* Grid for cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto gap-8 py-4'>

          {cards.map((item,index)=>(
          
          <div key={index} className="w-full max-w-2xl border border-black ">
          
            <div className="relative">
              <div className="h-100 flex justify-center items-center border border-black w-full ">
                <p>{item.image}</p>
              </div>
              <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                <div className="border border-black py-2 px-4 rounded-xl">
                  <p>{item.category}</p>
                </div>
                <div className="border border-black py-2 px-4 rounded-xl">
                  <p>{item.feature}</p>
                </div>
              </div>
            </div>

            {/* content_mix */}
            <div className="md:p-8 p-4 space-y-8">
              {/* title n description content */}
              <div className="space-y-4">
                <h2 className="text-2xl">{item.title}</h2>
                <p className="text-xl">
                 {item.description}
                </p>
              </div>

              {/* timeline */}
              <div className=" grid md:grid-cols-3 grid-cols-1 gap-4 border border-black">
                <div className="flex flex-row gap-4">
                  <i>calendar_icon</i>
                  <p>Mon,Oct 15</p>
                </div>
                <div className="flex flex-row gap-4">
                  <i>clock_icon</i>
                  <p>18:00 - 20:00</p>
                </div>
                <div className="flex flex-row gap-4">
                  <i>guest_icon</i>
                  <p>45 attending</p>
                </div>
              </div>

              {/* Price and button */}
              <div className="flex flex-row justify-between items-center border border-black px-8">
                <h2 className="text-2xl">{item.fee}</h2>
                <button className="bg-green-600 text-white px-2 rounded-2xl cursor-pointer">
                  Register
                </button>
              </div>
            </div>
          </div>
          ))}

          
          {/* end */}
        </div>
      </div>
    </div>
  );
}

export default Featured
