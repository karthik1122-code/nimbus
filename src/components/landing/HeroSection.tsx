"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, Activity, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";

/* ────────────────────────────────────────────
   CONSTELLATION GLOBE CANVAS (Nimbus Sphere)
   ──────────────────────────────────────────── */
function ConstellationGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let DPR = 1;
    interface Point { x: number; y: number; z: number; tw: number }
    let points: Point[] = [];
    let rotation = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const POINT_COUNT = 340;
    const RADIUS_FACTOR = 0.30;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const buildSphere = () => {
      points = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < POINT_COUNT; i++) {
        const y = 1 - (i / (POINT_COUNT - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        points.push({ x, y, z, tw: Math.random() * Math.PI * 2 });
      }
    };

    const project = (p: Point, cx: number, cy: number, radius: number) => {
      const cosR = Math.cos(rotation);
      const sinR = Math.sin(rotation);
      const x = p.x * cosR - p.z * sinR;
      const z = p.x * sinR + p.z * cosR;
      const y = p.y;

      const cosT = Math.cos(tiltX);
      const sinT = Math.sin(tiltX);
      const y2 = y * cosT - z * sinT;
      const z2 = y * sinT + z * cosT;

      const scale = radius * (1 / (1.6 - z2 * 0.55));
      return {
        sx: cx + x * scale + tiltY * 26,
        sy: cy + y2 * scale,
        z: z2,
        scale,
        tw: p.tw,
      };
    };

    let t = 0;
    let rafId: number;

    let isVisible = true;

    const draw = () => {
      if (!isVisible) return;
      t += 0.012;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H * 0.42;
      const radius = Math.min(W, H) * RADIUS_FACTOR;

      tiltX += (targetTiltX - tiltX) * 0.03;
      tiltY += (targetTiltY - tiltY) * 0.03;

      const projected = points.map((p) => project(p, cx, cy, radius));
      projected.sort((a, b) => a.z - b.z);

      // Outer atmosphere and equator ring glow
      ctx.save();
      ctx.strokeStyle = "rgba(196,187,255,0.08)";
      ctx.lineWidth = 1;
      for (let i = 1; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          radius * 1.02 * i * 0.62 + radius * 0.5,
          radius * 1.02 * i * 0.62 + radius * 0.5,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Bright glowing equator band
      const equatorGrad = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      equatorGrad.addColorStop(0, "rgba(139, 92, 246, 0)");
      equatorGrad.addColorStop(0.5, "rgba(240, 179, 87, 0.35)");
      equatorGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.strokeStyle = equatorGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.05, radius * 0.28, tiltX, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render sphere particles with depth-of-field effect
      projected.forEach((p) => {
        const depth = (p.z + 1) / 2; // 0..1
        const isBack = p.z < 0;
        const alpha = isBack ? 0.08 + depth * 0.25 : 0.25 + depth * 0.75;
        const size = isBack ? Math.max(0.6, 0.8 * depth) : 1.1 + depth * 1.8;
        const flicker = 0.75 + Math.sin(t * 2 + p.tw) * 0.25;

        ctx.beginPath();
        ctx.fillStyle = isBack
          ? `rgba(160, 150, 220, ${alpha * flicker})`
          : `rgba(201, 187, 255, ${alpha * flicker})`;
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();

        // Front particle glow highlight
        if (depth > 0.75) {
          ctx.beginPath();
          ctx.fillStyle = "rgba(240, 179, 87, 0.4)";
          ctx.arc(p.sx, p.sy, size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      rotation += 0.0016;
      rafId = requestAnimationFrame(draw);
    };

    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = Math.max(-1, Math.min(1, relX)) * 0.6;
      targetTiltX = Math.max(-1, Math.min(1, relY)) * 0.25;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(rafId);
      } else {
        if (!isVisible) {
          isVisible = true;
          draw();
        }
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    resize();
    buildSphere();
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="globe-canvas"
      className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[min(1400px,200vw)] h-[1050px] z-[-1] pointer-events-none"
    />
  );
}

export function HeroSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
  return (
    <section className="relative pt-[170px] overflow-hidden isolate" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-[-2] bg-[#060512]" />
      <div className="hero-glow" />
      <ConstellationGlobe />

      {/* Hero Inner */}
      <div className="max-w-[840px] mx-auto text-center px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="dot" />
          <span>Agents online — 12,480 tasks handled today</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-semibold text-[clamp(40px,6.4vw,74px)] leading-[1.04] tracking-[-0.02em] text-[#f3f1fb]"
        >
          Automate repetitive.
          <em className="block hero-title-serif font-normal text-[#c9bbff] text-[1.08em] mt-0.5">
            Focus on growth.
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 max-w-[560px] mx-auto text-[#9d98bb] text-[17px] leading-relaxed"
        >
          The next-generation AI agent platform that handles lead generation, customer support, and data entry while you build.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3.5 mt-9 flex-wrap"
        >
          <Link href="/signup">
            <button className="btn btn-primary btn-lg">Get Started Free</button>
          </Link>
          <button
            onClick={onOpenDemo}
            className="btn btn-ghost btn-lg flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Watch 2min Demo
          </button>
        </motion.div>
      </div>

      {/* Hero Dashboard Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 max-w-[1080px] mx-auto px-6 pb-28"
      >
        <Link
          href="/dashboard"
          className="hero-preview block group relative rounded-[20px] border border-white/9 bg-gradient-to-b from-[#131228]/90 to-[#0a0918]/96 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(139,92,246,0.25)]"
        >
          {/* Live badge */}
          <div className="hero-preview-badge">
            <ChevronRight className="w-3.5 h-3.5 text-[#c9bbff]" />
            <span>Open live dashboard</span>
          </div>

          {/* Mini Dashboard Mockup */}
          <div className="mini-dash grid grid-cols-1 md:grid-cols-[190px_1fr] min-h-[420px] text-xs">
            {/* Sidebar */}
            <div className="hidden md:block bg-[#0a0918] border-r border-white/5 p-5">
              <div className="flex items-center gap-2 font-display font-semibold text-xs text-white mb-5">
                <div className="brand-mark !w-4 !h-4 !rounded-[5px]" />
                Nimbus
              </div>
              <div className="text-[10px] text-[#615c82] uppercase tracking-wider my-3 font-semibold">General</div>
              <div className="px-2.5 py-2 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] text-white font-medium mb-1">Overview</div>
              <div className="px-2.5 py-2 rounded-lg text-[#9d98bb] hover:text-white mb-1 transition-colors">Agents</div>
              <div className="px-2.5 py-2 rounded-lg text-[#9d98bb] hover:text-white mb-1 transition-colors">Reports</div>
              <div className="px-2.5 py-2 rounded-lg text-[#9d98bb] hover:text-white mb-1 transition-colors">Integrations</div>
              <div className="text-[10px] text-[#615c82] uppercase tracking-wider my-3 font-semibold">Monitor</div>
              <div className="px-2.5 py-2 rounded-lg text-[#9d98bb] hover:text-white mb-1 transition-colors">Insights</div>
              <div className="px-2.5 py-2 rounded-lg text-[#9d98bb] hover:text-white mb-1 transition-colors">Escalations</div>
            </div>

            {/* Main view */}
            <div className="p-6 md:p-7">
              <div className="flex items-center justify-between font-display font-semibold text-base text-white mb-6">
                <span>Dashboard Overview</span>
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#131228] border border-white/10" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#131228] border border-white/10" />
                  <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#c9bbff]" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="bg-[#0a0918] border border-white/5 rounded-xl p-3.5">
                  <span className="block text-[#615c82] text-[10.5px] mb-1">Tasks today</span>
                  <span className="font-display font-semibold text-lg text-white">12,480</span>
                </div>
                <div className="bg-[#0a0918] border border-white/5 rounded-xl p-3.5">
                  <span className="block text-[#615c82] text-[10.5px] mb-1">Resolved</span>
                  <span className="font-display font-semibold text-lg text-[#4ade80]">96.4%</span>
                </div>
                <div className="bg-[#0a0918] border border-white/5 rounded-xl p-3.5">
                  <span className="block text-[#615c82] text-[10.5px] mb-1">Agents live</span>
                  <span className="font-display font-semibold text-lg text-[#c9bbff]">18</span>
                </div>
              </div>

              {/* Table */}
              <div className="font-display font-semibold text-xs text-white mb-3">Recent Activity Logs</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <tbody>
                    <tr className="border-t border-white/5">
                      <td className="py-2.5 px-1 text-[#615c82]">10:24</td>
                      <td className="py-2.5 px-1"><span className="px-2 py-0.5 rounded-full bg-[#f0b357]/15 text-[#f0b357] text-[10.5px] font-body font-medium">In Queue</span></td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">CRM Lead Sync</td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Validated</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="py-2.5 px-1 text-[#615c82]">09:58</td>
                      <td className="py-2.5 px-1"><span className="px-2 py-0.5 rounded-full bg-[#8b5cf6]/18 text-[#c9bbff] text-[10.5px] font-body font-medium">Processed</span></td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Web Analytics</td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Updated</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="py-2.5 px-1 text-[#615c82]">09:30</td>
                      <td className="py-2.5 px-1"><span className="px-2 py-0.5 rounded-full bg-[#4ade80]/15 text-[#4ade80] text-[10.5px] font-body font-medium">Resolved</span></td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Support Ticket #8821</td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Closed</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="py-2.5 px-1 text-[#615c82]">09:12</td>
                      <td className="py-2.5 px-1"><span className="px-2 py-0.5 rounded-full bg-[#f0b357]/15 text-[#f0b357] text-[10.5px] font-body font-medium">In Queue</span></td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Invoice Reconciliation</td>
                      <td className="py-2.5 px-1 text-[#9d98bb]">Updated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
