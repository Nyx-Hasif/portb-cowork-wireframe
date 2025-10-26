import Image from 'next/image';
import React from 'react'


// declare props is a must!!! only for typescript
interface HeroProps {
  title: string;
  imagePath: string;
}

const Hero = ({title,imagePath} : HeroProps) => {
  return (
    <div className="min-h-auto">
      {/* gambar background */}
      {/* Fixed Height 500px, Full Width */}
      <div className="w-full lg:h-[700px] md:h-[400px] h-[300px] xl:-mt-[30px] md:-mt-[20px] -mt-[10px]  relative">
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
        <div className="absolute inset-0 flex items-center justify-center ">
          <h2 className=" text-white text-2xl md:text-4xl font-bold text-center px-4 max-w-7xl">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Hero
