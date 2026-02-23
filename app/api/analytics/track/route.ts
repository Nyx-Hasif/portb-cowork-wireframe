// 📁 app/api/analytics/track/route.ts
// REPLACE ENTIRE FILE

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ============================================
// HELPER FUNCTIONS
// ============================================
async function getClientIP(): Promise<string> {
    const headersList = await headers();
    return (
        headersList.get("cf-connecting-ip") ||
        headersList.get("x-real-ip") ||
        headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
    );
}

function parseUserAgent(ua: string) {
    const browser =
        ua.includes("Edg") ? "Edge" :
            ua.includes("Chrome") ? "Chrome" :
                ua.includes("Firefox") ? "Firefox" :
                    ua.includes("Safari") && !ua.includes("Chrome") ? "Safari" : "Other";

    const os =
        ua.includes("Windows") ? "Windows" :
            ua.includes("Mac") ? "macOS" :
                ua.includes("Android") ? "Android" :
                    ua.includes("iPhone") || ua.includes("iPad") ? "iOS" :
                        ua.includes("Linux") ? "Linux" : "Other";

    const device =
        ua.includes("Mobile") || (ua.includes("Android") && !ua.includes("Tablet")) ? "mobile" :
            ua.includes("iPad") || ua.includes("Tablet") ? "tablet" : "desktop";

    return { browser, os, device };
}

function parseTrafficSource(referrer: string, currentHost?: string): string {
    if (!referrer) return "direct";
    try {
        const host = new URL(referrer).hostname.toLowerCase();

        // Same domain = direct (internal navigation)
        if (currentHost && host === currentHost) return "direct";

        if (/google|bing|yahoo|duckduckgo|baidu/.test(host)) return "organic";
        if (/facebook|instagram|twitter|linkedin|tiktok|youtube|reddit|pinterest/.test(host)) return "social";
        if (/mail|outlook|gmail/.test(host)) return "email";
        return "referral";
    } catch {
        return "direct";
    }
}

function getReferrerDomain(referrer: string): string | null {
    if (!referrer) return null;
    try {
        return new URL(referrer).hostname;
    } catch {
        return null;
    }
}

async function getGeoFromIP(ip: string): Promise<{ country: string; countryCode: string; city: string | null; region: string | null }> {
    if (ip === "unknown" || ip.startsWith("127.") || ip.startsWith("192.168") || ip.startsWith("10.") || ip === "::1") {
        return { country: "Local", countryCode: "XX", city: null, region: null };
    }
    try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city,regionName`, {
            signal: AbortSignal.timeout(2000),
        });
        const data = await res.json();
        return {
            country: data.country || "Unknown",
            countryCode: data.countryCode || "XX",
            city: data.city || null,
            region: data.regionName || null,
        };
    } catch {
        return { country: "Unknown", countryCode: "XX", city: null, region: null };
    }
}

// ============================================
// MAIN HANDLER
// ============================================
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            event,
            page,
            title,
            referrer,
            visitorId,
            sessionId: existingSessionId,
            userAgent = "",
            screenWidth,
            screenHeight,
            timezone,
        } = body;

        // Validation
        if (!visitorId || !page) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const ip = await getClientIP();
        const { browser, os, device } = parseUserAgent(userAgent);
        const referrerDomain = getReferrerDomain(referrer || "");
        const trafficSource = parseTrafficSource(referrer || "", request.nextUrl.hostname);
        const geo = await getGeoFromIP(ip);

        let sessionId = existingSessionId;
        let isNewVisitor = false;
        let isNewSession = false;

        // ============================================
        // CHECK EXISTING SESSION
        // ============================================
        if (existingSessionId) {
            const { data: existingSession } = await supabase
                .from("analytics_sessions")
                .select("session_id, is_active, started_at")
                .eq("session_id", existingSessionId)
                .single();

            if (!existingSession) {
                // Session not found in DB, need new one
                sessionId = null;
            } else {
                // Session exists - update heartbeat and page count
                await supabase.rpc("update_session_heartbeat", {
                    p_session_id: existingSessionId,
                    p_page: page,
                });

                // Only increment page count for NEW page views (not heartbeats)
                if (event === "pageview") {
                    await supabase.rpc("increment_page_count", {
                        p_session_id: existingSessionId,
                    });
                }
            }
        }

        // ============================================
        // CREATE NEW SESSION IF NEEDED
        // ============================================
        if (!sessionId) {
            isNewSession = true;
            sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

            // Check if this visitor has ANY previous sessions (ever)
            const { count } = await supabase
                .from("analytics_sessions")
                .select("*", { count: "exact", head: true })
                .eq("visitor_id", visitorId);

            isNewVisitor = (count || 0) === 0;

            const { error: sessionError } = await supabase
                .from("analytics_sessions")
                .insert({
                    session_id: sessionId,
                    visitor_id: visitorId,
                    started_at: new Date().toISOString(),
                    last_activity_at: new Date().toISOString(),
                    last_heartbeat: new Date().toISOString(),
                    is_active: true,
                    duration_seconds: 0,
                    page_count: 1,
                    is_bounce: true,
                    entry_page: page,
                    exit_page: page,
                    device_type: device,
                    browser,
                    os,
                    country: geo.country,
                    country_code: geo.countryCode,
                    traffic_source: trafficSource,
                    referrer_domain: referrerDomain,
                });

            if (sessionError) {
                console.error("[Track] Session insert error:", sessionError);
                return NextResponse.json(
                    { success: false, error: sessionError.message },
                    { status: 500 }
                );
            }
        }

        // ============================================
        // RECORD PAGEVIEW
        // ============================================
        if (event === "pageview") {
            const { error: pvError } = await supabase
                .from("analytics_page_views")
                .insert({
                    page_path: page,
                    page_title: title || page,
                    visitor_id: visitorId,
                    session_id: sessionId,
                    is_new_visitor: isNewVisitor,
                    is_unique_today: isNewSession,
                    device_type: device,
                    browser,
                    os,
                    screen_width: screenWidth || null,
                    screen_height: screenHeight || null,
                    country: geo.country,
                    country_code: geo.countryCode,
                    city: geo.city,
                    region: geo.region,
                    timezone: timezone || null,
                    referrer: referrer || null,
                    referrer_domain: referrerDomain,
                    traffic_source: trafficSource,
                });

            if (pvError) {
                console.error("[Track] Pageview insert error:", pvError);
            }
        }

        return NextResponse.json({
            success: true,
            sessionId,
            visitorId,
            isNewVisitor,
            isNewSession,
        });
    } catch (error) {
        console.error("[Track] API error:", error);
        return NextResponse.json(
            { success: false, error: "Internal error" },
            { status: 500 }
        );
    }
}