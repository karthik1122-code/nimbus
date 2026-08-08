"use client";

import React from "react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { cn } from "@/lib/utils";

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  subtitle,
  action,
  children,
  className = "",
}: ChartContainerProps) {
  return (
    <GlassCard variant="default" className={cn("p-6 flex flex-col gap-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="w-full relative">{children}</div>
    </GlassCard>
  );
}
