import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  titleSans: string;
  titleSerifItalic?: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
  className?: string;
}

export function SectionHeader({
  badge,
  titleSans,
  titleSerifItalic,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignStyles = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col gap-4 max-w-3xl mx-auto", alignStyles[align], className)}>
      {badge && (
        <span className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-purple-300 uppercase border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          {badge}
        </span>
      )}

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
        <span>{titleSans}</span>{" "}
        {titleSerifItalic && (
          <span className="font-serif italic font-normal text-gradient-purple-glow drop-shadow-[0_0_25px_rgba(168,85,247,0.3)] block mt-1">
            {titleSerifItalic}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-base md:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
