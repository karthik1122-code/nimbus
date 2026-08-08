import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "busy";
  className?: string;
}

export function Avatar({ src, name = "IA", size = "md", status, className = "" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "w-7 h-7 text-[10px]",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
    xl: "w-14 h-14 text-base",
  };

  const statusColor = {
    online: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    offline: "bg-slate-500",
    busy: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.4)] shrink-0 overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="w-full h-full rounded-full bg-[#120D26] flex items-center justify-center font-bold text-purple-300">
            {initials}
          </div>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#090614]",
            statusColor[status]
          )}
        />
      )}
    </div>
  );
}
