"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/MetricCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Invoice } from "@/types";
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowDownCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Eye,
  CheckCircle,
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useAuth } from "@/lib/AuthContext";

export default function SupplierDashboardPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    totalInvoices: 0,
    verified: 0,
    pending: 0,
    fundsReceived: 0,
  });

  const [donutData, setDonutData] = useState<{name: string, value: number, color: string}[]>([]);
  const [recentActivities, setRecentActivities] = useState<{id: string, title: string, time: string, icon: any, bg: string}[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/invoices?supplierId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.invoices) {
          const invs: Invoice[] = data.invoices;
          setInvoices(invs);
          setStats({
            totalInvoices: invs.length,
            verified: invs.filter((i) => i.status === "Verified").length,
            pending: invs.filter((i) => i.status === "Pending").length,
            fundsReceived: invs
              .filter((i) => i.status === "Funded" || i.status === "Repaid")
              .reduce((sum, i) => sum + (i.bestBidAmount || 0), 0),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  return (
    <DashboardLayout role="SUPPLIER">
      <div className="space-y-8">
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back to your Inflow portal
            </p>
          </div>

          <Link href="/supplier/upload-invoice">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Plus className="w-4 h-4 mr-1" />}
              className="rounded-xl px-5 font-semibold text-white shadow-md shadow-emerald-500/20"
            >
              Upload Invoice
            </Button>
          </Link>
        </div>

        {/* 4 Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="Total Invoices"
            value={`${stats.totalInvoices}`}
            trend={{ value: 0, isPositive: true }}
            icon={<FileText className="w-5 h-5 text-blue-600" />}
            iconBgColor="bg-blue-50"
          />
          <MetricCard
            title="Verified"
            value={`${stats.verified}`}
            trend={{ value: 0, isPositive: true }}
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            iconBgColor="bg-emerald-50"
          />
          <MetricCard
            title="Pending"
            value={`${stats.pending}`}
            trend={{ value: 0, isPositive: false }}
            icon={<Clock className="w-5 h-5 text-amber-600" />}
            iconBgColor="bg-amber-50"
          />
          <MetricCard
            title="Funds Received"
            value={`₹${stats.fundsReceived.toLocaleString("en-IN")}`}
            trend={{ value: 0, isPositive: true }}
            icon={<ArrowDownCircle className="w-5 h-5 text-[#00C896]" />}
            iconBgColor="bg-emerald-50"
          />
        </div>

        {/* Middle Section: Donut Chart + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Invoice Status Donut Chart */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#0B1720]">Invoice Status</h3>
              <span className="text-xs text-slate-400 font-medium">Distribution</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              <div className="relative w-48 h-48 flex items-center justify-center text-slate-400 text-sm">
                {donutData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          formatter={(val: any) => [`${val} Invoices`, "Count"]}
                          contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }}
                        />
                        <Pie
                          data={donutData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                        >
                          {donutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Center Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-bold text-[#0B1720]">{stats.totalInvoices}</span>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                        Invoices
                      </span>
                    </div>
                  </>
                ) : (
                  <p>No invoices uploaded</p>
                )}
              </div>

              {/* Legend */}
              {donutData.length > 0 && (
                <div className="space-y-2.5 w-full sm:w-auto">
                  {donutData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-6 text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-[#0B1720]">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-[#0B1720]">Recent Activity</h3>
              <Link href="/supplier/transactions" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                View All
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentActivities.length > 0 ? (
                recentActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.bg}`}>
                      {act.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0B1720] truncate">
                        {act.title}
                      </p>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">{act.time}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm py-10">
                  No recent activity found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* My Invoices Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0B1720]">My Invoices</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of submitted invoices and active financing bids
              </p>
            </div>
            <Link href="/supplier/invoices" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
              View All Invoices <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Invoice No.</th>
                  <th className="py-3.5 px-6">Buyer</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Due Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Best Bid</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.length > 0 ? (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <Link
                          href={`/supplier/invoices/${inv.id}`}
                          className="hover:text-emerald-700 transition-colors"
                        >
                          {inv.invoiceNumber}
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        {inv.buyerName}
                        <span className="block text-[11px] text-slate-400 font-normal">
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
                        ) : inv.status === "Repaid" ? (
                          <Badge variant="success" size="sm">Repaid</Badge>
                        ) : (
                          <Badge variant="rejected" size="sm" />
                        )}
                      </td>
                      <td className="py-4 px-6">
                        {inv.bestBidAmount ? (
                          <div className="font-semibold text-emerald-700">
                            ₹{inv.bestBidAmount.toLocaleString("en-IN")}
                            <span className="text-[11px] text-slate-500 font-normal ml-1">
                              ({inv.bestBidYield}%)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono">—</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/supplier/invoices/${inv.id}`}>
                          <Button variant="outline" size="sm" className="rounded-lg text-xs font-semibold">
                            {inv.bidsCount > 0 ? "View Bids" : "Details"}
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      You haven't uploaded any invoices yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
