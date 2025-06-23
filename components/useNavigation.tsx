"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  showBackButton?: boolean;
  backHref?: string;
  backText?: string;
  showAdminButton?: boolean;
  variant?: "default" | "transparent";
}

export default function Navigation({ 
  showBackButton = false, 
  backHref = "/", 
  backText = "Back to Home",
  showAdminButton = true,
  variant = "default"
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/summer-camp", label: "Summer Camp" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className={`shadow-sm border-b sticky top-0 z-50 ${
      variant === "transparent" ? "bg-white/95 backdrop-blur-sm" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center">
            {showBackButton ? (
              <Link href={backHref} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Image
                  src="/swimp.jpg"
                  alt="Swim Perfect Limited"
                  width={120}
                  height={60}
                className="h-16 w-14 rounded-md mr-3"
                  priority
                />
              </Link>
            ) : (
              <Link href="/" className="flex items-center">
                <Image
                  src="/swimp.jpg"
                  alt="Swim Perfect Limited"
                  width={120}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            {/* {showAdminButton && (
              <Link href="/admin/login">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            )} */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              {/* {showAdminButton && (
                <div className="px-2 pt-2">
                  <Link href="/admin/login" onClick={closeMenu}>
                    <Button variant="outline" size="sm" className="w-full">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              )} */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}