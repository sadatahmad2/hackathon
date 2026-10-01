import React from "react";
import { CheckCircle2, AlertCircle, Clock, XCircle, ShieldCheck, Flame } from "lucide-react";

export type BadgeVariant =
  | "verified"
  | "pending"
  | "under_review"
  | "rejected"
  | "aaa"
  | "aa"
  | "a"
  | "bbb"
  | "best_offer"
  | "escrow"
  | "success"
  | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
}

export function Badge({
  variant = "verified",
  children,
  size = "md",
  className = "",
  icon = true,
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-2",
  };

  const variants = {
    verified: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
      defaultText: "Verified",
    },
    success: {
      bg: "bg-[#00C896]/10 text-[#008A64] border-[#00C896]/30",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#00C896]" />,
      defaultText: "Success",
    },
    pending: {
      bg: "bg-amber-50 text-amber-700 border-amber-200/80",
      icon: <Clock className="w-3.5 h-3.5 text-amber-500" />,
      defaultText: "Pending",
    },
    under_review: {
      bg: "bg-blue-50 text-blue-700 border-blue-200/80",
      icon: <AlertCircle className="w-3.5 h-3.5 text-blue-500" />,
      defaultText: "Under Review",
    },
    rejected: {
      bg: "bg-rose-50 text-rose-700 border-rose-200/80",
      icon: <XCircle className="w-3.5 h-3.5 text-rose-500" />,
      defaultText: "Rejected",
    },
    aaa: {
      bg: "bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      defaultText: "AAA — Low Risk",
    },
    aa: {
      bg: "bg-cyan-50 text-cyan-800 border-cyan-300 font-semibold",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />,
      defaultText: "AA — Moderate Risk",
    },
    a: {
      bg: "bg-amber-50 text-amber-800 border-amber-300 font-semibold",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />,
      defaultText: "A — Moderate",
    },
    bbb: {
      bg: "bg-rose-50 text-rose-800 border-rose-300 font-semibold",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />,
      defaultText: "BBB — Higher Risk",
    },
    best_offer: {
      bg: "bg-emerald-500 text-white font-medium shadow-sm border-emerald-600",
      icon: <Flame className="w-3 h-3 text-white fill-white" />,
      defaultText: "Best Offer",
    },
    escrow: {
      bg: "bg-emerald-900/10 text-emerald-900 border-emerald-500/40 font-semibold",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      defaultText: "ESCROW ACTIVE",
    },
    outline: {
      bg: "bg-white text-slate-700 border-slate-200",
      icon: null,
      defaultText: "",
    },
  };

  const current = variants[variant] || variants.verified;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${sizeStyles[size]} ${className}`}
    >
      {icon && current.icon}
      <span>{children || current.defaultText}</span>
    </span>
  );
}
