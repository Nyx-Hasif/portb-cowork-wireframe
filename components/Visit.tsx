import React from 'react'

const Visit = () => {
  return (
    <div className=' p-4'>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:w-full md:max-w-[100rem] mx-auto py-4 border border-black md:min-h-[70vh]">
        {/* col_1 */}
        {/* use order-1 or 2 to change the position */}
        <div className="border border-black space-y-12 md:p-8 p-4 my-auto order-2 md:order-1">
          <h1 className='font-bold md:text-6xl text-4xl'>Visit PortB Today</h1>
          <p className='md:text-4xl text-xl'>
            Ready to experience exceptional workplace services at PortB? We
            invite you to visit our place conveniently located nearest mall
            region.Our friendly and dedicated team is ready to provide you with
            the highest standard of care
          </p>
          <button className='bg-green-600 text-white px-6 py-4 rounded-2xl md:text-3xl text-xl font-medium cursor-pointer'>View video</button>
        </div>

        {/* col_2 */}
        <div className="border border-black flex justify-center items-center h-64 md:h-auto order-1 md:order-2 ">
            <p>picture</p>
        </div>
        {/* end */}
      </div>
    </div>
  );
}

export default Visit
