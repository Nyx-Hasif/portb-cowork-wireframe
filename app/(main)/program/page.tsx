// app/(main)/program/page.tsx

import Link from "next/link";
import Image from "next/image";
import { ProgramType } from "@/types/types";

export default function ProgramPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-12 tracking-tighter text-black uppercase text-center">
        Choose Your Program
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Yoga Card */}
        <Link
          href={`/program/${ProgramType.YOGA}`}
          className="group relative h-80 sm:h-96 cursor-pointer overflow-hidden border-2 border-black transition-all md:hover:scale-[1.02] active:scale-[0.98] duration-500"
        >
          <Image
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
            alt="Yoga"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 group-active:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-widest">
              Her Hour Fitness
            </h2>
            <div className="h-1 w-0 group-hover:w-full group-active:w-full bg-white transition-all duration-500 mt-2" />
          </div>
        </Link>

        {/* Therapy Card */}
        <Link
          href={`/program/${ProgramType.THERAPY}`}
          className="group relative h-80 sm:h-96 cursor-pointer overflow-hidden border-2 border-black transition-all md:hover:scale-[1.02] active:scale-[0.98] duration-500"
        >
          <Image
            src="https://images.unsplash.com/photo-1747276361323-0c9b1fe43109?auto=format&fit=crop&q=80&w=800"
            alt="Mental Therapy"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 group-active:bg-black/10 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-widest">
              Therapy Mental
            </h2>
            <div className="h-1 w-0 group-hover:w-full group-active:w-full bg-white transition-all duration-500 mt-2" />
          </div>
        </Link>
      </div>

      <p className="mt-12 text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.3em] font-semibold text-center">
        Professional Guidance • Group Sessions Only • Walk-in
      </p>
    </div>
  );
}
