"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  label?: string;
  className?: string;
}

export function CountdownTimer({
  initialHours = 2,
  initialMinutes = 14,
  initialSeconds = 32,
  label = "Auction Closes In",
  className = "",
}: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(
    initialHours * 3600 + initialMinutes * 60 + initialSeconds
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div
      className={`inline-flex flex-col items-center bg-white border border-slate-200/90 rounded-xl px-4 py-2 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
        <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
        <span>{label}</span>
      </div>

      <div className="flex items-center gap-1 font-mono font-bold text-lg text-[#0B1720]">
        <div className="flex flex-col items-center">
          <span>{pad(hours)}</span>
          <span className="text-[9px] font-sans font-normal text-slate-400 -mt-1">Hrs</span>
        </div>
        <span className="text-slate-400 mb-2">:</span>
        <div className="flex flex-col items-center">
          <span>{pad(minutes)}</span>
          <span className="text-[9px] font-sans font-normal text-slate-400 -mt-1">Mins</span>
        </div>
        <span className="text-slate-400 mb-2">:</span>
        <div className="flex flex-col items-center">
          <span className="text-emerald-600">{pad(seconds)}</span>
          <span className="text-[9px] font-sans font-normal text-slate-400 -mt-1">Sec</span>
        </div>
      </div>
    </div>
  );
}
