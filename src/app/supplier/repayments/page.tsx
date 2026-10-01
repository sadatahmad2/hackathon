import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, CheckCircle2, Clock, Calendar } from "lucide-react";

export default function SupplierRepaymentsPage() {
  const repayments = [
    {
      invoice: "INV-2026-001",
      buyer: "ABC Industries Ltd.",
      dueAmount: "₹5,00,000",
      dueDate: "30 Dec 2026",
      status: "On Track",
      daysRemaining: "90 Days",
    },
    {
      invoice: "INV-2025-089",
      buyer: "TechMart Pvt Ltd",
      dueAmount: "₹3,20,000",
      dueDate: "15 Aug 2026",
      status: "Settled",
      daysRemaining: "Settled On-Time",
    },
    {
      invoice: "INV-2025-064",
      buyer: "Global Exports",
      dueAmount: "₹7,50,000",
      dueDate: "10 Jul 2026",
      status: "Settled",
      daysRemaining: "Settled On-Time",
    },
  ];

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Corporate Repayments
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tracking buyer settlement obligations into the Inflow Escrow account
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">Invoice</th>
                <th className="py-3.5 px-6">Buyer Obligation</th>
                <th className="py-3.5 px-6">Repayment Amount</th>
                <th className="py-3.5 px-6">Settlement Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Tenure Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {repayments.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">{r.invoice}</td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{r.buyer}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">{r.dueAmount}</td>
                  <td className="py-4 px-6 text-slate-600">{r.dueDate}</td>
                  <td className="py-4 px-6">
                    {r.status === "Settled" ? (
                      <Badge variant="success" size="sm">Settled</Badge>
                    ) : (
                      <Badge variant="pending" size="sm">On Track</Badge>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-600">
                    {r.daysRemaining}
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
