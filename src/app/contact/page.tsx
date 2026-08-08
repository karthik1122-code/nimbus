"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Check, Loader2, ChevronDown, MessageSquare, Clock, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const faqs = [
  {
    q: "How fast can we set up a Nimbus agent?",
    a: "Most teams connect their data sources (CRM, Zendesk, or Postgres) and deploy their first autonomous agent in under 10 minutes.",
  },
  {
    q: "How does the agent handoff logic work?",
    a: "If an agent encounters a low-confidence scenario or complex exception, it flags the item in your Escalations queue with full transcript and context.",
  },
  {
    q: "Is our data used to train public LLM models?",
    a: "No. Your data is isolated, encrypted, and strictly private. Nimbus is SOC 2 Type II and GDPR compliant.",
  },
  {
    q: "Can we request custom integrations?",
    a: "Yes! Enterprise plans include custom API connectors, dedicated SLA guarantees, and custom fine-tuned model weights.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Enter a valid email.";
    if (message.trim().length < 10) errs.message = "Tell us a little more (10+ characters).";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#060512] text-[#f3f1fb] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#c9bbff] block">
              Contact & Support
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Get in touch with <em className="hero-title-serif font-normal text-[#c9bbff]">Nimbus.</em>
            </h1>
            <p className="text-[#9d98bb] text-base leading-relaxed max-w-xl mx-auto">
              Have questions about enterprise plans, security compliance, or standing up custom AI workflows? Our automation team is here to help.
            </p>
          </div>

          {/* Form + Direct Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
            {/* Info Column */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-display text-2xl font-semibold text-white">Direct Communication</h2>
                <div className="space-y-5">
                  <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-[#0d0c1e] border border-white/8">
                    <div className="w-10 h-10 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#c9bbff] flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#615c82] font-mono font-semibold">General & Enterprise Email</div>
                      <div className="text-sm font-semibold text-[#f3f1fb] mt-0.5">hello@nimbus.ai</div>
                      <p className="text-xs text-[#9d98bb] mt-0.5">Avg response time: under 2 hours</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-[#0d0c1e] border border-white/8">
                    <div className="w-10 h-10 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#c9bbff] flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#615c82] font-mono font-semibold">Sales & Support Hotline</div>
                      <div className="text-sm font-semibold text-[#f3f1fb] mt-0.5">+1 (415) 555-0148</div>
                      <p className="text-xs text-[#9d98bb] mt-0.5">Mon–Fri, 8am–6pm PST</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start p-4 rounded-2xl bg-[#0d0c1e] border border-white/8">
                    <div className="w-10 h-10 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#c9bbff] flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#615c82] font-mono font-semibold">Headquarters</div>
                      <div className="text-sm font-semibold text-[#f3f1fb] mt-0.5">500 Howard St, San Francisco, CA 94105</div>
                      <p className="text-xs text-[#9d98bb] mt-0.5">Visitors by appointment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-[#0d0c1e] border border-white/9 rounded-[24px] p-8 space-y-6">
              <h2 className="font-display text-2xl font-semibold text-white">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#9d98bb] mb-2 font-medium">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jordan Ellis"
                      className={`w-full bg-[#0a0918] border ${errors.name ? "border-[#f87171]" : "border-white/9"} rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors`}
                    />
                    {errors.name && <span className="text-[12.5px] text-[#f87171] mt-1.5 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs text-[#9d98bb] mb-2 font-medium">Work email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@company.com"
                      className={`w-full bg-[#0a0918] border ${errors.email ? "border-[#f87171]" : "border-white/9"} rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors`}
                    />
                    {errors.email && <span className="text-[12.5px] text-[#f87171] mt-1.5 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#9d98bb] mb-2 font-medium">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Coastal Freight"
                    className="w-full bg-[#0a0918] border border-white/9 rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9d98bb] mb-2 font-medium">What do you want to automate?</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the workflow…"
                    rows={4}
                    className={`w-full bg-[#0a0918] border ${errors.message ? "border-[#f87171]" : "border-white/9"} rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors resize-y min-h-[100px]`}
                  />
                  {errors.message && <span className="text-[12.5px] text-[#f87171] mt-1.5 block">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] shadow-[0_6px_24px_-6px_rgba(139,92,246,0.55)] hover:shadow-[0_8px_30px_-4px_rgba(139,92,246,0.65)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#86efac] text-sm"
                  >
                    <Check className="w-4 h-4 flex-shrink-0" />
                    Message sent — we&apos;ll reply within one business day.
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Interactive FAQ Section */}
          <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-white/6">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#c9bbff]">Got Questions?</span>
              <h2 className="font-display text-3xl font-semibold text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#0d0c1e] border border-white/8 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-white text-base hover:text-[#c9bbff] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#c9bbff] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 text-sm text-[#9d98bb] leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
