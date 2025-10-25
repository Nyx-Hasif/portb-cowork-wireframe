"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  WifiIcon,
  BeakerIcon,
  SparklesIcon,
  CloudIcon,
  DeviceTabletIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  UsersIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const iconMap: Record<string, React.ElementType> = {
  WIFI_ICON: WifiIcon,
  Coffee_ICON: BeakerIcon,
  WC_ICON: SparklesIcon,
  SNOWFLAKE_ICON: CloudIcon,
  LAPTOP_ICON: DeviceTabletIcon,
  TUKUL_ICON: WrenchScrewdriverIcon,
  LOCATION_ICON: MapPinIcon,
  COMMUNITY_ICON: UsersIcon,
  SECURITY_ICON: ShieldCheckIcon,
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: number;
    icon?: string;
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10 px-2 sm:px-4",
        className
      )}
    >
      {items.map((item, idx) => {
        const IconComponent = item.icon ? iconMap[item.icon] : WifiIcon;
        return (
          <a
            href={item.link}
            key={item.id}
            className="relative block h-full w-full group"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* --- Hover Background (DEFAULT COLOR) --- */}
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="hoverBackground"
                  className="absolute inset-0 h-full w-full rounded-3xl 
                             bg-gray-800/40"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 2, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 2, ease: "easeInOut" },
                  }}
                />
              )}
            </AnimatePresence>

            {/* --- CARD UI PUTIH CLEAN --- */}
            <Card>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl 
                             bg-sky-200 text-sky-700 
                             group-hover:bg-sky-500 group-hover:text-white 
                             transition-colors duration-300"
                >
                  <IconComponent className="w-7 h-7" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </Card>
          </a>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "rounded-3xl h-full w-full p-6 relative overflow-hidden",
      "bg-white border border-gray-100 text-gray-900",
      "transition-transform duration-500 hover:-translate-y-1 shadow-sm hover:shadow-xl",
      className
    )}
  >
    {children}
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "text-lg sm:text-xl md:text-2xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h4>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "text-gray-600 text-sm sm:text-base leading-relaxed max-w-xs mx-auto",
      className
    )}
  >
    {children}
  </p>
);
