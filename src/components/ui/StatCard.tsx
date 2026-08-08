"use client";

import React from "react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow" | "active";
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  positive = true,
  description,
  icon,
  variant = "default",
  className = "",
}: StatCardProps) {
  return (
    <GlassCard variant={variant} className={cn("flex flex-col justify-between p-6", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-400">{title}</span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">{value}</span>
          {change && (
            <span
              className={cn(
                "text-[11px] font-bold px-2 py-0.5 rounded-full border",
                positive
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]"
              )}
            >
              {change}
            </span>
          )}
        </div>

        {description && <p className="text-[11px] text-slate-400 mt-1.5">{description}</p>}
      </div>
    </GlassCard>
  );
}
