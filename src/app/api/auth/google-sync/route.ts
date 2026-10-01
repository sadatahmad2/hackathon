import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, avatar, avatarUrl } = body;

    // Check if user already exists in store
    const existingUsers = inflowStore.getUsers();
    const existing = existingUsers.find(
      (u) => u.email.toLowerCase() === email?.toLowerCase()
    );

    if (existing) {
      // Update existing user with Google data
      inflowStore.setCurrentUser({
        ...existing,
        name: name || existing.name,
        avatar: avatar || existing.avatar,
      });

      return NextResponse.json({
        success: true,
        user: existing,
        isExisting: true,
      });
    }

    // Create new user with default SUPPLIER role (will be chosen on choose-role page)
    const newUser = {
      id: id || `user-google-${Date.now()}`,
      email,
      name,
      role: "SUPPLIER" as const,
      avatar: avatar || "U",
      avatarUrl,
      createdAt: new Date().toISOString(),
    };

    inflowStore.setCurrentUser(newUser);

    return NextResponse.json({
      success: true,
      user: newUser,
      isExisting: false,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
