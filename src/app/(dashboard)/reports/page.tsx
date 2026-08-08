"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Plus,
  Download,
  Share2,
  Eye,
  Calendar,
  Sparkles,
  CheckCircle2,
  Loader2,
  ChevronRight,
  ChevronLeft,
  X,
  Printer,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { StatusBadge } from "@/components/design-system/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";

interface ReportItem {
  id: string;
  title: string;
  updated: string;
  insightsCount: number;
  status: "Ready" | "Draft";
  author: string;
  dataset: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: "rep-01",
      title: "Monthly Growth Report",
      updated: "Updated Aug 8, 2026",
      insightsCount: 12,
      status: "Ready",
      author: "Alex Vance",
      dataset: "Marketing_Q3.csv",
    },
    {
      id: "rep-02",
      title: "Q3 Performance & Revenue Audit",
      updated: "Updated Aug 6, 2026",
      insightsCount: 8,
      status: "Ready",
      author: "Alex Vance",
      dataset: "Sales_2026.xlsx",
    },
    {
      id: "rep-03",
      title: "Customer Cohort Retention Analysis",
      updated: "Updated Aug 2, 2026",
      insightsCount: 14,
      status: "Draft",
      author: "Alex Vance",
      dataset: "User_Cohorts_Aug.csv",
    },
  ]);

  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Wizard selections
  const [selectedDs, setSelectedDs] = useState("Marketing_Q3.csv");
  const [selectedAnalysis, setSelectedAnalysis] = useState("Revenue & Conversion Expansion");
  const [reportTitleInput, setReportTitleInput] = useState("Executive Growth Brief");

  const handleNextStep = () => {
    if (wizardStep < 3) {
      setWizardStep(wizardStep + 1);
    } else {
      // Final Generation Step
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setIsWizardOpen(false);
        setWizardStep(1);

        const newRep: ReportItem = {
          id: `rep-${Date.now()}`,
          title: reportTitleInput || "Custom Executive Brief",
          updated: "Updated Just now",
          insightsCount: 10,
          status: "Ready",
          author: "Alex Vance",
          dataset: selectedDs,
        };
        setReports((prev) => [newRep, ...prev]);
        setSelectedReport(newRep);
      }, 2000);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* State Switcher */}
      <div className="flex justify-end items-center gap-2 select-none text-xs">
        <span className="text-slate-400">View Mode:</span>
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="px-3 py-1 rounded-lg glass-pill border border-purple-500/30 text-purple-300 hover:text-white transition-all cursor-pointer"
        >
          {showEmptyState ? "Switch to Reports List" : "Preview Empty State"}
        </button>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reports</h1>
          <p className="text-xs text-slate-400 mt-1">
            Turn your analysis into clear, shareable reports.
          </p>
        </div>

        <Button size="sm" onClick={() => setIsWizardOpen(true)} icon={<Plus className="w-3.5 h-3.5" />}>
          Create report
        </Button>
      </div>

      {showEmptyState ? (
        /* EMPTY STATE VIEW */
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto my-12 text-center">
          <GlassCard variant="active" className="p-10 space-y-6 border-purple-500/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Turn your first analysis into a report</h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Generate executive briefs, cohort summaries, and SLA audits ready for instant PDF or CSV export.
              </p>
            </div>
            <Button size="lg" onClick={() => setIsWizardOpen(true)} icon={<Plus className="w-4 h-4" />}>
              Create your first report
            </Button>
          </GlassCard>
        </motion.div>
      ) : (
        /* POPULATED REPORTS LIST */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((rep) => (
            <GlassCard
              key={rep.id}
              variant="glow"
              className="flex flex-col justify-between p-6 space-y-6 border-white/10 hover:border-purple-500/40 group cursor-pointer"
              onClick={() => setSelectedReport(rep)}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <StatusBadge status={rep.status === "Ready" ? "Processed" : "Draft"} label={rep.status} />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-tight mb-2">
                  {rep.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{rep.updated}</span>
                  </p>
                  <p className="flex items-center gap-1.5 font-mono text-purple-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{rep.insightsCount} AI Insights Synthesized</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Author: {rep.author}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReport(rep);
                    }}
                    className="p-1.5 rounded-lg glass-pill text-slate-300 hover:text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReport(rep);
                    }}
                    className="p-1.5 rounded-lg glass-pill text-slate-300 hover:text-white"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* REPORT CREATION WIZARD MODAL */}
      <Modal
        isOpen={isWizardOpen}
        onClose={() => {
          if (!isGenerating) {
            setIsWizardOpen(false);
            setWizardStep(1);
          }
        }}
        title={`Create Report — Step ${wizardStep} of 3`}
        description="Build an automated executive brief from your data analysis."
        size="lg"
        footer={
          <>
            {wizardStep > 1 && !isGenerating && (
              <Button variant="ghost" size="sm" onClick={() => setWizardStep(wizardStep - 1)} leftIcon={<ChevronLeft className="w-4 h-4" />}>
                Back
              </Button>
            )}
            <Button size="sm" isLoading={isGenerating} onClick={handleNextStep} rightIcon={wizardStep === 3 ? <Sparkles className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}>
              {wizardStep === 3 ? "Generate Report" : "Next Step"}
            </Button>
          </>
        }
      >
        <div className="py-4 space-y-6">
          {/* Progress Indicator Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className={wizardStep >= 1 ? "text-purple-300" : ""}>1. Choose dataset</span>
            <span className={wizardStep >= 2 ? "text-purple-300" : ""}>2. Choose analysis</span>
            <span className={wizardStep >= 3 ? "text-purple-300" : ""}>3. Report Details</span>
          </div>

          {/* STEP 1: CHOOSE DATASET */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <Select
                label="Select Input Dataset Source"
                options={[
                  { value: "Marketing_Q3.csv", label: "Marketing_Q3.csv (24,820 rows)" },
                  { value: "Sales_2026.xlsx", label: "Sales_2026.xlsx (18,421 rows)" },
                  { value: "User_Cohorts_Aug.csv", label: "User_Cohorts_Aug.csv (52,100 rows)" },
                ]}
                value={selectedDs}
                onChange={(e) => setSelectedDs(e.target.value)}
              />
            </div>
          )}

          {/* STEP 2: CHOOSE ANALYSIS */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <Select
                label="Select AI Analysis Focus"
                options={[
                  { value: "Revenue & Conversion Expansion", label: "Revenue & Conversion Expansion" },
                  { value: "Cohort Retention & Churn Drivers", label: "Cohort Retention & Churn Drivers" },
                  { value: "Regional Telemetry Audit", label: "Regional Telemetry Audit" },
                ]}
                value={selectedAnalysis}
                onChange={(e) => setSelectedAnalysis(e.target.value)}
              />
            </div>
          )}

          {/* STEP 3: SECTIONS & GENERATION */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Report Title</label>
                <input
                  type="text"
                  value={reportTitleInput}
                  onChange={(e) => setReportTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl glass-input"
                />
              </div>

              <div className="p-4 rounded-xl glass-pill space-y-2 text-xs">
                <span className="font-bold text-white block">Included Sections:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Executive Summary</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Key Metrics KPI Grid</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Telemetry Charts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Recommendations</span>
                  </div>
                </div>
              </div>

              {isGenerating && (
                <div className="p-6 rounded-xl bg-purple-950/30 border border-purple-500/40 text-center space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-400 mx-auto" />
                  <p className="text-xs font-bold text-white">Generating Executive Brief...</p>
                  <p className="text-[11px] text-purple-300 font-mono">Synthesizing 10 key insights</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* REPORT PREVIEW MODAL */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={selectedReport.title}
          description={`Generated on ${selectedReport.updated} for ${selectedReport.dataset}`}
          size="xl"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
              <Button variant="secondary" size="sm" icon={<Share2 className="w-3.5 h-3.5" />}>
                Share Link
              </Button>
              <Button size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                Export PDF
              </Button>
            </>
          }
        >
          {/* POLISHED BUSINESS DOCUMENT PREVIEW */}
          <div className="p-6 rounded-2xl bg-[#090614] border border-white/10 space-y-6 text-xs leading-relaxed text-slate-200">
            {/* Header branding */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white text-sm">InsightAI Executive Brief</span>
              </div>
              <span className="text-[11px] font-mono text-purple-300">Confidential • Internal</span>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">1. Executive Summary</h4>
              <p className="text-slate-300">
                During the current reporting cycle, total revenue reached <strong className="text-white">$48,290</strong> (+24.8% YoY), driven by a 23% expansion in returning customer purchases and improved checkout conversion rates (8.42%).
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">2. Key Performance Indicators</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-slate-400 block">Monthly Revenue</span>
                  <span className="text-base font-bold text-emerald-400">$48,290 (+24.8%)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-slate-400 block">Active Subscribers</span>
                  <span className="text-base font-bold text-white">12,482 (+18.2%)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-slate-400 block">Conversion Rate</span>
                  <span className="text-base font-bold text-purple-300">8.42% (+3.1%)</span>
                </div>
              </div>
            </div>

            {/* AI Insights & Recommendations */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">3. AI Insights & Strategic Recommendations</h4>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li><strong className="text-white">Retention Focus:</strong> Returning customers represent 67% of total MRR. Maintain sub-140ms execution speeds.</li>
                <li><strong className="text-white">Enterprise Upsell:</strong> Accounts with 25+ agents show 98.4% 6-month retention. Scale solution engineering outreach.</li>
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
