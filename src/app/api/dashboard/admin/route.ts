import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  const metrics = inflowStore.getPlatformMetrics();
  const invoices = inflowStore.getInvoices();
  const ledger = inflowStore.getLedger();
  const auditLogs = inflowStore.getAuditLogs();
  const users = inflowStore.getUsers();

  const volumeMonthly = [
    { month: "Jul", volume: 65 },
    { month: "Aug", volume: 78 },
    { month: "Sep", volume: 92 },
    { month: "Oct", volume: 85 },
    { month: "Nov", volume: 110 },
    { month: "Dec", volume: 125 },
  ];

  const riskDistribution = [
    { name: "AAA", value: 35, color: "#00C896" },
    { name: "AA", value: 30, color: "#3B82F6" },
    { name: "A", value: 25, color: "#F59E0B" },
    { name: "BBB", value: 10, color: "#EC4899" },
  ];

  const recentTransactions = [
    {
      id: "tx-1",
      title: "Payout to Ravi Electricals",
      sub: "INV-2026-001 • Instant Payout",
      amount: 460000,
      status: "Success",
      time: "2h ago",
    },
    {
      id: "tx-2",
      title: "Investor Bid - Growth Fund",
      sub: "INV-2026-001 • 8.0% Yield",
      amount: 460000,
      status: "Verified",
      time: "3h ago",
    },
    {
      id: "tx-3",
      title: "Invoice Verified - INV-001",
      sub: "ABC Industries Ltd.",
      amount: 500000,
      status: "Verified",
      time: "5h ago",
    },
    {
      id: "tx-4",
      title: "Repayment Received",
      sub: "Corporate Settlement Account",
      amount: 500000,
      status: "Success",
      time: "1d ago",
    },
  ];

  return NextResponse.json({
    success: true,
    data: {
      metrics,
      volumeMonthly,
      riskDistribution,
      recentTransactions,
      invoices,
      ledger: ledger.slice(0, 10),
      auditLogs: auditLogs.slice(0, 10),
      users,
    },
  });
}
