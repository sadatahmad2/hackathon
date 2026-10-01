"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/ui/MetricCard";
import {
  TrendingUp,
  FileText,
  Wallet,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyVolume = [
  { month: "Apr", volume: 18.5, funded: 12.3 },
  { month: "May", volume: 22.1, funded: 15.8 },
  { month: "Jun", volume: 19.4, funded: 14.2 },
  { month: "Jul", volume: 26.7, funded: 20.1 },
  { month: "Aug", volume: 30.2, funded: 23.5 },
  { month: "Sep", volume: 38.6, funded: 30.8 },
];

const riskDistribution = [
  { name: "AAA", value: 45, color: "#00C896" },
  { name: "AA", value: 30, color: "#3B82F6" },
  { name: "A", value: 18, color: "#F59E0B" },
  { name: "BBB", value: 7, color: "#EF4444" },
];

const industryBreakdown = [
  { industry: "Manufacturing", count: 12 },
  { industry: "Technology", count: 8 },
  { industry: "Textiles", count: 5 },
  { industry: "Pharma", count: 4 },
  { industry: "FMCG", count: 3 },
  { industry: "Other", count: 6 },
];

const userGrowth = [
  { month: "Apr", suppliers: 12, investors: 8 },
  { month: "May", suppliers: 18, investors: 11 },
  { month: "Jun", suppliers: 22, investors: 15 },
  { month: "Jul", suppliers: 28, investors: 19 },
  { month: "Aug", suppliers: 34, investors: 25 },
  { month: "Sep", suppliers: 41, investors: 31 },
];

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg text-xs">
        <div className="font-bold text-slate-600 mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.value}
            {p.name.toLowerCase().includes("volume") || p.name.toLowerCase().includes("funded") ? "L" : ""}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
            Platform Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Comprehensive KPIs, volume trends, risk distribution, and user growth
          </p>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Total Invoice Volume", value: "₹1.55Cr", trend: { value: 28.4, isPositive: true }, icon: <FileText className="w-5 h-5 text-emerald-600" />, bg: "bg-emerald-50" },
            { title: "Total Funded", value: "₹1.24Cr", trend: { value: 22.1, isPositive: true }, icon: <Wallet className="w-5 h-5 text-blue-600" />, bg: "bg-blue-50" },
            { title: "Active Suppliers", value: "41", trend: { value: 14.5, isPositive: true }, icon: <Users className="w-5 h-5 text-teal-600" />, bg: "bg-teal-50" },
            { title: "Active Investors", value: "31", trend: { value: 18.7, isPositive: true }, icon: <TrendingUp className="w-5 h-5 text-purple-600" />, bg: "bg-purple-50" },
            { title: "Platform Revenue", value: "₹1.22L", trend: { value: 9.3, isPositive: true }, icon: <BarChart3 className="w-5 h-5 text-amber-600" />, bg: "bg-amber-50" },
            { title: "Avg Risk Score", value: "84.6", trend: { value: 2.1, isPositive: true }, icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />, bg: "bg-indigo-50" },
          ].map((card) => (
            <MetricCard
              key={card.title}
              title={card.title}
              value={card.value}
              trend={card.trend}
              icon={card.icon}
              iconBgColor={card.bg}
            />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Volume Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0B1720] mb-4">
              Monthly Invoice Volume vs. Funded (₹ Lakhs)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyVolume} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} unit="L" />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="volume" name="Volume" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="funded" name="Funded" fill="#00C896" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution Donut */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0B1720] mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              {riskDistribution.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-600 font-medium">{d.name}</span>
                  <span className="text-slate-400 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Line Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0B1720] mb-4">User Growth (Suppliers vs Investors)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Line type="monotone" dataKey="suppliers" name="Suppliers" stroke="#00C896" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="investors" name="Investors" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Industry Breakdown Bar Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0B1720] mb-4">Invoice Count by Industry</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={industryBreakdown} layout="vertical" barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="industry" type="category" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={90} />
                <Tooltip />
                <Bar dataKey="count" name="Invoices" fill="#00C896" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
