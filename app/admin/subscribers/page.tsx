import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/supabase";
import { getSubscribers } from "@/app/actions/subscriber";
import SubscriberTable from "@/components/admin/subscribers/SubscriberTable";

export default async function SubscribersPage() {
  // 🔒 Check authentication using your helper function
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/login");
  }

  // ✅ Fetch subscribers
  const result = await getSubscribers();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">📧 Subscribers</h1>
        <p className="text-gray-600 mt-2">Manage your newsletter subscribers</p>
      </div>

      <SubscriberTable
        initialData={result.data}
        initialUnreadCount={result.unreadCount}
      />
    </div>
  );
}
