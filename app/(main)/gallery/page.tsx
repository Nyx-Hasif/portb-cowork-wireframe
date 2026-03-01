// app/(main)/gallery/page.tsx

import type { Metadata } from "next";
import React from "react";
import EpicCarousel from "./components/EpicCarousel";
import CategoryYears from "./components/CategoryYears";

// 👇 SEO METADATA — Gallery Page
export const metadata: Metadata = {
  title: "Galeri Port B Coworking Kota Bharu | Event, Workshop & Community",
  description:
    "Lihat galeri foto Port B Coworking Kota Bharu. Event, workshop, community talk, conference & class session. Ruang coworking terbaik di Kelantan untuk event dan aktiviti anda.",
  keywords: [
    "galeri coworking kota bharu",
    "foto coworking space kelantan",
    "event space kota bharu",
    "venue event kelantan",
    "workshop space kota bharu",
    "community event kelantan",
    "conference room kota bharu",
    "class session venue kelantan",
    "tempat event kota bharu",
    "ruang aktiviti kelantan",
    "coworking event gallery",
    "port b event photos",
  ],
  openGraph: {
    title: "Galeri Port B Coworking | Event & Community Photos",
    description:
      "Lihat foto event, workshop & community activities di Port B Kota Bharu.",
    url: "https://www.portbspace.com/gallery",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Galeri Port B Coworking Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeri Port B Coworking Kota Bharu",
    description: "Event, workshop & community photos",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/gallery",
  },
};

const GalleryPage = () => {
  return (
    <div>
      <EpicCarousel />
      <CategoryYears />
    </div>
  );
};

export default GalleryPage;
