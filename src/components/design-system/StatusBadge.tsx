import React from "react";
import { cn } from "@/lib/utils";

export type StatusType =
  | "in-queue"
  | "processed"
  | "paid"
  | "failed"
  | "active"
  | "pending"
  | "draft"
  | "validated"
  | "updated"
  | "format";

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/\s+/g, "-");

  const badgeStyles: Record<string, string> = {
    "in-queue": "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]",
    pending: "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]",
    processed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
    active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
    paid: "bg-purple-500/15 text-purple-200 border-purple-500/35 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    validated: "bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.15)]",
    updated: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
    format: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    failed: "bg-rose-500/10 text-rose-300 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]",
    draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  const style = badgeStyles[normalized] || "bg-purple-500/10 text-purple-300 border-purple-500/20";
  const displayLabel = label || status;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border backdrop-blur-sm transition-all duration-200",
        style,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {displayLabel}
    </span>
  );
}
