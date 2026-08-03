import Link from "next/link";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function ReviewQueuePage() {
  const escalatedIncidents = [
    {
      id: "REQ-0992",
      time: "14:42:05",
      agent: "Billing_Automation_AI",
      target: "stripe_refund_api",
      reason: "Near-threshold cumulative refund behavior",
      status: "ESCALATED",
    },
    {
      id: "REQ-0994",
      time: "14:45:12",
      agent: "CustomerSupport_Bot_V2",
      target: "db_query_users",
      reason: "Semantic mismatch: Support bot querying admin table",
      status: "ESCALATED",
    },
  ];

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
            {escalatedIncidents.map((incident) => (
              <tr
                key={incident.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-4 font-mono text-gray-300">{incident.id}</td>
                <td className="p-4 text-gray-400">{incident.time}</td>
                <td className="p-4 text-blue-400">{incident.agent}</td>
                <td className="p-4 font-mono text-gray-300">
                  {incident.target}
                </td>
                <td className="p-4 text-orange-400 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  {incident.reason}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1 bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1.5 rounded hover:bg-green-500/20 transition">
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="flex items-center gap-1 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded hover:bg-red-500/20 transition">
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {escalatedIncidents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No pending actions in the queue.
          </div>
        )}
      </div>
    </div>
  );
}
