import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const invoiceId = body.invoiceId || "inv-001";

    const result = await inflowStore.simulateRepayment(invoiceId);

    return NextResponse.json({
      success: true,
      message: "Day-90 Corporate Repayment simulated successfully. ₹5,00,000 collected into Escrow and ₹40,000 net yield paid to investor.",
      invoice: result.invoice,
      escrow: result.escrow,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
