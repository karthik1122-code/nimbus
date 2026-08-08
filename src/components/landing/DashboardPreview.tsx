"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Wallet,
  Star,
  Sparkles,
  UserCheck,
  BarChart3,
  Search,
  Bell,
  MessageSquare,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { StatusBadge } from "@/components/design-system/StatusBadge";

export function DashboardPreview() {
  const [searchQuery, setSearchQuery] = useState("");

  const previewLogs = [
    {
      timestamp: "2026-08-08 14:24",
      status: "In Queue",
      source: "$ 347.09",
      dataType: "CRM Lead Sync",
      notes: "Validated",
    },
    {
      timestamp: "2026-08-08 13:50",
      status: "Processed",
      source: "Traffic Event",
      dataType: "Web Analytics",
      notes: "Updated",
    },
    {
      timestamp: "2026-08-08 13:10",
      status: "Paid",
      source: "Bounce Report",
      dataType: "CRM Pipeline",
      notes: "Format",
    },
    {
      timestamp: "2026-08-08 12:45",
      status: "In Queue",
      source: "Customer Entry",
      dataType: "CRM Support",
      notes: "Updated",
    },
  ];

  const filteredLogs = previewLogs.filter(
    (log) =>
      log.dataType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-6xl mx-auto rounded-3xl p-1 md:p-2 bg-gradient-to-b from-purple-500/30 via-white/10 to-purple-900/20 shadow-[0_20px_80px_rgba(124,58,237,0.35)] backdrop-blur-2xl border border-purple-500/30 overflow-hidden"
    >
      {/* Top Glass Shell Container */}
      <div className="w-full bg-[#0B0816] rounded-[22px] overflow-hidden border border-white/10 flex flex-col min-h-[540px]">
        {/* Top App Control Bar */}
        <div className="px-6 py-4 bg-[#0E0A1E]/80 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <h3 className="ml-4 text-base md:text-lg font-bold text-white tracking-wide">
              Dashboard Overview
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Search */}
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl glass-input placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            {/* Quick Action Icons */}
            <button className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-0.5 shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              <div className="w-full h-full rounded-full bg-[#120D26] flex items-center justify-center text-xs font-bold text-purple-300">
                IA
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12">
          {/* Left Mini Sidebar */}
          <div className="md:col-span-3 bg-[#080512] p-5 border-r border-white/5 flex flex-col gap-6">
            {/* General Section */}
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                General
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-xs shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs font-medium cursor-pointer">
                  <FileText className="w-4 h-4" />
                  <span>Reports</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs font-medium cursor-pointer">
                  <Wallet className="w-4 h-4" />
                  <span>Wallets Manage</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs font-medium cursor-pointer">
                  <Star className="w-4 h-4" />
                  <span>Favorite Transaction</span>
                </div>
              </div>
            </div>

            {/* Intelligence Section */}
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                Mentors & AI
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs font-medium cursor-pointer">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI Insights</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs font-medium cursor-pointer">
                  <UserCheck className="w-4 h-4" />
                  <span>Followed Agents</span>
                </div>
              </div>
            </div>

            {/* Community Section */}
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                Community
              </p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs font-medium cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  <span>Visualizations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="md:col-span-9 p-6 bg-[#0B0818] flex flex-col gap-6">
            {/* Table Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
              <div>
                <h4 className="text-base font-semibold text-white">Recent Activity Logs</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live execution pipeline & AI agent status feeds
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg glass-input w-44"
                  />
                </div>
                <button className="p-1.5 rounded-lg glass-pill text-slate-400 hover:text-white">
                  <Filter className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-lg glass-pill text-slate-400 hover:text-white">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080512]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#120D24] text-slate-400 font-semibold border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Data Type</th>
                    <th className="py-3 px-4 text-right">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-purple-950/20 transition-colors group">
                      <td className="py-3 px-4 font-mono text-slate-400">{log.timestamp}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-200">{log.source}</td>
                      <td className="py-3 px-4 text-purple-300">{log.dataType}</td>
                      <td className="py-3 px-4 text-right text-slate-400 group-hover:text-white transition-colors">
                        {log.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Mini Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl glass-panel flex flex-col gap-1 border border-white/5">
                <span className="text-[11px] text-slate-400">Execution Speed</span>
                <span className="text-lg font-bold text-emerald-400">142 ms avg</span>
              </div>
              <div className="p-4 rounded-xl glass-panel flex flex-col gap-1 border border-white/5">
                <span className="text-[11px] text-slate-400">Success Rate</span>
                <span className="text-lg font-bold text-purple-300">99.84%</span>
              </div>
              <div className="p-4 rounded-xl glass-panel flex flex-col gap-1 border border-white/5">
                <span className="text-[11px] text-slate-400">Active Pipeline</span>
                <span className="text-lg font-bold text-amber-300">148 Agents</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
