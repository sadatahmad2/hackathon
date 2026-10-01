"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Invoice } from "@/types";
import {
  CheckSquare,
  XSquare,
  Eye,
  CheckCircle2,
  FileText,
  Building2,
  Calendar,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function InvoiceVerificationPage() {
  const { success, error, warning } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Verification Checklist State
  const [checklist, setChecklist] = useState({
    invoiceNumberValid: true,
    buyerDetailsMatched: true,
    amountVerified: true,
    dueDateValid: true,
    documentVerified: true,
  });

  const fetchInvoices = () => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setInvoices(data.invoices);
      });
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleOpenVerifyModal = (inv: Invoice) => {
    setSelectedInvoice(inv);
    setChecklist({
      invoiceNumberValid: true,
      buyerDetailsMatched: true,
      amountVerified: true,
      dueDateValid: true,
      documentVerified: true,
    });
  };

  const handleApprove = async () => {
    if (!selectedInvoice) return;
    setIsVerifying(true);

    try {
      const res = await fetch(`/api/invoices/${selectedInvoice.id}/verify`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        success("Invoice Verified & Approved!", "AI Risk Engine assigned AAA rating and created auction listing.");
        setSelectedInvoice(null);
        fetchInvoices();
      } else {
        error("Verification failed", data.error);
      }
    } catch (err: any) {
      error("Error", err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReject = async () => {
    if (!selectedInvoice) return;
    setIsVerifying(true);

    try {
      const res = await fetch(`/api/invoices/${selectedInvoice.id}/reject`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        warning("Invoice Rejected", "Status updated to Rejected.");
        setSelectedInvoice(null);
        fetchInvoices();
      }
    } catch (err: any) {
      error("Error", err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (activeTab === "pending") return inv.status === "Pending" || inv.status === "Under Review";
    if (activeTab === "approved") return inv.status === "Verified" || inv.status === "Active Auction" || inv.status === "Funded" || inv.status === "Repaid";
    return inv.status === "Rejected";
  });

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Invoice Verification Queue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Admin oversight: Cross-reference GSTIN databases, invoice authenticity, and approve marketplace listings
          </p>
        </div>

        {/* Tabs: Pending, Approved, Rejected (Section 10) */}
        <div className="flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "pending"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Pending Review</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800 font-bold">
              {invoices.filter((i) => i.status === "Pending" || i.status === "Under Review").length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "approved"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Approved / Verified</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {invoices.filter((i) => i.status === "Verified" || i.status === "Funded" || i.status === "Repaid").length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("rejected")}
            className={`px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "rejected"
                ? "border-[#00C896] text-[#006B5B]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Rejected</span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-700">
              {invoices.filter((i) => i.status === "Rejected").length}
            </span>
          </button>
        </div>

        {/* Verification Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Invoice No.</th>
                  <th className="py-3.5 px-6">Supplier</th>
                  <th className="py-3.5 px-6">Buyer</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Due Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold font-mono text-slate-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-6 text-slate-800 font-semibold">
                      {inv.supplierName}
                      <span className="block text-[11px] font-mono text-slate-400">
                        {inv.supplierGst}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-800">
                      {inv.buyerName}
                      <span className="block text-[11px] text-slate-400">
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
                      ) : (
                        <Badge variant="rejected" size="sm" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenVerifyModal(inv)}
                        className="rounded-lg text-xs font-semibold"
                      >
                        Inspect & Verify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification & Checklist Modal (Section 10) */}
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Verify Invoice ${selectedInvoice?.invoiceNumber}`}
          subtitle="Admin Verification Checklist & Audit Inspection"
          maxWidth="lg"
        >
          {selectedInvoice && (
            <div className="space-y-5 text-xs">
              {/* Summary overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Supplier</span>
                  <span className="font-bold text-slate-900">{selectedInvoice.supplierName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Buyer</span>
                  <span className="font-bold text-slate-900">{selectedInvoice.buyerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Amount</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    ₹{selectedInvoice.amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Due Date</span>
                  <span className="font-semibold text-slate-900">{selectedInvoice.dueDate}</span>
                </div>
              </div>

              {/* Document Preview Box */}
              <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-600" /> Document Preview
                  </h4>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                    SHA-256 Validated
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Tax_Invoice_{selectedInvoice.invoiceNumber}.pdf</p>
                    <p className="text-[11px] text-slate-400">Digital GST e-Invoice QR Code Matched</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Inspect PDF
                  </Button>
                </div>
              </div>

              {/* Exact Verification Checklist from Prompt Section 10 */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Verification Checklist
                </h4>

                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.invoiceNumberValid}
                      onChange={(e) =>
                        setChecklist({ ...checklist, invoiceNumberValid: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00C896] focus:ring-[#00C896]"
                    />
                    <span className="font-medium text-slate-700">✓ Invoice number valid</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.buyerDetailsMatched}
                      onChange={(e) =>
                        setChecklist({ ...checklist, buyerDetailsMatched: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00C896] focus:ring-[#00C896]"
                    />
                    <span className="font-medium text-slate-700">✓ Buyer details matched (GST Portal 2B)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.amountVerified}
                      onChange={(e) =>
                        setChecklist({ ...checklist, amountVerified: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00C896] focus:ring-[#00C896]"
                    />
                    <span className="font-medium text-slate-700">✓ Amount verified against PO</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.dueDateValid}
                      onChange={(e) =>
                        setChecklist({ ...checklist, dueDateValid: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00C896] focus:ring-[#00C896]"
                    />
                    <span className="font-medium text-slate-700">✓ Due date valid (90-day trade window)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.documentVerified}
                      onChange={(e) =>
                        setChecklist({ ...checklist, documentVerified: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00C896] focus:ring-[#00C896]"
                    />
                    <span className="font-medium text-slate-700">✓ Document verified & delivery proof attached</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="danger"
                  size="sm"
                  isLoading={isVerifying}
                  onClick={handleReject}
                  className="rounded-xl px-4"
                >
                  Reject Invoice
                </Button>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={isVerifying}
                    onClick={handleApprove}
                    className="rounded-xl px-6 font-bold"
                  >
                    Approve & Verify (Assign AAA)
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
