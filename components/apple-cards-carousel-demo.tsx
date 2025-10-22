"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={`card-${index}`} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-[#e9eef3]">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-black font-sans"
      >
        PortB CoWorking Space
      </motion.h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                nesciunt, amet ratione repellat mollitia vitae!
              </span>{" "}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias,
              doloremque. Dignissimos eius reiciendis tenetur libero odit rerum
              suscipit officiis id, vero sunt accusantium magni enim quae in
              asperiores? Qui blanditiis provident ad, deleniti ipsa sit
              necessitatibus delectus quas molestias repellat!
            </p>
            <Image
              src="/images/hero.png"
              alt="Macbook mockup from Aceternity UI"
              height={500}
              width={500}
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Meeting Room",
    title: "title_1.",
    src: "https://images.unsplash.com/photo-1579488081757-b212dbd6ee72?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    content: <DummyContent />,
  },
  {
    category: "Fixed Desk",
    title: "title_2",
    src: "https://images.unsplash.com/photo-1705417272217-490f4511abeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    content: <DummyContent />,
  },
  {
    category: "Common Area",
    title: "title_3",
    src: "https://images.unsplash.com/photo-1613901693624-ecada26e7d11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    content: <DummyContent />,
  },
  {
    category: "Green Area",
    title: "title_4",
    src: "https://images.unsplash.com/photo-1551733186-ef2fa2d99a1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    content: <DummyContent />,
  },
  {
    category: "Space Event",
    title: "title_5",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    content: <DummyContent />,
  },
  {
    category: "Coffee Breaks",
    title: "title_6",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    content: <DummyContent />,
  },
];
