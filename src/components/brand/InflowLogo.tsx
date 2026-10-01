import React from "react";
import Link from "next/link";

interface InflowLogoProps {
  variant?: "dark" | "light" | "navy";
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  roleTag?: "Supplier" | "Investor" | "Admin" | null;
  href?: string;
  className?: string;
}

export function InflowLogoIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="inflowGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#35E6B0" />
          <stop offset="100%" stopColor="#00C896" />
        </linearGradient>
        <linearGradient id="inflowGradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C896" />
          <stop offset="100%" stopColor="#006B5B" />
        </linearGradient>
      </defs>
      {/* Upper flowing ribbon */}
      <path
        d="M8 10C8 7.79086 9.79086 6 12 6H28.5C31.5376 6 34 8.46243 34 11.5C34 14.5376 31.5376 17 28.5 17H16C13.7909 17 12 18.7909 12 21V21C12 23.2091 10.2091 25 8 25V10Z"
        fill="url(#inflowGradPrimary)"
      />
      {/* Lower complementary flowing ribbon */}
      <path
        d="M16 23C16 20.7909 17.7909 19 20 19H29.5C31.9853 19 34 21.0147 34 23.5C34 25.9853 31.9853 28 29.5 28H18C16.8954 28 16 27.1046 16 26V23Z"
        fill="url(#inflowGradAccent)"
      />
      {/* Subtle dynamic forward dot */}
      <circle cx="28" cy="33" r="3.5" fill="#35E6B0" />
    </svg>
  );
}

export function InflowLogo({
  variant = "light",
  size = "md",
  showWordmark = true,
  roleTag = null,
  href = "/",
  className = "",
}: InflowLogoProps) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const isDark = variant === "dark" || variant === "navy";
  const textColor = isDark ? "text-white" : "text-[#03131A]";
  const subtextColor = isDark ? "text-slate-400" : "text-slate-500";

  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <InflowLogoIcon size={iconSizes[size]} />
      </div>

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-bold tracking-tight ${textSizes[size]} ${textColor} font-sans`}>
              Inflow
            </span>
            {roleTag && (
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#00C896]/15 text-[#00C896] border border-[#00C896]/30">
                {roleTag}
              </span>
            )}
          </div>
          {size === "xl" && (
            <span className={`text-xs ${subtextColor} tracking-wider uppercase font-medium`}>
              Invoice Financing
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-opacity hover:opacity-95 focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
