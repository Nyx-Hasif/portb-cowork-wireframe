"use client";

import { useState } from "react";
import { addSubscriber } from "@/app/actions/subscriber";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    const result = await addSubscriber(email);

    if (result.success) {
      toast.success(
        "Thank you for subscribing! We will notify you about upcoming events."
      );
      setEmail(""); // Clear form
    } else {
      toast.error(result.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
      <p className="text-gray-400 text-base mb-3">
        Subscribe for events & latest updates.
      </p>

      {/* Email input - Match Footer Design */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full overflow-hidden rounded-lg border border-gray-600 focus-within:ring-2 focus-within:ring-emerald-500"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={loading}
          required
          className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-600 px-4 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="text-white text-xs">...</span>
          ) : (
            <Send size={18} className="text-white" />
          )}
        </button>
      </form>
    </div>
  );
}
