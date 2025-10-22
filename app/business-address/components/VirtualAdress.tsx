import React from "react";

const VirtualAdress = () => {
  // Data untuk setiap card
  const features = [
    { id: 1, title: "Address PortB" },
    { id: 2, title: "Receive Mail and Packages" },
    { id: 3, title: "Your Own Secure Locking Mailbox" },
    { id: 4, title: "Get Notified When Mail is Received" },
    { id: 5, title: "Mail Secure with 24/7 Security Access" },
  ];

  return (
    <div className="">
      <div className="p-4 space-y-4 border border-black">
        {/* Text content */}
        <div className="border border-black w-full max-w-7xl mx-auto p-4 text-center md:text-6xl text-4xl font-bold">
          <h1>Virtual Business Address</h1>
        </div>

        {/* Grid parent */}
        <div className="text-center grid md:grid-cols-6 grid-cols-1 w-full max-w-7xl mx-auto md:gap-8 gap-2">
          {features.map((feature, index) => {
            let colClass = "md:col-span-2";

            // Card ke-4 (index 3): start dari column 2
            if (index === 3) {
              colClass += " md:col-start-2";
            }

            return (
              <div
                key={feature.id}
                className={`${colClass} border border-black h-60 flex flex-col justify-center items-center gap-4 p-4`}
              >
                <i className="md:text-4xl text-2xl">icon</i>
                <p className="md:text-3xl text-xl">{feature.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualAdress;
