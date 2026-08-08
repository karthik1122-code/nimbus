"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Building, Bell, Shield, Key, Trash2, CheckCircle2,
  Moon, Sun, Globe, Lock, Smartphone, Sparkles, LogOut,
  Eye, EyeOff, Copy, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { Modal } from "@/components/ui/Modal";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
];

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5.5 rounded-full transition-all duration-300 ${checked ? "bg-purple-600" : "bg-white/10"}`}
      style={{ height: "22px" }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm"
        style={{ width: "18px", height: "18px", left: checked ? "calc(100% - 20px)" : "2px" }}
      />
    </button>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-xs font-semibold text-white">{label}</p>
        {desc && <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Profile
  const [name, setName] = useState("Alex Vance");
  const [email, setEmail] = useState("alex.vance@insightai.io");
  const [role, setRole] = useState("Lead Product Designer");

  // Prefs
  const [darkMode, setDarkMode] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [autoAnalyze, setAutoAnalyze] = useState(true);

  // Notifications
  const [notifs, setNotifs] = useState({
    emailInsights: true, slackAlerts: true, weeklyDigest: false,
    anomalyAlerts: true, reportReady: true, systemUpdates: false,
  });

  // Security
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("8h");

  const handleSave = async () => {
    setSaved(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSaved(false);
  };

  const apiKey = "sk_live_••••••••••••••••••••••••••••••••";
  const apiKeyReal = "sk_test_mock_placeholder_key";

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-xs text-slate-400 mt-1">Manage your profile, workspace, and preferences.</p>
        </div>
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div key="saved" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/12 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Saved!
            </motion.div>
          ) : (
            <Button key="save" size="sm" onClick={handleSave}>Save changes</Button>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tab sidebar */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="p-2 rounded-2xl bg-[#0D0A18]/80 border border-white/7">
            {settingsTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all mb-0.5 ${
                  activeTab === id ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.35)]" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl bg-[#0D0A18]/80 border border-white/7 space-y-6"
            >
              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <Avatar name="Alex Vance" size="lg" status="online" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Profile photo</h3>
                      <p className="text-xs text-slate-500 mt-0.5">PNG, JPG or GIF. Max 4MB.</p>
                      <Button variant="secondary" size="sm" className="mt-2">Change photo</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Full name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none focus:border-purple-500/40" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Email address</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none focus:border-purple-500/40" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Role</label>
                      <input value={role} onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none focus:border-purple-500/40" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Timezone</label>
                      <select className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none">
                        <option>UTC−05:00 Eastern Time</option>
                        <option>UTC+00:00 GMT</option>
                        <option>UTC+05:30 IST</option>
                      </select>
                    </div>
                  </div>
                  <div className="border-t border-white/6 pt-5 space-y-1">
                    <SettingRow label="Dark mode" desc="Use dark theme across the dashboard"><ToggleSwitch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /></SettingRow>
                    <SettingRow label="Compact view" desc="Reduce padding and density in tables"><ToggleSwitch checked={compactView} onChange={() => setCompactView(!compactView)} /></SettingRow>
                    <SettingRow label="Auto-analyze uploads" desc="Run AI analysis immediately on upload"><ToggleSwitch checked={autoAnalyze} onChange={() => setAutoAnalyze(!autoAnalyze)} /></SettingRow>
                  </div>
                </div>
              )}

              {/* WORKSPACE TAB */}
              {activeTab === "workspace" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Workspace name</label>
                    <input defaultValue="InsightAI HQ" className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none focus:border-purple-500/40" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 mb-2 block">Team members</label>
                    <div className="space-y-2">
                      {[
                        { name: "Alex Vance", email: "alex.vance@insightai.io", role: "Owner" },
                        { name: "Jamie Park", email: "jamie.park@company.com", role: "Editor" },
                        { name: "Sam Torres", email: "sam.torres@company.com", role: "Viewer" },
                      ].map((m) => (
                        <div key={m.email} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5">
                          <div className="flex items-center gap-3">
                            <Avatar name={m.name} size="sm" />
                            <div>
                              <p className="text-xs font-semibold text-white">{m.name}</p>
                              <p className="text-[10px] text-slate-500">{m.email}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-md bg-white/5 border border-white/8">{m.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/6">
                    <p className="text-xs font-bold text-rose-400 mb-2">Danger Zone</p>
                    <button onClick={() => setDeleteOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-500/25 bg-rose-500/8 text-rose-400 text-xs font-semibold hover:bg-rose-500/15 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Delete workspace
                    </button>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-1">
                  {[
                    { key: "emailInsights", label: "Email — AI insights summary", desc: "Get notified when InsightAI discovers new insights" },
                    { key: "slackAlerts", label: "Slack — Anomaly alerts", desc: "Instant Slack alerts for detected data anomalies" },
                    { key: "weeklyDigest", label: "Weekly digest email", desc: "Summary of all metrics and insights each Monday" },
                    { key: "anomalyAlerts", label: "Push — Critical anomaly alerts", desc: "Browser push notifications for critical issues" },
                    { key: "reportReady", label: "Email — Report ready", desc: "Notify when AI reports finish generating" },
                    { key: "systemUpdates", label: "Product updates & changelog", desc: "Feature announcements and release notes" },
                  ].map((n) => (
                    <SettingRow key={n.key} label={n.label} desc={n.desc}>
                      <ToggleSwitch
                        checked={notifs[n.key as keyof typeof notifs]}
                        onChange={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key as keyof typeof notifs] }))}
                      />
                    </SettingRow>
                  ))}
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-white mb-3">Change password</h3>
                    <div className="space-y-3">
                      {["Current password", "New password", "Confirm new password"].map((l) => (
                        <div key={l}>
                          <label className="text-xs font-semibold text-slate-400 mb-1.5 block">{l}</label>
                          <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/4 border border-white/8 text-white focus:outline-none focus:border-purple-500/40" />
                        </div>
                      ))}
                      <Button size="sm">Update password</Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/6 space-y-1">
                    <SettingRow label="Two-factor authentication" desc="Require TOTP code on every login"><ToggleSwitch checked={twoFA} onChange={() => setTwoFA(!twoFA)} /></SettingRow>
                    <SettingRow label="Session timeout" desc="Auto-logout after inactivity">
                      <select value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-slate-300 focus:outline-none">
                        <option value="1h">1 hour</option>
                        <option value="8h">8 hours</option>
                        <option value="24h">24 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </SettingRow>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/6 border border-emerald-500/15">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">SOC 2 Type II Compliant</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Your data is encrypted at rest and in transit. Last security audit: July 2026.</p>
                  </div>
                </div>
              )}

              {/* API KEYS TAB */}
              {activeTab === "api" && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1">Production API Key</h3>
                    <p className="text-[10px] text-slate-500 mb-3">Use this key to authenticate API requests from your applications.</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/8 text-xs font-mono text-purple-300 overflow-hidden">
                        {showKey ? apiKeyReal : apiKey}
                      </code>
                      <button onClick={() => setShowKey(!showKey)} className="p-2.5 rounded-xl bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors">
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button className="p-2.5 rounded-xl bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 rounded-xl bg-white/4 border border-white/8 text-slate-400 hover:text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-white">API Usage</h3>
                      <span className="text-[10px] text-slate-500 font-mono">Last 30 days</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { endpoint: "POST /v1/insights/query", calls: "12,482", limit: "50,000" },
                        { endpoint: "GET /v1/datasets", calls: "3,840", limit: "10,000" },
                        { endpoint: "POST /v1/reports/generate", calls: "248", limit: "1,000" },
                      ].map((ep) => (
                        <div key={ep.endpoint} className="p-3 rounded-xl bg-white/3 border border-white/5">
                          <div className="flex items-center justify-between mb-1.5 text-xs">
                            <code className="text-purple-300 font-mono text-[10px]">{ep.endpoint}</code>
                            <span className="text-slate-400">{ep.calls} / {ep.limit}</span>
                          </div>
                          <div className="w-full h-1 rounded-full bg-white/5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-500"
                              style={{ width: `${(parseInt(ep.calls.replace(/,/g, "")) / parseInt(ep.limit.replace(/,/g, ""))) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Delete workspace modal */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Workspace"
        description="This action cannot be undone. All datasets, reports, and settings will be permanently deleted."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors">
              Delete workspace
            </button>
          </>
        }
      >
        <div className="p-4 rounded-xl bg-rose-500/8 border border-rose-500/20 text-xs text-rose-300">
          Type <strong>InsightAI HQ</strong> to confirm deletion.
          <input placeholder="InsightAI HQ" className="mt-3 w-full px-3 py-2 rounded-lg bg-white/4 border border-white/8 text-white placeholder:text-slate-600 focus:outline-none text-white" />
        </div>
      </Modal>
    </div>
  );
}
