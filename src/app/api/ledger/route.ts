import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET() {
  const { data: entries } = await supabase
    .from("ledger")
    .select("*")
    .order("created_at", { ascending: false });

  const formatted = (entries || []).map((e: any) => ({
    id: e.id,
    transactionId: e.transaction_id,
    date: e.date,
    description: e.description,
    account: e.account,
    type: e.type,
    amount: Number(e.amount),
    balanceAfter: Number(e.balance_after),
    status: e.status,
    referenceId: e.reference_id,
  }));

  return NextResponse.json({ success: true, ledger: formatted });
}
