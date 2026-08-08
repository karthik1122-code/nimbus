"use client";

import { motion } from "framer-motion";

interface CosmicOrbProps {
  showRing?: boolean;
  intensity?: "normal" | "high" | "subtle";
  className?: string;
}

export function CosmicOrb({ showRing = true, intensity = "normal", className = "" }: CosmicOrbProps) {
  const opacityMap = {
    subtle: "opacity-40",
    normal: "opacity-80",
    high: "opacity-100",
  };

  return (
    <div className={`absolute inset-x-0 top-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Background Star Dots Grid */}
      <div className="absolute inset-0 bg-stars-pattern opacity-40 h-[900px]" />

      {/* Radial Gradient Violet Sphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`cosmic-orb ${opacityMap[intensity]}`}
      />

      {/* Floating Outer Ambient Glow Layer */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[1100px] h-[650px] bg-purple-600/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Glowing Orbital Sphere Ring */}
      {showRing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
          className="cosmic-orb-ring"
        />
      )}
    </div>
  );
}
