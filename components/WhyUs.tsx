import React from 'react'

const WhyUs = () => {
  return (
    <div className='p-4 border border-black'>
        <div className=' w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 border border-black md:p-6 p-4 gap-6'>
            {/* intro content */}
            <div className=' md:space-y-10 space-y-3 flex flex-col justify-center '>
                <div className='border border-black '>
                    <h1 className='font-bold md:text-7xl text-4xl  '>Why Choose PortB</h1>
                </div>
                <div className='border border-black text-2xl space-y-4 md:space-x-6'>
                    <p>At Port B, we dont just care about the tables, chairs, or Wi-Fi.</p>
                    <p>We care about the people who step into our space their stories, their goals, their struggles, and their growth.</p>
                </div>
            </div>

              {/* cards content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Card 1 */}
                    <div className="p-6 rounded-lg shadow-md bg-green-600 text-white">
                        <div className="mb-3">
                        <i className="text-2xl">👥</i>
                        </div>
                        <p className="font-medium">Putting our community’s needs and well-being above all else</p>
                        <div className="border-b border-white my-2"></div>
                        <p className="font-bold">Community</p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 rounded-lg shadow-md bg-gray-100">
                        <div className="mb-3">
                        <i className="text-2xl">🤝</i>
                        </div>
                        <p>Working together to achieve common goals and drive innovation</p>
                        <div className="border-b border-gray-300 my-2"></div>
                        <p className="font-bold">Collaboration</p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 rounded-lg shadow-md bg-gray-100">
                        <div className="mb-3">
                        <i className="text-2xl">🌐</i>
                        </div>
                        <p>Building networks that open doors to new opportunities</p>
                        <div className="border-b border-gray-300 my-2"></div>
                        <p className="font-bold">Connection</p>
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 rounded-lg shadow-md bg-gray-100">
                        <div className="mb-3">
                        <i className="text-2xl">🎉</i>
                        </div>
                        <p>Creating experiences that inspire learning and growth</p>
                        <div className="border-b border-gray-300 my-2"></div>
                        <p className="font-bold">Event</p>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default WhyUs
