// app/(main)/previous-events/page.tsx

import type { Metadata } from "next";
import React from "react";
import PrevEvent from "./components/PrevEvent";

// 👇 SEO METADATA — Previous Events Page
export const metadata: Metadata = {
  title: "Event Lepas di Port B Kota Bharu | Galeri Aktiviti Kelantan",
  description:
    "Lihat event dan program yang telah diadakan di Port B Coworking Kota Bharu. Workshop, seminar, networking, community talk & gathering. Jadilah sebahagian daripada komuniti kami!",
  keywords: [
    "event lepas kota bharu",
    "previous event kelantan",
    "rekod event coworking kota bharu",
    "aktiviti komuniti kelantan",
    "workshop lepas kota bharu",
    "seminar sebelum kelantan",
    "galeri event kota bharu",
    "event history port b",
    "community gathering kelantan",
    "coworking event kota bharu",
  ],
  openGraph: {
    title: "Event Lepas | Port B Coworking Kota Bharu",
    description:
      "Lihat workshop, seminar & community event yang telah diadakan di Port B.",
    url: "https://www.portbspace.com/previous-events",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Previous Events Port B Coworking Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Lepas | Port B Kota Bharu",
    description: "Galeri event dan aktiviti di Port B Coworking.",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/previous-events",
  },
};

const PreviousEventPage = () => {
  return (
    <div>
      <PrevEvent />
    </div>
  );
};

export default PreviousEventPage;
