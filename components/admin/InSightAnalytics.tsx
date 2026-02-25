// 📁 components/admin/InSightAnalytics.tsx
// REPLACE ENTIRE FILE

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  LineChart,
  Line,
} from "recharts";
import { format, parseISO, formatDistanceToNow } from "date-fns";
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
  Activity,
  CalendarDays,
  UserCheck,
  UserPlus,
  LogIn,
  LogOut,
  Circle,
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

interface SessionRecord {
  session_id: string;
  visitor_id: string;
  entry_page: string;
  exit_page: string;
  page_count: number;
  duration_seconds: number;
  is_active: boolean;
  is_bounce: boolean;
  device_type: string;
  browser: string;
  os: string;
  country: string;
  country_code: string;
  traffic_source: string;
  referrer_domain: string;
  started_at: string;
  ended_at: string | null;
  last_heartbeat: string;
}

interface AnalyticsData {
  period: string;
  isAllTime: boolean;
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
    daysTracking?: number;
    avgDailyVisitors?: number;
    firstVisit?: string;
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
  recentSessions: SessionRecord[];
  trackedPages: TrackedPage[];
}

// ============================================
// CONSTANTS
// ============================================
const PERIODS = [
  { value: "alltime", label: "⭐ All Time", shortLabel: "All" },
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

const TOOLTIP_CONTENT: Record<
  string,
  { title: string; description: string; example: string; tip: string }
> = {
  totalVisitors: {
    title: "Total Visitors",
    description: "Jumlah orang UNIK yang melawat website anda.",
    example: "1 orang visit 10 kali = tetap 1 visitor",
    tip: "✅ Lebih tinggi = lebih bagus!",
  },
  pageViews: {
    title: "Page Views",
    description: "Jumlah TOTAL halaman yang dibuka.",
    example: "1 visitor buka 5 pages = 5 page views",
    tip: "📊 Bandingkan dengan visitors",
  },
  avgDuration: {
    title: "Average Duration",
    description: "Purata masa visitor di website.",
    example: "A: 5min, B: 3min → Avg = 4min",
    tip: "✅ >2min = Bagus!\n❌ <30s = Improve",
  },
  bounceRate: {
    title: "Bounce Rate",
    description: "% visitor keluar selepas 1 page.",
    example: "100 visitors, 40 keluar = 40%",
    tip: "✅ <40% Bagus\n⚠️ 40-60% Okay\n❌ >70% Improve",
  },
  trafficDirect: {
    title: "Direct",
    description: "Taip URL terus.",
    example: "Taip domain direct",
    tip: "💡 Brand awareness!",
  },
  trafficOrganic: {
    title: "Organic",
    description: "Dari Google search.",
    example: "Search → click",
    tip: "💡 SEO bagus!",
  },
  trafficReferral: {
    title: "Referral",
    description: "Link dari website lain.",
    example: "Blog mention anda",
    tip: "💡 Partnerships",
  },
  trafficSocial: {
    title: "Social",
    description: "Dari social media.",
    example: "Click link di IG",
    tip: "💡 Social marketing!",
  },
  trafficPaid: {
    title: "Paid",
    description: "Iklan berbayar.",
    example: "Google/FB Ads",
    tip: "💡 Track ROI",
  },
  trafficEmail: {
    title: "Email",
    description: "Dari email.",
    example: "Newsletter click",
    tip: "💡 Email marketing",
  },
  devices: {
    title: "Devices",
    description: "Jenis peranti visitors.",
    example: "Desktop, Mobile, Tablet",
    tip: "💡 Mobile tinggi = pastikan responsive!",
  },
  countries: {
    title: "Countries",
    description: "Negara asal visitors.",
    example: "🇲🇾 MY 80%",
    tip: "💡 Target marketing",
  },
  realtime: {
    title: "Realtime",
    description: "Visitors SEKARANG di website.",
    example: "Active = dalam 1 minit",
    tip: "💡 Update setiap 10s",
  },
  sessionHistory: {
    title: "Session History",
    description:
      "Rekod setiap visitor yang masuk & keluar website anda secara real-time.",
    example:
      "🟢 LIVE = Visitor sedang online sekarang\n⚫ Gray = Visitor dah keluar\n\n📍 Entry page = Halaman pertama visitor masuk\n📍 Exit page = Halaman terakhir sebelum keluar\n\n⏱️ Duration = Berapa lama visitor berada di website\n📄 Pages = Berapa halaman yang dilawati",
    tip: "💡 Gunakan info ini untuk:\n• Lihat flow visitor (masuk dari mana, keluar dari mana)\n• Monitor real-time siapa yang online\n• Detect visitor yang bounce (1 page only)\n• Faham behavior visitor dari device & country",
  },
};

// ============================================
// HELPERS
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

const shortenVisitorId = (id: string): string => {
  if (!id) return "—";
  return id.length > 12 ? `${id.substring(0, 8)}...` : id;
};

// ============================================
// TOOLTIP MODAL
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
      <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info size={18} className="text-blue-400" />
            </div>
            <h4 className="font-bold text-lg">{content.title}</h4>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-gray-300 text-sm">{content.description}</p>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-[11px] text-gray-400 uppercase font-bold mb-1">
              📌 Contoh:
            </p>
            <p className="text-sm text-gray-200 whitespace-pre-line">
              {content.example}
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
            <p className="text-[11px] text-yellow-400 uppercase font-bold mb-1">
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
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold"
          >
            Faham! 👍
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// REUSABLE COMPONENTS
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
        className={`p-1 rounded-full transition-all flex-shrink-0 ${variant === "light" ? "text-white/70 hover:text-white hover:bg-white/20" : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"}`}
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

const ProgressBar = ({
  value,
  maxValue,
  color = COLORS.primary,
}: {
  value: number;
  maxValue: number;
  color?: string;
}) => (
  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-500"
      style={{
        width: `${Math.min(maxValue > 0 ? (value / maxValue) * 100 : 0, 100)}%`,
        backgroundColor: color,
      }}
    />
  </div>
);

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
// CHART LEGEND
// ============================================
const ChartLegend = ({
  items,
}: {
  items: Array<{ color: string; label: string }>;
}) => (
  <div className="flex items-center gap-4 mb-3">
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-1.5">
        <div
          className="w-3 h-[3px] rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-[10px] font-medium text-gray-600">
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

// ============================================
// PERIOD SELECTOR
// ============================================
const PeriodSelector = ({
  value,
  onChange,
  onRefresh,
  isRefreshing,
  lastUpdate,
}: {
  value: string;
  onChange: (v: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdate: Date | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = PERIODS.find((p) => p.value === value);

  return (
    <div className="flex items-center gap-2">
      {lastUpdate && (
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-400">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          {format(lastUpdate, "HH:mm:ss")}
        </div>
      )}

      <div className="relative sm:hidden flex-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700"
        >
          <span>{current?.label}</span>
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
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
              {PERIODS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => {
                    onChange(p.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    value === p.value
                      ? p.value === "alltime"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
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
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              value === p.value
                ? p.value === "alltime"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm"
                  : "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
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
// TOTAL VISITOR BANNER
// ============================================
const TotalVisitorBanner = ({ data }: { data: AnalyticsData }) => (
  <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <Users className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <div>
          <p className="text-blue-200 text-xs sm:text-sm font-medium">
            {data.isAllTime ? "All Time Visitors" : "Total Visitors"}
          </p>
          <p className="text-3xl sm:text-4xl font-black tracking-tight">
            {data.overview.totalVisitors.toLocaleString()}
          </p>
          {data.overview.visitorChange !== 0 && !data.isAllTime && (
            <div
              className={`flex items-center gap-1 mt-1 text-xs ${data.overview.visitorChange >= 0 ? "text-green-300" : "text-red-300"}`}
            >
              {data.overview.visitorChange >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
                {data.overview.visitorChange >= 0 ? "+" : ""}
                {data.overview.visitorChange.toFixed(1)}% vs prev
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="text-center p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <UserPlus className="w-4 h-4 mx-auto mb-1 text-green-300" />
          <p className="text-lg sm:text-xl font-bold">
            {data.overview.newVisitors.toLocaleString()}
          </p>
          <p className="text-[9px] sm:text-[10px] text-blue-200">New</p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <UserCheck className="w-4 h-4 mx-auto mb-1 text-yellow-300" />
          <p className="text-lg sm:text-xl font-bold">
            {data.overview.returningVisitors.toLocaleString()}
          </p>
          <p className="text-[9px] sm:text-[10px] text-blue-200">Returning</p>
        </div>
        <div className="text-center p-2 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
          <Activity className="w-4 h-4 mx-auto mb-1 text-cyan-300" />
          <p className="text-lg sm:text-xl font-bold">
            {data.overview.totalSessions.toLocaleString()}
          </p>
          <p className="text-[9px] sm:text-[10px] text-blue-200">Sessions</p>
        </div>
      </div>
    </div>
    {data.isAllTime && data.overview.daysTracking && (
      <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap gap-4 text-xs text-blue-200">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>
            Tracking{" "}
            <strong className="text-white">
              {data.overview.daysTracking} days
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>
            Avg{" "}
            <strong className="text-white">
              {data.overview.avgDailyVisitors}/day
            </strong>
          </span>
        </div>
        {data.overview.firstVisit && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              Since{" "}
              <strong className="text-white">
                {format(parseISO(data.overview.firstVisit), "dd MMM yyyy")}
              </strong>
            </span>
          </div>
        )}
      </div>
    )}
  </div>
);

// ============================================
// SESSION HISTORY (Fixed height + internal scroll)
// ============================================
const SessionHistory = ({ sessions }: { sessions: SessionRecord[] }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [hiddenCount, setHiddenCount] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const visibleSessions = sessions.slice(0, sessions.length - hiddenCount);
    const newSinceHide = isHidden ? Math.max(sessions.length - hiddenCount, 0) : 0;

    const handleClearVisual = () => {
        setHiddenCount(sessions.length);
        setIsHidden(true);
    };

    const handleShowBack = () => {
        setHiddenCount(0);
        setIsHidden(false);
    };

    // Auto-scroll to top when new session arrives
    useEffect(() => {
        if (scrollRef.current && !isHidden) {
            scrollRef.current.scrollTop = 0;
        }
    }, [sessions.length, isHidden]);

    if (sessions.length === 0) return null;

    const activeCount = visibleSessions.filter(s => s.is_active).length;
    const endedCount = visibleSessions.filter(s => !s.is_active).length;

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">📋</span>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900">Session History</h3>
                    <InfoButton tooltipKey="sessionHistory" />
                </div>

                <div className="flex items-center gap-2">
                    {isHidden && (
                        <button onClick={handleShowBack}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye size={12} /> Show All
                        </button>
                    )}
                    {visibleSessions.length > 0 && (
                        <button onClick={handleClearVisual}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Clear from view only — database stays safe!">
                            <X size={12} /> Clear View
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Stats Bar */}
            {visibleSessions.length > 0 && (
                <div className="flex items-center gap-3 mb-3 text-[11px]">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">Total:</span>
                        <span className="font-bold text-gray-900">{visibleSessions.length}</span>
                    </div>
                    {activeCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-bold text-green-700">{activeCount} Live</span>
                        </div>
                    )}
                    {endedCount > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                            <span className="font-bold text-gray-500">{endedCount} Ended</span>
                        </div>
                    )}
                </div>
            )}

            {/* Hidden State */}
            {isHidden && visibleSessions.length === 0 && (
                <div className="py-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">View cleared</p>
                    <p className="text-[11px] text-gray-400 mb-3">
                        Database selamat ✅
                        {newSinceHide > 0 && (
                            <span className="text-blue-500 font-medium"> • {newSinceHide} new</span>
                        )}
                    </p>
                    <button onClick={handleShowBack}
                        className="px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                        Show All Sessions
                    </button>
                </div>
            )}

            {/* Scrollable Session List — MAX HEIGHT FIXED */}
            {visibleSessions.length > 0 && (
                <div
                    ref={scrollRef}
                    className="max-h-[400px] overflow-y-auto space-y-2 pr-1 scrollbar-thin"
                    style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#D1D5DB transparent",
                    }}
                >
                    {visibleSessions.map((session) => {
                        const deviceConfig = DEVICE_CONFIG[session.device_type] || DEVICE_CONFIG.unknown;
                        const DeviceIcon = deviceConfig.icon;
                        const flag = COUNTRY_FLAGS[session.country_code] || "🌍";

                        return (
                            <div key={session.session_id}
                                className={`p-3 rounded-xl border transition-all ${session.is_active
                                    ? "border-green-200 bg-green-50/50"
                                    : "border-gray-100 bg-gray-50/50 hover:bg-gray-50"}`}>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <div className="flex-shrink-0">
                                            {session.is_active ? (
                                                <div className="relative">
                                                    <Circle className="w-3 h-3 fill-green-500 text-green-500" />
                                                    <Circle className="w-3 h-3 fill-green-500 text-green-500 absolute inset-0 animate-ping opacity-50" />
                                                </div>
                                            ) : (
                                                <Circle className="w-3 h-3 fill-gray-300 text-gray-300" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className="text-xs font-mono text-gray-600">{shortenVisitorId(session.visitor_id)}</span>
                                                <span className="text-sm">{flag}</span>
                                                <DeviceIcon className={`w-3 h-3 ${deviceConfig.color}`} />
                                                <span className="text-[10px] text-gray-400">{session.browser}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500">
                                                <LogIn className="w-2.5 h-2.5 text-green-500" />
                                                <span className="truncate max-w-[120px]">{session.entry_page}</span>
                                                {session.exit_page && session.exit_page !== session.entry_page && (
                                                    <>
                                                        <ArrowRight className="w-2.5 h-2.5" />
                                                        <LogOut className="w-2.5 h-2.5 text-red-400" />
                                                        <span className="truncate max-w-[120px]">{session.exit_page}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-gray-900">
                                                {formatDuration(session.is_active
                                                    ? Math.floor((Date.now() - new Date(session.started_at).getTime()) / 1000)
                                                    : session.duration_seconds)}
                                            </p>
                                            <p className="text-[9px] text-gray-400">{session.page_count} {session.page_count === 1 ? "page" : "pages"}</p>
                                        </div>
                                        <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${session.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            {session.is_active ? "LIVE" : formatDistanceToNow(parseISO(session.started_at), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Scroll hint */}
            {visibleSessions.length > 6 && (
                <div className="mt-2 text-center">
                    <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                        <ChevronDown size={10} className="animate-bounce" />
                        Scroll to see more
                    </p>
                </div>
            )}
        </div>
    );
};

// ============================================
// TRACKED PAGE CARD (Line Chart with Legend)
// ============================================
const TrackedPageCard = ({ page }: { page: TrackedPage }) => {
  const [expanded, setExpanded] = useState(false);
  const analytics = page.analytics;
  if (!analytics) return null;

  const chartData =
    analytics.daily_views?.map(
      (item: { date: string; views: number; visitors: number }) => ({
        ...item,
        dateFormatted: format(parseISO(item.date), "MMM dd"),
      }),
    ) || [];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
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
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                {page.label}
              </h4>
              <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                <ExternalLink size={10} />
                {page.path}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {analytics.total_views}
                </p>
                <p className="text-[10px] text-gray-500">Views</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">
                  {analytics.unique_visitors}
                </p>
                <p className="text-[10px] text-gray-500">Visitors</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">
                  {formatDuration(analytics.avg_duration)}
                </p>
                <p className="text-[10px] text-gray-500">Avg Time</p>
              </div>
            </div>
            {expanded ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </div>
        </div>
        <div className="sm:hidden grid grid-cols-3 gap-2 mt-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-bold text-gray-900">
              {analytics.total_views}
            </p>
            <p className="text-[9px] text-gray-500">Views</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-sm font-bold text-blue-600">
              {analytics.unique_visitors}
            </p>
            <p className="text-[9px] text-gray-500">Visitors</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <p className="text-sm font-bold text-green-600">
              {formatDuration(analytics.avg_duration)}
            </p>
            <p className="text-[9px] text-gray-500">Avg Time</p>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 p-4 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 rounded-xl text-center">
              <Eye className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-700">
                {analytics.total_views}
              </p>
              <p className="text-[10px] text-blue-500">Total Views</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-center">
              <Users className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-700">
                {analytics.unique_visitors}
              </p>
              <p className="text-[10px] text-green-500">Unique Visitors</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-center">
              <Clock className="w-4 h-4 text-purple-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-purple-700">
                {formatDuration(analytics.avg_duration)}
              </p>
              <p className="text-[10px] text-purple-500">Avg Duration</p>
            </div>
          </div>

          {/* Line Chart with Legend */}
          {chartData.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <TrendingUp size={12} /> Daily Trend
              </p>
              <ChartLegend
                items={[
                  { color: COLORS.purple, label: "Views" },
                  { color: COLORS.primary, label: "Visitors" },
                ]}
              />
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="dateFormatted"
                    stroke="#9CA3AF"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    width={25}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#FFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      fontSize: "11px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    name="Views"
                    stroke={COLORS.purple}
                    strokeWidth={2}
                    dot={{ r: 3, fill: COLORS.purple }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    name="Visitors"
                    stroke={COLORS.primary}
                    strokeWidth={2}
                    dot={{ r: 3, fill: COLORS.primary }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analytics.traffic_sources?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Globe size={12} /> Traffic Sources
                </p>
                <div className="space-y-1.5">
                  {analytics.traffic_sources.map(
                    (s: {
                      source: string;
                      visitors: number;
                      percentage: number;
                    }) => {
                      const cfg =
                        TRAFFIC_CONFIG[s.source] || TRAFFIC_CONFIG.unknown;
                      const Icon = cfg.icon;
                      return (
                        <div
                          key={s.source}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: cfg.color }}
                            />
                            <Icon className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-700">
                              {cfg.label}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-gray-900">
                            {s.percentage}%
                          </span>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
            {analytics.referrers?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <ArrowRight size={12} /> Referrers
                </p>
                <div className="space-y-1.5">
                  {analytics.referrers.map(
                    (r: {
                      domain: string;
                      visitors: number;
                      views: number;
                    }) => (
                      <div
                        key={r.domain}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-xs text-gray-700 truncate flex-1">
                          {r.domain}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {r.visitors}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {analytics.devices?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Monitor size={12} /> Devices
                </p>
                <div className="flex gap-2">
                  {analytics.devices.map(
                    (d: {
                      device: string;
                      visitors: number;
                      percentage: number;
                    }) => {
                      const cfg =
                        DEVICE_CONFIG[d.device] || DEVICE_CONFIG.unknown;
                      const DIcon = cfg.icon;
                      return (
                        <div
                          key={d.device}
                          className="flex-1 p-2 bg-gray-50 rounded-lg text-center"
                        >
                          <DIcon
                            className={`w-4 h-4 mx-auto mb-1 ${cfg.color}`}
                          />
                          <p className="text-sm font-bold text-gray-900">
                            {d.percentage}%
                          </p>
                          <p className="text-[9px] text-gray-500 capitalize">
                            {d.device}
                          </p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
            {analytics.countries?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <Globe size={12} /> Countries
                </p>
                <div className="flex flex-wrap gap-2">
                  {analytics.countries.map(
                    (c: {
                      country: string;
                      country_code: string;
                      visitors: number;
                    }) => (
                      <div
                        key={c.country_code}
                        className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm">
                          {COUNTRY_FLAGS[c.country_code] || "🌍"}
                        </span>
                        <span className="text-xs text-gray-700">
                          {c.country}
                        </span>
                        <span className="text-xs font-bold text-gray-900">
                          {c.visitors}
                        </span>
                      </div>
                    ),
                  )}
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
// ALL PAGES TABLE
// ============================================
const AllPagesTable = ({
  pages,
}: {
  pages: Array<{
    page: string;
    page_title: string;
    views: number;
    unique_visitors: number;
  }>;
}) => {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? pages : pages.slice(0, 5);
  const maxViews = pages[0]?.views || 1;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
      <SectionTitle emoji="📄" title={`All Pages (${pages.length})`} />
      {pages.length > 0 ? (
        <>
          <div className="space-y-1.5">
            {display.map((page, idx) => (
              <div
                key={page.page}
                className={`rounded-lg ${idx < 3 && !showAll ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
              >
                <div className="py-2 px-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${idx < 3 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
                    >
                      {idx + 1}
                    </span>
                    <p className="flex-1 text-xs font-medium text-gray-900 truncate">
                      {page.page === "/" ? "🏠 Home" : page.page}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-blue-500">
                        {page.unique_visitors} visitors
                      </span>
                      <span className="text-xs font-bold text-gray-700">
                        {page.views} views
                      </span>
                    </div>
                  </div>
                  <div className="ml-7">
                    <ProgressBar
                      value={page.views}
                      maxValue={maxViews}
                      color={idx < 3 ? COLORS.primary : "#D1D5DB"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pages.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-3 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl flex items-center justify-center gap-1.5"
            >
              {showAll ? (
                <>
                  <ChevronUp size={14} /> Top 5
                </>
              ) : (
                <>
                  <ChevronDown size={14} /> All {pages.length}
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
// MAIN COMPONENT
// ============================================
export default function InSightAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("alltime");
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const fetchCountRef = useRef(0);

  const { data: realtimeData, loading: realtimeLoading } =
    useRealtimeUsers(10000);

  const fetchData = useCallback(
    async (showRefresh = false) => {
      const fetchId = ++fetchCountRef.current;
      if (showRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/analytics?period=${period}`);
        const result = await res.json();
        if (fetchId !== fetchCountRef.current) return;
        if (result.success) {
          setData(result.data);
          setLastUpdate(new Date());
        } else {
          setError(result.error || "Failed to load");
        }
      } catch {
        if (fetchId === fetchCountRef.current) setError("Connection error");
      } finally {
        if (fetchId === fetchCountRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [period],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    const interval = setInterval(() => fetchData(true), 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-600 mt-3 font-medium text-sm">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
        <BarChart3 className="w-12 h-12 text-red-300 mb-3" />
        <p className="text-red-600 font-medium mb-4 text-sm text-center">
          {error}
        </p>
        <button
          onClick={() => fetchData()}
          className="px-5 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) return null;

  const chartData = data.daily.map((item) => ({
    dateFormatted: format(parseISO(item.date), "MMM dd"),
    visitors: Number(item.visitors),
    pageViews: Number(item.page_views),
    newVisitors: Number(item.new_visitors),
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-xl sm:text-2xl">📊</span>InSight Analytics
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            {data.isAllTime ? "All time overview" : "Real-time statistics"}
          </p>
        </div>
        <PeriodSelector
          value={period}
          onChange={setPeriod}
          onRefresh={() => fetchData(true)}
          isRefreshing={refreshing}
          lastUpdate={lastUpdate}
        />
      </div>

      {/* REALTIME */}
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

      {/* TOTAL VISITOR BANNER */}
      <TotalVisitorBanner data={data} />

      {/* STATS */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        <StatCard
          title="Page Views"
          value={data.overview.totalPageViews}
          subtitle={`${data.overview.pagesPerSession}/session`}
          icon={Eye}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          change={data.isAllTime ? undefined : data.overview.pageViewChange}
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
        <StatCard
          title="Sessions"
          value={data.overview.totalSessions}
          subtitle={
            data.isAllTime ? `${data.overview.daysTracking || 0} days` : "total"
          }
          icon={Activity}
          iconBg="bg-cyan-100"
          iconColor="text-cyan-600"
        />
      </div>

      {/* TRACKED PAGES */}
      {data.trackedPages?.length > 0 && (
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

      {/* CHART + DEVICES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Daily Visitor Trend with Legend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <SectionTitle emoji="📈" title="Daily Visitor Trend" />
          <ChartLegend
            items={[
              { color: COLORS.primary, label: "Visitors" },
              { color: COLORS.success, label: "Page Views" },
              { color: COLORS.purple, label: "New Visitors" },
            ]}
          />
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
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
                  <linearGradient id="gPV" x1="0" y1="0" x2="0" y2="1">
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
                  <linearGradient id="gNV" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={COLORS.purple}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={COLORS.purple}
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
                  fill="url(#gV)"
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="Page Views"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  fill="url(#gPV)"
                />
                <Area
                  type="monotone"
                  dataKey="newVisitors"
                  name="New Visitors"
                  stroke={COLORS.purple}
                  strokeWidth={2}
                  fill="url(#gNV)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[240px] flex items-center justify-center text-gray-400 text-sm">
              No data
            </div>
          )}
        </div>

        {/* Devices */}
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

      {/* PAGES + TRAFFIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AllPagesTable pages={data.topPages} />
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
                      {data.trafficSources.map((e, i) => (
                        <Cell
                          key={i}
                          fill={
                            (TRAFFIC_CONFIG[e.source] || TRAFFIC_CONFIG.unknown)
                              .color
                          }
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-0.5">
                {data.trafficSources.map((s) => (
                  <TrafficSourceItem
                    key={s.source}
                    source={s}
                    config={TRAFFIC_CONFIG[s.source] || TRAFFIC_CONFIG.unknown}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[120px] flex items-center justify-center text-gray-400 text-xs">
              No data
            </div>
          )}
        </div>
      </div>

      {/* COUNTRIES */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
        <SectionTitle emoji="🌍" title="Top Countries" tooltipKey="countries" />
        {data.countries.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {data.countries.slice(0, 8).map((c, idx) => (
              <div
                key={c.country_code}
                className={`p-2 sm:p-3 rounded-lg text-center ${idx === 0 ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" : "bg-gray-50"}`}
              >
                <div className="text-lg sm:text-2xl">
                  {COUNTRY_FLAGS[c.country_code] || "🌍"}
                </div>
                <p
                  className={`text-xs sm:text-sm font-bold ${idx === 0 ? "" : "text-gray-900"}`}
                >
                  {c.visitors}
                </p>
                <p
                  className={`text-[8px] sm:text-[10px] truncate ${idx === 0 ? "text-blue-100" : "text-gray-500"}`}
                >
                  {c.country}
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

      {/* SESSION HISTORY */}
      <SessionHistory sessions={data.recentSessions || []} />

      {/* VIDEOS */}
      {data.videos?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5">
          <SectionTitle emoji="🎬" title="Video Performance" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.videos.map((v, i) => (
              <div
                key={`${v.video_name}-${i}`}
                className="bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs truncate">
                      {v.video_name}
                    </p>
                    <p className="text-[10px] text-gray-500">{v.section}</p>
                  </div>
                  <Play className="w-4 h-4 text-gray-400" />
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <div className="text-center p-1.5 bg-white rounded">
                    <p className="text-sm font-bold text-gray-900">
                      {v.total_plays}
                    </p>
                    <p className="text-[8px] text-gray-500">Plays</p>
                  </div>
                  <div className="text-center p-1.5 bg-white rounded">
                    <p className="text-sm font-bold text-gray-900">
                      {v.unique_viewers}
                    </p>
                    <p className="text-[8px] text-gray-500">Views</p>
                  </div>
                  <div className="text-center p-1.5 bg-white rounded">
                    <p
                      className={`text-sm font-bold ${v.completion_rate >= 50 ? "text-green-600" : "text-orange-500"}`}
                    >
                      {v.completion_rate}%
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
        Auto refresh 2min • Realtime every 10s •{" "}
        {format(new Date(), "HH:mm:ss")}
      </p>
    </div>
  );
}
