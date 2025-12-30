"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  LogOut,
  LayoutDashboard,
  Calendar,
  Clock,
  ImageIcon,
  Plus,
  Trash2,
  Menu,
  X,
  Eye,
  Loader2,
  Upload,
  Pencil,
  Search,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  User,
  Users,
  ChevronRight,
  LucideIcon,
  Mail,
  MailOpen,
  Copy,
  Clock3,
  Building2,
  Phone,
  Star,
  Check,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  getAdminMessages,
  markMessageAsRead,
  markMessageAsUnread,
  toggleMessageStar,
  deleteContactMessage,
  deleteAllContactMessages,
  type ContactMessage,
} from "@/app/actions/contact";
import {
  getSubscribers,
  deleteSubscriber,
  deleteSubscribers,
  deleteAllSubscribers,
  markAllSubscribersAsRead,
  exportSubscribers,
  type Subscriber,
} from "@/app/actions/subscriber";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  getUpcomingEvents,
  createUpcomingEvent,
  updateUpcomingEvent,
  deleteUpcomingEvent as dbDeleteUpcomingEvent,
  getPreviousEvents,
  createPreviousEvent,
  updatePreviousEvent,
  deletePreviousEvent as dbDeletePreviousEvent,
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage as dbDeleteGalleryImage,
  uploadImage,
} from "@/lib/database";

// ==========================================
// TYPES
// ==========================================
interface UpcomingEvent {
  id: number;
  title: string;
  description?: string;
  category: string;
  is_featured?: boolean;
  fee?: string;
  date?: string;
  time?: string;
  guests?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}
interface PreviousEvent {
  id: number;
  title: string;
  description?: string;
  category: string;
  icon_name?: string;
  image_url?: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
}
interface GalleryImage {
  id: number;
  image_url: string;
  year: string;
  alt_text?: string;
  created_at?: string;
  updated_at?: string;
}
type AnyItem = UpcomingEvent | PreviousEvent | GalleryImage;
type SectionType =
  | "overview"
  | "upcoming"
  | "previous"
  | "gallery"
  | "inbox"
  | "subscribers";
type InboxFilter = "all" | "unread" | "starred";
interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

// ==========================================
// ANIMATIONS
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
};

