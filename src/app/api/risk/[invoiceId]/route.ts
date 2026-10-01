import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;
  let risk = inflowStore.getRiskAssessment(invoiceId);

  if (!risk) {
    risk = await inflowStore.evaluateRisk(invoiceId);
  }

  return NextResponse.json({ success: true, risk });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  try {
    const { invoiceId } = await params;
    const risk = await inflowStore.evaluateRisk(invoiceId);
    return NextResponse.json({ success: true, risk });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
