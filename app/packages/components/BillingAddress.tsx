import React from 'react'

const BillingAddress = () => {
  return (
    <div className="bg-white md:p-4 border border-black">
      <div className="border border-black p-4 w-full max-w-7xl mx-auto md:space-y-6 space-y-3">
        {/* title card */}
        <div className="border border-black space-y-2 text-center">
          <h1 className="text-4xl font-medium">Billing your Address Matters</h1>
          <p className="text-2xl">
            Get your business address form as low as Rm 1 per day at Kota Bharu
          </p>
          <p className="text-2xl">
            No deposit. Cancel anytime. Annual plan saves you more.
          </p>
        </div>

        {/* grid divider */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4   ">
          {/* Card Add-Ons*/}
          <div className=" border border-black max-h-[max-content] space-y-2 py-4">
            {/* add-ons title */}
            <div className="border border-black flex flex-row justify-between items-center px-12 p-4">
              <h1 className="text-2xl font-medium">Add-Ons</h1>
              <div className="">
                <p className="text-lg border border-black p-1 rounded-2xl bg-black text-white font-bold">
                  Popular
                </p>
              </div>
            </div>

            <div className="border border-black flex flex-row justify-between px-8 py-2">
              <div className="flex flex-row gap-4">
                <i>icon_mail</i>
                <p>Mail handling</p>
              </div>
              <div>
                <p>Rm20/ month</p>
              </div>
            </div>

            <div className="border border-black flex flex-row justify-between px-8  py-2">
              <div className="flex flex-row gap-4">
                <i>icon_mail</i>
                <p>Mail handling</p>
              </div>
              <div>
                <p>Rm20/ month</p>
              </div>
            </div>

            <div className="border border-black flex flex-row justify-between px-8  py-2">
              <div className="flex flex-row gap-4">
                <i>icon_mail</i>
                <p>Mail handling</p>
              </div>
              <div>
                <p>Rm20/ month</p>
              </div>
            </div>
          </div>

          {/* Card Official Business Address*/}
          <div className="border border-black   ">
            {/* official address card */}
            <div className="border border-black">
              {/* add-ons title */}
              <div className="border border-black flex flex-row justify-between items-center px-12 p-4">
                <h1 className="text-2xl font-medium">
                  Official Business Address
                </h1>
                <div className="">
                  <p className="text-lg text-center border border-black p-1 rounded-2xl bg-black text-white font-bold">
                    Best value
                  </p>
                </div>
              </div>

              <div className="px-12 py-2 text-xl">
                <p>Registered address + mail pickup</p>
              </div>
            </div>

            {/* price */}
            <div className="border border-black text-center p-6">
              <h1 className="md:text-6xl text-4xl font-medium">RM 365</h1>
              <p className="md:ml-30 ml-35 text-xl">/ year — ~RM1/day</p>
            </div>

            <div className="border border-black px-12 py-4 text-xl space-y-2">
              {/* tick_list */}
              <div className="flex flex-row gap-2 ">
                <i>✅</i>
                <p>Official business address</p>
              </div>
              <div className="flex flex-row gap-2">
                <i>✅</i>
                <p>Mail collection (self-pickup)</p>
              </div>
              <div className="flex flex-row gap-2">
                <i>✅</i>
                <p>Dashboard & notifications</p>
              </div>
            </div>

            {/* button */}
            <div className="flex flex-row justify-between md:p-5 p-2">
              <button className="border border-black py-2 px-4">
                Get This plan
              </button>
              <button className="border border-black py-2 px-4">
                Call 011-12345678{" "}
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default BillingAddress
