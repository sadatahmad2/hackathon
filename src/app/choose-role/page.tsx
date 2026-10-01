"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { InflowLogo } from "@/components/brand/InflowLogo";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { UserRole } from "@/types";
import {
  Store,
  TrendingUp,
  ShieldCheck,
  Check,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    key: "SUPPLIER" as UserRole,
    title: "Supplier",
    description: "Upload invoices, get immediate funds and manage your cash flow.",
    path: "/supplier/dashboard",
    icon: Store,
    color: "emerald",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    btnClass: "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/25 hover:shadow-emerald-500/40",
    checkBg: "bg-emerald-500/20",
    checkColor: "text-emerald-400",
    features: [
      "Upload Invoices",
      "Get instant bids",
      "Receive payout",
      "Track repayments",
    ],
  },
  {
    key: "INVESTOR" as UserRole,
    title: "Investor",
    description: "Invest in verified invoices and earn attractive returns.",
    path: "/investor/dashboard",
    icon: TrendingUp,
    color: "teal",
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-400",
    borderHover: "hover:border-teal-500/50",
    btnClass: "bg-teal-600 hover:bg-teal-500 shadow-teal-600/25 hover:shadow-teal-600/40",
    checkBg: "bg-teal-500/20",
    checkColor: "text-teal-400",
    features: [
      "Browse invoices",
      "Place competitive bids",
      "Earn fixed returns",
      "Track your portfolio",
    ],
  },
  {
    key: "ADMIN" as UserRole,
    title: "Admin",
    description: "Manage platform operations and monitor transactions.",
    path: "/admin/dashboard",
    icon: ShieldCheck,
    color: "violet",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/50",
    btnClass: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/25 hover:shadow-violet-600/40",
    checkBg: "bg-violet-500/20",
    checkColor: "text-violet-400",
    features: [
      "Verify invoices",
      "Manage users",
      "Monitor auctions",
      "View analytics",
    ],
  },
];

export default function ChooseRolePage() {
  const router = useRouter();
  const { info } = useToast();

  const handleSelectRole = async (role: UserRole, targetPath: string) => {
    await fetch("/api/auth/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    info(`Active persona set to ${role}`);
    router.push(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#03131A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.12),transparent)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#006B5B]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <InflowLogo variant="dark" size="lg" />
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choose Your Role
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Select how you want to use Inflow
          </p>
        </div>

        {/* 3 Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={role.key}
                className={`relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 border border-white/10 ${role.borderHover} shadow-lg shadow-black/20 hover:shadow-xl hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
                onClick={() => handleSelectRole(role.key, role.path)}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Icon */}
                <div>
                  <div className={`w-12 h-12 rounded-xl ${role.iconBg} ${role.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl font-bold text-white mb-1.5">{role.title}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {role.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-6">
                    {role.features.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                        <div className={`w-4 h-4 rounded-full ${role.checkBg} flex items-center justify-center shrink-0`}>
                          <Check className={`w-2.5 h-2.5 ${role.checkColor} stroke-[3]`} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full rounded-xl py-3 font-bold text-white text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group-hover:gap-3 ${role.btnClass}`}
                >
                  Continue as {role.title}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom hint */}
        <div className="mt-10 text-center text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
            💡 You can switch between all 3 roles anytime using the sidebar switcher
          </span>
        </div>
      </div>
    </div>
  );
}
