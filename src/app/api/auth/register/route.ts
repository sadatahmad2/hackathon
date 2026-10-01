import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { UserRole } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, email, name, role, phone, companyName, gstin, investmentPreference } = body;

    if (!userId || !email || !role) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Security check: Only SUPPLIER and INVESTOR allowed via public registration
    const validatedRole: UserRole = role === "INVESTOR" ? "INVESTOR" : role === "ADMIN" ? "ADMIN" : "SUPPLIER";

    // Upsert profile using admin client (bypasses RLS)
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: userId,
        email,
        name: name || email.split("@")[0],
        role: validatedRole,
        phone,
        company_name: companyName,
        gstin,
        investment_preference: investmentPreference,
      })
      .select()
      .single();

    if (error) throw error;

    const redirectMap: Record<UserRole, string> = {
      SUPPLIER: "/supplier/dashboard",
      INVESTOR: "/investor/dashboard",
      ADMIN: "/admin/dashboard",
    };

    return NextResponse.json({
      success: true,
      user: profile,
      redirectTo: redirectMap[validatedRole],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
