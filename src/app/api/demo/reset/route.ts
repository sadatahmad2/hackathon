import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST() {
  inflowStore.resetDemo();
  return NextResponse.json({
    success: true,
    message: "Platform state successfully reset to initial showcase demo values.",
  });
}
