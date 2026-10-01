import { NextResponse } from "next/server";
import { inflowStore } from "@/lib/store";

export async function GET() {
  const auditLogs = inflowStore.getAuditLogs();
  return NextResponse.json({ success: true, auditLogs });
}
