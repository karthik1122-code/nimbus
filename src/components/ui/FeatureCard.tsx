"use client";

import React from "react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  href?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  tag,
  href,
  className = "",
}: FeatureCardProps) {
  return (
    <GlassCard
      variant="glow"
      className={cn(
        "flex flex-col justify-between group cursor-pointer border-white/10 hover:border-purple-500/40 p-6 transition-all duration-300",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.25)] text-purple-300">
            {icon}
          </div>

          {tag && (
            <span className="text-[11px] font-semibold tracking-wider text-purple-300 uppercase px-3 py-1 rounded-full glass-pill border border-purple-500/30">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors flex items-center gap-2">
          <span>{title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
        </h3>

        <p className="text-xs text-slate-400 font-normal leading-relaxed">{description}</p>
      </div>
    </GlassCard>
  );
}
