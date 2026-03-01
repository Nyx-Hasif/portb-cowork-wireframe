// app/(main)/program/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramType } from "@/types/types";
import { TRAINER_DATA } from "../data";
import LandingPageContent from "../components/LandingPageContent";

// ============================================
// GENERATE STATIC PARAMS FOR SSG
// ============================================
export async function generateStaticParams() {
  return Object.values(ProgramType).map((slug) => ({
    slug: slug,
  }));
}

// ============================================
// 👇 GENERATE METADATA DYNAMICALLY — SEO OPTIMIZED!
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programType = slug as ProgramType;
  const data = TRAINER_DATA[programType];

  if (!data) {
    return { title: "Program Not Found" };
  }

  // 🎯 SEO Metadata untuk HerHour (Yoga)
  if (slug === "herhour") {
    return {
      title: "Her Hour - Kelas Yoga Wanita Kota Bharu | Port B Kelantan",
      description:
        "Kelas yoga eksklusif untuk wanita di Kota Bharu, Kelantan. Instruktur July Lai dengan 10+ tahun pengalaman. Beginner friendly, Muslim friendly, women-only sessions. Tingkatkan flexibility & inner peace.",
      keywords: [
        "her hour yoga kota bharu",
        "kelas yoga wanita kota bharu",
        "yoga untuk wanita kelantan",
        "yoga beginner kota bharu",
        "yoga muslim friendly kelantan",
        "women only yoga kelantan",
        "july lai yoga instructor",
        "yoga instructor kota bharu",
        "fitness wanita kelantan",
        "yoga flexibility kota bharu",
        "kelas yoga private kelantan",
        "yoga tanpa muzik kelantan",
      ],
      openGraph: {
        title: "Her Hour - Kelas Yoga Wanita | Port B Kota Bharu",
        description:
          "Kelas yoga untuk wanita. Instruktur 10+ tahun pengalaman. Beginner & Muslim friendly.",
        url: "https://www.portbspace.com/program/herhour",
        siteName: "Port B Coworking",
        locale: "ms_MY",
        type: "website",
        images: [
          {
            url: "https://www.portbspace.com/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Her Hour - Kelas Yoga Wanita Kota Bharu",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Her Hour - Yoga Wanita Kota Bharu",
        description: "Women-only yoga. Beginner friendly. Muslim friendly.",
        images: ["https://www.portbspace.com/og-image.jpg"],
      },
      alternates: {
        canonical: "https://www.portbspace.com/program/herhour",
      },
    };
  }

  // 🎯 Future: Curious Reader (bila dah ready)
  // if (slug === 'curious-reader') {
  //   return { ... }
  // }

  // Default fallback untuk program lain
  return {
    title: `${data.title} - ${data.trainerName} | Port B Kota Bharu`,
    description: data.heroSubheader,
    openGraph: {
      title: `${data.title} | Port B Coworking`,
      description: data.heroSubheader,
      url: `https://www.portbspace.com/program/${slug}`,
      siteName: "Port B Coworking",
    },
  };
}

// ============================================
// PAGE PROPS INTERFACE
// ============================================
interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// PAGE COMPONENT
// ============================================
export default async function ProgramLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const programType = slug as ProgramType;
  const data = TRAINER_DATA[programType];

  if (!data) {
    notFound();
  }

  return <LandingPageContent data={data} />;
}
