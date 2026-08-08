"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Play, Quote, TrendingUp, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const caseStudies = [
  {
    company: "Coastal Freight",
    logo: "CF",
    author: "Reema Mehta",
    role: "Head of Ops",
    industry: "Logistics",
    quote: "We turned off two support tools and let one Nimbus agent handle tier-1 tickets. Response time dropped from six hours to ninety seconds.",
    metrics: [
      { label: "Ticket response time", value: "90 sec", detail: "Down from 6 hrs" },
      { label: "Resolution rate", value: "94.2%", detail: "Zero escalation" },
    ],
  },
  {
    company: "Alder & Co.",
    logo: "AC",
    author: "David Kwon",
    role: "Finance Lead",
    industry: "Finance",
    quote: "Data entry used to eat a full day of my analyst's week. Now it's a review queue she clears in twenty minutes.",
    metrics: [
      { label: "Analyst hours saved", value: "32 hrs/mo", detail: "Reallocated to strategy" },
      { label: "Data accuracy", value: "99.98%", detail: "OCR + verification" },
    ],
  },
  {
    company: "Loomwell Studio",
    logo: "LS",
    author: "Anika Torres",
    role: "Founder",
    industry: "E-Commerce",
    quote: "The handoff logic is what sold us — agents know exactly when to loop in a human instead of guessing.",
    metrics: [
      { label: "Monthly qualified leads", value: "+380", detail: "Automated enrichment" },
      { label: "Customer CSAT", value: "4.9 / 5", detail: "Based on 1,200 reviews" },
    ],
  },
  {
    company: "Apex Digital",
    logo: "AD",
    author: "Julian Vance",
    role: "VP Growth",
    industry: "SaaS",
    quote: "Nimbus lead generation agents enriched 12,000 prospects and identified 400 high-intent enterprise buyers automatically.",
    metrics: [
      { label: "Pipeline generated", value: "+$420K", detail: "First 60 days" },
      { label: "Sales rep capacity", value: "3x", detail: "Zero manual data entry" },
    ],
  },
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Logistics", "Finance", "E-Commerce", "SaaS"];

  const filteredStudies = filter === "All" ? caseStudies : caseStudies.filter((c) => c.industry === filter);

  return (
    <div className="min-h-screen bg-[#060512] text-[#f3f1fb] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#c9bbff] block">
              Verified Customer Stories
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Teams running <em className="hero-title-serif font-normal text-[#c9bbff]">lean</em> on Nimbus.
            </h1>
            <p className="text-[#9d98bb] text-base leading-relaxed max-w-xl mx-auto">
              Read how fast-growing startups and enterprises eliminate manual work, reduce response times, and scale operations with autonomous AI agents.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0d0c1e] border border-white/9 text-center">
            <div>
              <span className="text-3xl font-display font-semibold text-white">96.4%</span>
              <p className="text-xs text-[#9d98bb] mt-1">Avg Resolution Rate</p>
            </div>
            <div>
              <span className="text-3xl font-display font-semibold text-[#4ade80]">90 sec</span>
              <p className="text-xs text-[#9d98bb] mt-1">Avg Support Speed</p>
            </div>
            <div>
              <span className="text-3xl font-display font-semibold text-[#c9bbff]">1.4M+</span>
              <p className="text-xs text-[#9d98bb] mt-1">Tasks Processed/Mo</p>
            </div>
            <div>
              <span className="text-3xl font-display font-semibold text-[#f0b357]">4.9 / 5</span>
              <p className="text-xs text-[#9d98bb] mt-1">Customer CSAT</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === cat
                    ? "bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    : "bg-[#131228] text-[#9d98bb] border border-white/8 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStudies.map((study, idx) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0d0c1e] border border-white/9 rounded-[24px] p-8 flex flex-col justify-between space-y-6 hover:border-[#8b5cf6]/40 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8b5cf6] to-[#5b3df0] font-display font-bold text-white flex items-center justify-center text-sm shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                        {study.logo}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-lg">{study.company}</h3>
                        <span className="text-xs text-[#615c82] font-mono">{study.industry}</span>
                      </div>
                    </div>
                    <div className="flex text-[#f0b357] gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-[#8b5cf6]/30" />
                  <p className="text-[#f3f1fb] text-base leading-relaxed italic">
                    {study.quote}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 bg-[#0a0918] p-4 rounded-xl">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="text-xl font-display font-semibold text-white block">{m.value}</span>
                      <span className="text-[11px] text-[#9d98bb] block font-medium">{m.label}</span>
                      <span className="text-[10px] text-[#615c82] block">{m.detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-[#9d98bb]">
                  <span>— <strong>{study.author}</strong>, {study.role}</span>
                  <span className="text-[#c9bbff] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read story →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-[#8b5cf6]/20 via-[#131228] to-[#5b3df0]/20 border border-[#8b5cf6]/30 rounded-[24px] p-10 text-center space-y-4">
            <h2 className="font-display text-3xl font-semibold text-white">Join 12,000+ teams automating operations</h2>
            <p className="text-[#9d98bb] text-sm max-w-md mx-auto">Set up your first Nimbus agent in under 10 minutes. Free 14-day trial.</p>
            <Link href="/signup">
              <button className="btn btn-primary btn-lg mt-2">Get Started Free</button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
