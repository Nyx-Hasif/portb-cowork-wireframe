// 📁 lib/analytics.ts
import { createClient } from "@supabase/supabase-js";
import { UAParser } from "ua-parser-js";

// ============================================
// SUPABASE CLIENT
// ============================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// HELPER: Generate unique ID
// ============================================
const generateId = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

// ============================================
// HELPER: Get/Create Visitor ID (localStorage)
// ============================================
const getVisitorId = (): string => {
    if (typeof window === "undefined") return "";

    const STORAGE_KEY = "_vid";
    let visitorId = localStorage.getItem(STORAGE_KEY);

    if (!visitorId) {
        visitorId = generateId();
        localStorage.setItem(STORAGE_KEY, visitorId);
        sessionStorage.setItem("_is_new", "true");
    }

    return visitorId;
};

// ============================================
// HELPER: Get/Create Session ID (sessionStorage)
// ============================================
const getSessionId = (): string => {
    if (typeof window === "undefined") return "";

    const STORAGE_KEY = "_sid";
    let sessionId = sessionStorage.getItem(STORAGE_KEY);

    if (!sessionId) {
        sessionId = generateId();
        sessionStorage.setItem(STORAGE_KEY, sessionId);
    }

    return sessionId;
};

// ============================================
// HELPER: Check if new visitor
// ============================================
const isNewVisitor = (): boolean => {
    if (typeof window === "undefined") return false;
    const isNew = sessionStorage.getItem("_is_new") === "true";
    if (isNew) {
        sessionStorage.removeItem("_is_new");
    }
    return isNew;
};

// ============================================
// HELPER: Get Device Info
// ============================================
const getDeviceInfo = () => {
    if (typeof window === "undefined") {
        return {
            deviceType: "unknown",
            browser: "unknown",
            browserVersion: "",
            os: "unknown",
            osVersion: "",
            screenWidth: 0,
            screenHeight: 0,
        };
    }

    const parser = new UAParser();
    const result = parser.getResult();

    let deviceType = "desktop";
    const deviceTypeFromUA = result.device.type;

    if (deviceTypeFromUA === "mobile") {
        deviceType = "mobile";
    } else if (deviceTypeFromUA === "tablet") {
        deviceType = "tablet";
    } else if (window.innerWidth < 768) {
        deviceType = "mobile";
    } else if (window.innerWidth < 1024) {
        deviceType = "tablet";
    }

    return {
        deviceType,
        browser: result.browser.name || "unknown",
        browserVersion: result.browser.version || "",
        os: result.os.name || "unknown",
        osVersion: result.os.version || "",
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
    };
};

// ============================================
// HELPER: Get Traffic Source
// ============================================
const getTrafficSource = (): {
    source: string;
    referrer: string | null;
    referrerDomain: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
} => {
    if (typeof window === "undefined") {
        return {
            source: "direct",
            referrer: null,
            referrerDomain: null,
            utmSource: null,
            utmMedium: null,
            utmCampaign: null,
        };
    }

    const referrer = document.referrer || null;
    const urlParams = new URLSearchParams(window.location.search);

    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");

    let referrerDomain: string | null = null;
    if (referrer) {
        try {
            referrerDomain = new URL(referrer).hostname;
        } catch {
            referrerDomain = null;
        }
    }

    let source = "direct";

    if (utmSource) {
        if (utmMedium?.includes("cpc") || utmMedium?.includes("paid")) {
            source = "paid";
        } else if (utmMedium?.includes("email")) {
            source = "email";
        } else if (utmMedium?.includes("social")) {
            source = "social";
        } else {
            source = "referral";
        }
    } else if (referrerDomain) {
        if (referrerDomain === window.location.hostname) {
            source = "direct";
        } else if (/google|bing|yahoo|duckduckgo|baidu/.test(referrerDomain)) {
            source = "organic";
        } else if (/facebook|twitter|instagram|linkedin|tiktok|youtube/.test(referrerDomain)) {
            source = "social";
        } else {
            source = "referral";
        }
    }

    return {
        source,
        referrer,
        referrerDomain,
        utmSource,
        utmMedium,
        utmCampaign,
    };
};

// ============================================
// HELPER: Get Geolocation (FREE API)
// ============================================
interface GeoData {
    country: string | null;
    countryCode: string | null;
    city: string | null;
    region: string | null;
    timezone: string | null;
}

let cachedGeoData: GeoData | null = null;

const getGeolocation = async (): Promise<GeoData> => {
    if (cachedGeoData) return cachedGeoData;

    if (typeof window !== "undefined") {
        const cached = sessionStorage.getItem("_geo");
        if (cached) {
            cachedGeoData = JSON.parse(cached);
            return cachedGeoData!;
        }
    }

    try {
        const response = await fetch("https://ipapi.co/json/", {
            signal: AbortSignal.timeout(3000),
        });

        if (!response.ok) throw new Error("Geo API failed");

        const data = await response.json();

        cachedGeoData = {
            country: data.country_name || null,
            countryCode: data.country_code || null,
            city: data.city || null,
            region: data.region || null,
            timezone: data.timezone || null,
        };

        if (typeof window !== "undefined") {
            sessionStorage.setItem("_geo", JSON.stringify(cachedGeoData));
        }

        return cachedGeoData;
    } catch {
        return {
            country: null,
            countryCode: null,
            city: null,
            region: null,
            timezone: null,
        };
    }
};

