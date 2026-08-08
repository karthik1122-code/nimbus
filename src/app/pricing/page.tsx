"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Sparkles, HelpCircle, ChevronDown, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const plans = [
  {
    name: "Starter",
    badge: "Indie & Small Teams",
    desc: "For startups automating their first 1,000 tasks per month.",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Up to 2 autonomous agents",
      "1,000 tasks included / mo",
      "Standard response speed (2m)",
      "Zendesk & HubSpot connectors",
      "Email & Discord community support",
      "7-day activity log history",
    ],
    ctaText: "Get Started Free",
    popular: false,
  },
  {
    name: "Growth Pro",
    badge: "Most Popular",
    desc: "For scaling teams needing high-throughput agent workflows.",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "Up to 10 autonomous agents",
      "10,000 tasks included / mo",
      "Fast 140ms execution speed",
      "All 100+ native connectors",
      "Priority Slack & email support",
      "90-day activity log history",
      "Custom escalation workflows",
      "Advanced AI anomaly detection",
    ],
    ctaText: "Start 14-Day Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    badge: "Dedicated Capacity",
    desc: "Dedicated SLA, custom fine-tuned model weights, and SOC 2 compliance.",
    monthlyPrice: 199,
    annualPrice: 159,
    features: [
      "Unlimited autonomous agents",
      "Unlimited tasks / mo",
      "Sub-50ms execution SLA",
      "SOC 2 Type II & HIPAA compliance",
      "Dedicated 24/7 account manager",
      "Unlimited log history & backup",
      "Custom fine-tuned agent LLMs",
      "SAML SSO & Audit Logs",
    ],
    ctaText: "Talk to Sales",
    popular: false,
  },
];

const faqs = [
  {
    q: "What counts as a task?",
    a: "A task is an individual execution performed by a Nimbus agent — such as enriching a lead, resolving a support ticket, or parsing an invoice PDF.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes! You can switch plans or change from monthly to annual billing at any time from your Dashboard settings.",
  },
  {
    q: "Is there a free trial for the Growth Pro plan?",
    a: "Yes, Growth Pro comes with a 14-day full-feature free trial. No credit card is required to sign up.",
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#060512] text-[#f3f1fb] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#c9bbff] block">
              Transparent Pricing
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Simple pricing. <em className="hero-title-serif font-normal text-[#c9bbff]">Unlimited potential.</em>
            </h1>
            <p className="text-[#9d98bb] text-base leading-relaxed max-w-lg mx-auto">
              Start free, scale as your automation needs grow. No hidden fees or surprise overages.
            </p>

            {/* Toggle */}
            <div className="pt-4 flex items-center justify-center gap-4">
              <span className={`text-sm font-medium ${!annual ? "text-white" : "text-[#9d98bb]"}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className="relative w-12 h-6.5 rounded-full bg-[#131228] border border-white/10 p-0.5 transition-all"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  className={`w-5.5 h-5.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#c9bbff] shadow-md ${
                    annual ? "translate-x-5.5" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${annual ? "text-white" : "text-[#9d98bb]"}`}>Annual</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f0b357]/15 border border-[#f0b357]/30 text-[#f0b357]">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((p, idx) => {
              const price = annual ? p.annualPrice : p.monthlyPrice;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative bg-[#0d0c1e] rounded-[24px] p-8 flex flex-col justify-between space-y-6 transition-all duration-300 ${
                    p.popular
                      ? "border-2 border-[#8b5cf6] shadow-[0_0_50px_rgba(139,92,246,0.3)] bg-gradient-to-b from-[#131228] to-[#0d0c1e]"
                      : "border border-white/9 hover:border-white/20"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] text-white shadow-lg uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                      <span className="text-[11px] font-mono text-[#615c82] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/8">{p.badge}</span>
                    </div>

                    <p className="text-xs text-[#9d98bb] leading-relaxed min-h-[36px]">{p.desc}</p>

                    <div className="pt-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-display font-bold text-white tracking-tight">${price}</span>
                        <span className="text-xs text-[#9d98bb]">/month</span>
                      </div>
                      {annual && price > 0 && (
                        <span className="text-[11px] text-[#615c82] font-mono block mt-1">Billed annually (${price * 12}/yr)</span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/6 space-y-2.5">
                      <p className="text-[11px] uppercase tracking-wider text-[#615c82] font-mono font-semibold">Included Features</p>
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-[#4ade80] flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={p.name === "Enterprise" ? "/contact" : "/signup"} className="block pt-4">
                    <button
                      className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                        p.popular
                          ? "bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] text-white shadow-md hover:shadow-lg hover:scale-[1.01]"
                          : "bg-[#131228] text-white border border-white/10 hover:bg-white/5"
                      }`}
                    >
                      {p.ctaText}
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-white/6">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#c9bbff]">Pricing Details</span>
              <h2 className="font-display text-3xl font-semibold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-[#0d0c1e] border border-white/8 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-white text-base hover:text-[#c9bbff] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#c9bbff] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 text-sm text-[#9d98bb] leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
