// 📁 app/api/analytics/route.ts
// REPLACE ENTIRE FILE

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Period = "alltime" | "today" | "yesterday" | "7days" | "14days" | "30days" | "3months" | "6months" | "1year";

const TRACKED_PAGES = [
    { path: "/program/herhour", label: "HerHour Program" },
];

function getDateRange(period: Period): { start: Date; end: Date } | null {
    if (period === "alltime") return null;

    const now = new Date();
    const end = new Date(now);
    const start = new Date(now);

    end.setHours(23, 59, 59, 999);

    switch (period) {
        case "today":
            start.setHours(0, 0, 0, 0);
            break;
        case "yesterday":
            start.setDate(start.getDate() - 1);
            start.setHours(0, 0, 0, 0);
            end.setDate(end.getDate() - 1);
            end.setHours(23, 59, 59, 999);
            break;
        case "7days":
            start.setDate(start.getDate() - 6);
            start.setHours(0, 0, 0, 0);
            break;
        case "14days":
            start.setDate(start.getDate() - 13);
            start.setHours(0, 0, 0, 0);
            break;
        case "30days":
            start.setDate(start.getDate() - 29);
            start.setHours(0, 0, 0, 0);
            break;
        case "3months":
            start.setMonth(start.getMonth() - 3);
            start.setHours(0, 0, 0, 0);
            break;
        case "6months":
            start.setMonth(start.getMonth() - 6);
            start.setHours(0, 0, 0, 0);
            break;
        case "1year":
            start.setFullYear(start.getFullYear() - 1);
            start.setHours(0, 0, 0, 0);
            break;
    }

    return { start, end };
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const period = (searchParams.get("period") || "alltime") as Period;

        // ============================================
        // ALL TIME MODE
        // ============================================
        if (period === "alltime") {
            const [
                alltimeStats,
                alltimeDaily,
                alltimeDevices,
                alltimeTraffic,
                alltimeCountries,
                alltimePages,
                recentSessions,
                realtimeResult,
                ...trackedResults
            ] = await Promise.all([
                supabase.rpc("get_alltime_stats"),
                supabase.rpc("get_alltime_daily"),
                supabase.rpc("get_alltime_devices"),
                supabase.rpc("get_alltime_traffic"),
                supabase.rpc("get_alltime_countries", { limit_count: 8 }),
                supabase.rpc("get_alltime_pages", { limit_count: 100 }),
                supabase.rpc("get_recent_sessions", { limit_count: 30 }),
                supabase.rpc("get_realtime_analytics"),
                ...TRACKED_PAGES.map((page) =>
                    supabase.rpc("get_page_detail_analytics", {
                        start_date: "2020-01-01T00:00:00.000Z",
                        end_date: new Date().toISOString(),
                        target_page: page.path,
                    })
                ),
            ]);

            const stats = alltimeStats.data || {};
            const trackedPagesData = TRACKED_PAGES.map((page, i) => ({
                ...page,
                analytics: trackedResults[i]?.data || null,
            }));

            return NextResponse.json({
                success: true,
                data: {
                    period: "alltime",
                    isAllTime: true,
                    dateRange: {
                        start: stats.first_visit || new Date().toISOString(),
                        end: new Date().toISOString(),
                    },
                    overview: {
                        totalVisitors: stats.total_visitors || 0,
                        newVisitors: stats.total_new_visitors || 0,
                        returningVisitors: (stats.total_visitors || 0) - (stats.total_new_visitors || 0),
                        totalSessions: stats.total_sessions || 0,
                        totalPageViews: stats.total_page_views || 0,
                        pagesPerSession: stats.avg_pages_per_session || 0,
                        avgSessionDuration: stats.avg_session_duration || 0,
                        bounceRate: stats.bounce_rate || 0,
                        visitorChange: 0,
                        pageViewChange: 0,
                        daysTracking: stats.days_tracking || 1,
                        avgDailyVisitors: stats.avg_daily_visitors || 0,
                        firstVisit: stats.first_visit || null,
                    },
                    daily: alltimeDaily.data || [],
                    topPages: alltimePages.data || [],
                    devices: alltimeDevices.data || [],
                    browsers: [],
                    trafficSources: alltimeTraffic.data || [],
                    countries: alltimeCountries.data || [],
                    videos: [],
                    realtime: realtimeResult.data || {
                        active_now: 0, last_30_min: 0, last_hour: 0, today: 0, active_pages: [],
                    },
                    recentSessions: recentSessions.data || [],
                    trackedPages: trackedPagesData,
                },
            });
        }

        // ============================================
        // PERIOD MODE
        // ============================================
        const dateRange = getDateRange(period)!;
        const startISO = dateRange.start.toISOString();
        const endISO = dateRange.end.toISOString();

        const [
            overviewResult,
            dailyResult,
            topPagesResult,
            deviceResult,
            browserResult,
            trafficResult,
            countriesResult,
            videoResult,
            realtimeResult,
            recentSessions,
            ...trackedPagesResults
        ] = await Promise.all([
            supabase.rpc("get_analytics_overview", { start_date: startISO, end_date: endISO }),
            supabase.rpc("get_daily_analytics", { start_date: startISO, end_date: endISO }),
            supabase.rpc("get_top_pages", { start_date: startISO, end_date: endISO, limit_count: 100 }),
            supabase.rpc("get_device_analytics", { start_date: startISO, end_date: endISO }),
            supabase.rpc("get_browser_analytics", { start_date: startISO, end_date: endISO, limit_count: 5 }),
            supabase.rpc("get_traffic_sources", { start_date: startISO, end_date: endISO }),
            supabase.rpc("get_top_countries", { start_date: startISO, end_date: endISO, limit_count: 8 }),
            supabase.rpc("get_video_analytics", { start_date: startISO, end_date: endISO }),
            supabase.rpc("get_realtime_analytics"),
            supabase.rpc("get_recent_sessions", { limit_count: 20 }),
            ...TRACKED_PAGES.map((page) =>
                supabase.rpc("get_page_detail_analytics", {
                    start_date: startISO,
                    end_date: endISO,
                    target_page: page.path,
                })
            ),
        ]);

        const trackedPagesData = TRACKED_PAGES.map((page, index) => ({
            ...page,
            analytics: trackedPagesResults[index]?.data || null,
        }));

        const overview = overviewResult.data || {};
        const prevVisitors = overview.prev_visitors || 0;
        const currentVisitors = overview.total_visitors || 0;

        const visitorChange = prevVisitors > 0
            ? (((currentVisitors - prevVisitors) / prevVisitors) * 100).toFixed(1)
            : currentVisitors > 0 ? "100" : "0";

        const prevPageViews = overview.prev_page_views || 0;
        const currentPageViews = overview.total_page_views || 0;

        const pageViewChange = prevPageViews > 0
            ? (((currentPageViews - prevPageViews) / prevPageViews) * 100).toFixed(1)
            : currentPageViews > 0 ? "100" : "0";

        return NextResponse.json({
            success: true,
            data: {
                period,
                isAllTime: false,
                dateRange: { start: startISO, end: endISO },
                overview: {
                    totalVisitors: overview.total_visitors || 0,
                    newVisitors: overview.new_visitors || 0,
                    returningVisitors: overview.returning_visitors || 0,
                    totalSessions: overview.total_sessions || 0,
                    totalPageViews: overview.total_page_views || 0,
                    pagesPerSession: overview.pages_per_session || 0,
                    avgSessionDuration: overview.avg_session_duration || 0,
                    bounceRate: overview.bounce_rate || 0,
                    visitorChange: parseFloat(visitorChange),
                    pageViewChange: parseFloat(pageViewChange),
                },
                daily: dailyResult.data || [],
                topPages: topPagesResult.data || [],
                devices: deviceResult.data || [],
                browsers: browserResult.data || [],
                trafficSources: trafficResult.data || [],
                countries: countriesResult.data || [],
                videos: videoResult.data || [],
                realtime: realtimeResult.data || {
                    active_now: 0, last_30_min: 0, last_hour: 0, today: 0, active_pages: [],
                },
                recentSessions: recentSessions.data || [],
                trackedPages: trackedPagesData,
            },
        });
    } catch (error) {
        console.error("Analytics API error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch analytics data" },
            { status: 500 }
        );
    }
}