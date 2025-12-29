"use client";

import { useState } from "react";
import { Subscriber } from "@/app/actions/subscriber";
import {
  deleteSubscriber,
  deleteSubscribers,
  deleteAllSubscribers,
  markAllSubscribersAsRead,
  exportSubscribers,
} from "@/app/actions/subscriber";
import toast from "react-hot-toast";

// ==========================================
// TIMEZONE HELPER (MALAYSIA UTC+8)
// ==========================================
const toMalaysiaDate = (dateString: string) => {
  if (!dateString) return null;

  try {
    const cleanDate = dateString
      .replace(/\+\d{2}:\d{2}$/, "")
      .replace(/Z$/, "")
      .replace(" ", "T")
      .split(".")[0];

    const match = cleanDate.match(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
    );

    if (!match) {
      console.error("Cannot parse date:", dateString);
      return null;
    }

    const [, year, month, day, hour, minute, second] = match;

    const utcMs = Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );

    const malaysiaMs = utcMs + 8 * 60 * 60 * 1000;

    return new Date(malaysiaMs);
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return null;
  }
};

const formatFullDate = (dateString: string) => {
  const malaysiaDate = toMalaysiaDate(dateString);
  if (!malaysiaDate) return "-";

  const day = malaysiaDate.getUTCDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[malaysiaDate.getUTCMonth()];
  const year = malaysiaDate.getUTCFullYear();
  let hour = malaysiaDate.getUTCHours();
  const minute = String(malaysiaDate.getUTCMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${day} ${month} ${year}, ${hour}:${minute} ${ampm}`;
};

interface Props {
  initialData: Subscriber[];
  initialUnreadCount: number;
}

export default function SubscriberTable({ initialData }: Props) {
  const [subscribers, setSubscribers] = useState(initialData);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Select all toggle
  const handleSelectAll = () => {
    if (selected.length === filteredSubscribers.length) {
      setSelected([]);
    } else {
      setSelected(filteredSubscribers.map((sub) => sub.id));
    }
  };

  // Toggle single selection
  const handleSelectOne = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Delete single
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this subscriber?")) return;

    const result = await deleteSubscriber(id);
    if (result.success) {
      setSubscribers(subscribers.filter((sub) => sub.id !== id));
      toast.success("Subscriber deleted");
    } else {
      toast.error(result.error || "Failed to delete");
    }
  };

  // Delete selected
  const handleDeleteSelected = async () => {
    if (selected.length === 0) {
      toast.error("No subscribers selected");
      return;
    }

    if (!confirm(`Delete ${selected.length} subscribers?`)) return;

    const result = await deleteSubscribers(selected);
    if (result.success) {
      setSubscribers(subscribers.filter((sub) => !selected.includes(sub.id)));
      setSelected([]);
      toast.success(result.message || "Deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete");
    }
  };

  // Delete all
  const handleDeleteAll = async () => {
    if (!confirm("⚠️ DELETE ALL SUBSCRIBERS? This cannot be undone!")) return;

    const result = await deleteAllSubscribers();
    if (result.success) {
      setSubscribers([]);
      setSelected([]);
      toast.success("All subscribers deleted");
    } else {
      toast.error(result.error || "Failed to delete");
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    const result = await markAllSubscribersAsRead();
    if (result.success) {
      setSubscribers(subscribers.map((sub) => ({ ...sub, is_read: true })));
      toast.success("All marked as read");
    } else {
      toast.error(result.error || "Failed to update");
    }
  };

  // Export to CSV
  const handleExport = async () => {
    const result = await exportSubscribers();
    if (result.success && result.data) {
      const blob = new Blob([result.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `subscribers_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Exported successfully");
    } else {
      toast.error(result.error || "Failed to export");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Search email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            ✓ Mark All Read
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selected.length === 0}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition"
          >
            🗑️ Delete Selected ({selected.length})
          </button>
          <button
            onClick={handleDeleteAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            🗑️ Delete All
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selected.length === filteredSubscribers.length &&
                    filteredSubscribers.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Subscribed Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No subscribers found
                </td>
              </tr>
            ) : (
              filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(sub.id)}
                      onChange={() => handleSelectOne(sub.id)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-3">
                    {sub.is_read ? (
                      <span className="text-gray-400">⚪ Read</span>
                    ) : (
                      <span className="text-blue-600 font-semibold">
                        🔵 New
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-medium">{sub.email}</td>
                  <td className="p-3 text-gray-600 text-sm">
                    {formatFullDate(sub.created_at)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-600">
        Total: {subscribers.length} subscribers | Unread:{" "}
        {subscribers.filter((s) => !s.is_read).length} | Showing:{" "}
        {filteredSubscribers.length}
      </div>
    </div>
  );
}
