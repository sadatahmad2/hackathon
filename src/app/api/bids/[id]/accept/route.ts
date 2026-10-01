import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bidId } = await params;

    // Get bid
    const { data: bid, error: bidErr } = await supabase
      .from("bids")
      .select("*")
      .eq("id", bidId)
      .single();

    if (bidErr || !bid) {
      return NextResponse.json({ success: false, error: "Bid not found" }, { status: 404 });
    }

    // Get invoice
    const { data: invoice } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", bid.invoice_id)
      .single();

    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    const investorProfit = Number(invoice.amount) - Number(bid.advance_amount);

    // Update bid status to ACCEPTED
    await supabase.from("bids").update({ status: "ACCEPTED" }).eq("id", bidId);

    // Update invoice status to Funded
    await supabase.from("invoices").update({ status: "Funded" }).eq("id", bid.invoice_id);

    // Create escrow record
    const { data: escrow, error: escrowErr } = await supabase
      .from("escrows")
      .insert({
        invoice_id: bid.invoice_id,
        supplier_id: invoice.supplier_id,
        investor_id: bid.investor_id,
        invoice_value: Number(invoice.amount),
        investor_funding: Number(bid.advance_amount),
        supplier_payout: Number(bid.advance_amount),
        expected_repayment: Number(invoice.amount),
        investor_profit: investorProfit,
        status: "ESCROW_ACTIVE",
        funded_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (escrowErr) throw escrowErr;

    return NextResponse.json({
      success: true,
      message: "Bid accepted, escrow activated and supplier payout initiated.",
      escrow,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
