"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Invoice } from "@/types";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function PlaceBidPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { success, error } = useToast();
  const { session } = useAuth();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [investorName, setInvestorName] = useState<string>("Investor");
  const [advanceAmount, setAdvanceAmount] = useState<string>("460000");
  const [annualYield, setAnnualYield] = useState<string>("8.0");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch invoice
    fetch(`/api/invoices/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvoice(data.invoice);
          if (data.invoice.bestBidAmount) {
            setAdvanceAmount(String(data.invoice.bestBidAmount));
          } else {
            setAdvanceAmount(String(Math.round(data.invoice.amount * 0.92)));
          }
        }
      })
      .finally(() => setLoading(false));

    // Fetch investor name from profile
    if (session?.user?.id) {
      supabase
        .from("profiles")
        .select("name, company_name")
        .eq("id", session.user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setInvestorName(data.company_name || data.name || "Investor");
          }
        });
    }
  }, [resolvedParams.id, session?.user?.id]);

  const numAdvance = Number(advanceAmount) || 460000;
  const invoiceValue = invoice?.amount || 500000;
  const expectedReturn = Math.max(0, invoiceValue - numAdvance);
  const investmentPeriodDays = invoice?.tenureDays || 90;

  const handleConfirmBid = async () => {
    if (!invoice) return;
    setIsSubmitting(true);

    try {
      if (!session?.user?.id) {
        error("Not logged in", "Please log in to place a bid.");
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(`/api/auctions/${invoice.id}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investorId: session.user.id,
          investorName: investorName,
          advanceAmount: numAdvance,
          annualYield: Number(annualYield),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);

        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }

        success(
          "Bid Placed Successfully!",
          `You placed a bid of ₹${numAdvance.toLocaleString("en-IN")} @ ${annualYield}% p.a. on ${invoice.invoiceNumber}.`
        );
        router.push("/investor/investments");
      } else {
        error("Error placing bid", data.error);
      }
    } catch (err: any) {
      error("Error submitting bid", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="INVESTOR">
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-[#00C896] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500">Loading auction listing...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!invoice) {
    return (
      <DashboardLayout role="INVESTOR">
        <div className="py-16 text-center">
          <p className="text-slate-500">Invoice listing not found.</p>
          <Link href="/investor/marketplace" className="mt-4 inline-block">
            <Button variant="primary" size="sm">Back to Marketplace</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="INVESTOR">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <Link
            href="/investor/marketplace"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Place Your Bid
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Set your bid amount and expected return
          </p>
        </div>

        {/* Company Card Header (Matching Screen 9) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#0B1720]">{invoice.buyerName}</h3>
                  <Badge variant={invoice.riskTier === "AAA" ? "aaa" : "aa"} size="sm">
                    {invoice.riskTier}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Invoice {invoice.invoiceNumber} • {invoice.buyerIndustry}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Invoice Value</span>
              <div className="text-xl font-black text-[#0B1720]">
                ₹{invoice.amount.toLocaleString("en-IN")}
              </div>
              <span className="text-xs text-slate-500 block mt-0.5">
                Due Date: {invoice.dueDate} ({invoice.tenureDays} Days)
              </span>
            </div>
          </div>
        </div>

        {/* Bidding Form Card (Matching Screen 9) */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Advance Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                placeholder="e.g. 460000"
                className="w-full px-4 py-3 text-base font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] text-[#0B1720]"
              />
              <span className="text-xs text-slate-400 mt-1 block">
                You will invest this amount now ({((numAdvance / invoice.amount) * 100).toFixed(1)}% Advance)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Expected Yield (% p.a.) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={annualYield}
                onChange={(e) => setAnnualYield(e.target.value)}
                placeholder="e.g. 8.0"
                className="w-full px-4 py-3 text-base font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] text-[#0B1720]"
              />
              <span className="text-xs text-slate-400 mt-1 block">
                Expected annual return rate
              </span>
            </div>
          </div>

          {/* Three Summary Calculation Cards (Matching Screen 9) */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Expected Return</span>
              <span className="text-lg font-black text-emerald-700">
                ₹{expectedReturn.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Total Repayment</span>
              <span className="text-lg font-bold text-slate-900">
                ₹{invoice.amount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
              <span className="text-slate-400 text-xs block mb-1">Investment Period</span>
              <span className="text-lg font-bold text-slate-900">
                {investmentPeriodDays} Days
              </span>
            </div>
          </div>

          {/* Place Bid Button */}
          <div className="pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="w-full rounded-xl py-3.5 text-base font-bold text-white shadow-md shadow-emerald-500/25"
            >
              Place Bid
            </Button>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Investment Bid"
          subtitle={`Auction for Invoice ${invoice.invoiceNumber}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-600">Company Debtor:</span>
                <span className="font-bold text-slate-900">{invoice.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Advance Capital:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  ₹{numAdvance.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Expected Profit:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  ₹{expectedReturn.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Annualized Yield:</span>
                <span className="font-semibold text-slate-900">{annualYield}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tenure to Maturity:</span>
                <span className="font-semibold text-slate-900">{investmentPeriodDays} Days</span>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed">
              By confirming, this bid will be submitted to the live auction. If the supplier accepts, funds will be simulated into the Inflow Tripartite Escrow.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleConfirmBid}
                className="rounded-xl px-5 font-bold"
              >
                Confirm & Submit Bid
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
