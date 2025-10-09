import React from "react";
import Hero from "../../components/Hero";
import CTA from "../../components/CTA";
import EpicCarousel from "./components/EpicCarousel";
import CategoryYears from "./components/CategoryYears";

const CommunityPage = () => {
  return (
    <div>
      <Hero title="Gallery" imagePath={"/images/hero.jpg"} />
      <EpicCarousel />
      <CategoryYears />
      <CTA title="Get in touch with us" imagePath="/images/hero.jpg" />
    </div>
  );
};

export default CommunityPage;
