import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase";

export async function GET() {
  const { data: logs } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false });

  const formatted = (logs || []).map((l: any) => ({
    id: l.id,
    timestamp: l.timestamp,
    user: l.user_name,
    role: l.user_role,
    action: l.action,
    entity: l.entity,
    entityId: l.entity_id,
    ipAddress: l.ip_address,
    metadata: l.metadata,
    previousHash: l.previous_hash,
    currentHash: l.current_hash,
  }));

  return NextResponse.json({ success: true, auditLogs: formatted });
}
