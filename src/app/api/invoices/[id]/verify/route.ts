import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Calculate a simple risk score/tier based on invoice data
    const { data: inv } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (!inv) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    // Simple AI-simulated risk scoring
    const score = Math.min(96, Math.max(70, Math.floor(85 + (inv.amount % 12))));
    let riskTier: "AAA" | "AA" | "A" | "BBB" = "AAA";
    if (score < 75) riskTier = "BBB";
    else if (score < 80) riskTier = "A";
    else if (score < 90) riskTier = "AA";

    // Update invoice status to Verified in Supabase
    const { data: updatedInv, error: updateError } = await supabase
      .from("invoices")
      .update({
        status: "Verified",
        risk_tier: riskTier,
        risk_score: score,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError || !updatedInv) {
      return NextResponse.json(
        { success: false, error: updateError?.message || "Failed to update invoice" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Invoice successfully verified and approved. AI Risk Engine assigned ${riskTier} rating.`,
      invoice: updatedInv,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
