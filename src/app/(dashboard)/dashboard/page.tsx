"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileText, Zap, TrendingUp, AlertTriangle,
  Search, Bell, MessageSquare, LogOut, CheckCircle2, ChevronRight,
  Filter, Play, Pause, Download, ExternalLink, RefreshCw, X, Sliders,
  Check, Clock, ShieldAlert, Sparkles, ArrowRight, CornerUpLeft, Plus,
} from "lucide-react";

/* ────────────────────────────────────────────
   TYPES & DEFAULT DATA
   ──────────────────────────────────────────── */
interface ActivityRow {
  id: string;
  time: string;
  status: "queued" | "processed" | "resolved";
  source: string;
  value: string;
  notes: string;
}

interface AgentItem {
  id: string;
  name: string;
  role: string;
  tasks: string;
  success: string;
  active: boolean;
}

interface IntegrationItem {
  id: string;
  name: string;
  desc: string;
  connected: boolean;
  logo: string;
}

interface EscalationItem {
  id: string;
  title: string;
  meta: string;
  severity: "high" | "med";
  resolvedAt?: string;
}

const DEFAULT_ACTIVITY: ActivityRow[] = [
  { id: "1", time: "10:24:02", status: "queued", source: "CRM", value: "$347.09", notes: "Validated" },
  { id: "2", time: "10:18:47", status: "processed", source: "Web Analytics", value: "Traffic event", notes: "Updated" },
  { id: "3", time: "10:05:14", status: "resolved", source: "Support", value: "Ticket #8821", notes: "Closed" },
  { id: "4", time: "09:58:30", status: "processed", source: "CRM", value: "Bounce report", notes: "Formatted" },
  { id: "5", time: "09:41:09", status: "queued", source: "CRM", value: "Customer entry", notes: "Updated" },
  { id: "6", time: "09:33:52", status: "resolved", source: "Support", value: "Ticket #8814", notes: "Escalated → closed" },
];

const DEFAULT_AGENTS: AgentItem[] = [
  { id: "a1", name: "Support Tier-1", role: "Customer Support", tasks: "4,820", success: "96.8%", active: true },
  { id: "a2", name: "Lead Prospector", role: "Lead Generation", tasks: "3,140", success: "94.2%", active: true },
  { id: "a3", name: "Invoice Parser", role: "Data Entry", tasks: "2,890", success: "99.4%", active: true },
  { id: "a4", name: "Churn Predictor", role: "Analytics", tasks: "1,240", success: "91.5%", active: true },
  { id: "a5", name: "CRM Enricher", role: "Lead Generation", tasks: "2,150", success: "95.6%", active: false },
  { id: "a6", name: "Returns Desk", role: "Customer Support", tasks: "1,680", success: "98.1%", active: true },
];

const DEFAULT_INTEGRATIONS: IntegrationItem[] = [
  { id: "i1", name: "HubSpot", desc: "Sync enriched leads and lifecycle stages.", connected: true, logo: "HS" },
  { id: "i2", name: "Zendesk", desc: "Auto-resolve tickets and update macros.", connected: true, logo: "ZD" },
  { id: "i3", name: "Salesforce", desc: "Bidirectional sync for enterprise deals.", connected: false, logo: "SF" },
  { id: "i4", name: "Stripe", desc: "Parse invoice events and subscription metrics.", connected: true, logo: "ST" },
  { id: "i5", name: "PostgreSQL", desc: "Read & write direct database records.", connected: true, logo: "PG" },
  { id: "i6", name: "Slack", desc: "Instant escalation notifications & bot actions.", connected: true, logo: "SL" },
];

const DEFAULT_ESCALATIONS: EscalationItem[] = [
  { id: "e1", title: "Order #4471 payment mismatch", meta: "Flagged 4m ago · Customer requested manual review", severity: "high" },
  { id: "e2", title: "Unrecognized invoice line item #908", meta: "Flagged 18m ago · Parsing confidence 64%", severity: "med" },
  { id: "e3", title: "EU VAT Tax ID validation fail", meta: "Flagged 42m ago · Lead fit score 89%", severity: "med" },
];

/* ────────────────────────────────────────────
   REAL REPORT DOWNLOADER (Client-side Blob)
   ──────────────────────────────────────────── */
