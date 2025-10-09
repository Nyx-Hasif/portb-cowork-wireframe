import Image from 'next/image'
import React from 'react'

// declare props is a must!!! only for typescript
interface HeroProps {
  title: string;
  imagePath: string;
}

const CTA = ({title,imagePath} : HeroProps) => {
  return (
    <div className="min-h-auto">
      {/* gambar background */}
      {/* Fixed Height 500px, Full Width */}
      <div className="w-full lg:h-[600px] md:h-[400px] h-[300px]  relative">
        {/* Layer 1 (Bottom)  */}
        <Image
          src={imagePath}
          alt="hero"
          fill
          quality={100}
          priority // Load immediately when page loads
          sizes="100vw" // Full width size
          className="object-cover"
        />

        {/* Dark Overlay */}
        {/* Layer 2 (Middle) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/20"></div>

        {/* Layer 3 (Top) - Automatic! */}
        <div className="absolute inset-0 flex flex-col items-center md:gap-12 gap-6 justify-center ">
          <h2 className=" text-white text-2xl md:text-4xl font-bold text-center px-4 max-w-7xl">
           {title}
          </h2>
          <button className=' text-white text-2xl md:text-4xl font-bold border border-white px-4 py-2 rounded-2xl'>Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default CTA
