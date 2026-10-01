import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";
import { User, UserRole } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, phone, companyName, gstin, investmentPreference } = body;

    // Security check: Admin role cannot be created via public registration
    const validatedRole: UserRole = role === "INVESTOR" ? "INVESTOR" : "SUPPLIER";

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || "New User",
      email: email || `user_${Date.now()}@example.com`,
      role: validatedRole,
      phone,
      companyName: companyName || (validatedRole === "SUPPLIER" ? "Enterprise Vendor Ltd." : undefined),
      gstin: gstin || (validatedRole === "SUPPLIER" ? "27AABCS1234F1Z1" : undefined),
      investmentPreference,
      avatar: (name || "NU").slice(0, 2).toUpperCase(),
      createdAt: new Date().toISOString(),
    };

    inflowStore.setCurrentUser(newUser);

    const redirectMap = {
      SUPPLIER: "/supplier/dashboard",
      INVESTOR: "/investor/dashboard",
      ADMIN: "/admin/dashboard",
    };

    return NextResponse.json({
      success: true,
      user: newUser,
      redirectTo: redirectMap[validatedRole],
      token: `demo-jwt-token-${newUser.id}`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
