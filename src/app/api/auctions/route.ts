import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .in("status", ["Verified", "Active Auction"])
    .order("created_at", { ascending: false });

  const formatted = (invoices || []).map((inv: any) => ({
    id: inv.id,
    supplierId: inv.supplier_id,
    supplierName: inv.supplier_name,
    invoiceNumber: inv.invoice_number,
    buyerName: inv.buyer_name,
    buyerGst: inv.buyer_gst,
    buyerIndustry: inv.buyer_industry,
    amount: Number(inv.amount),
    issueDate: inv.issue_date,
    dueDate: inv.due_date,
    tenureDays: inv.tenure_days,
    description: inv.description,
    status: inv.status,
    riskTier: inv.risk_tier,
    riskScore: inv.risk_score,
    bestBidAmount: inv.best_bid_amount,
    bestBidYield: inv.best_bid_yield,
    bestBidId: inv.best_bid_id,
    bidsCount: inv.bids_count,
    createdAt: inv.created_at,
  }));

  return NextResponse.json({ success: true, invoices: formatted });
}
