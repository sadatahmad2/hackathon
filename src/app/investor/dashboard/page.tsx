"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Invoice } from "@/types";
import {
  TrendingUp,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Store,
  PieChart as PieIcon,
  BarChart2,
  Building2,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function InvestorDashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState({
    totalInvested: 0,
    expectedReturns: 0,
    activeInvestments: 0,
    repaymentRate: 0,
  });
  
  const [riskData, setRiskData] = useState<{name: string, value: number, color: string}[]>([]);
  const [monthlyReturns, setMonthlyReturns] = useState<{month: string, returns: number}[]>([]);

  useEffect(() => {
    // This will later fetch real data from Supabase API
    // For now, it's empty since there is no real data yet
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.invoices) {
          setInvoices(data.invoices.slice(0, 4));
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <DashboardLayout role="INVESTOR">
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              Investor Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Portfolio overview, accrued yields, and active invoice bids
            </p>
          </div>

          <Link href="/investor/marketplace">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Store className="w-4 h-4 mr-1" />}
              className="rounded-xl px-5 font-semibold text-white shadow-md shadow-emerald-500/20"
            >
              Browse Marketplace
            </Button>
          </Link>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Total Invested"
            value={`₹${stats.totalInvested.toLocaleString("en-IN")}`}
            trend={{ value: 0, isPositive: true }}
            icon={<Wallet className="w-5 h-5 text-blue-600" />}
            iconBgColor="bg-blue-50"
          />
          <MetricCard
            title="Expected Returns"
            value={`₹${stats.expectedReturns.toLocaleString("en-IN")}`}
            trend={{ value: 0, isPositive: true }}
            icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
            iconBgColor="bg-emerald-50"
          />
          <MetricCard
            title="Active Investments"
            value={`${stats.activeInvestments}`}
            trend={{ value: 0, isPositive: true }}
            icon={<Building2 className="w-5 h-5 text-teal-600" />}
            iconBgColor="bg-teal-50"
          />
          <MetricCard
            title="Repayment Rate"
            value={`${stats.repaymentRate}%`}
            trend={{ value: 0, isPositive: true }}
            icon={<CheckCircle2 className="w-5 h-5 text-[#00C896]" />}
            iconBgColor="bg-emerald-50"
          />
        </div>

        {/* Charts Row: Monthly Returns + Risk Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Monthly Returns Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-[#0B1720]">Monthly Returns Accrual</h3>
                <p className="text-xs text-slate-400 mt-0.5">Net interest profit yield in Lakhs (₹)</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                0.0% Net IRR
              </span>
            </div>

            <div className="h-56 w-full pt-2 flex items-center justify-center text-slate-400 text-sm">
              {monthlyReturns.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReturns}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} unit="L" />
                    <Tooltip
                      formatter={(val: any) => [`₹${val} Lakhs`, "Monthly Yield"]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }}
                    />
                    <Bar dataKey="returns" fill="#00C896" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>No monthly data available yet</p>
              )}
            </div>
          </div>

          {/* Risk Allocation Donut */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#0B1720]">Risk Allocation</h3>
              <span className="text-xs text-slate-400 font-medium">Portfolio Balance</span>
            </div>

            <div className="flex flex-col items-center justify-center py-1">
              <div className="relative w-44 h-44 flex items-center justify-center text-slate-400 text-sm">
                {riskData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          formatter={(val: any) => [`${val}%`, "Share"]}
                          contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }}
                        />
                        <Pie
                          data={riskData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={4}
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-bold text-[#0B1720]">0%</span>
                      <span className="text-[10px] uppercase font-semibold text-emerald-600">N/A</span>
                    </div>
                  </>
                ) : (
                  <p>No investments</p>
                )}
              </div>

              {riskData.length > 0 && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs mt-3 w-full px-4">
                  {riskData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </span>
                      <span className="font-bold text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Marketplace Highlights */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0B1720]">Featured Invoice Opportunities</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ready for immediate capital deployment with verified purchase orders
              </p>
            </div>
            <Link
              href="/investor/marketplace"
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Explore Full Marketplace <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {invoices.length > 0 ? (
              invoices.map((inv) => (
                <div key={inv.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900">{inv.buyerName}</h4>
                        <Badge variant={inv.riskTier === "AAA" ? "aaa" : "aa"} size="sm" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{inv.buyerIndustry} • Due in {inv.tenureDays} days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Value</span>
                      <span className="font-bold text-slate-900">₹{inv.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Est. Yield</span>
                      <span className="font-black text-emerald-700">{inv.bestBidYield || "8.5"}%</span>
                    </div>
                    <Link href={`/investor/marketplace/${inv.id}/bid`}>
                      <Button variant="primary" size="sm" className="rounded-xl px-4 font-semibold">
                        Bid Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                No active invoice opportunities available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
