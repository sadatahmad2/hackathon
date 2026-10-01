import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { invoiceId } = await request.json();

    if (!invoiceId) {
      return NextResponse.json({ success: false, error: "invoiceId required" }, { status: 400 });
    }

    const { data: invoice } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();

    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    // Update invoice status to Repaid
    await supabase.from("invoices").update({ status: "Repaid" }).eq("id", invoiceId);

    // Update escrow status to SETTLED
    await supabase
      .from("escrows")
      .update({ status: "SETTLED", repaid_at: new Date().toISOString() })
      .eq("invoice_id", invoiceId);

    // Insert ledger entries
    const txId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
    await supabase.from("ledger").insert([
      {
        transaction_id: txId,
        description: `Corporate Buyer Repayment: ${invoice.buyer_name} → Escrow`,
        account: "Escrow Settlement A/C",
        type: "CREDIT",
        amount: Number(invoice.amount),
        balance_after: Number(invoice.amount),
        status: "POSTED",
        reference_id: invoice.id,
      },
      {
        transaction_id: txId,
        description: `Buyer Obligation Fulfilled: ${invoice.buyer_name}`,
        account: "Trade Accounts Receivable A/C",
        type: "DEBIT",
        amount: Number(invoice.amount),
        balance_after: 0,
        status: "POSTED",
        reference_id: invoice.id,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: `Repayment of ₹${Number(invoice.amount).toLocaleString("en-IN")} successfully simulated.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
