"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InflowLogo } from "@/components/brand/InflowLogo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Store,
  TrendingUp,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { session } = useAuth();
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    gstin: "",
    pan: "",
    businessType: "Private Limited",
    turnover: "",
    secretKey: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    {
      key: "SUPPLIER",
      title: "Supplier",
      icon: Store,
    },
    {
      key: "INVESTOR",
      title: "Investor",
      icon: TrendingUp,
    },
    {
      key: "ADMIN",
      title: "Admin",
      icon: ShieldCheck,
    }
  ];

  const handleSelectRole = (selectedRole: string) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      alert("Session expired. Please log in again.");
      router.push("/login");
      return;
    }
    
    if (role === "ADMIN") {
      if (formData.secretKey !== "admin123") {
        alert("Invalid Secret Key");
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // Call API route (uses supabaseAdmin to bypass RLS)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
          role: role,
          companyName: role === "ADMIN" ? "Inflow Admin" : formData.companyName,
          gstin: role === "ADMIN" ? "N/A" : formData.gstin,
          investmentPreference: formData.turnover,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Registration failed");
      
      if (role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/pending");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      alert(err.message || "Failed to register.");
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#03131A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.12),transparent)] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto w-full relative z-10">
        <div className="flex justify-center mb-8">
          <InflowLogo variant="dark" size="lg" />
        </div>

        {step === 1 ? (
          <div className="text-center space-y-6 bg-white/[0.04] backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h1 className="text-3xl font-extrabold text-white">Choose Your Role</h1>
            <p className="text-slate-400">Select how you want to use Inflow</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.key}
                    onClick={() => handleSelectRole(r.key)}
                    className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col items-center gap-4 group"
                  >
                    <Icon className="w-10 h-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold text-white">{r.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-center space-y-6 bg-white/[0.04] backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
            <h1 className="text-3xl font-extrabold text-white">{role === "ADMIN" ? "Admin Authentication" : "KYC & Risk Analysis"}</h1>
            <p className="text-slate-400">{role === "ADMIN" ? "Please enter the secret master password." : "Please provide your detailed business and financial information for risk assessment."}</p>
            
            <div className="space-y-5 text-left mt-8">
              {role === "ADMIN" ? (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Secret Password *</label>
                  <input
                    required
                    type="password"
                    value={formData.secretKey}
                    onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                    placeholder="Enter secret key..."
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company / Entity Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                      placeholder="E.g. Acme Corp Ltd."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Business Type *</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none [&>option]:bg-slate-900"
                    >
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="LLP">LLP</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Annual Turnover (INR) *</label>
                    <select
                      value={formData.turnover}
                      onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none [&>option]:bg-slate-900"
                      required
                    >
                      <option value="" disabled>Select range...</option>
                      <option value="< 1 Cr">Less than 1 Cr</option>
                      <option value="1-5 Cr">1 Cr - 5 Cr</option>
                      <option value="5-20 Cr">5 Cr - 20 Cr</option>
                      <option value="> 20 Cr">Above 20 Cr</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">GSTIN *</label>
                    <input
                      required
                      type="text"
                      value={formData.gstin}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none uppercase"
                      placeholder="e.g. 22AAAAA0000A1Z5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company PAN *</label>
                    <input
                      required
                      type="text"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-emerald-500/50 outline-none uppercase"
                      placeholder="e.g. ABCDE1234F"
                    />
                  </div>

                  <div className="md:col-span-2 mt-2 p-4 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-500/10 transition-colors">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mb-2" />
                    <p className="text-sm text-slate-300 font-medium">Upload KYC Documents</p>
                    <p className="text-xs text-slate-400 mt-1">Upload Bank Statement & ITR for AI Risk Analysis (Optional for Demo)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 flex gap-3">
              <Button type="button" variant="ghost" className="w-full sm:w-1/3" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" variant="primary" className="w-full sm:w-2/3" isLoading={isSubmitting}>
                {role === "ADMIN" ? "Login as Admin" : "Submit for Verification"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
