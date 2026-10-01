"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, ArrowDownCircle, Lock, Building2 } from "lucide-react";

export default function SupplierPayoutsPage() {
  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Payouts & Escrow Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Simulated tripartite escrow facility ensuring guaranteed settlement and instant liquidity
          </p>
        </div>

        {/* Escrow Active Card (Matching Section 16) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Escrow Account #ESC-2026-001
              </span>
              <h2 className="text-xl font-bold text-[#0B1720] mt-1">
                Invoice INV-2026-001 (ABC Industries Ltd.)
              </h2>
            </div>
            <Badge variant="escrow" size="lg" />
          </div>

          {/* 5 Financial Metrics from Section 16 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8">
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Invoice Value</span>
              <span className="text-lg sm:text-xl font-bold text-slate-900">₹5,00,000</span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Investor Funding</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-700">₹4,60,000</span>
            </div>

            <div className="p-4 bg-emerald-50/90 rounded-2xl border border-emerald-200">
              <span className="text-emerald-800 text-xs font-semibold block mb-1">
                Supplier Payout
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-700">
                ₹4,60,000
              </span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Expected Repayment</span>
              <span className="text-lg sm:text-xl font-bold text-slate-900">₹5,00,000</span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Investor Profit</span>
              <span className="text-lg sm:text-xl font-bold text-teal-700">₹40,000</span>
            </div>
          </div>

          {/* Escrow Status Flow */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Simulated Disbursal Timeline
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">1. Escrow Created</p>
                  <p className="text-slate-500 text-[11px]">Growth Fund deposited ₹4,60,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">2. Payout Released</p>
                  <p className="text-slate-500 text-[11px]">Instant NEFT simulation completed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">3. Corporate Settlement</p>
                  <p className="text-slate-500 text-[11px]">Awaiting Day-90 Buyer Repayment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payout History Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-sm text-[#0B1720]">Disbursed Payout Records</h3>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Invoice</th>
                <th className="py-3 px-6">Investor Source</th>
                <th className="py-3 px-6">Amount Disbursed</th>
                <th className="py-3 px-6">UTR / Reference</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-3.5 px-6 text-slate-600">30 Sep 2026, 09:20</td>
                <td className="py-3.5 px-6 font-bold text-slate-800">INV-2026-001</td>
                <td className="py-3.5 px-6 text-slate-700">Growth Fund Capital</td>
                <td className="py-3.5 px-6 font-bold text-emerald-700">₹4,60,000</td>
                <td className="py-3.5 px-6 font-mono text-slate-500">INF9928341029</td>
                <td className="py-3.5 px-6">
                  <Badge variant="success" size="sm">Completed</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
