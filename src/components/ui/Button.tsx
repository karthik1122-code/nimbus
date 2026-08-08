"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      isDisabled = false,
      icon,
      leftIcon,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const effectiveLeftIcon = leftIcon || icon;

    const baseStyles =
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none rounded-xl";

    const variantStyles = {
      primary:
        "bg-white text-zinc-950 hover:bg-zinc-200 active:bg-zinc-300 font-bold",
      secondary:
        "bg-zinc-900 text-zinc-100 border border-white/10 hover:bg-zinc-800 hover:border-white/20 active:bg-zinc-950",
      outline:
        "bg-transparent text-zinc-200 border border-white/15 hover:bg-white/5 active:bg-white/10",
      ghost:
        "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/5 active:bg-white/10",
      danger:
        "bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700",
    };

    const sizeStyles = {
      sm: "px-3.5 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2.5 text-xs md:text-sm gap-2",
      lg: "px-6 py-3 text-sm md:text-base gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        disabled={isDisabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          effectiveLeftIcon && <span className="inline-flex shrink-0">{effectiveLeftIcon}</span>
        )}

        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
