'use server'

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface Subscriber {
    id: number;
    email: string;
    is_read: boolean;
    created_at: string;
}

// Get all subscribers
export async function getSubscribers() {
    try {
        const { data, error } = await supabase
            .from("subscribers")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        const unreadCount = data?.filter((sub) => !sub.is_read).length || 0;

        return {
            success: true,
            data: data as Subscriber[],
            unreadCount,
            total: data?.length || 0
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            data: [],
            unreadCount: 0,
            total: 0
        };
    }
}

// Add new subscriber (from footer form)
export async function addSubscriber(email: string) {
    try {
        const { data, error } = await supabase
            .from("subscribers")
            .insert({ email })
            .select()
            .single();

        if (error) {
            // Check if duplicate email
            if (error.code === '23505') {
                throw new Error("Email already subscribed");
            }
            throw new Error(error.message);
        }

        return {
            success: true,
            data: data as Subscriber,
            message: "Thank you for subscribing!"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Mark as read
export async function markSubscriberAsRead(id: number) {
    try {
        const { data, error } = await supabase
            .from("subscribers")
            .update({ is_read: true })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            data: data as Subscriber
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Mark all as read
export async function markAllSubscribersAsRead() {
    try {
        const { error } = await supabase
            .from("subscribers")
            .update({ is_read: true })
            .eq("is_read", false);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "All marked as read"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Delete single subscriber
export async function deleteSubscriber(id: number) {
    try {
        const { error } = await supabase
            .from("subscribers")
            .delete()
            .eq("id", id);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "Subscriber deleted"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Delete multiple subscribers
export async function deleteSubscribers(ids: number[]) {
    try {
        const { error } = await supabase
            .from("subscribers")
            .delete()
            .in("id", ids);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: `${ids.length} subscribers deleted`
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Delete all subscribers
export async function deleteAllSubscribers() {
    try {
        const { error } = await supabase
            .from("subscribers")
            .delete()
            .neq("id", 0);

        if (error) {
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "All subscribers deleted"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}

// Export subscribers to CSV
// Export subscribers to CSV
export async function exportSubscribers() {
    try {
        const { data, error } = await supabase
            .from("subscribers")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        // Helper kecil di dalam function: anggap DB time = UTC, convert ke MY time
        const formatMalaysiaDateTime = (dateString: string) => {
            // DB: "2025-12-28 08:31:45.106427"
            // → ISO UTC: "2025-12-28T08:31:45.106427Z"
            const isoUtcString = dateString.replace(" ", "T") + "Z";
            const date = new Date(isoUtcString);

            return date.toLocaleString("en-GB", {
                timeZone: "Asia/Kuala_Lumpur", // ✅ paksa waktu Malaysia
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        };

        // Create CSV content
        const headers = "No,Email,Subscribed Date\n";
        const rows = (data || [])
            .map((sub, index) => {
                const date = formatMalaysiaDateTime(sub.created_at);
                return `${index + 1},${sub.email},"${date}"`;
            })
            .join("\n");

        const csv = headers + rows;

        return {
            success: true,
            data: csv,
            message: "Export successful"
        };
    } catch (error) {
        console.error("Server action error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}