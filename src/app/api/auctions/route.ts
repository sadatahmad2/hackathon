import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  // Return all verified or active auction invoices
  const invoices = inflowStore.getInvoices().filter((i) => i.status === "Verified" || i.status === "Active Auction");
  return NextResponse.json({ success: true, auctions: invoices });
}
