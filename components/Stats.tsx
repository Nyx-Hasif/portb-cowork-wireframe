import React from 'react'

const Stats = () => {
  return (
    <div className='border border-black md:p-8 p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full max-w-7xl mx-auto border border-black rounded-2xl py-4 '>
            <div className='border-r border-black text-center p-4 space-y-2'>
                <h1 className='text-5xl font-bold'>5.0</h1>
                <p className='text-2xl'>Google Review Rating</p>
            </div>
            <div className='border-r border-black text-center p-4 space-y-2'>
                <h1 className='text-5xl font-bold'>50+</h1>
                <p className='text-2xl'>Events Hosted</p>
            </div>
            <div className='border-r border-black text-center p-4 space-y-2'>
                <h1 className='text-5xl font-bold'>5+</h1>
                <p className='text-2xl'>Years of Service</p>
            </div>
            <div className='text-center p-4 space-y-2'>
                <h1 className='text-5xl font-bold'>20+</h1>
                <p className='text-2xl'>Community Partners</p>
            </div>
           
            
            
            
      </div>
    </div>
  )
}

export default Stats
