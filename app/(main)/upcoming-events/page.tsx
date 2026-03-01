// app/(main)/upcoming-events/page.tsx

import type { Metadata } from "next";
import React from "react";
import Featured from "./components/Featured";

// 👇 SEO METADATA — Upcoming Events Page
export const metadata: Metadata = {
  title: "Event & Program di Kota Bharu | Port B Coworking Kelantan",
  description:
    "Sertai event dan program di Port B Coworking Kota Bharu. Workshop, seminar, networking, community talk & gathering. Daftar sekarang untuk event terkini di Kelantan!",
  keywords: [
    "event kota bharu",
    "event kelantan",
    "workshop kota bharu",
    "seminar kelantan",
    "networking event kota bharu",
    "community event kelantan",
    "program coworking kota bharu",
    "gathering kota bharu",
    "event space kelantan",
    "daftar event kota bharu",
    "upcoming event kelantan",
    "aktiviti komuniti kota bharu",
  ],
  openGraph: {
    title: "Event & Program Terkini | Port B Coworking Kota Bharu",
    description:
      "Workshop, seminar, networking & community event di Kota Bharu. Daftar sekarang!",
    url: "https://www.portbspace.com/upcoming-events",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Upcoming Events Port B Coworking Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Event & Program | Port B Kota Bharu",
    description: "Workshop, networking & community event di Kelantan.",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/upcoming-events",
  },
};

const UpcomingEventPage = () => {
  return (
    <div>
      <Featured />
    </div>
  );
};

export default UpcomingEventPage;
