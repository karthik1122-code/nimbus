"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, FileSpreadsheet, Zap, CheckCircle2, ArrowRight, Bot, Cpu, Sliders } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function ServicesPage() {
  const [taskCount, setTaskCount] = useState(5000);
  const [teamSize, setTeamSize] = useState(10);

  const hoursSavedPerMonth = Math.round((taskCount * 0.15));
  const estimatedSavings = Math.round(hoursSavedPerMonth * 45);

  return (
    <div className="min-h-screen bg-[#060512] text-[#f3f1fb] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#c9bbff] block">
              Autonomous Agent Services
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Workflows handled end-to-end.
              <br />
              <em className="hero-title-serif font-normal text-[#c9bbff]">No human overhead.</em>
            </h1>
            <p className="text-[#9d98bb] text-base leading-relaxed max-w-xl mx-auto">
              Explore how Nimbus agents integrate into your existing tool stack to execute lead enrichment, ticket resolution, and document reconciliation autonomously.
            </p>
          </div>

          {/* Service 1: Lead Gen */}
          <div id="lead-gen" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0d0c1e] border border-white/9 rounded-[24px] p-8 sm:p-12">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#5b3df0]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#c9bbff]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#c9bbff] uppercase tracking-wider">Service 01</span>
                <h2 className="font-display text-3xl font-semibold text-white mt-1">Lead Generation & Enrichment</h2>
              </div>
              <p className="text-[#9d98bb] text-sm leading-relaxed">
                Nimbus agents continuously monitor incoming leads, perform deep domain & LinkedIn profile enrichment, calculate ideal customer profile (ICP) match scores, and draft personalized outreach sequences.
              </p>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                {["Automated Clearbit & Apollo enrichment", "ICP fit scoring with probability confidence", "Personalized cold email draft generation", "CRM sync with Hubspot & Salesforce"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link href="/signup">
                  <button className="btn btn-primary">Deploy Lead Gen Agent →</button>
                </Link>
              </div>
            </div>

            <div className="bg-[#0a0918] border border-white/6 rounded-2xl p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/6 text-[#615c82]">
                <span>AGENT EXECUTION STREAM</span>
                <span className="text-[#4ade80]">LIVE</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#131228] border border-white/5 space-y-1">
                  <div className="flex justify-between text-[#c9bbff]">
                    <span>Prospecing target: Acme Corp</span>
                    <span>98.2% Fit</span>
                  </div>
                  <p className="text-[#9d98bb] text-[11px] font-sans">Enriched VP of Sales profile · 1,400 employees · Tech stack: Next.js + Stripe</p>
                </div>
                <div className="p-3 rounded-xl bg-[#131228] border border-white/5 space-y-1">
                  <div className="flex justify-between text-[#c9bbff]">
                    <span>Sequence drafted</span>
                    <span>Scheduled 09:00 AM</span>
                  </div>
                  <p className="text-[#9d98bb] text-[11px] font-sans">Personalized intro mentioning latest product release and ROI metrics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service 2: Support */}
          <div id="customer-support" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0d0c1e] border border-white/9 rounded-[24px] p-8 sm:p-12">
            <div className="order-2 lg:order-1 bg-[#0a0918] border border-white/6 rounded-2xl p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/6 text-[#615c82]">
                <span>SUPPORT TICKET AUTO-RESOLUTION</span>
                <span className="text-[#8b5cf6]">140ms</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-[#131228] border border-white/5 space-y-1">
                  <div className="flex justify-between text-[#f0b357]">
                    <span>Ticket #9042: Refund request</span>
                    <span>Tier-1 Agent</span>
                  </div>
                  <p className="text-[#9d98bb] text-[11px] font-sans">Checked Stripe billing history · Policy verified · Issued $49 refund automatically.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#131228] border border-white/5 space-y-1">
                  <div className="flex justify-between text-[#4ade80]">
                    <span>Ticket #9043: API key setup</span>
                    <span>Resolved</span>
                  </div>
                  <p className="text-[#9d98bb] text-[11px] font-sans">Synthesized solution from documentation macros. Customer rated 5/5 stars.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#5b3df0]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#c9bbff]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#c9bbff] uppercase tracking-wider">Service 02</span>
                <h2 className="font-display text-3xl font-semibold text-white mt-1">24/7 Customer Support Agent</h2>
              </div>
              <p className="text-[#9d98bb] text-sm leading-relaxed">
                Connect Nimbus agents directly to Zendesk, Intercom, or Crisp. Agents answer repetitive queries using your latest docs, APIs, and macros, achieving a 92% first-contact resolution rate.
              </p>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                {["Instant sub-second response times", "Seamless human escalation with full transcript context", "Multi-lingual support across 40+ languages", "Self-learning from updated documentation"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link href="/signup">
                  <button className="btn btn-primary">Deploy Support Agent →</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Service 3: Data Entry */}
          <div id="data-entry" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#0d0c1e] border border-white/9 rounded-[24px] p-8 sm:p-12">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#5b3df0]/10 border border-[#8b5cf6]/30 flex items-center justify-center text-[#c9bbff]">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-[#c9bbff] uppercase tracking-wider">Service 03</span>
                <h2 className="font-display text-3xl font-semibold text-white mt-1">Automated Data Entry & Parsing</h2>
              </div>
              <p className="text-[#9d98bb] text-sm leading-relaxed">
                Stop manual copy-pasting. Nimbus vision-enabled AI agents parse incoming invoices, PDFs, email attachments, and web forms into your database, ERP, or CRM with zero formatting errors.
              </p>
              <ul className="space-y-3 text-xs text-slate-300 font-medium">
                {["OCR PDF & image extraction", "Automatic line-item reconciliation", "Direct Webhook & Postgres writeback", "Anomaly detection & validation rules"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link href="/signup">
                  <button className="btn btn-primary">Deploy Data Entry Agent →</button>
                </Link>
              </div>
            </div>

            <div className="bg-[#0a0918] border border-white/6 rounded-2xl p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/6 text-[#615c82]">
                <span>PARSER EXECUTION LOG</span>
                <span className="text-[#c9bbff]">14,200/mo</span>
              </div>
              <div className="space-y-2">
                {[
                  { file: "Invoice_Aug_04.pdf", amount: "$3,480.00", vendor: "AWS Inc", status: "Reconciled" },
                  { file: "Receipt_4912.png", amount: "$124.50", vendor: "GitHub", status: "Validated" },
                  { file: "Contract_Scope.pdf", amount: "$18,000.00", vendor: "Client Corp", status: "Parsed" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#131228] border border-white/5">
                    <div>
                      <p className="text-white font-medium">{row.file}</p>
                      <p className="text-[10px] text-[#615c82]">{row.vendor} · {row.amount}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/15 text-[#4ade80] text-[10px] font-sans font-medium">
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Agent ROI Calculator */}
          <div className="bg-gradient-to-br from-[#131228] via-[#0d0c1e] to-[#0a0918] border border-[#8b5cf6]/30 rounded-[24px] p-8 sm:p-12 text-center space-y-8">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-[#c9bbff]">Interactive Calculator</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">Calculate your monthly time & cost savings</h2>
              <p className="text-[#9d98bb] text-sm">Drag the sliders to estimate how much time and money Nimbus agents will save your company.</p>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-left bg-[#060512] p-6 rounded-2xl border border-white/8">
              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-2">
                  <span>Monthly Repetitive Tasks</span>
                  <span className="text-[#c9bbff] font-mono">{taskCount.toLocaleString()} tasks</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={taskCount}
                  onChange={(e) => setTaskCount(Number(e.target.value))}
                  className="w-full accent-[#8b5cf6]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-white mb-2">
                  <span>Team Size</span>
                  <span className="text-[#c9bbff] font-mono">{teamSize} people</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-[#8b5cf6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div className="p-5 rounded-2xl bg-[#0a0918] border border-white/8">
                <span className="text-3xl font-display font-semibold text-white">{hoursSavedPerMonth.toLocaleString()} hrs</span>
                <p className="text-xs text-[#9d98bb] mt-1">Saved every month</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0a0918] border border-[#8b5cf6]/30">
                <span className="text-3xl font-display font-semibold text-[#4ade80]">${estimatedSavings.toLocaleString()}</span>
                <p className="text-xs text-[#9d98bb] mt-1">Est. monthly cost savings</p>
              </div>
            </div>

            <Link href="/signup">
              <button className="btn btn-primary btn-lg">Start Free Trial — Save Time Now</button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
