'use client'
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="border border-gray-600">
      <div className="px-6 border border-black">
        <div className="flex border border-black justify-between h-16 items-center">
          <div className="font-bold border border-gray-300">logo portB</div>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/packages"
              className="text-gray-500 hover:text-blue-600"
            >
              Packages
            </Link>
            <Link
              href="/community"
              className="text-gray-500 hover:text-blue-600"
            >
              Community
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-blue-600">
              Contact us
            </Link>
          </div>

          <div className="md:hidden" onClick={toggleMenu}>
            click menu
          </div>
        </div>
      </div>

      <div className=" h-5 bg-gradient-to-r from-green-400 to-green-600">
        {/* Gradient hijau */}
      </div>

      {/* navbar mobile view */}

      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4">
          <Link href="/" className="text-gray-500 hover:text-blue-600">
            Home
          </Link>
          <Link href="/packages" className="text-gray-500 hover:text-blue-600">
            Packages
          </Link>
          <Link href="/community" className="text-gray-500 hover:text-blue-600">
            Community
          </Link>
          <Link href="/contact" className="text-gray-500 hover:text-blue-600">
            Contact us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
