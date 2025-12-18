// app/api/contact/bulk/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ========================================
// DELETE - Bulk delete messages
// ========================================

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { ids, deleteAll } = body;

        if (deleteAll) {
            // Delete ALL messages
            const { error } = await supabase
                .from("contact_messages")
                .delete()
                .neq("id", 0); // This deletes all rows

            if (error) {
                console.error("Supabase error:", error);
                return NextResponse.json(
                    { error: "Failed to delete all messages" },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                { success: true, message: "All messages deleted" },
                { status: 200 }
            );
        }

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: "No message IDs provided" },
                { status: 400 }
            );
        }

        // Delete selected messages
        const { error } = await supabase
            .from("contact_messages")
            .delete()
            .in("id", ids);

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to delete messages" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: `${ids.length} messages deleted` },
            { status: 200 }
        );

    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}