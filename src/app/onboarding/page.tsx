"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  Upload,
  CheckCircle2,
  Briefcase,
  Target,
  Database,
  Rocket,
} from "lucide-react";
import { CosmicOrb } from "@/components/design-system/CosmicOrb";
import { GlassCard } from "@/components/design-system/GlassCard";
import { Button } from "@/components/ui/Button";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form Selections
  const [role, setRole] = useState("Product");
  const [goal, setGoal] = useState("Revenue");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const rolesList = [
    { id: "Marketing", label: "Marketing", desc: "Acquisition & funnel performance" },
    { id: "Product", label: "Product", desc: "User engagement & feature cohorts" },
    { id: "Finance", label: "Finance", desc: "MRR, ARR & revenue metrics" },
    { id: "Operations", label: "Operations", desc: "Telemetry & operational efficiency" },
    { id: "Other", label: "Other", desc: "Custom data analysis" },
  ];

  const goalsList = [
    { id: "Revenue", label: "Revenue & MRR", desc: "Track cashflow & subscription growth" },
    { id: "Customers", label: "Customers & Retention", desc: "Cohort churn & lifetime value" },
    { id: "Marketing", label: "Marketing ROI", desc: "Campaign conversions & leads" },
    { id: "Product usage", label: "Product Usage", desc: "Feature adoption & event logs" },
    { id: "Other", label: "Other Focus", desc: "General business intelligence" },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#05030A] text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden py-12 select-none">
      <CosmicOrb showRing={true} intensity="high" />

      <div className="relative z-10 w-full max-w-xl space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-[0_0_20px_rgba(139,92,246,0.6)]">
              <div className="w-full h-full bg-[#090614] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white">
              Insight<span className="text-purple-400">AI</span>
            </span>
          </Link>

          {/* Step Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
              <span>SETUP WORKSPACE</span>
              <span className="text-purple-300 font-bold">STEP {step} OF 4</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-400"
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Step Card Shell */}
        <GlassCard variant="glow" className="p-8 space-y-6 border-purple-500/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
          <AnimatePresence mode="wait">
            {/* STEP 1: WORK ROLE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-white">Welcome to InsightAI</h2>
                  <p className="text-xs text-slate-400">Let's personalize your workspace.</p>
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    What best describes your work?
                  </label>
                  {rolesList.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        role === r.id
                          ? "bg-purple-600/20 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Briefcase className={`w-4 h-4 ${role === r.id ? "text-purple-400" : "text-slate-400"}`} />
                        <div>
                          <span className="text-xs font-bold text-white block">{r.label}</span>
                          <span className="text-[11px] text-slate-400">{r.desc}</span>
                        </div>
                      </div>
                      {role === r.id && <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: ANALYSIS GOAL */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-white">What do you want to analyze?</h2>
                  <p className="text-xs text-slate-400">Select your primary decision objective.</p>
                </div>

                <div className="space-y-2.5">
                  {goalsList.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        goal === g.id
                          ? "bg-purple-600/20 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Target className={`w-4 h-4 ${goal === g.id ? "text-purple-400" : "text-slate-400"}`} />
                        <div>
                          <span className="text-xs font-bold text-white block">{g.label}</span>
                          <span className="text-[11px] text-slate-400">{g.desc}</span>
                        </div>
                      </div>
                      {goal === g.id && <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: CONNECT DATASET */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-white">Connect your first dataset</h2>
                  <p className="text-xs text-slate-400">Upload a CSV file or skip to test with sample data.</p>
                </div>

                <div
                  onClick={() => setUploadedFile("Marketing_Q3_Sample.csv")}
                  className="p-8 rounded-2xl border-2 border-dashed border-purple-500/40 bg-purple-950/20 text-center space-y-3 cursor-pointer hover:border-purple-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                    <Upload className="w-6 h-6" />
                  </div>

                  {uploadedFile ? (
                    <div className="text-emerald-400 space-y-1">
                      <CheckCircle2 className="w-6 h-6 mx-auto" />
                      <p className="text-xs font-bold text-white">{uploadedFile}</p>
                      <p className="text-[11px] text-slate-300">File attached & ready for processing.</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-white">Click to select CSV or XLSX file</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Supports datasets up to 50MB</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STEP 4: WORKSPACE READY */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-[0_0_30px_rgba(168,85,247,0.5)] mx-auto">
                  <div className="w-full h-full bg-[#090614] rounded-[14px] flex items-center justify-center text-purple-300">
                    <Rocket className="w-8 h-8 animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Workspace ready</h2>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    You're ready to discover your first insight. We've initialized your workspace for <strong className="text-purple-300">{role}</strong> with a focus on <strong className="text-purple-300">{goal}</strong>.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Wizard Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            {step > 1 && step < 4 ? (
              <Button variant="ghost" size="sm" onClick={handleBack} leftIcon={<ChevronLeft className="w-4 h-4" />}>
                Back
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              {step === 3 && (
                <Button variant="ghost" size="sm" onClick={handleNext}>
                  Skip for now
                </Button>
              )}

              <Button size="md" onClick={handleNext} rightIcon={step === 4 ? <Rocket className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}>
                {step === 4 ? "Open dashboard" : "Continue"}
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
