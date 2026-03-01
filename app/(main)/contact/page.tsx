// app/(main)/contact/page.tsx

import type { Metadata } from "next";
import React from "react";
import Booking from "./components/Booking";

// 👇 SEO METADATA — Contact Page
export const metadata: Metadata = {
  title: "Hubungi Kami | Book a Tour | Port B Coworking Kota Bharu",
  description:
    "Hubungi Port B Coworking di Kota Bharu, Kelantan. Book tour percuma, tanya harga coworking space, meeting room & virtual office. WhatsApp: 014-329 8981. Alamat: Jalan Hamzah, Seksyen 19.",
  keywords: [
    "contact port b kota bharu",
    "book tour coworking kelantan",
    "hubungi coworking kota bharu",
    "alamat coworking space kelantan",
    "nombor telefon coworking kota bharu",
    "lokasi coworking kota bharu",
    "port b jalan hamzah",
    "coworking seksyen 19 kota bharu",
    "booking meeting room kelantan",
    "tempahan coworking space",
  ],
  openGraph: {
    title: "Hubungi Port B Coworking | Book a Tour",
    description:
      "Book tour percuma di Port B Kota Bharu. WhatsApp: 014-329 8981. Jalan Hamzah, Seksyen 19.",
    url: "https://www.portbspace.com/contact",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Port B Coworking Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi Port B Coworking Kota Bharu",
    description: "Book tour percuma. WhatsApp: 014-329 8981",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/contact",
  },
};

const ContactPage = () => {
  return (
    <div>
      <Booking />
    </div>
  );
};

export default ContactPage;
