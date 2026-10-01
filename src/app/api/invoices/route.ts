import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const supplierId = searchParams.get("supplierId");

  let query = supabase.from("invoices").select("*").order("created_at", { ascending: false });

  if (status) {
    query = query.ilike("status", status);
  }

  if (supplierId) {
    query = query.eq("supplier_id", supplierId);
  }

  const { data: invoices, error } = await query;

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // Map the snake_case DB columns to camelCase expected by the frontend
  const formattedInvoices = invoices?.map((inv: any) => ({
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
  })) || [];

  return NextResponse.json({ success: true, invoices: formattedInvoices });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get the current user from auth token (we can extract this on client and pass supplierId, or rely on token)
    // For now, since RLS is off and we're sending supplierId in body or using a default for demo
    const {
      supplierId,
      invoiceNumber,
      buyerName,
      buyerGst,
      buyerIndustry,
      amount,
      issueDate,
      dueDate,
      description,
    } = body;

    if (!invoiceNumber || !buyerName || !amount || !supplierId) {
      return NextResponse.json({ success: false, error: "Missing required fields (including supplierId)" }, { status: 400 });
    }

    const dueDateObj = new Date(dueDate || "2026-12-30");
    const issueDateObj = new Date(issueDate || "2026-09-01");
    const diffTime = Math.abs(dueDateObj.getTime() - issueDateObj.getTime());
    const tenureDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 90;

    const { data: newInvoice, error } = await supabase
      .from("invoices")
      .insert({
        supplier_id: supplierId,
        invoice_number: invoiceNumber,
        buyer_name: buyerName,
        buyer_gst: buyerGst || "19ABCDE1234F1Z5",
        buyer_industry: buyerIndustry || "General Industry",
        amount: Number(amount),
        issue_date: issueDate || new Date().toISOString().split("T")[0],
        due_date: dueDate || "2026-12-30",
        tenure_days: tenureDays,
        description: description || "Invoice financing request",
        status: "Pending",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, invoice: newInvoice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
