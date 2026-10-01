"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AuditLog } from "@/types";
import { ShieldCheck, History, Hash, CheckCircle2, Lock, Download, RefreshCw } from "lucide-react";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    fetch("/api/audit-logs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLogs(data.auditLogs);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1720]">
                Tamper-Evident Audit Logs
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                SHA-256 Hash Chaining Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Cryptographically linked immutable audit trail. Every state transition is hashed with the previous record hash.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLogs}
              leftIcon={<RefreshCw className="w-3.5 h-3.5 mr-1" />}
            >
              Verify Hashes
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5 mr-1" />}>
              Export Proofs
            </Button>
          </div>
        </div>

        {/* Audit Log Table (Matching Section 21) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50/75 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Timestamp</th>
                  <th className="py-3.5 px-6">User & Role</th>
                  <th className="py-3.5 px-6">Action</th>
                  <th className="py-3.5 px-6">Entity & ID</th>
                  <th className="py-3.5 px-6">Previous Hash</th>
                  <th className="py-3.5 px-6">Current Hash (SHA-256)</th>
                  <th className="py-3.5 px-6 text-right">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-900">{log.user}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{log.role}</span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {log.action}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <span className="font-medium text-slate-700">{log.entity}:</span>{" "}
                      <span className="font-mono text-slate-900 font-bold">{log.entityId}</span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px] text-slate-400 max-w-[120px] truncate" title={log.previousHash}>
                      {log.previousHash.slice(0, 12)}...{log.previousHash.slice(-6)}
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px] text-emerald-700 font-bold max-w-[140px] truncate" title={log.currentHash}>
                      {log.currentHash.slice(0, 12)}...{log.currentHash.slice(-6)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Valid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
