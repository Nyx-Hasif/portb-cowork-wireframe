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
  User,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
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
type SectionType = "overview" | "upcoming" | "previous" | "gallery";

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

  // Modals & Data
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  });

  const [editingEvent, setEditingEvent] = useState<AnyItem | null>(null);
  const [previewEvent, setPreviewEvent] = useState<AnyItem | null>(null);
  const [previewType, setPreviewType] = useState<SectionType | null>(null);

  // Data
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [previousEvents, setPreviousEvents] = useState<PreviousEvent[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

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
  // ✅ LOCK BODY SCROLL WHEN SIDEBAR OPEN
  // ==========================================
  useEffect(() => {
    if (isSidebarOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      // Unlock body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [isSidebarOpen]);

  // ==========================================
  // HELPERS & HANDLERS
  // ==========================================
  const toggleModal = (name: keyof typeof modals, value: boolean) => {
    setModals((prev) => ({ ...prev, [name]: value }));

    // Clear images when CLOSING modals
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
      }
    }

    // Clear when OPENING create modals
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
    } catch (e) {
      console.error(e);
      toast.error("Failed to load data");
    } finally {
      setIsDataLoading(false);
    }
  }, []);

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
  }: {
    title: string;
    onAdd: () => void;
  }) => (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <button
        onClick={onAdd}
        className="bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm border border-black"
      >
        <Plus size={16} /> Add New
      </button>
    </div>
  );

  // Image Upload Component with Clear Button
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
              {/* X BUTTON - REMOVE IMAGE */}
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
              {/* CHANGE IMAGE OVERLAY */}
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

        {/* Hidden file inputs */}
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
    <div className="min-h-screen bg-gray-100 flex font-sans text-gray-900">
      {/* ✅ MOBILE SIDEBAR BACKDROP - prevent touch scroll */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          style={{ touchAction: "none" }}
        />
      )}

      {/* ✅ SIDEBAR - overscroll protection */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-300 z-50 transform transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          touchAction: "pan-y",
          overscrollBehavior: "contain",
        }}
      >
        {/* ✅ Sidebar Header - NO CLOSE BUTTON */}
        <div className="h-20 flex items-center px-8 border-b border-gray-300 flex-shrink-0">
          <h1 className="text-xl font-bold tracking-tight">
            Port B <span className="text-gray-400 font-normal">Admin</span>
          </h1>
        </div>

        {/* ✅ Navigation - contained scroll */}
        <nav className="flex-1 px-4 py-6 space-y-1 flex-shrink-0 min-h-0 overflow-y-auto overscroll-contain">
          <div className="mb-4 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Main Menu
          </div>
          {[
            { id: "overview", icon: LayoutDashboard, label: "Overview" },
            { id: "upcoming", icon: Calendar, label: "Upcoming Events" },
            { id: "previous", icon: Clock, label: "Previous Events" },
            { id: "gallery", icon: ImageIcon, label: "Photo Gallery" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as SectionType);
                setIsSidebarOpen(false);
                if (item.id === "gallery") {
                  setGalleryFilter("all");
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
              {activeSection === item.id && (
                <ChevronRight size={14} className="text-gray-400" />
              )}
            </button>
          ))}
        </nav>

        {/* ✅ Sidebar Footer / Profile - fixed bottom */}
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
      <main className="flex-1 h-screen overflow-y-auto bg-gray-100">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white sticky top-0 z-40 border-b border-gray-300 px-4 flex items-center justify-between shadow-sm">
          <h1 className="font-bold text-lg">Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-100 rounded-md text-gray-600 border border-gray-300 hover:bg-gray-200 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="p-6 sm:p-8 max-w-7xl mx-auto pb-24">
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

                {/* Stats Grid */}
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
                  <StatCard icon={CheckCircle2} label="Status" value="Active" />
                </div>

                {/* 3-Column Recent Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Column 1: Upcoming */}
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

                  {/* Column 2: Previous */}
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

                  {/* Column 3: Gallery */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden h-fit">
                    <div className="p-5 border-b border-gray-300 flex justify-between items-center bg-gray-50/50">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <ImageIcon size={16} className="text-gray-500" />{" "}
                        Gallery
                      </h3>
                      <button
                        onClick={() => {
                          setActiveSection("gallery");
                          setGalleryFilter("all");
                        }}
                        className="text-xs font-semibold text-gray-600 hover:text-black hover:underline transition-colors"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-3">
                      {galleryImages.slice(0, 9).map((img) => (
                        <div
                          key={img.id}
                          className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative border border-gray-300"
                        >
                          <Image
                            src={img.image_url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {galleryImages.length === 0 && (
                        <p className="col-span-3 py-8 text-center text-sm text-gray-400">
                          No images
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
                        className="bg-white p-4 rounded-2xl border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center group"
                      >
                        <div
                          onClick={() => {
                            setPreviewEvent(event);
                            setPreviewType(activeSection);
                            toggleModal("preview", true);
                          }}
                          className="w-full sm:w-24 h-32 sm:h-24 bg-gray-100 rounded-xl relative overflow-hidden cursor-pointer flex-shrink-0 border border-gray-300"
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

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 truncate">
                              {event.title}
                            </h3>
                            {"is_featured" in event && event.is_featured && (
                              <span className="px-2 py-0.5 bg-black text-white text-[10px] uppercase font-bold rounded">
                                Featured
                              </span>
                            )}
                          </div>

                          {activeSection === "upcoming" && "date" in event ? (
                            <div className="flex flex-col gap-1.5 text-sm">
                              {/* Date & Time */}
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="font-medium">
                                  {event.date || "TBA"}
                                  {"time" in event &&
                                    event.time &&
                                    ` • ${event.time}`}
                                </span>
                              </div>

                              {/* Fee & Guests */}
                              {"fee" in event &&
                                (event.fee || event.guests) && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {event.fee && (
                                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-bold border border-green-200">
                                        💰 {event.fee}
                                      </span>
                                    )}
                                    {event.guests && (
                                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold border border-blue-200">
                                        👥 {event.guests}
                                      </span>
                                    )}
                                  </div>
                                )}

                              {/* Category */}
                              <span className="text-gray-500 text-xs">
                                {event.category}
                              </span>

                              {/* Description */}
                              {event.description && (
                                <p className="text-gray-400 line-clamp-2 text-xs mt-1">
                                  {event.description}
                                </p>
                              )}
                            </div>
                          ) : (
                            // Previous events display
                            <div className="flex flex-col gap-1 text-sm text-gray-500">
                              <span>{event.category}</span>
                              {event.description && (
                                <span className="text-gray-400 line-clamp-1 text-xs">
                                  {event.description}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto justify-end">
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
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
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
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
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
          </AnimatePresence>
        </div>
      </main>

      {/* ========================================== */}
      {/* GLOBAL MODALS */}
      {/* ========================================== */}
      <AnimatePresence>
        {(Object.values(modals).some((v) => v) ||
          showDeleteModal ||
          showLogoutModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* INPUT FORM MODALS */}
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

                <div className="p-6 overflow-y-auto">
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
                    {/* Image Upload with Clear Button */}
                    <ImageUploadArea />

                    {/* Dynamic Inputs */}
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

                        {/* Date & Time */}
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

                        {/* Fee & Guests Inputs */}
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
                <div className="p-8 overflow-y-auto">
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
                            {("fee" in previewEvent && previewEvent.fee) ||
                              "Free"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">
                            Guests
                          </p>
                          <p className="font-semibold">
                            {("guests" in previewEvent &&
                              previewEvent.guests) ||
                              "Open"}
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
                className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4 border border-red-100">
                    <AlertTriangle size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Delete Item?
                  </h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isLoading}
                    className="py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-100 disabled:opacity-50 flex items-center justify-center gap-2"
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

            {/* LOGOUT MODAL */}
            {showLogoutModal && (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
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
