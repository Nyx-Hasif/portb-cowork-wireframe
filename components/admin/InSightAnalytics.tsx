// 📁 components/admin/InSightAnalytics.tsx
// REPLACE ENTIRE FILE

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Play,
  RefreshCw,
  Loader2,
  Zap,
  MousePointer,
  BarChart3,
  Search,
  Share2,
  Mail,
  Link,
  HelpCircle,
  X,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Target,
  ArrowRight,
} from "lucide-react";

import { useRealtimeUsers } from "@/hooks/useRealtimeUsers";

// ============================================
// TYPES
// ============================================
interface TrackedPageAnalytics {
  page_path: string;
  total_views: number;
  unique_visitors: number;
  new_visitors: number;
  avg_duration: number;
  bounce_rate: number;
  traffic_sources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  referrers: Array<{ domain: string; visitors: number; views: number }>;
  devices: Array<{ device: string; visitors: number; percentage: number }>;
  countries: Array<{ country: string; country_code: string; visitors: number }>;
  daily_views: Array<{ date: string; views: number; visitors: number }>;
}

interface TrackedPage {
  path: string;
  label: string;
  analytics: TrackedPageAnalytics | null;
}

interface AnalyticsData {
  period: string;
  dateRange: { start: string; end: string };
  overview: {
    totalVisitors: number;
    newVisitors: number;
    returningVisitors: number;
    totalSessions: number;
    totalPageViews: number;
    pagesPerSession: number;
    avgSessionDuration: number;
    bounceRate: number;
    visitorChange: number;
    pageViewChange: number;
  };
  daily: Array<{
    date: string;
    visitors: number;
    new_visitors: number;
    sessions: number;
    page_views: number;
  }>;
  topPages: Array<{
    page: string;
    page_title: string;
    views: number;
    unique_visitors: number;
    avg_duration: number;
    bounce_rate: number;
  }>;
  devices: Array<{
    device: string;
    visitors: number;
    sessions: number;
    percentage: number;
  }>;
  browsers: Array<{
    browser: string;
    visitors: number;
    percentage: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    sessions: number;
    percentage: number;
  }>;
  countries: Array<{
    country: string;
    country_code: string;
    visitors: number;
    percentage: number;
  }>;
  videos: Array<{
    video_name: string;
    section: string;
    program_slug: string;
    total_plays: number;
    unique_viewers: number;
    total_completes: number;
    avg_watch_percent: number;
    completion_rate: number;
  }>;
  realtime: {
    active_now: number;
    last_30_min: number;
    last_hour: number;
    today: number;
    active_pages: Array<{ page: string; visitors: number }>;
  };
  trackedPages: TrackedPage[];
}

// ============================================
// TOOLTIP CONTENT DATA
// ============================================
const TOOLTIP_CONTENT: Record<
  string,
  { title: string; description: string; example: string; tip: string }
