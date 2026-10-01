"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Loader2, Save, X } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function SupplierProfilePage() {
  const { session } = useAuth();
  const { success, error: showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "",
    companyName: "",
    gstin: "",
    investmentPreference: "",
    verification_status: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    gstin: "",
    investmentPreference: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, company_name, gstin, investment_preference, verification_status")
          .eq("id", session.user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          const fetchedProfile = {
            name: data.name || "",
            companyName: data.company_name || "",
            gstin: data.gstin || "",
            investmentPreference: data.investment_preference || "",
            verification_status: data.verification_status || "",
          };
          setProfile(fetchedProfile);
          setFormData(fetchedProfile);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [session]);

  const handleSave = async () => {
    if (!session?.user) return;
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          name: formData.name,
          companyName: formData.companyName,
          gstin: formData.gstin,
          investmentPreference: formData.investmentPreference,
        }),
      });
      
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      
      setProfile({
        ...profile,
        name: formData.name,
        companyName: formData.companyName,
        gstin: formData.gstin,
        investmentPreference: formData.investmentPreference,
      });
      setIsEditing(false);
      success("Profile Updated", "Your profile details have been saved.");
    } catch (err: any) {
      showError("Update Failed", err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout role="SUPPLIER">
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Supplier Profile & Verification
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your business credentials and personal details
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center shadow-md uppercase">
                {profile.companyName ? profile.companyName.substring(0, 2) : "SP"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0B1720]">
                    {profile.companyName || "Your Company Name"}
                  </h2>
                  {profile.verification_status === "VERIFIED" && <Badge variant="verified" size="sm" />}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Role: Supplier</p>
              </div>
            </div>

            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-1" /> Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave} isLoading={isSaving}>
                  <Save className="w-4 h-4 mr-1" /> Save
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-500 block mb-1 text-xs">Registered Company Name</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                />
              ) : (
                <span className="font-bold text-slate-900">{profile.companyName || "Not provided"}</span>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-500 block mb-1 text-xs">Goods & Services Tax (GSTIN)</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.gstin}
                  onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-emerald-500 uppercase"
                />
              ) : (
                <span className="font-mono font-bold text-slate-900">{profile.gstin || "Not provided"}</span>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-500 block mb-1 text-xs">Primary Authorized Signatory (Name)</span>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                />
              ) : (
                <span className="font-semibold text-slate-900">{profile.name || "Not provided"}</span>
              )}
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="text-slate-500 block mb-1 text-xs">Annual Turnover</span>
              {isEditing ? (
                <select 
                  value={formData.investmentPreference}
                  onChange={(e) => setFormData({...formData, investmentPreference: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select range...</option>
                  <option value="< 1 Cr">Less than 1 Cr</option>
                  <option value="1-5 Cr">1 Cr - 5 Cr</option>
                  <option value="5-20 Cr">5 Cr - 20 Cr</option>
                  <option value="> 20 Cr">Above 20 Cr</option>
                </select>
              ) : (
                <span className="font-semibold text-slate-900">{profile.investmentPreference || "Not provided"}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
