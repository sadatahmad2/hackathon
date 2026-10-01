"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  TrendingUp,
  Building2,
  Clock,
  CheckCircle2,
  Lock,
  Zap,
  ChevronRight,
  Banknote,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col bg-[#03131A] text-white selection:bg-[#00C896] selection:text-black">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle background glow and grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,200,150,0.18),rgba(255,255,255,0))] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-[#006B5B]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-sm shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00C896]" />
                <span>Trusted • Transparent • Fast</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Turn Unpaid Invoices into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35E6B0] to-[#00C896]">
                  Growth Today.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Inflow connects MSME suppliers with trusted investors through invoice discounting. Get funds within 24 hours instead of waiting 90–180 days.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/login">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
                    className="px-7 rounded-xl font-bold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Feature Highlights Pill */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
                  <span>Instant AI Risk Scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
                  <span>Zero Real Money Risk (Simulated)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
                  <span>Cryptographic Audit Ledger</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Graphics (Matching Reference Screen 1) */}
            <div className="lg:col-span-5 relative">
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 rounded-3xl blur-2xl" />

              {/* Visual Card Frame */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#0A2633]/90 to-[#04161E]/95 border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
                {/* Background skyline graphics simulation */}
                <div className="absolute top-0 right-0 w-full h-44 bg-[radial-gradient(ellipse_at_top_right,rgba(0,200,150,0.15),transparent)] rounded-t-3xl pointer-events-none" />

                {/* Sub-Card 1: Invoice Header */}
                <div className="relative bg-[#03131A]/90 border border-white/10 rounded-2xl p-5 mb-4 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                        INVOICE
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">INV-2026-001</h4>
                    </div>
                    <Badge variant="verified" size="sm" />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px]">Buyer</span>
                      <p className="font-semibold text-white mt-0.5">ABC Industries Ltd.</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Amount</span>
                      <p className="font-bold text-emerald-400 text-sm mt-0.5">₹5,00,000</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Due in 90 days
                    </span>
                    <span className="text-emerald-400 font-medium">AAA — Low Risk</span>
                  </div>
                </div>

                {/* Sub-Card 2: Hero Advance Highlight Card (Green Glowing Gradient) */}
                <div className="relative bg-gradient-to-r from-[#006B5B] to-[#00C896] rounded-2xl p-5 text-white shadow-xl shadow-emerald-950/40">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-emerald-100 uppercase tracking-wide">
                        Instant Funding Available
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight">
                        ₹4,60,000
                      </h3>
                      <p className="text-xs text-emerald-100 font-medium mt-0.5">
                        within 24 hours (92% Advance Rate)
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Micro Chart Line Graphic */}
                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="font-medium text-white/90">Annual Yield: 8.0%</span>
                    <span className="inline-flex items-center gap-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                      Best Bid <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Bottom mini ticker */}
                <div className="mt-4 flex items-center justify-between px-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C896] animate-ping" />
                    Live Bidding Active
                  </span>
                  <span className="text-slate-300 font-mono">3 Investor Offers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Metrics Bar (Matching Reference Screen 1) */}
      <section className="border-y border-white/10 bg-[#020E13] py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="border-r border-white/5 pr-4">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                ₹500Cr+
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Invoices Financed
              </div>
            </div>

            <div className="border-r border-white/5 pr-4">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                5,000+
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Verified Businesses
              </div>
            </div>

            <div className="border-r border-white/5 pr-4">
              <div className="text-3xl sm:text-4xl font-black text-[#00C896] tracking-tight">
                12–18%
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Avg. Annual Returns
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                98%
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Successful Payouts
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs tracking-widest uppercase font-semibold text-emerald-400/80">
            Fueling Businesses Moving Forward
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-[#03131A] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00C896]">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              From Invoice Upload to Instant Liquidity
            </h2>
            <p className="text-sm text-slate-400">
              Transform receivables stuck in 90-day buyer payment terms into working cash within hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00C896]/40 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00C896] flex items-center justify-center font-bold text-lg mb-5">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Upload Invoice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supplier uploads GST tax invoice and delivery challan. Automatic data extraction verifies buyer details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00C896]/40 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00C896] flex items-center justify-center font-bold text-lg mb-5">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Risk Assessment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our machine learning risk engine evaluates credit history, financial filings, and assigns AAA to BBB risk tiers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00C896]/40 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00C896] flex items-center justify-center font-bold text-lg mb-5">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Live Investor Auction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verified investors compete to fund the invoice. Transparent bids drive advance rates up and discount yield down.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00C896]/40 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00C896] flex items-center justify-center font-bold text-lg mb-5">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Escrow & Disbursal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accept the best bid, funds transfer into secure escrow, and instant working capital is credited to supplier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Suppliers & Investors Section */}
      <section className="py-20 bg-gradient-to-b from-[#03131A] to-[#041A24] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          {/* For Suppliers */}
          <div id="suppliers" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00C896]">For Suppliers</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Unlock Working Capital in 24 Hours</h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                Say goodbye to long payment cycles. Upload your verified invoices, get them approved by our AI Risk Engine, and access funds almost instantly. 
                Keep your cash flow moving and focus on growing your business without the wait.
              </p>
              <ul className="space-y-3 pt-2 text-sm text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#00C896]" /> Instant Liquidity</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#00C896]" /> No Hidden Fees</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#00C896]" /> Bank-grade Security</li>
              </ul>
              <div className="pt-4">
                <Link href="/login">
                  <Button variant="primary">Register as Supplier</Button>
                </Link>
              </div>
            </div>
            <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden h-full flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-4 opacity-10"><Building2 className="w-32 h-32 text-emerald-400" /></div>
               <h3 className="text-2xl font-bold text-white mb-3">Grow without limits.</h3>
               <p className="text-emerald-100/70 text-sm leading-relaxed">Take control of your receivables and ensure your supply chain never stops due to delayed payments. Our platform integrates seamlessly with your existing workflow to provide capital exactly when you need it.</p>
            </div>
          </div>

          {/* For Investors */}
          <div id="investors" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-8">
            <div className="order-2 md:order-1 bg-blue-900/20 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden h-full flex flex-col justify-center">
               <div className="absolute top-0 left-0 p-4 opacity-10"><TrendingUp className="w-32 h-32 text-blue-400" /></div>
               <h3 className="text-2xl font-bold text-white mb-3">High-yield short-term assets.</h3>
               <p className="text-blue-100/70 text-sm leading-relaxed">Diversify your portfolio with verified, low-risk invoices from growing MSMEs backed by strong corporate buyers. Enjoy secure, asset-backed returns that outperform traditional fixed-income investments.</p>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">For Investors</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Invest in Verified Invoices</h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                Access a curated marketplace of high-quality invoices. Earn competitive short-term yields (12-18% annualized) while supporting the backbone of the economy. 
                Our platform provides full transparency with cryptographic audit logs.
              </p>
              <ul className="space-y-3 pt-2 text-sm text-slate-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Curated Marketplace</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> AI Risk Scoring (AAA to BBB)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Secure Escrow Disbursal</li>
              </ul>
              <div className="pt-4">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none">Start Investing</Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <PublicFooter />

    </div>
  );
}