> = {
  totalVisitors: {
    title: "Total Visitors",
    description: "Jumlah orang UNIK yang melawat website anda.",
    example: "Jika 1 orang visit 10 kali = tetap dikira 1 visitor",
    tip: "✅ Lebih tinggi = lebih bagus!",
  },
  pageViews: {
    title: "Page Views",
    description: "Jumlah TOTAL halaman yang dibuka oleh semua visitors.",
    example: "1 visitor buka 5 pages = 5 page views",
    tip: "📊 Bandingkan dengan visitors untuk lihat engagement",
  },
  avgDuration: {
    title: "Average Duration",
    description: "Purata masa yang dihabiskan visitor di website anda.",
    example: "Visitor A: 5 min, Visitor B: 3 min → Average = 4 min",
    tip: "✅ Tinggi (>2 min) = Content menarik!\n❌ Rendah (<30s) = Orang cepat keluar",
  },
  bounceRate: {
    title: "Bounce Rate",
    description: "Peratus visitor yang KELUAR selepas lihat 1 page sahaja.",
    example: "100 visitors, 40 orang keluar terus = 40% bounce rate",
    tip: "✅ Rendah (<40%) = Bagus!\n⚠️ Sederhana (40-60%) = Okay\n❌ Tinggi (>70%) = Perlu improve",
  },
  trafficDirect: {
    title: "Direct Traffic",
    description: "Visitor yang taip URL terus dalam browser.",
    example: "Orang taip URL direct tanpa click dari mana-mana",
    tip: "💡 Menunjukkan brand awareness yang kuat!",
  },
  trafficOrganic: {
    title: "Organic Search",
    description: "Visitor dari Google, Bing, atau search engine lain.",
    example: "Orang search keyword → click website anda",
    tip: "💡 Tinggi = SEO anda bagus!",
  },
  trafficReferral: {
    title: "Referral",
    description: "Visitor yang click link dari website LAIN.",
    example: "Blog/news site tulis pasal anda → orang click link",
    tip: "💡 Dapat dari partnerships & mentions",
  },
  trafficSocial: {
    title: "Social Media",
    description: "Visitor dari Facebook, Instagram, TikTok, LinkedIn, dll.",
    example: "Orang click link di post Instagram anda",
    tip: "💡 Tinggi = Social media marketing berkesan!",
  },
  trafficPaid: {
    title: "Paid Ads",
    description: "Visitor dari iklan berbayar (Google Ads, FB Ads, dll).",
    example: "Orang click iklan Google anda",
    tip: "💡 Track ROI iklan anda di sini",
  },
  trafficEmail: {
    title: "Email",
    description: "Visitor yang click link dalam email/newsletter.",
    example: "Orang click link dalam newsletter anda",
    tip: "💡 Ukur keberkesanan email marketing",
  },
  devices: {
    title: "Device Breakdown",
    description: "Jenis peranti yang digunakan visitors.",
    example: "Desktop = komputer, Mobile = phone, Tablet = iPad",
    tip: "💡 Jika mobile tinggi, pastikan website mobile-friendly!",
  },
  countries: {
    title: "Top Countries",
    description: "Negara asal visitors anda (berdasarkan IP address).",
    example: "🇲🇾 Malaysia 80%, 🇸🇬 Singapore 10%",
    tip: "💡 Bantu anda target marketing ke negara yang tepat",
  },
  videoStats: {
    title: "Video Performance",
    description: "Statistik video yang ditonton di website.",
    example: "Plays = berapa kali play, Complete = habis tonton",
    tip: "💡 Completion rate tinggi = video content bagus!",
  },
  realtime: {
    title: "Realtime Visitors",
    description: "Visitors yang SEDANG berada di website anda sekarang.",
    example: "Active now = dalam 1 minit terakhir",
    tip: "💡 Auto-update setiap 10 saat",
  },
  trackedPage: {
    title: "Tracked Page",
    description:
      "Page yang anda monitor khas — contohnya link yang anda share di social media.",
    example:
      "/program/herhour — track berapa orang click dari link yang anda share",
    tip: "💡 Boleh lihat dari mana visitor datang (social, direct, dll)",
  },
};

// ============================================
// CONSTANTS
// ============================================
const PERIODS = [
  { value: "today", label: "Today", shortLabel: "Today" },
  { value: "yesterday", label: "Yesterday", shortLabel: "Yest" },
  { value: "7days", label: "7 Days", shortLabel: "7D" },
  { value: "14days", label: "14 Days", shortLabel: "14D" },
  { value: "30days", label: "30 Days", shortLabel: "30D" },
  { value: "3months", label: "3 Months", shortLabel: "3M" },
  { value: "6months", label: "6 Months", shortLabel: "6M" },
  { value: "1year", label: "1 Year", shortLabel: "1Y" },
];

const COLORS = {
  primary: "#3B82F6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#8B5CF6",
  pink: "#EC4899",
  cyan: "#06B6D4",
  orange: "#F97316",
};

const CHART_COLORS = [
  COLORS.primary,
  COLORS.success,
  COLORS.warning,
  COLORS.purple,
  COLORS.pink,
  COLORS.cyan,
];

