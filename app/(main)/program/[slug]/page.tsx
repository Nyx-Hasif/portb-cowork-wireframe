// app/(main)/program/[slug]/page.tsx

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
// GENERATE METADATA DYNAMICALLY
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programType = slug as ProgramType;
  const data = TRAINER_DATA[programType];

  if (!data) {
    return { title: "Program Not Found" };
  }

  return {
    title: `${data.title} - ${data.trainerName}`,
    description: data.heroSubheader,
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

  // If program not found, show 404
  if (!data) {
    notFound();
  }

  return <LandingPageContent data={data} />;
}
