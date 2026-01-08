"use client";
import { assets } from "@/assets/asset";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, UserCircle } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isLoginPage = pathname === "/login";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // ✅ FIXED: Same scroll behavior for ALL pages
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Update scrolled state
          setIsScrolled(currentScrollY > 50);

          // ✅ Apply hide/show to ALL pages (removed isHomePage check)
          if (currentScrollY < lastScrollY || currentScrollY < 50) {
            // Scrolling up or at top - show navbar
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            setIsVisible(false);
            setActiveDropdown(null);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // ✅ Removed isHomePage dependency

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const menuItems = {
    packages: [
      { label: "Coworking Space", href: "/coworking-space" },
      { label: "Business Address", href: "/business-address" },
      { label: "Amenities", href: "/amenities" },
      { label: "Program", href: "/program" },
    ],
    community: [
      { label: "Previous Events", href: "/previous-events" },
      { label: "Upcoming Events", href: "/upcoming-events" },
      { label: "Gallery", href: "/gallery" },
    ],
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setMobileDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (menu: string) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  };

  // Only transparent on home page at top
  const isTransparent = isHomePage && !isScrolled && !isMenuOpen;

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isTransparent ? "bg-transparent" : "bg-white shadow-sm"}`}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="mx-auto px-6 md:px-12">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={assets.portb_logo}
                alt="PortB Cowork"
                width={120}
                height={40}
                quality={100}
                priority
                className={`h-auto w-auto transition-all duration-300 ${
                  isTransparent ? "brightness-0 invert" : ""
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-lg">
              <Link
                href="/"
                className={`transition-colors duration-200 ${
                  isTransparent
                    ? "text-white hover:text-green-400"
                    : "text-gray-800 hover:text-green-600"
                }`}
              >
                Home
              </Link>

              {/* Packages Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("packages")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 transition-colors duration-200 ${
                    isTransparent
                      ? "text-white hover:text-green-400"
                      : "text-gray-800 hover:text-green-600"
                  }`}
                >
                  Packages
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "packages" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "packages" && (
                  <div className="absolute top-full left-0 pt-2 z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      {menuItems.packages.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Community Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("community")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 transition-colors duration-200 ${
                    isTransparent
                      ? "text-white hover:text-green-400"
                      : "text-gray-800 hover:text-green-600"
                  }`}
                >
                  Community
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === "community" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "community" && (
                  <div className="absolute top-full left-0 pt-2 z-[200] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="min-w-[220px] bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      {menuItems.community.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className={`transition-colors duration-200 ${
                  isTransparent
                    ? "text-white hover:text-green-400"
                    : "text-gray-800 hover:text-green-600"
                }`}
              >
                Contact us
              </Link>
            </div>

            {/* Desktop Admin Icon Button */}
            {!isLoginPage && (
              <div className="hidden md:block">
                <Link
                  href="/login"
                  className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                    isTransparent
                      ? "text-white hover:text-green-400 hover:bg-white/10"
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-100"
                  }`}
                  aria-label="Admin Login"
                  title="Admin Login"
                >
                  <UserCircle className="w-7 h-7" />
                </Link>
              </div>
            )}

            {isLoginPage && <div className="hidden md:block w-10"></div>}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 -mr-2 rounded-md transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-gray-800 hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>

        {/* Gradient Wave */}
        <div
          className={`gradient-wave h-2 md:h-3 w-full transition-opacity duration-300 ${
            isTransparent ? "opacity-0" : "opacity-100"
          }`}
        />
      </header>

      {/* Spacer - Only for non-home pages */}
      {!isHomePage && <div className="h-[100px] md:h-[110px]" />}

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-[100px] left-0 right-0 bg-white border-t shadow-lg z-40 md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="px-4 py-4 space-y-1 max-h-[calc(100vh-100px)] overflow-y-auto">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="block py-2.5 text-gray-800 hover:text-green-600 transition-colors"
          >
            Home
          </Link>

          {/* Packages Mobile Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown("packages")}
              className="flex items-center justify-between w-full py-2.5 text-gray-800 hover:text-green-600 transition-colors"
            >
              <span>Packages</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileDropdown === "packages" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileDropdown === "packages" ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="pl-4 space-y-1 py-2">
                {menuItems.packages.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Community Mobile Dropdown */}
          <div>
            <button
              onClick={() => toggleMobileDropdown("community")}
              className="flex items-center justify-between w-full py-2.5 text-gray-800 hover:text-green-600 transition-colors"
            >
              <span>Community</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileDropdown === "community" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileDropdown === "community" ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="pl-4 space-y-1 py-2">
                {menuItems.community.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="block py-2.5 text-gray-800 hover:text-green-600 transition-colors"
          >
            Contact us
          </Link>

          {!isLoginPage && (
            <div className="pt-4 border-t">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 text-gray-800 py-2.5 hover:text-green-600 transition-colors"
              >
                <UserCircle className="w-5 h-5" />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
