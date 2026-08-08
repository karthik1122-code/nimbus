"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SecondaryButton({
  children,
  icon,
  iconPosition = "right",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs rounded-lg gap-1.5",
    md: "px-6 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-8 py-3.5 text-base rounded-xl gap-2.5 font-medium",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "btn-secondary-glass inline-flex items-center justify-center tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </motion.button>
  );
}
