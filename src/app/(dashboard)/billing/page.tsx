"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Sparkles,
  Zap,
  Check,
  Download,
  Calendar,
  FileText,
  Database,
  ArrowUpRight,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { StatusBadge } from "@/components/design-system/StatusBadge";
import { Button } from "@/components/ui/Button";

export default function BillingPage() {
  const [annual, setAnnual] = useState(true);

  const billingHistory = [
    { id: "INV-2026-08", date: "Aug 8, 2026", desc: "Pro subscription - Monthly", amount: "$19.00", status: "Paid" },
    { id: "INV-2026-07", date: "Jul 8, 2026", desc: "Pro subscription - Monthly", amount: "$19.00", status: "Paid" },
    { id: "INV-2026-06", date: "Jun 8, 2026", desc: "Pro subscription - Monthly", amount: "$19.00", status: "Paid" },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Billing</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your subscription plan, monthly quota, and invoice history.
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={<CreditCard className="w-3.5 h-3.5 text-purple-400" />}>
          Update Payment Card
        </Button>
      </div>

      {/* CURRENT PLAN CARD & USAGE METERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Subscription Card */}
        <GlassCard variant="active" className="p-6 md:p-8 flex flex-col justify-between space-y-6 border-purple-500/40 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Current Active Plan</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="flex items-baseline gap-1 my-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">$19</span>
              <span className="text-xs text-slate-300 font-medium">/ month</span>
            </div>

            <h3 className="text-lg font-bold text-white">PRO Plan</h3>
            <p className="text-xs text-slate-300 mt-1">Next billing date: September 8, 2026</p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <Button variant="secondary" size="sm" className="w-full">
              Manage subscription
            </Button>
          </div>
        </GlassCard>

        {/* USAGE METERS (3 Cards) */}
        <GlassCard variant="default" className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Monthly Usage Quota</span>
          </h3>

          <div className="space-y-5">
            {/* Meter 1: AI Analyses */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">AI Analyses</span>
                <span className="font-mono text-purple-300 font-bold">42 / 100 used (42%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 w-[42%]" />
              </div>
            </div>

            {/* Meter 2: Reports */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Generated Reports</span>
                <span className="font-mono text-purple-300 font-bold">18 / 50 used (36%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 w-[36%]" />
              </div>
            </div>

            {/* Meter 3: Storage */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Data Storage</span>
                <span className="font-mono text-purple-300 font-bold">2.4 GB / 10 GB used (24%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 w-[24%]" />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
            Quotas reset on the 1st of every month. Need higher limits? Upgrade to Enterprise.
          </p>
        </GlassCard>
      </div>

      {/* PLANS COMPARISON SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-white">Available Subscription Plans</h3>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold ${!annual ? "text-white" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-11 h-6 rounded-full bg-[#16102E] border border-purple-500/30 p-1 flex items-center transition-colors cursor-pointer"
            >
              <div className={`w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] transform transition-transform ${annual ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className={`text-xs font-semibold ${annual ? "text-white" : "text-slate-400"}`}>Annual (20% OFF)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* FREE PLAN */}
          <GlassCard variant="default" className="p-8 flex flex-col justify-between space-y-6 border-white/10">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">FREE</h4>
              <p className="text-xs text-slate-400 min-h-[32px]">Essential analytics for small datasets.</p>

              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white tracking-tight">$0</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                {["10 analyses / month", "Basic analytics workspace", "Basic reports export", "Community support"].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="secondary" className="w-full">
              Downgrade to Free
            </Button>
          </GlassCard>

          {/* PRO PLAN (PROMINENT) */}
          <GlassCard
            variant="active"
            className="p-8 flex flex-col justify-between space-y-6 relative border-purple-500/50 shadow-[0_0_50px_rgba(124,58,237,0.35)] scale-[1.01]"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 px-4 py-1 rounded-bl-xl text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Current Active Plan</span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-1">PRO</h4>
              <p className="text-xs text-slate-300 min-h-[32px]">Advanced AI insights, reports & exports for growing teams.</p>

              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white tracking-tight">{annual ? "$15" : "$19"}</span>
                <span className="text-xs text-slate-300">/ month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                {[
                  "100 analyses / month",
                  "Advanced real-time analytics",
                  "Conversational AI insights engine",
                  "Advanced PDF & CSV report exports",
                  "Priority execution speed (140ms)",
                  "24/7 priority support",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" disabled>
              Current Active Subscription
            </Button>
          </GlassCard>
        </div>
      </div>

      {/* BILLING HISTORY TABLE */}
      <GlassCard variant="default" className="p-6 space-y-6">
        <h3 className="text-base font-bold text-white">Billing History & Invoices</h3>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080512]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#120D24] text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="py-3.5 px-5">Invoice Reference</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Description</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {billingHistory.map((inv) => (
                <tr key={inv.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-4 px-5 font-mono text-purple-300 font-medium">{inv.id}</td>
                  <td className="py-4 px-5 text-slate-400">{inv.date}</td>
                  <td className="py-4 px-5 font-medium text-white">{inv.desc}</td>
                  <td className="py-4 px-5 font-bold text-white">{inv.amount}</td>
                  <td className="py-4 px-5">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 justify-end ml-auto">
                      <Download className="w-3.5 h-3.5" />
                      <span>View PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
