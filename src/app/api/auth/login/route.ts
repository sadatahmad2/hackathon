import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    const users = inflowStore.getUsers();
    let user = users.find((u) => u.email.toLowerCase() === email?.toLowerCase());

    if (!user && role) {
      user = inflowStore.setCurrentUserRole(role);
    } else if (user) {
      inflowStore.setCurrentUser(user);
    } else {
      // Default to the requested role or supplier
      user = inflowStore.setCurrentUserRole(role || "SUPPLIER");
    }

    // Role-specific redirect
    const redirectMap = {
      SUPPLIER: "/supplier/dashboard",
      INVESTOR: "/investor/dashboard",
      ADMIN: "/admin/dashboard",
    };

    return NextResponse.json({
      success: true,
      user,
      redirectTo: redirectMap[user.role],
      token: `demo-jwt-token-${user.id}-${Date.now()}`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
