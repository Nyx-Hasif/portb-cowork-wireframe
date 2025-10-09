import Image from "next/image";
import React from "react";

const Facilities = () => {
  return (
    <div className="border border-black
    ">
      <div className="mx-auto md:p-10 p-2 border-5 border-green-500 space-y-5">
        {/* intro content */}
        <div className="space-y-3 border border-black">
          <h1 className="md:text-4xl text-2xl">PortB CoWorking Space</h1>
          <p>
            We are more than just a workspace. We are a community of innovators,
            creators, and entrepreneurs who believe that great things happen
            when passionate people come together.
          </p>
        </div>
        {/* content pictures */}
          <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-black  ">
            {/* fixed desk content */}
            <div className="space-y-3 border border-black md:max-w-[400px] w-full ">
              <div className="border border-black ">
                <Image src="/images/facilities.jpg" alt="facilities" width={400} height={300}   className="bg-red-200 w-full"/>
              </div>
              <h1>Fixed Desks</h1>
              <p>Your own corner at Port B — steady, focused, and always ready when you are</p>  
            </div>
            {/* meeting room content */}
            <div className="space-y-3 border border-black md:max-w-[400px] w-full">
              <div className="border border-black  ">
                <Image src="/images/facilities.jpg" alt="facilities" width={400} height={300} className="bg-red-200 w-full"/>
              </div>
              <h1>Meeting Room</h1>
              <p>Close deals and build trust in a space that feels professional, not like a borrowed café table</p>  
            </div>
              {/* Common area content */}
            <div className="space-y-3 border border-black md:max-w-[400px] w-full">
              <div className="border border-black  ">
                <Image src="/images/facilities.jpg" alt="facilities" width={400} height={300} className="bg-red-200 w-full"/>
              </div>
              <h1>Common Area</h1>
              <p>Where ideas, conversations, and work flow together — the heart of Port B’s community</p>  
            </div>
              {/* Green area content */}
            <div className="space-y-3 border border-black md:max-w-[400px] w-full">
              <div className="border border-black  ">
                <Image src="/images/facilities.jpg" alt="facilities" width={400} height={300} className="bg-red-200 w-full"/>
              </div>
              <h1>Green Area</h1>
              <p>Because efficiency also needs balance — relax here before your next big idea.</p>  
            </div>

        </div>
      </div>
    </div>
  );
};

export default Facilities;
