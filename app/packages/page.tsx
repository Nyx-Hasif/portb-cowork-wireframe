import React from "react";
import Hero from "../../components/Hero";
import PrevEvent from "./components/PrevEvent";
import Featured from "./components/Featured";
import VirtualAdress from "./components/VirtualAdress";
import BillingAddress from "./components/BillingAddress";
import Membership from "./components/Membership";
import Amenities from "../amenities/components/Amenities";
import CTA from "../../components/CTA";

const PackagesPage = () => {
  return (
    <div>
      <Hero title="Packages Option" imagePath={"/images/hero.png"} />
      <PrevEvent />
      <Featured />
      <VirtualAdress />
      <BillingAddress />
      <Membership />
      <Amenities />
      <CTA
        title="Discover the albums of coworking at PortB"
      />
    </div>
  );
};

export default PackagesPage;
