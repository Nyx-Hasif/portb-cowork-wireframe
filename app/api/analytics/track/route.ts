// 📁 app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ============================================
// 🛡️ BOT PROTECTION LAYER
// ============================================

// Score 60+ = block, adjust kalau terlalu ketat/longgar
const BOT_SCORE_THRESHOLD = 60;

// In-memory request log (reset setiap Vercel cold start)
const visitorRequestLog = new Map<string, number[]>();

/**
 * Track berapa kali visitor hantar request dalam 30 saat
 * Bot biasa spam banyak request serentak
 */
function countRecentRequests(visitorId: string): number {
    const now = Date.now();
    const timestamps = visitorRequestLog.get(visitorId) || [];

    // Keep last 30 saat je
    const recent = timestamps.filter(t => now - t < 30_000);
    recent.push(now);
    visitorRequestLog.set(visitorId, recent);

    return recent.length;
}

/**
 * Cleanup stale entries — panggil setiap request
 * Elak memory leak kat Vercel
 */
function cleanupRequestLog() {
    const now = Date.now();
    for (const [key, timestamps] of visitorRequestLog.entries()) {
        const recent = timestamps.filter(t => now - t < 60_000);
        if (recent.length === 0) {
            visitorRequestLog.delete(key);
        } else {
            visitorRequestLog.set(key, recent);
        }
    }
}

/**
 * Kira bot score server-side
 * Gabungkan pelbagai signal untuk detect bot
 */
function calculateBotScore(
    req: NextRequest,
    ua: string,
    visitorId: string,
    geo: { isHosting: boolean; isProxy: boolean }
): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    // ── Signal 1: Datacenter/Hosting IP ──
    // Bot biasa run dari VPS (DigitalOcean, AWS, etc)
    // ip-api.com detect hosting = true
    if (geo.isHosting) {
        score += 30;
        reasons.push('datacenter-ip');
    }

    // ── Signal 2: Proxy/VPN IP ──
    // Kurang suspicious dari datacenter, tapi still flag
    if (geo.isProxy) {
        score += 10;
        reasons.push('proxy-ip');
    }

    // ── Signal 3: Rapid Requests ──
    // yhd4ldlif bot pattern: 3 session dalam 15 saat
    const recentCount = countRecentRequests(visitorId);
    if (recentCount >= 5) {
        score += 50;
        reasons.push('burst-5+');
    } else if (recentCount >= 3) {
        score += 35;
        reasons.push('rapid-3+');
    }

    // ── Signal 4: Missing sec-fetch headers ──
    // Browser sebenar SELALU hantar sec-fetch-mode untuk fetch()
    const secFetchMode = req.headers.get('sec-fetch-mode');
    if (!secFetchMode) {
        score += 15;
        reasons.push('no-sec-fetch');
    }

    // ── Signal 5: Cross-origin request ──
    // Tracker kita patut same-origin, kalau cross-origin = suspicious
    const secFetchSite = req.headers.get('sec-fetch-site');
    if (secFetchSite && secFetchSite !== 'same-origin') {
        score += 20;
        reasons.push('cross-origin');
    }

    // ── Signal 6: Missing accept-language ──
    // Browser sebenar selalu ada language setting
    if (!req.headers.get('accept-language')) {
        score += 10;
        reasons.push('no-lang');
    }

    return { score: Math.min(100, score), reasons };
}

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

// 🛡️ UPDATED: Sekarang return hosting/proxy info untuk bot detection
async function getGeoFromIP(ip: string): Promise<{
    country: string;
    countryCode: string;
    city: string | null;
    region: string | null;
    isHosting: boolean;
    isProxy: boolean;
}> {
    if (
        ip === "unknown" ||
        ip.startsWith("127.") ||
        ip.startsWith("192.168") ||
        ip.startsWith("10.") ||
        ip === "::1"
    ) {
        return {
            country: "Local",
            countryCode: "XX",
            city: null,
            region: null,
            isHosting: false,
            isProxy: false,
        };
    }

    try {
        // 🛡️ Tambah fields=hosting,proxy untuk detect datacenter IP
        const res = await fetch(
            `http://ip-api.com/json/${ip}?fields=country,countryCode,city,regionName,hosting,proxy`,
            { signal: AbortSignal.timeout(2000) }
        );
        const data = await res.json();
        return {
            country: data.country || "Unknown",
            countryCode: data.countryCode || "XX",
            city: data.city || null,
            region: data.regionName || null,
            isHosting: data.hosting || false,
            isProxy: data.proxy || false,
        };
    } catch {
        return {
            country: "Unknown",
            countryCode: "XX",
            city: null,
            region: null,
            isHosting: false,
            isProxy: false,
        };
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

        // ── Cleanup memory ──
        cleanupRequestLog();

        // ── Get IP & Geo (perlu untuk bot check) ──
        const ip = await getClientIP();
        const { browser, os, device } = parseUserAgent(userAgent);
        const referrerDomain = getReferrerDomain(referrer || "");
        const trafficSource = parseTrafficSource(
            referrer || "",
            request.nextUrl.hostname
        );
        const geo = await getGeoFromIP(ip);

        // =============================================
        // 🛡️ BOT CHECK — sebelum insert apa-apa ke DB
        // =============================================
        const { score: serverBotScore, reasons } = calculateBotScore(
            request,
            userAgent,
            visitorId,
            geo
        );

        // Client boleh hantar bot_score (kalau ada client-side detection)
        const clientBotScore = body.bot_score || 0;

        // Guna score tertinggi antara server & client
        const finalBotScore = Math.min(
            100,
            Math.max(serverBotScore, clientBotScore)
        );

        // ❌ BLOCK kalau score melebihi threshold
        if (finalBotScore >= BOT_SCORE_THRESHOLD) {
            console.log(
                `[Track] 🤖 Bot blocked | score=${finalBotScore} | reasons=${reasons.join(",")} | ip=${ip} | visitor=${visitorId}`
            );

            // Return 200 (bukan 403) supaya bot tak retry
            return NextResponse.json({
                success: true,
                tracked: false,
                reason: "bot-detected",
            });
        }

        // =============================================
        // SESSION LOGIC (existing, + bot_score)
        // =============================================
        let sessionId = existingSessionId;
        let isNewVisitor = false;
        let isNewSession = false;

        // Check existing session
        if (existingSessionId) {
            const { data: existingSession } = await supabase
                .from("analytics_sessions")
                .select("session_id, is_active, started_at")
                .eq("session_id", existingSessionId)
                .single();

            if (!existingSession) {
                sessionId = null;
            } else {
                await supabase.rpc("update_session_heartbeat", {
                    p_session_id: existingSessionId,
                    p_page: page,
                });

                if (event === "pageview") {
                    await supabase.rpc("increment_page_count", {
                        p_session_id: existingSessionId,
                    });
                }
            }
        }

        // Create new session if needed
        if (!sessionId) {
            isNewSession = true;
            sessionId = `s_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

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
                    // 🛡️ NEW: Store bot score
                    bot_score: finalBotScore,
                });

            if (sessionError) {
                console.error("[Track] Session insert error:", sessionError);
                return NextResponse.json(
                    { success: false, error: sessionError.message },
                    { status: 500 }
                );
            }
        }

        // Record pageview
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
                    // 🛡️ NEW: Store bot score
                    bot_score: finalBotScore,
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
            // 🛡️ Hantar balik untuk debugging (boleh buang later)
            botScore: finalBotScore,
        });
    } catch (error) {
        console.error("[Track] API error:", error);
        return NextResponse.json(
            { success: false, error: "Internal error" },
            { status: 500 }
        );
    }
}