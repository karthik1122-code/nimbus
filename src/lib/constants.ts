export interface ActivityLog {
  id: string;
  timestamp: string;
  status: "In Queue" | "Processed" | "Paid" | "Validated" | "Updated" | "Format" | "Failed";
  source: string;
  dataType: string;
  notes: string;
  amount?: string;
}

export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "LOG-9081",
    timestamp: "2026-08-08 14:24",
    status: "In Queue",
    source: "$ 3,470.90",
    dataType: "CRM Lead Sync",
    notes: "Validated",
  },
  {
    id: "LOG-9080",
    timestamp: "2026-08-08 14:18",
    status: "Processed",
    source: "Traffic Event Stream",
    dataType: "Web Analytics",
    notes: "Updated",
  },
  {
    id: "LOG-9079",
    timestamp: "2026-08-08 13:50",
    status: "Paid",
    source: "Bounce Audit Report",
    dataType: "CRM Pipeline",
    notes: "Format",
  },
  {
    id: "LOG-9078",
    timestamp: "2026-08-08 13:12",
    status: "In Queue",
    source: "Customer Support Entry",
    dataType: "CRM Support",
    notes: "Updated",
  },
  {
    id: "LOG-9077",
    timestamp: "2026-08-08 12:45",
    status: "Processed",
    source: "Stripe Billing Feed",
    dataType: "Financial Logs",
    notes: "Validated",
  },
  {
    id: "LOG-9076",
    timestamp: "2026-08-08 11:30",
    status: "Paid",
    source: "AI Lead Generation",
    dataType: "Outreach Bot",
    notes: "Format",
  },
  {
    id: "LOG-9075",
    timestamp: "2026-08-08 10:15",
    status: "Processed",
    source: "Database ETL Pipeline",
    dataType: "Postgres Sync",
    notes: "Updated",
  },
];

export const MOCK_METRICS = [
  {
    title: "Total AI Tasks Processed",
    value: "2,849,120",
    change: "+18.4%",
    positive: true,
    description: "vs. previous month",
  },
  {
    title: "Active Autonomous Agents",
    value: "148 / 150",
    change: "+6 new",
    positive: true,
    description: "98.6% uptime operational",
  },
  {
    title: "Average Queue Latency",
    value: "142 ms",
    change: "-34 ms",
    positive: true,
    description: "Ultra-fast execution velocity",
  },
  {
    title: "Automated Revenue Saved",
    value: "$428,950",
    change: "+24.2%",
    positive: true,
    description: "Estimated labor offset",
  },
];

export const MOCK_AI_INSIGHTS = [
  {
    id: "INS-01",
    title: "High-volume conversion spike in CRM Lead Sync",
    category: "Anomaly Detection",
    time: "10 mins ago",
    impact: "High",
    summary: "AI agent detected 42% higher qualified lead intake from inbound web traffic compared to the 30-day baseline.",
    actionText: "Trigger Auto-Nurture Workflow",
  },
  {
    id: "INS-02",
    title: "Database Index Bottleneck Avoided",
    category: "System Optimization",
    time: "45 mins ago",
    impact: "Medium",
    summary: "Auto-indexing agent rerouted read-heavy queries to replica pool, reducing API response times by 85ms.",
    actionText: "View Performance Graph",
  },
  {
    id: "INS-03",
    title: "Customer Support Resolution Automation",
    category: "Efficiency Drivers",
    time: "2 hours ago",
    impact: "High",
    summary: "94.2% of tier-1 support tickets resolved autonomously without human intervention.",
    actionText: "Export Sentiment Report",
  },
];

export const NAV_ITEMS = [
  {
    category: "General",
    items: [
      { name: "Overview", href: "/dashboard", icon: "LayoutDashboard" },
      { name: "Reports", href: "/reports", icon: "FileText" },
      { name: "Wallets & Billing", href: "/billing", icon: "Wallet" },
      { name: "Transactions", href: "/data", icon: "ArrowLeftRight" },
    ],
  },
  {
    category: "Mentors & Intelligence",
    items: [
      { name: "AI Insights", href: "/ai-insights", icon: "Sparkles" },
      { name: "Analytics", href: "/analytics", icon: "BarChart3" },
    ],
  },
  {
    category: "System & Account",
    items: [
      { name: "Settings", href: "/settings", icon: "Settings" },
      { name: "Sign Out", href: "/login", icon: "LogOut" },
    ],
  },
];
