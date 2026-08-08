"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const reviews = [
  {
    quote: `"We turned off two support tools and let one Nimbus agent handle tier-1 tickets. Response time dropped from six hours to ninety seconds."`,
    avatar: "RM",
    name: "Reema Mehta",
    role: "Head of Ops, Coastal Freight",
  },
  {
    quote: `"Data entry used to eat a full day of my analyst's week. Now it's a review queue she clears in twenty minutes."`,
    avatar: "DK",
    name: "David Kwon",
    role: "Finance Lead, Alder & Co.",
  },
  {
    quote: `"The handoff logic is what sold us — agents know exactly when to loop in a human instead of guessing."`,
    avatar: "AT",
    name: "Anika Torres",
    role: "Founder, Loomwell Studio",
  },
];

export function SocialProof() {
  return (
    <section className="py-28 bg-[#0a0918] border-y border-white/5" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Head */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16 space-y-3"
        >
          <span className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-[#c9bbff] block">
            Customer notes
          </span>
          <h2 className="font-display font-semibold text-[clamp(30px,4vw,42px)] leading-[1.15] text-white tracking-tight">
            Teams running <em className="hero-title-serif font-normal text-[#c9bbff]">lean</em> on Nimbus.
          </h2>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0d0c1e] border border-white/9 rounded-[22px] p-7 flex flex-col justify-between gap-6"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex gap-1 mb-4 text-[#f0b357]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-[15px] text-[#f3f1fb] leading-relaxed italic">
                  {r.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8b5cf6] to-[#5b3df0] flex items-center justify-center font-display font-semibold text-xs text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-[12.5px] text-[#615c82]">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link to Dedicated Reviews Page */}
        <div className="mt-12 text-center">
          <Link href="/reviews">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#c9bbff] bg-[#131228] border border-white/10 hover:border-[#8b5cf6]/30 hover:bg-[#0d0c1e] transition-all">
              Read 40+ Customer Case Studies & Detailed Video Reviews <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
