"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  PieChart as PieIcon,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RiskAssessmentPage() {
  const [selectedCompany, setSelectedCompany] = useState("abc");

  const companies: Record<string, any> = {
    abc: {
      name: "ABC Industries Ltd.",
      industry: "Manufacturing",
      gst: "19ABCDE1234F1Z5",
      score: 91,
      tier: "AAA — LOW RISK",
      badgeVariant: "aaa",
      factors: {
        paymentHistory: 95,
        companyStability: 92,
        invoiceHistory: 90,
        verification: 100,
      },
      recommendedAdvance: "Up to 92%",
      yieldBand: "7.8% - 8.5%",
      pdRate: "0.08%",
    },
    techmart: {
      name: "TechMart Pvt Ltd",
      industry: "Retail & Electronics",
      gst: "29AABCT1234Q1Z8",
      score: 84,
      tier: "AA — MODERATE RISK",
      badgeVariant: "aa",
      factors: {
        paymentHistory: 88,
        companyStability: 85,
        invoiceHistory: 82,
        verification: 100,
      },
      recommendedAdvance: "Up to 88%",
      yieldBand: "9.5% - 11.0%",
      pdRate: "0.45%",
    },
    global: {
      name: "Global Exports",
      industry: "Export & Trade",
      gst: "06AAACG9876P1Z3",
      score: 78,
      tier: "A — MODERATE",
      badgeVariant: "a",
      factors: {
        paymentHistory: 80,
        companyStability: 79,
        invoiceHistory: 75,
        verification: 100,
      },
      recommendedAdvance: "Up to 85%",
      yieldBand: "11.5% - 13.0%",
      pdRate: "1.2%",
    },
  };

  const current = companies[selectedCompany];

  const factorBarData = [
    { name: "Payment History", score: current.factors.paymentHistory },
    { name: "Company Stability", score: current.factors.companyStability },
    { name: "Invoice History", score: current.factors.invoiceHistory },
    { name: "Verification", score: current.factors.verification },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header with Demo Disclosure */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
                Risk Assessment Engine
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full">
                Demo Risk Assessment
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Hackathon prototype scoring module: evaluates GST filing consistency, debtor balance sheet ratios, and historical repayment cycles.
            </p>
          </div>

          {/* Company Picker */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCompany("abc")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCompany === "abc"
                  ? "bg-[#00C896] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              ABC Industries
            </button>
            <button
              onClick={() => setSelectedCompany("techmart")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCompany === "techmart"
                  ? "bg-[#00C896] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              TechMart
            </button>
            <button
              onClick={() => setSelectedCompany("global")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCompany === "global"
                  ? "bg-[#00C896] text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Global Exports
            </button>
          </div>
        </div>

        {/* Primary Risk Card (Matching Section 11) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-md">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0B1720]">{current.name}</h2>
                  <span className="text-xs text-slate-500">({current.industry})</span>
                </div>
                <p className="text-xs font-mono text-slate-500 mt-0.5">GSTIN: {current.gst}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Risk Score</span>
                <span className="text-3xl font-black text-[#0B1720]">
                  {current.score} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </span>
              </div>
              <Badge variant={current.badgeVariant} size="lg">
                {current.tier}
              </Badge>
            </div>
          </div>

          {/* 4 Factor Breakdown (Matching Section 11) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Scoring Factors Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">Payment History</span>
                <span className="text-2xl font-black text-[#0B1720]">{current.factors.paymentHistory}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                  <div
                    className="bg-[#00C896] h-1.5 rounded-full"
                    style={{ width: `${current.factors.paymentHistory}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">Company Stability</span>
                <span className="text-2xl font-black text-[#0B1720]">{current.factors.companyStability}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                  <div
                    className="bg-[#00C896] h-1.5 rounded-full"
                    style={{ width: `${current.factors.companyStability}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">Invoice History</span>
                <span className="text-2xl font-black text-[#0B1720]">{current.factors.invoiceHistory}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                  <div
                    className="bg-[#00C896] h-1.5 rounded-full"
                    style={{ width: `${current.factors.invoiceHistory}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">Verification</span>
                <span className="text-2xl font-black text-[#00C896]">{current.factors.verification}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2">
                  <div
                    className="bg-[#00C896] h-1.5 rounded-full"
                    style={{ width: `${current.factors.verification}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Underwriting Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
              <span className="text-slate-500 block">Recommended Advance Rate</span>
              <span className="font-bold text-emerald-800 text-lg block mt-0.5">
                {current.recommendedAdvance}
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 block">Suggested Yield Band</span>
              <span className="font-bold text-slate-900 text-lg block mt-0.5">
                {current.yieldBand}
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-slate-500 block">Implied Default Probability</span>
              <span className="font-bold text-slate-900 text-lg block mt-0.5">
                {current.pdRate}
              </span>
            </div>
          </div>
        </div>

        {/* Risk Tiers Reference Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#0B1720]">Inflow Tier Standard Definitions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <span className="font-bold text-emerald-800 block text-sm">AAA (90–100)</span>
              <p className="text-slate-600 mt-1">Tier-1 Blue Chip Corporate. Lowest default risk. Advance up to 92%.</p>
            </div>
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
              <span className="font-bold text-blue-800 block text-sm">AA (80–89)</span>
              <p className="text-slate-600 mt-1">Established Enterprise. Low default risk. Advance up to 88%.</p>
            </div>
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <span className="font-bold text-amber-800 block text-sm">A (70–79)</span>
              <p className="text-slate-600 mt-1">Mid-Cap Corporate. Moderate buffer required. Advance up to 85%.</p>
            </div>
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
              <span className="font-bold text-rose-800 block text-sm">BBB (&lt; 70)</span>
              <p className="text-slate-600 mt-1">Emerging MSME. Higher yield required. Advance up to 80%.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
