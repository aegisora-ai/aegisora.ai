"use client";
import React, { useState, useEffect } from "react";
import { 
  CheckCircle, XCircle, AlertTriangle, Bot, Clock, User, 
  Check, X, ShieldAlert, Database, Loader2, RefreshCw
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchApprovals = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("approvals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!error && data) setApprovals(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  // Demo Amaçlı: Sahte bir Escalation İsteği Üretir
  const simulateEscalation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const newEscalation = {
        user_id: user.id,
        agent_name: "Code Reviewer AI",
        intent: "Git Commit & Push",
        description: "Agent requested to merge files into 'production' branch without peer review.",
        risk_level: "Critical",
        policy_triggered: "Production Branch Protection",
        requester: "dev_backend_01",
        payload: `{"tool": "git_push", "branch": "production", "force": true}`,
        status: "PENDING"
      };
      await supabase.from("approvals").insert([newEscalation]);
      fetchApprovals();
    }
  };

  // Onayla veya Reddet
  const handleAction = async (id: string, actionStatus: "APPROVED" | "DENIED") => {
    setActionLoading(id);
    
    // Arkada DB'yi güncelle
    const { error } = await supabase
      .from("approvals")
      .update({ status: actionStatus })
      .eq("id", id);

    if (!error) {
      // Ekranda anında listeyi yenile
      setApprovals(approvals.map(req => req.id === id ? { ...req, status: actionStatus } : req));
    }
    setActionLoading(null);
  };

  const filteredApprovals = approvals.filter(req => req.status === activeTab);
  const pendingCount = approvals.filter(req => req.status === "PENDING").length;

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Human Approvals (Escalations)</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Review and action high-risk AI requests paused by Aegisora policies.</p>
        </div>
        <button onClick={simulateEscalation} type="button" className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 text-sm font-bold rounded-lg hover:bg-amber-100 transition-colors border border-amber-200">
          <RefreshCw className="w-4 h-4" /> Simulate Request
        </button>
      </div>

      {/* INBOX TABS */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("PENDING")}
          className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === "PENDING" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
        >
          Pending Review {pendingCount > 0 && <span className="ml-1 bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-xs">{pendingCount}</span>}
          {activeTab === "PENDING" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("APPROVED")}
          className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === "APPROVED" ? "text-emerald-600" : "text-slate-500 hover:text-slate-800"}`}
        >
          Approved
          {activeTab === "APPROVED" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full"></div>}
        </button>
        <button 
          onClick={() => setActiveTab("DENIED")}
          className={`pb-4 text-sm font-bold transition-colors relative ${activeTab === "DENIED" ? "text-rose-600" : "text-slate-500 hover:text-slate-800"}`}
        >
          Denied
          {activeTab === "DENIED" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-600 rounded-t-full"></div>}
        </button>
      </div>

      {/* APPROVAL FEED */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
            <p className="text-sm font-bold">Syncing inbox...</p>
          </div>
        ) : filteredApprovals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-slate-200 rounded-xl">
            <CheckCircle className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-lg font-black text-slate-900 mb-1">Inbox Zero</h3>
            <p className="text-sm text-slate-500">No {activeTab.toLowerCase()} escalations found.</p>
          </div>
        ) : (
          filteredApprovals.map((req) => (
            <div key={req.id} className={`bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col lg:flex-row relative ${
              req.status === 'PENDING' ? 'border-amber-200' : 
              req.status === 'APPROVED' ? 'border-emerald-200' : 'border-rose-200'
            }`}>
              
              {/* STATUS BADGE STRIP */}
              <div className={`absolute top-0 left-0 w-1.5 h-full ${
                req.status === 'PENDING' ? 'bg-amber-500' : 
                req.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></div>

              {/* CONTENT AREA */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded border ${
                        req.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                        req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                        'bg-rose-100 text-rose-700 border-rose-200'
                      }`}>
                        {req.status === 'PENDING' ? 'Escalated' : req.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400 truncate max-w-[150px]">esc_{req.id.split('-')[0]}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(req.created_at).toLocaleTimeString()}</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 mt-2">{req.intent}</h3>
                  <p className="text-sm font-medium text-slate-600 mt-1 mb-4">{req.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="flex items-center gap-1"><Bot className="w-4 h-4"/> {req.agent_name}</div>
                    <div className="flex items-center gap-1"><User className="w-4 h-4"/> {req.requester}</div>
                    <div className="flex items-center gap-1"><ShieldAlert className="w-4 h-4"/> Rule: {req.policy_triggered}</div>
                  </div>
                </div>

                {/* PAYLOAD INSPECTOR */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1">
                    <Database className="w-3 h-3"/> Intercepted Payload
                  </div>
                  <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-blue-300 overflow-x-auto">
                    {req.payload}
                  </div>
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 w-full lg:w-72 p-6 flex flex-col justify-center gap-3 shrink-0">
                {req.status === "PENDING" ? (
                  <>
                    <div className="text-center mb-2">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                      </span>
                      <div className="text-sm font-black text-slate-900">Execution Paused</div>
                      <div className="text-xs font-medium text-slate-500">Awaiting your decision</div>
                    </div>
                    
                    <button onClick={() => handleAction(req.id, "APPROVED")} disabled={actionLoading === req.id} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-emerald-700 transition-colors disabled:opacity-50">
                      {actionLoading === req.id ? <Loader2 className="w-4 h-4 animate-spin"/> : <><Check className="w-4 h-4" /> Approve Execution</>}
                    </button>
                    <button onClick={() => handleAction(req.id, "DENIED")} disabled={actionLoading === req.id} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-rose-200 text-rose-600 text-sm font-bold rounded-lg shadow-sm hover:bg-rose-50 transition-colors disabled:opacity-50">
                      {actionLoading === req.id ? <Loader2 className="w-4 h-4 animate-spin"/> : <><X className="w-4 h-4" /> Deny & Drop</>}
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                      {req.status === 'APPROVED' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    </span>
                    <div className="text-base font-black text-slate-900">{req.status}</div>
                    <div className="text-xs font-medium text-slate-500 mt-1">
                      Action recorded in audit log.
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>
      
    </div>
  );
}