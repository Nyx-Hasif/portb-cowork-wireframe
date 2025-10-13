import React from "react";

const Membership = () => {
  return (
    <div className="min-h-screen py-4">
      <div className="border border-black w-full max-w-7xl mx-auto p-4 space-y-4">
        <div className="border border-black p-4 text-center">
          <h1 className="text-4xl font-medium">Membership</h1>
          <p>
            Enjoy exclusive discounted rates for desks, rooms, and events based
            on your membership level.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 ">
          {/* card_1*/}
          <div className="md:col-span-2 border border-black w-full max-w-2xl   ">
            {/* official address card */}
            <div className="border border-black">
              {/* add-ons title */}
              <div className="border border-black flex flex-row justify-between items-center px-12 p-4">
                <h1 className="text-2xl font-medium">Basic Member</h1>
                <div className="">
                  <p className="text-lg text-center border border-black px-2 py-1 rounded-2xl bg-black text-white font-bold">
                    % 10% OFF
                  </p>
                </div>
              </div>

              <div className="px-12 py-2 text-xl">
                <p>Registered address + mail pickup</p>
              </div>
            </div>

            {/* price */}
            <div className="border border-black text-center p-6 flex flex-row justify-center items-end">
              <h1 className="md:text-6xl text-4xl font-medium">RM 29</h1>
              <p className="text-lg">/month</p>
            </div>

            {/* container price lists */}
            <div>
              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>

              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>

              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>
            </div>

            {/* button */}
            <div className=" md:p-5 p-2 flex flex-row justify-center">
              <button className="border border-black py-2 px-4 w-[80%]">
                Choose Basic
              </button>
            </div>
          </div>

          {/* Card_2*/}
          <div className="md:col-span-2 border border-black w-full max-w-2xl   ">
            {/* official address card */}
            <div className="border border-black">
              {/* add-ons title */}
              <div className="border border-black flex flex-row justify-between items-center px-12 p-4">
                <h1 className="text-2xl font-medium">Premiun Member</h1>
                <div className="">
                  <p className="text-lg text-center border border-black px-2 py-1 rounded-2xl bg-black text-white font-bold">
                    % 25% OFF
                  </p>
                </div>
              </div>

              <div className="px-12 py-2 text-xl">
                <p>Registered address + mail pickup</p>
              </div>
            </div>

            {/* price */}
            <div className="border border-black text-center p-6 flex flex-row justify-center items-end">
              <h1 className="md:text-6xl text-4xl font-medium">RM 59</h1>
              <p className="text-lg">/month</p>
            </div>

            {/* container price lists */}
            <div>
              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>

              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>

              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>
            </div>

            {/* button */}
            <div className=" md:p-5 p-2 flex flex-row justify-center">
              <button className="border border-black py-2 px-4 w-[80%]">
                Choose Premiun
              </button>
            </div>
          </div>

          {/* Card_3*/}
          <div className="md:col-start-2 md:col-span-2 col-start-1 border border-black w-full max-w-2xl   ">
            {/* official address card */}
            <div className="border border-black">
              {/* add-ons title */}
              <div className="border border-black flex flex-row justify-between items-center px-12 p-4">
                <h1 className="text-2xl font-medium">Elite Member</h1>
                <div className="">
                  <p className="text-lg text-center border border-black px-2 py-1 rounded-2xl bg-black text-white font-bold">
                    % 40% OFF
                  </p>
                </div>
              </div>

              <div className="px-12 py-2 text-xl">
                <p>Registered address + mail pickup</p>
              </div>
            </div>

            {/* price */}
            <div className="border border-black text-center p-6 flex flex-row justify-center items-end">
              <h1 className="md:text-6xl text-4xl font-medium">RM 99</h1>
              <p className="text-lg">/month</p>
            </div>

            {/* container price lists */}
            <div>
              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>

              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>

              <div className="border border-black px-12 py-4 text-xl flex flex-row justify-between">
                {/* category list */}
                <div className="flex flex-row gap-2 ">
                  <i>✅</i>
                  <p>Official business address</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  <p>RM22.50</p>
                </div>
              </div>
            </div>

            {/* button */}
            <div className=" md:p-5 p-2 flex flex-row justify-center">
              <button className="border border-black py-2 px-4 w-[80%]">
                Choose Basic
              </button>
            </div>
          </div>
        </div>

        {/* text_container */}
        <div className="text-center">
          <p>
            Need custom billing or multiple addresses? Contact us for bundle
            pricing.
          </p>
        </div>

        {/* buttons */}
        <div className="flex md:flex-row flex-col gap-4 justify-center ">
            <div className="flex flex-row gap-2 border border-black py-2 px-4">
                <i>✅</i>
                <button>helloportb@gmail.com</button>
            </div>
            <div className="flex flex-row gap-2 border border-black py-2 px-4">
                <i>✅</i>
                <button>011-XXXXXXXX</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Membership;
