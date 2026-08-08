"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#060512] flex items-center justify-center p-6 relative overflow-hidden font-sans text-[#f3f1fb]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.25),rgba(139,92,246,0.05)_45%,transparent_70%)] filter blur-[10px] pointer-events-none" />

      {/* Card */}
      <div className="w-full max-w-[420px] bg-[#0d0c1e] border border-white/9 rounded-[22px] p-9 relative z-10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)]">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-2 group">
          <div className="brand-mark group-hover:shadow-[0_0_24px_rgba(139,92,246,0.7)] transition-all" />
          <span className="font-display font-semibold text-xl text-white">Nimbus</span>
        </Link>

        <h1 className="font-display text-2xl font-semibold text-center text-white mt-4 mb-1">
          Create your account
        </h1>
        <p className="text-center text-[#9d98bb] text-sm mb-7">
          Start your 14-day free trial. No credit card required.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div className="p-3 rounded-xl bg-[#f87171]/10 border border-[#f87171]/30 text-[#f87171] text-xs">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-[#9d98bb] mb-1.5 font-medium">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Ellis"
              required
              className="w-full bg-[#0a0918] border border-white/9 rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#9d98bb] mb-1.5 font-medium">Work email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan@company.com"
              required
              className="w-full bg-[#0a0918] border border-white/9 rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-[#9d98bb] mb-1.5 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full bg-[#0a0918] border border-white/9 rounded-xl px-3.5 py-3 text-sm text-[#f3f1fb] focus:outline-none focus:border-[#8b5cf6] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-[14.5px] text-white bg-gradient-to-r from-[#8b5cf6] to-[#5b3df0] shadow-[0_6px_24px_-6px_rgba(139,92,246,0.55)] hover:shadow-[0_8px_30px_-4px_rgba(139,92,246,0.65)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Get Started Free"
            )}
          </button>
        </form>

        <p className="text-center mt-7 text-xs text-[#9d98bb]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#c9bbff] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
