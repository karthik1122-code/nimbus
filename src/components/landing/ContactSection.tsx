"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Check, Loader2, ArrowRight } from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
        {/* Left Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,38px)] leading-tight text-white tracking-tight mb-4">
            Let&apos;s talk <em className="hero-title-serif font-normal text-[#c9bbff]">automation.</em>
          </h2>
          <p className="text-[#9d98bb] text-base leading-relaxed mb-8 max-w-md">
            Tell us what&apos;s eating your team&apos;s week. We&apos;ll show you which agent to stand up first.
          </p>

          <div className="space-y-6">
            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#c9bbff] flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#615c82] font-mono">Email</div>
                <div className="text-[14.5px] text-[#f3f1fb] mt-0.5">hello@nimbus.ai</div>
              </div>
            </div>

            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#c9bbff] flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#615c82] font-mono">Phone</div>
                <div className="text-[14.5px] text-[#f3f1fb] mt-0.5">+1 (415) 555-0148</div>
              </div>
            </div>

            <div className="flex gap-3.5 items-start">
              <div className="w-9 h-9 rounded-xl bg-[#131228] border border-white/10 flex items-center justify-center text-[#c9bbff] flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#615c82] font-mono">Studio</div>
                <div className="text-[14.5px] text-[#f3f1fb] mt-0.5">San Francisco, CA</div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/6">
            <Link href="/contact">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#c9bbff] hover:text-white font-medium transition-colors">
                Need sales, enterprise SLAs, or custom deployments? Visit Full Contact Page <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d0c1e] border border-white/9 rounded-[22px] p-7 sm:p-8"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
