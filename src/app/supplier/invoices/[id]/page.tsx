"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Invoice, Bid, RiskAssessment, EscrowAccount } from "@/types";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

export default function SupplierInvoiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { success, error, info } = useToast();

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [risk, setRisk] = useState<RiskAssessment | null>(null);
  const [escrow, setEscrow] = useState<EscrowAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bids" | "company" | "documents" | "history">("bids");

  // Bid acceptance modal state
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [payoutSuccessModal, setPayoutSuccessModal] = useState(false);

  useEffect(() => {
    fetch(`/api/invoices/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvoice(data.invoice);
          setBids(data.bids || []);
          setRisk(data.risk || null);
          setEscrow(data.escrow || null);
        }
      })
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  const handleAcceptBid = async () => {
    if (!selectedBid) return;
    setIsAccepting(true);

    try {
      const res = await fetch(`/api/bids/${selectedBid.id}/accept`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        setInvoice(data.invoice);
        setEscrow(data.escrow);
        setSelectedBid(null);
        setPayoutSuccessModal(true);

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }

        success(
          "Bid Accepted & Payout Released!",
          `Simulated instant payout of ₹${selectedBid.advanceAmount.toLocaleString("en-IN")} credited to your account via Escrow.`
        );
      } else {
        error("Error accepting bid", data.error);
      }
    } catch (err: any) {
      error("Error", err.message);
    } finally {
      setIsAccepting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="SUPPLIER">
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-[#00C896] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-500">Loading invoice details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!invoice) {
    return (
      <DashboardLayout role="SUPPLIER">
        <div className="py-16 text-center">
          <p className="text-slate-500">Invoice not found.</p>
          <Link href="/supplier/invoices" className="mt-4 inline-block">
            <Button variant="primary" size="sm">Back to Invoices</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/supplier/invoices"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Invoices
          </Link>
        </div>

        {/* Header with Title, Badges, and Countdown Timer (Matching Screen 7) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1720]">
              Invoice {invoice.invoiceNumber}
            </h1>
            <Badge variant="verified" size="md" />
            <Badge variant={invoice.riskTier === "AAA" ? "aaa" : "aa"} size="md" />
            {invoice.status === "Funded" && (
              <Badge variant="escrow" size="md">
                ESCROW ACTIVE • FUNDED
              </Badge>
            )}
            {invoice.status === "Repaid" && (
              <Badge variant="success" size="md">
                REPAID • SETTLED
              </Badge>
            )}
          </div>

          {/* Live Countdown Timer */}
          {invoice.status !== "Funded" && invoice.status !== "Repaid" && (
            <CountdownTimer initialHours={2} initialMinutes={14} initialSeconds={32} />
          )}
        </div>

        {/* Hero Invoice Summary Card (Matching Screen 7) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Buyer Profile */}
            <div className="lg:col-span-8 flex items-start gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 text-white flex items-center justify-center shrink-0 shadow-md">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-[#0B1720]">{invoice.buyerName}</h3>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                    {invoice.buyerIndustry}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-500">
                  GST: <span className="font-semibold text-slate-700">{invoice.buyerGst}</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Leading tier-1 manufacturer with 10+ years track record. Flawless on-time payment history across 24 quarters.
                </p>
              </div>
            </div>

            {/* Right: Key Figures */}
            <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Invoice Value
                </span>
                <div className="text-3xl font-black text-[#0B1720] mt-1">
                  ₹{invoice.amount.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Due Date</span>
                  <span className="font-semibold text-slate-800">{invoice.dueDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Tenure</span>
                  <span className="font-bold text-emerald-700">{invoice.tenureDays} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Bar (Matching Screen 7) */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("bids")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "bids"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Investor Bids</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {bids.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === "company"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Company Details
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === "documents"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Documents ({invoice.documents?.length || 2})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all ${
              activeTab === "history"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Payment History
          </button>
        </div>

        {/* Tab 1: Live Bidding Table */}
        {activeTab === "bids" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/60 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#0B1720]">Live Investor Bids</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select an offer to lock funds in Escrow and trigger immediate simulated payout
                </p>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ● Live Auction
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-6">Investor</th>
                    <th className="py-3.5 px-6">Advance Amount</th>
                    <th className="py-3.5 px-6">Annual Yield</th>
                    <th className="py-3.5 px-6">Expected Return</th>
                    <th className="py-3.5 px-6">Time</th>
                    <th className="py-3.5 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bids.map((bid) => {
                    const isBest = bid.status === "BEST_OFFER";
                    const isAccepted = bid.status === "ACCEPTED";

                    return (
                      <tr
                        key={bid.id}
                        className={`transition-colors ${
                          isAccepted
                            ? "bg-emerald-50/60 font-semibold"
                            : isBest
                            ? "bg-emerald-50/20 hover:bg-emerald-50/40"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <td className="py-4 px-6 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span>{bid.investorName}</span>
                            {isBest && <Badge variant="best_offer" size="sm" />}
                            {isAccepted && (
                              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                                Accepted ✓
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold text-emerald-700 text-sm">
                          ₹{bid.advanceAmount.toLocaleString("en-IN")}
                          <span className="text-slate-400 text-[11px] font-normal ml-1">
                            ({((bid.advanceAmount / invoice.amount) * 100).toFixed(0)}%)
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          {bid.annualYield}%
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          ₹{bid.expectedReturn.toLocaleString("en-IN")}
                        </td>
                        <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                          {bid.timeAgo || "Recently"}
                        </td>
                        <td className="py-4 px-6 text-right">
                          {isAccepted ? (
                            <span className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Funded
                            </span>
                          ) : invoice.status === "Funded" ? (
                            <span className="text-xs text-slate-400">Auction Closed</span>
                          ) : (
                            <Button
                              variant={isBest ? "primary" : "secondary"}
                              size="sm"
                              onClick={() => setSelectedBid(bid)}
                              className="rounded-lg font-bold"
                            >
                              Select
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Company Details */}
        {activeTab === "company" && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#0B1720]">Corporate Debtor Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Company Registered Name</span>
                <span className="font-bold text-slate-900 text-sm">{invoice.buyerName}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">GST Identification Number</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{invoice.buyerGst}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Industry Sector</span>
                <span className="font-semibold text-slate-900">{invoice.buyerIndustry}</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block mb-1">Risk Classification</span>
                <span className="font-bold text-emerald-700">AAA — Lowest Probability of Default</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Documents */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#0B1720]">Verification Documents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Tax_Invoice_{invoice.invoiceNumber}.pdf</p>
                    <span className="text-[11px] text-slate-400">1.4 MB • Digitally signed & verified</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<Download className="w-3.5 h-3.5 mr-1" />}
                  onClick={() => info("Download Started", "This is a demo environment. No physical file is attached.")}
                >
                  Download
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Proof_of_Delivery_Challan.pdf</p>
                    <span className="text-[11px] text-slate-400">840 KB • Buyer warehouse seal verified</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<Download className="w-3.5 h-3.5 mr-1" />}
                  onClick={() => info("Download Started", "This is a demo environment. No physical file is attached.")}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Payment History */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#0B1720]">Historical Payment Performance</h3>
            <p className="text-xs text-slate-500">
              Aggregated repayment track record between {invoice.supplierName} and {invoice.buyerName}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl font-bold text-emerald-600">100%</span>
                <p className="text-[11px] text-slate-500 mt-1">On-Time Settlement Rate</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl font-bold text-slate-900">₹2.4 Cr</span>
                <p className="text-[11px] text-slate-500 mt-1">Total Volume Transacted</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl font-bold text-slate-900">18 Days</span>
                <p className="text-[11px] text-slate-500 mt-1">Average Early Settlement</p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal to Accept Bid */}
        <Modal
          isOpen={!!selectedBid}
          onClose={() => setSelectedBid(null)}
          title="Confirm Bid Acceptance"
          subtitle={`Invoice ${invoice.invoiceNumber}`}
        >
          {selectedBid && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Selected Investor:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedBid.investorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Immediate Advance Payout:</span>
                  <span className="font-bold text-emerald-700 text-base">
                    ₹{selectedBid.advanceAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Financing Yield (% p.a.):</span>
                  <span className="font-semibold text-slate-800">{selectedBid.annualYield}%</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed border border-slate-200">
                <p className="font-semibold text-[#0B1720] mb-1">Financial Simulation Note:</p>
                <p>
                  Upon confirmation, a Demo Escrow account will be activated, and ₹{selectedBid.advanceAmount.toLocaleString("en-IN")} will be simulated as an instant credit to your operational bank account.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button variant="outline" size="sm" onClick={() => setSelectedBid(null)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={isAccepting}
                  onClick={handleAcceptBid}
                  className="rounded-xl px-5 font-bold"
                >
                  Accept & Receive Payout
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Payout Success Celebration Modal */}
        <Modal
          isOpen={payoutSuccessModal}
          onClose={() => setPayoutSuccessModal(false)}
          title="Payout Released Successfully!"
          subtitle="Simulated Financial Disbursal Complete"
        >
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 bg-emerald-100 text-[#00C896] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Zap className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0B1720]">₹4,60,000 Disbursed</h3>
              <p className="text-xs text-slate-500 mt-1">
                Transferred from Escrow to Ravi Electricals Operational Account
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Escrow ID:</span>
                <span className="font-mono text-slate-800 font-semibold">{escrow?.id || "ESCROW-001"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction Status:</span>
                <span className="text-emerald-700 font-bold">ESCROW ACTIVE ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ledger Entries Created:</span>
                <span className="text-slate-800 font-mono">TX-1001, TX-1002, TX-1003, TX-1004</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                className="w-full rounded-xl"
                onClick={() => setPayoutSuccessModal(false)}
              >
                Close & View Escrow Status
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
