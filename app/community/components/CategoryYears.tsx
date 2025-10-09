import React from 'react'

const CategoryYears = () => {
  return (
    <div className='bg-white border border-black'>
        <div className='p-4 space-y-4'>          
             {/* Years Category Button */}
            <div className='border border-black w-full max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2 justify-center p-4'>
                <button className='border border-black md:py-2 md:px-6 p-4 text-xl'>All</button>
                <button className='border border-black md:py-2 md:px-6 p-4 text-xl'>2022</button>
                <button className='border border-black md:py-2 md:px-6 p-4 text-xl'>2022</button>
                <button className='border border-black md:py-2 md:px-6 p-4 text-xl'>2022</button>
                <button className='border border-black md:py-2 md:px-6 p-4 text-xl'>2022</button>
                <button className='border border-black md:py-2 md:px-6 p-4 text-xl'>2022</button>
                
    
            </div>

            {/* Cards_catergory by years */}

            {/* GRID CARDS */}
            <div className='border border-black  grid grid-cols-1 w-full lg:max-w-[120rem] mx-auto  md:grid-cols-3 lg:grid-cols-5 gap-4 p-4'>

                {/* CARD */}
                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>

                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>

                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>
                
                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>
                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>

                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>

                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>

                <div className='border border-black h-70 flex flex-col justify-center items-center'>
                    <span>Image</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CategoryYears
