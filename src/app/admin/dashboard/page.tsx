"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  FileText,
  Gavel,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  Zap,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { supabase } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const { success, info, error } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationModal, setSimulationModal] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);

  const fetchDashboardData = () => {
    fetch("/api/dashboard/admin")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .finally(() => setLoading(false));
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const result = await res.json();
      if (result.success && result.users) {
        const pending = result.users.filter((u: any) => u.verification_status === "PENDING");
        setPendingUsers(pending);
      }
    } catch (err) {
      console.error("Failed to fetch pending users", err);
    }
  };

  const handleApproveUser = async (userId: string) => {
    try {
      const res = await fetch("/api/admin/users/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status: "VERIFIED" }),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.error);
      
      success("User Approved", "The user can now access their dashboard.");
      fetchPendingUsers();
    } catch (err: any) {
      error("Approval failed", err.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchPendingUsers();
  }, []);

  const handleSimulateRepayment = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch("/api/repayments/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: "inv-001" }),
      });
      const result = await res.json();

      if (result.success) {
        setSimulationResult(result);
        setSimulationModal(true);
        fetchDashboardData();

        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }

        success(
          "Day-90 Repayment Completed!",
          "₹5,00,000 received from Corporate Buyer into Escrow, ₹40,000 net profit settled to Investor, immutable double-entry ledger & audit logs updated."
        );
      } else {
        error("Simulation failed", result.error);
      }
    } catch (err: any) {
      error("Simulation error", err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  const volumeData = [
    { month: "Jul", volume: 65 },
    { month: "Aug", volume: 78 },
    { month: "Sep", volume: 92 },
    { month: "Oct", volume: 85 },
    { month: "Nov", volume: 110 },
    { month: "Dec", volume: 125 },
  ];

  const riskData = [
    { name: "AAA", value: 35, color: "#00C896" },
    { name: "AA", value: 30, color: "#3B82F6" },
    { name: "A", value: 25, color: "#F59E0B" },
    { name: "BBB", value: 10, color: "#EC4899" },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-8">
        {/* Top Header (Matching Screen 10) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              Platform Overview
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Real-time platform metrics, risk analysis, and transaction liquidity
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Simulate Day-90 Repayment Button (Prompt Section 18) */}
            <Button
              variant="primary"
              size="md"
              isLoading={isSimulating}
              onClick={handleSimulateRepayment}
              leftIcon={<Zap className="w-4 h-4 mr-1 text-white fill-white" />}
              className="rounded-xl px-5 font-bold shadow-md shadow-emerald-500/25 bg-[#006B5B] hover:bg-[#005548]"
            >
              Simulate Day-90 Repayment
            </Button>

            <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last 30 Days</span>
            </div>
          </div>
        </div>

        {/* 4 Financial Metric Cards (Matching Screen 10) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Total Invoice Value"
            value="₹1.8 Cr"
            trend={{ value: 20.5, isPositive: true }}
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            iconBgColor="bg-blue-50"
          />
          <MetricCard
            title="Funded Amount"
            value="₹1.2 Cr"
            trend={{ value: 18.3, isPositive: true }}
            icon={<Wallet className="w-5 h-5 text-emerald-600" />}
            iconBgColor="bg-emerald-50"
          />
          <MetricCard
            title="Active Auctions"
            value="24"
            trend={{ value: 12.5, isPositive: true }}
            icon={<Gavel className="w-5 h-5 text-amber-600" />}
            iconBgColor="bg-amber-50"
          />
          <MetricCard
            title="Total Investors"
            value="182"
            trend={{ value: 28.1, isPositive: true }}
            icon={<Users className="w-5 h-5 text-indigo-600" />}
            iconBgColor="bg-indigo-50"
          />
        </div>

        {/* Middle Section: Volume Chart + Risk Distribution + Recent Transactions (Matching Screen 10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Invoice Volume Bar Chart */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#0B1720]">Invoice Volume</h3>
              <span className="text-xs text-slate-400 font-medium">In Lakhs (₹)</span>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#64748B" }} />
                  <Tooltip
                    formatter={(val: any) => [`₹${val} Lakhs`, "Financed Volume"]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }}
                  />
                  <Bar dataKey="volume" fill="#0EA5E9" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Distribution Donut Chart */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-base text-[#0B1720]">Risk Distribution</h3>
              <Link href="/admin/risk-assessment" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                View Tiers
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      formatter={(val: any) => [`${val}%`, "Share"]}
                      contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }}
                    />
                    <Pie
                      data={riskData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-[#0B1720]">24</span>
                  <span className="text-[9px] uppercase font-semibold text-slate-400">Invoices</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] mt-2 w-full">
                {riskData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-bold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending User Approvals */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#0B1720]">Pending Approvals</h3>
              <Badge variant="pending" size="sm">Action Required</Badge>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
              {pendingUsers.length === 0 ? (
                <div className="text-center text-slate-400 text-sm py-10">No pending approvals</div>
              ) : (
                pendingUsers.map((user: any) => (
                  <div key={user.id} className="flex flex-col gap-2 p-3 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 pr-2">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.company_name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.role} • {user.email}</p>
                      </div>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleApproveUser(user.id)}
                        className="shrink-0 px-3 py-1 h-auto text-xs bg-emerald-600 hover:bg-emerald-700"
                      >
                        Approve User
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1 p-2 bg-white rounded-lg border border-slate-100 text-[11px]">
                      <div><span className="text-slate-400">Business Type:</span> <span className="font-semibold text-slate-700">{user.business_type || 'N/A'}</span></div>
                      <div><span className="text-slate-400">Turnover:</span> <span className="font-semibold text-slate-700">{user.turnover || 'N/A'}</span></div>
                      <div><span className="text-slate-400">GSTIN:</span> <span className="font-mono text-slate-700">{user.gstin || 'N/A'}</span></div>
                      <div><span className="text-slate-400">PAN:</span> <span className="font-mono text-slate-700">{user.pan || 'N/A'}</span></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Removed old Transactions */}
        </div>

        {/* Quick Links Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/admin/verification"
            className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-sm text-[#0B1720] group-hover:text-emerald-700 transition-colors">
                Invoice Verification Queue
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Check documents, GSTIN match & verify</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </Link>

          <Link
            href="/admin/ledger"
            className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-sm text-[#0B1720] group-hover:text-emerald-700 transition-colors">
                Double-Entry Ledger
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Immutable debit & credit records</p>
            </div>
            <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </Link>

          <Link
            href="/admin/audit-logs"
            className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500/40 transition-all flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-sm text-[#0B1720] group-hover:text-emerald-700 transition-colors">
                Cryptographic Audit Logs
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Tamper-evident SHA-256 hash chains</p>
            </div>
            <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </Link>
        </div>

        {/* Day-90 Repayment Simulation Modal */}
        <Modal
          isOpen={simulationModal}
          onClose={() => setSimulationModal(false)}
          title="Day-90 Repayment Simulated!"
          subtitle="Corporate Settlement Lifecycle Completed"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <Zap className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base text-[#0B1720]">₹5,00,000 Settled into Escrow</h3>
              <p className="text-xs text-slate-600">
                Corporate Buyer (ABC Industries Ltd.) fulfilled payment on Day 90.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-slate-700">
              <div className="flex justify-between font-medium">
                <span>Corporate Buyer:</span>
                <span className="font-bold text-slate-900">ABC Industries Ltd.</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Full Repayment Collected:</span>
                <span className="font-bold text-slate-900">₹5,00,000</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Investor Yield Returned:</span>
                <span className="font-bold text-emerald-700">₹40,000 Net Profit</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Ledger Entries Generated:</span>
                <span className="font-mono text-slate-900">TX-1005, TX-1006, TX-1007, TX-1008</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Cryptographic Hash Added:</span>
                <span className="font-mono text-[10px] text-slate-500 truncate max-w-[200px]">
                  Tamper-evident log registered
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Link href="/admin/ledger">
                <Button variant="outline" size="sm">
                  View Ledger Entries
                </Button>
              </Link>
              <Button variant="primary" size="sm" onClick={() => setSimulationModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
