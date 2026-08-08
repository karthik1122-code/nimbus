"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Globe,
  Filter,
  Download,
  Calendar,
  Layers,
  ChevronDown,
  X,
  PieChart,
  ArrowUpRight,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { ChartContainer } from "@/components/ui/ChartContainer";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";

export default function AnalyticsPage() {
  const [dataset, setDataset] = useState("Marketing_Q3.csv");
  const [range, setRange] = useState("30D");
  const [compare, setCompare] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  const rangeTabs = [
    { id: "7D", label: "7D" },
    { id: "30D", label: "30D" },
    { id: "90D", label: "90D" },
    { id: "1Y", label: "1Y" },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* State Switcher Bar */}
      <div className="flex justify-end items-center gap-2 select-none text-xs">
        <span className="text-slate-400">View Mode:</span>
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="px-3 py-1 rounded-lg glass-pill border border-purple-500/30 text-purple-300 hover:text-white transition-all cursor-pointer"
        >
          {showEmptyState ? "Switch to Live Analytics" : "Preview Empty State"}
        </button>
      </div>

      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">
            Understand what is happening across your business.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Select
            options={[
              { value: "Marketing_Q3.csv", label: "Dataset: Marketing_Q3.csv" },
              { value: "Sales_2026.xlsx", label: "Dataset: Sales_2026.xlsx" },
              { value: "User_Cohorts_Aug.csv", label: "Dataset: User_Cohorts_Aug.csv" },
            ]}
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
            className="w-52 py-2"
          />

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setFilterDrawerOpen(true)}
            icon={<Filter className="w-3.5 h-3.5 text-purple-400" />}
          >
            Filters
          </Button>

          <Button variant="secondary" size="sm" icon={<Download className="w-3.5 h-3.5" />}>
            Export
          </Button>
        </div>
      </div>

      {showEmptyState ? (
        /* EMPTY STATE VIEW */
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto my-12 text-center">
          <GlassCard variant="active" className="p-10 space-y-6 border-purple-500/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Connect data to start analyzing</h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Select or upload a dataset to generate real-time revenue overview graphs and user cohort breakdowns.
              </p>
            </div>
            <Button size="lg" onClick={() => (window.location.href = "/dashboard/data")}>
              Go to Data Management
            </Button>
          </GlassCard>
        </motion.div>
      ) : (
        /* POPULATED ANALYTICS WORKSPACE */
        <div className="space-y-8">
          {/* KPI ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Revenue"
              value="$48,290"
              change="+24.8%"
              positive={true}
              description="vs. $38,690 previous period"
              icon={<TrendingUp className="w-4 h-4 text-purple-400" />}
              variant="glow"
            />
            <StatCard
              title="Active users"
              value="12,482"
              change="+18.2%"
              positive={true}
              description="vs. 10,560 previous period"
              icon={<Users className="w-4 h-4 text-purple-400" />}
              variant="glow"
            />
            <StatCard
              title="Conversion"
              value="8.42%"
              change="+3.1%"
              positive={true}
              description="vs. 8.16% checkout rate"
              icon={<Activity className="w-4 h-4 text-purple-400" />}
              variant="glow"
            />
            <StatCard
              title="Average order value"
              value="$142.50"
              change="+5.4%"
              positive={true}
              description="vs. $135.20 per transaction"
              icon={<Layers className="w-4 h-4 text-purple-400" />}
              variant="glow"
            />
          </div>

          {/* MAIN CHART (DOMINATES HIERARCHY) */}
          <ChartContainer
            title="Revenue overview over time"
            subtitle="Comparing current period vs previous period trajectory"
            action={
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCompare(!compare)}
                  className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    compare ? "bg-purple-600/30 border-purple-500/50 text-purple-300" : "glass-pill text-slate-400 border-white/10"
                  }`}
                >
                  {compare ? "Compare: ON" : "Compare: OFF"}
                </button>
                <Tabs tabs={rangeTabs} activeTab={range} onChange={setRange} />
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-end gap-4 text-xs font-mono">
                <span className="flex items-center gap-2 text-purple-300">
                  <span className="w-3 h-1.5 rounded-full bg-purple-500" /> Current Period ($48.2k)
                </span>
                {compare && (
                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="w-3 h-1.5 rounded-full bg-slate-600" /> Previous Period ($38.6k)
                  </span>
                )}
              </div>

              <div className="h-72 flex items-end justify-between gap-3 pt-6 border-b border-white/10 px-2">
                {[
                  { curr: 45, prev: 35 },
                  { curr: 58, prev: 42 },
                  { curr: 52, prev: 48 },
                  { curr: 70, prev: 50 },
                  { curr: 84, prev: 60 },
                  { curr: 78, prev: 65 },
                  { curr: 92, prev: 72 },
                  { curr: 105, prev: 80 },
                  { curr: 98, prev: 82 },
                  { curr: 118, prev: 90 },
                  { curr: 125, prev: 95 },
                  { curr: 142, prev: 105 },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end relative">
                    {/* Previous Period Bar */}
                    {compare && (
                      <div
                        style={{ height: `${item.prev}%` }}
                        className="w-full rounded-t-sm bg-slate-700/50 absolute bottom-6 opacity-40 group-hover:opacity-70 transition-all"
                      />
                    )}
                    {/* Current Period Bar */}
                    <div
                      style={{ height: `${item.curr}%` }}
                      className="w-full rounded-t-sm bg-gradient-to-t from-purple-900 via-purple-600 to-purple-400 group-hover:from-purple-500 z-10 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    />
                    <span className="text-[10px] text-slate-500 font-mono mt-1">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartContainer>

          {/* SECONDARY CHARTS (SUPPORTING VISUALIZATIONS) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: User Growth */}
            <GlassCard variant="default" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">User Growth Cohorts</h4>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="h-44 flex items-end justify-between gap-2 pt-4 border-b border-white/10">
                {[30, 42, 55, 68, 75, 88, 98, 115].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                    <div
                      style={{ height: `${v}%` }}
                      className="w-full rounded-t-sm bg-gradient-to-t from-indigo-800 to-purple-400 group-hover:from-purple-500 transition-all"
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Chart 2: Traffic Sources */}
            <GlassCard variant="default" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Traffic Sources Breakdown</h4>
                <Globe className="w-4 h-4 text-purple-400" />
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { name: "Direct Search & Inbound", pct: 45, val: "5,616 users" },
                  { name: "Organic Referral Feeds", pct: 32, val: "3,994 users" },
                  { name: "API Webhooks & Integrations", pct: 15, val: "1,872 users" },
                  { name: "Paid Marketing Campaigns", pct: 8, val: "1,000 users" },
                ].map((src, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{src.name}</span>
                      <span className="text-purple-300 font-mono">{src.pct}% ({src.val})</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        style={{ width: `${src.pct}%` }}
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Chart 3: Revenue by Category */}
            <GlassCard variant="default" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Revenue by Product Category</h4>
                <PieChart className="w-4 h-4 text-purple-400" />
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { name: "Pro Orchestrator Subscriptions", amount: "$32,450", pct: 67 },
                  { name: "Enterprise Custom Fine-tuning", amount: "$11,200", pct: 23 },
                  { name: "API Usage Overage Fees", amount: "$4,640", pct: 10 },
                ].map((cat, idx) => (
                  <div key={idx} className="p-3 rounded-xl glass-pill flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{cat.name}</span>
                    <span className="text-xs font-bold text-purple-300 font-mono">{cat.amount} ({cat.pct}%)</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Chart 4: Regional Performance */}
            <GlassCard variant="default" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Regional Execution Performance</h4>
                <Globe className="w-4 h-4 text-purple-400" />
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { region: "North America (US East)", load: "45% throughput", latency: "112ms avg" },
                  { region: "Europe (Frankfurt)", load: "32% throughput", latency: "128ms avg" },
                  { region: "Asia Pacific (Tokyo)", load: "23% throughput", latency: "140ms avg" },
                ].map((reg, idx) => (
                  <div key={idx} className="p-3 rounded-xl glass-pill flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">{reg.region}</span>
                      <span className="text-[11px] text-slate-400">{reg.load}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 font-mono">{reg.latency}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* FILTER DRAWER / MODAL */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              className="fixed inset-0 bg-[#040208]/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="relative z-10 w-full max-w-md bg-[#0b0816] border-l border-purple-500/30 p-6 flex flex-col justify-between h-full shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Filter Workspace</h3>
                  <button onClick={() => setFilterDrawerOpen(false)} className="p-1.5 rounded-xl glass-pill text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <Select
                  label="Date Horizon"
                  options={[
                    { value: "30D", label: "Last 30 Days" },
                    { value: "90D", label: "Last 90 Days" },
                    { value: "1Y", label: "Year to Date" },
                  ]}
                />

                <Select
                  label="Region"
                  options={[
                    { value: "all", label: "All Regions" },
                    { value: "us", label: "North America" },
                    { value: "eu", label: "Europe" },
                    { value: "ap", label: "Asia Pacific" },
                  ]}
                />

                <Select
                  label="Product Category"
                  options={[
                    { value: "all", label: "All Categories" },
                    { value: "sub", label: "Subscriptions" },
                    { value: "ent", label: "Enterprise Custom" },
                  ]}
                />

                <Select
                  label="Customer Type"
                  options={[
                    { value: "all", label: "All Customers" },
                    { value: "new", label: "New Signup Cohorts" },
                    { value: "returning", label: "Returning Subscribers" },
                  ]}
                />
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3">
                <Button variant="ghost" size="sm" onClick={() => setFilterDrawerOpen(false)}>
                  Reset Filters
                </Button>
                <Button size="sm" onClick={() => setFilterDrawerOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
