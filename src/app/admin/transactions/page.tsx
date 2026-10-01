import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowDownLeft, ArrowUpRight, Download, CreditCard } from "lucide-react";
import { MetricCard } from "@/components/ui/MetricCard";

const transactions = [
  {
    id: "TX-9001",
    date: "30 Sep 2026, 09:20:45",
    title: "Advance Payout — Supplier",
    sub: "INV-2026-001 | Ravi Electricals → ABC Industries",
    type: "DEBIT",
    amount: "₹4,60,000",
    status: "Success",
    party: "Escrow → Supplier",
  },
  {
    id: "TX-9002",
    date: "30 Sep 2026, 09:18:31",
    title: "Investor Fund Lock",
    sub: "INV-2026-001 | Growth Fund Capital",
    type: "CREDIT",
    amount: "₹4,60,000",
    status: "Success",
    party: "Investor → Escrow",
  },
  {
    id: "TX-8982",
    date: "22 Sep 2026, 14:10:12",
    title: "Advance Payout — Supplier",
    sub: "INV-2026-002 | Ravi Electricals → TechMart",
    type: "DEBIT",
    amount: "₹2,95,000",
    status: "Success",
    party: "Escrow → Supplier",
  },
  {
    id: "TX-8956",
    date: "15 Sep 2026, 11:44:08",
    title: "Platform Service Fee",
    sub: "INV-2026-001 | 0.5% of advance amount",
    type: "CREDIT",
    amount: "₹2,300",
    status: "Success",
    party: "Escrow → Platform",
  },
  {
    id: "TX-8941",
    date: "10 Sep 2026, 09:30:00",
    title: "Repayment Received",
    sub: "INV-2025-089 | ABC Corp → Platform",
    type: "CREDIT",
    amount: "₹7,50,000",
    status: "Success",
    party: "Buyer → Escrow",
  },
  {
    id: "TX-8920",
    date: "08 Sep 2026, 16:10:55",
    title: "Investor Return Disbursed",
    sub: "INV-2025-089 | Growth Fund Capital",
    type: "DEBIT",
    amount: "₹7,98,000",
    status: "Success",
    party: "Escrow → Investor",
  },
  {
    id: "TX-8901",
    date: "03 Sep 2026, 08:55:20",
    title: "Advance Payout — Supplier",
    sub: "INV-2025-089 | Apex Micro Systems",
    type: "DEBIT",
    amount: "₹6,90,000",
    status: "Pending",
    party: "Escrow → Supplier",
  },
];

export default function AdminTransactionsPage() {
  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              Platform Transactions
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              All escrow movements — payouts, settlements, and fee collections
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Total Volume (Sep)"
            value="₹38,55,300"
            trend={{ value: 12.4, isPositive: true }}
            icon={<CreditCard className="w-5 h-5 text-emerald-600" />}
            iconBgColor="bg-emerald-50"
          />
          <MetricCard
            title="Funds Disbursed"
            value="₹24,05,000"
            trend={{ value: 8.1, isPositive: true }}
            icon={<ArrowUpRight className="w-5 h-5 text-blue-600" />}
            iconBgColor="bg-blue-50"
          />
          <MetricCard
            title="Platform Fees Earned"
            value="₹1,22,650"
            trend={{ value: 5.3, isPositive: true }}
            icon={<ArrowDownLeft className="w-5 h-5 text-purple-600" />}
            iconBgColor="bg-purple-50"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">Tx ID</th>
                <th className="py-3.5 px-6">Details</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Party</th>
                <th className="py-3.5 px-6 text-right">Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs text-slate-500">{tx.id}</td>
                  <td className="py-4 px-6 max-w-xs">
                    <div className="font-semibold text-[#0B1720] text-sm">{tx.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">{tx.sub}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      tx.type === "CREDIT"
                        ? "text-emerald-700"
                        : "text-rose-600"
                    }`}>
                      {tx.type === "CREDIT" ? (
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      )}
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">{tx.party}</td>
                  <td className={`py-4 px-6 text-right font-bold text-sm ${
                    tx.type === "CREDIT" ? "text-emerald-700" : "text-[#0B1720]"
                  }`}>
                    {tx.type === "CREDIT" ? "+" : "-"}{tx.amount}
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={tx.status === "Success" ? "success" : "pending"}>
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
