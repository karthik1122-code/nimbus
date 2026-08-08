"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for indie makers and small teams.",
    monthlyPrice: 0,
    annualPrice: 0,
    color: "border-white/10",
    ctaText: "Get started free",
    ctaHref: "/dashboard",
    popular: false,
    features: [
      "5 data connectors",
      "100K events/month",
      "AI insights (10/day)",
      "CSV & JSON export",
      "7-day data history",
      "Community support",
    ],
  },
  {
    name: "Pro",
    desc: "For fast-growing teams that need power.",
    monthlyPrice: 49,
    annualPrice: 39,
    color: "border-purple-500/40",
    ctaText: "Start free trial",
    ctaHref: "/dashboard",
    popular: true,
    features: [
      "50 data connectors",
      "10M events/month",
      "Unlimited AI insights",
      "All export formats",
      "90-day data history",
      "Priority email support",
      "Anomaly alerts",
      "Custom dashboards",
    ],
  },
  {
    name: "Enterprise",
    desc: "Dedicated infra and compliance for scale.",
    monthlyPrice: 199,
    annualPrice: 159,
    color: "border-white/10",
    ctaText: "Talk to sales",
    ctaHref: "#footer",
    popular: false,
    features: [
      "Unlimited connectors",
      "Unlimited events",
      "Unlimited AI insights",
      "SOC 2 & HIPAA ready",
      "Unlimited history",
      "24/7 dedicated support",
      "Custom ML models",
      "SLA guarantee",
      "SSO & SAML",
    ],
  },
];

export function PricingPreview() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12 space-y-4"
      >
        <div className="section-badge mx-auto w-fit">
          <Zap className="w-3 h-3" />
          Pricing
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Start free,
          <span className="hero-title-serif text-gradient-purple"> scale effortlessly.</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          No surprise charges. Upgrade anytime. Downgrade or cancel whenever you want.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-white" : "text-slate-500"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-12 h-6 rounded-full bg-white/10 border border-white/15 transition-all"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)] ${
                annual ? "left-6" : "left-0.5"
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium transition-colors ${annual ? "text-white" : "text-slate-500"}`}>Annual</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300">
              Save 20%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.1 }}
            className={`relative flex flex-col p-7 rounded-2xl border bg-[#0D0A18]/80 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 ${plan.color} ${
              plan.popular ? "shadow-[0_0_50px_rgba(139,92,246,0.25)] ring-1 ring-purple-500/30" : ""
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{plan.desc}</p>
            </div>

            {/* Price */}
            <div className="mb-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? "annual" : "monthly"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-baseline gap-1"
                >
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">/mo</span>
                </motion.div>
              </AnimatePresence>
              {annual && plan.monthlyPrice > 0 && (
                <p className="text-[10px] text-slate-500 mt-1 font-mono">
                  Billed annually · ${(annual ? plan.annualPrice : plan.monthlyPrice) * 12}/yr
                </p>
              )}
            </div>

            {/* CTA */}
            <Link href={plan.ctaHref} className="block mb-7">
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    : "bg-white/7 border border-white/10 text-slate-300 hover:bg-white/12 hover:text-white"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {plan.ctaText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Link>

            {/* Features */}
            <div className="space-y-2.5 pt-5 border-t border-white/6">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? "bg-purple-500/20 text-purple-400" : "bg-white/5 text-slate-400"}`}>
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-xs text-slate-400">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