// ==========================================
// COMPONENT
// ==========================================
const AdminDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  const openWhatsAppReply = (phone: string, name: string) => {
    if (!phone) {
      toast.error("No phone number");
      return;
    }
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    let whatsappNumber = cleanPhone;
    if (!cleanPhone.startsWith("+")) {
      if (cleanPhone.startsWith("0")) whatsappNumber = "+6" + cleanPhone;
      else whatsappNumber = "+60" + cleanPhone;
    }
    const message = `Hi ${name}, thank you for your message through Port B. How can we help you?`;
    window.open(
      `https://wa.me/${whatsappNumber.replace(
        /\+/g,
        ""
      )}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    toggleModal("messageDetail", false);
    toast.success("Opening WhatsApp...", { icon: "📱" });
  };

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  // STATE
  const [activeSection, setActiveSection] = useState<SectionType>("overview");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [upcomingSearch, setUpcomingSearch] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [inboxSearch, setInboxSearch] = useState("");
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>("all");
  const [isInboxSelectMode, setIsInboxSelectMode] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteAllConfirmText, setDeleteAllConfirmText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    type: string;
    id: number;
    title: string;
    imageUrl?: string;
  } | null>(null);
  const [modals, setModals] = useState({
    createUpcoming: false,
    createPrevious: false,
    createGallery: false,
    editUpcoming: false,
    editPrevious: false,
    editGallery: false,
    preview: false,
    messageDetail: false,
  });
  const [editingEvent, setEditingEvent] = useState<AnyItem | null>(null);
  const [previewEvent, setPreviewEvent] = useState<AnyItem | null>(null);

  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [previousEvents, setPreviousEvents] = useState<PreviousEvent[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [starredCount, setStarredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // SUBSCRIBERS STATE (ISOLATED)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isSubscribersLoading, setIsSubscribersLoading] = useState(false);
  const [subscriberUnreadCount, setSubscriberUnreadCount] = useState(0);
  const [selectedSubscriberIds, setSelectedSubscriberIds] = useState<number[]>(
    []
  );
  const [isSubscriberSelectMode, setIsSubscriberSelectMode] = useState(false);
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [subscriberFilter, setSubscriberFilter] = useState<
    "all" | "new" | "read"
  >("all");
  const [showDeleteAllSubscribersModal, setShowDeleteAllSubscribersModal] =
    useState(false);
  const [deleteAllSubscribersConfirmText, setDeleteAllSubscribersConfirmText] =
    useState("");

  const [refreshKey, setRefreshKey] = useState(0);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [forms, setForms] = useState({
    upcoming: {
      title: "",
      description: "",
      category: "",
      fee: "",
      date: "",
      time: "",
      guests: "",
      is_featured: false,
    },
    previous: { title: "", description: "", category: "", icon_name: "" },
    gallery: { year: "", alt_text: "" },
  });
  const fileRefs = {
    upcoming: useRef<HTMLInputElement>(null),
    previous: useRef<HTMLInputElement>(null),
    gallery: useRef<HTMLInputElement>(null),
    editUpcoming: useRef<HTMLInputElement>(null),
    editPrevious: useRef<HTMLInputElement>(null),
    editGallery: useRef<HTMLInputElement>(null),
  };

  // ==========================================
  // TIMEZONE HELPERS (MALAYSIA UTC+8) - FIXED
  // ==========================================

  const toMalaysiaDate = (dateString: string) => {
    if (!dateString) return null;

    try {
      // Clean and normalize the date string
      const cleanDate = dateString
        .replace(/\+\d{2}:\d{2}$/, "") // Remove +00:00, +08:00, etc
        .replace(/Z$/, "") // Remove Z
        .replace(" ", "T") // Space to T
        .split(".")[0]; // Remove milliseconds

      // Parse components manually to avoid timezone issues
      const match = cleanDate.match(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/
      );

      if (!match) {
        console.error("Cannot parse date:", dateString);
        return null;
      }

      const [, year, month, day, hour, minute, second] = match;

      // Create UTC date (month is 0-indexed)
      const utcMs = Date.UTC(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        parseInt(second)
      );

      // Add 8 hours for Malaysia timezone
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

  const formatRelativeTime = (dateString: string) => {
    const malaysiaDate = toMalaysiaDate(dateString);
    if (!malaysiaDate) return "";

    // Get current Malaysia time
    const now = new Date();
    const nowUtc = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    const nowMalaysia = nowUtc + 8 * 60 * 60 * 1000;

    const diffMs = nowMalaysia - malaysiaDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return "";
  };

  const formatSpaceType = (type?: string) => {
    if (!type) return "Not specified";
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied!`, { icon: "📋" });
  };

  // FETCH MESSAGES
  const fetchMessages = useCallback(async () => {
    try {
      const result = await getAdminMessages();
      if (result.success) {
        setContactMessages(result.data);
        setUnreadCount(result.unreadCount);
        setStarredCount(result.starredCount);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  // FETCH SUBSCRIBERS (ISOLATED)
  const refreshSubscribers = useCallback(async () => {
    setIsSubscribersLoading(true);
    try {
      const result = await getSubscribers();
      if (result.success) {
        setSubscribers(result.data);
        setSubscriberUnreadCount(result.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setIsSubscribersLoading(false);
    }
  }, []);

  // REALTIME
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => fetchMessages()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscribers" },
        () => refreshSubscribers()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchMessages, refreshSubscribers]);

  // WINDOW FOCUS (FIX FOR TAB SWITCH)
  // useEffect(() => {
  //   const handleFocus = () => {
  //     if (user) {
  //       console.log("Tab focused - refreshing data");
  //       fetchMessages();
  //       refreshSubscribers();
  //     }
  //   };
  //   window.addEventListener("focus", handleFocus);
  //   return () => window.removeEventListener("focus", handleFocus);
  // }, [user, fetchMessages, refreshSubscribers]);

  // LOAD DATA
  const loadData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const [up, prev, gal] = await Promise.all([
        getUpcomingEvents(),
        getPreviousEvents(),
        getGalleryImages(),
      ]);
      setUpcomingEvents(up);
      setPreviousEvents(prev);
      setGalleryImages(gal);
      await fetchMessages();
      await refreshSubscribers();
    } catch (e) {
      console.error(e);
      toast.error("Failed to load data");
    } finally {
      setIsDataLoading(false);
    }
  }, [fetchMessages, refreshSubscribers]);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData, refreshKey]);

  // SCROLL LOCK EFFECTS
  useEffect(() => {
    if (isSidebarOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isSidebarOpen]);

  // Cari useEffect yang ada anyModalOpen dan UPDATE:

  useEffect(() => {
    const anyModalOpen =
      Object.values(modals).some((v) => v) ||
      showDeleteModal ||
      showDeleteAllModal ||
      showDeleteAllSubscribersModal || // ✅ TAMBAH INI
      showLogoutModal;
    if (anyModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [
    modals,
    showDeleteModal,
    showDeleteAllModal,
    showDeleteAllSubscribersModal,
    showLogoutModal,
  ]);

  // HELPERS
  const toggleModal = (name: keyof typeof modals, value: boolean) => {
    setModals((prev) => ({ ...prev, [name]: value }));
    if (!value) {
      if (name === "createUpcoming") {
        clearImage("upcoming");
        resetUpcomingForm();
      } else if (name === "createPrevious") {
        clearImage("previous");
        resetPreviousForm();
      } else if (name === "createGallery") {
        clearImage("gallery");
        resetGalleryForm();
      } else if (name === "messageDetail") setSelectedMessage(null);
    }
  };

  const openMessageDetail = (message: ContactMessage) => {
    setSelectedMessage(message);
    toggleModal("messageDetail", true);
    if (!message.is_read) markAsRead(message.id);
  };

  const filteredMessages = contactMessages
    .filter((msg) => {
      if (inboxFilter === "unread") return !msg.is_read;
      if (inboxFilter === "starred") return msg.is_starred;
      return true;
    })
    .filter(
      (msg) =>
        msg.name.toLowerCase().includes(inboxSearch.toLowerCase()) ||
        msg.email.toLowerCase().includes(inboxSearch.toLowerCase()) ||
        msg.message.toLowerCase().includes(inboxSearch.toLowerCase())
    );

  const filteredUpcoming = upcomingEvents.filter((e) =>
    e.title.toLowerCase().includes(upcomingSearch.toLowerCase())
  );

  const filteredPrevious = previousEvents.filter((e) =>
    e.title.toLowerCase().includes(previousSearch.toLowerCase())
  );

  const galleryYears = [...new Set(galleryImages.map((i) => i.year))].sort(
    (a, b) => b.localeCompare(a)
  );

  const filteredGallery =
    galleryFilter === "all"
      ? galleryImages
      : galleryImages.filter((i) => i.year === galleryFilter);

  const filteredSubscribers = subscribers
    .filter((sub) => {
      // Filter by status
      if (subscriberFilter === "new") return !sub.is_read;
      if (subscriberFilter === "read") return sub.is_read;
      return true; // "all"
    })
    .filter((sub) =>
      // Filter by search
      sub.email.toLowerCase().includes(subscriberSearch.toLowerCase())
    );

  // MESSAGE ACTIONS
  const markAsRead = async (id: number) => {
    try {
      const result = await markMessageAsRead(id);
      if (result.success) {
        setContactMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const markAsUnread = async (id: number) => {
    try {
      const result = await markMessageAsUnread(id);
      if (result.success) {
        setContactMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, is_read: false } : msg))
        );
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleStar = async (id: number, currentStarred: boolean) => {
    try {
      const result = await toggleMessageStar(id, currentStarred);
      if (result.success) {
        setContactMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, is_starred: !currentStarred } : msg
          )
        );
        setStarredCount((prev) =>
          currentStarred ? Math.max(0, prev - 1) : prev + 1
        );
        toast.success(currentStarred ? "Star removed" : "Message starred!", {
          icon: currentStarred ? "☆" : "⭐",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMessage = async (id: number) => {
    setIsLoading(true);
    const tid = toast.loading("Deleting...");
    try {
      const result = await deleteContactMessage(id);
      if (result.success) {
        setContactMessages((prev) => prev.filter((msg) => msg.id !== id));
        setShowDeleteModal(false);
        setDeleteTarget(null);
        toggleModal("messageDetail", false);
        toast.success("Message deleted!", { id: tid });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAllMessages = async () => {
    if (deleteAllConfirmText !== "DELETE ALL") return;
    setIsLoading(true);
    const tid = toast.loading("Deleting all...");
    try {
      const result = await deleteAllContactMessages();
      if (result.success) {
        setContactMessages([]);
        setUnreadCount(0);
        setStarredCount(0);

        setShowDeleteAllModal(false);
        setDeleteAllConfirmText("");
        toast.success("All messages deleted!", { id: tid });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // deleteSelectedMessages
  const deleteSelectedMessages = async () => {
    if (selectedMessageIds.length === 0) return;
    setIsLoading(true);
    const tid = toast.loading(
      `Deleting ${selectedMessageIds.length} messages...`
    );
    try {
      // Delete one by one
      for (const id of selectedMessageIds) {
        await deleteContactMessage(id);
      }
      setContactMessages((prev) =>
        prev.filter((msg) => !selectedMessageIds.includes(msg.id))
      );
      setSelectedMessageIds([]);
      setIsInboxSelectMode(false);
      toast.success(`${selectedMessageIds.length} messages deleted!`, {
        id: tid,
      });
      // Refresh counts
      await fetchMessages();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete some messages", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  // SUBSCRIBER ACTIONS

  const handleSubscriberAction = async (action: string, id?: number) => {
    if (action === "delete" && id) {
      if (!confirm("Delete subscriber?")) return;
      await deleteSubscriber(id);
      toast.success("Deleted");
      refreshSubscribers();
    }
    if (action === "deleteSelected") {
      if (!confirm(`Delete ${selectedSubscriberIds.length} subscribers?`))
        return;
      await deleteSubscribers(selectedSubscriberIds);
      toast.success("Deleted selected");
      setSelectedSubscriberIds([]);
      setIsSubscriberSelectMode(false);
      refreshSubscribers();
    }
    // ✅ TUKAR BAHAGIAN INI - Show modal instead of confirm()
    if (action === "deleteAll") {
      setShowDeleteAllSubscribersModal(true);
      return;
    }
    if (action === "markRead") {
      await markAllSubscribersAsRead();
      toast.success("Marked as read");
      refreshSubscribers();
    }
    if (action === "export") {
      const res = await exportSubscribers();
      if (res.success && res.data) {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "text/csv" })
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = `subs_${Date.now()}.csv`;
        a.click();
        toast.success("Exported!");
      }
    }
  };

  // Tambah function ini selepas handleSubscriberAction:
  const confirmDeleteAllSubscribers = async () => {
    if (deleteAllSubscribersConfirmText !== "DELETE ALL") return;
    setIsLoading(true);
    const tid = toast.loading("Deleting all subscribers...");
    try {
      await deleteAllSubscribers();
      setSubscribers([]);
      setSubscriberUnreadCount(0);
      setShowDeleteAllSubscribersModal(false);
      setDeleteAllSubscribersConfirmText("");
      toast.success("All subscribers deleted!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  // FILE HANDLERS
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB");
    setFiles((prev) => ({ ...prev, [key]: file }));
    const reader = new FileReader();
    reader.onloadend = () =>
      setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const clearImage = (key: string) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: "" }));
    if (fileRefs[key as keyof typeof fileRefs]?.current)
      fileRefs[key as keyof typeof fileRefs].current!.value = "";
  };

  const resetUpcomingForm = () => {
    setForms((prev) => ({
      ...prev,
      upcoming: {
        title: "",
        description: "",
        category: "",
        fee: "",
        date: "",
        time: "",
        guests: "",
        is_featured: false,
      },
    }));
  };

  const resetPreviousForm = () => {
    setForms((prev) => ({
      ...prev,
      previous: { title: "", description: "", category: "", icon_name: "" },
    }));
  };

  const resetGalleryForm = () => {
    setForms((prev) => ({ ...prev, gallery: { year: "", alt_text: "" } }));
  };

  // CRUD FUNCTIONS
  const createUpcoming = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const tid = toast.loading("Creating...");
    try {
      const url = files.upcoming
        ? await uploadImage(files.upcoming, "upcoming")
        : undefined;
      const newEvent = await createUpcomingEvent({
        ...forms.upcoming,
        image_url: url,
      });
      if (newEvent) setUpcomingEvents((prev) => [newEvent, ...prev]);
      else setRefreshKey((prev) => prev + 1);
      resetUpcomingForm();
      clearImage("upcoming");
      toggleModal("createUpcoming", false);
      toast.success("Created!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const createPrevious = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const tid = toast.loading("Creating...");
    try {
      const url = files.previous
        ? await uploadImage(files.previous, "previous")
        : undefined;
      const newEvent = await createPreviousEvent({
        ...forms.previous,
        image_url: url,
      });
      if (newEvent) setPreviousEvents((prev) => [newEvent, ...prev]);
      else setRefreshKey((prev) => prev + 1);
      resetPreviousForm();
      clearImage("previous");
      toggleModal("createPrevious", false);
      toast.success("Created!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const createGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.gallery) return toast.error("Image required");
    setIsLoading(true);
    const tid = toast.loading("Uploading...");
    try {
      const url = await uploadImage(files.gallery!, "gallery");
      const newImage = await createGalleryImage({
        image_url: url,
        ...forms.gallery,
      });
      if (newImage) setGalleryImages((prev) => [newImage, ...prev]);
      else setRefreshKey((prev) => prev + 1);
      resetGalleryForm();
      clearImage("gallery");
      toggleModal("createGallery", false);
      toast.success("Uploaded!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "message") {
      await deleteMessage(deleteTarget.id);
      return;
    }
    setIsLoading(true);
    const tid = toast.loading("Deleting...");
    try {
      if (deleteTarget.type === "upcoming") {
        await dbDeleteUpcomingEvent(deleteTarget.id, deleteTarget.imageUrl);
        setUpcomingEvents((prev) =>
          prev.filter((e) => e.id !== deleteTarget.id)
        );
      } else if (deleteTarget.type === "previous") {
        await dbDeletePreviousEvent(deleteTarget.id, deleteTarget.imageUrl);
        setPreviousEvents((prev) =>
          prev.filter((e) => e.id !== deleteTarget.id)
        );
      } else {
        await dbDeleteGalleryImage(deleteTarget.id, deleteTarget.imageUrl);
        setGalleryImages((prev) =>
          prev.filter((e) => e.id !== deleteTarget.id)
        );
      }
      setShowDeleteModal(false);
      setDeleteTarget(null);
      toast.success("Deleted!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const openEdit = (
    item: AnyItem,
    type: "upcoming" | "previous" | "gallery"
  ) => {
    setEditingEvent(item);
    const key =
      type === "upcoming"
        ? "editUpcoming"
        : type === "previous"
        ? "editPrevious"
        : "editGallery";
    if (type === "upcoming" && "fee" in item)
      setForms((prev) => ({
        ...prev,
        upcoming: {
          title: item.title,
          description: item.description || "",
          category: item.category,
          fee: item.fee || "",
          date: item.date || "",
          time: item.time || "",
          guests: item.guests || "",
          is_featured: item.is_featured || false,
        },
      }));
    else if (type === "previous" && "icon_name" in item)
      setForms((prev) => ({
        ...prev,
        previous: {
          title: item.title,
          description: item.description || "",
          category: item.category,
          icon_name: item.icon_name || "",
        },
      }));
    else if (type === "gallery" && "year" in item)
      setForms((prev) => ({
        ...prev,
        gallery: { year: item.year, alt_text: item.alt_text || "" },
      }));
    setPreviews((prev) => ({ ...prev, [key]: item.image_url || "" }));
    toggleModal(key, true);
  };

  const submitEdit = async (
    e: React.FormEvent,
    type: "upcoming" | "previous" | "gallery"
  ) => {
    e.preventDefault();
    if (!editingEvent) return;
    setIsLoading(true);
    const tid = toast.loading("Updating...");
    try {
      let url = editingEvent.image_url;
      const fileKey =
        type === "upcoming"
          ? "editUpcoming"
          : type === "previous"
          ? "editPrevious"
          : "editGallery";
      if (files[fileKey]) url = await uploadImage(files[fileKey]!, type);
      if (type === "upcoming" && "title" in editingEvent) {
        await updateUpcomingEvent(editingEvent.id, {
          ...forms.upcoming,
          image_url: url,
        });
        setUpcomingEvents((prev) =>
          prev.map((e) =>
            e.id === editingEvent.id
              ? { ...e, ...forms.upcoming, image_url: url }
              : e
          )
        );
      } else if (type === "previous" && "title" in editingEvent) {
        await updatePreviousEvent(editingEvent.id, {
          ...forms.previous,
          image_url: url,
        });
        setPreviousEvents((prev) =>
          prev.map((e) =>
            e.id === editingEvent.id
              ? { ...e, ...forms.previous, image_url: url }
              : e
          )
        );
      } else {
        await updateGalleryImage(editingEvent.id, {
          ...forms.gallery,
          image_url: url,
        });
        setGalleryImages((prev) =>
          prev.map((e) =>
            e.id === editingEvent.id
              ? { ...e, ...forms.gallery, image_url: url! }
              : e
          )
        );
      }
      clearImage(fileKey);
      toggleModal(fileKey, false);
      setEditingEvent(null);
      toast.success("Updated!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  // UI COMPONENTS
  const SkeletonCard = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-300 animate-pulse flex gap-4 h-28">
      <div className="w-24 bg-gray-200 rounded-lg h-full"></div>
      <div className="flex-1 py-2 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-300 hover:border-gray-400 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-300">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({
    title,
    onAdd,
    showAddButton = true,
  }: {
    title: string;
    onAdd?: () => void;
    showAddButton?: boolean;
  }) => (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {showAddButton && onAdd && (
        <button
          onClick={onAdd}
          className="bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm border border-black"
        >
          <Plus size={16} /> Add New
        </button>
      )}
    </div>
  );

  const ImageUploadArea = () => {
    const getPreviewKey = () => {
      if (modals.createUpcoming) return "upcoming";
      if (modals.createPrevious) return "previous";
      if (modals.createGallery) return "gallery";
      if (modals.editUpcoming) return "editUpcoming";
      if (modals.editPrevious) return "editPrevious";
      if (modals.editGallery) return "editGallery";
      return "";
    };
    const getFileRef = () => {
      if (modals.createUpcoming) return fileRefs.upcoming;
      if (modals.createPrevious) return fileRefs.previous;
      if (modals.createGallery) return fileRefs.gallery;
      if (modals.editUpcoming) return fileRefs.editUpcoming;
      if (modals.editPrevious) return fileRefs.editPrevious;
      if (modals.editGallery) return fileRefs.editGallery;
      return null;
    };
    const previewKey = getPreviewKey();
    const hasPreview = previews[previewKey];
    return (
      <div className="relative group">
        <div
          onClick={() => getFileRef()?.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all overflow-hidden bg-white relative"
        >
          {hasPreview ? (
            <>
              <Image
                src={previews[previewKey]}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage(previewKey);
                }}
                className="absolute top-3 right-3 w-8 h-8 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 backdrop-blur-sm"
              >
                <X size={16} />
              </button>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to change
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-gray-100 rounded-full mb-2 group-hover:scale-110 transition-transform border border-gray-300">
                <Upload size={20} className="text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                Click to upload
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          ref={fileRefs.upcoming}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e, "upcoming")}
        />
        <input
          type="file"
          ref={fileRefs.previous}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e, "previous")}
        />
        <input
          type="file"
          ref={fileRefs.gallery}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e, "gallery")}
        />
        <input
          type="file"
          ref={fileRefs.editUpcoming}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e, "editUpcoming")}
        />
        <input
          type="file"
          ref={fileRefs.editPrevious}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e, "editPrevious")}
        />
        <input
          type="file"
          ref={fileRefs.editGallery}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFile(e, "editGallery")}
        />
      </div>
    );
  };

  // RENDER
  if (authLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-gray-900 w-8 h-8" />
      </div>
    );
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900 overflow-x-hidden">
      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          style={{ touchAction: "none" }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-300 z-50 transform transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center px-8 border-b border-gray-300 flex-shrink-0">
          <h1 className="text-xl font-bold tracking-tight">
            Port B <span className="text-gray-400 font-normal">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 flex-shrink-0 min-h-0">
          <div className="mb-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Main Menu
          </div>
          {[
            { id: "overview", icon: LayoutDashboard, label: "Overview" },
            { id: "upcoming", icon: Calendar, label: "Upcoming Events" },
            { id: "previous", icon: Clock, label: "Previous Events" },
            { id: "gallery", icon: ImageIcon, label: "Photo Gallery" },
            { id: "inbox", icon: Mail, label: "Inbox", badge: unreadCount },
            {
              id: "subscribers",
              icon: Users,
              label: "Subscribers",
              badge: subscriberUnreadCount,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as SectionType);
                setIsSidebarOpen(false);
                if (item.id === "gallery") setGalleryFilter("all");
                if (item.id === "inbox") {
                  setInboxFilter("all");
                }
                if (item.id === "subscribers") {
                  setIsSubscriberSelectMode(false);
                  setSelectedSubscriberIds([]);
                  refreshSubscribers();
                }
              }}
              className={`group w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                activeSection === item.id
                  ? "bg-black text-white shadow-md border-black"
                  : "text-gray-600 hover:bg-gray-100 border-transparent hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={18}
                  className={
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600"
                  }
                />
                {item.label}
              </div>
              <div className="flex items-center gap-2">
                {"badge" in item &&
                  item.badge !== undefined &&
                  item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        activeSection === item.id
                          ? "bg-white text-black"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                {activeSection === item.id && (
                  <ChevronRight size={14} className="text-gray-400" />
                )}
              </div>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-300 bg-gray-50/50 flex-shrink-0">
          <div className="bg-white border border-gray-300 p-3 rounded-xl flex items-center gap-3 mb-3 shadow-sm">
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 border border-gray-300">
              <User size={16} />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-bold truncate">Admin</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="flex-1 h-screen overflow-y-auto overflow-x-hidden bg-gray-100"
        style={{ overscrollBehavior: "contain" }}
      >
        <div className="lg:hidden h-16 bg-white sticky top-0 z-40 border-b border-gray-300 px-4 flex items-center justify-between shadow-sm">
          <h1 className="font-bold text-lg">Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-100 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="p-6 sm:p-8 max-w-7xl mx-auto pb-24 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {/* OVERVIEW SECTION */}
            {activeSection === "overview" && (
              <motion.div
                key="overview"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Welcome back! Here is your content summary.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  <StatCard
                    icon={Calendar}
                    label="Upcoming"
                    value={upcomingEvents.length}
                  />
                  <StatCard
                    icon={Clock}
                    label="Previous"
                    value={previousEvents.length}
                  />
                  <StatCard
                    icon={ImageIcon}
                    label="Gallery"
                    value={galleryImages.length}
                  />
                  <StatCard
                    icon={Mail}
                    label="Messages"
                    value={contactMessages.length}
                  />
                  <StatCard
                    icon={Users}
                    label="Subscribers"
                    value={subscribers.length}
                  />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Recent Messages */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl border border-gray-300 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Mail size={18} className="text-gray-600" />
                        <h3 className="font-bold text-gray-900">
                          Recent Messages
                        </h3>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setActiveSection("inbox")}
                        className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                      >
                        View All <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {contactMessages.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                          <Mail
                            size={32}
                            className="mx-auto mb-2 text-gray-300"
                          />
                          <p className="text-sm">No messages yet</p>
                        </div>
                      ) : (
                        contactMessages.slice(0, 4).map((msg) => (
                          <div
                            key={msg.id}
                            onClick={() => openMessageDetail(msg)}
                            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3 ${
                              !msg.is_read ? "bg-red-50/50" : ""
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                msg.is_read ? "bg-gray-100" : "bg-red-100"
                              }`}
                            >
                              {msg.is_read ? (
                                <MailOpen size={16} className="text-gray-500" />
                              ) : (
                                <Mail size={16} className="text-red-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-sm truncate ${
                                    !msg.is_read ? "font-bold" : "font-medium"
                                  }`}
                                >
                                  {msg.name}
                                </p>
                                {msg.is_starred && (
                                  <Star
                                    size={12}
                                    className="text-yellow-500 fill-yellow-500"
                                  />
                                )}
                                {!msg.is_read && (
                                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">
                                {msg.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {formatRelativeTime(msg.created_at) ||
                                  formatFullDate(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>

                  {/* Latest Subscribers */}
                  {/* Latest Subscribers */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl border border-gray-300 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-gray-600" />
                        <h3 className="font-bold text-gray-900">
                          Latest Subscribers
                        </h3>
                        {subscriberUnreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {subscriberUnreadCount} new
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setActiveSection("subscribers")}
                        className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                      >
                        View All <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {subscribers.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                          <Users
                            size={32}
                            className="mx-auto mb-2 text-gray-300"
                          />
                          <p className="text-sm">No subscribers yet</p>
                        </div>
                      ) : (
                        subscribers.slice(0, 5).map((sub) => (
                          <div
                            key={sub.id}
                            className={`p-4 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                              !sub.is_read ? "bg-red-50/50" : ""
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                                sub.is_read
                                  ? "bg-green-100 border-green-400"
                                  : "bg-red-100 border-red-400"
                              }`}
                            >
                              {sub.is_read ? (
                                <MailOpen
                                  size={16}
                                  className="text-green-500"
                                />
                              ) : (
                                <Mail size={16} className="text-red-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p
                                  className={`text-sm truncate ${
                                    !sub.is_read ? "font-bold" : ""
                                  }`}
                                >
                                  {sub.email}
                                </p>
                                {!sub.is_read && (
                                  <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">
                                {formatFullDate(sub.created_at)}
                                {formatRelativeTime(sub.created_at) && (
                                  <span className="ml-1">
                                    ({formatRelativeTime(sub.created_at)})
                                  </span>
                                )}
                              </p>
                            </div>
                            {!sub.is_read && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full flex-shrink-0">
                                New
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Upcoming Events */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-300 overflow-hidden mb-6"
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-gray-600" />
                      <h3 className="font-bold text-gray-900">
                        Upcoming Events
                      </h3>
                      <span className="px-2 py-0.5 bg-black text-white text-xs font-bold rounded-full">
                        {upcomingEvents.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveSection("upcoming")}
                      className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                    >
                      Manage <ChevronRight size={14} />
                    </button>
                  </div>
                  {upcomingEvents.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <Calendar
                        size={32}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p className="text-sm">No upcoming events</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                      {upcomingEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => {
                            setPreviewEvent(event);

                            toggleModal("preview", true);
                          }}
                        >
                          <div className="relative h-32 bg-gray-100">
                            {event.image_url ? (
                              <Image
                                src={event.image_url}
                                alt=""
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="h-full flex items-center justify-center text-gray-300">
                                <ImageIcon size={24} />
                              </div>
                            )}
                            {event.is_featured && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[10px] uppercase font-bold rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-sm truncate">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Calendar size={12} />
                              <span>{event.date || "TBA"}</span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Previous Events */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-300 overflow-hidden mb-6"
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-gray-600" />
                      <h3 className="font-bold text-gray-900">
                        Previous Events
                      </h3>
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                        {previousEvents.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveSection("previous")}
                      className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                    >
                      Manage <ChevronRight size={14} />
                    </button>
                  </div>
                  {previousEvents.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No previous events</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                      {previousEvents.slice(0, 4).map((event) => (
                        <div
                          key={event.id}
                          className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-md transition-all cursor-pointer"
                          onClick={() => {
                            setPreviewEvent(event);

                            toggleModal("preview", true);
                          }}
                        >
                          <div className="relative h-24 bg-gray-100">
                            {event.image_url ? (
                              <Image
                                src={event.image_url}
                                alt=""
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="h-full flex items-center justify-center text-gray-300">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-bold text-sm truncate">
                              {event.title}
                            </h4>
                            <span className="text-xs text-gray-400">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Gallery Preview */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-2xl border border-gray-300 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={18} className="text-gray-600" />
                      <h3 className="font-bold text-gray-900">Photo Gallery</h3>
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                        {galleryImages.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveSection("gallery")}
                      className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                    >
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  {galleryImages.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <ImageIcon
                        size={32}
                        className="mx-auto mb-2 text-gray-300"
                      />
                      <p className="text-sm">No gallery images</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
                      {galleryImages.slice(0, 6).map((img) => (
                        <div
                          key={img.id}
                          className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => {
                            setPreviewEvent(img);

                            toggleModal("preview", true);
                          }}
                        >
                          <Image
                            src={img.image_url}
                            alt={img.alt_text || ""}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <Eye
                              size={20}
                              className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                            {img.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* UPCOMING & PREVIOUS LISTS */}
            {["upcoming", "previous"].includes(activeSection) && (
              <motion.div
                key={activeSection}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionHeader
                  title={`${
                    activeSection === "upcoming" ? "Upcoming" : "Previous"
                  } Events`}
                  onAdd={() =>
                    toggleModal(
                      activeSection === "upcoming"
                        ? "createUpcoming"
                        : "createPrevious",
                      true
                    )
                  }
                />
                <div className="relative mb-6">
                  <Search
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={
                      activeSection === "upcoming"
                        ? upcomingSearch
                        : previousSearch
                    }
                    onChange={(e) =>
                      activeSection === "upcoming"
                        ? setUpcomingSearch(e.target.value)
                        : setPreviousSearch(e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none transition-all shadow-sm"
                  />
                </div>
                {isDataLoading ? (
                  <div className="grid gap-3">
                    {[1, 2, 3].map((i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {(activeSection === "upcoming"
                      ? filteredUpcoming
                      : filteredPrevious
                    ).map((event: UpcomingEvent | PreviousEvent) => (
                      <motion.div
                        key={event.id}
                        variants={itemVariants}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-4 rounded-2xl border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center group overflow-hidden"
                      >
                        <div
                          onClick={() => {
                            setPreviewEvent(event);

                            toggleModal("preview", true);
                          }}
                          className="w-full sm:w-24 h-40 sm:h-24 sm:min-w-[96px] sm:max-w-[96px] bg-gray-100 rounded-xl relative overflow-hidden cursor-pointer flex-shrink-0 border border-gray-300"
                        >
                          {event.image_url ? (
                            <Image
                              src={event.image_url}
                              alt=""
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-300">
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 w-full overflow-hidden">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                              {event.title}
                            </h3>
                            {"is_featured" in event && event.is_featured && (
                              <span className="px-2 py-0.5 bg-black text-white text-[10px] uppercase font-bold rounded flex-shrink-0">
                                Featured
                              </span>
                            )}
                          </div>
                          {activeSection === "upcoming" && "date" in event ? (
                            <div className="flex flex-col gap-1.5 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar
                                  size={14}
                                  className="text-gray-400 flex-shrink-0"
                                />
                                <span className="font-medium truncate">
                                  {event.date || "TBA"}
                                  {"time" in event &&
                                    event.time &&
                                    ` • ${event.time}`}
                                </span>
                              </div>
                              <span className="text-gray-500 text-xs truncate">
                                {event.category}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                              <span className="truncate">{event.category}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                          <button
                            onClick={() => {
                              setPreviewEvent(event);

                              toggleModal("preview", true);
                            }}
                            className="p-2.5 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-300"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() =>
                              openEdit(
                                event,
                                activeSection as "upcoming" | "previous"
                              )
                            }
                            className="p-2.5 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-300"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget({
                                type: activeSection,
                                id: event.id,
                                title: event.title,
                                imageUrl: event.image_url,
                              });
                              setShowDeleteModal(true);
                            }}
                            className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {(activeSection === "upcoming"
                      ? filteredUpcoming
                      : filteredPrevious
                    ).length === 0 && (
                      <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-gray-300 border-dashed">
                        No items found
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* GALLERY */}
            {activeSection === "gallery" && (
              <motion.div
                key="gallery"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionHeader
                  title="Gallery"
                  onAdd={() => toggleModal("createGallery", true)}
                />
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  <button
                    onClick={() => setGalleryFilter("all")}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border flex-shrink-0 ${
                      galleryFilter === "all"
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300 text-gray-500 hover:border-gray-400 hover:text-black"
                    }`}
                  >
                    All
                  </button>
                  {galleryYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setGalleryFilter(year)}
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border flex-shrink-0 ${
                        galleryFilter === year
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300 text-gray-500 hover:border-gray-400 hover:text-black"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                  {filteredGallery.map((img) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="group relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition-all"
                    >
                      <Image
                        src={img.image_url}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-bold text-lg mb-1">
                          {img.year}
                        </p>
                        <p className="text-gray-300 text-xs mb-3 truncate">
                          {img.alt_text || "No description"}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(img, "gallery")}
                            className="flex-1 py-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white hover:text-black transition-all flex justify-center"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget({
                                type: "gallery",
                                id: img.id,
                                title: `Image ${img.year}`,
                                imageUrl: img.image_url,
                              });
                              setShowDeleteModal(true);
                            }}
                            className="flex-1 py-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-red-600 hover:text-white transition-all flex justify-center"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* INBOX SECTION */}
            {activeSection === "inbox" && (
              <motion.div
                key="inbox"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionHeader title="Message Inbox" showAddButton={false} />

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { id: "all", label: "All", count: contactMessages.length },
                    { id: "unread", label: "Unread", count: unreadCount },
                    {
                      id: "starred",
                      label: "Starred",
                      count: starredCount,
                      icon: Star,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setInboxFilter(tab.id as InboxFilter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2 ${
                        inboxFilter === tab.id
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {tab.icon && (
                        <tab.icon
                          size={14}
                          className={
                            inboxFilter === tab.id
                              ? "text-yellow-300"
                              : "text-yellow-500"
                          }
                        />
                      )}
                      {tab.label}
                      <span
                        className={`px-1.5 py-0.5 text-xs rounded-full ${
                          inboxFilter === tab.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search & Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={inboxSearch}
                      onChange={(e) => setInboxSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none transition-all shadow-sm"
                    />
                  </div>

                  {/* Select Mode Toggle Button */}
                  <button
                    onClick={() => {
                      setIsInboxSelectMode(!isInboxSelectMode);
                      if (isInboxSelectMode) setSelectedMessageIds([]);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors flex items-center gap-2 ${
                      isInboxSelectMode
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Check size={16} />
                    {isInboxSelectMode ? "Cancel" : "Select"}
                  </button>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Delete Selected Button - Only show when items selected */}
                  {isInboxSelectMode && selectedMessageIds.length > 0 && (
                    <button
                      onClick={deleteSelectedMessages}
                      disabled={isLoading}
                      className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium flex gap-2 items-center hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete Selected ({selectedMessageIds.length})
                    </button>
                  )}

                  {/* Delete All Button - Only show when messages exist */}
                  {contactMessages.length > 0 && (
                    <button
                      onClick={() => setShowDeleteAllModal(true)}
                      className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-red-50 transition-colors"
                    >
                      <AlertTriangle size={16} /> Delete All
                    </button>
                  )}
                </div>

                {/* Stats Bar */}
                <div className="flex gap-4 mb-6 flex-wrap">
                  <div className="px-4 py-2 bg-white rounded-xl border border-gray-300 text-sm flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    Total:{" "}
                    <span className="font-bold">{contactMessages.length}</span>
                  </div>
                  <div className="px-4 py-2 bg-red-50 rounded-xl border border-red-200 text-sm text-red-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Unread: <span className="font-bold">{unreadCount}</span>
                  </div>
                  <div className="px-4 py-2 bg-yellow-50 rounded-xl border border-yellow-200 text-sm text-yellow-700 flex items-center gap-2">
                    <Star
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />
                    Starred: <span className="font-bold">{starredCount}</span>
                  </div>
                </div>

                {/* Message Cards */}
                {isDataLoading ? (
                  <div className="grid gap-3">
                    {[1, 2, 3].map((i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-gray-300 border-dashed">
                    <Mail size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        variants={itemVariants}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`bg-white rounded-2xl border-2 hover:shadow-md transition-all overflow-hidden relative ${
                          message.is_read
                            ? "border-green-300 bg-green-50/30"
                            : "border-red-300 bg-red-50/50"
                        }`}
                      >
                        <div
                          className="p-4 cursor-pointer active:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4"
                          onClick={() => {
                            if (!isInboxSelectMode) {
                              openMessageDetail(message);
                            }
                          }}
                        >
                          <div className="flex items-start gap-3 pt-1 flex-shrink-0">
                            {/* Checkbox - Only show in select mode */}
                            {isInboxSelectMode && (
                              <input
                                type="checkbox"
                                checked={selectedMessageIds.includes(
                                  message.id
                                )}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setSelectedMessageIds((prev) =>
                                    prev.includes(message.id)
                                      ? prev.filter((id) => id !== message.id)
                                      : [...prev, message.id]
                                  );
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-5 h-5 rounded border-gray-300 mt-1"
                              />
                            )}

                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(message.id, message.is_starred);
                              }}
                            >
                              <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                <Star
                                  size={20}
                                  className={
                                    message.is_starred
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300 hover:text-yellow-500"
                                  }
                                />
                              </button>
                            </div>
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                                message.is_read
                                  ? "bg-green-100 border-green-400"
                                  : "bg-red-100 border-red-400"
                              }`}
                            >
                              {message.is_read ? (
                                <MailOpen
                                  size={20}
                                  className="text-green-600"
                                />
                              ) : (
                                <Mail size={20} className="text-red-600" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3
                                className={`text-base truncate ${
                                  message.is_read
                                    ? "font-medium text-gray-700"
                                    : "font-bold text-gray-900"
                                }`}
                              >
                                {message.name}
                              </h3>
                              {!message.is_read && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded uppercase animate-pulse">
                                  NEW
                                </span>
                              )}
                              <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto sm:ml-2">
                                <Clock3 size={12} />
                                {formatRelativeTime(message.created_at) ||
                                  formatFullDate(message.created_at)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 truncate mb-1">
                              {message.email}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {message.message}
                            </p>
                          </div>
                          <div
                            className="flex flex-row sm:flex-col gap-2 items-center sm:justify-center border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() =>
                                message.is_read
                                  ? markAsUnread(message.id)
                                  : markAsRead(message.id)
                              }
                              className={`p-2.5 rounded-xl transition-colors border flex-1 sm:flex-none w-full sm:w-auto flex justify-center ${
                                message.is_read
                                  ? "text-gray-500 bg-gray-100 hover:bg-gray-200 border-gray-200"
                                  : "text-green-600 bg-green-50 hover:bg-green-100 border-green-200"
                              }`}
                              title={
                                message.is_read
                                  ? "Mark as Unread"
                                  : "Mark as Read"
                              }
                            >
                              {message.is_read ? (
                                <Mail size={18} />
                              ) : (
                                <MailOpen size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                if (message.phone)
                                  openWhatsAppReply(
                                    message.phone,
                                    message.name
                                  );
                                else toast.error("No phone number");
                              }}
                              disabled={!message.phone}
                              className={`p-2.5 rounded-xl transition-colors border flex-1 sm:flex-none w-full sm:w-auto flex justify-center ${
                                message.phone
                                  ? "text-green-700 bg-green-50 hover:bg-green-100 border-green-200"
                                  : "text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed"
                              }`}
                              title="Reply Message"
                            >
                              <MessageCircle size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setDeleteTarget({
                                  type: "message",
                                  id: message.id,
                                  title: `Message from ${message.name}`,
                                });
                                setShowDeleteModal(true);
                              }}
                              className="p-2.5 rounded-xl transition-colors border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 flex-1 sm:flex-none w-full sm:w-auto flex justify-center"
                              title="Delete Message"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Select All Bar - Only show in select mode */}
                {isInboxSelectMode && filteredMessages.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-300 flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          selectedMessageIds.length ===
                            filteredMessages.length &&
                          filteredMessages.length > 0
                        }
                        onChange={() => {
                          if (
                            selectedMessageIds.length ===
                            filteredMessages.length
                          )
                            setSelectedMessageIds([]);
                          else
                            setSelectedMessageIds(
                              filteredMessages.map((m) => m.id)
                            );
                        }}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Select All ({filteredMessages.length})
                      </span>
                    </label>
                    <span className="text-sm text-gray-500">
                      {selectedMessageIds.length} selected
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* SUBSCRIBERS SECTION */}
            {activeSection === "subscribers" && (
              <motion.div
                key="subscribers"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <SectionHeader title="Subscribers" showAddButton={false} />

                {/* Filter Tabs - Now Working! */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { id: "all", label: "All", count: subscribers.length },
                    {
                      id: "new",
                      label: "New",
                      count: subscribers.filter((s) => !s.is_read).length,
                    },
                    {
                      id: "read",
                      label: "Read",
                      count: subscribers.filter((s) => s.is_read).length,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setSubscriberFilter(tab.id as "all" | "new" | "read")
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2 ${
                        subscriberFilter === tab.id
                          ? "bg-black text-white border-black"
                          : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {tab.label}
                      <span
                        className={`px-1.5 py-0.5 text-xs rounded-full ${
                          subscriberFilter === tab.id
                            ? "bg-white/20 text-white"
                            : tab.id === "new"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Search & Actions Bar */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      placeholder="Search email..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none transition-all shadow-sm"
                    />
                  </div>
                  <button
                    onClick={refreshSubscribers}
                    disabled={isSubscribersLoading}
                    className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 text-sm font-medium disabled:opacity-50 flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw
                      size={16}
                      className={isSubscribersLoading ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>
                  <button
                    onClick={() => {
                      setIsSubscriberSelectMode(!isSubscriberSelectMode);
                      if (isSubscriberSelectMode) setSelectedSubscriberIds([]);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors flex items-center gap-2 ${
                      isSubscriberSelectMode
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Check size={16} />
                    {isSubscriberSelectMode ? "Cancel" : "Select"}
                  </button>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {isSubscriberSelectMode &&
                    selectedSubscriberIds.length > 0 && (
                      <button
                        onClick={() => handleSubscriberAction("deleteSelected")}
                        className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium flex gap-2 items-center hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={16} /> Delete (
                        {selectedSubscriberIds.length})
                      </button>
                    )}
                  <button
                    onClick={() => handleSubscriberAction("markRead")}
                    className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-green-100 transition-colors"
                  >
                    <CheckCircle2 size={16} /> Mark All Read
                  </button>
                  <button
                    onClick={() => handleSubscriberAction("export")}
                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl text-sm font-medium flex gap-2 items-center hover:bg-gray-50 transition-colors"
                  >
                    <Download size={16} /> Export CSV
                  </button>
                  {subscribers.length > 0 && (
                    <button
                      onClick={() => handleSubscriberAction("deleteAll")}
                      className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-red-50 transition-colors"
                    >
                      <AlertTriangle size={16} /> Delete All
                    </button>
                  )}
                </div>

                {/* Stats Bar */}
                <div className="flex gap-4 mb-6 flex-wrap">
                  <div className="px-4 py-2 bg-white rounded-xl border border-gray-300 text-sm flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    Total:{" "}
                    <span className="font-bold">{subscribers.length}</span>
                  </div>
                  <div className="px-4 py-2 bg-red-50 rounded-xl border border-red-200 text-sm text-red-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    New:{" "}
                    <span className="font-bold">
                      {subscribers.filter((s) => !s.is_read).length}
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-green-50 rounded-xl border border-green-200 text-sm text-green-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Read:{" "}
                    <span className="font-bold">
                      {subscribers.filter((s) => s.is_read).length}
                    </span>
                  </div>
                </div>

                {/* Subscriber Cards - Same style as Inbox */}
                {isSubscribersLoading && subscribers.length === 0 ? (
                  <div className="grid gap-3">
                    {[1, 2, 3].map((i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </div>
                ) : filteredSubscribers.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-gray-300 border-dashed">
                    <Users size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No subscribers found</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredSubscribers.map((sub) => (
                      <motion.div
                        key={sub.id}
                        variants={itemVariants}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`bg-white rounded-2xl border-2 hover:shadow-md transition-all overflow-hidden ${
                          sub.is_read
                            ? "border-green-300 bg-green-50/30"
                            : "border-red-300 bg-red-50/50"
                        }`}
                      >
                        <div className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          {/* Checkbox + Avatar */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {isSubscriberSelectMode && (
                              <input
                                type="checkbox"
                                checked={selectedSubscriberIds.includes(sub.id)}
                                onChange={() => {
                                  setSelectedSubscriberIds((prev) =>
                                    prev.includes(sub.id)
                                      ? prev.filter((id) => id !== sub.id)
                                      : [...prev, sub.id]
                                  );
                                }}
                                className="w-5 h-5 rounded border-gray-300"
                              />
                            )}
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                                sub.is_read
                                  ? "bg-green-100 border-green-400"
                                  : "bg-red-100 border-red-400"
                              }`}
                            >
                              {sub.is_read ? (
                                <MailOpen
                                  size={20}
                                  className="text-green-600"
                                />
                              ) : (
                                <Mail size={20} className="text-red-600" />
                              )}
                            </div>
                          </div>

                          {/* Email & Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3
                                className={`text-base truncate ${
                                  sub.is_read
                                    ? "font-medium text-gray-700"
                                    : "font-bold text-gray-900"
                                }`}
                              >
                                {sub.email}
                              </h3>
                              {!sub.is_read && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded uppercase animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                            {/* ✅ FIXED: Show full date + relative time */}
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock3 size={14} className="text-gray-400" />
                              <span>
                                {formatFullDate(sub.created_at)}
                                {formatRelativeTime(sub.created_at) && (
                                  <span className="text-gray-400 ml-1">
                                    ({formatRelativeTime(sub.created_at)})
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                            <button
                              onClick={() =>
                                copyToClipboard(sub.email, "Email")
                              }
                              className="p-2.5 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-300"
                              title="Copy Email"
                            >
                              <Copy size={18} />
                            </button>
                            <button
                              onClick={() => {
                                window.location.href = `mailto:${sub.email}`;
                              }}
                              className={`p-2.5 rounded-xl transition-colors border ${
                                sub.is_read
                                  ? "text-gray-500 bg-gray-50 hover:bg-gray-100 border-gray-300"
                                  : "text-green-600 bg-green-50 hover:bg-green-100 border-green-200"
                              }`}
                              title="Send Email"
                            >
                              <Mail size={18} />
                            </button>
                            <button
                              onClick={() =>
                                handleSubscriberAction("delete", sub.id)
                              }
                              className="p-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Select All Bar (when in select mode) */}
                {isSubscriberSelectMode && filteredSubscribers.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-300 flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          selectedSubscriberIds.length ===
                            filteredSubscribers.length &&
                          filteredSubscribers.length > 0
                        }
                        onChange={() => {
                          if (
                            selectedSubscriberIds.length ===
                            filteredSubscribers.length
                          )
                            setSelectedSubscriberIds([]);
                          else
                            setSelectedSubscriberIds(
                              filteredSubscribers.map((s) => s.id)
                            );
                        }}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Select All ({filteredSubscribers.length})
                      </span>
                    </label>
                    <span className="text-sm text-gray-500">
                      {selectedSubscriberIds.length} selected
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {(Object.values(modals).some((v) => v) ||
          showDeleteModal ||
          showDeleteAllModal ||
          showDeleteAllSubscribersModal || // ✅ TAMBAH INI
          showLogoutModal) && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setModals({
                createUpcoming: false,
                createPrevious: false,
                createGallery: false,
                editUpcoming: false,
                editPrevious: false,
                editGallery: false,
                preview: false,
                messageDetail: false,
              });
              setShowDeleteModal(false);
              setShowDeleteAllModal(false);
              setShowDeleteAllSubscribersModal(false); // ✅ TAMBAH INI
              setDeleteAllSubscribersConfirmText(""); // ✅ TAMBAH INI
              setShowLogoutModal(false);
            }}
          >
            {/* MESSAGE DETAIL MODAL */}
            {modals.messageDetail && selectedMessage && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`p-6 border-b-2 flex justify-between items-start ${
                    selectedMessage.is_read
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        selectedMessage.is_read
                          ? "bg-green-100 border-green-400"
                          : "bg-red-100 border-red-400"
                      }`}
                    >
                      {selectedMessage.is_read ? (
                        <MailOpen size={20} className="text-green-600" />
                      ) : (
                        <Mail size={20} className="text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xl">
                          {selectedMessage.name}
                        </h3>
                        <button
                          onClick={() =>
                            toggleStar(
                              selectedMessage.id,
                              selectedMessage.is_starred
                            )
                          }
                          className="p-1 hover:bg-white/50 rounded-lg transition-colors"
                        >
                          <Star
                            size={18}
                            className={
                              selectedMessage.is_starred
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-400 hover:text-yellow-500"
                            }
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatFullDate(selectedMessage.created_at)}
                        {formatRelativeTime(selectedMessage.created_at) && (
                          <span className="text-gray-400">
                            {" "}
                            ({formatRelativeTime(selectedMessage.created_at)})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleModal("messageDetail", false)}
                    className="p-2 hover:bg-white/50 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto modal-scrollable flex-1 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Mail size={18} className="text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium truncate">
                          {selectedMessage.email}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(selectedMessage.email, "Email")
                        }
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Copy email"
                      >
                        <Copy size={16} className="text-gray-500" />
                      </button>
                    </div>

                    {selectedMessage.phone && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Phone size={18} className="text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm font-medium">
                            {selectedMessage.phone}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(selectedMessage.phone!, "Phone")
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          title="Copy phone"
                        >
                          <Copy size={16} className="text-gray-500" />
                        </button>
                      </div>
                    )}

                    {selectedMessage.company && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Building2 size={18} className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Company</p>
                          <p className="text-sm font-medium">
                            {selectedMessage.company}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedMessage.space_type && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <ImageIcon size={18} className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Interested In</p>
                          <p className="text-sm font-medium">
                            {formatSpaceType(selectedMessage.space_type)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2">
                      Message
                    </p>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-300 bg-gray-50/50 flex-shrink-0">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (selectedMessage.is_read) {
                          markAsUnread(selectedMessage.id);
                          setSelectedMessage({
                            ...selectedMessage,
                            is_read: false,
                          });
                        } else {
                          markAsRead(selectedMessage.id);
                          setSelectedMessage({
                            ...selectedMessage,
                            is_read: true,
                          });
                        }
                      }}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors border flex items-center justify-center gap-2 ${
                        selectedMessage.is_read
                          ? "text-gray-700 bg-gray-100 hover:bg-gray-200 border-gray-200"
                          : "text-green-700 bg-green-100 hover:bg-green-200 border-green-200"
                      }`}
                    >
                      {selectedMessage.is_read ? (
                        <>
                          <Mail size={18} /> Mark Unread
                        </>
                      ) : (
                        <>
                          <MailOpen size={18} /> Mark Read
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (selectedMessage.phone) {
                          openWhatsAppReply(
                            selectedMessage.phone,
                            selectedMessage.name
                          );
                        } else {
                          toast.error("No phone number to reply to");
                        }
                      }}
                      disabled={!selectedMessage.phone}
                      className={`py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                        selectedMessage.phone
                          ? "text-white bg-green-600 hover:bg-green-700 border-green-600"
                          : "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                      }`}
                    >
                      <Phone size={18} />
                      {selectedMessage.phone ? "Reply WhatsApp" : "No Phone"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CREATE/EDIT MODAL (Events & Gallery) */}
            {(modals.createUpcoming ||
              modals.createPrevious ||
              modals.createGallery ||
              modals.editUpcoming ||
              modals.editPrevious ||
              modals.editGallery) && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-300 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-bold text-xl">
                    {modals.createUpcoming ||
                    modals.createPrevious ||
                    modals.createGallery
                      ? "Create New"
                      : "Edit Item"}
                  </h3>
                  <button
                    onClick={() =>
                      setModals((prev) => ({
                        ...prev,
                        createUpcoming: false,
                        createPrevious: false,
                        createGallery: false,
                        editUpcoming: false,
                        editPrevious: false,
                        editGallery: false,
                      }))
                    }
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto modal-scrollable flex-1">
                  <form
                    onSubmit={(e) => {
                      if (modals.createUpcoming) createUpcoming(e);
                      else if (modals.createPrevious) createPrevious(e);
                      else if (modals.createGallery) createGallery(e);
                      else if (modals.editUpcoming) submitEdit(e, "upcoming");
                      else if (modals.editPrevious) submitEdit(e, "previous");
                      else if (modals.editGallery) submitEdit(e, "gallery");
                    }}
                    className="space-y-5"
                  >
                    <ImageUploadArea />

                    {/* Upcoming Form */}
                    {(modals.createUpcoming || modals.editUpcoming) && (
                      <>
                        <input
                          required
                          placeholder="Title"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.upcoming.title}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              upcoming: {
                                ...prev.upcoming,
                                title: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          required
                          placeholder="Category"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.upcoming.category}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              upcoming: {
                                ...prev.upcoming,
                                category: e.target.value,
                              },
                            }))
                          }
                        />
                        <textarea
                          placeholder="Description"
                          rows={4}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm resize-none"
                          value={forms.upcoming.description}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              upcoming: {
                                ...prev.upcoming,
                                description: e.target.value,
                              },
                            }))
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="date"
                            placeholder="Date"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                            value={forms.upcoming.date}
                            onChange={(e) =>
                              setForms((prev) => ({
                                ...prev,
                                upcoming: {
                                  ...prev.upcoming,
                                  date: e.target.value,
                                },
                              }))
                            }
                          />
                          <input
                            type="time"
                            placeholder="Time"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                            value={forms.upcoming.time}
                            onChange={(e) =>
                              setForms((prev) => ({
                                ...prev,
                                upcoming: {
                                  ...prev.upcoming,
                                  time: e.target.value,
                                },
                              }))
                            }
                          />
                        </div>
                        <input
                          placeholder="Fee (e.g. RM50 or Free)"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.upcoming.fee}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              upcoming: {
                                ...prev.upcoming,
                                fee: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          placeholder="Guests (optional)"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.upcoming.guests}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              upcoming: {
                                ...prev.upcoming,
                                guests: e.target.value,
                              },
                            }))
                          }
                        />
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-5 h-5 rounded border-gray-300"
                            checked={forms.upcoming.is_featured}
                            onChange={(e) =>
                              setForms((prev) => ({
                                ...prev,
                                upcoming: {
                                  ...prev.upcoming,
                                  is_featured: e.target.checked,
                                },
                              }))
                            }
                          />
                          <span className="text-sm font-medium">
                            Featured Event
                          </span>
                        </label>
                      </>
                    )}

                    {/* Previous Form */}
                    {(modals.createPrevious || modals.editPrevious) && (
                      <>
                        <input
                          required
                          placeholder="Title"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.previous.title}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              previous: {
                                ...prev.previous,
                                title: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          required
                          placeholder="Category"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.previous.category}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              previous: {
                                ...prev.previous,
                                category: e.target.value,
                              },
                            }))
                          }
                        />
                        <textarea
                          placeholder="Description"
                          rows={4}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm resize-none"
                          value={forms.previous.description}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              previous: {
                                ...prev.previous,
                                description: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          placeholder="Icon Name (optional)"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.previous.icon_name}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              previous: {
                                ...prev.previous,
                                icon_name: e.target.value,
                              },
                            }))
                          }
                        />
                      </>
                    )}

                    {/* Gallery Form */}
                    {(modals.createGallery || modals.editGallery) && (
                      <>
                        <input
                          required
                          placeholder="Year (e.g. 2024)"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.gallery.year}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              gallery: {
                                ...prev.gallery,
                                year: e.target.value,
                              },
                            }))
                          }
                        />
                        <input
                          placeholder="Alt Text / Description"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 outline-none text-sm"
                          value={forms.gallery.alt_text}
                          onChange={(e) =>
                            setForms((prev) => ({
                              ...prev,
                              gallery: {
                                ...prev.gallery,
                                alt_text: e.target.value,
                              },
                            }))
                          }
                        />
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* PREVIEW MODAL */}
            {modals.preview && previewEvent && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 w-full bg-gray-100 border-b border-gray-200">
                  {previewEvent.image_url ? (
                    <Image
                      src={previewEvent.image_url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <button
                    onClick={() => toggleModal("preview", false)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white shadow-sm border border-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-8 overflow-y-auto modal-scrollable flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {"title" in previewEvent
                      ? previewEvent.title
                      : `Image ${previewEvent.year}`}
                  </h2>
                  {"description" in previewEvent && (
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-wrap">
                      {previewEvent.description || "No description provided."}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* DELETE MODAL */}
            {showDeleteModal && deleteTarget && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Delete {deleteTarget.title}?
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    This action cannot be undone.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteTarget(null);
                    }}
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isLoading}
                    className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* DELETE ALL MESSAGES MODAL */}
            {showDeleteAllModal && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Delete ALL Messages?
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    Type{" "}
                    <span className="font-bold text-red-600">DELETE ALL</span>{" "}
                    to confirm.
                  </p>
                  <input
                    type="text"
                    value={deleteAllConfirmText}
                    onChange={(e) =>
                      setDeleteAllConfirmText(e.target.value.toUpperCase())
                    }
                    placeholder="DELETE ALL"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 outline-none text-center text-sm font-bold uppercase tracking-wide mb-6"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteAllModal(false);
                      setDeleteAllConfirmText("");
                    }}
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAllMessages}
                    disabled={
                      isLoading || deleteAllConfirmText.trim() !== "DELETE ALL"
                    }
                    className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Delete All"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* DELETE ALL SUBSCRIBERS MODAL */}
            {showDeleteAllSubscribersModal && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Delete ALL Subscribers?
                  </h3>
                  <p className="text-gray-500 text-sm mb-2 leading-relaxed">
                    This will permanently delete all{" "}
                    <span className="font-bold text-red-600">
                      {subscribers.length}
                    </span>{" "}
                    subscribers.
                  </p>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    Type{" "}
                    <span className="font-bold text-red-600">DELETE ALL</span>{" "}
                    to confirm.
                  </p>
                  <input
                    type="text"
                    value={deleteAllSubscribersConfirmText}
                    onChange={(e) =>
                      setDeleteAllSubscribersConfirmText(
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="DELETE ALL"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 outline-none text-center text-sm font-bold uppercase tracking-wide mb-6"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteAllSubscribersModal(false);
                      setDeleteAllSubscribersConfirmText("");
                    }}
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteAllSubscribers}
                    disabled={
                      isLoading ||
                      deleteAllSubscribersConfirmText.trim() !== "DELETE ALL"
                    }
                    className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        <Trash2 size={18} />
                        Delete All
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* LOGOUT MODAL */}
            {showLogoutModal && (
              <motion.div
                variants={modalVariants}
                className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-2">Sign Out</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Are you sure you want to log out?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowLogoutModal(false);
                      signOut();
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-800"
                  >
                    Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
