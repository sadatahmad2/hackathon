import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string | number;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  iconBgColor?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  trend,
  icon,
  iconBgColor = "bg-blue-50 text-blue-600",
  subtitle,
  badge,
  className = "",
}: MetricCardProps) {
  const isPositive = trend?.isPositive ?? (typeof trend?.value === "number" ? trend.value >= 0 : true);

  return (
    <div
      className={`bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-[#0B1720]">
              {value}
            </h3>
            {badge}
          </div>
        </div>

        {icon && (
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBgColor}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
        {trend ? (
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${
                isPositive
                  ? "text-emerald-700 bg-emerald-50"
                  : "text-rose-700 bg-rose-50"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {typeof trend.value === "number" ? `${Math.abs(trend.value)}%` : trend.value}
            </span>
            <span className="text-xs text-slate-400">vs last month</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400">{subtitle || "Updated real-time"}</span>
        )}
      </div>
    </div>
  );
}
