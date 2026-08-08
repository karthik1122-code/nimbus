"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Database, Search, Filter, RefreshCw, Plus,
  FileSpreadsheet, FileCode, CheckCircle2, AlertCircle,
  Eye, Trash2, Download, Sparkles, Loader2, X, Zap,
  Table, Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

interface DatasetItem {
  id: string;
  name: string;
  type: "CSV" | "XLSX" | "JSON" | "SQL";
  rows: string;
  columns: number;
  updated: string;
  size: string;
  status: "Ready" | "Processing" | "Failed";
}

const typeColors: Record<string, string> = {
  CSV: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  XLSX: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  JSON: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  SQL: "bg-purple-500/10 text-purple-300 border-purple-500/20",
};
const typeIcons: Record<string, React.ReactNode> = {
  CSV: <FileSpreadsheet className="w-3.5 h-3.5" />,
  XLSX: <Table className="w-3.5 h-3.5" />,
  JSON: <FileCode className="w-3.5 h-3.5" />,
  SQL: <Database className="w-3.5 h-3.5" />,
};

const connectors = [
  { name: "PostgreSQL", icon: "🐘", connected: true, records: "1.2M" },
  { name: "Stripe", icon: "💳", connected: true, records: "48.2K" },
  { name: "Salesforce", icon: "☁️", connected: false, records: null },
  { name: "BigQuery", icon: "🔍", connected: false, records: null },
  { name: "Shopify", icon: "🛍️", connected: true, records: "328K" },
  { name: "HubSpot", icon: "🟠", connected: false, records: null },
];

