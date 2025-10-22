"use client";
import { assets } from "@/assets/asset";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null); // ✅ New ref

  // ✅ Improved toggle with event parameter
  const toggleMenu = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsMenuOpen((prev) => !prev);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (menu: string) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setActiveDropdown(null);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // ✅ Fixed click outside handler
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;

      // ✅ Check if click is on toggle button - ignore it
      if (toggleButtonRef.current?.contains(target)) {
        return;
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMenuOpen(false);
        setMobileDropdown(null);
      }
    };

    // ✅ Delay to prevent immediate trigger
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems = {
    packages: [
      { label: "Coworking Space", href: "/packages/coworking" },
      { label: "Business Address", href: "/packages/business-address" },
      { label: "Amenities", href: "/packages/amenities" },
    ],
    community: [
      { label: "Previous Events", href: "/community/previous-events" },
      { label: "Upcoming Events", href: "/community/upcoming-events" },
      { label: "Gallery", href: "/community/gallery" },
    ],
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6">
          <nav className="flex justify-between h-auto items-center py-4">
            {/* Logo */}
            <div>
              <Image
                src={assets.portb_logo}
                alt="logo"
                width={120}
                height={120}
                quality={100}
                priority
              />
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8 text-lg">
              <Link
                href="/"
                className="text-gray-800 hover:text-green-600 transition-colors"
              >
                Home
              </Link>

              {/* Packages Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("packages")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-gray-800 hover:text-green-600 transition-colors py-2">
                  Packages
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === "packages" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    activeDropdown === "packages" ? "visible" : "invisible"
                  }`}
                >
                  <div
                    className={`w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      activeDropdown === "packages"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      {menuItems.packages.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setActiveDropdown("community")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 text-gray-800 hover:text-green-600 transition-colors py-2">
                  Community
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === "community" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                    activeDropdown === "community" ? "visible" : "invisible"
                  }`}
                >
                  <div
                    className={`w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                      activeDropdown === "community"
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      {menuItems.community.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="text-gray-800 hover:text-green-600 transition-colors"
              >
                Contact us
              </Link>
            </div>

            <div className="hidden md:flex">
              <Link
                href="/login"
                className="bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800 transition-colors"
              >
                Admin
              </Link>
            </div>

            {/* ✅ Mobile menu button with ref and improved handler */}
            <button
              ref={toggleButtonRef}
              className="md:hidden p-2 z-[110] touch-manipulation"
              onClick={toggleMenu}
              onTouchEnd={(e) => {
                e.preventDefault();
                toggleMenu(e);
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </nav>
        </div>

        <div className="gradient-wave md:h-3 h-2 w-full" />
      </nav>

      <div className="h-[100px] md:h-[110px]" />

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setMobileDropdown(null);
          }}
        />
      )}

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-[100px] left-0 right-0 bg-white border-t border-gray-100 shadow-lg transition-all duration-300 z-[90] ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="py-4 px-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
          <Link
            href="/"
            className="block py-2 text-gray-800 hover:text-green-600"
            onClick={toggleMenu}
          >
            Home
          </Link>

          <div>
            <button
              className="flex items-center justify-between w-full py-2 text-gray-800 hover:text-green-600"
              onClick={() => toggleMobileDropdown("packages")}
            >
              <span>Packages</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileDropdown === "packages" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileDropdown === "packages" ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="pl-4 py-2 space-y-2">
                {menuItems.packages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-gray-600 hover:text-green-600"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              className="flex items-center justify-between w-full py-2 text-gray-800 hover:text-green-600"
              onClick={() => toggleMobileDropdown("community")}
            >
              <span>Community</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileDropdown === "community" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileDropdown === "community" ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="pl-4 py-2 space-y-2">
                {menuItems.community.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-gray-600 hover:text-green-600"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="block py-2 text-gray-800 hover:text-green-600"
            onClick={toggleMenu}
          >
            Contact us
          </Link>

          <div className="pt-4">
            <Link
              href="/login"
              className="block w-full text-center bg-gray-900 text-white rounded-lg px-6 py-2 hover:bg-gray-800 transition-colors"
              onClick={toggleMenu}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
