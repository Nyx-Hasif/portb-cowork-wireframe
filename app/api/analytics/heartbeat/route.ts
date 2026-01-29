// 📁 app/api/analytics/heartbeat/route.ts
// CREATE NEW FILE

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessionId, page, isLeaving } = body;

        if (!sessionId) {
            return NextResponse.json(
                { success: false, error: "Missing sessionId" },
                { status: 400 }
            );
        }

        if (isLeaving) {
            // User leaving - end session
            const { data, error } = await supabase.rpc("end_session", {
                p_session_id: sessionId,
            });

            if (error) {
                console.error("[Heartbeat] End session error:", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }

            return NextResponse.json({ success: true, ended: true, ...data });
        } else {
            // Regular heartbeat
            const { data, error } = await supabase.rpc("update_session_heartbeat", {
                p_session_id: sessionId,
                p_page: page || null,
            });

            if (error) {
                console.error("[Heartbeat] Update error:", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }

            return NextResponse.json({ success: true, ...data });
        }
    } catch (error) {
        console.error("[Heartbeat] API error:", error);
        return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
    }
}