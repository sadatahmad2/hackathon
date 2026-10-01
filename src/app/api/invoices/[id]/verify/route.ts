import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoice = await inflowStore.verifyInvoice(id, true);

    if (!invoice) {
      return NextResponse.json({ success: false, error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Invoice successfully verified and approved. AI Risk engine assigned rating.",
      invoice,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
