import React from 'react'

const Visit = () => {
  return (
    <div className='p-4'>
      <div className="flex flex-col md:flex-row gap-4 md:w-full md:max-w-7xl mx-auto py-4">
        <div className="border border-black md:w-1/2 space-y-3 md:p-8 p-4">
          <h1 className='font-bold md:text-4xl text-2xl'>Visit PortB Today</h1>
          <p className='text-lg'>
            Ready to experience exceptional workplace services at PortB? We
            invite you to visit our place conveniently located nearest mall
            region.Our friendly and dedicated team is ready to provide you with
            the highest standard of care
          </p>
          <button className='bg-green-600 text-white px-4 py-2 rounded-2xl cursor-pointer'>View video</button>
        </div>
        <div className="border border-black md:w-1/2 flex justify-center items-center ">
            <p>picture</p>
        </div>
      </div>
    </div>
  );
}

export default Visit
