"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  Bot,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  BarChart3,
  Loader2,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { Button } from "@/components/ui/Button";

interface QueryResponse {
  question: string;
  answer: string;
  metrics: { label: string; value: string; positive: boolean }[];
  drivers: string[];
  recommendation: string;
}

export default function AIInsightsPage() {
  const [queryInput, setQueryInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [activeResponse, setActiveResponse] = useState<QueryResponse | null>({
    question: "Why did revenue increase this month?",
    answer: "Revenue increased 18.4% compared with the previous month ($48,290 vs $38,690).",
    metrics: [
      { label: "Returning customers", value: "+23.0%", positive: true },
      { label: "Enterprise accounts", value: "+17.0%", positive: true },
      { label: "Average order value", value: "+8.2%", positive: true },
    ],
    drivers: [
      "Sub-140ms execution latency update increased checkout completion.",
      "Enterprise Pro plan upgrades accounted for $12,450 of new MRR.",
      "Retention rate reached a 90-day high at 84%.",
    ],
    recommendation: "Trigger automated email nurture campaign to 3,420 unengaged leads to capture remaining demand.",
  });
  const [showEmptyState, setShowEmptyState] = useState(false);

  const suggestions = [
    "Why did revenue increase this month?",
    "Which customers are driving growth?",
    "What changed compared with last quarter?",
    "Where are we losing conversions?",
  ];

  const trendingInsights = [
    {
      title: "Returning customers are growing faster than new customers.",
      explanation: "Repeat purchases increased 23% this month, representing 67% of total monthly recurring revenue.",
      metric: "+23% Repeat Volume",
      action: "View Cohort Retention",
      type: "trending",
    },
  ];

  const opportunityInsights = [
    {
      title: "Customers in the enterprise segment have 32% higher retention.",
      explanation: "Accounts with over 25 active agents display near-zero churn over a 6-month period.",
      metric: "32% Higher Retention",
      action: "Promote Enterprise Upgrade",
      type: "opportunity",
    },
  ];

  const warningInsights = [
    {
      title: "Conversion dropped 6.4% on mobile traffic.",
      explanation: "Safari iOS 18 users experienced higher load times on the checkout step.",
      metric: "-6.4% Mobile Checkout",
      action: "Inspect Mobile Funnel",
      type: "warning",
    },
  ];

  const handleAskQuestion = (q: string) => {
    setQueryInput(q);
    setIsProcessing(true);
    setProcessingStep("Analyzing your dataset...");

    setTimeout(() => setProcessingStep("Finding patterns across cohorts..."), 600);
    setTimeout(() => setProcessingStep("Generating insights & synthesis..."), 1200);

    setTimeout(() => {
      setIsProcessing(false);
      if (q.includes("Which customers")) {
        setActiveResponse({
          question: q,
          answer: "Growth is driven by Enterprise accounts with 25+ autonomous agents deployed.",
          metrics: [
            { label: "Enterprise MRR", value: "$32,450", positive: true },
            { label: "Account Retention", value: "98.4%", positive: true },
            { label: "Expansion Revenue", value: "+14.2%", positive: true },
          ],
          drivers: [
            "Pro Orchestrator upgrades accounted for 67% of new ARR.",
            "Average lifetime value increased to $4,200 per account.",
          ],
          recommendation: "Assign dedicated solution engineers to top 15 enterprise leads.",
        });
      } else if (q.includes("conversions")) {
        setActiveResponse({
          question: q,
          answer: "Conversion drop is localized to mobile Safari browsers (-6.4%). Desktop conversion remains strong at 9.2%.",
          metrics: [
            { label: "Desktop Conversion", value: "9.20%", positive: true },
            { label: "Mobile Conversion", value: "5.10%", positive: false },
            { label: "Mobile Dropoff", value: "-6.4%", positive: false },
          ],
          drivers: [
            "Mobile viewport rendering latency averaged 380ms vs 110ms on desktop.",
            "Form field auto-fill failed on iOS Safari 18.",
          ],
          recommendation: "Deploy responsive checkout optimization update.",
        });
      } else {
        setActiveResponse({
          question: q,
          answer: "Revenue increased 18.4% compared with the previous month ($48,290 vs $38,690).",
          metrics: [
            { label: "Returning customers", value: "+23.0%", positive: true },
            { label: "Enterprise accounts", value: "+17.0%", positive: true },
            { label: "Average order value", value: "+8.2%", positive: true },
          ],
          drivers: [
            "Sub-140ms execution latency update increased checkout completion.",
            "Enterprise Pro plan upgrades accounted for $12,450 of new MRR.",
          ],
          recommendation: "Trigger automated email nurture campaign to 3,420 unengaged leads.",
        });
      }
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* State Switcher Bar */}
      <div className="flex justify-end items-center gap-2 select-none text-xs">
        <span className="text-slate-400">View Mode:</span>
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="px-3 py-1 rounded-lg glass-pill border border-purple-500/30 text-purple-300 hover:text-white transition-all cursor-pointer"
        >
          {showEmptyState ? "Switch to Insights View" : "Preview Empty State"}
        </button>
      </div>

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-7 h-7 text-purple-400" />
          <span>AI Insights</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Discover what's changing, why it matters, and what to do next.
        </p>
      </div>

      {showEmptyState ? (
        /* EMPTY STATE VIEW */
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto my-12 text-center">
          <GlassCard variant="active" className="p-10 space-y-6 border-purple-500/40 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mx-auto">
              <Lightbulb className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Your first insight is waiting</h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Ask a question about your datasets or upload new log streams to trigger autonomous insight discovery.
              </p>
            </div>
            <Button size="lg" onClick={() => (window.location.href = "/dashboard/data")}>
              Upload a dataset
            </Button>
          </GlassCard>
        </motion.div>
      ) : (
        /* POPULATED AI INSIGHTS WORKSPACE */
        <div className="space-y-8">
          {/* ASK YOUR DATA QUERY INTERFACE */}
          <GlassCard variant="glow" className="p-6 md:p-8 space-y-6 border-purple-500/40 shadow-[0_0_40px_rgba(124,58,237,0.25)]">
            <div className="flex items-center gap-3 pb-2">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ask your data anything</h3>
                <p className="text-xs text-slate-400">Natural language conversational intelligence</p>
              </div>
            </div>

            {/* Query Search Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (queryInput.trim()) handleAskQuestion(queryInput);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask anything about your data..."
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="flex-1 px-4 py-3 text-xs md:text-sm rounded-xl glass-input placeholder:text-slate-500"
              />
              <Button type="submit" size="md" isLoading={isProcessing} icon={<Send className="w-4 h-4" />}>
                Ask
              </Button>
            </form>

            {/* Clickable Suggestion Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Suggested Questions:
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(sug)}
                    className="px-3 py-1.5 rounded-xl glass-pill text-xs font-medium text-purple-300 hover:text-white hover:bg-purple-600/30 transition-all border border-purple-500/20 cursor-pointer flex items-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* AI PROCESSING ANIMATED STATE */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <GlassCard variant="active" className="p-8 text-center space-y-4 border-purple-500/40">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400 mx-auto" />
                  <p className="text-sm font-bold text-white tracking-wide">{processingStep}</p>
                  <div className="w-48 h-1.5 rounded-full bg-white/10 overflow-hidden mx-auto">
                    <div className="h-full bg-purple-500 animate-pulse w-full" />
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI RESPONSE SECTION */}
          {activeResponse && !isProcessing && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard variant="glow" className="p-6 md:p-8 space-y-6 border-purple-500/40">
                {/* Question */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Question Answered
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                    VERIFIED RESULT
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">"{activeResponse.question}"</h3>

                {/* Answer Summary */}
                <div className="p-5 rounded-2xl bg-[#090614] border border-purple-500/30 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>SYNTHESIZED ANSWER</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-semibold">
                    {activeResponse.answer}
                  </p>

                  {/* Metrics Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {activeResponse.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[11px] text-slate-400 block">{m.label}</span>
                        <span className={`text-base font-extrabold ${m.positive ? "text-emerald-400" : "text-rose-400"}`}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Drivers & Recommendation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Drivers Identified</h4>
                    <div className="space-y-2">
                      {activeResponse.drivers.map((d, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 p-4 rounded-xl glass-pill border border-purple-500/30">
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-purple-400" />
                      <span>Recommended Action</span>
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">{activeResponse.recommendation}</p>
                    <div className="pt-2">
                      <Button size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Execute Action
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* INSIGHT CARDS (TRENDING, OPPORTUNITIES, WARNINGS) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Discovered Insight Categories</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* TRENDING */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending</span>
                </span>

                {trendingInsights.map((item, idx) => (
                  <GlassCard key={idx} variant="active" className="p-6 space-y-4 border-purple-500/40">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.explanation}</p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-purple-300 font-mono">{item.metric}</span>
                      <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        {item.action}
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* OPPORTUNITIES */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Opportunities</span>
                </span>

                {opportunityInsights.map((item, idx) => (
                  <GlassCard key={idx} variant="default" className="p-6 space-y-4 border-emerald-500/30">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.explanation}</p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-emerald-400 font-mono">{item.metric}</span>
                      <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        {item.action}
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {/* WARNINGS */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Warnings</span>
                </span>

                {warningInsights.map((item, idx) => (
                  <GlassCard key={idx} variant="default" className="p-6 space-y-4 border-rose-500/30">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.explanation}</p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-rose-400 font-mono">{item.metric}</span>
                      <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        {item.action}
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
