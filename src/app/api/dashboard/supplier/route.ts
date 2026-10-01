import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supplierId = searchParams.get("supplierId");

  let query = supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (supplierId) query = query.eq("supplier_id", supplierId);

  const { data: invoices } = await query;
  const invList = invoices || [];

  return NextResponse.json({
    success: true,
    invoices: invList,
    stats: {
      total: invList.length,
      pending: invList.filter((i: any) => i.status === "Pending").length,
      verified: invList.filter((i: any) => i.status === "Verified").length,
      funded: invList.filter((i: any) => i.status === "Funded" || i.status === "Repaid").length,
      totalAmount: invList.reduce((s: number, i: any) => s + Number(i.amount), 0),
    },
  });
}
