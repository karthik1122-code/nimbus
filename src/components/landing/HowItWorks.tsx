"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, ScanSearch, Flame, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: <Upload className="w-6 h-6" />,
    title: "Connect your data",
    desc: "Link any source in seconds — CSV, SQL, REST API, or 100+ native connectors. Zero config required.",
    color: "purple",
    tag: "Ingestion",
  },
  {
    num: "02",
    icon: <ScanSearch className="w-6 h-6" />,
    title: "AI scans & indexes",
    desc: "InsightAI runs statistical regression, cohort analysis, and pattern detection across all your data streams autonomously.",
    color: "indigo",
    tag: "Analysis",
  },
  {
    num: "03",
    icon: <Flame className="w-6 h-6" />,
    title: "Act on insights",
    desc: "Receive prioritized action recommendations with probability scores. Trigger workflows, send campaigns, or export reports automatically.",
    color: "violet",
    tag: "Action",
  },
];

const colorMap: Record<string, { border: string; icon: string; tag: string; glow: string; line: string }> = {
  purple: {
    border: "border-purple-500/40",
    icon: "bg-purple-600/20 border-purple-500/30 text-purple-300",
    tag: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.25)]",
    line: "from-purple-500/60 to-indigo-500/60",
  },
  indigo: {
    border: "border-indigo-500/40",
    icon: "bg-indigo-600/20 border-indigo-500/30 text-indigo-300",
    tag: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.25)]",
    line: "from-indigo-500/60 to-violet-500/60",
  },
  violet: {
    border: "border-violet-500/40",
    icon: "bg-violet-600/20 border-violet-500/30 text-violet-300",
    tag: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    glow: "",
    line: "",
  },
};

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const c = colorMap[step.color];

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`relative p-8 rounded-2xl border bg-[#0D0A18]/80 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 group ${c.border} ${c.glow}`}
      >
        {/* Hover spotlight */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 60%)" }} />

        {/* Number */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${c.icon} group-hover:scale-110 transition-transform`}>
            {step.icon}
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${c.tag}`}>
              {step.tag}
            </span>
            <span className="text-4xl font-black text-white/5 font-mono">{step.num}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
          {step.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>

        {/* Arrow connector (not on last) */}
        {index < steps.length - 1 && (
          <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-12">
            <div className={`w-8 h-px bg-gradient-to-r ${c.line}`} />
            <ArrowRight className="w-4 h-4 text-purple-500/40 -ml-1" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16 space-y-4"
      >
        <div className="section-badge mx-auto w-fit">How it works</div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          From raw data to
          <br />
          <span className="hero-title-serif text-gradient-purple">clear decisions.</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Three steps is all it takes. No data engineering team required.
        </p>
      </motion.div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>

      {/* Bottom time-to-value callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 text-center"
      >
        <p className="text-sm text-slate-400">
          Average time from signup to first AI insight:
          <span className="text-white font-bold ml-2">under 8 minutes</span>
        </p>
      </motion.div>
    </section>
  );
}
