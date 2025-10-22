import React from "react";
import Hero from "../../components/Hero";
import CTA from "../../components/CTA";
import EpicCarousel from "../gallery/components/EpicCarousel";
import CategoryYears from "../gallery/components/CategoryYears";

const CommunityPage = () => {
  return (
    <div>
      <Hero title="Gallery" imagePath={"/images/hero.png"} />
      <EpicCarousel />
      <CategoryYears />
      <CTA title="Get in touch with us" imagePath={"/images/hero.png"} />
    </div>
  );
};

export default CommunityPage;
