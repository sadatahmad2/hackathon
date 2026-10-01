import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: bids } = await supabase
    .from("bids")
    .select("*")
    .eq("invoice_id", id)
    .order("placed_at", { ascending: false });

  const formatted = (bids || []).map((b: any) => ({
    id: b.id,
    invoiceId: b.invoice_id,
    investorId: b.investor_id,
    investorName: b.investor_name,
    advanceAmount: Number(b.advance_amount),
    annualYield: Number(b.annual_yield),
    expectedReturn: Number(b.expected_return),
    totalRepayment: Number(b.total_repayment),
    status: b.status,
    placedAt: b.placed_at,
  }));

  return NextResponse.json({ success: true, bids: formatted });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: invoiceId } = await params;
    const body = await request.json();
    const { investorId, investorName, advanceAmount, annualYield } = body;

    if (!investorId || !advanceAmount || !annualYield) {
      return NextResponse.json({ success: false, error: "Missing required bid fields" }, { status: 400 });
    }

    // Get invoice to calculate expected return
    const { data: inv } = await supabase
      .from("invoices")
      .select("amount")
      .eq("id", invoiceId)
      .single();

    if (!inv) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    const expectedReturn = Number(inv.amount) - Number(advanceAmount);
    const totalRepayment = Number(inv.amount);

    // Mark previous best offer as ACTIVE
    await supabase
      .from("bids")
      .update({ status: "ACTIVE" })
      .eq("invoice_id", invoiceId)
      .eq("status", "BEST_OFFER");

    // Insert new bid
    const { data: newBid, error: bidError } = await supabase
      .from("bids")
      .insert({
        invoice_id: invoiceId,
        investor_id: investorId,
        investor_name: investorName || "Investor",
        advance_amount: Number(advanceAmount),
        annual_yield: Number(annualYield),
        expected_return: expectedReturn,
        total_repayment: totalRepayment,
        status: "BEST_OFFER",
      })
      .select()
      .single();

    if (bidError) throw bidError;

    // Update invoice best bid info and bids count
    await supabase
      .from("invoices")
      .update({
        best_bid_amount: Number(advanceAmount),
        best_bid_yield: Number(annualYield),
        best_bid_id: newBid.id,
        bids_count: supabase.rpc ? undefined : undefined, // increment handled separately
      })
      .eq("id", invoiceId);

    // Increment bids_count
    await supabase.rpc("increment_bids_count", { invoice_id: invoiceId }).catch(() => {
      // If RPC doesn't exist, do manual increment
      supabase.from("invoices").select("bids_count").eq("id", invoiceId).single().then(({ data }) => {
        supabase.from("invoices").update({ bids_count: (data?.bids_count || 0) + 1 }).eq("id", invoiceId);
      });
    });

    return NextResponse.json({ success: true, bid: newBid }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
