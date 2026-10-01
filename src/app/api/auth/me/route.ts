import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  const user = inflowStore.getCurrentUser();
  return NextResponse.json({ success: true, user });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.role) {
      const user = inflowStore.setCurrentUserRole(body.role);
      return NextResponse.json({ success: true, user });
    }
    return NextResponse.json({ success: true, user: inflowStore.getCurrentUser() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
