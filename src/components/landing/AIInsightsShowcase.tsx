"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, Send, ArrowUpRight, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";

export function AIInsightsShowcase() {
  return (
    <section id="insights" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-purple-300 border border-purple-500/30">
          Interactive AI Experience
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Conversational BI.{" "}
          <span className="font-serif italic font-normal text-gradient-purple-glow">
            Instant Clarity.
          </span>
        </h2>
        <p className="text-sm md:text-base text-slate-400">
          Ask complex questions in plain English. InsightAI scans millions of data logs in sub-seconds and synthesizes executive answers.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <GlassCard variant="active" className="p-6 md:p-8 space-y-6 border-purple-500/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
          {/* Interface Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">InsightAI Copilot Engine</h3>
                <p className="text-[11px] text-emerald-400 font-medium">Connected to 4 live streams • 98.4% Confidence</p>
              </div>
            </div>
            <span className="px-3 py-1 text-[11px] font-mono rounded-full glass-pill border border-purple-500/30 text-purple-300">
              GPT-4o Telemetry
            </span>
          </div>

          {/* Conversation Stream (Prompt Spec) */}
          <div className="space-y-4 py-2">
            {/* User Prompt */}
            <div className="flex justify-end">
              <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-br-none text-xs md:text-sm font-medium shadow-[0_0_20px_rgba(124,58,237,0.4)] max-w-xl">
                "Why did revenue increase this month?"
              </div>
            </div>

            {/* InsightAI Response */}
            <div className="flex justify-start">
              <div className="bg-[#090614] border border-purple-500/30 text-slate-200 p-5 rounded-2xl rounded-bl-none text-xs md:text-sm leading-relaxed max-w-2xl space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Autonomous Finding</span>
                </div>
                <p>
                  Revenue increased <strong className="text-emerald-400">18.4%</strong>, primarily because returning customers increased by <strong className="text-purple-300">23%</strong>. The strongest growth came from the Enterprise Pro tier upgrades following the 140ms latency release.
                </p>

                {/* Micro Metric Breakdown */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Returning Customer Expansion</span>
                    <span className="text-base font-extrabold text-white">+23.0% YoY</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 block">Pro Tier Upgrade Lift</span>
                    <span className="text-base font-extrabold text-emerald-400">+$12,450 MRR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
