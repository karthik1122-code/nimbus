"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Activity, FileText, Zap, ArrowUpRight } from "lucide-react";

/* Animated number counter on scroll into view */
function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const animated = useRef(false);

  useEffect(() => {
    const num = parseFloat(target.replace(/[^\d.]/g, ""));
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        let start = 0;
        const steps = 60;
        const inc = num / steps;
        let i = 0;
        const timer = setInterval(() => {
          i++;
          start += inc;
          if (i >= steps) {
            setDisplayed(target);
            clearInterval(timer);
          } else {
            const hasDecimal = target.includes(".");
            setDisplayed((hasDecimal ? start.toFixed(1) : Math.floor(start).toLocaleString()) + suffix);
          }
        }, 18);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{displayed}</span>;
}

const capabilities = [
  {
    icon: <Sparkles className="w-6 h-6 text-purple-300" />,
    title: "AI-Powered Insights",
    subtitle: "Ask questions, get answers instantly.",
    description: "Query complex multi-channel data streams in natural language. InsightAI automatically correlates anomalies and surfaces growth drivers.",
    tag: "Conversational BI",
    span: "lg:col-span-7",
    stat: "1.4B+",
    statLabel: "logs analyzed/month",
    highlight: true,
  },
  {
    icon: <Activity className="w-6 h-6 text-indigo-300" />,
    title: "Real-Time Analytics",
    subtitle: "See changes before they become problems.",
    description: "Sub-second event stream monitoring with instant automated anomaly detection and instant alert routing.",
    tag: "140ms Telemetry",
    span: "lg:col-span-5",
    stat: "99.9%",
    statLabel: "uptime guarantee",
    highlight: false,
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-300" />,
    title: "Automated Reports",
    subtitle: "Analysis becomes polished briefs — automatically.",
    description: "Schedule daily, weekly, or monthly executive briefs exported directly to PDF, CSV, or Slack.",
    tag: "Auto Executive Briefs",
    span: "lg:col-span-5",
    stat: "8 min",
    statLabel: "avg time to first insight",
    highlight: false,
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-300" />,
    title: "Smart Recommendations",
    subtitle: "Move from numbers to clear next actions.",
    description: "Beyond raw charts — receive prioritized operational next steps backed by probability metrics and causal inference.",
    tag: "Decision Engine",
    span: "lg:col-span-7",
    stat: "128",
    statLabel: "insights per workspace/month",
    highlight: true,
  },
];

export function CoreCapabilities() {
  return (
    <section id="capabilities" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-16 space-y-4"
      >
        <div className="section-badge">
          <Sparkles className="w-3 h-3" />
          Core Capabilities
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Built for clarity.
          <br />
          <span className="hero-title-serif text-gradient-purple">Designed for decisions.</span>
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
          Transform how your organization interacts with complex data feeds. Move from raw numbers to clear next actions.
        </p>
      </motion.div>

      {/* Capabilities grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {capabilities.map((cap, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cap.span}
          >
            <div
              className={`h-full flex flex-col justify-between p-8 rounded-2xl border transition-all duration-400 group cursor-pointer hover:-translate-y-1 ${
                cap.highlight
                  ? "bg-gradient-to-br from-purple-900/40 via-[#0D0A18] to-violet-900/20 border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(139,92,246,0.2)]"
                  : "bg-[#0D0A18]/80 border-white/7 hover:border-purple-500/25 hover:shadow-[0_10px_40px_rgba(139,92,246,0.1)]"
              }`}
            >
              {/* Top row */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform ${
                    cap.highlight
                      ? "bg-purple-600/20 border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                      : "bg-white/5 border-white/10"
                  }`}>
                    {cap.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {cap.tag}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-purple-400 transition-all" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm font-semibold text-purple-300/80 mb-3">{cap.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{cap.description}</p>
              </div>

              {/* Bottom stat */}
              <div className="mt-8 pt-5 border-t border-white/6 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    <CountUp target={cap.stat} />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{cap.statLabel}</div>
                </div>
                {/* Shimmer strip */}
                <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-400 opacity-50 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
