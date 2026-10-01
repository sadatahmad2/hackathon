import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bidId, invoiceId } = body;

    if (bidId) {
      // Accept specific bid
      const { data: bid } = await supabase.from("bids").select("*").eq("id", bidId).single();
      if (!bid) return NextResponse.json({ success: false, error: "Bid not found" }, { status: 404 });

      const { data: invoice } = await supabase.from("invoices").select("*").eq("id", bid.invoice_id).single();
      if (!invoice) return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });

      await supabase.from("bids").update({ status: "ACCEPTED" }).eq("id", bidId);
      await supabase.from("invoices").update({ status: "Funded" }).eq("id", bid.invoice_id);

      const investorProfit = Number(invoice.amount) - Number(bid.advance_amount);
      const { data: escrow } = await supabase.from("escrows").insert({
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
      }).select().single();

      return NextResponse.json({ success: true, escrow, message: "Payout simulated successfully." });
    }

    if (invoiceId) {
      const { data: invoice } = await supabase.from("invoices").select("*").eq("id", invoiceId).single();
      if (!invoice) return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });

      const { data: bids } = await supabase
        .from("bids")
        .select("*")
        .eq("invoice_id", invoiceId)
        .order("advance_amount", { ascending: false })
        .limit(1);

      const bestBid = bids?.[0];
      if (!bestBid) return NextResponse.json({ success: false, error: "No bids found for this invoice" }, { status: 404 });

      await supabase.from("bids").update({ status: "ACCEPTED" }).eq("id", bestBid.id);
      await supabase.from("invoices").update({ status: "Funded" }).eq("id", invoiceId);

      const investorProfit = Number(invoice.amount) - Number(bestBid.advance_amount);
      const { data: escrow } = await supabase.from("escrows").insert({
        invoice_id: invoiceId,
        supplier_id: invoice.supplier_id,
        investor_id: bestBid.investor_id,
        invoice_value: Number(invoice.amount),
        investor_funding: Number(bestBid.advance_amount),
        supplier_payout: Number(bestBid.advance_amount),
        expected_repayment: Number(invoice.amount),
        investor_profit: investorProfit,
        status: "ESCROW_ACTIVE",
        funded_at: new Date().toISOString(),
      }).select().single();

      return NextResponse.json({ success: true, escrow, message: "Best bid accepted and payout simulated." });
    }

    return NextResponse.json({ success: false, error: "bidId or invoiceId required" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
