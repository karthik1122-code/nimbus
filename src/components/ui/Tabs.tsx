"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "pill" | "line";
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, variant = "pill", className = "" }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 p-1 rounded-xl glass-pill border border-white/10 relative",
        variant === "line" && "bg-transparent border-none p-0 gap-6 border-b border-white/10 rounded-none",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "relative px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 select-none",
              tab.disabled && "opacity-40 cursor-not-allowed",
              isActive ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"
            )}
          >
            {isActive && variant === "pill" && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-purple-600 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)] z-0"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {isActive && variant === "line" && (
              <motion.div
                layoutId="activeTabLine"
                className="absolute -bottom-px inset-x-0 h-0.5 bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] z-10"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            <span className="relative z-10">{tab.label}</span>

            {tab.badge !== undefined && (
              <span
                className={cn(
                  "relative z-10 px-1.5 py-0.2 text-[10px] rounded-full font-mono font-bold",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
