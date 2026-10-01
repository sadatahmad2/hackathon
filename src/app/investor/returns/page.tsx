import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/MetricCard";
import { TrendingUp, DollarSign, Wallet, ShieldCheck } from "lucide-react";

export default function InvestorReturnsPage() {
  return (
    <DashboardLayout role="INVESTOR">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Returns & Yield Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Realized cash returns and accrued annual yield from discounted receivables
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard
            title="Total Realized Profit"
            value="₹12,40,000"
            trend={{ value: 18.5, isPositive: true }}
            icon={<Wallet className="w-5 h-5 text-emerald-600" />}
            iconBgColor="bg-emerald-50"
          />
          <MetricCard
            title="Average Portfolio Yield"
            value="13.8% p.a."
            trend={{ value: 1.2, isPositive: true }}
            icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
            iconBgColor="bg-blue-50"
          />
          <MetricCard
            title="Capital Redeployment Rate"
            value="94.6%"
            trend={{ value: 3.4, isPositive: true }}
            icon={<ShieldCheck className="w-5 h-5 text-teal-600" />}
            iconBgColor="bg-teal-50"
          />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#0B1720]">Settled Return Payouts</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="py-3 px-6">Settlement Date</th>
                <th className="py-3 px-6">Invoice</th>
                <th className="py-3 px-6">Corporate Payer</th>
                <th className="py-3 px-6">Principal Returned</th>
                <th className="py-3 px-6 text-right">Net Profit Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-500">15 Sep 2026</td>
                <td className="py-4 px-6 font-mono font-bold text-slate-900">INV-2025-098</td>
                <td className="py-4 px-6 text-slate-800">TechMart Pvt Ltd</td>
                <td className="py-4 px-6 font-bold text-slate-900">₹2,95,000</td>
                <td className="py-4 px-6 text-right font-black text-emerald-700 text-sm">
                  +₹25,000 (10.5% p.a.)
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-4 px-6 text-slate-500">10 Aug 2026</td>
                <td className="py-4 px-6 font-mono font-bold text-slate-900">INV-2025-072</td>
                <td className="py-4 px-6 text-slate-800">Global Exports Ltd</td>
                <td className="py-4 px-6 font-bold text-slate-900">₹6,75,000</td>
                <td className="py-4 px-6 text-right font-black text-emerald-700 text-sm">
                  +₹75,000 (12.0% p.a.)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
