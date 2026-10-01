"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Invoice } from "@/types";
import {
  Search,
  SlidersHorizontal,
  Building2,
  Calendar,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function InvestorMarketplacePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("ALL");
  const [selectedRisk, setSelectedRisk] = useState("ALL");
  const [selectedTenure, setSelectedTenure] = useState("ALL");

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Filter to only verified / active auction invoices
          setInvoices(data.invoices.filter((i: Invoice) => i.status === "Verified" || i.status === "Active Auction" || i.status === "Funded"));
        }
      });
  }, []);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.buyerIndustry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = selectedIndustry === "ALL" || inv.buyerIndustry.includes(selectedIndustry);
    const matchesRisk = selectedRisk === "ALL" || inv.riskTier === selectedRisk;
    const matchesTenure =
      selectedTenure === "ALL" ||
      (selectedTenure === "30" && inv.tenureDays <= 30) ||
      (selectedTenure === "60" && inv.tenureDays <= 60) ||
      (selectedTenure === "90" && inv.tenureDays <= 90);

    return matchesSearch && matchesIndustry && matchesRisk && matchesTenure;
  });

  return (
    <DashboardLayout role="INVESTOR">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Invoice Marketplace
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover verified corporate invoices with algorithmic risk ratings and competitive annual yields
          </p>
        </div>

        {/* Search & Filter Bar (Matching Screen 8) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by buyer, industry or invoice number..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700"
              >
                <option value="ALL">All Industries</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Export">Export</option>
                <option value="Construction">Construction</option>
              </select>

              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700"
              >
                <option value="ALL">All Risk Ratings</option>
                <option value="AAA">AAA Rating</option>
                <option value="AA">AA Rating</option>
                <option value="A">A Rating</option>
                <option value="BBB">BBB Rating</option>
              </select>

              <select
                value={selectedTenure}
                onChange={(e) => setSelectedTenure(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium text-slate-700"
              >
                <option value="ALL">All Due Periods</option>
                <option value="30">Within 30 Days</option>
                <option value="60">Within 60 Days</option>
                <option value="90">Within 90 Days</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setSelectedIndustry("ALL");
                  setSelectedRisk("ALL");
                  setSelectedTenure("ALL");
                  setSearchTerm("");
                }}
                className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Cards List (Matching Screen 8) */}
        <div className="space-y-4">
          {filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              {/* Left Column: Buyer & Value */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-[#0B1720] group-hover:text-emerald-700 transition-colors">
                      {inv.buyerName}
                    </h3>
                    <Badge variant={inv.riskTier === "AAA" ? "aaa" : inv.riskTier === "AA" ? "aa" : inv.riskTier === "A" ? "a" : "bbb"} size="sm">
                      {inv.riskTier}
                    </Badge>
                    <Badge variant="verified" size="sm" />
                  </div>

                  <p className="text-xs text-slate-500">
                    {inv.buyerIndustry} • {inv.invoiceNumber}
                  </p>

                  <div className="text-xl font-black text-[#0B1720] pt-1">
                    ₹{inv.amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              {/* Middle Column: Due Date & Advance Info */}
              <div className="grid grid-cols-2 gap-6 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                <div>
                  <span className="text-slate-400 block text-[11px]">Due Period</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">
                    Due in {inv.tenureDays} days
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">({inv.dueDate})</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Current Best Bid</span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {inv.bestBidAmount
                      ? `₹${inv.bestBidAmount.toLocaleString("en-IN")} (${((inv.bestBidAmount / inv.amount) * 100).toFixed(0)}%)`
                      : "92% Advance"}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Verified by Inflow</span>
                </div>
              </div>

              {/* Right Column: Estimated Yield & Action Button */}
              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                <div className="text-left md:text-right">
                  <div className="text-2xl font-black text-emerald-700">
                    {inv.bestBidYield || (inv.riskTier === "AAA" ? "8.5%" : inv.riskTier === "AA" ? "10.5%" : inv.riskTier === "A" ? "12%" : "9.5%")}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    Est. Annual Yield
                  </span>
                </div>

                <Link href={`/investor/marketplace/${inv.id}/bid`}>
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                    className="rounded-xl px-5 font-bold shadow-sm group-hover:shadow-md"
                  >
                    View & Bid →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
