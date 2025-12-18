// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ========================================
// SUPABASE CLIENT (Server-side)
// ========================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Use service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ========================================
// POST - Create new contact message
// ========================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const { name, email, phone, company, space_type, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Insert into database
        const { data, error } = await supabase
            .from("contact_messages")
            .insert([
                {
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone?.trim() || null,
                    company: company?.trim() || null,
                    space_type: space_type || null,
                    message: message.trim(),
                    is_read: false,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to save message" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message sent successfully", data },
            { status: 201 }
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
// GET - Fetch all contact messages (Admin)
// ========================================

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Failed to fetch messages" },
                { status: 500 }
            );
        }

        // Get unread count
        const unreadCount = data?.filter((msg) => !msg.is_read).length || 0;

        return NextResponse.json(
            {
                success: true,
                data,
                unreadCount,
                total: data?.length || 0
            },
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