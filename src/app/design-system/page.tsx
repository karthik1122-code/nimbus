"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Plus,
  Bell,
  Check,
  AlertTriangle,
  Info,
  ArrowRight,
  User,
  Settings,
  Mail,
  Zap,
  Globe,
  BarChart3,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import { Tooltip } from "@/components/ui/Tooltip";
import { Dropdown } from "@/components/ui/Dropdown";
import { Modal } from "@/components/ui/Modal";
import { Avatar } from "@/components/ui/Avatar";
import { StatCard } from "@/components/ui/StatCard";
import { ChartContainer } from "@/components/ui/ChartContainer";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CTABanner } from "@/components/ui/CTABanner";
import { StatusBadge } from "@/components/design-system/StatusBadge";
import { SectionHeader } from "@/components/design-system/SectionHeader";
import { GlassCard } from "@/components/design-system/GlassCard";
import { CosmicOrb } from "@/components/design-system/CosmicOrb";

export default function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const tabItems = [
    { id: "all", label: "All Tokens", badge: "20+" },
    { id: "buttons", label: "Buttons & CTAs" },
    { id: "inputs", label: "Inputs & Controls" },
    { id: "cards", label: "Cards & Surfaces" },
    { id: "data", label: "Badges & Metrics" },
  ];

  return (
    <div className="min-h-screen bg-[#05030A] text-slate-100 relative overflow-x-hidden p-6 md:p-12 space-y-16">
      <CosmicOrb showRing={true} intensity="high" />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center space-y-4">
        <span className="glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-purple-300 border border-purple-500/30">
          InsightAI Design System Specification — Phase 1
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          Foundational UI Tokens &{" "}
          <span className="font-serif italic text-gradient-purple-glow font-normal">
            Component Library
          </span>
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-2xl">
          Centralized design system built specifically to power InsightAI. Includes state support for default, hover, active, focus, disabled, and loading.
        </p>

        {/* Tab Filter */}
        <div className="pt-6">
          <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* SECTION 1: COLOR PALETTE & TOKENS */}
        {(activeTab === "all" || activeTab === "cards") && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Cosmic Color Palette & Surfaces</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-[#05030A] border border-white/10 space-y-2">
                <div className="w-full h-12 rounded-lg bg-[#05030A] border border-white/20" />
                <p className="text-xs font-bold text-white">Cosmos Void</p>
                <p className="text-[10px] font-mono text-slate-400">#05030A</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0B0814] border border-white/10 space-y-2">
                <div className="w-full h-12 rounded-lg bg-[#0B0814] border border-white/20" />
                <p className="text-xs font-bold text-white">Surface Base</p>
                <p className="text-[10px] font-mono text-slate-400">#0B0814</p>
              </div>
              <div className="p-4 rounded-xl bg-[#120E22] border border-white/10 space-y-2">
                <div className="w-full h-12 rounded-lg bg-[#120E22] border border-white/20" />
                <p className="text-xs font-bold text-white">Elevated Card</p>
                <p className="text-[10px] font-mono text-slate-400">#120E22</p>
              </div>
              <div className="p-4 rounded-xl bg-[#7C3AED] border border-purple-400/30 space-y-2">
                <div className="w-full h-12 rounded-lg bg-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.8)]" />
                <p className="text-xs font-bold text-white">Electric Violet</p>
                <p className="text-[10px] font-mono text-purple-200">#7C3AED</p>
              </div>
              <div className="p-4 rounded-xl bg-[#8B5CF6] border border-purple-400/30 space-y-2">
                <div className="w-full h-12 rounded-lg bg-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.8)]" />
                <p className="text-xs font-bold text-white">Neon Purple</p>
                <p className="text-[10px] font-mono text-purple-200">#8B5CF6</p>
              </div>
              <div className="p-4 rounded-xl bg-[#C084FC] border border-purple-400/30 space-y-2">
                <div className="w-full h-12 rounded-lg bg-[#C084FC]" />
                <p className="text-xs font-bold text-slate-950">Glow Accent</p>
                <p className="text-[10px] font-mono text-slate-900">#C084FC</p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 2: BUTTONS & STATES */}
        {(activeTab === "all" || activeTab === "buttons") && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Button Components & Interaction States
            </h2>

            <GlassCard variant="default" className="space-y-6 p-8">
              {/* Primary Buttons */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Primary CTA Buttons (Default, Loading, Disabled)
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Primary Large
                  </Button>
                  <Button size="md">Primary Medium</Button>
                  <Button size="sm">Primary Small</Button>
                  <Button size="md" isLoading>
                    Processing
                  </Button>
                  <Button size="md" isDisabled>
                    Disabled State
                  </Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Secondary & Ghost Variants
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="secondary" size="md">
                    Secondary Glass
                  </Button>
                  <Button variant="outline" size="md">
                    Outline Purple
                  </Button>
                  <Button variant="ghost" size="md">
                    Ghost Link
                  </Button>
                  <Button variant="danger" size="md">
                    Danger Action
                  </Button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Icon Action Buttons
                </p>
                <div className="flex items-center gap-4">
                  <IconButton variant="primary" icon={<Plus className="w-4 h-4" />} ariaLabel="Add" />
                  <IconButton variant="secondary" icon={<Bell className="w-4 h-4" />} ariaLabel="Notify" />
                  <IconButton variant="glass" icon={<Settings className="w-4 h-4" />} ariaLabel="Settings" />
                  <IconButton variant="ghost" icon={<User className="w-4 h-4" />} ariaLabel="Profile" />
                  <IconButton variant="glass" icon={<Plus className="w-4 h-4" />} isLoading ariaLabel="Loading" />
                  <IconButton variant="glass" icon={<Plus className="w-4 h-4" />} isDisabled ariaLabel="Disabled" />
                </div>
              </div>
            </GlassCard>
          </section>
        )}

        {/* SECTION 3: INPUTS & CONTROLS */}
        {(activeTab === "all" || activeTab === "inputs") && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Input Controls, Selects & Tooltips
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard variant="default" className="space-y-4 p-6">
                <h3 className="text-sm font-bold text-white mb-2">Input Form Fields</h3>
                <Input
                  label="Work Email"
                  placeholder="alex.vance@insightai.io"
                  startIcon={<Mail className="w-4 h-4" />}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="We will never share your email with third parties."
                />

                <Input
                  label="API Secret Key (Focus Glow)"
                  defaultValue="ia_live_9081298492084902"
                  startIcon={<Zap className="w-4 h-4 text-purple-400" />}
                />

                <Input
                  label="Error State Validation"
                  placeholder="Invalid input..."
                  error="Please enter a valid hostname address."
                />

                <Input
                  label="Disabled Field"
                  value="System Locked"
                  disabled
                />
              </GlassCard>

              <GlassCard variant="default" className="space-y-4 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-4">Select & Interactive Overlays</h3>
                  <Select
                    label="Active AI Model Engine"
                    options={[
                      { value: "gpt4", label: "InsightAI Neural V4 (142ms)" },
                      { value: "claude", label: "Anthropic Claude 3.5 Sonnet" },
                      { value: "deepseek", label: "DeepSeek R1 Reasoning Agent" },
                    ]}
                  />

                  <div className="mt-6 flex items-center justify-between p-4 rounded-xl glass-pill">
                    <div>
                      <span className="text-xs font-bold text-white block">Modal Dialog Trigger</span>
                      <span className="text-[11px] text-slate-400">Open portal modal dialog</span>
                    </div>
                    <Button size="sm" onClick={() => setIsModalOpen(true)}>
                      Open Modal
                    </Button>
                  </div>
                </div>

                {/* Dropdown Menu & Tooltips */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Tooltip content="Tooltip message: 99.84% uptime guaranteed">
                    <span className="text-xs text-purple-300 font-medium underline cursor-help">
                      Hover for Tooltip
                    </span>
                  </Tooltip>

                  <Dropdown
                    trigger={
                      <Button variant="secondary" size="sm" rightIcon={<Search className="w-3.5 h-3.5" />}>
                        Actions Menu
                      </Button>
                    }
                    items={[
                      { id: "1", label: "View Telemetry", icon: <BarChart3 className="w-4 h-4" /> },
                      { id: "2", label: "Edit Pipeline", icon: <Settings className="w-4 h-4" /> },
                      { id: "3", label: "Delete Log", danger: true },
                    ]}
                  />
                </div>
              </GlassCard>
            </div>
          </section>
        )}

        {/* SECTION 4: BADGES, AVATARS & METRICS */}
        {(activeTab === "all" || activeTab === "data") && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Status Badges, Avatars & Stat Cards
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard variant="default" className="space-y-4 p-6">
                <h3 className="text-sm font-bold text-white mb-2">Status Pill Chips</h3>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="In Queue" />
                  <StatusBadge status="Processed" />
                  <StatusBadge status="Paid" />
                  <StatusBadge status="Validated" />
                  <StatusBadge status="Updated" />
                  <StatusBadge status="Failed" />
                </div>
              </GlassCard>

              <GlassCard variant="default" className="space-y-4 p-6">
                <h3 className="text-sm font-bold text-white mb-2">User Avatars & Rims</h3>
                <div className="flex items-center gap-4">
                  <Avatar name="Alex Vance" size="sm" status="online" />
                  <Avatar name="Alex Vance" size="md" status="online" />
                  <Avatar name="Alex Vance" size="lg" status="busy" />
                  <Avatar name="Alex Vance" size="xl" status="offline" />
                </div>
              </GlassCard>

              <StatCard
                title="Execution Velocity"
                value="112 ms"
                change="-24 ms"
                positive={true}
                description="Average model inference response time"
                icon={<Zap className="w-4 h-4 text-purple-400" />}
                variant="active"
              />
            </div>
          </section>
        )}

        {/* SECTION 5: CTA BANNER & FEATURE CARDS */}
        {(activeTab === "all" || activeTab === "cards") && (
          <section className="space-y-6 pt-4">
            <h2 className="text-xl font-bold text-white border-b border-white/10 pb-3">
              Feature Cards & Conversion Banner
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard
                icon={<Bot className="w-6 h-6" />}
                title="Autonomous Agent Orchestration"
                description="Chain specialized AI models together into seamless execution pipelines with zero latency."
                tag="Core Engine"
              />
              <FeatureCard
                icon={<Globe className="w-6 h-6" />}
                title="Global Edge Data Processing"
                description="Distribute workload tasks across 12 edge worker nodes for high-availability uptime."
                tag="Global Infrastructure"
              />
            </div>

            <CTABanner titleSans="Deploy autonomous agents." className="mt-8" />
          </section>
        )}
      </div>

      {/* Demo Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="InsightAI Modal Dialog"
        description="Foundational dialog portal component with backdrop blur and escape key handler."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => setIsModalOpen(false)}>
              Confirm Action
            </Button>
          </>
        }
      >
        <p className="leading-relaxed">
          This modal dialog provides a smooth glassmorphic overlay for critical system actions, agent configuration updates, or confirm dialogs.
        </p>
      </Modal>
    </div>
  );
}
