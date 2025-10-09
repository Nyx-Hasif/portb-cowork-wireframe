import CTA from "../components/CTA";
import Facilities from "../components/Facilities";
import Hero from "../components/Hero";
import MissionVision from "../components/MissionVision";
import Partnership from "../components/Partnership";
import Reviews from "../components/Reviews";
import Stats from "../components/Stats";
import Visit from "../components/Visit";
import WhyUs from "../components/WhyUs";

export default function Home() {
  return (
    <div>
      <Hero
        title="Experience exceptional coworking at PortB  where productivity meets community in the hearts of innovation"
        imagePath={"/images/hero.png"}
      />
      <Facilities />
      <WhyUs />
      <Partnership />
      <MissionVision />
      <Visit />
      <Stats />
      <Reviews />
      <CTA
        title="Discover the workspace of coworking at PortB"
        imagePath={"/images/hero.png"}
      />
    </div>
  );
}
