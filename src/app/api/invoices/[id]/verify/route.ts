import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    
    // Get checklist from body if provided
    const checklist = body.checklist || {};
    const checklistValues = Object.values(checklist) as boolean[];
    
    // Count checked items (if checklist provided, use it; else assume all passed)
    const totalItems = checklistValues.length || 5;
    const checkedItems = checklistValues.filter(Boolean).length;
    const uncheckedCount = totalItems - checkedItems;

    // Rating logic based on checklist:
    // 0 unchecked = 5 stars → AAA (score 95)
    // 1 unchecked = 4 stars → AA  (score 82)
    // 2 unchecked = 3 stars → A   (score 74)
    // 3+ unchecked = 2 stars → BBB (score 65)
    let riskTier: "AAA" | "AA" | "A" | "BBB";
    let score: number;
    let stars: number;

    if (uncheckedCount === 0) {
      riskTier = "AAA"; score = 95; stars = 5;
    } else if (uncheckedCount === 1) {
      riskTier = "AA"; score = 82; stars = 4;
    } else if (uncheckedCount === 2) {
      riskTier = "A"; score = 74; stars = 3;
    } else {
      riskTier = "BBB"; score = 60; stars = 2;
    }

    const { data: inv } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (!inv) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    // Update invoice status to Verified with calculated risk
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
      message: `Invoice verified. Checklist score: ${checkedItems}/${totalItems} → ${stars}★ ${riskTier} rating assigned.`,
      invoice: updatedInv,
      stars,
      riskTier,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
