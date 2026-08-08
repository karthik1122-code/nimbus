"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  ariaLabel: string;
  className?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "glass",
      size = "md",
      isLoading = false,
      isDisabled = false,
      ariaLabel,
      className = "",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]",
      secondary: "bg-[#181330] hover:bg-[#251e44] text-slate-200 border border-white/10",
      ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
      glass: "glass-pill text-slate-300 hover:text-white hover:bg-white/10 border border-white/10",
    };

    const sizeStyles = {
      sm: "w-8 h-8 rounded-lg text-xs",
      md: "w-10 h-10 rounded-xl text-sm",
      lg: "w-12 h-12 rounded-xl text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!isDisabled && !isLoading ? { scale: 1.05 } : undefined}
        whileTap={!isDisabled && !isLoading ? { scale: 0.95 } : undefined}
        disabled={isDisabled || isLoading}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";
