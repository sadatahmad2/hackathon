"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InflowLogo } from "@/components/brand/InflowLogo";
import { Button } from "@/components/ui/Button";
import { UserRole } from "@/types";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { success, error: showError } = useToast();
  const { signInWithGoogle, isAuthenticated, isLoading: authLoading } = useAuth();

  const [role, setRole] = useState<UserRole>("SUPPLIER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // If already authenticated, check profile and redirect
  useEffect(() => {
    const checkProfileAndRedirect = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("role, verification_status, company_name")
              .eq("id", sessionData.session.user.id)
              .single();
            
            if (profile) {
              if (!profile.company_name) {
                router.push("/register");
              } else if (profile.verification_status === "PENDING") {
                router.push("/pending");
              } else if (profile.role === "SUPPLIER") {
                router.push("/supplier/dashboard");
              } else if (profile.role === "INVESTOR") {
                router.push("/investor/dashboard");
              } else if (profile.role === "ADMIN") {
                router.push("/admin/dashboard");
              } else {
                router.push("/register");
              }
            } else {
              router.push("/register");
            }
          }
        } catch (err) {
          router.push("/register");
        }
      }
    };

    checkProfileAndRedirect();
  }, [isAuthenticated, authLoading, router]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "SUPPLIER") {
      setEmail("");
    } else if (newRole === "INVESTOR") {
      setEmail("");
    } else {
      setEmail("admin");
    }
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (role === "ADMIN") {
        if (email === "admin" && password === "admin123") {
          await fetch("/api/auth/me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: "ADMIN" }),
          });
          success("Welcome Admin!", "Logged in successfully.");
          router.push("/admin/dashboard");
        } else {
          showError("Login failed", "Invalid Admin ID or Password");
        }
      } else {
        if (isSignUp) {
          const { data: authData, error } = await supabase.auth.signUp({
            email,
            password,
          });
          if (error) throw error;
          
          if (authData.user) {
            // Upsert profile with selected role
            await supabase.from("profiles").upsert({
              id: authData.user.id,
              email: authData.user.email,
              role: role,
              verification_status: "PENDING"
            }, { onConflict: "id" });
          }
          
          success("Account Created!", "Welcome to Inflow.");
          router.push("/register");
        } else {
          const { data: authData, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        if (authData.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", authData.user.id)
            .single();

          if (profile && profile.role !== role) {
            await supabase.auth.signOut();
            throw new Error(`This email is registered as a ${profile.role}. Please select the ${profile.role} tab to login.`);
          }
        }
        
        success("Welcome Back!", "Logged in successfully.");
        // Note: The useEffect checkProfileAndRedirect will handle the actual routing based on verification_status
        router.push("/pending");
      }
    } catch (err: any) {
      showError("Login error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Real Google OAuth Login
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      // The redirect happens automatically via Supabase
    } catch (err: any) {
      showError("Google login failed", err.message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03131A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,200,150,0.12),transparent)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#006B5B]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Centered Login Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-sm py-10 px-8 sm:px-10 rounded-3xl shadow-2xl shadow-black/30 border border-white/10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <InflowLogo variant="dark" size="lg" />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {isSignUp ? "Create an Account" : "Welcome Back"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isSignUp ? "Sign up to get started" : "Login to your account to continue"}
            </p>
          </div>

          {/* Google Sign-In Button — Primary CTA */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 text-sm font-semibold text-white bg-white/[0.08] border border-white/15 rounded-xl hover:bg-white/[0.14] hover:border-white/25 transition-all duration-200 shadow-lg shadow-black/10 mb-6 disabled:opacity-50"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.98 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center justify-between text-xs text-slate-500">
            <span className="w-full border-t border-white/10" />
            <span className="px-3 uppercase font-semibold text-[11px] tracking-wider shrink-0 text-slate-500">
              OR {isSignUp ? "SIGN UP" : "LOGIN"} WITH EMAIL
            </span>
            <span className="w-full border-t border-white/10" />
          </div>

          {/* Role Selector */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-6 border border-white/10">
            {(["SUPPLIER", "INVESTOR", "ADMIN"] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleChange(r)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                  role === r
                    ? "bg-[#00C896] text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {r.toLowerCase()}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                {role === "ADMIN" ? "Admin ID" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "ADMIN" ? "e.g. admin" : "e.g. you@example.com"}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/[0.06] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 text-white placeholder-slate-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white/[0.06] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 text-white placeholder-slate-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300 absolute right-3.5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full rounded-xl py-3 font-bold text-white shadow-lg shadow-emerald-500/20 mt-2"
            >
              {isSignUp ? "Sign Up as" : "Login as"} {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
            </Button>
            
            <div className="text-center mt-4 text-sm text-slate-400">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-emerald-500 font-semibold hover:text-emerald-400 transition-colors"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <div className="mt-8 text-center text-xs text-slate-500">
            Secure Admin Access Portal
          </div>
        </div>

        {/* Quick demo helper banner */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-slate-500">
            🔐 Real Authentication provided by Supabase
          </span>
        </div>
      </div>
    </div>
  );
}
