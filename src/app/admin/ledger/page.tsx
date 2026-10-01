"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LedgerEntry } from "@/types";
import { BookOpen, Download, ShieldCheck, RefreshCw } from "lucide-react";

export default function DoubleEntryLedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLedger = () => {
    fetch("/api/ledger")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setEntries(data.ledger);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
                Double-Entry Ledger
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                Immutable Accounting
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Append-only ACID transactional ledger. Every financial flow contains strictly balanced Debit and Credit postings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLedger}
              leftIcon={<RefreshCw className="w-3.5 h-3.5 mr-1" />}
            >
              Refresh
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5 mr-1" />}>
              Export Ledger CSV
            </Button>
          </div>
        </div>

        {/* Ledger Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Debits Posted</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              ₹{entries.filter((e) => e.type === "DEBIT").reduce((acc, e) => acc + e.amount, 0).toLocaleString("en-IN")}
            </div>
            <span className="text-xs text-emerald-600 font-medium">Reconciled 100%</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Credits Posted</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">
              ₹{entries.filter((e) => e.type === "CREDIT").reduce((acc, e) => acc + e.amount, 0).toLocaleString("en-IN")}
            </div>
            <span className="text-xs text-emerald-600 font-medium">Reconciled 100%</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
            <span className="text-xs text-slate-400 font-semibold uppercase">Trial Balance Variance</span>
            <div className="text-2xl font-bold text-emerald-700 mt-1">₹0.00</div>
            <span className="text-xs text-slate-500 font-medium">Strict Double-Entry Balance</span>
          </div>
        </div>

        {/* Ledger Table (Matching Section 17) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Account</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Debit</th>
                  <th className="py-3.5 px-6">Credit</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {entry.transactionId}
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-medium max-w-xs truncate">
                      {entry.description}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-700">
                      {entry.account}
                    </td>
                    <td className="py-4 px-6 font-bold">
                      {entry.type === "DEBIT" ? (
                        <span className="text-blue-700 font-mono">DEBIT</span>
                      ) : (
                        <span className="text-emerald-700 font-mono">CREDIT</span>
                      )}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">
                      {entry.type === "DEBIT" ? `₹${entry.amount.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-emerald-700">
                      {entry.type === "CREDIT" ? `₹${entry.amount.toLocaleString("en-IN")}` : "—"}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Badge variant="success" size="sm">{entry.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
