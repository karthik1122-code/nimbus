"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, TrendingUp, Users, Activity, Globe, Filter,
  Download, Calendar, ArrowUpRight, ArrowDownRight, ChevronDown,
  Layers, PieChart, RefreshCw, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const rangeTabs = ["7D", "30D", "90D", "1Y"];

/* ── Metric Summary Card ── */
function MetricCard({ title, value, change, positive, sub, icon: Icon }: {
  title: string; value: string; change: string; positive: boolean; sub: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-5 rounded-2xl bg-[#0D0A18]/80 border border-white/7 hover:border-purple-500/25 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl bg-purple-500/12 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <Icon className="w-4 h-4" />
        </div>
        <span className={`text-xs font-bold flex items-center gap-0.5 ${positive ? "text-emerald-400" : "text-rose-400"}`}>
          {positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          {change}
        </span>
      </div>
      <div className="text-2xl font-extrabold text-white tracking-tight mb-0.5">{value}</div>
      <div className="text-xs font-medium text-slate-500">{title}</div>
      <div className="text-[10px] text-slate-600 mt-0.5">{sub}</div>
    </motion.div>
  );
}

/* ── Bar Chart ── */
function BarChart({ data, max, color = "purple" }: { data: number[]; max: number; color?: string }) {
  const gradients: Record<string, string> = {
    purple: "from-purple-900 via-purple-600 to-purple-400",
    indigo: "from-indigo-900 via-indigo-600 to-indigo-400",
    emerald: "from-emerald-900 via-emerald-600 to-emerald-400",
  };
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 100}%` }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full rounded-t-sm bg-gradient-to-t ${gradients[color]} group-hover:opacity-80 transition-opacity`}
          />
          <span className="text-[9px] text-slate-600 font-mono">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Donut Ring ── */
function DonutRing({ pct, color, label, value }: { pct: number; color: string; label: string; value: string }) {
  const r = 36; const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex items-center gap-4">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
        <motion.circle
          cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
        />
        <text x="44" y="44" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="14" fontWeight="700">{pct}%</text>
      </svg>
      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="text-lg font-extrabold text-white">{value}</p>
      </div>
    </div>
  );
}

/* ── Funnel Step ── */
function FunnelStep({ label, count, pct, prev }: { label: string; count: string; pct: number; prev: number }) {
  const drop = prev - pct;
  return (
    <div className="flex items-center gap-4">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-9 rounded-lg bg-gradient-to-r from-purple-600/80 to-violet-600/60 flex items-center px-3 min-w-[80px]"
        style={{ maxWidth: "100%" }}
      >
        <span className="text-xs font-bold text-white whitespace-nowrap">{label}</span>
      </motion.div>
      <div className="flex-shrink-0 text-right min-w-[80px]">
        <span className="text-sm font-bold text-white">{count}</span>
        {drop > 0 && <span className="text-[10px] text-rose-400 block">−{drop}% drop</span>}
      </div>
    </div>
  );
}

