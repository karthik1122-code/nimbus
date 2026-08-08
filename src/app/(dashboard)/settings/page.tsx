"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building,
  Sliders,
  Bell,
  Shield,
  Key,
  Trash2,
  CheckCircle2,
  Moon,
  Sun,
  Globe,
  Lock,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/design-system/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs } from "@/components/ui/Tabs";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Profile State
  const [name, setName] = useState("Alex Vance");
  const [email, setEmail] = useState("alex.vance@insightai.io");
  const [role, setRole] = useState("Lead Product Designer");

  // Workspace State
  const [workspaceName, setWorkspaceName] = useState("InsightAI HQ");
  const [workspaceDesc, setWorkspaceDesc] = useState("Enterprise AI Product Analytics & Intelligence Workspace");

  // Preferences State
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en-US");
  const [defaultRange, setDefaultRange] = useState("30D");

  // Notifications Toggles State
  const [notifAnalysis, setNotifAnalysis] = useState(true);
  const [notifReport, setNotifReport] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);

  const settingsTabs = [
    { id: "profile", label: "Profile" },
    { id: "workspace", label: "Workspace" },
    { id: "preferences", label: "Preferences" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
  ];

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage profile settings, workspace preferences, and security credentials.
          </p>
        </div>

        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings saved successfully</span>
          </motion.div>
        )}
      </div>

      {/* TABS NAVIGATION */}
      <Tabs tabs={settingsTabs} activeTab={activeTab} onChange={setActiveTab} />

      <AnimatePresence mode="wait">
        {/* TAB 1: PROFILE */}
        {activeTab === "profile" && (
          <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <GlassCard variant="glow" className="p-6 md:p-8 space-y-6 max-w-2xl border-white/10">
              <div className="flex items-center gap-5 pb-6 border-b border-white/10">
                <Avatar name={name} size="xl" status="online" />
                <div>
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                  <p className="text-xs text-purple-300 font-mono">{email}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {role}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Professional Role" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* TAB 2: WORKSPACE */}
        {activeTab === "workspace" && (
          <motion.div key="workspace" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 max-w-2xl">
            <GlassCard variant="default" className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Building className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Workspace Details</h3>
              </div>

              <div className="space-y-4">
                <Input label="Workspace Name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
                <Input label="Workspace Description" value={workspaceDesc} onChange={(e) => setWorkspaceDesc(e.target.value)} />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
              </div>
            </GlassCard>

            {/* DANGER ZONE */}
            <GlassCard variant="default" className="p-6 border-rose-500/40 bg-rose-950/10 space-y-4">
              <div className="flex items-center gap-2 text-rose-400">
                <Trash2 className="w-4 h-4" />
                <h4 className="text-sm font-bold">Danger Zone</h4>
              </div>
              <p className="text-xs text-slate-300">
                Deleting this workspace will permanently delete all 148 AI agents, dataset feeds, and historical reports. This action cannot be undone.
              </p>
              <Button variant="danger" size="sm" onClick={() => setIsDeleteModalOpen(true)}>
                Delete workspace
              </Button>
            </GlassCard>
          </motion.div>
        )}

        {/* TAB 3: PREFERENCES */}
        {activeTab === "preferences" && (
          <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <GlassCard variant="default" className="p-6 md:p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Sliders className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Display & System Preferences</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Interface Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["system", "light", "dark"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          theme === t
                            ? "bg-purple-600/30 border-purple-500/60 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                            : "glass-pill text-slate-400 border-white/10 hover:text-white"
                        }`}
                      >
                        {t === "dark" ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                        <span>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Select
                  label="Interface Language"
                  options={[
                    { value: "en-US", label: "English (US)" },
                    { value: "en-GB", label: "English (UK)" },
                    { value: "de-DE", label: "Deutsch (German)" },
                  ]}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />

                <Select
                  label="Default Analytics Horizon"
                  options={[
                    { value: "7D", label: "7 Days" },
                    { value: "30D", label: "30 Days (Recommended)" },
                    { value: "90D", label: "90 Days" },
                  ]}
                  value={defaultRange}
                  onChange={(e) => setDefaultRange(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button size="sm" onClick={handleSave}>
                  Save changes
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* TAB 4: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <GlassCard variant="default" className="p-6 md:p-8 space-y-6 max-w-2xl">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Bell className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Email Notification Preferences</h3>
              </div>

              <div className="space-y-4">
                {[
                  { title: "AI analysis completed", desc: "Receive email notification when an AI dataset scan finishes", state: notifAnalysis, set: setNotifAnalysis },
                  { title: "Report generated", desc: "Get notified when automated PDF or CSV executive briefs are generated", state: notifReport, set: setNotifReport },
                  { title: "Weekly insights digest", desc: "Receive a weekly summary of discovered cohort anomalies and revenue growth signals", state: notifWeekly, set: setNotifWeekly },
                  { title: "Product updates", desc: "Receive news regarding new AI model releases and platform capabilities", state: notifUpdates, set: setNotifUpdates },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl glass-pill">
                    <div>
                      <span className="text-xs font-bold text-white block">{item.title}</span>
                      <span className="text-[11px] text-slate-400">{item.desc}</span>
                    </div>
                    <button
                      onClick={() => item.set(!item.state)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                        item.state ? "bg-purple-600 shadow-[0_0_10px_rgba(124,58,237,0.5)]" : "bg-white/10"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${item.state ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button size="sm" onClick={handleSave}>
                  Save preferences
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* TAB 5: SECURITY */}
        {activeTab === "security" && (
          <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 max-w-2xl">
            <GlassCard variant="default" className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Shield className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Security & Password</h3>
              </div>

              <div className="space-y-4">
                <Input label="Current Password" type="password" value="••••••••••••" readOnly />
                <Input label="New Password" type="password" placeholder="At least 8 characters..." />
                <Input label="Confirm New Password" type="password" placeholder="Re-enter password..." />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button size="sm" onClick={handleSave}>
                  Update Password
                </Button>
              </div>
            </GlassCard>

            <GlassCard variant="default" className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h4>
                    <p className="text-xs text-slate-400">Secure your workspace using TOTP authenticator apps</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ENABLED
                </span>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE WORKSPACE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Workspace permanently?"
        description="This action cannot be undone. All dataset history and reports will be deleted."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Confirm Permanent Deletion
            </Button>
          </>
        }
      >
        <p className="text-xs text-slate-300">
          Type <strong className="text-rose-400 font-mono">DELETE INSIGHTAI HQ</strong> below to confirm.
        </p>
        <input type="text" placeholder="DELETE INSIGHTAI HQ" className="w-full mt-3 px-3 py-2 text-xs rounded-xl glass-input border-rose-500/50" />
      </Modal>
    </div>
  );
}
