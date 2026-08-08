"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Plus, Download, Share2, Eye, Calendar,
  Sparkles, CheckCircle2, Loader2, Printer, Clock,
  ArrowRight, Filter, RefreshCw, BarChart3, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface ReportItem {
  id: string;
  title: string;
  updated: string;
  insightsCount: number;
  status: "Ready" | "Draft" | "Generating";
  author: string;
  dataset: string;
  type: "Performance" | "Growth" | "Executive" | "Cohort";
}

const typeColors: Record<string, string> = {
  Performance: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Growth: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  Executive: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  Cohort: "bg-amber-500/10 text-amber-300 border-amber-500/20",
};

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([
    { id: "r1", title: "Monthly Growth Report", updated: "Today, 09:14", insightsCount: 8, status: "Ready", author: "Alex Vance", dataset: "Sales_Q3.csv", type: "Growth" },
    { id: "r2", title: "Q3 Performance Review", updated: "Yesterday, 17:30", insightsCount: 12, status: "Ready", author: "Alex Vance", dataset: "Marketing_Campaigns.xlsx", type: "Performance" },
    { id: "r3", title: "Enterprise Cohort Analysis", updated: "3 days ago", insightsCount: 6, status: "Draft", author: "Alex Vance", dataset: "user_events.json", type: "Cohort" },
    { id: "r4", title: "Exec Summary — Aug 2026", updated: "5 days ago", insightsCount: 14, status: "Ready", author: "Alex Vance", dataset: "product_analytics.csv", type: "Executive" },
    { id: "r5", title: "Churn Risk Analysis", updated: "In progress...", insightsCount: 0, status: "Generating", author: "AI Engine", dataset: "crm_export.xlsx", type: "Cohort" },
  ]);
  const [newReportOpen, setNewReportOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<ReportItem | null>(null);
  const [generating, setGenerating] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const handleGenerate = async () => {
    if (!reportTitle.trim()) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));
    setGenerating(false);
    setNewReportOpen(false);
    setReports((prev) => [{
      id: `r${Date.now()}`, title: reportTitle, updated: "Just now", insightsCount: 0,
      status: "Generating", author: "AI Engine", dataset: "Sales_Q3.csv", type: "Growth",
    }, ...prev]);
    setReportTitle("");
    await new Promise((r) => setTimeout(r, 3000));
    setReports((prev) => prev.map((r) => r.status === "Generating" && r.insightsCount === 0
      ? { ...r, status: "Ready", insightsCount: 9, updated: "Just now" } : r
    ));
  };

  const readyCount = reports.filter((r) => r.status === "Ready").length;
  const draftCount = reports.filter((r) => r.status === "Draft").length;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports</h1>
          <p className="text-xs text-slate-400 mt-1">AI-generated executive briefs and custom analysis reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={() => setScheduleOpen(true)} leftIcon={<Calendar className="w-3.5 h-3.5" />}>Schedule</Button>
          <Button size="sm" onClick={() => setNewReportOpen(true)} leftIcon={<Sparkles className="w-3.5 h-3.5" />}>New AI Report</Button>
        </div>
      </motion.div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total reports", value: reports.length.toString(), icon: <FileText className="w-4 h-4" /> },
          { label: "Ready to share", value: readyCount.toString(), icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
          { label: "In draft", value: draftCount.toString(), icon: <Clock className="w-4 h-4 text-amber-400" /> },
          { label: "Scheduled", value: "3", icon: <Calendar className="w-4 h-4 text-blue-400" /> },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-4 rounded-xl bg-[#0D0A18]/80 border border-white/7 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">{s.icon}</div>
            <div>
              <p className="text-xl font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {reports.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D0A18]/80 border border-white/7 hover:border-purple-500/25 transition-all group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  {r.status === "Generating" ? <Loader2 className="w-5 h-5 text-purple-400 animate-spin" /> : <FileText className="w-5 h-5 text-purple-400" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h3 className="text-sm font-bold text-white truncate">{r.title}</h3>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[r.type]}`}>{r.type}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{r.dataset} · {r.insightsCount > 0 ? `${r.insightsCount} insights` : "Generating..."} · {r.updated}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                  r.status === "Ready" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" :
                  r.status === "Generating" ? "bg-amber-500/10 text-amber-300 border-amber-500/20 animate-pulse" :
                  "bg-white/5 text-slate-400 border-white/10"
                }`}>
                  {r.status === "Ready" && <CheckCircle2 className="w-2.5 h-2.5" />}
                  {r.status === "Generating" && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
                  {r.status}
                </span>
                {r.status === "Ready" && (
                  <>
                    <button
                      onClick={() => { setPreviewReport(r); setPreviewOpen(true); }}
                      className="p-2 rounded-lg bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Report Modal */}
      <Modal
        isOpen={newReportOpen}
        onClose={() => setNewReportOpen(false)}
        title="Generate AI Report"
        description="InsightAI will automatically analyze your data and write an executive brief."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setNewReportOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleGenerate} disabled={generating || !reportTitle.trim()}>
              {generating ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />Generating...</> : <><Sparkles className="w-3.5 h-3.5 mr-2" />Generate Report</>}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Report title</label>
            <input
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder="e.g. Q3 Executive Summary"
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Dataset</label>
              <select className="w-full px-3 py-2 text-xs rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none">
                <option>Sales_Q3.csv</option>
                <option>Marketing_Campaigns.xlsx</option>
                <option>product_analytics.csv</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Report type</label>
              <select className="w-full px-3 py-2 text-xs rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none">
                <option>Executive Brief</option>
                <option>Growth Analysis</option>
                <option>Cohort Report</option>
                <option>Performance Review</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={previewReport?.title ?? ""}
        description={`Generated from ${previewReport?.dataset} · ${previewReport?.insightsCount} insights found`}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setPreviewOpen(false)}>Close</Button>
            <Button size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>Export PDF</Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>Revenue grew <strong className="text-white">18.4%</strong> this month, driven by a <strong className="text-emerald-400">23% increase in returning customers</strong> and strong Enterprise tier upgrades contributing <strong className="text-emerald-400">+$12,450 MRR</strong>.</p>
          <div className="grid grid-cols-3 gap-3">
            {[["$48,290", "Revenue"], ["+23%", "Returning users"], ["+$12.4K", "New MRR"]].map(([v, l]) => (
              <div key={l} className="p-3 rounded-xl bg-white/4 border border-white/6 text-center">
                <span className="text-base font-extrabold text-white block">{v}</span>
                <span className="text-[10px] text-slate-500">{l}</span>
              </div>
            ))}
          </div>
          <p>The 140ms checkout speed improvement correlated directly with a <strong className="text-white">3.1% conversion rate increase</strong>. AI analysis indicates this was the primary lever for revenue growth.</p>
          <div className="p-3 rounded-xl bg-purple-500/8 border border-purple-500/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Recommended Action</p>
            <p className="text-xs">Trigger automated re-engagement for 3,420 dormant leads — 42% predicted conversion probability.</p>
          </div>
        </div>
      </Modal>

      {/* Schedule Modal */}
      <Modal
        isOpen={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        title="Schedule Reports"
        description="Automatically generate and deliver reports on a recurring schedule."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setScheduleOpen(false)}>Cancel</Button>
            <Button size="sm">Save Schedule</Button>
          </>
        }
      >
        <div className="space-y-4">
          {[
            { report: "Monthly Growth Report", freq: "1st of month", dest: "Email + Slack" },
            { report: "Q3 Performance Review", freq: "Every Friday", dest: "Email" },
            { report: "Exec Summary", freq: "Weekly, Mon 08:00", dest: "Slack" },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/4 border border-white/6">
              <div>
                <p className="text-xs font-semibold text-white">{s.report}</p>
                <p className="text-[10px] text-slate-500">{s.freq} → {s.dest}</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
