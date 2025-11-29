import React from "react";
import Hero from "@/components/Hero";

import EpicCarousel from "../gallery/components/EpicCarousel";
import CategoryYears from "../gallery/components/CategoryYears";

const CommunityPage = () => {
  return (
    <div>
      <Hero title="Gallery" imagePath={"/images/hero.png"} />
      <EpicCarousel />
      <CategoryYears />

    </div>
  );
};

export default CommunityPage;
