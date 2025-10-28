"use client";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  /** storm gradient colors */
  colors?: string[];
  /** adjust animation base speed; 1 = normal, higher = faster */
  speed?: number;
}

export const AuroraText = memo(function AuroraText({
  children,
  className = "",
  colors = [
    "#f1f5f9", // pale cloud white
    "#cbd5e1", // soft silver
    "#94a3b8", // misty grey blue
    "#52768a", // dark storm blue
    "#cbd5e1", // return calm
  ],
  speed = 1, // quicker base speed
}: AuroraTextProps) {
  const baseStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(", ")})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "300% 300%",
    animationDuration: `${12 / speed}s`,
  };

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Screenreader text */}
      <span className="sr-only">{children}</span>

      {/* Moving gradient text */}
      <span
        className="bg-clip-text text-transparent animate-auroraStorm relative z-10"
        style={baseStyle}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Flash layer */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/70 to-white/0 animate-lightningFlash bg-clip-text text-transparent z-20 pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Animations */}
      <style jsx global>{`
        @keyframes auroraStorm {
          0% {
            background-position: 0% 50%;
            filter: brightness(1);
          }
          25% {
            background-position: 50% 50%;
            filter: brightness(1.1);
          }
          50% {
            background-position: 100% 50%;
            filter: brightness(1);
          }
          75% {
            background-position: 50% 50%;
            filter: brightness(1.1);
          }
          100% {
            background-position: 0% 50%;
            filter: brightness(1);
          }
        }

        /* subtle moving storm clouds */
        .animate-auroraStorm {
          animation: auroraStorm linear infinite;
        }

        /* lightning shimmer effect */
        @keyframes lightningFlash {
          0%,
          95%,
          100% {
            opacity: 0;
          }
          30% {
            opacity: 0;
          }
          32% {
            opacity: 1;
          }
          33% {
            opacity: 0.4;
          }
          34% {
            opacity: 1;
          }
          36% {
            opacity: 0;
          }
        }

        .animate-lightningFlash {
          animation: lightningFlash 6s infinite ease-in-out;
          mix-blend-mode: screen;
        }
      `}</style>
    </span>
  );
});
