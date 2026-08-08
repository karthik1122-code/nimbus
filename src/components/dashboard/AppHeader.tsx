"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Menu,
  X,
  User,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  CheckCircle2,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown } from "@/components/ui/Dropdown";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: "analysis" | "report" | "insight";
}

export function AppHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      title: "AI analysis completed",
      desc: "Your Q3 dataset has finished processing with 12 new signals.",
      time: "2 minutes ago",
      unread: true,
      type: "analysis",
    },
    {
      id: "n2",
      title: "Report ready",
      desc: "Monthly Growth Report executive brief is ready for export.",
      time: "1 hour ago",
      unread: true,
      type: "report",
    },
    {
      id: "n3",
      title: "New insight discovered",
      desc: "Revenue increased 18.4% primarily from returning subscribers.",
      time: "3 hours ago",
      unread: false,
      type: "insight",
    },
  ]);

  const hasUnread = notifications.some((n) => n.unread);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getPageBreadcrumb = (path: string) => {
    if (path === "/dashboard" || path === "/dashboard/overview") return "Overview";
    if (path.includes("analytics")) return "Analytics";
    if (path.includes("data")) return "Data";
    if (path.includes("insights")) return "AI Insights";
    if (path.includes("reports")) return "Reports";
    if (path.includes("settings")) return "Settings";
    if (path.includes("billing")) return "Billing";
    return "Dashboard";
  };

  const breadcrumb = getPageBreadcrumb(pathname);

  return (
    <header className="sticky top-0 z-20 bg-[#090614]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4 select-none">
      {/* Page Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl glass-pill text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400">InsightAI</span>
          <span className="text-slate-600">/</span>
          <span className="text-white tracking-wide">{breadcrumb}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search datasets, signals, AI..."
            className="w-full pl-10 pr-10 py-2 text-xs rounded-xl glass-input placeholder:text-slate-500"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 rounded border border-white/10">
            ⌘K
          </kbd>
        </div>

        {/* NOTIFICATION CENTER DROPDOWN */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500" />
              </>
            )}
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel bg-[#0c091f] border border-purple-500/30 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Notifications</span>
                  </span>
                  {hasUnread && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl transition-all border text-xs space-y-1 ${
                        n.unread
                          ? "bg-purple-600/15 border-purple-500/30 text-white"
                          : "bg-white/5 border-white/5 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          {n.type === "analysis" && <Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                          {n.type === "report" && <FileText className="w-3.5 h-3.5 text-purple-400" />}
                          {n.type === "insight" && <Lightbulb className="w-3.5 h-3.5 text-purple-400" />}
                          <span>{n.title}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-normal">{n.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 text-center">
                  <Link
                    href="/dashboard/insights"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] text-purple-300 hover:text-white font-bold inline-flex items-center gap-1"
                  >
                    <span>View all notifications</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACCOUNT DROPDOWN */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 cursor-pointer pl-2 border-l border-white/10">
              <Avatar name="Alex Vance" size="sm" status="online" />
            </div>
          }
          items={[
            { id: "1", label: "Profile", icon: <User className="w-4 h-4" />, onClick: () => (window.location.href = "/dashboard/settings") },
            { id: "2", label: "Settings", icon: <Settings className="w-4 h-4" />, onClick: () => (window.location.href = "/dashboard/settings") },
            { id: "3", label: "Billing", icon: <CreditCard className="w-4 h-4" />, onClick: () => (window.location.href = "/dashboard/billing") },
            { id: "4", label: "Help & Docs", icon: <HelpCircle className="w-4 h-4" /> },
            { id: "5", label: "Log out", danger: true, onClick: () => (window.location.href = "/login") },
          ]}
        />
      </div>
    </header>
  );
}
