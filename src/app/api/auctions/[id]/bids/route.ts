import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bids = inflowStore.getBids(id);
  return NextResponse.json({ success: true, bids });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { advanceAmount, annualYield, investorName } = body;

    if (!advanceAmount || !annualYield) {
      return NextResponse.json(
        { success: false, error: "advanceAmount and annualYield are required" },
        { status: 400 }
      );
    }

    const bid = await inflowStore.placeBid({
      invoiceId: id,
      advanceAmount: Number(advanceAmount),
      annualYield: Number(annualYield),
      investorName,
    });

    return NextResponse.json({ success: true, bid }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
