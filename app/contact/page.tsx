import React from "react";
import Hero from "../../components/Hero";
import CTA from "../../components/CTA";
import Booking from "./components/Booking";

const ContactPage = () => {
  return (
    <div>
      <Hero title="Get in touch with us" imagePath={"/images/hero.png"} />
      <Booking />


      <CTA
        title="Discover the opportunity of coworking at PortB"
      />
    </div>
  );
};

export default ContactPage;
