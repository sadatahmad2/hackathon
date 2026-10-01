"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InflowLogo } from "@/components/brand/InflowLogo";
import { Button } from "@/components/ui/Button";
import { Clock, LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

export default function PendingVerificationPage() {
  const { session, signOut } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const checkStatus = async () => {
    if (!session?.user) return;
    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("verification_status, role")
        .eq("id", session.user.id)
        .single();
      
      if (data?.verification_status === "VERIFIED") {
        if (data.role === "SUPPLIER") router.push("/supplier/dashboard");
        else if (data.role === "INVESTOR") router.push("/investor/dashboard");
        else if (data.role === "ADMIN") router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      checkStatus();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-[#03131A] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.12),transparent)] pointer-events-none" />
      
      <div className="max-w-md mx-auto w-full relative z-10 text-center space-y-6 bg-white/[0.04] backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-center mb-4">
          <InflowLogo variant="dark" size="lg" />
        </div>

        <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-2 border border-amber-500/30">
          <Clock className="w-10 h-10 text-amber-400" />
        </div>

        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Under Verification
        </h1>
        
        <p className="text-sm text-slate-400 leading-relaxed">
          Your account has been successfully registered and is currently under review by our Admin team. You will be able to access your dashboard once your profile is verified.
        </p>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
            onClick={checkStatus}
            isLoading={isChecking}
          >
            Check Status Again
          </Button>

          <Button
            variant="outline"
            className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            onClick={() => window.location.href = "/register"}
          >
            Restart Registration (View KYC Form)
          </Button>
          
          <Button
            variant="ghost"
            className="w-full text-slate-400 hover:text-white"
            onClick={async () => {
              await signOut();
              window.location.href = "/login";
            }}
            leftIcon={<LogOut className="w-4 h-4 mr-2" />}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
