// app/(main)/program/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProgramType } from "@/types/types";
import { assets } from "@/assets/asset";

// 👇 SEO METADATA — Program Catalog
export const metadata: Metadata = {
  title: "Program & Kelas di Port B Kota Bharu | Yoga, Wellness | Her Hour",
  description:
    "Sertai program eksklusif di Port B Coworking Kota Bharu. Her Hour - kelas yoga untuk wanita dengan instruktur berpengalaman 10+ tahun. Sesuai untuk beginner. Women-only sessions.",
  keywords: [
    "program coworking kota bharu",
    "kelas yoga kota bharu",
    "yoga untuk wanita kelantan",
    "her hour yoga",
    "kelas fitness wanita kota bharu",
    "yoga beginner kelantan",
    "women only yoga kelantan",
    "wellness program kota bharu",
    "yoga muslim friendly kelantan",
    "kelas yoga private kelantan",
  ],
  openGraph: {
    title: "Program & Kelas | Her Hour Yoga | Port B Kota Bharu",
    description:
      "Kelas yoga eksklusif untuk wanita. Instruktur 10+ tahun pengalaman. Beginner friendly.",
    url: "https://www.portbspace.com/program",
    siteName: "Port B Coworking",
    locale: "ms_MY",
    type: "website",
    images: [
      {
        url: "https://www.portbspace.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Program Her Hour Port B Kota Bharu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Her Hour Yoga | Port B Kota Bharu",
    description: "Kelas yoga untuk wanita. Women-only, beginner friendly.",
    images: ["https://www.portbspace.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.portbspace.com/program",
  },
};

export default function ProgramPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-12 tracking-tighter text-black uppercase text-center">
        Choose Your Program
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Her Hour - ACTIVE ✅ */}
        <Link
          href={`/program/${ProgramType.YOGA}`}
          className="group relative h-80 sm:h-96 cursor-pointer overflow-hidden border-2 border-black transition-all md:hover:scale-[1.02] active:scale-[0.98] duration-500"
        >
          <Image
            src={assets.program_herhour}
            alt="Her Hour - Kelas Yoga Wanita Kota Bharu"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 group-active:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-widest">
              Her Hour
            </h2>
            <div className="h-1 w-0 group-hover:w-full group-active:w-full bg-white transition-all duration-500 mt-2" />
          </div>
        </Link>

        {/* Curious Reader Club - COMING SOON 🚫 */}
        <div className="group relative h-80 sm:h-96 overflow-hidden border-2 border-black/30 cursor-not-allowed select-none">
          <Image
            src={assets.program_curious_club}
            alt="Curious Reader Club - Coming Soon"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="bg-white/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 mb-4">
              Coming Soon
            </span>
          </div>
          <div className="absolute bottom-8 left-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white/50 uppercase tracking-widest">
              {""}
            </h2>
          </div>
        </div>
      </div>

      <p className="mt-12 text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.3em] font-semibold text-center">
        Professional Guidance • Group Sessions Only
      </p>
    </div>
  );
}
