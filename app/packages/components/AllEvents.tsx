import React from 'react'

const AllEvents = () => {
  return (
    <div className="bg-white">
        {/* all events content */}
        <div className=" border border-black p-4 ">

          {/* title and category button */}
          <div className="border border-black w-full max-w-7xl mx-auto flex md:flex-row flex-col justify-between md:items-center md:px-8 py-4 gap-4 ">
            <h1 className="md:text-6xl text-4xl font-medium">All Events</h1>
            <div className="flex flex-row gap-2">
              <button className="border border-black py-2 px-4 rounded-xl">
                All
              </button>
              <button className="border border-black py-2 px-4 rounded-xl">
                Networking
              </button>
              <button className="border border-black py-2 px-4 rounded-xl">
                Workshop
              </button>
              <button className="border border-black py-2 px-4 rounded-xl">
                Social
              </button>
              <button className="border border-black py-2 px-4 rounded-xl">
                Panel
              </button>
            </div>
          </div>

          {/* Grid for cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-7xl mx-auto gap-8 py-4">
            {/* parent card_container_1 */}
            <div className=" border border-black">
              {/* event imag cards_1 */}
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>img_1</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl">
                    <p>Networking</p>
                  </div>
                </div>
              </div>

              {/* content_mix */}
              <div className="md:p-8 p-4 space-y-8">
                {/* title n description content */}
                <div className="space-y-4">
                  <h2 className="text-2xl">Startup Pitch Night</h2>
                  <p className="text-xl">
                    Present your startup idea to a panel of investors and get
                    valuable feedback from the community.
                  </p>
                </div>

                {/* Price and button */}
                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-xl font-medium">
                     Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* parent card_container_2 */}
            <div className=" border border-black">
              {/* event imag cards_1 */}
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>img_1</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl">
                    <p>Social</p>
                  </div>
                </div>
              </div>

              {/* content_mix */}
              <div className="md:p-8 p-4 space-y-8">
                {/* title n description content */}
                <div className="space-y-4">
                  <h2 className="text-2xl">Startup Pitch Night</h2>
                  <p className="text-xl">
                    Present your startup idea to a panel of investors and get
                    valuable feedback from the community.
                  </p>
                </div>

                {/* Price and button */}
                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-xl font-medium">
                     Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* parent card_container_3 */}
            <div className=" border border-black">
              {/* event imag cards_1 */}
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>img_1</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl">
                    <p>Workshop</p>
                  </div>
                </div>
              </div>

              {/* content_mix */}
              <div className="md:p-8 p-4 space-y-8">
                {/* title n description content */}
                <div className="space-y-4">
                  <h2 className="text-2xl">Startup Pitch Night</h2>
                  <p className="text-xl">
                    Present your startup idea to a panel of investors and get
                    valuable feedback from the community.
                  </p>
                </div>

                {/* Price and button */}
                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-xl font-medium">
                     Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* parent card_container_4 */}
            <div className=" border border-black">
              {/* event imag cards_1 */}
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>img_1</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl">
                    <p>Panel</p>
                  </div>
                </div>
              </div>

              {/* content_mix */}
              <div className="md:p-8 p-4 space-y-8">
                {/* title n description content */}
                <div className="space-y-4">
                  <h2 className="text-2xl">Startup Pitch Night</h2>
                  <p className="text-xl">
                    Present your startup idea to a panel of investors and get
                    valuable feedback from the community.
                  </p>
                </div>

                {/* Price and button */}
                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-xl font-medium">
                     Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* parent card_container_5 */}
            <div className=" border border-black">
              {/* event imag cards_1 */}
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>img_1</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl">
                    <p>Panel</p>
                  </div>
                </div>
              </div>

              {/* content_mix */}
              <div className="md:p-8 p-4 space-y-8">
                {/* title n description content */}
                <div className="space-y-4">
                  <h2 className="text-2xl">Startup Pitch Night</h2>
                  <p className="text-xl">
                    Present your startup idea to a panel of investors and get
                    valuable feedback from the community.
                  </p>
                </div>

                {/* Price and button */}
                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-xl font-medium">
                     Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* parent card_container_6 */}
            <div className=" border border-black">
              {/* event imag cards_1 */}
              <div className="relative">
                <div className="h-100 flex justify-center items-center border border-black w-full ">
                  <p>img_1</p>
                </div>
                <div className="flex flex-row justify-between items-center border border-black absolute top-5 inset-x-0 px-4">
                  <div className="border border-black py-2 px-4 rounded-xl">
                    <p>Panel</p>
                  </div>
                </div>
              </div>

              {/* content_mix */}
              <div className="md:p-8 p-4 space-y-8">
                {/* title n description content */}
                <div className="space-y-4">
                  <h2 className="text-2xl">Startup Pitch Night</h2>
                  <p className="text-xl">
                    Present your startup idea to a panel of investors and get
                    valuable feedback from the community.
                  </p>
                </div>

                {/* Price and button */}
                <div className="flex flex-row justify-end items-center border border-black ">
                  <button className="bg-green-600 text-white py-2 px-4 rounded-2xl cursor-pointer text-xl font-medium">
                     Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default AllEvents
