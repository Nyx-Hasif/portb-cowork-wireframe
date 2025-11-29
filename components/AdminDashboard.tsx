"use client";
import React, { useState, useEffect } from "react";
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
  ArrowRight,
  Eye,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider"; // ← Import useAuth

const AdminDashboard = () => {
  // 1️⃣ GET AUTH DATA
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();

  // 2️⃣ REDIRECT IF NOT LOGGED IN
  useEffect(() => {
    if (!authLoading && !user) {
      // Not logged in, redirect to login
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // State untuk section mana yang active
  const [activeSection, setActiveSection] = useState("overview");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data untuk testing (nanti boleh ganti dengan real data)
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: "Workshop React", date: "28 DEC", time: "2:00 PM" },
    { id: 2, title: "Networking Night", date: "30 DEC", time: "6:00 PM" },
    { id: 3, title: "Startup Meetup", date: "05 JAN", time: "3:00 PM" },
  ]);

  const [previousEvents, setPreviousEvents] = useState([
    { id: 1, title: "Opening Ceremony", date: "November 15, 2024" },
    { id: 2, title: "Tech Talk", date: "November 20, 2024" },
    { id: 3, title: "Coding Workshop", date: "November 25, 2024" },
  ]);

  const [galleryImages, setGalleryImages] = useState([
    { id: 1, url: "https://picsum.photos/400/400?random=1", alt: "Office 1" },
    { id: 2, url: "https://picsum.photos/400/400?random=2", alt: "Office 2" },
    { id: 3, url: "https://picsum.photos/400/400?random=3", alt: "Office 3" },
    { id: 4, url: "https://picsum.photos/400/400?random=4", alt: "Office 4" },
  ]);

  // 3️⃣ LOGOUT FUNCTION - Connect to Supabase
  const handleLogout = async () => {
    setShowLogoutModal(false);

    try {
      await signOut(); // Logout from Supabase
      router.push("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function untuk switch section dan close sidebar (mobile)
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  // Function delete items
  const deleteUpcomingEvent = (id: number) => {
    setUpcomingEvents(upcomingEvents.filter((event) => event.id !== id));
  };

  const deletePreviousEvent = (id: number) => {
    setPreviousEvents(previousEvents.filter((event) => event.id !== id));
  };

  const deleteGalleryImage = (id: number) => {
    setGalleryImages(galleryImages.filter((img) => img.id !== id));
  };

  // 4️⃣ SHOW LOADING WHILE CHECKING AUTH
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // 5️⃣ DON'T SHOW DASHBOARD IF NOT LOGGED IN
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto" />
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-30 h-16 flex items-center justify-between px-4">
        <h1 className="text-lg font-bold">
          Port B <span className="text-gray-500 font-normal">Admin</span>
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-16"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
        fixed lg:static
        top-16 lg:top-0
        left-0
        h-[calc(100vh-4rem)] lg:h-screen
        w-64
        bg-white 
        border-r 
        shadow-lg lg:shadow-sm
        flex flex-col
        z-40
        transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Logo/Header - Hidden on mobile */}
        <div className="hidden lg:block p-6 border-b">
          <h1 className="text-xl font-bold">
            Port B <span className="text-gray-500 font-normal">Admin</span>
          </h1>
          {/* 6️⃣ SHOW USER EMAIL */}
          <p className="text-xs text-gray-500 mt-1 truncate" title={user.email}>
            {user.email}
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => handleSectionChange("overview")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeSection === "overview"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>

          <button
            onClick={() => handleSectionChange("upcoming")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeSection === "upcoming"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Calendar size={18} />
            Upcoming Events
          </button>

          <button
            onClick={() => handleSectionChange("previous")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeSection === "previous"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Clock size={18} />
            Previous Events
          </button>

          <button
            onClick={() => handleSectionChange("gallery")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeSection === "gallery"
                ? "bg-green-100 text-green-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ImageIcon size={18} />
            Gallery
          </button>
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t">
          <button
            onClick={() => {
              setShowLogoutModal(true);
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <main className="flex-1 h-screen overflow-y-auto mt-16 lg:mt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dashboard Overview
              </h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <p className="text-sm text-gray-600 mb-1">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {upcomingEvents.length + previousEvents.length}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <p className="text-sm text-gray-600 mb-1">Gallery Images</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {galleryImages.length}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border sm:col-span-2 lg:col-span-1">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="text-3xl font-bold text-green-600">Active</p>
                </div>
              </div>

              {/* Latest Upcoming Events Preview */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar size={20} className="text-green-600" />
                    Latest Upcoming Events
                  </h3>
                  <button
                    onClick={() => handleSectionChange("upcoming")}
                    className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm border divide-y">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {event.date} • {event.time}
                        </p>
                      </div>
                      <Eye size={18} className="text-gray-400" />
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No upcoming events yet
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Previous Events Preview */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock size={20} className="text-blue-600" />
                    Latest Previous Events
                  </h3>
                  <button
                    onClick={() => handleSectionChange("previous")}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm border divide-y">
                  {previousEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <Eye size={18} className="text-gray-400" />
                    </div>
                  ))}
                  {previousEvents.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No previous events yet
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Gallery Images Preview */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <ImageIcon size={20} className="text-purple-600" />
                    Latest Gallery Images
                  </h3>
                  <button
                    onClick={() => handleSectionChange("gallery")}
                    className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {galleryImages.slice(0, 4).map((img) => (
                      <div
                        key={img.id}
                        className="relative group aspect-square rounded-lg overflow-hidden"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye size={24} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {galleryImages.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No gallery images yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Events Section */}
          {activeSection === "upcoming" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Upcoming Events
              </h2>

              {/* Add Event Button */}
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-6 transition-colors w-full sm:w-auto justify-center sm:justify-start">
                <Plus size={18} />
                Add New Event
              </button>

              {/* Events List */}
              <div className="space-y-3 mb-8">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {event.date} • {event.time}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteUpcomingEvent(event.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors self-end sm:self-auto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Events Section */}
          {activeSection === "previous" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Previous Events
              </h2>

              {/* Add Event Button */}
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-6 transition-colors w-full sm:w-auto justify-center sm:justify-start">
                <Plus size={18} />
                Add Previous Event
              </button>

              {/* Events List */}
              <div className="space-y-3 mb-8">
                {previousEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                    <button
                      onClick={() => deletePreviousEvent(event.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors self-end sm:self-auto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {activeSection === "gallery" && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Gallery
              </h2>

              {/* Add Image Button */}
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-6 transition-colors w-full sm:w-auto justify-center sm:justify-start">
                <Plus size={18} />
                Add New Image
              </button>

              {/* Images Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                {galleryImages.map((img) => (
                  <div key={img.id} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-40 sm:h-48 object-cover rounded-lg"
                    />
                    {/* Delete button show on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => deleteGalleryImage(img.id)}
                        className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowLogoutModal(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
