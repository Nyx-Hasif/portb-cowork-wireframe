// 📁 app/api/analytics/active-users/route.ts
// CREATE NEW FILE & FOLDER

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    try {
        const { data, error } = await supabase.rpc("get_realtime_analytics");

        if (error) {
            console.error("[Active Users] Error:", error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data || {
                active_now: 0,
                last_30_min: 0,
                last_hour: 0,
                today: 0,
            },
        });
    } catch (error) {
        console.error("[Active Users] API error:", error);
        return NextResponse.json(
            { success: false, error: "Internal error" },
            { status: 500 }
        );
    }
}