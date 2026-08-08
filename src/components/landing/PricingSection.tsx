"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { PrimaryButton } from "@/components/design-system/PrimaryButton";
import { SecondaryButton } from "@/components/design-system/SecondaryButton";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter Agent",
      price: annual ? "$29" : "$35",
      period: "/month",
      description: "Ideal for early-stage startups automating key lead generation tasks.",
      features: [
        "Up to 5 Autonomous Agents",
        "50,000 Monthly Log Executions",
        "CRM & Webhook Integrations",
        "Standard Response Velocity (350ms)",
        "Community Support",
      ],
      popular: false,
      ctaText: "Start Free Trial",
    },
    {
      name: "Pro Orchestrator",
      price: annual ? "$79" : "$95",
      period: "/month",
      description: "For growing teams that need real-time data entry & AI support bots.",
      features: [
        "Up to 25 Autonomous Agents",
        "500,000 Monthly Log Executions",
        "Multi-Agent Workflow Chains",
        "Ultra-fast Velocity (140ms)",
        "24/7 Priority Agent Mentors",
        "Custom Anomaly Alerts",
      ],
      popular: true,
      ctaText: "Get Started Pro",
    },
    {
      name: "Enterprise Scale",
      price: annual ? "$249" : "$299",
      period: "/month",
      description: "Dedicated infrastructure, custom LLM fine-tuning, and SLA guarantees.",
      features: [
        "Unlimited Autonomous Agents",
        "5,000,000+ Monthly Executions",
        "Custom Model Fine-tuning",
        "Dedicated VPC Infrastructure",
        "Dedicated Account Engineer",
        "Custom Compliance & Auditing",
      ],
      popular: false,
      ctaText: "Contact Enterprise",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeader
        badge="Flexible Investment"
        titleSans="Simple pricing."
        titleSerifItalic="Unmatched ROI."
        subtitle="Choose the tier that matches your team's automation throughput."
      />

      {/* Monthly / Annual Billing Switch */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <span className={`text-sm font-medium ${!annual ? "text-white" : "text-slate-400"}`}>
          Monthly Billing
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className="w-14 h-8 rounded-full bg-[#16102E] border border-purple-500/30 p-1 flex items-center transition-colors cursor-pointer"
        >
          <div
            className={`w-6 h-6 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transform transition-transform ${
              annual ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-sm font-medium flex items-center gap-2 ${annual ? "text-white" : "text-slate-400"}`}>
          <span>Annual Billing</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
            SAVE 20%
          </span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <GlassCard
            key={idx}
            variant={plan.popular ? "active" : "default"}
            className={`flex flex-col justify-between relative ${
              plan.popular ? "lg:-translate-y-4 shadow-[0_0_50px_rgba(124,58,237,0.3)] border-purple-500/50" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 px-4 py-1 rounded-bl-xl text-[11px] font-bold uppercase tracking-wider text-white flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                <span className="text-sm font-medium text-slate-400">{plan.period}</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link href="/dashboard" className="block">
                {plan.popular ? (
                  <PrimaryButton className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                    {plan.ctaText}
                  </PrimaryButton>
                ) : (
                  <SecondaryButton className="w-full">
                    {plan.ctaText}
                  </SecondaryButton>
                )}
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
