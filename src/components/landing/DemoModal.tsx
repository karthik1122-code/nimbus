"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#060512]/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[720px] bg-[#0d0c1e] border border-white/9 rounded-[18px] p-2 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute -top-3.5 -right-3.5 w-8 h-8 rounded-full bg-[#131228] border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Placeholder Container */}
            <div className="aspect-video rounded-[14px] bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_60%)] bg-[#0a0918] flex flex-col items-center justify-center gap-3 text-center p-6 text-[#c9bbff]">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white bg-white/5">
                <Play className="w-6 h-6 fill-current translate-x-0.5" />
              </div>
              <p className="font-display font-semibold text-lg text-white">2-minute product walkthrough</p>
              <span className="text-xs text-[#615c82]">Nimbus AI agent orchestration demo</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
