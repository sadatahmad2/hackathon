import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function InvestorProfilePage() {
  return (
    <DashboardLayout role="INVESTOR">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Investor Account & Accreditation
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified institutional liquidity provider credentials
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0B1720]">Aman Sharma</h2>
                  <Badge variant="verified" size="sm">Accredited</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Growth Fund Capital • Investor Tier 1</p>
              </div>
            </div>

            <Button variant="outline" size="sm">
              Edit Preferences
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Entity Name</span>
              <span className="font-bold text-slate-900 text-sm">Growth Fund Capital LLP</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Accredited Investor ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">SEBI-CAT2-AIF-9821</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Mandate Preference</span>
              <span className="font-semibold text-slate-900">AAA & AA Corporate Invoices (&lt; 90 days tenure)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block mb-1">Available Liquidity Pool</span>
              <span className="font-black text-emerald-700 text-sm">₹5,00,00,000 (Simulated)</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