const DEVICE_CONFIG: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  desktop: { icon: Monitor, color: "text-blue-600", bg: "bg-blue-100" },
  mobile: { icon: Smartphone, color: "text-green-600", bg: "bg-green-100" },
  tablet: { icon: Tablet, color: "text-purple-600", bg: "bg-purple-100" },
  unknown: { icon: Monitor, color: "text-gray-600", bg: "bg-gray-100" },
};

const TRAFFIC_CONFIG: Record<
  string,
  { icon: React.ElementType; label: string; color: string; tooltipKey: string }
> = {
  direct: {
    icon: MousePointer,
    label: "Direct",
    color: COLORS.primary,
    tooltipKey: "trafficDirect",
  },
  organic: {
    icon: Search,
    label: "Organic",
    color: COLORS.success,
    tooltipKey: "trafficOrganic",
  },
  referral: {
    icon: Link,
    label: "Referral",
    color: COLORS.warning,
    tooltipKey: "trafficReferral",
  },
  social: {
    icon: Share2,
    label: "Social",
    color: COLORS.purple,
    tooltipKey: "trafficSocial",
  },
  paid: {
    icon: TrendingUp,
    label: "Paid",
    color: COLORS.danger,
    tooltipKey: "trafficPaid",
  },
  email: {
    icon: Mail,
    label: "Email",
    color: COLORS.cyan,
    tooltipKey: "trafficEmail",
  },
  unknown: {
    icon: Globe,
    label: "Other",
    color: COLORS.orange,
    tooltipKey: "trafficDirect",
  },
};

