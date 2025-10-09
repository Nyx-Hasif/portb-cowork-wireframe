import React from "react";
import Hero from "../../components/Hero";
import CTA from "../../components/CTA";
import Booking from "./components/Booking";
import Faqs from "./components/Faqs";

const ContactPage = () => {
  return (
    <div>
      <Hero title="Get in touch with us" imagePath={"/images/hero.jpg"} />
      <Booking />
      <Faqs />

      <CTA
        title="Discover the opportunity of coworking at PortB"
        imagePath="/images/hero.jpg"
      />
    </div>
  );
};

export default ContactPage;
