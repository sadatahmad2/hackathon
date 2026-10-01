import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await inflowStore.acceptBid(id);

    return NextResponse.json({
      success: true,
      message: "Bid accepted. Escrow account activated and simulated payout released to supplier.",
      invoice: result.invoice,
      escrow: result.escrow,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
