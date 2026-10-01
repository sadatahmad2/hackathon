import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  const ledger = inflowStore.getLedger();
  return NextResponse.json({ success: true, ledger });
}
