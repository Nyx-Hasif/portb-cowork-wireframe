// app/(main)/page.tsx

import type { Metadata } from "next";
import { ImagesSliderDemo } from "@/components/hero-section";
import CTA from "@/components/CTA";
import MissionVision from "@/components/MissionVision";
import Partnership from "@/components/Partnership";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import WhyUs from "@/components/WhyUs";
import StatsCountDemo from "@/components/statscount-demo";
import SpacesGallery from "@/components/SpaceGallery";

// 👇 METADATA SEO — Keywords optimized untuk Kota Bharu!
export const metadata: Metadata = {
  title: "Port B Coworking Space Kota Bharu | Coworking Kelantan Terbaik",
  description:
    "Coworking space terbaik di Kota Bharu, Kelantan. Hot desk, meeting room, virtual office & space rental. Sesuai untuk freelancer, startup & remote worker. Harga berpatutan!",
  keywords: [
    "coworking space kota bharu",
    "coworking space kelantan",
    "coworking space terbaik kota bharu",
    "coworking space terbaik kelantan",
    "coworking space terbaik",
    "coworking kota bharu",
    "coworking kelantan",
    "meeting room kota bharu",
    "space rental kota bharu",
    "virtual office kelantan",
    "hot desk kota bharu",
    "event space kota bharu",
  ],
  authors: [{ name: "Port B Coworking" }],
  creator: "Port B Coworking",
  publisher: "Port B Coworking",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Port B Coworking Space Kota Bharu | Coworking Kelantan",
    description:
      "Coworking space terbaik di Kota Bharu, Kelantan. Hot desk, meeting room, virtual office & space rental.",
    url: "https://www.portbspace.com",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Port B Coworking Space Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Port B Coworking Space Kota Bharu",
    description: "Coworking space terbaik di Kota Bharu, Kelantan.",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com",
  },
};

export default function Home() {
  return (
    <div>
      <ImagesSliderDemo />
      <SpacesGallery />
      <WhyUs />
      <MissionVision />
      <StatsCountDemo />
      <Partnership />
      <Reviews />
      <Visit />
      <CTA />
    </div>
  );
}