const funnelSteps = [
  { label: "Visitors", count: "124,820", pct: 100, prev: 100 },
  { label: "Sign-ups", count: "18,420", pct: 78, prev: 100 },
  { label: "Activated", count: "9,840", pct: 52, prev: 78 },
  { label: "Converted", count: "1,049", pct: 28, prev: 52 },
  { label: "Retained 30d", count: "882", pct: 18, prev: 28 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState("30D");
  const [compareOn, setCompareOn] = useState(false);

  const revenueData = [45, 55, 50, 68, 80, 74, 90, 98, 92, 110, 120, 138];
  const usersData = [30, 38, 42, 55, 65, 70, 82, 90, 94, 110, 118, 128];
  const convData = [12, 18, 15, 22, 28, 25, 32, 38, 35, 42, 48, 55];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">Understand what is happening across your business.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCompareOn(!compareOn)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${compareOn ? "bg-purple-500/15 border-purple-500/30 text-purple-300" : "bg-white/4 border-white/8 text-slate-400 hover:text-white"}`}
          >
            Compare periods
          </button>
          <div className="flex rounded-xl border border-white/8 overflow-hidden">
            {rangeTabs.map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-3 py-1.5 text-xs font-semibold transition-all ${range === t ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white bg-transparent"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <Button size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>Export</Button>
        </div>
      </motion.div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Revenue" value="$48,290" change="24.8%" positive sub="vs $38,690 last period" icon={TrendingUp} />
        <MetricCard title="Active Users" value="12,482" change="18.2%" positive sub="84% 30-day retention" icon={Users} />
        <MetricCard title="Conversion Rate" value="8.42%" change="3.1%" positive sub="140ms latency lift" icon={Activity} />
        <MetricCard title="Avg Session" value="4m 32s" change="1.2%" positive={false} sub="vs 4m 37s prior" icon={Globe} />
      </div>

      {/* Revenue Chart + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-8 p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white">Revenue Trajectory</h3>
              <p className="text-xs text-slate-500 mt-0.5">MRR by month with trend line</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-sm bg-purple-500" /> Revenue</span>
              {compareOn && <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-sm bg-slate-600" /> Prior</span>}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={range} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BarChart data={revenueData} max={150} color="purple" />
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-6 text-xs">
            <div><span className="text-slate-500">Total:</span> <span className="text-white font-bold ml-1">$48,290</span></div>
            <div><span className="text-slate-500">Growth:</span> <span className="text-emerald-400 font-bold ml-1">+24.8%</span></div>
            <div><span className="text-slate-500">Best month:</span> <span className="text-white font-bold ml-1">Dec — $13,800</span></div>
          </div>
        </motion.div>

        {/* Donut charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7 space-y-5"
        >
          <h3 className="text-sm font-bold text-white">Channel Mix</h3>
          <DonutRing pct={48} color="#8B5CF6" label="Direct / Organic" value="59,914" />
          <DonutRing pct={32} color="#6366F1" label="Partner API" value="39,942" />
          <DonutRing pct={20} color="#A78BFA" label="Referral" value="24,964" />
        </motion.div>
      </div>

      {/* User Growth + Conversion Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">User Growth</h3>
            <span className="text-xs text-emerald-400 font-bold">+18.2%</span>
          </div>
          <BarChart data={usersData} max={140} color="indigo" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Conversions</h3>
            <span className="text-xs text-emerald-400 font-bold">+3.1%</span>
          </div>
          <BarChart data={convData} max={60} color="emerald" />
        </motion.div>
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-white">Conversion Funnel</h3>
            <p className="text-xs text-slate-500 mt-0.5">User journey from visit to 30-day retention</p>
          </div>
          <Layers className="w-4 h-4 text-purple-400" />
        </div>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <FunnelStep {...step} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cohort table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-white">Retention Cohort Analysis</h3>
            <p className="text-xs text-slate-500 mt-0.5">% of users who returned each month after signup</p>
          </div>
          <RefreshCw className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-500 border-b border-white/5">
                <th className="text-left py-2 pr-4 font-semibold">Cohort</th>
                {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                  <th key={m} className="text-center py-2 px-3 font-semibold">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {[
                { month: "Feb 2026", vals: [100, 68, 52, 44, 38, 34] },
                { month: "Mar 2026", vals: [100, 71, 55, 47, 40, null] },
                { month: "Apr 2026", vals: [100, 74, 58, 49, null, null] },
                { month: "May 2026", vals: [100, 76, 60, null, null, null] },
                { month: "Jun 2026", vals: [100, 79, null, null, null, null] },
                { month: "Jul 2026", vals: [100, null, null, null, null, null] },
              ].map((row, ri) => (
                <tr key={ri}>
                  <td className="py-2 pr-4 text-slate-400 font-mono">{row.month}</td>
                  {row.vals.map((v, ci) => {
                    const opacity = v !== null ? Math.max(0.1, (v as number) / 100) : 0;
                    return (
                      <td key={ci} className="text-center py-2 px-3">
                        {v !== null ? (
                          <span
                            className="inline-block w-10 py-1 rounded-md text-white font-bold"
                            style={{ backgroundColor: `rgba(139, 92, 246, ${opacity})` }}
                          >
                            {v}%
                          </span>
                        ) : (
                          <span className="text-slate-700">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
