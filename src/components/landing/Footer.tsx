"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-white/5 bg-[#060512]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-white/5">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="brand-mark" />
              <span className="font-display font-semibold text-xl text-white">Nimbus</span>
            </Link>
            <p className="text-[13.5px] text-[#9d98bb] mt-3 max-w-[260px] leading-relaxed">
              The AI agent platform that handles the repetitive parts of running a company.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#615c82] font-mono mb-3.5 font-semibold">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm text-[#9d98bb]">
                <li><Link href="/services" className="hover:text-[#c9bbff] transition-colors">Services</Link></li>
                <li><Link href="/pricing" className="hover:text-[#c9bbff] transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#c9bbff] transition-colors">Dashboard</Link></li>
                <li><Link href="/reviews" className="hover:text-[#c9bbff] transition-colors">Reviews</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#615c82] font-mono mb-3.5 font-semibold">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm text-[#9d98bb]">
                <li><Link href="/contact" className="hover:text-[#c9bbff] transition-colors">Contact</Link></li>
                <li><Link href="/login" className="hover:text-[#c9bbff] transition-colors">Sign in</Link></li>
                <li><Link href="/signup" className="hover:text-[#c9bbff] transition-colors">Get started</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#615c82] font-mono mb-3.5 font-semibold">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm text-[#9d98bb]">
                <li><Link href="#" className="hover:text-[#c9bbff] transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-[#c9bbff] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-[12.5px] text-[#615c82]">
          <span>© 2026 Nimbus Labs, Inc.</span>
          <span>Built for teams who&apos;d rather build.</span>
        </div>
      </div>
    </footer>
  );
}
