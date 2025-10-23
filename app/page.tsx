import { ImagesSliderDemo } from "@/components/image-slider-demo";
import CTA from "../components/CTA";
// import Facilities from "../components/Facilities";
// import Hero from "../components/Hero";
import MissionVision from "../components/MissionVision";
import Partnership from "../components/Partnership";
import Reviews from "../components/Reviews";
// import Stats from "../components/Stats";
import Visit from "../components/Visit";
import WhyUs from "../components/WhyUs";
import AppleCardsCarouselDemo from "@/components/apple-cards-carousel-demo";
import StatsCountDemo from "@/components/statscount-demo";



export default function Home() {
  return (
    <div>
      {/* <Hero
        title="Experience exceptional coworking at PortB  where productivity meets community in the hearts of innovation"
        imagePath={"/images/hero.png"}
      /> */}
      <ImagesSliderDemo />
      <AppleCardsCarouselDemo />
      {/* <Facilities /> */}
      <WhyUs />
      <Partnership />
      <MissionVision />
      <Visit />
      {/* <Stats /> */}
      <StatsCountDemo />
      <Reviews />
      
      <CTA
        title="Discover the workspace of coworking at PortB"
      />
    </div>
  );
}
