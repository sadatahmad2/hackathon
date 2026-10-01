import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const investorId = searchParams.get("investorId");

  let query = supabase
    .from("bids")
    .select("*, invoices(invoice_number, buyer_name, amount, due_date, status)")
    .order("placed_at", { ascending: false });

  if (investorId) query = query.eq("investor_id", investorId);

  const { data: bids } = await query;

  const formatted = (bids || []).map((b: any) => ({
    id: b.id,
    invoiceId: b.invoice_id,
    invoiceNumber: b.invoices?.invoice_number,
    buyerName: b.invoices?.buyer_name,
    invoiceAmount: Number(b.invoices?.amount || 0),
    dueDate: b.invoices?.due_date,
    invoiceStatus: b.invoices?.status,
    advanceAmount: Number(b.advance_amount),
    annualYield: Number(b.annual_yield),
    expectedReturn: Number(b.expected_return),
    status: b.status,
    placedAt: b.placed_at,
  }));

  return NextResponse.json({ success: true, bids: formatted });
}