// ============================================
// 📊 TRACK PAGE VIEW
// ============================================
export const trackPageView = async (
    pagePath?: string,
    pageTitle?: string
): Promise<void> => {
    if (typeof window === "undefined") return;

    try {
        const visitorId = getVisitorId();
        const sessionId = getSessionId();
        const deviceInfo = getDeviceInfo();
        const trafficInfo = getTrafficSource();
        const geoData = await getGeolocation();
        const isNew = isNewVisitor();

        // Insert page view
        const { error: pvError } = await supabase
            .from("analytics_page_views")
            .insert({
                page_path: pagePath || window.location.pathname,
                page_title: pageTitle || document.title || null,
                visitor_id: visitorId,
                session_id: sessionId,
                is_new_visitor: isNew,
                device_type: deviceInfo.deviceType,
                browser: deviceInfo.browser,
                browser_version: deviceInfo.browserVersion,
                os: deviceInfo.os,
                os_version: deviceInfo.osVersion,
                screen_width: deviceInfo.screenWidth,
                screen_height: deviceInfo.screenHeight,
                country: geoData.country,
                country_code: geoData.countryCode,
                city: geoData.city,
                region: geoData.region,
                timezone: geoData.timezone,
                referrer: trafficInfo.referrer,
                referrer_domain: trafficInfo.referrerDomain,
                utm_source: trafficInfo.utmSource,
                utm_medium: trafficInfo.utmMedium,
                utm_campaign: trafficInfo.utmCampaign,
                traffic_source: trafficInfo.source,
            });

        if (pvError) {
            console.error("Analytics page view error:", pvError);
            return;
        }

        // Update or create session
        const { data: existingSession } = await supabase
            .from("analytics_sessions")
            .select("page_count")
            .eq("session_id", sessionId)
            .single();

        if (existingSession) {
            await supabase
                .from("analytics_sessions")
                .update({
                    last_activity_at: new Date().toISOString(),
                    page_count: existingSession.page_count + 1,
                    is_bounce: false,
                    exit_page: pagePath || window.location.pathname,
                })
                .eq("session_id", sessionId);
        } else {
            await supabase.from("analytics_sessions").insert({
                session_id: sessionId,
                visitor_id: visitorId,
                entry_page: pagePath || window.location.pathname,
                exit_page: pagePath || window.location.pathname,
                device_type: deviceInfo.deviceType,
                browser: deviceInfo.browser,
                os: deviceInfo.os,
                country: geoData.country,
                country_code: geoData.countryCode,
                traffic_source: trafficInfo.source,
                referrer_domain: trafficInfo.referrerDomain,
            });
        }
    } catch (error) {
        console.error("Analytics tracking error:", error);
    }
};

// ============================================
// 🎬 TRACK VIDEO EVENT
// ============================================
export interface VideoEventParams {
    videoName: string;
    section: string;
    programSlug?: string;
    eventType: "play" | "pause" | "ended" | "progress" | "seeked";
    progressPercent?: number;
    currentTime?: number;
    duration?: number;
    videoUrl?: string;
}

export const trackVideoEvent = async (
    params: VideoEventParams
): Promise<void> => {
    if (typeof window === "undefined") return;

    try {
        const deviceInfo = getDeviceInfo();

        await supabase.from("analytics_video_events").insert({
            video_name: params.videoName,
            video_url: params.videoUrl || null,
            section: params.section,
            program_slug: params.programSlug || null,
            event_type: params.eventType,
            progress_percent: params.progressPercent || null,
            video_current_time: params.currentTime || null,
            duration: params.duration || null,
            visitor_id: getVisitorId(),
            session_id: getSessionId(),
            page_path: window.location.pathname,
            device_type: deviceInfo.deviceType,
        });
    } catch (error) {
        console.error("Video tracking error:", error);
    }
};

// ============================================
// SHORTHAND FUNCTIONS
// ============================================
export const trackVideoPlay = (
    videoName: string,
    section: string,
    programSlug?: string
) => {
    trackVideoEvent({ videoName, section, programSlug, eventType: "play" });
};

export const trackVideoPause = (
    videoName: string,
    section: string,
    currentTime?: number
) => {
    trackVideoEvent({ videoName, section, eventType: "pause", currentTime });
};

export const trackVideoEnded = (
    videoName: string,
    section: string,
    programSlug?: string
) => {
    trackVideoEvent({ videoName, section, programSlug, eventType: "ended" });
};

export const trackVideoProgress = (
    videoName: string,
    section: string,
    progressPercent: number,
    currentTime?: number
) => {
    trackVideoEvent({
        videoName,
        section,
        eventType: "progress",
        progressPercent,
        currentTime,
    });
};