"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InflowLogo } from "@/components/brand/InflowLogo";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { success } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    success("Reset Link Sent", "Check your email inbox for password recovery instructions.");
  };

  return (
    <div className="min-h-screen bg-[#F5F8F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-10 px-8 sm:px-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80">
          <div className="flex justify-center mb-6">
            <InflowLogo variant="light" size="lg" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#0B1720] tracking-tight">
              Reset Password
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your email to receive a password recovery link
            </p>
          </div>

          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#00C896] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900">Email Sent Successfully</h3>
              <p className="text-xs text-slate-500">
                We sent instructions to <strong>{email}</strong>. Check your inbox to set a new password.
              </p>
              <Link href="/login" className="inline-block mt-4">
                <Button variant="outline" size="sm">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full rounded-xl py-3 font-bold text-white shadow-md shadow-emerald-600/20"
              >
                Send Reset Link
              </Button>

              <div className="pt-4 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
