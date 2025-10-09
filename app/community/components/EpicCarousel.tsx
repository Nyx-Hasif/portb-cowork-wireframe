import React from 'react'

const EpicCarousel = () => {
  return (
    <div className='bg-white border border-black md:min-h-[80vh]'>
        
        {/* GRID */}
        <div className='grid grid-cols-1 md:grid-cols-[3fr_1.5fr] gap-4 p-4 w-full lg:max-w-[100rem] mx-auto'>

            {/* Display_1 */}
            <div className=''>
                <div className='border border-black md:h-200 h-100'>
                    big_images
                </div>
            </div>

            {/* Display_2 */}
            <div className='border border-black flex flex-col justify-between'>
                <div className='flex flex-row gap-4 items-center border border-black p-4'>
                    <span className='border border-black p-10'> img_1</span>
                    <p>Coffee Session</p>
                </div>
                <div className='flex flex-row gap-4 items-center border border-black p-4'>
                    <span className='border border-black p-10'> img_2</span>
                    <p>Event Session</p>
                </div>
                <div className='flex flex-row gap-4 items-center border border-black p-4'>
                    <span className='border border-black p-10'> img_3</span>
                    <p>Night Session</p>
                </div>
                <div className='flex flex-row gap-4 items-center border border-black p-4'>
                    <span className='border border-black p-10'> img_4</span>
                    <p>Class Session</p>
                </div>
                <div className='flex flex-row gap-4 items-center border border-black p-4'>
                    <span className='border border-black p-10'> img_5</span>
                    <p>Workshop Session</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default EpicCarousel
