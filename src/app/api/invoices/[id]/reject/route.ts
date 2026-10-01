import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: updatedInv, error: updateError } = await supabase
      .from("invoices")
      .update({ status: "Rejected" })
      .eq("id", id)
      .select()
      .single();

    if (updateError || !updatedInv) {
      return NextResponse.json(
        { success: false, error: updateError?.message || "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Invoice rejected.",
      invoice: updatedInv,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