export default function DataPage() {
  const [search, setSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"datasets" | "connectors">("datasets");
  const [datasets, setDatasets] = useState<DatasetItem[]>([
    { id: "d1", name: "Sales_Q3_2026.csv", type: "CSV", rows: "24,820", columns: 18, updated: "2 hrs ago", size: "3.8 MB", status: "Ready" },
    { id: "d2", name: "Marketing_Campaigns.xlsx", type: "XLSX", rows: "8,400", columns: 24, updated: "1 day ago", size: "1.2 MB", status: "Ready" },
    { id: "d3", name: "user_events.json", type: "JSON", rows: "1.4M", columns: 12, updated: "4 hrs ago", size: "48 MB", status: "Processing" },
    { id: "d4", name: "product_analytics.csv", type: "CSV", rows: "320,000", columns: 31, updated: "3 days ago", size: "22 MB", status: "Ready" },
    { id: "d5", name: "crm_export.xlsx", type: "XLSX", rows: "12,300", columns: 28, updated: "6 hrs ago", size: "2.1 MB", status: "Failed" },
  ]);

  const filtered = datasets.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));

  const handleUpload = async () => {
    setUploadState("uploading");
    for (let i = 0; i <= 100; i += Math.floor(Math.random() * 10 + 5)) {
      setUploadProgress(Math.min(i, 100));
      await new Promise((r) => setTimeout(r, 120));
    }
    setUploadProgress(100);
    setUploadState("done");
    await new Promise((r) => setTimeout(r, 800));
    setUploadOpen(false);
    setUploadState("idle");
    setUploadProgress(0);
    setDatasets((prev) => [{
      id: `d${Date.now()}`, name: "new_dataset.csv", type: "CSV",
      rows: "12,420", columns: 16, updated: "Just now", size: "1.8 MB", status: "Processing",
    }, ...prev]);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Data</h1>
          <p className="text-xs text-slate-400 mt-1">Manage datasets, connectors, and data pipelines.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>Sync all</Button>
          <Button size="sm" onClick={() => setUploadOpen(true)} leftIcon={<Upload className="w-3.5 h-3.5" />}>Upload dataset</Button>
        </div>
      </motion.div>

      {/* Tab + Search row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex rounded-xl border border-white/8 overflow-hidden">
          {(["datasets", "connectors"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-5 py-2 text-xs font-semibold capitalize transition-all ${activeTab === t ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {activeTab === "datasets" && (
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search datasets..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white/4 border border-white/8 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40"
            />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "datasets" ? (
          <motion.div key="datasets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Total datasets", value: datasets.length.toString() },
                { label: "Total rows", value: "1.77M" },
                { label: "Storage used", value: "79 MB" },
                { label: "Processing", value: datasets.filter(d => d.status === "Processing").length.toString() },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="p-4 rounded-xl bg-[#0D0A18]/80 border border-white/7">
                  <p className="text-xs text-slate-500">{s.label}</p>
                  <p className="text-2xl font-extrabold text-white mt-1">{s.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Dataset table */}
            <div className="rounded-2xl border border-white/7 overflow-hidden bg-[#0D0A18]/80">
              <div className="grid grid-cols-12 text-[10px] font-bold uppercase tracking-widest text-slate-500 px-4 py-3 border-b border-white/5">
                <span className="col-span-4">Name</span>
                <span className="col-span-2 text-center">Type</span>
                <span className="col-span-2 text-center">Rows</span>
                <span className="col-span-1 text-center">Cols</span>
                <span className="col-span-2 text-center">Status</span>
                <span className="col-span-1" />
              </div>

              <div className="divide-y divide-white/4">
                <AnimatePresence>
                  {filtered.map((d, i) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="grid grid-cols-12 items-center px-4 py-3.5 hover:bg-white/3 transition-colors group"
                    >
                      <div className="col-span-4 flex items-center gap-2 min-w-0">
                        <div className={`p-1.5 rounded-lg border ${typeColors[d.type]}`}>{typeIcons[d.type]}</div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{d.name}</p>
                          <p className="text-[10px] text-slate-500">{d.size} · {d.updated}</p>
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeColors[d.type]}`}>{d.type}</span>
                      </div>
                      <div className="col-span-2 text-center text-xs text-slate-300 font-mono">{d.rows}</div>
                      <div className="col-span-1 text-center text-xs text-slate-400">{d.columns}</div>
                      <div className="col-span-2 flex justify-center">
                        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          d.status === "Ready" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" :
                          d.status === "Processing" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" :
                          "bg-rose-500/10 text-rose-300 border-rose-500/20"
                        }`}>
                          {d.status === "Processing" ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> :
                           d.status === "Ready" ? <CheckCircle2 className="w-2.5 h-2.5" /> :
                           <AlertCircle className="w-2.5 h-2.5" />}
                          {d.status}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors"><Download className="w-3.5 h-3.5" /></button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="connectors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectors.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-5 rounded-2xl border transition-all hover:-translate-y-0.5 group ${c.connected ? "bg-[#0D0A18]/80 border-emerald-500/20 hover:border-emerald-500/40" : "bg-[#0D0A18]/40 border-white/7 hover:border-white/14"}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-white">{c.name}</p>
                        {c.connected && <p className="text-[10px] text-emerald-400 font-mono">{c.records} records synced</p>}
                      </div>
                    </div>
                    <span className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${c.connected ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" : "bg-white/5 text-slate-500 border-white/10"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.connected ? "bg-emerald-400" : "bg-slate-600"}`} />
                      {c.connected ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <button className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${c.connected ? "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10" : "bg-purple-600/80 text-white hover:bg-purple-600"}`}>
                    {c.connected ? "Manage →" : "Connect →"}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-5 rounded-2xl border border-dashed border-white/12 hover:border-purple-500/30 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer group min-h-[140px]"
              >
                <Plus className="w-6 h-6 text-slate-600 group-hover:text-purple-400 transition-colors" />
                <p className="text-xs text-slate-500 group-hover:text-white transition-colors">Browse 100+ connectors</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <Modal
        isOpen={uploadOpen}
        onClose={() => { setUploadOpen(false); setUploadState("idle"); setUploadProgress(0); }}
        title="Upload Dataset"
        description="Connect CSV, JSON, Parquet, or SQL dumps for real-time AI analysis."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleUpload} disabled={uploadState !== "idle"}>
              {uploadState === "uploading" ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />Uploading...</> :
               uploadState === "done" ? <><CheckCircle2 className="w-3.5 h-3.5 mr-2" />Complete!</> : "Start Upload"}
            </Button>
          </>
        }
      >
        {uploadState === "idle" ? (
          <div className="p-8 rounded-xl border-2 border-dashed border-purple-500/30 bg-purple-950/15 text-center space-y-3">
            <Upload className="w-10 h-10 text-purple-400 mx-auto" />
            <div>
              <p className="text-sm font-bold text-white">Drop your file here</p>
              <p className="text-xs text-slate-400 mt-1">CSV, JSON, Parquet, XLSX — up to 500 MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{uploadState === "done" ? "Upload complete!" : "Uploading..."}</span>
              <span className="text-purple-300 font-mono">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5">
              <motion.div
                animate={{ width: `${uploadProgress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-500"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
