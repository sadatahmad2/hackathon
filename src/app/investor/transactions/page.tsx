import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export default function InvestorTransactionsPage() {
  const transactions = [
    {
      id: "TX-1002",
      date: "30 Sep 2026, 09:15:20",
      description: "Invoice Disbursal to Escrow",
      ref: "INV-2026-001 (ABC Industries)",
      type: "DEBIT",
      amount: "₹4,60,000",
      status: "Settled",
    },
    {
      id: "TX-0891",
      date: "15 Sep 2026, 17:00:00",
      description: "Day-90 Full Repayment + Yield Credit",
      ref: "INV-2025-098 (TechMart Pvt Ltd)",
      type: "CREDIT",
      amount: "₹3,20,000",
      status: "Settled",
    },
    {
      id: "TX-0810",
      date: "01 Sep 2026, 10:00:00",
      description: "Wallet Funding via RTGS",
      ref: "HDFC Bank Settlement",
      type: "CREDIT",
      amount: "₹50,00,000",
      status: "Settled",
    },
  ];

  return (
    <DashboardLayout role="INVESTOR">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              Investor Transactions
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Audit log of capital deployments, escrow transfers, and returns
            </p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4 mr-1" />}>
            Export Statement
          </Button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">Transaction ID</th>
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-mono font-bold text-slate-800">{tx.id}</td>
                  <td className="py-4 px-6 text-slate-500">{tx.date}</td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-900">{tx.description}</p>
                    <span className="text-[11px] text-slate-400">{tx.ref}</span>
                  </td>
                  <td className="py-4 px-6 font-bold">
                    {tx.type === "CREDIT" ? (
                      <span className="text-emerald-700">CREDIT</span>
                    ) : (
                      <span className="text-blue-700">DEBIT</span>
                    )}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 text-sm">{tx.amount}</td>
                  <td className="py-4 px-6 text-right">
                    <Badge variant="success" size="sm">{tx.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