const COUNTRY_FLAGS: Record<string, string> = {
  MY: "🇲🇾",
  US: "🇺🇸",
  SG: "🇸🇬",
  GB: "🇬🇧",
  AU: "🇦🇺",
  IN: "🇮🇳",
  ID: "🇮🇩",
  PH: "🇵🇭",
  TH: "🇹🇭",
  JP: "🇯🇵",
  KR: "🇰🇷",
  CN: "🇨🇳",
  VN: "🇻🇳",
  HK: "🇭🇰",
  TW: "🇹🇼",
  DE: "🇩🇪",
  FR: "🇫🇷",
  NL: "🇳🇱",
  CA: "🇨🇦",
  BR: "🇧🇷",
  XX: "🌍",
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatDuration = (seconds: number): string => {
  if (!seconds || seconds < 0) return "0s";
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hours}h ${remainMins}m`;
};

// ============================================
// TOOLTIP MODAL COMPONENT
// ============================================
const TooltipModal = ({
  isOpen,
  onClose,
  tooltipKey,
}: {
  isOpen: boolean;
  onClose: () => void;
  tooltipKey: string;
}) => {
  const content = TOOLTIP_CONTENT[tooltipKey];

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info size={18} className="text-blue-400" />
            </div>
            <h4 className="font-bold text-lg">{content.title}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {content.description}
          </p>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-[11px] text-gray-400 uppercase font-bold mb-1.5 tracking-wide">
              📌 Contoh:
            </p>
            <p className="text-sm text-gray-200">{content.example}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
            <p className="text-[11px] text-yellow-400 uppercase font-bold mb-1.5 tracking-wide">
              💡 Tips:
            </p>
            <p className="text-sm text-yellow-200 whitespace-pre-line">
              {content.tip}
            </p>
          </div>
        </div>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
          >
            Faham! 👍
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// INFO BUTTON COMPONENT
// ============================================
const InfoButton = ({
  tooltipKey,
  variant = "default",
}: {
  tooltipKey: string;
  variant?: "default" | "light";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`p-1 rounded-full transition-all duration-200 flex-shrink-0 ${
          variant === "light"
            ? "text-white/70 hover:text-white hover:bg-white/20"
            : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
        }`}
        type="button"
        aria-label="Info"
      >
        <HelpCircle size={14} />
      </button>
      <TooltipModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        tooltipKey={tooltipKey}
      />
    </>
  );
};

// ============================================
// PERIOD SELECTOR
// ============================================
const PeriodSelector = ({
  value,
  onChange,
  onRefresh,
  isRefreshing,
}: {
  value: string;
  onChange: (value: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPeriod = PERIODS.find((p) => p.value === value);

  return (
    <div className="flex items-center gap-2">
      <div className="relative sm:hidden flex-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
        >
          <span>{currentPeriod?.label}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {PERIODS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    onChange(p.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${value === p.value ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="hidden sm:flex bg-gray-100 rounded-xl p-1 gap-1">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => onChange(p.value)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${value === p.value ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
          >
            {p.shortLabel}
          </button>
        ))}
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex-shrink-0 disabled:opacity-50"
      >
        <RefreshCw
          className={`w-5 h-5 text-gray-600 ${isRefreshing ? "animate-spin" : ""}`}
        />
      </button>
    </div>
  );
};

// ============================================
// STAT CARD
// ============================================
const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  change,
  tooltipKey,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  change?: number;
  tooltipKey?: string;
}) => (
  <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 hover:shadow-md hover:border-gray-200 transition-all duration-300">
    <div className="flex items-start gap-3">
      <div
        className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${iconBg} flex-shrink-0`}
      >
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-[11px] sm:text-xs font-medium text-gray-500 truncate">
            {title}
          </p>
          {tooltipKey && <InfoButton tooltipKey={tooltipKey} />}
        </div>
        <p className="text-base sm:text-xl font-bold text-gray-900 mt-0.5">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">
            {subtitle}
          </p>
        )}
        {change !== undefined && change !== 0 && (
          <div
            className={`flex items-center gap-1 mt-1 text-[10px] sm:text-xs font-medium ${change >= 0 ? "text-green-600" : "text-red-500"}`}
          >
            {change >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>
              {change >= 0 ? "+" : ""}
              {change.toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// ============================================
// SECTION TITLE
// ============================================
const SectionTitle = ({
  emoji,
  title,
  tooltipKey,
}: {
  emoji: string;
  title: string;
  tooltipKey?: string;
}) => (
  <div className="flex items-center gap-2 mb-3 sm:mb-4">
    <span className="text-base sm:text-lg">{emoji}</span>
    <h3 className="text-sm sm:text-base font-semibold text-gray-900">
      {title}
    </h3>
    {tooltipKey && <InfoButton tooltipKey={tooltipKey} />}
  </div>
);

// ============================================
// PROGRESS BAR
// ============================================
const ProgressBar = ({
  value,
  maxValue,
  color = COLORS.primary,
}: {
  value: number;
  maxValue: number;
  color?: string;
}) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(percentage, 100)}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};

// ============================================
// TRAFFIC SOURCE ITEM
// ============================================
const TrafficSourceItem = ({
  source,
  config,
}: {
  source: {
    source: string;
    visitors: number;
    sessions: number;
    percentage: number;
  };
  config: {
    icon: React.ElementType;
    label: string;
    color: string;
    tooltipKey: string;
  };
}) => {
  const Icon = config.icon;
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: config.color }}
        />
        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
        <span className="text-xs sm:text-sm text-gray-700">{config.label}</span>
        <InfoButton tooltipKey={config.tooltipKey} />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-gray-900">
        {source.percentage}%
      </span>
    </div>
  );
};

