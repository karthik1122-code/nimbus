"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060512]/80 backdrop-blur-xl border-b border-white/9 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group select-none z-10">
          <div className="brand-mark group-hover:shadow-[0_0_24px_rgba(139,92,246,0.7)] transition-all duration-300" />
          <span className="font-display font-semibold text-xl text-white tracking-tight">
            Nimbus
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-slate-300">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 relative group py-1 ${
                  active ? "text-white font-semibold" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#c9bbff] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <button className="px-4.5 py-2 text-[14px] font-medium text-slate-300 hover:text-white border border-white/10 rounded-xl hover:border-white/25 bg-[#131228] hover:bg-[#0d0c1e] transition-all duration-200">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="relative group px-5 py-2 rounded-xl text-[14px] font-semibold text-white overflow-hidden shadow-[0_6px_24px_-6px_rgba(139,92,246,0.55)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_-4px_rgba(139,92,246,0.65)]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] group-hover:from-[#9b6df6] group-hover:to-[#6b4df0] transition-all" />
              <span className="relative flex items-center gap-1.5">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 bg-[#131228] border border-white/10 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#0d0c1e]/98 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <nav className="flex flex-col gap-2 text-sm font-medium text-slate-300">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-2.5 text-sm font-medium text-white border border-white/15 rounded-xl bg-[#131228] hover:bg-white/5 transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <button className="w-full py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] transition-all">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
