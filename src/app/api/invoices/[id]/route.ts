import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Fetch invoice
  const { data: inv, error: invoiceError } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (invoiceError || !inv) {
    return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
  }

  // Format invoice to match camelCase frontend types
  const invoice = {
    id: inv.id,
    supplierId: inv.supplier_id,
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
  };

  // Fetch bids
  const { data: dbBids } = await supabase
    .from("bids")
    .select("*")
    .eq("invoice_id", id)
    .order("placed_at", { ascending: false });

  const bids = dbBids?.map((b) => ({
    id: b.id,
    invoiceId: b.invoice_id,
    investorId: b.investor_id,
    advanceAmount: Number(b.advance_amount),
    annualYield: Number(b.annual_yield),
    expectedReturn: Number(b.expected_return),
    status: b.status,
    placedAt: b.placed_at,
  })) || [];

  // Fetch escrow
  const { data: dbEscrow } = await supabase
    .from("escrows")
    .select("*")
    .eq("invoice_id", id)
    .single();

  let escrow = null;
  if (dbEscrow) {
    escrow = {
      id: dbEscrow.id,
      invoiceId: dbEscrow.invoice_id,
      investorId: dbEscrow.investor_id,
      supplierId: dbEscrow.supplier_id,
      investorFunding: Number(dbEscrow.investor_funding),
      supplierPayout: Number(dbEscrow.supplier_payout),
      investorProfit: Number(dbEscrow.investor_profit),
      expectedRepayment: Number(dbEscrow.expected_repayment),
      status: dbEscrow.status,
      fundedAt: dbEscrow.funded_at,
      repaidAt: dbEscrow.repaid_at,
    };
  }

  // Construct risk assessment from invoice fields
  const risk = inv.risk_tier ? {
    id: `risk-${inv.id}`,
    invoiceId: inv.id,
    tier: inv.risk_tier,
    score: inv.risk_score,
    assessedAt: inv.created_at,
    factors: ["GST verified", "Industry standard", "Payment history check pending"],
  } : null;

  return NextResponse.json({
    success: true,
    invoice,
    bids,
    risk,
    escrow,
  });
}
