import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Building2, ShieldCheck, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function SupplierProfilePage() {
  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Supplier Profile & Verification
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Enterprise business credentials and settlement bank account details
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                RE
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0B1720]">Ravi Electricals</h2>
                  <Badge variant="verified" size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">MSME Enterprise ID: MH-27-0091823</p>
              </div>
            </div>

            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Registered Company Name</span>
              <span className="font-bold text-slate-900 text-sm">Ravi Electricals Private Limited</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Goods & Services Tax (GSTIN)</span>
              <span className="font-mono font-bold text-slate-900 text-sm">27ABCDE1234F1Z5</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Primary Authorized Signatory</span>
              <span className="font-semibold text-slate-900">Ravi Sharma (Managing Director)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Registered Office</span>
              <span className="font-semibold text-slate-900">Plot 42, MIDC Industrial Area, Pune 411019</span>
            </div>
          </div>

          {/* Bank Account Section */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-sm text-[#0B1720] mb-3">Linked Disbursal Account</h3>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <p className="font-bold text-slate-900">HDFC Bank Limited — Current Account</p>
                <p className="text-slate-600 font-mono mt-0.5">A/C: •••••••• 8842 • IFSC: HDFC0000240</p>
              </div>
              <span className="text-emerald-700 font-bold bg-white px-3 py-1 rounded-full border border-emerald-300">
                Penny-Drop Verified ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
