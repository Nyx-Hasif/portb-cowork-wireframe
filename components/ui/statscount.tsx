"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  showDecimal?: boolean;
  icon?: string;
}

interface StatsCountProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  showDividers?: boolean;
  className?: string;
}

const defaultStats: StatItem[] = [
  {
    value: 50,
    suffix: "+",
    label: "Handcrafted Components",
    showDecimal: false,
  },
  {
    value: 12,
    suffix: "K+",
    label: "Active Developers",
    showDecimal: false,
  },
  {
    value: 99,
    suffix: "%",
    label: "Performance Score",
    showDecimal: false,
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  delay = 0,
  label,
  showDecimal = false,
}: {
  value: number;
  suffix?: string;
  delay?: number;
  label: string;
  showDecimal?: boolean;
  icon?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px", once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 60,
    mass: 1,
  });

  const rounded = useTransform(springValue, (latest) =>
    Number(latest.toFixed(showDecimal ? 1 : 0))
  );

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isInView) {
      motionValue.set(0);
      timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 200);
    }
    return () => clearTimeout(timeout);
  }, [isInView, value, motionValue, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: delay * 0.15,
        ease: "easeOut",
      }}
      className="relative flex flex-col items-center text-center group"
    >
 

      {/* Number - ✅ Changed to black */}
      <motion.div
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-3 tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={
          isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
        }
        transition={{
          duration: 0.6,
          delay: delay * 0.15 + 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        {showDecimal ? displayValue.toFixed(1) : Math.round(displayValue)}
        <span className="text-black">{suffix}</span>
      </motion.div>

      {/* Label - ✅ Changed to gray-600 */}
      <motion.p
        className="text-sm sm:text-base md:text-lg text-gray-600 font-light max-w-[200px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay * 0.15 + 0.5, duration: 0.6 }}
      >
        {label}
      </motion.p>

    </motion.div>
  );
}

export default function StatsCount({
  stats = defaultStats,
  title = "Trusted By Creators",
  subtitle,
  className = "",
}: StatsCountProps) {
  const containerRef = useRef<HTMLElement>(null); // ✅ Fixed type
  const isInView = useInView(containerRef, { margin: "-100px", once: true });

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative py-20 sm:py-28 md:py-32 lg:py-40 px-6 w-full overflow-hidden bg-white",
        className
      )}
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 font-medium mb-4">
            Our Impact
          </p>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black leading-tight mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 sm:gap-y-20 md:gap-y-24">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                delay={index}
                label={stat.label}
                showDecimal={stat.showDecimal}
                icon={stat.icon}
              />
            </div>
          ))}
        </div>

        {/* Bottom Decorative Line */}
        {/* <motion.div
          className="mt-20 md:mt-32 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        /> */}
      </div>
    </section>
  );

}
