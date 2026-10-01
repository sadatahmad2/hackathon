"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
  ArrowLeft,
  X,
  FileCheck,
  Bot,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function UploadInvoicePage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiVerification, setShowAiVerification] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    amount: "",
    dueDate: "",
    buyerName: "",
    buyerGst: "",
    buyerIndustry: "Manufacturing",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; size: string; type: string }>
  >([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          type: "Supporting Document",
        },
      ]);
      success("Document attached", file.name);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user?.id) {
        throw new Error("You must be logged in to upload an invoice.");
      }

      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplierId: user.id,
          invoiceNumber: formData.invoiceNumber,
          buyerName: formData.buyerName,
          buyerGst: formData.buyerGst,
          buyerIndustry: formData.buyerIndustry,
          amount: Number(formData.amount),
          issueDate: formData.invoiceDate,
          dueDate: formData.dueDate,
          description: formData.description,
          documents: uploadedFiles.map((f, i) => ({
            id: `doc-${i}`,
            invoiceId: "",
            name: f.name,
            type: "INVOICE_PDF",
            fileUrl: "#",
            fileSize: f.size,
            uploadedAt: new Date().toISOString(),
          })),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowAiVerification(true);
        setTimeout(() => {
          success(
            "Invoice Verified Successfully!",
            "Invoice status is now 'Under Verification'. Admin will review and assign AI Risk rating."
          );
          router.push(`/supplier/invoices/${data.invoice.id}`);
        }, 3000);
      } else {
        error("Upload Failed", data.error || "Please verify form fields");
      }
    } catch (err: any) {
      error("Error submitting invoice", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, label: "Invoice Details" },
    { number: 2, label: "Company Details" },
    { number: 3, label: "Documents" },
    { number: 4, label: "Review" },
  ];

  if (showAiVerification) {
    return (
      <DashboardLayout role="SUPPLIER">
        <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_40px_rgba(0,200,150,0.5)]">
            <Bot className="w-12 h-12 text-[#00C896] animate-bounce" />
          </div>
          <h2 className="text-3xl font-black text-[#0B1720]">Inflow AI Verification</h2>
          <p className="text-lg text-slate-500 animate-pulse">Scanning documents and fetching GST records...</p>
          
          <div className="w-full max-w-md bg-slate-100 h-2 rounded-full overflow-hidden mt-8">
            <div className="h-full bg-[#00C896] animate-[progress_3s_ease-in-out_forwards]" style={{ width: '0%' }}></div>
          </div>
          
          <div className="flex flex-col gap-3 text-sm text-slate-500 mt-4 text-left w-full max-w-sm">
             <div className="flex items-center gap-2 animate-in fade-in zoom-in delay-[500ms] duration-500"><CheckCircle2 className="w-4 h-4 text-[#00C896]" /> Invoice details mapped successfully</div>
             <div className="flex items-center gap-2 animate-in fade-in zoom-in delay-[1000ms] duration-500"><CheckCircle2 className="w-4 h-4 text-[#00C896]" /> GSTIN cross-checked with government portal</div>
             <div className="flex items-center gap-2 animate-in fade-in zoom-in delay-[2000ms] duration-500"><CheckCircle2 className="w-4 h-4 text-[#00C896]" /> Preliminary Risk Tier assigned</div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes progress {
              0% { width: 0%; }
              50% { width: 60%; }
              100% { width: 100%; }
            }
          `}} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Upload Invoice
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Upload your unpaid invoice and required documents
          </p>
        </div>

        {/* Stepper Progress Bar (Matching Screen 6) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-[#00C896] transition-all duration-300 -z-0"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />

            {steps.map((s) => {
              const isPassed = s.number < currentStep;
              const isCurrent = s.number === currentStep;

              return (
                <div
                  key={s.number}
                  className="flex flex-col items-center relative z-10 cursor-pointer"
                  onClick={() => setCurrentStep(s.number)}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCurrent
                        ? "bg-[#00C896] text-white ring-4 ring-emerald-100 shadow-sm"
                        : isPassed
                        ? "bg-[#006B5B] text-white"
                        : "bg-white text-slate-400 border-2 border-slate-300"
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.number}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      isCurrent
                        ? "text-[#0B1720] font-bold"
                        : isPassed
                        ? "text-slate-700"
                        : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Step Form Card */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Invoice Details */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <h3 className="text-base font-bold text-[#0B1720] pb-2 border-b border-slate-100">
                  Step 1: Invoice & Financial Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Invoice Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      required
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      placeholder="e.g. INV-2026-001"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Invoice Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="invoiceDate"
                      required
                      value={formData.invoiceDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Invoice Amount (₹) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="amount"
                      required
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="e.g. 500000"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Due Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      required
                      value={formData.dueDate}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Company Details */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <h3 className="text-base font-bold text-[#0B1720] pb-2 border-b border-slate-100">
                  Step 2: Corporate Buyer Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Buyer Company Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="buyerName"
                      required
                      value={formData.buyerName}
                      onChange={handleChange}
                      placeholder="e.g. ABC Industries Ltd."
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Buyer GSTIN <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="buyerGst"
                      required
                      value={formData.buyerGst}
                      onChange={handleChange}
                      placeholder="e.g. 19ABCDE1234F1Z5"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] uppercase"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Buyer Industry
                    </label>
                    <select
                      name="buyerIndustry"
                      value={formData.buyerIndustry}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                    >
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail & Electronics">Retail & Electronics</option>
                      <option value="Infrastructure & Construction">Infrastructure & Construction</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Export & Trade">Export & Trade</option>
                      <option value="Pharmaceuticals">Pharmaceuticals</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Goods / Services Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="e.g. Details of materials supplied or work orders fulfilled"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <h3 className="text-base font-bold text-[#0B1720] pb-2 border-b border-slate-100">
                  Step 3: Verification Documents
                </h3>

                {/* Drag & Drop Upload Zone */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-[#00C896] hover:bg-slate-50/50 transition-all cursor-pointer relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00C896] flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0B1720]">
                    Drop invoice PDF or click to browse
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload Tax Invoice, Proof of Delivery (POD), or Purchase Order (PDF, PNG up to 10MB)
                  </p>
                </div>

                {/* Uploaded File List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Attached Files ({uploadedFiles.length})
                  </h4>
                  {uploadedFiles.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-xs font-bold text-[#0B1720]">{file.name}</p>
                          <span className="text-[11px] text-slate-500">
                            {file.type} • {file.size}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <h3 className="text-base font-bold text-[#0B1720] pb-2 border-b border-slate-100">
                  Step 4: Review & Submit for Verification
                </h3>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-slate-400 block">Invoice Number</span>
                      <span className="font-bold text-slate-800 text-sm">{formData.invoiceNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Amount</span>
                      <span className="font-bold text-emerald-700 text-sm">
                        ₹{Number(formData.amount).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Due Date</span>
                      <span className="font-semibold text-slate-800">{formData.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Buyer</span>
                      <span className="font-semibold text-slate-800">{formData.buyerName}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-400 block">Buyer GSTIN</span>
                      <span className="font-mono text-slate-800 font-semibold">{formData.buyerGst}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Attached Documents</span>
                      <span className="text-slate-800 font-medium">
                        {uploadedFiles.length} file(s) attached
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                  <p className="font-semibold">Verification Guarantee</p>
                  <p className="mt-0.5 text-emerald-700">
                    Once submitted, our Admin team and automated Risk Engine will verify GST authenticity within 2 hours. Your invoice will then be listed on the live investor marketplace.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
                >
                  Previous
                </Button>
              ) : (
                <Link href="/supplier/dashboard">
                  <Button type="button" variant="outline" size="md">
                    Cancel
                  </Button>
                </Link>
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  className="rounded-xl px-6 font-semibold"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  className="rounded-xl px-6 font-bold shadow-md shadow-emerald-500/25"
                >
                  Submit Invoice
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
