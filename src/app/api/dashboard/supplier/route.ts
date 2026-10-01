import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  const invoices = inflowStore.getInvoices();
  const verified = invoices.filter((i) => i.status === "Verified" || i.status === "Funded" || i.status === "Repaid").length;
  const pending = invoices.filter((i) => i.status === "Pending" || i.status === "Under Review").length;
  const underReview = invoices.filter((i) => i.status === "Under Review").length;
  const rejected = invoices.filter((i) => i.status === "Rejected").length;
  const total = invoices.length;

  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalInvoices: 12,
        totalInvoicesGrowth: 20,
        verifiedCount: 8,
        verifiedGrowth: 14,
        pendingCount: 2,
        pendingGrowth: -33,
        fundsReceived: 4850000,
        fundsReceivedGrowth: 18.2,
      },
      statusDistribution: [
        { name: "Verified", value: 5, color: "#00C896" },
        { name: "Pending", value: 2, color: "#3B82F6" },
        { name: "Under Review", value: 3, color: "#F59E0B" },
        { name: "Rejected", value: 2, color: "#EF4444" },
      ],
      recentActivity: [
        {
          id: "act-1",
          title: "Invoice INV-2026-001 verified",
          timeAgo: "2 hours ago",
          type: "VERIFIED",
        },
        {
          id: "act-2",
          title: "New bid received (₹4,60,000)",
          timeAgo: "3 hours ago",
          type: "BID_RECEIVED",
        },
        {
          id: "act-3",
          title: "Payout released to your account",
          timeAgo: "1 day ago",
          type: "PAYOUT",
        },
        {
          id: "act-4",
          title: "Invoice INV-2026-002 uploaded",
          timeAgo: "2 days ago",
          type: "UPLOADED",
        },
      ],
      invoices,
    },
  });
}
