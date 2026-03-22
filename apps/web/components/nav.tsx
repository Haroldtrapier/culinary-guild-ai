"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChefHat, Flame, BookOpen, Globe, Beaker, UtensilsCrossed, Star, Scroll } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/kitchen-trials", label: "Kitchen Trials", icon: Flame },
  { href: "/otaku-guild", label: "Otaku Guild", icon: Star },
  { href: "/guilds", label: "Guilds", icon: ChefHat },
  { href: "/flavor-atlas", label: "Flavor Atlas", icon: Globe },
  { href: "/spice-codex", label: "Spice Codex", icon: Scroll },
  { href: "/heritage-table", label: "Heritage", icon: BookOpen },
  { href: "/mixology-chamber", label: "Mixology", icon: Beaker },
  { href: "/recipe-generator", label: "Recipes", icon: UtensilsCrossed },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-void/95 backdrop-blur-sm border-b border-elevated shadow-premium"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center group-hover:shadow-gold transition-shadow duration-300">
            <ChefHat className="w-4 h-4 text-void" />
          </div>
          <span className="font-cinzel font-bold tracking-widest text-sm text-cream group-hover:text-gold transition-colors duration-300">
            THE CULINARY GUILD
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs font-inter tracking-wide transition-colors duration-200 rounded-sm",
                  active
                    ? "text-gold"
                    : "text-cream-muted hover:text-cream hover:bg-elevated"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost text-xs py-2 px-4">
            Dashboard
          </Link>
          <Link href="/dashboard" className="btn-gold text-xs py-2 px-4">
            Enter Guild
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-cream-muted hover:text-gold transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 overflow-hidden",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-deep border-b border-elevated px-6 py-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-sm text-sm transition-colors duration-200",
                  active
                    ? "text-gold bg-gold-faint"
                    : "text-cream-muted hover:text-cream hover:bg-elevated"
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-elevated flex flex-col gap-2">
            <Link href="/dashboard" className="btn-outline-gold text-xs py-2 justify-center">
              Dashboard
            </Link>
            <Link href="/dashboard" className="btn-gold text-xs py-2 justify-center">
              Enter Guild
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
