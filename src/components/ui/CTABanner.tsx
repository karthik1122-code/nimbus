"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { Button } from "@/components/ui/Button";

export interface CTABannerProps {
  badge?: string;
  titleSans: string;
  titleSerifItalic?: string;
  subtitle?: string;
  primaryCtaText?: string;
  onPrimaryClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryClick?: () => void;
  className?: string;
}

export function CTABanner({
  badge = "Ready to Transform Your Workflow?",
  titleSans = "Deploy autonomous agents.",
  titleSerifItalic = "Scale without limits.",
  subtitle = "Join hundreds of engineering teams using InsightAI to eliminate operational overhead today.",
  primaryCtaText = "Start 14-Day Free Trial",
  onPrimaryClick,
  secondaryCtaText = "Schedule Live Demo",
  onSecondaryClick,
  className = "",
}: CTABannerProps) {
  return (
    <GlassCard
      variant="active"
      className={`relative overflow-hidden p-10 md:p-14 text-center border-purple-500/40 shadow-[0_0_60px_rgba(124,58,237,0.35)] ${className}`}
    >
      {/* Background Glow Sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/20 blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        {badge && (
          <span className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-purple-300 border border-purple-500/30">
            {badge}
          </span>
        )}

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          <span>{titleSans}</span>{" "}
          {titleSerifItalic && (
            <span className="font-serif italic text-gradient-purple-glow font-normal block sm:inline mt-1">
              {titleSerifItalic}
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={onPrimaryClick}>
            {primaryCtaText}
          </Button>
          <Button variant="secondary" size="lg" leftIcon={<Play className="w-4 h-4 text-purple-400" />} onClick={onSecondaryClick}>
            {secondaryCtaText}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 mt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Instant setup in under 5 mins</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>50,000 free monthly execution logs</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
