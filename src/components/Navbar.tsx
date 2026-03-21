"use client";

import Link from "next/link";
import { useState } from "react";
import { ChefHat, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/assistant", label: "AI Assistant" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-brand-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <ChefHat className="h-8 w-8 text-brand-500 group-hover:text-brand-600 transition-colors" />
            <span className="text-xl font-bold text-gradient">
              Culinary Guild AI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assistant"
              className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold hover:from-brand-600 hover:to-brand-700 transition-all shadow-md hover:shadow-lg"
            >
              Start Cooking
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-brand-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-brand-100/50 bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
