import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, companyName, gstin, investmentPreference, phone } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        name,
        company_name: companyName,
        gstin,
        investment_preference: investmentPreference,
        phone,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, profile: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
