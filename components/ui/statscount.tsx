"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Star, Calendar, Award, Users } from "lucide-react";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  showDecimal?: boolean;
  icon?: React.ReactNode;
}

interface StatsCountProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultStats: StatItem[] = [
  {
    value: 50,
    suffix: "+",
    label: "Handcrafted Components",
    showDecimal: false,
    icon: <Star className="w-5 h-5" />,
  },
  {
    value: 12,
    suffix: "K+",
    label: "Active Developers",
    showDecimal: false,
    icon: <Users className="w-5 h-5" />,
  },
  {
    value: 99,
    suffix: "%",
    label: "Performance Score",
    showDecimal: false,
    icon: <Award className="w-5 h-5" />,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support Available",
    showDecimal: false,
    icon: <Calendar className="w-5 h-5" />,
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  delay = 0,
  label,
  showDecimal = false,
  icon,
}: {
  value: number;
  suffix?: string;
  delay?: number;
  label: string;
  showDecimal?: boolean;
  icon?: React.ReactNode;
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
    Number(latest.toFixed(showDecimal ? 1 : 0)),
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
        delay: delay * 0.1,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="relative flex flex-col items-center text-center group h-full"
    >
      {/* Compact Card Container */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-black/[0.02] border border-black/5 hover:bg-black/[0.04] hover:border-black/10 transition-all duration-500 w-full h-full flex flex-col items-center justify-center">
        {/* Icon */}
        {icon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: delay * 0.1 + 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/5 flex items-center justify-center text-black mb-3 sm:mb-4 mx-auto group-hover:bg-black/10 transition-colors duration-300 shrink-0"
          >
            {icon}
          </motion.div>
        )}

        {/* Number */}
        <motion.div
          className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-1 sm:mb-2 tracking-tight font-serif shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
          }
          transition={{
            duration: 0.6,
            delay: delay * 0.1 + 0.3,
            type: "spring",
            stiffness: 100,
          }}
        >
          {showDecimal ? displayValue.toFixed(1) : Math.round(displayValue)}
          <span className="text-neutral-400">{suffix}</span>
        </motion.div>

        {/* Label */}
        <motion.p
          className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed shrink-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay * 0.1 + 0.5, duration: 0.6 }}
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function StatsCount({
  stats = defaultStats,
  title = "Trusted By Creators",
  subtitle,
  className = "",
}: StatsCountProps) {
  const containerRef = useRef<HTMLElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative py-16 md:py-20 lg:py-24 px-6 w-full overflow-hidden bg-white",
        className,
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-4"
          >
            <span className="w-6 h-px bg-neutral-300" />
            Our Impact
            <span className="w-6 h-px bg-neutral-300" />
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-black leading-[1.1] mb-4"
          >
            {title}
            <span className="block text-neutral-400 italic font-light mt-1 text-2xl md:text-3xl">
              By The Numbers
            </span>
          </motion.h2>

          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="text-base text-neutral-500 max-w-xl mx-auto leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[1fr]">
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              delay={index}
              label={stat.label}
              showDecimal={stat.showDecimal}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 text-neutral-400 text-xs uppercase tracking-[0.3em]">
            <span className="w-8 h-px bg-neutral-300" />
            Since 2019
            <span className="w-8 h-px bg-neutral-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
