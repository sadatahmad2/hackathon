"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { InflowLogo } from "@/components/brand/InflowLogo";
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  Gavel,
  ArrowDownCircle,
  RefreshCw,
  CreditCard,
  User as UserIcon,
  Store,
  TrendingUp,
  Wallet,
  Users,
  CheckSquare,
  ShieldAlert,
  BookOpen,
  History,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { UserRole } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { success, info } = useToast();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSwitchRoleOpen, setIsSwitchRoleOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Supplier Nav Items
  const supplierNav = [
    { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
    { label: "My Invoices", href: "/supplier/invoices", icon: FileText },
    { label: "Upload Invoice", href: "/supplier/upload-invoice", icon: UploadCloud },
    { label: "Bids Received", href: "/supplier/bids", icon: Gavel },
    { label: "Payouts", href: "/supplier/payouts", icon: ArrowDownCircle },
    { label: "Repayments", href: "/supplier/repayments", icon: RefreshCw },
    { label: "Transactions", href: "/supplier/transactions", icon: CreditCard },
    { label: "Profile", href: "/supplier/profile", icon: UserIcon },
  ];

  // Investor Nav Items
  const investorNav = [
    { label: "Dashboard", href: "/investor/dashboard", icon: LayoutDashboard },
    { label: "Marketplace", href: "/investor/marketplace", icon: Store },
    { label: "My Investments", href: "/investor/investments", icon: TrendingUp },
    { label: "Returns", href: "/investor/returns", icon: Wallet },
    { label: "Transactions", href: "/investor/transactions", icon: CreditCard },
    { label: "Profile", href: "/investor/profile", icon: UserIcon },
  ];

  // Admin Nav Items
  const adminNav = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Invoice Verification", href: "/admin/verification", icon: CheckSquare },
    { label: "Risk Assessment", href: "/admin/risk-assessment", icon: ShieldAlert },
    { label: "Auctions", href: "/admin/auctions", icon: Gavel },
    { label: "Transactions", href: "/admin/transactions", icon: CreditCard },
    { label: "Double Entry Ledger", href: "/admin/ledger", icon: BookOpen },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: History },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  const currentNav =
    role === "SUPPLIER" ? supplierNav : role === "INVESTOR" ? investorNav : adminNav;

  const googleName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest";
  const googleAvatarUrl = user?.user_metadata?.avatar_url;
  const shortName = googleName.slice(0, 2).toUpperCase();

  const userProfile = {
    SUPPLIER: {
      name: googleName,
      sub: "Supplier",
      avatar: shortName,
      color: "bg-emerald-600",
      avatarUrl: googleAvatarUrl,
    },
    INVESTOR: {
      name: googleName,
      sub: "Investor",
      avatar: shortName,
      color: "bg-blue-600",
      avatarUrl: googleAvatarUrl,
    },
    ADMIN: {
      name: googleName,
      sub: "System Admin",
      avatar: shortName,
      color: "bg-indigo-600",
      avatarUrl: googleAvatarUrl,
    },
  }[role];

  // Demo functions removed

  return (
    <div className="min-h-screen flex bg-[#F5F8F8] font-sans antialiased text-[#0B1720]">
      {/* Desktop Dark Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#03131A] text-slate-300 border-r border-[#0F2D3B] shrink-0 sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <InflowLogo variant="dark" size="md" roleTag={role === "SUPPLIER" ? "Supplier" : role === "INVESTOR" ? "Investor" : "Admin"} />
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== `/${role.toLowerCase()}/dashboard` && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-[#00C896] text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Demo Box Removed */}

        {/* Bottom Options */}
        <div className="p-4 border-t border-white/5 space-y-1 text-xs">
          <Link
            href={`/${role.toLowerCase()}/profile`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Sign Out</span>
          </button>

        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200/90 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Global Search Bar */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  role === "SUPPLIER"
                    ? "Search invoices, buyers..."
                    : role === "INVESTOR"
                    ? "Search invoices, companies, industries..."
                    : "Search users, invoices, transactions..."
                }
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C896]/40 focus:border-[#00C896] placeholder:text-slate-400 transition-all"
              />
            </div>
          </div>

          {/* Right Header Icons & Profile */}
          <div className="flex items-center gap-4">
            {/* Quick Demo Reset Button Removed */}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#00C896] rounded-full ring-2 ring-white animate-pulse" />
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-sm text-[#0B1720]">Notifications</h4>
                    <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                      3 New
                    </span>
                  </div>
                  <div className="py-2 space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
                      <p className="font-semibold text-slate-800">New Bid Placed</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Growth Fund placed ₹4,60,000 @ 8.0% on INV-2026-001
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 cursor-pointer">
                      <p className="font-semibold text-slate-800">Verification Complete</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Invoice INV-2026-001 assigned AAA risk rating
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="relative">
              <div
                className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl border border-transparent"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden ${userProfile.color}`}
                >
                  {userProfile.avatarUrl ? (
                    <img src={userProfile.avatarUrl} alt={userProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    userProfile.avatar
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-bold text-[#0B1720] leading-none">
                    {userProfile.name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-none">
                    {userProfile.sub}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-64 max-w-xs bg-[#03131A] text-white p-6 flex flex-col justify-between h-full z-10">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <InflowLogo variant="dark" size="md" roleTag={role === "SUPPLIER" ? "Supplier" : role === "INVESTOR" ? "Investor" : "Admin"} />
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-1">
                  {currentNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                        pathname === item.href ? "bg-[#00C896] text-white font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <button onClick={() => signOut()} className="w-full text-left block text-rose-400 hover:text-rose-300">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
