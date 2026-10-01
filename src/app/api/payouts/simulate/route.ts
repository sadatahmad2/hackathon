import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoiceId, bidId } = body;

    if (bidId) {
      const result = await inflowStore.acceptBid(bidId);
      return NextResponse.json({
        success: true,
        message: "Simulated Payout completed successfully via Escrow.",
        result,
      });
    }

    const invoice = inflowStore.getInvoiceById(invoiceId || "inv-001");
    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    const bids = inflowStore.getBids(invoice.id);
    const bestBid = bids.find((b) => b.status === "BEST_OFFER") || bids[0];

    if (bestBid) {
      const result = await inflowStore.acceptBid(bestBid.id);
      return NextResponse.json({
        success: true,
        message: `Simulated payout of ₹${bestBid.advanceAmount.toLocaleString("en-IN")} released to ${invoice.supplierName}.`,
        result,
      });
    }

    return NextResponse.json({ success: false, error: "No bids found to disburse" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