// ============================================
// TRACKED PAGE CARD COMPONENT (UPDATED - No bounce rate, no tooltip)
// ============================================
const TrackedPageCard = ({ page }: { page: TrackedPage }) => {
    const [expanded, setExpanded] = useState(false);
    const analytics = page.analytics;

    if (!analytics) return null;

    const chartData = analytics.daily_views?.map((item: { date: string; views: number; visitors: number }) => ({
        ...item,
        dateFormatted: format(parseISO(item.date), "MMM dd"),
    })) || [];

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
            {/* Header - Always visible */}
            <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">{page.label}</h4>
                            <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                                <ExternalLink size={10} />
                                {page.path}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Quick stats */}
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-lg font-bold text-gray-900">{analytics.total_views}</p>
                                <p className="text-[10px] text-gray-500">Views</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-blue-600">{analytics.unique_visitors}</p>
                                <p className="text-[10px] text-gray-500">Visitors</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-green-600">{formatDuration(analytics.avg_duration)}</p>
                                <p className="text-[10px] text-gray-500">Avg Time</p>
                            </div>
                        </div>

                        {expanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                </div>

                {/* Mobile quick stats */}
                <div className="sm:hidden grid grid-cols-3 gap-2 mt-3">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-sm font-bold text-gray-900">{analytics.total_views}</p>
                        <p className="text-[9px] text-gray-500">Views</p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                        <p className="text-sm font-bold text-blue-600">{analytics.unique_visitors}</p>
                        <p className="text-[9px] text-gray-500">Visitors</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                        <p className="text-sm font-bold text-green-600">{formatDuration(analytics.avg_duration)}</p>
                        <p className="text-[9px] text-gray-500">Avg Time</p>
                    </div>
                </div>
            </div>

            {/* Expanded Detail */}
            {expanded && (
                <div className="border-t border-gray-100 p-4 space-y-5">
                    {/* Stats Row - 3 columns only (no bounce rate) */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-50 rounded-xl text-center">
                            <Eye className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                            <p className="text-lg font-bold text-blue-700">{analytics.total_views}</p>
                            <p className="text-[10px] text-blue-500">Total Views</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl text-center">
                            <Users className="w-4 h-4 text-green-500 mx-auto mb-1" />
                            <p className="text-lg font-bold text-green-700">{analytics.unique_visitors}</p>
                            <p className="text-[10px] text-green-500">Unique Visitors</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-xl text-center">
                            <Clock className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                            <p className="text-lg font-bold text-purple-700">{formatDuration(analytics.avg_duration)}</p>
                            <p className="text-[10px] text-purple-500">Avg Duration</p>
                        </div>
                    </div>

                    {/* Daily Trend Chart */}
                    {chartData.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                <BarChart3 size={12} /> Daily Views Trend
                            </p>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                                    <XAxis dataKey="dateFormatted" stroke="#9CA3AF" fontSize={9} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9CA3AF" fontSize={9} tickLine={false} axisLine={false} width={25} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: "#FFF", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "11px" }}
                                    />
                                    <Bar dataKey="views" name="Views" fill={COLORS.purple} radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="visitors" name="Visitors" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Traffic Sources & Referrers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Traffic Sources for this page */}
                        {analytics.traffic_sources && analytics.traffic_sources.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                    <Globe size={12} /> Traffic Sources
                                </p>
                                <div className="space-y-1.5">
                                    {analytics.traffic_sources.map((source: { source: string; visitors: number; percentage: number }) => {
                                        const config = TRAFFIC_CONFIG[source.source] || TRAFFIC_CONFIG.unknown;
                                        const Icon = config.icon;
                                        return (
                                            <div key={source.source} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                                                    <Icon className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-700">{config.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-500">{source.visitors}</span>
                                                    <span className="text-xs font-bold text-gray-900">{source.percentage}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Referrer Domains */}
                        {analytics.referrers && analytics.referrers.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                    <ArrowRight size={12} /> Referrer Domains
                                </p>
                                <div className="space-y-1.5">
                                    {analytics.referrers.map((ref: { domain: string; visitors: number; views: number }) => (
                                        <div key={ref.domain} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                            <span className="text-xs text-gray-700 truncate flex-1">{ref.domain}</span>
                                            <div className="flex items-center gap-2 ml-2">
                                                <span className="text-xs text-gray-500">{ref.visitors} visitors</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Devices & Countries */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Devices */}
                        {analytics.devices && analytics.devices.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                    <Monitor size={12} /> Devices
                                </p>
                                <div className="flex gap-2">
                                    {analytics.devices.map((device: { device: string; visitors: number; percentage: number }) => {
                                        const config = DEVICE_CONFIG[device.device] || DEVICE_CONFIG.unknown;
                                        const DeviceIcon = config.icon;
                                        return (
                                            <div key={device.device} className="flex-1 p-2 bg-gray-50 rounded-lg text-center">
                                                <DeviceIcon className={`w-4 h-4 mx-auto mb-1 ${config.color}`} />
                                                <p className="text-sm font-bold text-gray-900">{device.percentage}%</p>
                                                <p className="text-[9px] text-gray-500 capitalize">{device.device}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Countries */}
                        {analytics.countries && analytics.countries.length > 0 && (
                            <div>
                                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                    <Globe size={12} /> Countries
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {analytics.countries.map((country: { country: string; country_code: string; visitors: number }) => (
                                        <div key={country.country_code} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg">
                                            <span className="text-sm">{COUNTRY_FLAGS[country.country_code] || "🌍"}</span>
                                            <span className="text-xs text-gray-700">{country.country}</span>
                                            <span className="text-xs font-bold text-gray-900">{country.visitors}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================
// ALL PAGES TABLE (NEW!)
// ============================================
const AllPagesTable = ({
  pages,
}: {
  pages: Array<{
    page: string;
    page_title: string;
    views: number;
    unique_visitors: number;
    avg_duration: number;
    bounce_rate: number;
  }>;
}) => {
  const [showAll, setShowAll] = useState(false);
  const TOP_COUNT = 5;

  const displayPages = showAll ? pages : pages.slice(0, TOP_COUNT);
  const maxViews = pages[0]?.views || 1;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
      <SectionTitle emoji="📄" title={`All Pages (${pages.length})`} />

      {pages.length > 0 ? (
        <>
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-12 gap-2 pb-2 mb-2 border-b border-gray-100 text-[10px] uppercase tracking-wider font-semibold text-gray-400">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Page</div>
            <div className="col-span-2 text-right">Views</div>
            <div className="col-span-2 text-right">Visitors</div>
            <div className="col-span-2 text-right">Bounce</div>
          </div>

          {/* Table Body */}
          <div className="space-y-1.5">
            {displayPages.map((page, idx) => {
              const isTop = idx < 3;
              return (
                <div
                  key={page.page}
                  className={`group rounded-lg transition-colors ${isTop && !showAll ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
                >
                  {/* Desktop Row */}
                  <div className="hidden sm:grid sm:grid-cols-12 gap-2 items-center py-2 px-2">
                    <div className="col-span-1">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${isTop ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <div className="col-span-5">
                      <p className="text-xs font-medium text-gray-900 truncate">
                        {page.page === "/" ? "🏠 Home" : page.page}
                      </p>
                      {page.page_title && page.page_title !== page.page && (
                        <p className="text-[10px] text-gray-400 truncate">
                          {page.page_title}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-xs font-bold text-gray-900">
                        {page.views.toLocaleString()}
                      </span>
                      <div className="mt-1">
                        <ProgressBar
                          value={page.views}
                          maxValue={maxViews}
                          color={isTop ? COLORS.primary : "#D1D5DB"}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-xs font-semibold text-blue-600">
                        {page.unique_visitors}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span
                        className={`text-xs font-semibold ${page.bounce_rate > 70 ? "text-red-500" : page.bounce_rate > 40 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {page.bounce_rate}%
                      </span>
                    </div>
                  </div>

                  {/* Mobile Row */}
                  <div className="sm:hidden py-2 px-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${isTop ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {idx + 1}
                      </span>
                      <p className="flex-1 text-xs font-medium text-gray-900 truncate">
                        {page.page === "/" ? "🏠 Home" : page.page}
                      </p>
                      <span className="text-xs font-bold text-gray-700">
                        {page.views}
                      </span>
                    </div>
                    <div className="ml-7">
                      <ProgressBar
                        value={page.views}
                        maxValue={maxViews}
                        color={isTop ? COLORS.primary : "#D1D5DB"}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {pages.length > TOP_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-3 py-2.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              {showAll ? (
                <>
                  <ChevronUp size={14} />
                  Show Top {TOP_COUNT} Only
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show All {pages.length} Pages
                </>
              )}
            </button>
          )}
        </>
      ) : (
        <div className="h-[120px] flex items-center justify-center text-gray-400 text-xs">
          No data
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function InSightAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("today");
  const [refreshing, setRefreshing] = useState(false);

  const { data: realtimeData, loading: realtimeLoading } =
    useRealtimeUsers(10000);

  const fetchData = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/analytics?period=${period}`);
        const result = await res.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "Failed to load analytics");
        }
      } catch {
        setError("Connection error. Please try again.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [period],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    const interval = setInterval(() => fetchData(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const chartData =
    data?.daily.map((item) => ({
      ...item,
      dateFormatted: format(parseISO(item.date), "MMM dd"),
      visitors: Number(item.visitors),
      pageViews: Number(item.page_views),
    })) || [];

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-600 mt-3 font-medium text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] px-4">
        <BarChart3 className="w-12 h-12 text-red-300 mb-3" />
        <p className="text-red-600 font-medium mb-4 text-sm text-center">
          {error}
        </p>
        <button
          onClick={() => fetchData()}
          className="px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-xl sm:text-2xl">📊</span>
            InSight Analytics
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Real-time website statistics
          </p>
        </div>
        <PeriodSelector
          value={period}
          onChange={setPeriod}
          onRefresh={() => fetchData(true)}
          isRefreshing={refreshing}
        />
      </div>

      {/* REALTIME BANNER */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl sm:rounded-2xl p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            {realtimeData.active_now > 0 && (
              <>
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full" />
              </>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-lg sm:text-2xl font-bold">
                {realtimeLoading ? "..." : realtimeData.active_now}
              </p>
              <span className="text-sm sm:text-base font-medium">
                active {realtimeData.active_now === 1 ? "user" : "users"}
              </span>
              <InfoButton tooltipKey="realtime" variant="light" />
            </div>
            <p className="text-green-100 text-[11px] sm:text-sm">
              {realtimeData.last_30_min} in 30min • {realtimeData.today} today
            </p>
          </div>
        </div>
      </div>

      {/* OVERVIEW STATS */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        <StatCard
          title="Visitors"
          value={data.overview.totalVisitors}
          subtitle={`${data.overview.newVisitors} new`}
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          change={data.overview.visitorChange}
          tooltipKey="totalVisitors"
        />
        <StatCard
          title="Page Views"
          value={data.overview.totalPageViews}
          subtitle={`${data.overview.pagesPerSession}/session`}
          icon={Eye}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          change={data.overview.pageViewChange}
          tooltipKey="pageViews"
        />
        <StatCard
          title="Duration"
          value={formatDuration(data.overview.avgSessionDuration)}
          subtitle="avg. session"
          icon={Clock}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
          tooltipKey="avgDuration"
        />
        <StatCard
          title="Bounce"
          value={`${data.overview.bounceRate}%`}
          subtitle="single page"
          icon={MousePointer}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
          tooltipKey="bounceRate"
        />
      </div>
      
      {/* TRACKED PAGES SECTION */}
      {data.trackedPages && data.trackedPages.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-base sm:text-lg">🎯</span>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">
              Tracked Pages
            </h3>
          </div>
          <div className="space-y-3">
            {data.trackedPages.map((page) => (
              <TrackedPageCard key={page.path} page={page} />
            ))}
          </div>
        </div>
      )}

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Daily Visitors Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <SectionTitle emoji="📈" title="Visitors Trend" />
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="gradientVisitors"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS.primary}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradientPageViews"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={COLORS.success}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.success}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="dateFormatted"
                  stroke="#9CA3AF"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={28}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="Visitors"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  fill="url(#gradientVisitors)"
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="Page Views"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  fill="url(#gradientPageViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-gray-400 text-sm">
              No data available
            </div>
          )}
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <SectionTitle emoji="🖥️" title="Devices" tooltipKey="devices" />
          {data.devices.length > 0 ? (
            <div className="space-y-3">
              {data.devices.map((device, idx) => {
                const config =
                  DEVICE_CONFIG[device.device] || DEVICE_CONFIG.unknown;
                const Icon = config.icon;
                return (
                  <div key={device.device}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${config.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize text-xs sm:text-sm">
                            {device.device}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {device.visitors.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        {device.percentage}%
                      </span>
                    </div>
                    <ProgressBar
                      value={device.percentage}
                      maxValue={100}
                      color={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[150px] flex items-center justify-center text-gray-400 text-xs">
              No data
            </div>
          )}
        </div>
      </div>

      {/* TOP PAGES (FULL) & TRAFFIC SOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* All Pages Table */}
        <AllPagesTable pages={data.topPages} />

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <SectionTitle emoji="🌐" title="Traffic Sources" />
          {data.trafficSources.length > 0 ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie
                      data={data.trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="sessions"
                    >
                      {data.trafficSources.map((entry, idx) => {
                        const config =
                          TRAFFIC_CONFIG[entry.source] ||
                          TRAFFIC_CONFIG.unknown;
                        return <Cell key={idx} fill={config.color} />;
                      })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-0.5">
                {data.trafficSources.map((source) => {
                  const config =
                    TRAFFIC_CONFIG[source.source] || TRAFFIC_CONFIG.unknown;
                  return (
                    <TrafficSourceItem
                      key={source.source}
                      source={source}
                      config={config}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-[120px] flex items-center justify-center text-gray-400 text-xs">
              No data
            </div>
          )}
        </div>
      </div>

      {/* TOP COUNTRIES */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
        <SectionTitle emoji="🌍" title="Top Countries" tooltipKey="countries" />
        {data.countries.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {data.countries.slice(0, 8).map((country, idx) => (
              <div
                key={country.country_code}
                className={`p-2 sm:p-3 rounded-lg text-center ${idx === 0 ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" : "bg-gray-50"}`}
              >
                <div className="text-lg sm:text-2xl">
                  {COUNTRY_FLAGS[country.country_code] || "🌍"}
                </div>
                <p
                  className={`text-xs sm:text-sm font-bold ${idx === 0 ? "" : "text-gray-900"}`}
                >
                  {country.visitors}
                </p>
                <p
                  className={`text-[8px] sm:text-[10px] truncate ${idx === 0 ? "text-blue-100" : "text-gray-500"}`}
                >
                  {country.country}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[60px] flex items-center justify-center text-gray-400 text-xs">
            <Globe className="w-5 h-5 mr-1.5 opacity-50" />
            No data
          </div>
        )}
      </div>

      {/* VIDEO ANALYTICS */}
      {data.videos && data.videos.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <SectionTitle
            emoji="🎬"
            title="Video Performance"
            tooltipKey="videoStats"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.videos.map((video, idx) => (
              <div
                key={`${video.video_name}-${idx}`}
                className="bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs truncate">
                      {video.video_name}
                    </p>
                    <p className="text-[10px] text-gray-500">{video.section}</p>
                  </div>
                  <Play className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="text-center p-1.5 bg-white rounded">
                    <p className="text-sm font-bold text-gray-900">
                      {video.total_plays}
                    </p>
                    <p className="text-[8px] text-gray-500">Plays</p>
                  </div>
                  <div className="text-center p-1.5 bg-white rounded">
                    <p className="text-sm font-bold text-gray-900">
                      {video.unique_viewers}
                    </p>
                    <p className="text-[8px] text-gray-500">Views</p>
                  </div>
                  <div className="text-center p-1.5 bg-white rounded">
                    <p
                      className={`text-sm font-bold ${video.completion_rate >= 50 ? "text-green-600" : "text-orange-500"}`}
                    >
                      {video.completion_rate}%
                    </p>
                    <p className="text-[8px] text-gray-500">Done</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <p className="text-center text-[10px] sm:text-xs text-gray-400">
        Auto refresh 5min • Realtime updates every 10s •{" "}
        {format(new Date(), "HH:mm")}
      </p>
    </div>
  );
}
