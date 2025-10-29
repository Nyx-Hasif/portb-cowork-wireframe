"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";
import { spaceStationsData } from "@/data/contentData";

export default function AppleCardsCarouselDemo() {
  const cards = spaceStationsData.map((card, index) => (
    <Card key={`card-${index}`} card={card} index={index} />
  ));

  return (
    <section id="next-section" className="w-full h-full py-10 bg-[#e9eef3]">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-black font-sans"
      >
        PortB CoWorking Space
      </motion.h2>
      <Carousel items={cards} />
    </section>
  );
}
