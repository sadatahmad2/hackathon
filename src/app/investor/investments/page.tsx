"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bid, Invoice } from "@/types";
import { Store, TrendingUp, CheckCircle2, Clock } from "lucide-react";

export default function MyInvestmentsPage() {
  const [investments, setInvestments] = useState<any[]>([
    {
      id: "inv-pos-1",
      invoiceNumber: "INV-2026-001",
      buyer: "ABC Industries Ltd.",
      supplier: "Ravi Electricals",
      investedAmount: 460000,
      expectedReturn: 40000,
      totalMaturity: 500000,
      yieldRate: "8.0%",
      tenureDays: 90,
      maturityDate: "30 Dec 2026",
      status: "ACTIVE_ESCROW",
    },
    {
      id: "inv-pos-2",
      invoiceNumber: "INV-2025-098",
      buyer: "TechMart Pvt Ltd",
      supplier: "Apex Micro Systems",
      investedAmount: 295000,
      expectedReturn: 25000,
      totalMaturity: 320000,
      yieldRate: "10.5%",
      tenureDays: 60,
      maturityDate: "15 Oct 2026",
      status: "COMPLETED",
    },
  ]);

  return (
    <DashboardLayout role="INVESTOR">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              My Investments
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Active and settled invoice discounting allocations secured by corporate debtors
            </p>
          </div>

          <Link href="/investor/marketplace">
            <Button variant="primary" size="md">
              Deploy Capital
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">Invoice</th>
                <th className="py-3.5 px-6">Corporate Debtor</th>
                <th className="py-3.5 px-6">Invested Principal</th>
                <th className="py-3.5 px-6">Expected Profit</th>
                <th className="py-3.5 px-6">Yield Rate</th>
                <th className="py-3.5 px-6">Maturity Date</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {investments.map((pos) => (
                <tr key={pos.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                    {pos.invoiceNumber}
                  </td>
                  <td className="py-4 px-6 text-slate-800 font-semibold">
                    {pos.buyer}
                    <span className="block text-[11px] text-slate-400 font-normal">
                      Supplier: {pos.supplier}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    ₹{pos.investedAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-6 font-bold text-emerald-700 text-sm">
                    +₹{pos.expectedReturn.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{pos.yieldRate}</td>
                  <td className="py-4 px-6 text-slate-600">
                    {pos.maturityDate}
                    <span className="block text-[10px] text-slate-400">{pos.tenureDays} Days</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {pos.status === "COMPLETED" ? (
                      <Badge variant="success" size="sm">Settled</Badge>
                    ) : (
                      <Badge variant="escrow" size="sm">Escrow Active</Badge>
                    )}
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
