import React from "react";
import Link from "next/link";
import { InflowLogo } from "@/components/brand/InflowLogo";
import { ShieldCheck, Lock, Award, FileCheck } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-[#03131A] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <InflowLogo variant="dark" size="lg" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Inflow is India’s premier micro-enterprise invoice financing and discounting marketplace, unlocking working capital for MSMEs within 24 hours.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-400 font-medium">
              <span className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Investment Platform
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-white/10 px-3 py-1 rounded-full text-slate-300">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> 256-Bit Escrow Simulation
              </span>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#suppliers" className="hover:text-white transition-colors">For Suppliers</Link></li>
              <li><Link href="#investors" className="hover:text-white transition-colors">For Investors</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
              <li><Link href="#marketplace" className="hover:text-white transition-colors">Invoice Marketplace</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Security & Ledger</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#security" className="hover:text-white transition-colors">AI Risk Engine</Link></li>
              <li><Link href="#ledger" className="hover:text-white transition-colors">Double-Entry Ledger</Link></li>
              <li><Link href="#audit" className="hover:text-white transition-colors">Cryptographic Audit Logs</Link></li>
              <li><Link href="#escrow" className="hover:text-white transition-colors">Simulated Escrow</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#compliance" className="hover:text-white transition-colors">Compliance</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Inflow Finance Technologies Inc. Micro-Enterprise Invoice Financing Platform.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <Link href="/terms" className="hover:text-slate-400 cursor-pointer">Terms of Service</Link>
            <span className="hover:text-slate-400 cursor-pointer">RBI / Regulatory Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
