"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, MessageSquare, FileSpreadsheet, ArrowRight, Zap } from "lucide-react";

const services = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#c9bbff]" />,
    title: "Lead generation",
    description: "Agents research prospects, enrich contact records, and score fit against your ICP before a single email goes out.",
    tag: "avg. 340 qualified leads / mo",
    href: "/services#lead-gen",
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-[#c9bbff]" />,
    title: "Customer support",
    description: "First-response agents resolve tickets against your docs and macros, and escalate with full context when they can't.",
    tag: "92% first-contact resolution",
    href: "/services#customer-support",
  },
  {
    icon: <FileSpreadsheet className="w-5 h-5 text-[#c9bbff]" />,
    title: "Data entry",
    description: "Invoices, forms, and CRM updates get parsed, validated, and reconciled without a spreadsheet in sight.",
    tag: "14,200 records processed / mo",
    href: "/services#data-entry",
  },
];

export function ProductShowcase() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="services">
      {/* Section Head */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center mb-16 space-y-4"
      >
        <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-[#c9bbff] block">
          What agents do
        </span>
        <h2 className="font-display font-semibold text-[clamp(30px,4vw,42px)] leading-[1.15] text-white tracking-tight">
          Three jobs your team stops{" "}
          <em className="hero-title-serif font-normal text-[#c9bbff]">doing by hand.</em>
        </h2>
        <p className="text-[#9d98bb] text-base leading-relaxed">
          Every Nimbus agent runs on your data, follows your playbook, and hands off to a human the moment it&apos;s unsure.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={s.href} className="block h-full">
              <div className="h-full bg-[#0d0c1e] border border-white/9 rounded-[22px] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b5cf6]/40 hover:bg-[#131228] group flex flex-col justify-between">
                <div>
                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#5b3df0]/10 border border-[#8b5cf6]/25 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>

                  <h3 className="font-display text-lg font-semibold text-white mb-2.5 group-hover:text-[#c9bbff] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-[#9d98bb] text-[14.5px] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11.5px] text-[#615c82]">
                  <span>{s.tag}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#c9bbff]" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Dedicated Services CTA */}
      <div className="mt-12 text-center">
        <Link href="/services">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#c9bbff] bg-[#131228] border border-white/10 hover:border-[#8b5cf6]/30 hover:bg-[#0d0c1e] transition-all">
            <Zap className="w-3.5 h-3.5 text-[#8b5cf6]" />
            Explore Detailed Agent Workflows & Interactive ROI Calculator →
          </button>
        </Link>
      </div>
    </section>
  );
}
