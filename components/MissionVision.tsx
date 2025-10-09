import React from 'react'

const MissionVision = () => {
  return (
    <div className="p-4 border border-black flex flex-col items-center">
      <div className="w-full max-w-7xl space-y-5">
        {/* our mission content */}
        <div className="border border-black flex flex-row gap-4 ">
          <div className="border border-black md:min-w-[200px] min-w-[100px]  md:h-[400px] ">
            Pic_1
          </div>

          <div className="border border-black md:space-y-12 space-y-6 md:p-4 p-2">
            <div className="md:text-7xl text-5xl">
              <h1>OUR</h1>
              <h1>MISSION</h1>
            </div>
            <p className="text-2xl ">
              To transform the way people in Kota Bharu work and grow by turning
              ordinary space into a space that works for you.
            </p>
          </div>
        </div>
        {/* Divider - Same width as content */}
        <div className="h-2 border-t-5 border-black "></div>

        {/* our Vision content */}
        <div className="border border-black flex flex-row gap-4 ">
          <div className="border border-black md:min-w-[200px] min-w-[100px]  md:h-[400px] ">
            Pic_2
          </div>

          <div className="border border-black md:space-y-12 space-y-6 md:p-4 p-2">
            <div className="md:text-7xl text-5xl">
              <h1>OUR</h1>
              <h1>VISION</h1>
            </div>
            <p className="text-2xl ">
              To create an inspiring workspace where entrepreneurs, freelancers,
              and remote workers can thrive, collaborate, and build meaningful
              connections that drive innovation and success.
            </p>
          </div>
        </div>
        {/* Divider - Same width as content */}
        <div className="h-2 border-t-5 border-black "></div>

        {/* our Vision content */}
        <div className="border border-black flex flex-row gap-4 ">
          <div className="border border-black md:min-w-[200px] min-w-[100px]  md:h-[400px] ">
            Pic_3
          </div>

          <div className="border border-black md:space-y-12 space-y-6 md:p-4 p-2">
            <div className="md:text-7xl text-5xl">
              <h1>OUR</h1>
              <h1>VALUES</h1>
            </div>
            <p className="text-2xl ">
              Offering adaptable spaces and solutions that grow with your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionVision
