"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  BarChart3,
  Database,
  Lightbulb,
  FileText,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown } from "@/components/ui/Dropdown";
import { motion, AnimatePresence } from "framer-motion";

export function AppSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const mainItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Data", href: "/dashboard/data", icon: Database },
    { name: "AI Insights", href: "/dashboard/insights", icon: Lightbulb, badge: "New" },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
  ];

  const accountItems = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-[#07050F] border-r border-white/8 flex flex-col justify-between shrink-0 min-h-screen hidden lg:flex sticky top-0 h-screen z-30 overflow-hidden"
    >
      {/* Top logo area */}
      <div className="flex flex-col gap-5 overflow-hidden flex-1 p-4">
        <div className={cn("flex items-center gap-3 px-1 py-1", collapsed && "justify-center")}>
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-500 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] transition-all flex-shrink-0">
              <div className="w-full h-full bg-[#07050F] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-base font-bold text-white tracking-tight whitespace-nowrap"
              >
                Insight<span className="text-purple-400">AI</span>
              </motion.span>
            )}
          </Link>
        </div>

        {/* Workspace badge */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-2 rounded-xl bg-purple-500/8 border border-purple-500/15 flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-[8px] font-black text-white flex-shrink-0">A</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Alex&apos;s Workspace</p>
              <p className="text-[10px] text-slate-500 font-mono truncate">Pro Plan</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500 flex-shrink-0" />
          </motion.div>
        )}

        {/* MAIN nav */}
        <div className="space-y-0.5">
          {!collapsed && (
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-3">MAIN</p>
          )}
          {mainItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative",
                  collapsed && "justify-center",
                  active
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.45)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                {/* Active indicator bar */}
                {active && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
                )}
                <Icon className={cn("w-4 h-4 transition-colors flex-shrink-0", active ? "text-white" : "text-slate-400 group-hover:text-purple-400")} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-purple-500/25 text-purple-300 border border-purple-500/30">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        {/* ACCOUNT nav */}
        <div className="space-y-0.5">
          {!collapsed && (
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-3">ACCOUNT</p>
          )}
          {accountItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group",
                  collapsed && "justify-center",
                  active
                    ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.45)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4 transition-colors flex-shrink-0", active ? "text-white" : "text-slate-400 group-hover:text-purple-400")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* AI Boost promo card */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-violet-900/20 border border-purple-500/20 space-y-2.5 mt-auto"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Upgrade to Enterprise</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Unlock unlimited AI insights, dedicated support, and custom ML models.
            </p>
            <button className="w-full py-1.5 rounded-lg text-[10px] font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors">
              Learn more →
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom user section */}
      <div className="border-t border-white/8 p-4">
        {collapsed ? (
          <div className="flex justify-center">
            <Avatar name="Alex Vance" size="sm" status="online" />
          </div>
        ) : (
          <Dropdown
            align="left"
            trigger={
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                <div className="flex items-center gap-3">
                  <Avatar name="Alex Vance" size="sm" status="online" />
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-semibold text-white group-hover:text-purple-200 transition-colors truncate">
                      Alex Vance
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono truncate">alex.vance@insightai.io</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors flex-shrink-0" />
              </div>
            }
            items={[
              { id: "1", label: "Profile Settings", icon: <User className="w-4 h-4" /> },
              { id: "2", label: "Billing & Invoices", icon: <CreditCard className="w-4 h-4" /> },
              { id: "3", label: "Sign out", danger: true },
            ]}
          />
        )}
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-[#0D0A18] border border-white/15 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/40 transition-all shadow-md z-50"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </motion.aside>
  );
}
