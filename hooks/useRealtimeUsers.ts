// 📁 hooks/useRealtimeUsers.ts
// CREATE NEW FILE (create 'hooks' folder kalau belum ada)

import { useEffect, useState } from "react";

interface RealtimeData {
    active_now: number;
    last_30_min: number;
    last_hour: number;
    today: number;
}

export function useRealtimeUsers(refreshInterval = 10000) {
    const [data, setData] = useState<RealtimeData>({
        active_now: 0,
        last_30_min: 0,
        last_hour: 0,
        today: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/analytics/active-users");
                const result = await res.json();

                if (result.success) {
                    setData(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch realtime users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { data, loading };
}