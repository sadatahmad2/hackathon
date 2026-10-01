"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Invoice } from "@/types";
import {
  Gavel,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Building2,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";

export default function AdminAuctionsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<"live" | "completed" | "all">("live");

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInvoices(data.invoices);
      });
  }, []);

  const liveAuctions = invoices.filter(
    (i) => i.status === "Verified" || i.status === "Active Auction"
  );
  const completedAuctions = invoices.filter(
    (i) => i.status === "Funded" || i.status === "Repaid"
  );

  const displayList =
    activeTab === "live"
      ? liveAuctions
      : activeTab === "completed"
      ? completedAuctions
      : invoices;

  const formatCurrency = (n: number) =>
    "₹" + n.toLocaleString("en-IN");

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Auction Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor and manage all live and historical invoice discount auctions
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Live Auctions",
              value: liveAuctions.length,
              icon: <Gavel className="w-4 h-4 text-emerald-600" />,
              bg: "bg-emerald-50",
            },
            {
              label: "Total Bids Placed",
              value: invoices.reduce((a, i) => a + (i.bidsCount || 0), 0),
              icon: <TrendingUp className="w-4 h-4 text-blue-600" />,
              bg: "bg-blue-50",
            },
            {
              label: "Completed",
              value: completedAuctions.length,
              icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
              bg: "bg-teal-50",
            },
            {
              label: "Total Invoices",
              value: invoices.length,
              icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
              bg: "bg-amber-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center gap-3"
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-xl font-bold text-[#0B1720]">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {(["live", "completed", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-sm font-semibold capitalize transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-[#00C896] text-[#00C896]"
                  : "border-transparent text-slate-500 hover:text-[#0B1720]"
              }`}
            >
              {tab === "live" ? "Live Auctions" : tab === "completed" ? "Completed" : "All"}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">Invoice / Buyer</th>
                <th className="py-3.5 px-6">Value</th>
                <th className="py-3.5 px-6">Best Bid</th>
                <th className="py-3.5 px-6">Bids</th>
                <th className="py-3.5 px-6">Risk</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Due Date</th>
                <th className="py-3.5 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayList.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#0B1720] text-sm">{inv.invoiceNumber}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <Building2 className="w-3 h-3" /> {inv.buyerName}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-[#0B1720]">
                    {formatCurrency(inv.amount)}
                  </td>
                  <td className="py-4 px-6">
                    {inv.bestBidAmount ? (
                      <div>
                        <div className="font-semibold text-emerald-700">{formatCurrency(inv.bestBidAmount)}</div>
                        <div className="text-xs text-slate-400">{inv.bestBidYield?.toFixed(2)}% p.a.</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">No bids yet</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0B1720]">
                      <Gavel className="w-3.5 h-3.5 text-slate-400" /> {inv.bidsCount || 0}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      variant={
                        inv.riskTier === "AAA"
                          ? "aaa"
                          : inv.riskTier === "AA"
                          ? "aa"
                          : inv.riskTier === "A"
                          ? "a"
                          : "bbb"
                      }
                    >
                      {inv.riskTier || "—"}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      variant={
                        inv.status === "Verified" || inv.status === "Active Auction"
                          ? "success"
                          : inv.status === "Funded"
                          ? "outline"
                          : inv.status === "Repaid"
                          ? "outline"
                          : "pending"
                      }
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" /> {inv.dueDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/investor/marketplace/${inv.id}`}>
                      <Button variant="outline" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {displayList.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-slate-400">
                    No auctions in this category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
