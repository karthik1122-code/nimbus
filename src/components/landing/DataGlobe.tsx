"use client";

import React, { useEffect, useRef } from "react";

export function DataGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Globe sphere mathematical parameters
    const GLOBE_RADIUS = Math.min(width, height) * 0.38;
    const DOT_COUNT = 320;
    const dots: { x: number; y: number; z: number; baseLat: number; baseLon: number }[] = [];

    // Generate spherical coordinates
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

      dots.push({
        x: GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi),
        y: GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi),
        z: GLOBE_RADIUS * Math.cos(phi),
        baseLat: phi,
        baseLon: theta,
      });
    }

    // Connection Arcs between random dots
    const connections: { from: number; to: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const from = Math.floor(Math.random() * DOT_COUNT);
      let to = Math.floor(Math.random() * DOT_COUNT);
      while (to === from) to = Math.floor(Math.random() * DOT_COUNT);

      connections.push({
        from,
        to,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
    }

    let rotationY = 0;
    let rotationX = 0.2;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) * 0.0001;
      mouseY = (e.clientY - cy) * 0.0001;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Update rotation
      rotationY += 0.004 + mouseX;
      rotationX += mouseY * 0.1;
      rotationX = Math.max(-0.4, Math.min(0.4, rotationX));

      // Draw Atmospheric Radial Glow Halo behind the globe
      const haloGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        GLOBE_RADIUS * 0.2,
        centerX,
        centerY,
        GLOBE_RADIUS * 1.35
      );
      haloGradient.addColorStop(0, "rgba(99, 102, 241, 0.25)");
      haloGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.12)");
      haloGradient.addColorStop(1, "rgba(8, 7, 10, 0)");

      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, GLOBE_RADIUS * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Render Orbiting Telemetry Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationY * 0.3);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, GLOBE_RADIUS * 1.25, GLOBE_RADIUS * 0.4, 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Project & transform 3D sphere points
      const projectedDots: { x: number; y: number; z: number; scale: number; alpha: number }[] = [];

      for (let i = 0; i < DOT_COUNT; i++) {
        const dot = dots[i];

        // 3D Matrix Rotation (Y axis & X axis)
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);

        let x1 = dot.x * cosY - dot.z * sinY;
        let z1 = dot.z * cosY + dot.x * sinY;

        let y1 = dot.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + dot.y * sinX;

        // Perspective scale factor
        const scale = 400 / (400 + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;
        const alpha = Math.max(0.1, (z2 + GLOBE_RADIUS) / (2 * GLOBE_RADIUS));

        projectedDots.push({ x: px, y: py, z: z2, scale, alpha });
      }

      // Sort projected points by depth for correct ordering
      const sortedIndices = projectedDots
        .map((p, idx) => ({ p, idx }))
        .sort((a, b) => a.p.z - b.p.z);

      // Draw connection lines across front-facing surface nodes
      ctx.lineWidth = 0.75;
      connections.forEach((conn) => {
        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;

        const p1 = projectedDots[conn.from];
        const p2 = projectedDots[conn.to];

        if (p1 && p2 && p1.z > -GLOBE_RADIUS * 0.3 && p2.z > -GLOBE_RADIUS * 0.3) {
          // Draw arc line
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.25 * Math.min(p1.alpha, p2.alpha)})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();

          // Draw moving pulse node along arc
          const pulseX = p1.x + (p2.x - p1.x) * conn.progress;
          const pulseY = p1.y + (p2.y - p1.y) * conn.progress;

          ctx.fillStyle = "rgba(165, 180, 252, 0.9)";
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2 * p1.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Render individual sphere surface dots
      sortedIndices.forEach(({ p }) => {
        const radius = Math.max(1, 2.2 * p.scale);
        const isFront = p.z > 0;

        ctx.fillStyle = isFront
          ? `rgba(165, 180, 252, ${0.4 + p.alpha * 0.5})`
          : `rgba(99, 102, 241, ${p.alpha * 0.25})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Highlight key front-facing active data nodes with subtle glow
        if (isFront && p.scale > 1.05 && Math.random() < 0.05) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] flex items-center justify-center select-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
