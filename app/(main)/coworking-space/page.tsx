// app/(main)/coworking-space/page.tsx

import type { Metadata } from "next";
import React, { Suspense } from "react";
import PricingTable from "./components/PricingTable";
import FoodMenu from "./components/FoodMenu";

// 👇 SEO METADATA — Coworking Space Page
export const metadata: Metadata = {
  title: "Coworking Space Kota Bharu | Hot Desk RM15/hari | Port B",
  description:
    "Coworking space terbaik di Kota Bharu, Kelantan. Common area dari RM15/hari (student), RM25 (standard). Meeting room RM100/jam. Fixed desk RM35/hari. Event space RM200/jam. WiFi laju, aircond!",
  keywords: [
    "coworking space kota bharu",
    "coworking space kelantan",
    "coworking space murah kota bharu",
    "hot desk kota bharu",
    "hot desk murah kelantan",
    "dedicated desk kota bharu",
    "fixed desk kota bharu",
    "sewa meja office kota bharu",
    "shared office kelantan",
    "workspace kota bharu",
    "tempat kerja freelancer kelantan",
    "startup space kota bharu",
    "student coworking kelantan",
  ],
  openGraph: {
    title: "Coworking Space Kota Bharu | Hot Desk Dari RM15/hari",
    description:
      "Hot desk RM15 (student), RM25 (standard). Meeting room RM100/jam. Fixed desk RM35/hari. Event space RM200/jam.",
    url: "https://www.portbspace.com/coworking-space",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coworking Space Port B Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coworking Space Kota Bharu | Hot Desk RM15/hari",
    description:
      "Hot desk dari RM15/hari. Meeting room RM100/jam. Fixed desk RM35/hari.",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/coworking-space",
  },
};

const CoworkingPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <PricingTable />
      </Suspense>
      <FoodMenu />
    </div>
  );
};

export default CoworkingPage;
