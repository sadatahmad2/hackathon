import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Inflow | Micro-Enterprise Invoice Financing & Discounting Marketplace",
  description: "Turn unpaid invoices into immediate growth. Connect verified MSME businesses with trusted investors for fast working capital.",
  icons: {
    icon: "/favicon.ico",
  },
};

import { ToastProvider } from "@/components/ui/Toast";
import { AuthProvider } from "@/lib/AuthContext";
import Chatbot from "@/components/Chatbot";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#F5F8F8] text-[#0B1720]">
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}
