"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Veritabanından gelecek verinin tipi
type Incident = {
  id: string;
  created_at: string;
  agent: string;
  target: string;
  reason: string;
  status: string;
};

export default function ReviewQueuePage() {
  const supabase = createClient();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Sayfa yüklendiğinde Supabase'den ESCALATED durumundaki kayıtları çek
  useEffect(() => {
    async function fetchIncidents() {
      setIsLoading(true);

      // NOT: Veritabanındaki tablo adının "incidents" olduğunu varsayıyoruz.
      // Kendi Supabase tablo ismine göre burayı güncelleyebilirsin.
      const { data, error } = await supabase
        .from("incidents")
        .select("*")
        .eq("status", "ESCALATED")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching incidents:", error);
        // Hata durumunda boş kalmasın diye fallback (sahte) veriyi koyuyoruz,
        // Supabase tablosu hazır olana kadar test edebilmen için:
        setIncidents([
          {
            id: "REQ-0992",
            created_at: new Date().toISOString(),
            agent: "Billing_Automation_AI",
            target: "stripe_refund_api",
            reason: "Near-threshold cumulative refund behavior",
            status: "ESCALATED",
          },
          {
            id: "REQ-0994",
            created_at: new Date(Date.now() - 180000).toISOString(),
            agent: "CustomerSupport_Bot_V2",
            target: "db_query_users",
            reason: "Semantic mismatch: Support bot querying admin table",
            status: "ESCALATED",
          },
        ]);
      } else {
        setIncidents(data || []);
      }

      setIsLoading(false);
    }

    fetchIncidents();
  }, [supabase]);

  // Butonlara basıldığında veritabanını güncelleyen fonksiyon
  const handleAction = async (
    id: string,
    newStatus: "APPROVED" | "REJECTED",
  ) => {
    setProcessingId(id); // Butonu yükleniyor (spinner) durumuna al

    const { error } = await supabase
      .from("incidents")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error(`Error updating status to ${newStatus}:`, error);
      alert("Failed to update the incident. Check console.");
    } else {
      // Başarılı olursa, o kaydı anında ekrandan (listeden) kaldır
      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
    }

    setProcessingId(null);
  };

  // Zaman formatlayıcı (Örn: "14:42:05")
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-GB", { hour12: false });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-2">Human Review Queue</h1>
        <p className="text-gray-400 text-sm">
          High-consequence actions or near-threshold behaviors waiting for
          manual admin approval.
        </p>
      </div>

      <div className="bg-[#121216] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0B0B0E] border-b border-gray-800 text-gray-400">
            <tr>
              <th className="p-4 font-medium">Req ID</th>
              <th className="p-4 font-medium">Time</th>
              <th className="p-4 font-medium">Agent</th>
              <th className="p-4 font-medium">Target Tool / API</th>
              <th className="p-4 font-medium">Flag Reason</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-[#0066EE]" />
                    <span>Loading pending incidents...</span>
                  </div>
                </td>
              </tr>
            ) : incidents.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-gray-500">
                  No pending actions in the queue. Everything is secure.
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 font-mono text-gray-300">
                    {incident.id.substring(0, 8).toUpperCase()}
                  </td>
                  <td className="p-4 text-gray-400">
                    {formatTime(incident.created_at)}
                  </td>
                  <td className="p-4 text-[#0066EE] font-medium">
                    {incident.agent}
                  </td>
                  <td className="p-4 font-mono text-gray-300">
                    {incident.target}
                  </td>
                  <td className="p-4 text-orange-400 flex items-center gap-2">
                    <AlertTriangle size={14} />
                    {incident.reason}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleAction(incident.id, "APPROVED")}
                        disabled={processingId === incident.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                          processingId === incident.id
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20"
                        }`}
                      >
                        {processingId === incident.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <CheckCircle size={14} />
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(incident.id, "REJECTED")}
                        disabled={processingId === incident.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                          processingId === incident.id
                            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                            : "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
                        }`}
                      >
                        {processingId === incident.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <XCircle size={14} />
                        )}
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
