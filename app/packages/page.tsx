import React from "react";
import Hero from "../../components/Hero";
import PricingTable from "./components/PricingTable";
import PrevEvent from "./components/PrevEvent";
import Featured from "./components/Featured";
import AllEvents from "./components/AllEvents";
import VirtualAdress from "./components/VirtualAdress";
import BillingAddress from "./components/BillingAddress";
import Membership from "./components/Membership";
import Amenities from "./components/Amenities";
import CTA from "../../components/CTA";

const PackagesPage = () => {
  return (
    <div>
      <Hero title="Packages Option" imagePath={"/images/hero.jpg"} />
      <PricingTable />
      <PrevEvent />
      <Featured />
      <AllEvents />
      <VirtualAdress />
      <BillingAddress />
      <Membership />
      <Amenities />
      <CTA
        title="Discover the albums of coworking at PortB"
        imagePath="/images/hero.jpg"
      />
    </div>
  );
};

export default PackagesPage;
