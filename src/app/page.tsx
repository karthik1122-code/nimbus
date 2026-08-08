"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { SocialProof } from "@/components/landing/SocialProof";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { DemoModal } from "@/components/landing/DemoModal";

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060512] text-[#f3f1fb] relative overflow-hidden flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        <HeroSection onOpenDemo={() => setDemoOpen(true)} />
        <ProductShowcase />
        <SocialProof />
        <ContactSection />
      </main>

      <Footer />
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
