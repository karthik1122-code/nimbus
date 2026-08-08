"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Activity, Globe } from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { SectionHeader } from "@/components/design-system/SectionHeader";

export function AnalyticsShowcase() {
  const sources = [
    { name: "Direct Search & Inbound", pct: 45, val: "5,616 users" },
    { name: "Organic Referral Feeds", pct: 32, val: "3,994 users" },
    { name: "API Integration Webhooks", pct: 15, val: "1,872 users" },
    { name: "Paid Acquisition Campaigns", pct: 8, val: "1,000 users" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-16">
      <SectionHeader
        badge="Analytics Engine"
        titleSans="Precision metrics."
        titleSerifItalic="Uncompromising speed."
        subtitle="Track revenue growth, user retention, and checkout conversion rates across all touchpoints."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Revenue & User Growth Chart */}
        <div className="lg:col-span-8">
          <GlassCard variant="glow" className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Revenue & User Trajectory</h3>
                <p className="text-xs text-slate-400">Monthly recurring revenue vs active cohorts</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="text-xs text-slate-300 mr-3">Revenue ($)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-300">Active Users</span>
              </div>
            </div>

            {/* Custom Minimal SVG Line/Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-white/10 px-2">
              {[40, 52, 48, 65, 78, 70, 85, 92, 88, 105, 115, 130].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full rounded-t-md bg-gradient-to-t from-purple-800 via-purple-600 to-purple-400 group-hover:from-purple-500 group-hover:to-purple-300 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  />
                  <span className="text-[10px] text-slate-500 font-mono mt-1">
                    M{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Traffic & Conversion Breakdown */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="default" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Traffic Source Breakdown</h4>
              <Globe className="w-4 h-4 text-purple-400" />
            </div>

            <div className="space-y-3 pt-2">
              {sources.map((src, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{src.name}</span>
                    <span className="text-purple-300 font-mono">{src.pct}%</span>
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
        </div>
      </div>
    </section>
  );
}
