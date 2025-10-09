import React from 'react'

const VirtualAdress = () => {
  return (
    <div className="bg-white">
      <div className='p-4 space-y-4 border border-black'>
        {/* text content */}
        <div className='border border-black w-full max-w-7xl mx-auto  p-4 text-center md:text-6xl text-4xl font-bold'>
          <h1>Virtual Business Address</h1>
        </div>

        {/* Grid parent icon cards content */}
        <div className="text-center grid md:grid-cols-6 grid-cols-1 w-full max-w-7xl mx-auto md:gap-8 gap-2">

          {/* child icon card content_1 */}
          <div className="md:col-span-2 border border-black  h-60 flex flex-col justify-center items-center gap-4 p-4 ">
            <i className="text-6xl">icon</i>
            <p className="text-4xl">Address PortB</p>
          </div>

          {/* child icon card content_2 */}
          <div className="md:col-span-2 border border-black  h-60 flex flex-col justify-center items-center gap-4 p-4">
            <i className="text-6xl">icon</i>
            <p className="text-4xl">Receive Mail and Packages</p>
          </div>

          {/* child icon card content_3 */}
          <div className="md:col-span-2 border border-black  h-60 flex flex-col justify-center items-center gap-4 p-4">
            <i className="text-6xl">icon</i>
            <p className="text-4xl">Your Own Secure Locking Mailbox</p>
          </div>

          {/* child icon card content_4 */}
          <div className="col-start-1 md:col-start-2 md:col-span-2 border border-black  h-60 flex flex-col justify-center items-center gap-4 p-4">
            <i className="text-6xl">icon</i>
            <p className="text-4xl">Get Notified When Mail is Received</p>
          </div>

          {/* child icon card content_5 */}
          <div className="md:col-span-2 border border-black  h-60 flex flex-col justify-center items-center gap-4 p-4">
            <i className="text-6xl">icon</i>
            <p className="text-4xl">Mail Secure with 24/7 Security Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualAdress
