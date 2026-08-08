"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { SectionHeader } from "@/components/design-system/SectionHeader";

export function FeatureGrid() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-purple-400" />,
      title: "Autonomous Lead Generation",
      description:
        "AI agents continuously scrape, qualify, and enrich prospective leads from multi-channel streams with zero manual intervention.",
      tag: "Lead Gen Engine",
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Instant 24/7 Support Resolution",
      description:
        "Intelligent support bots resolve complex tier-1 and tier-2 tickets autonomously with human-grade empathy and accuracy.",
      tag: "Support Bot",
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Real-time Data Entry & Sync",
      description:
        "Seamlessly validate, normalize, and stream activity logs across CRMs, SQL databases, and internal analytics feeds.",
      tag: "ETL Pipeline",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: "Enterprise Anomaly Detection",
      description:
        "Proactive background monitor alerts you to unexpected traffic surges, payment dropouts, or data schema mismatches.",
      tag: "Security Guard",
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      title: "Multi-Agent Orchestration",
      description:
        "Chain specialized AI models together into seamless workflows to handle end-to-end operational execution.",
      tag: "Workflow Chains",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "Predictive Intelligence Reports",
      description:
        "Automated financial forecasting, churn analysis, and revenue insights delivered straight to your team dashboard.",
      tag: "AI Forecasting",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeader
        badge="Platform Capabilities"
        titleSans="Designed for scale."
        titleSerifItalic="Built for velocity."
        subtitle="Explore how InsightAI empowers modern engineering and product teams to automate operational overhead."
      />

      {/* Feature Cards Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <GlassCard
            key={idx}
            variant="glow"
            className="flex flex-col justify-between group cursor-pointer border-white/10 hover:border-purple-500/40"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  {feature.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase px-2.5 py-1 rounded-full glass-pill border border-purple-500/20">
                  {feature.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors flex items-center gap-2">
                <span>{feature.title}</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
              </h3>

              <p className="text-sm text-slate-400 font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
