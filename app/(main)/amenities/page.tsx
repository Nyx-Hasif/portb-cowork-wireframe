// app/(main)/amenities/page.tsx

import type { Metadata } from "next";
import React from "react";
import Amenities from "./components/Amenities";

// 👇 SEO METADATA — Amenities & Facilities
export const metadata: Metadata = {
  title: "Kemudahan Coworking Space Kota Bharu | WiFi, Surau, Parking | Port B",
  description:
    "Kemudahan lengkap di Port B Coworking Kota Bharu. WiFi laju, surau & tandas bersih, kopi & snacks, 4K smart display, parking percuma, CCTV 24/7. Lokasi strategik di Jalan Hamzah.",
  keywords: [
    "kemudahan coworking kota bharu",
    "facilities coworking kelantan",
    "coworking wifi laju kelantan",
    "coworking ada surau kota bharu",
    "coworking parking percuma kelantan",
    "coworking space cctv kota bharu",
    "meeting room dengan display kota bharu",
    "coworking ada pantry kelantan",
    "workspace selesa kota bharu",
    "office space facilities kelantan",
  ],
  openGraph: {
    title: "Kemudahan Port B Coworking | WiFi, Surau, Parking Percuma",
    description:
      "WiFi laju, surau bersih, kopi & snacks, 4K display, parking percuma, CCTV 24/7.",
    url: "https://www.portbspace.com/amenities",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kemudahan Port B Coworking Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kemudahan Port B Coworking Kota Bharu",
    description: "WiFi laju, surau, parking percuma, CCTV 24/7",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/amenities",
  },
};

const AmenitiesPage = () => {
  return (
    <div>
      <Amenities />
    </div>
  );
};

export default AmenitiesPage;
