import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { ArrowDownLeft, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SupplierTransactionsPage() {
  const transactions = [
    {
      id: "TX-1004",
      date: "30 Sep 2026, 09:20:45",
      title: "Instant Advance Payout Released",
      sub: "INV-2026-001 (ABC Industries Ltd.)",
      type: "CREDIT",
      amount: "₹4,60,000",
      status: "Success",
    },
    {
      id: "TX-0982",
      date: "15 Sep 2026, 14:10:12",
      title: "Invoice Financing Advance",
      sub: "INV-2026-002 (TechMart Pvt Ltd)",
      type: "CREDIT",
      amount: "₹2,95,000",
      status: "Success",
    },
    {
      id: "TX-0941",
      date: "10 Sep 2026, 11:35:00",
      title: "Invoice Financing Advance",
      sub: "INV-2026-003 (Global Exports)",
      type: "CREDIT",
      amount: "₹6,75,000",
      status: "Success",
    },
  ];

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              Supplier Transactions
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Complete ledger log of disbursements, escrow settlements, and fees
            </p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4 mr-1" />}>
            Export CSV
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
                    <p className="font-semibold text-slate-900">{tx.title}</p>
                    <span className="text-[11px] text-slate-400">{tx.sub}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-emerald-700">{tx.type}</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 text-sm">+{tx.amount}</td>
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
