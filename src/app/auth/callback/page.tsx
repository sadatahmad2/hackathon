"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          setError(error.message);
          return;
        }

        if (session) {
          // Check if user exists in our custom profiles table
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("verification_status, role, company_name")
            .eq("id", session.user.id)
            .single();

          if (profileError && profileError.code !== "PGRST116") {
            // Some other error
            setError(profileError.message);
            return;
          }

          if (profile) {
            // If the user was created via Google Login, the trigger assigns default SUPPLIER role 
            // but company_name will be null. We must force them to register to choose their role.
            if (!profile.company_name) {
              router.replace("/register");
              return;
            }

            // User exists, check verification status
            if (profile.verification_status === "VERIFIED") {
              const target = profile.role === "ADMIN" ? "/admin/dashboard" :
                            profile.role === "INVESTOR" ? "/investor/dashboard" :
                            "/supplier/dashboard";
              router.replace(target);
            } else {
              // PENDING or REJECTED
              router.replace("/pending");
            }
          } else {
            // New user, needs registration
            router.replace("/register");
          }
        } else {
          setError("No session found. Please try logging in again.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred during authentication");
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#03131A] flex items-center justify-center">
        <div className="text-center space-y-4 p-8 rounded-2xl bg-white/5 border border-red-500/30 max-w-md">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
            <span className="text-red-400 text-xl">!</span>
          </div>
          <h2 className="text-lg font-bold text-white">Authentication Error</h2>
          <p className="text-sm text-slate-400">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03131A] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
        <p className="text-sm text-slate-400">Authenticating with Google...</p>
      </div>
    </div>
  );
}
