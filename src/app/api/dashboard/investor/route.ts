import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  const invoices = inflowStore.getInvoices();
  const marketplaceInvoices = invoices.filter((i) => i.status === "Verified" || i.status === "Active Auction");

  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalInvested: 18500000, // ₹1,85,00,000
        expectedReturns: 1240000, // ₹12,40,000
        activeInvestments: 24,
        repaymentRate: 98.2,
      },
      portfolioBreakdown: [
        { name: "Manufacturing", value: 45, color: "#00C896" },
        { name: "Retail & Electronics", value: 25, color: "#3B82F6" },
        { name: "Infrastructure", value: 18, color: "#8B5CF6" },
        { name: "Export & Trade", value: 12, color: "#F59E0B" },
      ],
      riskBreakdown: [
        { name: "AAA", percentage: 50, color: "#00C896" },
        { name: "AA", percentage: 30, color: "#3B82F6" },
        { name: "A", percentage: 15, color: "#F59E0B" },
        { name: "BBB", percentage: 5, color: "#EC4899" },
      ],
      marketplace: marketplaceInvoices,
    },
  });
}
