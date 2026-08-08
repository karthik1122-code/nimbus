import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InsightAI — Enterprise AI Agents & Automated Intelligence Platform",
  description: "Automate repetitive tasks, lead generation, customer support, and real-time data entry with next-generation autonomous AI agents.",
  keywords: ["AI agents", "SaaS automation", "Enterprise AI", "Analytics", "Workflow automation"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#05030A] text-slate-100 font-sans selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}
