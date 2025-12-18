// app/api/contact/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ========================================
// GET - Fetch single message
// ========================================

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }  // ← Ubah jadi Promise
) {
    try {
        const { id } = await params;  // ← Await params

        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// ========================================
// PATCH - Update message (read/unread/starred)
// ========================================

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }  // ← Ubah jadi Promise
) {
    try {
        const { id } = await params;  // ← Await params
        const body = await request.json();

        // Build update object dynamically
        const updateData: {
            is_read?: boolean;
            is_starred?: boolean;
            updated_at: string
        } = {
            updated_at: new Date().toISOString()
        };

        if (typeof body.is_read === 'boolean') {
            updateData.is_read = body.is_read;
        }

        if (typeof body.is_starred === 'boolean') {
            updateData.is_starred = body.is_starred;
        }

        const { data, error } = await supabase
            .from("contact_messages")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to update message" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message updated", data },
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

// ========================================
// DELETE - Delete message
// ========================================

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }  // ← Ubah jadi Promise
) {
    try {
        const { id } = await params;  // ← Await params

        const { error } = await supabase
            .from("contact_messages")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to delete message" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message deleted" },
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