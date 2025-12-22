'use server'

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    space_type?: string;
    message: string;
    is_read: boolean;
    is_starred: boolean;
    created_at: string;
    updated_at?: string;
}

// Get all messages
export async function getAdminMessages() {
    try {
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        const unreadCount = data?.filter((msg) => !msg.is_read).length || 0;
        const starredCount = data?.filter((msg) => msg.is_starred).length || 0;

        return {
            success: true,
            data: data as ContactMessage[],
            unreadCount,
            starredCount,
            total: data?.length || 0
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            data: [],
            unreadCount: 0,
            starredCount: 0,
            total: 0
        };
    }
}

// Mark as read
export async function markMessageAsRead(id: number) {
    try {
        const { data, error } = await supabase
            .from("contact_messages")
            .update({ is_read: true, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            data: data as ContactMessage
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Mark as unread
export async function markMessageAsUnread(id: number) {
    try {
        const { data, error } = await supabase
            .from("contact_messages")
            .update({ is_read: false, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            data: data as ContactMessage
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Toggle star
export async function toggleMessageStar(id: number, currentStarred: boolean) {
    try {
        const { data, error } = await supabase
            .from("contact_messages")
            .update({
                is_starred: !currentStarred,
                updated_at: new Date().toISOString()
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            data: data as ContactMessage
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Delete single message
export async function deleteContactMessage(id: number) {
    try {
        const { error } = await supabase
            .from("contact_messages")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "Message deleted"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Delete multiple messages
export async function deleteContactMessages(ids: number[]) {
    try {
        const { error } = await supabase
            .from("contact_messages")
            .delete()
            .in("id", ids);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: `${ids.length} messages deleted`
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Delete all messages
export async function deleteAllContactMessages() {
    try {
        const { error } = await supabase
            .from("contact_messages")
            .delete()
            .neq("id", 0);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "All messages deleted"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}