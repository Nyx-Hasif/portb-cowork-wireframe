// app/(main)/business-address/page.tsx

import type { Metadata } from "next";
import React from "react";
import VirtualAdress from "./components/VirtualAdress";
import BillingAddress from "./components/BillingAddress";

// 👇 SEO METADATA — Virtual Office & Business Address
export const metadata: Metadata = {
  title: "Virtual Office Kota Bharu | Business Address RM1/hari | Port B",
  description:
    "Virtual office & business address di Kota Bharu, Kelantan. Hanya RM365/tahun (RM1/hari). Alamat SSM, mail handling, parcel storage. Zero deposit, cancel anytime!",
  keywords: [
    "virtual office kota bharu",
    "virtual office kelantan",
    "virtual office murah kelantan",
    "business address kota bharu",
    "business address kelantan",
    "alamat ssm kota bharu",
    "alamat perniagaan kota bharu",
    "daftar ssm kelantan",
    "mail handling kota bharu",
    "office address kelantan",
    "alamat bisnes murah",
    "virtual address kelantan",
  ],
  openGraph: {
    title: "Virtual Office Kota Bharu | Business Address RM1/hari",
    description:
      "Virtual office & business address hanya RM365/tahun. Alamat SSM, mail handling, parcel storage. Zero deposit!",
    url: "https://www.portbspace.com/business-address",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Virtual Office Port B Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Office Kota Bharu | RM1/hari",
    description:
      "Business address RM365/tahun. Alamat SSM, mail handling. Zero deposit!",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/business-address",
  },
};

const BusinessAddressPage = () => {
  return (
    <div>
      <VirtualAdress />
      <BillingAddress />
    </div>
  );
};

export default BusinessAddressPage;
