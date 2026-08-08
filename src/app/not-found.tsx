"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#060512] text-[#f3f1fb] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),rgba(139,92,246,0.02)_45%,transparent_70%)] filter blur-[10px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#0d0c1e] border border-white/9 rounded-[24px] p-8 sm:p-10 text-center relative z-10 space-y-6 shadow-2xl">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="brand-mark" />
          <span className="font-display font-semibold text-xl text-white">Nimbus</span>
        </Link>

        <div>
          <span className="font-mono text-5xl font-extrabold text-[#c9bbff] block">404</span>
          <h1 className="font-display text-2xl font-semibold text-white mt-2">Page Not Found</h1>
          <p className="text-xs text-[#9d98bb] mt-2 leading-relaxed">
            The page or resource you are looking for has been moved, renamed, or doesn&apos;t exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link href="/">
            <button className="btn btn-primary w-full flex items-center justify-center gap-2">
              <Home className="w-4 h-4" /> Return to Homepage
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="btn btn-ghost w-full flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-[#c9bbff]" /> Go to Live Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
