"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

/* Floating particles */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-purple-500/30 blur-sm pointer-events-none"
      style={style}
    />
  );
}

const particles = [
  { width: 6, height: 6, top: "15%", left: "8%", animationDelay: "0s", animationDuration: "7s" },
  { width: 4, height: 4, top: "25%", left: "85%", animationDelay: "1s", animationDuration: "9s" },
  { width: 8, height: 8, top: "60%", left: "12%", animationDelay: "2s", animationDuration: "6s" },
  { width: 5, height: 5, top: "70%", left: "80%", animationDelay: "0.5s", animationDuration: "8s" },
  { width: 3, height: 3, top: "40%", left: "70%", animationDelay: "1.5s", animationDuration: "10s" },
  { width: 7, height: 7, top: "80%", left: "40%", animationDelay: "3s", animationDuration: "7s" },
  { width: 4, height: 4, top: "10%", left: "50%", animationDelay: "2.5s", animationDuration: "8s" },
];

export function FinalCTA() {
  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)"
        }} />
        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle
            key={i}
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
              animation: `particle-float ${p.animationDuration} ease-in-out infinite`,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-12 sm:p-16 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-[#0D0A18]/80 to-violet-950/30 backdrop-blur-xl shadow-[0_0_100px_rgba(124,58,237,0.2)]"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300">
              Join 12,000+ teams
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4"
          >
            Ready to
            <br />
            <span className="hero-title-serif text-gradient-purple">automate everything?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto mb-10"
          >
            Start your 14-day free trial today. No credit card required.
            Connect your data and get your first AI insight in under 8 minutes.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <button className="relative group px-8 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 group-hover:from-purple-500 group-hover:to-violet-500 transition-all" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-400/20 to-violet-400/20 blur-xl" />
                <span className="relative flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </Link>

            <button className="px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-300 border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25 hover:text-white transition-all duration-300">
              Book a Demo
            </button>
          </motion.div>

          {/* Social proof micro */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 mt-8 text-xs text-slate-600"
          >
            <div className="flex -space-x-2">
              {["SC", "MR", "PS", "JL", "AK"].map((initials, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-violet-600 border-2 border-[#05030A] flex items-center justify-center text-[8px] font-bold text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>Loved by 12,000+ data teams worldwide</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
