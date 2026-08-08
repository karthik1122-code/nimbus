import React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glow" | "active" | "bordered";
  className?: string;
}

export function GlassCard({
  children,
  variant = "default",
  className = "",
  ...props
}: GlassCardProps) {
  const variantStyles = {
    default: "bg-[#0D0C10] border border-white/10",
    bordered: "bg-[#0D0C10]/80 backdrop-blur-md border border-white/10",
    glow: "bg-[#0D0C10] border border-white/15",
    active: "bg-[#131218] border border-indigo-500/40",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
