import { ImagesSliderDemo } from "@/components/hero-section";
import CTA from "../components/CTA";
// import Facilities from "../components/Facilities";
// import Hero from "../components/Hero";
import MissionVision from "../components/MissionVision";
import Partnership from "../components/Partnership";
import Reviews from "../components/Reviews";
// import Stats from "../components/Stats";
import Visit from "../components/Visit";
import WhyUs from "../components/WhyUs";
// import AppleCardsCarouselDemo from "@/components/space-stations";
import StatsCountDemo from "@/components/statscount-demo";
import SpacesGallery from "@/components/SpaceGallery";

export default function Home() {
  return (
    <div>
      {/* <Hero
        title="Experience exceptional coworking at PortB  where productivity meets community in the hearts of innovation"
        imagePath={"/images/hero.png"}
      /> */}
      <ImagesSliderDemo />
      {/* <AppleCardsCarouselDemo /> */}
      <SpacesGallery />
      {/* <Facilities /> */}
      <WhyUs />
      <MissionVision />

      {/* <Stats /> */}
      <StatsCountDemo />
      <Partnership />
      <Reviews />
      <Visit />
      <CTA />
    </div>
  );
}
