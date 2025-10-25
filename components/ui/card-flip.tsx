"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface CardFlipProps extends React.HTMLAttributes<HTMLDivElement> {
  isFlipped?: boolean;
  children: React.ReactNode;
}

export const CardFlip = ({
  isFlipped = false,
  className,
  children,
  ...props
}: CardFlipProps) => {
  return (
    <div
      className={cn("relative w-full aspect-[4/3]", className)}
      style={{ perspective: "1000px" }}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d]",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const CardFlipFront = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
  <div
    className={cn(
      "absolute inset-0 backface-hidden rounded-3xl overflow-hidden",
      className
    )}
  >
    {children}
  </div>
);

export const CardFlipBack = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
  <div
    className={cn(
      "absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden",
      className
    )}
  >
    {children}
  </div>
);

/* helper components — strongly typed */
interface SimpleChildProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFlipHeader = ({ children, className }: SimpleChildProps) => (
  <div className={cn("p-4", className)}>{children}</div>
);

export const CardFlipTitle = ({ children, className }: SimpleChildProps) => (
  <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>
);

export const CardFlipContent = ({ children, className }: SimpleChildProps) => (
  <div className={cn("h-full w-full", className)}>{children}</div>
);

export const CardFlipFooter = ({ children, className }: SimpleChildProps) => (
  <div className={cn("p-4", className)}>{children}</div>
);

/* utility CSS */
<style jsx global>{`
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
`}</style>;
