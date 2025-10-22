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
}

interface StatsCountProps {
  stats?: StatItem[];
  title?: string;
  showDividers?: boolean;
  className?: string;
}

const defaultStats: StatItem[] = [
  {
    value: 50,
    suffix: "+",
    label: "Handcrafted animated components",
    showDecimal: false,
  },
  {
    value: 12,
    suffix: "K+",
    label: "Developers building with ScrollX-UI",
    showDecimal: false,
  },
  {
    value: 99,
    suffix: "%",
    label: "Performance optimized for web",
    showDecimal: false,
  },
];

const defaultTitle = "TRUSTED BY CREATORS AND INNOVATORS";

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
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 50,
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
      }, delay * 300);
    } else {
      motionValue.set(0);
    }
    return () => clearTimeout(timeout);
  }, [isInView, value, motionValue, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay * 0.2,
        type: "spring",
        stiffness: 80,
      }}
      className={cn(
        "text-center flex-1 min-w-0 flex flex-col justify-center h-full"
      )}
    >
      <motion.div
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 whitespace-nowrap"
        )}
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: 1 } : { scale: 0.8 }}
        transition={{
          duration: 0.6,
          delay: delay * 0.2 + 0.3,
          type: "spring",
          stiffness: 100,
        }}
      >
        {showDecimal ? displayValue.toFixed(1) : Math.round(displayValue)}
        {suffix}
      </motion.div>
      <motion.p
        className={cn(
          "text-gray-600 dark:text-black text-xs sm:text-sm leading-relaxed px-1 sm:px-2 hyphens-auto break-words"
        )}
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay * 0.2 + 0.6, duration: 0.6 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export default function StatsCount({
  stats = defaultStats,
  title = defaultTitle,
  showDividers = true,
  className = "",
}: StatsCountProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });

  return (
    <motion.section
      ref={containerRef}
      className={cn(
        "py-8 sm:py-12 lg:py-20 px-2 sm:px-4 md:px-8 w-full overflow-hidden bg-[#f8fafb]",
        className
      )}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={cn("text-center mb-8 sm:mb-12 lg:mb-16")}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2
          className={cn(
            "text-sm sm:text-base md:text-lg lg:text-xl font-medium text-black tracking-wide px-4"
          )}
        >
          <span className="hidden sm:inline">
            {title.includes("BY") ? (
              <>
                {title.split("BY")[0]}BY{" "}
                <span
                  className={cn(
                    "text-blue-600 dark:text-blue-400 font-semibold"
                  )}
                >
                  {title.split("BY")[1]}
                </span>
              </>
            ) : (
              title
            )}
          </span>
          <div
            className={cn("flex flex-col items-center leading-tight sm:hidden")}
          >
            {title.includes("BY") ? (
              <>
                <span>{title.split("BY")[0].trim()}</span>
                <span className={cn("text-center")}>BY</span>
                <span
                  className={cn(
                    "text-blue-600 dark:text-blue-400 font-semibold"
                  )}
                >
                  {title.split("BY")[1].trim()}
                </span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </div>
        </h2>
      </motion.div>

      <div className={cn("w-full max-w-6xl mx-auto text-black")}>
        <div
          className={cn(
            "flex flex-row items-stretch justify-between gap-2 sm:gap-4 lg:gap-8 w-full min-h-[120px] sm:min-h-[140px]"
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "relative flex-1 min-w-0 flex flex-col justify-center h-full"
              )}
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                delay={index}
                label={stat.label}
                showDecimal={stat.showDecimal}
              />
              {index < stats.length - 1 && showDividers && (
                <motion.div
                  className={cn(
                    "absolute -right-1 sm:-right-2 lg:-right-4 top-1/2 transform -translate-y-1/2 h-12 sm:h-16 lg:h-20 w-px bg-gray-200 dark:bg-gray-700"
                  )}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scaleY: 1 }
                      : { opacity: 0, scaleY: 0 }
                  }
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
