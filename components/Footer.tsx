import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-200 ">
      {/* Gradient line */}
      <div className=" h-5 bg-gradient-to-r from-green-400 to-green-600"></div>

      <div className="p-4 md:py-8 ">
        {/* Footer */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-4 border border-black ">
          <div className="border border-black md:p-8 p-2 space-y-6">
            <h1 className='text-4xl'>PortB logo</h1>
            <p className='text-xl'>
              A modern coworking space where creativity meets productivity. Join
              our community of innovators and entrepreneurs.
            </p>
          </div>

          {/* quick links */}
          <div className="border border-black md:p-8 p-2 space-y-6">
            <h1 className='text-3xl'>Quick Links</h1>
            <div className="flex flex-col space-y-2 ">
              <a href="#" className='text-xl'>Packages</a>
              <a href="#" className='text-xl'>Community</a>
              <a href="#" className='text-xl'>Contact us</a>
            </div>
          </div>

          {/* contact */}
          <div className="border border-black md:p-8 p-2 space-y-6">
            <h1 className='text-3xl'>Contact</h1>
            <div className='space-y-2'>
              <p className='text-xl'>Siti Square,Kota Bharu</p>
              <p className='text-xl'>+6014 3298 981</p>
              <p className='text-xl'>helloportB@gmail.com</p>
            </div>
          </div>

          {/* newsletter */}
          <div className="border border-black md:p-8 p-2 space-y-6">
            <h1 className='text-3xl'>Stay Updated with us</h1>
            <p className='text-xl'>Subscribe to our newsletter for events and updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="border border-black w-full  bg-white"
              />
              <button className="bg-black text-white rounded-md px-2 font-medium ">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* horizontal line */}
        <div className="border border-black my-4"></div>

        {/* copyright content + social media */}
        <div className="border border-black flex flex-col md:flex-row md:justify-between items-center ">
          <p className='text-xl'>© 2025 PortB. All rights reserved.</p>
          <div className="flex space-x-1">
            <i>facebook</i>
            <i>tiktok</i>
            <i>instagram</i>
            <i>threads</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer
