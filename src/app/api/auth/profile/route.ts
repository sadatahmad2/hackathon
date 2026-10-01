import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, companyName, gstin, investmentPreference, role } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Missing userId" }, { status: 400 });
    }

    const updateData: Record<string, any> = {
      name,
      company_name: companyName,
      gstin,
      investment_preference: investmentPreference,
    };

    // Only allow switching between SUPPLIER and INVESTOR (not ADMIN)
    if (role === "SUPPLIER" || role === "INVESTOR") {
      updateData.role = role;
    }

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, profile: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
