"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bid } from "@/types";
import { Gavel, TrendingUp, ArrowRight } from "lucide-react";

export default function SupplierBidsPage() {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    fetch("/api/auctions/inv-001/bids")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setBids(data.bids);
      });
  }, []);

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Bids Received
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time auction offers submitted by verified institutional & individual investors
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Investor</th>
                  <th className="py-3.5 px-6">Invoice</th>
                  <th className="py-3.5 px-6">Advance Amount</th>
                  <th className="py-3.5 px-6">Annual Yield</th>
                  <th className="py-3.5 px-6">Expected Return</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bids.map((bid) => (
                  <tr key={bid.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {bid.investorName}
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-mono">
                      INV-2026-001
                    </td>
                    <td className="py-4 px-6 font-bold text-emerald-700 text-sm">
                      ₹{bid.advanceAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {bid.annualYield}%
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      ₹{bid.expectedReturn.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6">
                      {bid.status === "BEST_OFFER" ? (
                        <Badge variant="best_offer" size="sm" />
                      ) : bid.status === "ACCEPTED" ? (
                        <Badge variant="success" size="sm">Accepted</Badge>
                      ) : (
                        <Badge variant="outline" size="sm">Active</Badge>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/supplier/invoices/${bid.invoiceId}`}>
                        <Button variant="primary" size="sm" className="rounded-lg text-xs font-semibold">
                          View & Accept
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
