"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Invoice } from "@/types";
import { Plus, Search, Filter, ArrowRight, FileText } from "lucide-react";

export default function MyInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInvoices(data.invoices);
      });
  }, []);

  const filtered = invoices.filter((inv) => {
    const matchesStatus =
      filterStatus === "ALL" || inv.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.buyerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              My Invoices
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all your uploaded receivables and active financing auctions
            </p>
          </div>

          <Link href="/supplier/upload-invoice">
            <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4 mr-1" />}>
              Upload Invoice
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["ALL", "Verified", "Pending", "Under Review", "Funded"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterStatus === st
                    ? "bg-[#006B5B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoice or buyer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40"
            />
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Invoice No.</th>
                  <th className="py-3.5 px-6">Buyer</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Due Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Bids Received</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <Link
                        href={`/supplier/invoices/${inv.id}`}
                        className="hover:text-emerald-700 transition-colors"
                      >
                        {inv.invoiceNumber}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      {inv.buyerName}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {inv.buyerIndustry}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      ₹{inv.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {inv.dueDate}
                      <span className="block text-[10px] text-slate-400">
                        {inv.tenureDays} Days
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {inv.status === "Verified" ? (
                        <Badge variant="verified" size="sm" />
                      ) : inv.status === "Pending" ? (
                        <Badge variant="pending" size="sm" />
                      ) : inv.status === "Under Review" ? (
                        <Badge variant="under_review" size="sm" />
                      ) : inv.status === "Funded" ? (
                        <Badge variant="success" size="sm">Funded</Badge>
                      ) : inv.status === "Repaid" ? (
                        <Badge variant="success" size="sm">Repaid</Badge>
                      ) : (
                        <Badge variant="rejected" size="sm" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {inv.bidsCount > 0 ? (
                        <span className="font-semibold text-emerald-700">
                          {inv.bidsCount} Offers (Best: ₹{inv.bestBidAmount?.toLocaleString("en-IN")})
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">0 Offers</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/supplier/invoices/${inv.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs font-semibold">
                          View Details
                        </Button>
                      </Link>
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