function triggerReportDownload(title: string) {
  const content = `================================================
NIMBUS AI AUTOMATION REPORT
Title: ${title}
Generated: ${new Date().toLocaleString()}
Status: VERIFIED & COMPLETED
================================================

SUMMARY:
- Total Tasks Processed: 12,480
- Autonomous Resolution Rate: 96.4%
- Active Agents: 18 Live
- Average Response Speed: 92 seconds (-14s YoY)

TASK MIX BREAKDOWN:
1. Lead Generation: 42% (340 qualified leads/mo)
2. Customer Support: 35% (92% first-contact resolution)
3. Data Entry: 23% (14,200 records reconciled/mo)

AUDIT TRAIL:
[10:24:02] CRM Lead Sync -> Validated ($347.09)
[10:18:47] Web Analytics -> Updated
[10:05:14] Support Ticket #8821 -> Closed
[09:58:30] Bounce Report -> Formatted

© 2026 Nimbus Labs, Inc. All rights reserved.
`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ────────────────────────────────────────────
   INNER DASHBOARD CONTENT COMPONENT
   ──────────────────────────────────────────── */
function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTabParam = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "reports" | "integrations" | "insights" | "escalations">(
    (currentTabParam as any) || "overview"
  );
  const [escalationTab, setEscalationTab] = useState<"pending" | "resolved">("pending");

  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [globalSearch, setGlobalSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "queued" | "processed" | "resolved">("all");
  const [chartRange, setChartRange] = useState<"7" | "30" | "90">("7");

  // State with LocalStorage Persistence
  const [activity, setActivity] = useState<ActivityRow[]>(DEFAULT_ACTIVITY);
  const [agents, setAgents] = useState<AgentItem[]>(DEFAULT_AGENTS);
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(DEFAULT_INTEGRATIONS);
  const [pendingEscalations, setPendingEscalations] = useState<EscalationItem[]>(DEFAULT_ESCALATIONS);
  const [resolvedEscalations, setResolvedEscalations] = useState<EscalationItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync tab with URL search parameter
  useEffect(() => {
    if (currentTabParam && currentTabParam !== activeTab) {
      setActiveTab(currentTabParam as any);
    }
  }, [currentTabParam]);

  const switchTab = (tabId: string) => {
    setActiveTab(tabId as any);
    setMobileSidebar(false);
    router.push(`/dashboard?tab=${tabId}`, { scroll: false });
  };

  // LocalStorage initialization
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nimbus_dashboard_state_v2");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.agents) setAgents(parsed.agents);
        if (parsed.integrations) setIntegrations(parsed.integrations);
        if (parsed.pendingEscalations) setPendingEscalations(parsed.pendingEscalations);
        if (parsed.resolvedEscalations) setResolvedEscalations(parsed.resolvedEscalations);
      }
    } catch (e) {
      console.error("LocalStorage load error", e);
    }
  }, []);

  // Persist to LocalStorage
  const saveState = (updated: {
    agents?: AgentItem[];
    integrations?: IntegrationItem[];
    pendingEscalations?: EscalationItem[];
    resolvedEscalations?: EscalationItem[];
  }) => {
    try {
      const next = {
        agents: updated.agents ?? agents,
        integrations: updated.integrations ?? integrations,
        pendingEscalations: updated.pendingEscalations ?? pendingEscalations,
        resolvedEscalations: updated.resolvedEscalations ?? resolvedEscalations,
      };
      localStorage.setItem("nimbus_dashboard_state_v2", JSON.stringify(next));
    } catch (e) {
      console.error("LocalStorage save error", e);
    }
  };

  // Keyboard shortcut Cmd+K or / to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleAgent = (id: string) => {
    const nextAgents = agents.map((a) => {
      if (a.id === id) {
        const active = !a.active;
        showToast(`${a.name} is now ${active ? "active" : "paused"}.`);
        return { ...a, active };
      }
      return a;
    });
    setAgents(nextAgents);
    saveState({ agents: nextAgents });
  };

  const toggleIntegration = (id: string) => {
    const nextIntegrations = integrations.map((i) => {
      if (i.id === id) {
        const connected = !i.connected;
        showToast(`${i.name} ${connected ? "connected" : "disconnected"}.`);
        return { ...i, connected };
      }
      return i;
    });
    setIntegrations(nextIntegrations);
    saveState({ integrations: nextIntegrations });
  };

  const resolveEscalation = (id: string) => {
    const target = pendingEscalations.find((e) => e.id === id);
    if (!target) return;
    const nextPending = pendingEscalations.filter((e) => e.id !== id);
    const nextResolved = [{ ...target, resolvedAt: new Date().toLocaleTimeString() }, ...resolvedEscalations];
    setPendingEscalations(nextPending);
    setResolvedEscalations(nextResolved);
    saveState({ pendingEscalations: nextPending, resolvedEscalations: nextResolved });
    showToast("Escalation resolved!");
  };

  const reopenEscalation = (id: string) => {
    const target = resolvedEscalations.find((e) => e.id === id);
    if (!target) return;
    const nextResolved = resolvedEscalations.filter((e) => e.id !== id);
    const nextPending = [target, ...pendingEscalations];
    setResolvedEscalations(nextResolved);
    setPendingEscalations(nextPending);
    saveState({ pendingEscalations: nextPending, resolvedEscalations: nextResolved });
    showToast("Escalation reopened.");
  };

  // Global search filtering across ALL categories
  const hasGlobalSearch = globalSearch.trim().length > 0;
  const q = globalSearch.toLowerCase();

  const searchResults = {
    agents: agents.filter((a) => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)),
    integrations: integrations.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)),
    activity: activity.filter((row) => row.source.toLowerCase().includes(q) || row.value.toLowerCase().includes(q) || row.notes.toLowerCase().includes(q)),
    escalations: pendingEscalations.filter((e) => e.title.toLowerCase().includes(q)),
  };

  const totalSearchMatches =
    searchResults.agents.length + searchResults.integrations.length + searchResults.activity.length + searchResults.escalations.length;

  const filteredActivity = activity.filter((row) => {
    const matchStatus = statusFilter === "all" || row.status === statusFilter;
    const matchSearch =
      row.source.toLowerCase().includes(tableSearch.toLowerCase()) ||
      row.value.toLowerCase().includes(tableSearch.toLowerCase()) ||
      row.notes.toLowerCase().includes(tableSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  const liveAgentsCount = agents.filter((a) => a.active).length;

  return (
    <div className="h-screen bg-[#060512] text-[#f3f1fb] flex overflow-hidden font-sans">
      {/* ────────────────────────────────────────────
         SIDEBAR
         ──────────────────────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[252px] bg-[#0a0918] border-r border-white/6 p-5 flex flex-col justify-between transition-transform duration-300 ${
          mobileSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-7 px-1 group">
            <div className="brand-mark !w-5 !h-5 !rounded-[6px]" />
            <span className="font-display font-semibold text-lg text-white">Nimbus</span>
          </Link>

          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-semibold text-[#615c82] uppercase tracking-wider block px-2.5 mb-2">
                General
              </span>
              <nav className="space-y-1">
                {[
                  { id: "overview", label: "Overview", icon: LayoutDashboard },
                  { id: "agents", label: "Agents", icon: Users, badge: liveAgentsCount },
                  { id: "reports", label: "Reports", icon: FileText },
                  { id: "integrations", label: "Integrations", icon: Zap },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => switchTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] text-white shadow-[0_6px_18px_-6px_rgba(139,92,246,0.45)] font-semibold"
                          : "text-[#9d98bb] hover:text-white hover:bg-[#131228]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-[#615c82] uppercase tracking-wider block px-2.5 mb-2">
                Monitor
              </span>
              <nav className="space-y-1">
                {[
                  { id: "insights", label: "Insights", icon: TrendingUp },
                  { id: "escalations", label: "Escalations", icon: AlertTriangle, badge: pendingEscalations.length, warn: true },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => switchTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] text-white shadow-[0_6px_18px_-6px_rgba(139,92,246,0.45)] font-semibold"
                          : "text-[#9d98bb] hover:text-white hover:bg-[#131228]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                          item.warn && pendingEscalations.length > 0 ? "bg-[#f0b357]/20 text-[#f0b357]" : active ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-white/6">
          <div className="bg-[#0d0c1e] border border-white/8 rounded-xl p-3.5 space-y-2">
            <span className="text-xs font-semibold text-white block">Growth plan</span>
            <div className="w-full h-1.5 rounded-full bg-[#131228] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#c9bbff] rounded-full w-[64%]" />
            </div>
            <span className="text-[11.5px] text-[#615c82] block">6,420 / 10,000 tasks used</span>
          </div>

          <Link href="/login">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#9d98bb] hover:text-white hover:bg-[#131228] transition-colors">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </Link>
        </div>
      </aside>

      {/* Mobile scrim */}
      {mobileSidebar && (
        <div
          onClick={() => setMobileSidebar(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* ────────────────────────────────────────────
         MAIN DASHBOARD BODY
         ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Topbar */}
        <header className="h-[68px] border-b border-white/6 px-6 flex items-center justify-between gap-4 flex-shrink-0 bg-[#060512] z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebar(true)}
              className="lg:hidden p-2 rounded-xl bg-[#131228] border border-white/10 text-white"
              aria-label="Toggle sidebar"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <h1 className="font-display text-lg font-semibold text-white capitalize">
              {activeTab} Overview
            </h1>
          </div>

          {/* Global Search bar with Instant Multi-Category Dropdown */}
          <div className="relative hidden sm:block w-80">
            <div className="flex items-center gap-2 bg-[#0d0c1e] border border-white/9 rounded-xl px-3.5 py-2 text-xs">
              <Search className="w-3.5 h-3.5 text-[#615c82]" />
              <input
                ref={searchInputRef}
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Global search (Agents, Reports, Logs)..."
                className="bg-transparent text-[#f3f1fb] focus:outline-none placeholder:text-[#615c82] w-full"
              />
              {globalSearch ? (
                <button onClick={() => setGlobalSearch("")} className="text-[#615c82] hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <kbd className="px-1.5 py-0.5 text-[9px] font-mono text-[#615c82] bg-white/5 rounded border border-white/10">⌘K</kbd>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            <AnimatePresence>
              {hasGlobalSearch && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-[#0d0c1e] border border-white/10 rounded-2xl p-3 shadow-2xl z-50 max-h-80 overflow-y-auto space-y-3 text-xs"
                >
                  <div className="text-[10px] uppercase font-mono text-[#615c82] pb-1 border-b border-white/6">
                    Matches ({totalSearchMatches})
                  </div>

                  {totalSearchMatches === 0 ? (
                    <p className="text-center py-4 text-[#615c82]">No matching agents, integrations, or logs found.</p>
                  ) : (
                    <>
                      {searchResults.agents.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold text-[#c9bbff] mb-1">Agents ({searchResults.agents.length})</div>
                          {searchResults.agents.map((a) => (
                            <button
                              key={a.id}
                              onClick={() => { switchTab("agents"); setGlobalSearch(""); }}
                              className="w-full text-left p-2 rounded-lg hover:bg-[#131228] transition-colors flex justify-between"
                            >
                              <span className="font-semibold text-white">{a.name}</span>
                              <span className="text-[#615c82]">{a.role}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.integrations.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold text-[#c9bbff] mb-1">Integrations ({searchResults.integrations.length})</div>
                          {searchResults.integrations.map((i) => (
                            <button
                              key={i.id}
                              onClick={() => { switchTab("integrations"); setGlobalSearch(""); }}
                              className="w-full text-left p-2 rounded-lg hover:bg-[#131228] transition-colors flex justify-between"
                            >
                              <span className="font-semibold text-white">{i.name}</span>
                              <span className="text-[#4ade80]">{i.connected ? "Connected" : "Inactive"}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.activity.length > 0 && (
                        <div>
                          <div className="text-[10px] font-bold text-[#c9bbff] mb-1">Activity Logs ({searchResults.activity.length})</div>
                          {searchResults.activity.map((row) => (
                            <button
                              key={row.id}
                              onClick={() => { switchTab("overview"); setGlobalSearch(""); }}
                              className="w-full text-left p-2 rounded-lg hover:bg-[#131228] transition-colors flex justify-between"
                            >
                              <span className="font-mono text-white">{row.source} · {row.value}</span>
                              <span className="text-[#615c82]">{row.notes}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Topbar Actions */}
          <div className="flex items-center gap-2.5">
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setMsgOpen(false); setProfileOpen(false); }}
                className="w-9.5 h-9.5 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#9d98bb] hover:text-white relative"
                aria-expanded={notifOpen}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#c9bbff]" />
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-[#0d0c1e] border border-white/10 p-3 shadow-2xl z-50 space-y-2 text-xs"
                  >
                    <div className="font-semibold text-white pb-2 border-b border-white/6 flex justify-between">
                      <span>Notifications</span>
                      <span className="text-[10px] text-[#c9bbff]">3 new</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#131228] space-y-0.5">
                      <p className="font-semibold text-white">Escalation Flag</p>
                      <p className="text-[#9d98bb]">Order #4471 flagged for review — 4m ago</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#131228] space-y-0.5">
                      <p className="font-semibold text-white">Agent deployed</p>
                      <p className="text-[#9d98bb]">Support Tier-1 is live — 1h ago</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); setMsgOpen(false); }}
                className="w-9.5 h-9.5 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#c9bbff] font-display font-bold text-xs text-white flex items-center justify-center shadow-md"
                aria-expanded={profileOpen}
                aria-label="User menu"
              >
                JE
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#0d0c1e] border border-white/10 p-2 shadow-2xl z-50 text-xs space-y-1"
                  >
                    <div className="p-2.5 border-b border-white/6">
                      <p className="font-semibold text-white">Jordan Ellis</p>
                      <p className="text-[11px] text-[#615c82]">jordan@company.com</p>
                    </div>
                    <Link href="/contact" className="block px-3 py-2 rounded-xl text-[#9d98bb] hover:text-white hover:bg-[#131228]">
                      Account settings
                    </Link>
                    <Link href="/login" className="block px-3 py-2 rounded-xl text-[#f87171] hover:bg-rose-500/10">
                      Sign out
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Content Panels */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Stat Cards with Visual Hierarchy (Tasks Today Hero Card) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Hero Stat Card */}
                <div className="bg-gradient-to-br from-[#131228] to-[#0d0c1e] border-2 border-[#8b5cf6]/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] rounded-2xl p-5 space-y-2 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-[#c9bbff] font-semibold">Tasks today</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f0b357]/15 border border-[#f0b357]/30 text-[#f0b357]">Hero Metric</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-white tracking-tight">12,480</div>
                  <span className="text-xs text-[#4ade80] font-medium flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18.2% vs. yesterday
                  </span>
                </div>

                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-5 space-y-2">
                  <span className="text-xs text-[#615c82]">Resolution rate</span>
                  <div className="text-3xl font-display font-semibold text-[#4ade80]">96.4%</div>
                  <span className="text-xs text-[#4ade80]">+2.1pt this week</span>
                </div>
                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-5 space-y-2">
                  <span className="text-xs text-[#615c82]">Agents live</span>
                  <div className="text-3xl font-display font-semibold text-[#c9bbff]">{liveAgentsCount}</div>
                  <span className="text-xs text-[#9d98bb]">of {agents.length} deployed</span>
                </div>
                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-5 space-y-2">
                  <span className="text-xs text-[#615c82]">Avg. response speed</span>
                  <div className="text-3xl font-display font-semibold text-white">92s</div>
                  <span className="text-xs text-[#4ade80]">-14s vs. last week</span>
                </div>
              </div>

              {/* Chart + Task Mix */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5">
                {/* Hero Chart */}
                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 space-y-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-base text-white">Task volume trajectory</h3>
                      <p className="text-xs text-[#615c82]">Real-time execution throughput per day</p>
                    </div>
                    <div className="flex gap-1 bg-[#0a0918] p-1 rounded-xl border border-white/6 text-xs">
                      {(["7", "30", "90"] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setChartRange(r)}
                          className={`px-3 py-1 rounded-lg transition-all ${chartRange === r ? "bg-[#131228] text-white font-semibold" : "text-[#615c82]"}`}
                        >
                          {r}d
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Chart Bar Visualization */}
                  <div className="h-48 flex items-end justify-between gap-2 pt-6">
                    {[42, 55, 60, 78, 85, 92, 110, 105, 124].map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(v / 130) * 100}%` }}
                          transition={{ duration: 0.6, delay: i * 0.05 }}
                          className="w-full bg-gradient-to-t from-[#5b3df0] via-[#8b5cf6] to-[#f0b357]/60 rounded-t-sm group-hover:brightness-125 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task mix */}
                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 space-y-4">
                  <h3 className="font-display font-semibold text-base text-white">Task mix</h3>
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[#9d98bb]">Lead generation</span>
                        <span className="text-white font-mono">42%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-[#8b5cf6] w-[42%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[#9d98bb]">Customer support</span>
                        <span className="text-white font-mono">35%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-[#c9bbff] w-[35%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[#9d98bb]">Data entry</span>
                        <span className="text-white font-mono">23%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-[#f0b357] w-[23%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity table with Colorblind Status Icons */}
              <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-display font-semibold text-base text-white">Recent Activity Logs</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex bg-[#0a0918] p-1 rounded-xl border border-white/6 text-xs">
                      {(["all", "queued", "processed", "resolved"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={`px-3 py-1 rounded-lg capitalize transition-all ${statusFilter === s ? "bg-[#131228] text-white font-semibold" : "text-[#615c82]"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      placeholder="Filter table..."
                      className="bg-[#0a0918] border border-white/6 rounded-xl px-3 py-1 text-xs text-white placeholder:text-[#615c82] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="text-[#615c82] border-b border-white/5 uppercase text-[10.5px]">
                        <th className="py-2.5 px-2">Timestamp</th>
                        <th className="py-2.5 px-2">Status</th>
                        <th className="py-2.5 px-2">Source</th>
                        <th className="py-2.5 px-2">Value</th>
                        <th className="py-2.5 px-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivity.map((row) => (
                        <tr key={row.id} className="border-b border-white/4 hover:bg-white/2">
                          <td className="py-3 px-2 text-[#615c82]">{row.time}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-sans font-medium flex items-center gap-1 w-fit ${
                              row.status === "queued" ? "bg-[#f0b357]/15 text-[#f0b357] border border-[#f0b357]/30" :
                              row.status === "processed" ? "bg-[#8b5cf6]/18 text-[#c9bbff] border border-[#8b5cf6]/30" :
                              "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                            }`}>
                              {row.status === "queued" && <Clock className="w-3 h-3" />}
                              {row.status === "processed" && <Sparkles className="w-3 h-3" />}
                              {row.status === "resolved" && <CheckCircle2 className="w-3 h-3" />}
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-white">{row.source}</td>
                          <td className="py-3 px-2 text-[#9d98bb]">{row.value}</td>
                          <td className="py-3 px-2 text-[#9d98bb]">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: AGENTS */}
          {activeTab === "agents" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs text-[#9d98bb]">Toggle an agent to pause or resume its runs instantly. Changes persist to local state.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center font-display font-bold text-[#c9bbff]">
                        {agent.name.slice(0, 2).toUpperCase()}
                      </div>
                      <button
                        onClick={() => toggleAgent(agent.id)}
                        className={`w-10 h-5.5 rounded-full relative transition-colors duration-200 ${agent.active ? "bg-[#8b5cf6]" : "bg-white/10"}`}
                      >
                        <span className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all ${agent.active ? "right-0.5" : "left-0.5"}`} />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-base text-white">{agent.name}</h3>
                      <p className="text-xs text-[#615c82]">{agent.role}</p>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-white/5 text-xs text-[#9d98bb]">
                      <div>
                        <span className="font-display font-semibold text-white block text-sm">{agent.tasks}</span>
                        Tasks completed
                      </div>
                      <div className="text-right">
                        <span className="font-display font-semibold text-[#4ade80] block text-sm">{agent.success}</span>
                        Success rate
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: REPORTS */}
          {activeTab === "reports" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <p className="text-xs text-[#9d98bb]">Automated executive briefs generated weekly. Click Download to export real text files.</p>
              <div className="space-y-3">
                {[
                  { title: "Weekly Automation Summary — Aug 2026", date: "Aug 04, 2026 · 14.2K tasks" },
                  { title: "Lead Generation Conversion Cohort Report", date: "Jul 28, 2026 · 340 leads" },
                  { title: "Support Ticket Escalation Audit", date: "Jul 21, 2026 · 96.4% resolved" },
                ].map((rep, idx) => (
                  <div key={idx} className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#131228] flex items-center justify-center text-[#c9bbff]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-white">{rep.title}</h4>
                        <p className="text-xs text-[#615c82]">{rep.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { triggerReportDownload(rep.title); showToast(`Downloaded ${rep.title}`); }}
                      className="btn btn-ghost !py-1.5 !px-3 text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: INTEGRATIONS */}
          {activeTab === "integrations" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {integrations.map((item) => (
                  <div key={item.id} className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center font-display font-bold text-white">
                          {item.logo}
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${item.connected ? "bg-[#4ade80]/15 text-[#4ade80]" : "bg-white/5 text-[#615c82]"}`}>
                          {item.connected ? "Connected" : "Disconnected"}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-base text-white mb-1">{item.name}</h3>
                      <p className="text-xs text-[#9d98bb] leading-relaxed">{item.desc}</p>
                    </div>

                    <button
                      onClick={() => toggleIntegration(item.id)}
                      className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                        item.connected ? "bg-white/5 text-white hover:bg-white/10" : "bg-[#8b5cf6] text-white hover:bg-[#7c4def]"
                      }`}
                    >
                      {item.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: INSIGHTS */}
          {activeTab === "insights" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 space-y-4">
                  <h3 className="font-display font-semibold text-base text-white">Resolution time by channel</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { name: "Zendesk API", val: "42s", pct: 92 },
                      { name: "Webhooks", val: "140ms", pct: 98 },
                      { name: "CRM Lead Sync", val: "2m 10s", pct: 75 },
                    ].map((c) => (
                      <div key={c.name} className="space-y-1">
                        <div className="flex justify-between text-[#9d98bb]">
                          <span>{c.name}</span>
                          <span className="text-white font-mono">{c.val}</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div className="h-full bg-[#8b5cf6]" style={{ width: `${c.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-6 space-y-4 text-center">
                  <h3 className="font-display font-semibold text-base text-white text-left">Agent Confidence Distribution</h3>
                  <div className="w-32 h-32 rounded-full border-8 border-[#8b5cf6] border-t-[#c9bbff] mx-auto flex items-center justify-center">
                    <span className="font-display font-bold text-xl text-white">96.4%</span>
                  </div>
                  <p className="text-xs text-[#9d98bb]">High confidence autonomous execution across all {liveAgentsCount} active agents.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: ESCALATIONS (with Pending & Resolved History sub-tabs) */}
          {activeTab === "escalations" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex bg-[#0a0918] p-1 rounded-xl border border-white/6 text-xs">
                  <button
                    onClick={() => setEscalationTab("pending")}
                    className={`px-3 py-1 rounded-lg transition-all ${escalationTab === "pending" ? "bg-[#131228] text-white font-semibold" : "text-[#615c82]"}`}
                  >
                    Pending ({pendingEscalations.length})
                  </button>
                  <button
                    onClick={() => setEscalationTab("resolved")}
                    className={`px-3 py-1 rounded-lg transition-all ${escalationTab === "resolved" ? "bg-[#131228] text-white font-semibold" : "text-[#615c82]"}`}
                  >
                    Resolved History ({resolvedEscalations.length})
                  </button>
                </div>
              </div>

              {escalationTab === "pending" ? (
                pendingEscalations.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#615c82] bg-[#0d0c1e] border border-white/9 rounded-2xl">
                    All caught up — no pending escalations waiting for review.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingEscalations.map((e) => (
                      <div key={e.id} className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-white flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${e.severity === "high" ? "bg-[#f87171]" : "bg-[#f0b357]"}`} />
                            {e.title}
                          </h4>
                          <p className="text-xs text-[#615c82]">{e.meta}</p>
                        </div>
                        <button
                          onClick={() => resolveEscalation(e.id)}
                          className="btn btn-primary !py-1.5 !px-3.5 text-xs flex-shrink-0"
                        >
                          Approve & Resolve
                        </button>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                resolvedEscalations.length === 0 ? (
                  <div className="p-12 text-center text-xs text-[#615c82] bg-[#0d0c1e] border border-white/9 rounded-2xl">
                    No resolved escalations in history yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resolvedEscalations.map((e) => (
                      <div key={e.id} className="bg-[#0d0c1e] border border-white/9 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-sm text-slate-400 line-through">{e.title}</h4>
                          <p className="text-xs text-[#4ade80]">Resolved at {e.resolvedAt || "today"}</p>
                        </div>
                        <button
                          onClick={() => reopenEscalation(e.id)}
                          className="btn btn-ghost !py-1.5 !px-3 text-xs flex items-center gap-1.5 flex-shrink-0"
                        >
                          <CornerUpLeft className="w-3 h-3" /> Reopen
                        </button>
                      </div>
                    ))}
                  </div>
                )
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0d0c1e] border border-white/10 rounded-xl px-4 py-3 text-xs text-white shadow-2xl flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060512]" />}>
      <DashboardContent />
    </Suspense>
  );
}
