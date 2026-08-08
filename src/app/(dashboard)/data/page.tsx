"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Database,
  Search,
  Filter,
  RefreshCw,
  Plus,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Download,
  Sparkles,
  Loader2,
  X,
  ChevronRight,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { StatusBadge } from "@/components/design-system/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
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

export default function DataPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "success" | "failed">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  const initialDatasets: DatasetItem[] = [
    {
      id: "ds-01",
      name: "Marketing_Q3.csv",
      type: "CSV",
      rows: "24,820 rows",
      columns: 18,
      updated: "Updated 2 hours ago",
      size: "4.2 MB",
      status: "Ready",
    },
    {
      id: "ds-02",
      name: "Sales_2026.xlsx",
      type: "XLSX",
      rows: "18,421 rows",
      columns: 12,
      updated: "Updated yesterday",
      size: "8.1 MB",
      status: "Ready",
    },
    {
      id: "ds-03",
      name: "User_Cohorts_Aug.csv",
      type: "CSV",
      rows: "52,100 rows",
      columns: 24,
      updated: "Updated 3 days ago",
      size: "12.4 MB",
      status: "Ready",
    },
    {
      id: "ds-04",
      name: "Checkout_Funnel_Events.json",
      type: "JSON",
      rows: "142,900 rows",
      columns: 8,
      updated: "Updated 5 days ago",
      size: "18.9 MB",
      status: "Ready",
    },
  ];

  const [datasets, setDatasets] = useState<DatasetItem[]>(initialDatasets);

  // Mock Upload Simulation
  const handleSimulateUpload = () => {
    setUploadState("uploading");
    setUploadProgress(20);

    setTimeout(() => {
      setUploadProgress(65);
      setUploadState("processing");
    }, 1000);

    setTimeout(() => {
      setUploadProgress(100);
      setUploadState("success");

      const newDs: DatasetItem = {
        id: `ds-${Date.now()}`,
        name: "New_Customer_Logs.csv",
        type: "CSV",
        rows: "34,200 rows",
        columns: 16,
        updated: "Just now",
        size: "5.6 MB",
        status: "Ready",
      };
      setDatasets((prev) => [newDs, ...prev]);
    }, 2500);
  };

  const filteredDatasets = datasets.filter((ds) => {
    const matchesSearch = ds.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || ds.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Mock dataset preview table data
  const previewRows = [
    { date: "2026-08-08", revenue: "$48,290", users: "12,482", conversion: "8.42%", region: "US East" },
    { date: "2026-08-07", revenue: "$44,120", users: "11,890", conversion: "8.10%", region: "US East" },
    { date: "2026-08-06", revenue: "$42,800", users: "11,200", conversion: "7.95%", region: "EU West" },
    { date: "2026-08-05", revenue: "$46,500", users: "12,100", conversion: "8.30%", region: "AP South" },
    { date: "2026-08-04", revenue: "$39,400", users: "10,500", conversion: "7.60%", region: "US West" },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* View Switchers for State Testing */}
      <div className="flex flex-wrap justify-end items-center gap-3 text-xs select-none">
        <span className="text-slate-400">Preview States:</span>
        <button
          onClick={() => {
            setShowEmptyState(!showEmptyState);
            setShowErrorState(false);
          }}
          className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
            showEmptyState
              ? "bg-purple-600 text-white border-purple-400"
              : "glass-pill text-slate-300 border-white/10"
          }`}
        >
          {showEmptyState ? "Exit Empty State" : "Empty State"}
        </button>
        <button
          onClick={() => {
            setShowErrorState(!showErrorState);
            setShowEmptyState(false);
          }}
          className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
            showErrorState
              ? "bg-rose-600 text-white border-rose-400"
              : "glass-pill text-slate-300 border-white/10"
          }`}
        >
          {showErrorState ? "Exit Error State" : "Error State"}
        </button>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Your data</h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect and manage the datasets powering your insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={<Database className="w-3.5 h-3.5 text-purple-400" />}>
            Connect source
          </Button>
          <Button size="sm" onClick={handleSimulateUpload} icon={<Upload className="w-3.5 h-3.5" />}>
            Upload dataset
          </Button>
        </div>
      </div>

      {/* ERROR STATE CARD */}
      {showErrorState && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard variant="default" className="p-6 border-rose-500/40 bg-rose-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Dataset couldn't be processed</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  "Legacy_Logs_2025.csv" failed validation due to missing timestamp columns.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setShowErrorState(false)}>
                Dismiss
              </Button>
              <Button variant="danger" size="sm" onClick={handleSimulateUpload}>
                Retry Upload
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* EMPTY STATE VIEW */}
      {showEmptyState ? (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto my-12 text-center">
          <GlassCard variant="active" className="p-10 space-y-6 border-purple-500/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto">
              <Database className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">No datasets yet</h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Connect your first CSV or database stream to let InsightAI generate actionable analytics.
              </p>
            </div>
            <Button size="lg" onClick={handleSimulateUpload} icon={<Upload className="w-4 h-4" />}>
              Upload your first dataset
            </Button>
          </GlassCard>
        </motion.div>
      ) : (
        <>
          {/* UPLOAD EXPERIENCE ZONE */}
          <GlassCard variant="glow" className="p-8">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleSimulateUpload();
              }}
              className={`p-8 rounded-2xl border-2 border-dashed transition-all duration-300 text-center space-y-4 cursor-pointer ${
                isDragOver
                  ? "border-purple-400 bg-purple-600/20 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                  : "border-purple-500/30 bg-purple-950/10 hover:border-purple-500/50 hover:bg-purple-950/20"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Upload className="w-7 h-7" />
              </div>

              {uploadState === "idle" && (
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Drop your dataset here</h3>
                  <p className="text-xs text-slate-400">CSV, XLSX up to 50MB</p>
                </div>
              )}

              {(uploadState === "uploading" || uploadState === "processing") && (
                <div className="space-y-3 max-w-xs mx-auto">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-300">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    <span>
                      {uploadState === "uploading" ? "Uploading dataset..." : "Analyzing dataset schema..."}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-400"
                      initial={{ width: "0%" }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}

              {uploadState === "success" && (
                <div className="space-y-2 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 mx-auto animate-bounce" />
                  <h3 className="text-sm font-bold text-white">Dataset uploaded & verified!</h3>
                  <p className="text-xs text-slate-300">34,200 rows indexed in sub-seconds.</p>
                </div>
              )}

              <div className="pt-2">
                <Button size="sm" variant="secondary" onClick={handleSimulateUpload}>
                  Choose file
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* DATASET LIST SECTION */}
          <GlassCard variant="default" className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Recent datasets</h3>
                <p className="text-xs text-slate-400">Manage connected raw data streams and file uploads</p>
              </div>

              {/* Search, Filter, Sort Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl glass-input"
                  />
                </div>

                <Select
                  options={[
                    { value: "All", label: "All Statuses" },
                    { value: "Ready", label: "Ready" },
                    { value: "Processing", label: "Processing" },
                  ]}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-36 py-1.5"
                />
              </div>
            </div>

            {/* Dataset List Table */}
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080512]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#120D24] text-slate-400 font-semibold border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-5">Name</th>
                    <th className="py-3.5 px-5">Type</th>
                    <th className="py-3.5 px-5">Rows</th>
                    <th className="py-3.5 px-5">Columns</th>
                    <th className="py-3.5 px-5">Last updated</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredDatasets.map((ds) => (
                    <tr
                      key={ds.id}
                      className="hover:bg-purple-950/20 transition-colors group cursor-pointer"
                      onClick={() => setSelectedDataset(ds)}
                    >
                      <td className="py-4 px-5 font-semibold text-white flex items-center gap-2.5">
                        <FileSpreadsheet className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>{ds.name}</span>
                      </td>
                      <td className="py-4 px-5 font-mono text-purple-300">{ds.type}</td>
                      <td className="py-4 px-5 text-slate-300">{ds.rows}</td>
                      <td className="py-4 px-5 text-slate-400">{ds.columns} cols</td>
                      <td className="py-4 px-5 text-slate-400">{ds.updated}</td>
                      <td className="py-4 px-5">
                        <StatusBadge status={ds.status === "Ready" ? "Processed" : "In Queue"} label={ds.status} />
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDataset(ds);
                            }}
                            className="p-1.5 rounded-lg glass-pill text-slate-300 hover:text-white"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      )}

      {/* DATASET DETAIL PREVIEW PANEL MODAL */}
      {selectedDataset && (
        <Modal
          isOpen={!!selectedDataset}
          onClose={() => setSelectedDataset(null)}
          title={`Dataset Preview: ${selectedDataset.name}`}
          description={`Indexed ${selectedDataset.rows} across ${selectedDataset.columns} columns (${selectedDataset.size})`}
          size="xl"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDataset(null)}>
                Close Preview
              </Button>
              <Button size="sm" onClick={() => window.location.href = "/dashboard/analytics"} rightIcon={<ChevronRight className="w-4 h-4" />}>
                Analyze in Workspace
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block">Total Rows</span>
                <span className="font-bold text-white font-mono">{selectedDataset.rows}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block">Columns</span>
                <span className="font-bold text-purple-300 font-mono">{selectedDataset.columns}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block">File Size</span>
                <span className="font-bold text-white font-mono">{selectedDataset.size}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[11px] text-slate-400 block">Status</span>
                <span className="font-bold text-emerald-400 font-mono">100% Ready</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080512] max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#120D24] text-slate-400 font-semibold border-b border-white/10 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4">Revenue</th>
                    <th className="py-2.5 px-4">Users</th>
                    <th className="py-2.5 px-4">Conversion</th>
                    <th className="py-2.5 px-4">Region</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {previewRows.map((r, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="py-2.5 px-4 font-mono text-slate-400">{r.date}</td>
                      <td className="py-2.5 px-4 font-bold text-white">{r.revenue}</td>
                      <td className="py-2.5 px-4 font-mono text-purple-300">{r.users}</td>
                      <td className="py-2.5 px-4 text-emerald-400">{r.conversion}</td>
                      <td className="py-2.5 px-4 text-slate-400">{r.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
