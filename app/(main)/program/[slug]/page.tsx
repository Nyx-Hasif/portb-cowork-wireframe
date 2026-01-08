// app/(main)/program/[slug]/page.tsx

import { notFound } from "next/navigation";
import { ProgramType } from "@/types/types";
import { TRAINER_DATA } from "../data";
import LandingPageContent from "../components/LandingPageContent";

// Generate static params for SSG
export async function generateStaticParams() {
  return Object.values(ProgramType).map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const programType = params.slug as ProgramType;
  const data = TRAINER_DATA[programType];

  if (!data) {
    return { title: "Program Not Found" };
  }

  return {
    title: `${data.title} - ${data.trainerName}`,
    description: data.heroSubheader,
  };
}

interface PageProps {
  params: { slug: string };
}

export default function ProgramLandingPage({ params }: PageProps) {
  const programType = params.slug as ProgramType;
  const data = TRAINER_DATA[programType];

  // If program not found, show 404
  if (!data) {
    notFound();
  }

  return <LandingPageContent data={data} />;
}
