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
  ChevronRight,
  LucideIcon,
  Mail,
  MailOpen,
  Copy,
  Clock3,
  Building2,
  Phone, // 🆕 ADDED THIS
  Star,
  Check,
} from "lucide-react";
import {
  getAdminMessages,
  markMessageAsRead,
  markMessageAsUnread,
  toggleMessageStar,
  deleteContactMessage,
  deleteContactMessages,
  deleteAllContactMessages,
  type ContactMessage,
} from "@/app/actions/contact";
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
// TYPE DEFINITIONS
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
type SectionType = "overview" | "upcoming" | "previous" | "gallery" | "inbox";
type InboxFilter = "all" | "unread" | "starred";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

// ==========================================
// ANIMATION VARIANTS
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

  // 🆕 WHATSAPP REPLY FUNCTION
  const openWhatsAppReply = (phone: string, name: string) => {
    if (!phone) {
      toast.error("No phone number available");
      return;
    }

    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    let whatsappNumber = cleanPhone;
    if (!cleanPhone.startsWith("+")) {
      if (cleanPhone.startsWith("0")) {
        whatsappNumber = "+6" + cleanPhone;
      } else {
        whatsappNumber = "+60" + cleanPhone;
      }
    }

    const message = `Hi ${name}, thank you for your message through Port B. How can we help you?`;
    const whatsappURL = `https://wa.me/${whatsappNumber.replace(
      /\+/g,
      ""
    )}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
    toggleModal("messageDetail", false);
    toast.success("Opening WhatsApp...", { icon: "📱" });
  };

  useEffect(() => {
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  // State
  const [activeSection, setActiveSection] = useState<SectionType>("overview");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search & Filter
  const [upcomingSearch, setUpcomingSearch] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [inboxSearch, setInboxSearch] = useState("");
  const [inboxFilter, setInboxFilter] = useState<InboxFilter>("all");

  // Modals & Data
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteAllConfirmText, setDeleteAllConfirmText] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    type: string;
    id: number;
    title: string;
    imageUrl?: string;
  } | null>(null);

  // Create/Edit Modals
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
  const [previewType, setPreviewType] = useState<SectionType | null>(null);

  // Data
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

  // Multi-select for inbox
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  // Refresh key
  const [refreshKey, setRefreshKey] = useState(0);

  // File Uploads
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  // Forms
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
  // INBOX FUNCTIONS
  // ==========================================

const fetchMessages = useCallback(async () => {
  try {
    const result = await getAdminMessages();

    if (result.success) {
      setContactMessages(result.data);
      setUnreadCount(result.unreadCount);
      setStarredCount(result.starredCount);
    } else {
      toast.error(result.error || "Failed to fetch messages");
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    toast.error("Failed to fetch messages");
  }
}, []);

  // Supabase Realtime Subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("contact_messages_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_messages",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newMessage = payload.new as ContactMessage;
            setContactMessages((prev) => [newMessage, ...prev]);
            setUnreadCount((prev) => prev + 1);
            toast.success(`New message from ${newMessage.name}!`, {
              icon: "📬",
              duration: 5000,
            });
          } else if (payload.eventType === "UPDATE") {
            const updatedMessage = payload.new as ContactMessage;
            setContactMessages((prev) =>
              prev.map((msg) =>
                msg.id === updatedMessage.id ? updatedMessage : msg
              )
            );
            // Recalculate counts
            setContactMessages((prev) => {
              setUnreadCount(prev.filter((m) => !m.is_read).length);
              setStarredCount(prev.filter((m) => m.is_starred).length);
              return prev;
            });
          } else if (payload.eventType === "DELETE") {
            const deletedId = payload.old.id;
            setContactMessages((prev) => {
              const newMessages = prev.filter((msg) => msg.id !== deletedId);
              setUnreadCount(newMessages.filter((m) => !m.is_read).length);
              setStarredCount(newMessages.filter((m) => m.is_starred).length);
              return newMessages;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

 const markAsRead = async (id: number) => {
   try {
     const result = await markMessageAsRead(id);

     if (result.success) {
       setContactMessages((prev) =>
         prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
       );
       setUnreadCount((prev) => Math.max(0, prev - 1));
     } else {
       toast.error(result.error || "Failed to mark as read");
     }
   } catch (error) {
     console.error("Error marking as read:", error);
     toast.error("Failed to mark as read");
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
    } else {
      toast.error(result.error || "Failed to mark as unread");
    }
  } catch (error) {
    console.error("Error marking as unread:", error);
    toast.error("Failed to mark as unread");
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
    } else {
      toast.error(result.error || "Failed to toggle star");
    }
  } catch (error) {
    console.error("Error toggling star:", error);
    toast.error("Failed to toggle star");
  }
};

 const deleteMessage = async (id: number) => {
   setIsLoading(true);
   const tid = toast.loading("Deleting message...");

   try {
     const result = await deleteContactMessage(id);

     if (result.success) {
       const deletedMsg = contactMessages.find((m) => m.id === id);
       setContactMessages((prev) => prev.filter((msg) => msg.id !== id));

       if (deletedMsg && !deletedMsg.is_read) {
         setUnreadCount((prev) => Math.max(0, prev - 1));
       }
       if (deletedMsg && deletedMsg.is_starred) {
         setStarredCount((prev) => Math.max(0, prev - 1));
       }

       setShowDeleteModal(false);
       setDeleteTarget(null);
       toggleModal("messageDetail", false);
       setSelectedMessage(null);
       toast.success("Message deleted!", { id: tid });
     } else {
       toast.error(result.error || "Failed to delete message", { id: tid });
     }
   } catch (error) {
     console.error("Error deleting message:", error);
     toast.error("Failed to delete message", { id: tid });
   } finally {
     setIsLoading(false);
   }
 };

  const deleteSelectedMessages = async () => {
    if (selectedMessageIds.length === 0) return;

    setIsLoading(true);
    const tid = toast.loading(
      `Deleting ${selectedMessageIds.length} messages...`
    );

    try {
      const result = await deleteContactMessages(selectedMessageIds);

      if (result.success) {
        const deletedMessages = contactMessages.filter((m) =>
          selectedMessageIds.includes(m.id)
        );
        const unreadDeleted = deletedMessages.filter((m) => !m.is_read).length;
        const starredDeleted = deletedMessages.filter(
          (m) => m.is_starred
        ).length;

        setContactMessages((prev) =>
          prev.filter((msg) => !selectedMessageIds.includes(msg.id))
        );
        setUnreadCount((prev) => Math.max(0, prev - unreadDeleted));
        setStarredCount((prev) => Math.max(0, prev - starredDeleted));
        setSelectedMessageIds([]);
        setIsSelectMode(false);
        toast.success(`${selectedMessageIds.length} messages deleted!`, {
          id: tid,
        });
      } else {
        toast.error(result.error || "Failed to delete messages", { id: tid });
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
      toast.error("Failed to delete messages", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

const deleteAllMessages = async () => {
  if (deleteAllConfirmText !== "DELETE ALL") return;

  setIsLoading(true);
  const tid = toast.loading("Deleting all messages...");

  try {
    const result = await deleteAllContactMessages();

    if (result.success) {
      setContactMessages([]);
      setUnreadCount(0);
      setStarredCount(0);
      setSelectedMessageIds([]);
      setIsSelectMode(false);
      setShowDeleteAllModal(false);
      setDeleteAllConfirmText("");
      toast.success("All messages deleted!", { id: tid });
    } else {
      toast.error(result.error || "Failed to delete all messages", { id: tid });
    }
  } catch (error) {
    console.error("Error deleting all messages:", error);
    toast.error("Failed to delete all messages", { id: tid });
  } finally {
    setIsLoading(false);
  }
};

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied!`, { icon: "📋" });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
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

  const openMessageDetail = (message: ContactMessage) => {
    setSelectedMessage(message);
    toggleModal("messageDetail", true);

    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const toggleMessageSelection = (id: number) => {
    setSelectedMessageIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAllMessages = () => {
    if (selectedMessageIds.length === filteredMessages.length) {
      setSelectedMessageIds([]);
    } else {
      setSelectedMessageIds(filteredMessages.map((m) => m.id));
    }
  };

  // Filter messages
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

  // ==========================================
  // SIDEBAR SCROLL LOCK
  // ==========================================
  useEffect(() => {
    if (isSidebarOpen) {
      const scrollY = window.scrollY;

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
      document.documentElement.style.height = "100%";

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";

      const preventScroll = (e: TouchEvent) => {
        const target = e.target as Element;
        const isScrollable = target.closest(".allow-scroll");

        if (!isScrollable) {
          e.preventDefault();
        }
      };

      const preventGesture = (e: Event) => {
        e.preventDefault();
      };

      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("gesturestart", preventGesture, {
        passive: false,
      });

      return () => {
        const scrollY = document.body.style.top;

        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
        document.documentElement.style.width = "";
        document.documentElement.style.height = "";

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.overscrollBehavior = "";

        window.scrollTo(0, parseInt(scrollY || "0") * -1);

        document.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("gesturestart", preventGesture);
      };
    }
  }, [isSidebarOpen]);

  // ==========================================
  // MODAL SCROLL LOCK
  // ==========================================
  useEffect(() => {
    const anyModalOpen =
      Object.values(modals).some((v) => v) ||
      showDeleteModal ||
      showDeleteAllModal ||
      showLogoutModal;

    if (anyModalOpen) {
      const scrollY = window.scrollY;

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
      document.documentElement.style.height = "100%";

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";

      const preventScroll = (e: TouchEvent) => {
        const target = e.target as Element;
        const isModalContent = target.closest(".modal-scrollable");

        if (!isModalContent) {
          e.preventDefault();
        }
      };

      const preventGesture = (e: Event) => {
        e.preventDefault();
      };

      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("gesturestart", preventGesture, {
        passive: false,
      });

      return () => {
        const scrollY = document.body.style.top;

        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
        document.documentElement.style.width = "";
        document.documentElement.style.height = "";

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.overscrollBehavior = "";

        window.scrollTo(0, parseInt(scrollY || "0") * -1);

        document.removeEventListener("touchmove", preventScroll);
        document.removeEventListener("gesturestart", preventGesture);
      };
    }
  }, [modals, showDeleteModal, showDeleteAllModal, showLogoutModal]);

  // ==========================================
  // HELPERS & HANDLERS
  // ==========================================
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
      } else if (name === "editUpcoming") {
        clearImage("editUpcoming");
      } else if (name === "editPrevious") {
        clearImage("editPrevious");
      } else if (name === "editGallery") {
        clearImage("editGallery");
      } else if (name === "messageDetail") {
        setSelectedMessage(null);
      }
    }

    if (value) {
      if (name === "createUpcoming") {
        resetUpcomingForm();
        clearImage("upcoming");
      } else if (name === "createPrevious") {
        resetPreviousForm();
        clearImage("previous");
      } else if (name === "createGallery") {
        resetGalleryForm();
        clearImage("gallery");
      }
    }
  };

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
    } catch (e) {
      console.error(e);
      toast.error("Failed to load data");
    } finally {
      setIsDataLoading(false);
    }
  }, [fetchMessages]);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData, refreshKey]);

  // Filtering
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

  // File Handler
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB allowed");
    setFiles((prev) => ({ ...prev, [key]: file }));
    const reader = new FileReader();
    reader.onloadend = () =>
      setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  // Clear Image Handler
  const clearImage = (key: string) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
    setPreviews((prev) => ({ ...prev, [key]: "" }));

    // Reset file input
    if (key === "upcoming" && fileRefs.upcoming.current) {
      fileRefs.upcoming.current.value = "";
    } else if (key === "previous" && fileRefs.previous.current) {
      fileRefs.previous.current.value = "";
    } else if (key === "gallery" && fileRefs.gallery.current) {
      fileRefs.gallery.current.value = "";
    } else if (key === "editUpcoming" && fileRefs.editUpcoming.current) {
      fileRefs.editUpcoming.current.value = "";
    } else if (key === "editPrevious" && fileRefs.editPrevious.current) {
      fileRefs.editPrevious.current.value = "";
    } else if (key === "editGallery" && fileRefs.editGallery.current) {
      fileRefs.editGallery.current.value = "";
    }
  };

  // Reset form helpers
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

  // CRUD Functions
  const createUpcoming = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const tid = toast.loading("Creating event...");

    try {
      const url = files.upcoming
        ? await uploadImage(files.upcoming, "upcoming")
        : undefined;

      const newEvent = await createUpcomingEvent({
        ...forms.upcoming,
        image_url: url,
      });

      if (newEvent) {
        setUpcomingEvents((prev) => [newEvent, ...prev]);
      } else {
        setRefreshKey((prev) => prev + 1);
      }

      resetUpcomingForm();
      clearImage("upcoming");
      toggleModal("createUpcoming", false);
      toast.success("Event created successfully!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const createPrevious = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const tid = toast.loading("Creating event...");

    try {
      const url = files.previous
        ? await uploadImage(files.previous, "previous")
        : undefined;

      const newEvent = await createPreviousEvent({
        ...forms.previous,
        image_url: url,
      });

      if (newEvent) {
        setPreviousEvents((prev) => [newEvent, ...prev]);
      } else {
        setRefreshKey((prev) => prev + 1);
      }

      resetPreviousForm();
      clearImage("previous");
      toggleModal("createPrevious", false);
      toast.success("Event created successfully!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create event", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  const createGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.gallery) return toast.error("Image required");

    setIsLoading(true);
    const tid = toast.loading("Uploading image...");

    try {
      const url = await uploadImage(files.gallery!, "gallery");
      const newImage = await createGalleryImage({
        image_url: url,
        ...forms.gallery,
      });

      if (newImage) {
        setGalleryImages((prev) => [newImage, ...prev]);
      } else {
        setRefreshKey((prev) => prev + 1);
      }

      resetGalleryForm();
      clearImage("gallery");
      toggleModal("createGallery", false);
      toast.success("Image uploaded successfully!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image", { id: tid });
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
      toast.success("Deleted successfully!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete", { id: tid });
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

    if (type === "upcoming" && "fee" in item) {
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
    } else if (type === "previous" && "icon_name" in item) {
      setForms((prev) => ({
        ...prev,
        previous: {
          title: item.title,
          description: item.description || "",
          category: item.category,
          icon_name: item.icon_name || "",
        },
      }));
    } else if (type === "gallery" && "year" in item) {
      setForms((prev) => ({
        ...prev,
        gallery: {
          year: item.year,
          alt_text: item.alt_text || "",
        },
      }));
    }

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

      if (files[fileKey]) {
        url = await uploadImage(files[fileKey]!, type);
      }

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
      toast.success("Updated successfully!", { id: tid });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update", { id: tid });
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // UI COMPONENTS
  // ==========================================

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

  // ==========================================
  // RENDER
  // ==========================================
  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-gray-900 w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900 overflow-x-hidden">
      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            touchAction: "none",
            overscrollBehavior: "none",
            WebkitOverflowScrolling: "auto",
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-300 z-50 transform transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          touchAction: "none",
          overscrollBehavior: "none",
          WebkitOverflowScrolling: "auto",
        }}
      >
        <div
          className="h-20 flex items-center px-8 border-b border-gray-300 flex-shrink-0"
          style={{ touchAction: "none" }}
        >
          <h1 className="text-xl font-bold tracking-tight">
            Port B <span className="text-gray-400 font-normal">Admin</span>
          </h1>
        </div>

        <nav
          className="flex-1 px-4 py-6 space-y-1 flex-shrink-0 min-h-0"
          style={{
            touchAction: "none",
            overscrollBehavior: "none",
          }}
        >
          <div className="mb-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Main Menu
          </div>
          {[
            { id: "overview", icon: LayoutDashboard, label: "Overview" },
            { id: "upcoming", icon: Calendar, label: "Upcoming Events" },
            { id: "previous", icon: Clock, label: "Previous Events" },
            { id: "gallery", icon: ImageIcon, label: "Photo Gallery" },
            { id: "inbox", icon: Mail, label: "Inbox", badge: unreadCount },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as SectionType);
                setIsSidebarOpen(false);
                if (item.id === "gallery") {
                  setGalleryFilter("all");
                }
                if (item.id === "inbox") {
                  setInboxFilter("all");
                  setIsSelectMode(false);
                  setSelectedMessageIds([]);
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

        <div
          className="p-4 border-t border-gray-300 bg-gray-50/50 flex-shrink-0"
          style={{ touchAction: "none" }}
        >
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
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        }}
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
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">
                    Dashboard Overview
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Welcome back, here is your content summary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
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
                </div>

                {/* CHANGE: 2x2 Grid instead of 3 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upcoming Column */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden h-fit">
                    <div className="p-5 border-b border-gray-300 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />{" "}
                        Upcoming
                      </h3>
                      <button
                        onClick={() => setActiveSection("upcoming")}
                        className="text-xs font-semibold text-gray-600 hover:text-black hover:underline transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {upcomingEvents.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className="p-4 flex gap-4 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-gray-300">
                            {e.image_url ? (
                              <Image
                                src={e.image_url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Calendar
                                className="m-auto mt-3 text-gray-300"
                                size={20}
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-black">
                              {e.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {e.date}
                            </p>
                          </div>
                        </div>
                      ))}
                      {upcomingEvents.length === 0 && (
                        <p className="p-8 text-center text-sm text-gray-400">
                          No upcoming events
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Previous Column */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden h-fit">
                    <div className="p-5 border-b border-gray-300 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" /> Previous
                      </h3>
                      <button
                        onClick={() => setActiveSection("previous")}
                        className="text-xs font-semibold text-gray-600 hover:text-black hover:underline transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {previousEvents.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className="p-4 flex gap-4 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-gray-300">
                            {e.image_url ? (
                              <Image
                                src={e.image_url}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Clock
                                className="m-auto mt-3 text-gray-300"
                                size={20}
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-black">
                              {e.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {e.category}
                            </p>
                          </div>
                        </div>
                      ))}
                      {previousEvents.length === 0 && (
                        <p className="p-8 text-center text-sm text-gray-400">
                          No previous events
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 🆕 GALLERY COLUMN - NEW! */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden h-fit">
                    <div className="p-5 border-b border-gray-300 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <ImageIcon size={16} className="text-gray-500" />{" "}
                        Gallery
                      </h3>
                      <button
                        onClick={() => setActiveSection("gallery")}
                        className="text-xs font-semibold text-gray-600 hover:text-black hover:underline transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-4">
                      {galleryImages.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {galleryImages.slice(0, 6).map((img) => (
                            <div
                              key={img.id}
                              onClick={() => setActiveSection("gallery")}
                              className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative border border-gray-300 cursor-pointer hover:ring-2 hover:ring-black transition-all group"
                            >
                              <Image
                                src={img.image_url}
                                alt={img.alt_text || "Gallery"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="p-8 text-center text-sm text-gray-400">
                          No gallery images
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Messages Column */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden h-fit">
                    <div className="p-5 border-b border-gray-300 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Mail size={16} className="text-gray-500" /> Messages
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white">
                            {unreadCount}
                          </span>
                        )}
                      </h3>
                      <button
                        onClick={() => setActiveSection("inbox")}
                        className="text-xs font-semibold text-gray-600 hover:text-black hover:underline transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {contactMessages.slice(0, 3).map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => openMessageDetail(msg)}
                          className={`p-4 flex gap-4 hover:bg-gray-50 transition-colors group cursor-pointer ${
                            !msg.is_read ? "bg-red-50/50" : ""
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                              msg.is_read
                                ? "bg-green-50 border-green-300"
                                : "bg-red-50 border-red-300"
                            }`}
                          >
                            {msg.is_read ? (
                              <MailOpen size={18} className="text-green-500" />
                            ) : (
                              <Mail size={18} className="text-red-500" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm truncate ${
                                  msg.is_read
                                    ? "font-medium text-gray-600"
                                    : "font-bold text-gray-900"
                                }`}
                              >
                                {msg.name}
                              </p>
                              {msg.is_starred && (
                                <Star
                                  size={14}
                                  className="text-yellow-500 fill-yellow-500 flex-shrink-0"
                                />
                              )}
                              {!msg.is_read && (
                                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded uppercase">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      ))}
                      {contactMessages.length === 0 && (
                        <p className="p-8 text-center text-sm text-gray-400">
                          No messages
                        </p>
                      )}
                    </div>
                  </div>
                </div>
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
                            setPreviewType(activeSection);
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

                              {"fee" in event &&
                                (event.fee || event.guests) && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {event.fee && (
                                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-bold border border-green-200 whitespace-nowrap">
                                        💰 {event.fee}
                                      </span>
                                    )}
                                    {event.guests && (
                                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold border border-blue-200 whitespace-nowrap">
                                        👥 {event.guests}
                                      </span>
                                    )}
                                  </div>
                                )}

                              <span className="text-gray-500 text-xs truncate">
                                {event.category}
                              </span>

                              {event.description && (
                                <p className="text-gray-400 line-clamp-2 text-xs mt-1">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                              <span className="truncate">{event.category}</span>
                              {event.description && (
                                <span className="text-gray-400 line-clamp-1 text-xs">
                                  {event.description}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto justify-end flex-shrink-0">
                          <button
                            onClick={() => {
                              setPreviewEvent(event);
                              setPreviewType(activeSection);
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

            {/* 🔧 FIXED INBOX SECTION */}
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

                {/* Search */}
                <div className="relative mb-4">
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

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-white rounded-xl border border-gray-300">
                  <button
                    onClick={() => {
                      setIsSelectMode(!isSelectMode);
                      if (isSelectMode) {
                        setSelectedMessageIds([]);
                      }
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border flex items-center gap-2 ${
                      isSelectMode
                        ? "bg-black text-white border-black"
                        : "bg-gray-50 border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <Check size={16} />
                    {isSelectMode ? "Cancel" : "Select"}
                  </button>

                  {isSelectMode && (
                    <>
                      <button
                        onClick={selectAllMessages}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 border border-gray-300 text-gray-600 hover:border-gray-400 transition-all flex items-center gap-2"
                      >
                        {selectedMessageIds.length === filteredMessages.length
                          ? "Deselect All"
                          : "Select All"}
                      </button>

                      {selectedMessageIds.length > 0 && (
                        <button
                          onClick={deleteSelectedMessages}
                          disabled={isLoading}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all flex items-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete ({selectedMessageIds.length})
                        </button>
                      )}
                    </>
                  )}

                  <div className="flex-1" />

                  {contactMessages.length > 0 && (
                    <button
                      onClick={() => setShowDeleteAllModal(true)}
                      className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all flex items-center gap-2"
                    >
                      <AlertTriangle size={16} />
                      Delete All
                    </button>
                  )}
                </div>

                {/* 🔧 FIXED Messages List */}
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
                          onClick={() => openMessageDetail(message)}
                        >
                          {/* 1. LEFT SIDE: Checkbox, Star, Avatar */}
                          <div className="flex items-start gap-3 pt-1 flex-shrink-0">
                            {/* Checkbox (Select Mode) */}
                            {isSelectMode && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMessageSelection(message.id);
                                }}
                              >
                                <button
                                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                                    selectedMessageIds.includes(message.id)
                                      ? "bg-black border-black text-white"
                                      : "bg-white border-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  {selectedMessageIds.includes(message.id) && (
                                    <Check size={14} />
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Star Button */}
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

                            {/* Avatar */}
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

                          {/* 2. MIDDLE: Content Info */}
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

                            {/* Tags */}
                            <div className="flex items-center gap-2 flex-wrap">
                              {message.space_type && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                                  {formatSpaceType(message.space_type)}
                                </span>
                              )}
                              {message.phone && (
                                <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium border border-green-100 flex items-center gap-1">
                                  <Phone size={10} /> WhatsApp Available
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 3. RIGHT SIDE (Desktop) / BOTTOM (Mobile): Actions */}
                          {/* "Hujung Kanan" implementation */}
                          <div
                            className="flex flex-row sm:flex-col gap-2 items-center sm:justify-center border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Mark Read/Unread Toggle */}
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

                            {/* Reply Button (Simple Chat Icon) */}
                            <button
                              onClick={() => {
                                if (message.phone) {
                                  openWhatsAppReply(
                                    message.phone,
                                    message.name
                                  );
                                } else {
                                  toast.error("No phone number");
                                }
                              }}
                              disabled={!message.phone}
                              className={`p-2.5 rounded-xl transition-colors border flex-1 sm:flex-none w-full sm:w-auto flex justify-center ${
                                message.phone
                                  ? "text-green-700 bg-green-50 hover:bg-green-100 border-green-200" // Hijau lembut & simple
                                  : "text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed"
                              }`}
                              title="Reply Message"
                            >
                              <MessageCircle size={18} />
                            </button>

                            {/* Delete Button (Added back per request) */}
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
          showLogoutModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              setShowLogoutModal(false);
            }}
            style={{
              touchAction: "none",
              overscrollBehavior: "none",
            }}
          >
            {/* 🔧 FIXED MESSAGE DETAIL MODAL */}
            {modals.messageDetail && selectedMessage && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div
                  className={`p-6 border-b-2 flex justify-between items-start flex-shrink-0 ${
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

                {/* Content */}
                <div className="p-6 overflow-y-auto modal-scrollable flex-1 space-y-4">
                  {/* Contact Info */}
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

                  {/* Message */}
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

                {/* 🔧 FIXED Footer Actions - REPLACE DELETE WITH WHATSAPP */}
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

                    {/* 🆕 REPLY BUTTON - REPLACE DELETE BUTTON */}
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

            {/* CREATE/EDIT MODALS */}
            {(modals.createUpcoming ||
              modals.createPrevious ||
              modals.createGallery ||
              modals.editUpcoming ||
              modals.editPrevious ||
              modals.editGallery) && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
                style={{
                  touchAction: "pan-y",
                  overscrollBehavior: "contain",
                }}
              >
                {/* Modal Header */}
                <div
                  className="p-6 border-b border-gray-300 flex justify-between items-center bg-gray-50/50 flex-shrink-0"
                  style={{ touchAction: "none" }}
                >
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

                {/* Modal Content */}
                <div
                  className="p-6 overflow-y-auto modal-scrollable flex-1"
                  style={{
                    overscrollBehavior: "contain",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
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

                    {(modals.createUpcoming || modals.editUpcoming) && (
                      <>
                        <input
                          required
                          placeholder="Title"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            placeholder="Fee (e.g., Free, RM 50)"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                            placeholder="Guests (e.g., Open to All)"
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                        </div>

                        <textarea
                          placeholder="Description"
                          rows={3}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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

                        <div
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() =>
                            setForms((prev) => ({
                              ...prev,
                              upcoming: {
                                ...prev.upcoming,
                                is_featured: !prev.upcoming.is_featured,
                              },
                            }))
                          }
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              forms.upcoming.is_featured
                                ? "bg-black border-black"
                                : "bg-white border-gray-400"
                            }`}
                          >
                            {forms.upcoming.is_featured && (
                              <CheckCircle2 size={14} className="text-white" />
                            )}
                          </div>
                          <span className="text-sm font-bold text-gray-700">
                            Highlight as Featured
                          </span>
                        </div>
                      </>
                    )}

                    {(modals.createPrevious || modals.editPrevious) && (
                      <>
                        <input
                          required
                          placeholder="Title"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                          rows={3}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                      </>
                    )}

                    {(modals.createGallery || modals.editGallery) && (
                      <>
                        <input
                          required
                          placeholder="Year"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                          placeholder="Alt Text"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-black outline-none text-sm font-medium"
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
                      className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
                style={{
                  touchAction: "pan-y",
                  overscrollBehavior: "contain",
                }}
              >
                <div
                  className="relative h-64 w-full bg-gray-100 border-b border-gray-200 flex-shrink-0"
                  style={{ touchAction: "none" }}
                >
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
                <div
                  className="p-8 overflow-y-auto modal-scrollable flex-1"
                  style={{
                    overscrollBehavior: "contain",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {"title" in previewEvent
                      ? previewEvent.title
                      : `Image ${previewEvent.year}`}
                  </h2>

                  {"category" in previewEvent && (
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs uppercase font-bold tracking-wide mb-6 border border-gray-200">
                      {previewEvent.category}
                    </span>
                  )}

                  {previewType === "upcoming" &&
                    "date" in previewEvent &&
                    "time" in previewEvent && (
                      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Date
                          </p>
                          <p className="font-semibold">
                            {previewEvent.date || "TBA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Time
                          </p>
                          <p className="font-semibold">
                            {previewEvent.time || "TBA"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Fee
                          </p>
                          <p className="font-semibold">
                            {"fee" in previewEvent && previewEvent.fee
                              ? previewEvent.fee
                              : "Free"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Guests
                          </p>
                          <p className="font-semibold">
                            {"guests" in previewEvent && previewEvent.guests
                              ? previewEvent.guests
                              : "Open"}
                          </p>
                        </div>
                      </div>
                    )}
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
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
                style={{
                  touchAction: "none",
                  overscrollBehavior: "none",
                }}
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Delete {deleteTarget.title}?
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    This will permanently delete this item and cannot be undone.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteTarget(null);
                    }}
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isLoading}
                    className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            {/* DELETE ALL MODAL */}
            {showDeleteAllModal && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
                style={{
                  touchAction: "none",
                  overscrollBehavior: "none",
                }}
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Delete ALL Messages?
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                    This will permanently delete{" "}
                    <span className="font-bold text-red-600">
                      ALL {contactMessages.length} messages
                    </span>
                    . This action cannot be undone.
                  </p>
                  <p className="text-gray-600 text-sm mb-4 font-medium">
                    Type{" "}
                    <span className="font-bold text-red-600">DELETE ALL</span>{" "}
                    to confirm:
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
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteAllMessages}
                    disabled={
                      isLoading || deleteAllConfirmText.trim() !== "DELETE ALL"
                    }
                    className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            {/* LOGOUT MODAL */}
            {showLogoutModal && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
                style={{
                  touchAction: "none",
                  overscrollBehavior: "none",
                }}
              >
                <h3 className="text-xl font-bold mb-2">Sign Out</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Are you sure you want to log out of the dashboard?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setShowLogoutModal(false);
                      signOut();
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-lg"
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
