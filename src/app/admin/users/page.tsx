"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { supabase } from "@/lib/supabase";
import { Users, UserCheck, Shield } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApproveUser = async (userId: string) => {
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ verification_status: "VERIFIED" })
        .eq("id", userId);
      if (updateError) throw updateError;
      
      success("User Approved", "The user can now access their dashboard.");
      fetchUsers();
    } catch (err: any) {
      error("Approval failed", err.message);
    }
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            User & Institutional Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Registered MSME Suppliers, Accredited Liquidity Providers, and Operations Personnel
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-6">User / Entity</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Business Details</th>
                <th className="py-3.5 px-6">Registration (GST/PAN)</th>
                <th className="py-3.5 px-6">KYC Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">Loading users...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{u.company_name || u.name}</p>
                      <span className="text-[11px] text-slate-400">{u.email}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.role === "SUPPLIER" ? "bg-blue-50 text-blue-700" :
                        u.role === "INVESTOR" ? "bg-purple-50 text-purple-700" :
                        "bg-slate-100 text-slate-800"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-800 font-semibold">{u.business_type || "N/A"}</div>
                      <div className="text-[11px] text-slate-500">Turnover: {u.turnover || "N/A"}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-700 font-mono text-[11px]">GST: {u.gstin || "N/A"}</div>
                      <div className="text-slate-700 font-mono text-[11px] mt-0.5">PAN: {u.pan || "N/A"}</div>
                    </td>
                    <td className="py-4 px-6">
                      {u.verification_status === "VERIFIED" ? (
                        <Badge variant="verified" size="sm">KYC Approved</Badge>
                      ) : (
                        <Badge variant="pending" size="sm">Pending</Badge>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {u.verification_status === "PENDING" ? (
                        <Button variant="primary" size="sm" onClick={() => handleApproveUser(u.id)} className="bg-emerald-600 hover:bg-emerald-700">
                          Approve
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">Manage</Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
