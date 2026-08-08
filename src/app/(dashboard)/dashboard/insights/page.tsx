"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, Bot, TrendingUp, AlertTriangle, Lightbulb,
  ArrowRight, CheckCircle2, BarChart3, Loader2, RefreshCw,
  Bookmark, Share2, ThumbsUp, Copy, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  metrics?: { label: string; value: string; positive: boolean }[];
  recommendation?: string;
}

const savedInsights = [
  { id: "1", question: "Why did revenue increase?", badge: "Growth", badgeColor: "emerald" },
  { id: "2", question: "Which users are at churn risk?", badge: "Warning", badgeColor: "amber" },
  { id: "3", question: "Top performing campaigns?", badge: "Opportunity", badgeColor: "purple" },
  { id: "4", question: "Predict Q4 revenue", badge: "Forecast", badgeColor: "blue" },
];

const suggestedQueries = [
  "Why did revenue increase this month?",
  "Which user cohort has the highest LTV?",
  "What's causing high churn in the Enterprise tier?",
  "Forecast Q4 revenue based on current trends.",
  "Which marketing channels drive the most qualified leads?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-purple-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

export default function AIInsightsPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Hello, Alex! I'm your InsightAI Copilot. I've analyzed your connected datasets and I'm ready to answer questions about your business. What would you like to know?",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const mockResponses: Record<string, Omit<Message, "id" | "role">> = {
    default: {
      content: "Based on your dataset analysis, I've identified several key patterns. Revenue grew 18.4% this month, driven primarily by returning users (+23%) and Enterprise tier upgrades (+$12,450 MRR). The sub-140ms checkout latency improvement had a measurable impact on conversion rates.",
      metrics: [
        { label: "Revenue growth", value: "+18.4%", positive: true },
        { label: "Returning users", value: "+23.0%", positive: true },
        { label: "New MRR", value: "+$12,450", positive: true },
      ],
      recommendation: "Trigger an automated re-engagement campaign targeting 3,420 dormant leads with high conversion probability (42%).",
    },
    churn: {
      content: "I've identified 847 Enterprise accounts showing early churn signals. Key indicators include: reduced API call frequency (–38%), decreased team member activity, and no feature adoption in the last 14 days.",
      metrics: [
        { label: "At-risk accounts", value: "847", positive: false },
        { label: "Avg health score", value: "34/100", positive: false },
        { label: "Revenue at risk", value: "$84,700", positive: false },
      ],
      recommendation: "Schedule automated CS outreach for the top 200 at-risk accounts. Estimated recovery rate: 64% based on similar cohorts.",
    },
    ltv: {
      content: "The highest LTV cohort is Enterprise users acquired via Partner API channels. They show 3.2x higher LTV ($12,400 avg) compared to Organic Search users, with 89% 12-month retention.",
      metrics: [
        { label: "Avg LTV (Partner)", value: "$12,400", positive: true },
        { label: "12-month retention", value: "89%", positive: true },
        { label: "LTV multiplier", value: "3.2x", positive: true },
      ],
      recommendation: "Increase Partner API channel investment by 40%. Expected ROI: 280% over 12 months based on LTV data.",
    },
  };

  const getResponse = (q: string): Omit<Message, "id" | "role"> => {
    if (q.toLowerCase().includes("churn")) return mockResponses.churn;
    if (q.toLowerCase().includes("ltv") || q.toLowerCase().includes("lifetime")) return mockResponses.ltv;
    return mockResponses.default;
  };

  const sendMessage = async (text?: string) => {
    const q = text ?? input.trim();
    if (!q || isThinking) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    await new Promise((r) => setTimeout(r, 1800 + Math.random() * 1000));
    setIsThinking(false);
    const resp = getResponse(q);
    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", ...resp }]);
  };

  return (
    <div className="flex gap-5 h-[calc(100vh-120px)] pb-4">
      {/* LEFT: Saved Insights Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-64 flex-shrink-0 flex flex-col gap-4"
      >
        <div className="p-4 rounded-2xl bg-[#0D0A18]/80 border border-white/7 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white">Saved Insights</h3>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {savedInsights.map((s) => (
              <button
                key={s.id}
                onClick={() => sendMessage(s.question)}
                className="text-left p-3 rounded-xl bg-white/3 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group"
              >
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 inline-block ${
                  s.badgeColor === "emerald" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" :
                  s.badgeColor === "amber" ? "bg-amber-500/10 text-amber-300 border-amber-500/20" :
                  s.badgeColor === "blue" ? "bg-blue-500/10 text-blue-300 border-blue-500/20" :
                  "bg-purple-500/10 text-purple-300 border-purple-500/20"
                }`}>{s.badge}</span>
                <p className="text-xs text-slate-400 group-hover:text-white transition-colors leading-relaxed">{s.question}</p>
              </button>
            ))}
          </div>

          {/* Model selector */}
          <div className="pt-3 mt-3 border-t border-white/6">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-2">Model</p>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-500/8 border border-purple-500/15">
              <Zap className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] font-semibold text-purple-300">GPT-4o Turbo</span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 px-1"
        >
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Insights</h1>
            <p className="text-xs text-slate-400 mt-0.5">Connected to 4 live data streams · 98.4% confidence</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Analysis Active
            </span>
            <button className="p-2 rounded-xl bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-start gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl rounded-tl-none bg-[#0D0A18]/90 border border-purple-500/20">
                        <p className="text-sm text-slate-200 leading-relaxed">{msg.content}</p>

                        {/* Metrics */}
                        {msg.metrics && (
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            {msg.metrics.map((m, i) => (
                              <div key={i} className="p-2.5 rounded-xl bg-white/4 border border-white/6 text-center">
                                <span className={`text-sm font-extrabold block ${m.positive ? "text-emerald-400" : "text-rose-400"}`}>{m.value}</span>
                                <span className="text-[9px] text-slate-500 mt-0.5 block">{m.label}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Recommendation */}
                        {msg.recommendation && (
                          <div className="mt-4 p-3 rounded-xl bg-purple-500/8 border border-purple-500/20">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Recommended Action</p>
                            <p className="text-xs text-slate-300 leading-relaxed">{msg.recommendation}</p>
                          </div>
                        )}
                      </div>

                      {/* Action row */}
                      <div className="flex items-center gap-2 pl-1">
                        <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-white transition-colors">
                          <ThumbsUp className="w-3 h-3" /> Helpful
                        </button>
                        <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-white transition-colors">
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                        <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-white transition-colors">
                          <Bookmark className="w-3 h-3" /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {msg.role === "user" && (
                  <div className="max-w-[70%] px-4 py-3 rounded-2xl rounded-tr-none bg-gradient-to-br from-purple-600 to-violet-600 text-white text-sm shadow-[0_0_20px_rgba(124,58,237,0.35)]">
                    {msg.content}
                  </div>
                )}
              </motion.div>
            ))}

            {isThinking && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#0D0A18]/90 border border-purple-500/20">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggested queries */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 flex flex-wrap gap-2"
          >
            {suggestedQueries.slice(0, 3).map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="px-3 py-1.5 text-[10px] font-medium rounded-lg bg-white/4 border border-white/8 text-slate-400 hover:text-white hover:border-purple-500/30 transition-all"
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask anything about your data..."
              rows={1}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0D0A18]/80 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 resize-none transition-all"
            />
            <span className="absolute right-3 bottom-3 text-[9px] text-slate-600 font-mono">⏎</span>
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isThinking}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center text-white hover:from-purple-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-[0_0_15px_rgba(124,58,237,0.4)]"
          >
            {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
