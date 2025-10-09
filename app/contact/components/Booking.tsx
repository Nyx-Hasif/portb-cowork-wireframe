'use client'
import React, { useState } from 'react'

const Booking = () => {

    const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="bg-white">
      <div className="p-4 border border-black">
        {/* GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full max-w-7xl mx-auto gap-4">

          {/* form */}
          <form
            action=""
            className="border border-black h-[max-content]   space-y-4 p-4"
          >
            {/* text title */}
            <div className="border border-black md:space-y-4 space-y-2">
              <h2 className='text-2xl font-medium'>Book a Tour or Get Information</h2>
              <p className='text-xl'>
                Fill out the form below and we will get back to you within 24
                hours.
              </p>
            </div>

            {/* container inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* fullname */}
              <div className="border border-black space-x-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-black w-full"
                />
              </div>
              {/* email */}
              <div className="border border-black space-x-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-black w-full"
                />
              </div>
              {/* phone number */}
              <div className="border border-black space-x-4">
                <label htmlFor="email" className="block mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  className="border border-black w-full"
                />
              </div>
              {/* company/organization */}
              <div className="border border-black space-x-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Company/Organization
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-black w-full"
                />
              </div>
            </div>

            {/* options */}
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="border p-2"
            >
              <option value="">Select an option</option>
              <option value="option1">meeting room</option>
              <option value="option2">fixed desk</option>
              <option value="option3">common room</option>
              <option value="option3">event space</option>
            </select>

            {/* text message */}
            <div className="border border-black ">
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                placeholder="Enter your message..."
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="border border-black flex flex-col justify-center items-center gap-4">
              <p>
                Subscribe to our newsletter for updates on events and community
                news
              </p>
              <button className="border border-black py-2 px-4 w-full">
                Send Message
              </button>
            </div>
          </form>

          {/* Container for cards in Column */}
          <div className="flex flex-col gap-4">
            {/* Contact information */}
            <div className="border border-black  p-4 space-y-4">
              {/* text */}
              <div className="border border-black">
                <h1 className="text-4xl font-medium">Contact Information</h1>
              </div>

              {/* address */}
              <div className="flex flex-row ">
                <div className="border border-black p-6">
                  <i>icon</i>
                </div>
                <div className="border border-black flex flex-col justify-center px-4 w-full ">
                  <h1 className="text-2xl">Address</h1>
                  <p className="text-xl">Siti Square,Kota Bharu</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-row">
                <div className="border border-black p-6">
                  <i>icon</i>
                </div>
                <div className="border border-black flex flex-col justify-center px-4 w-full ">
                  <h1 className="text-2xl">Phone</h1>
                  <p className="text-xl">+6014 3298 981</p>
                </div>
              </div>

              {/* Email*/}
              <div className="flex flex-row">
                <div className="border border-black p-6">
                  <i>icon</i>
                </div>
                <div className="border border-black flex flex-col justify-center px-4 w-full ">
                  <h1 className="text-2xl">Email</h1>
                  <p className="text-xl">helloportb@gmail.com</p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="border border-black flex flex-col justify-center px-4 w-full">
                <h1 className="text-2xl">Hours</h1>
                <div className="text-xl grid grid-cols-[auto_1fr] gap-x-2 ">
                  <span>Reception:</span>
                  <div className="flex flex-col">
                    <span className="font-bold">Sun-Thu 9AM-5PM</span>
                    <span>Sat(by request)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* map location */}
            <div className="border border-black  h-100 flex flex-col justify-center items-center">
              <p>MAP LOCATION</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking
