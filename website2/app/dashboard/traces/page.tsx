"use client";
import React, { useState, useEffect } from "react";
import { 
  Search, ShieldAlert, Lock, ShieldCheck, AlertTriangle, 
  Database, User, Cpu, Clock, Fingerprint, FileCode2,
  CheckCircle2, XCircle, Activity, Cloud, Loader2, Zap
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function TracesPage() {
  const [traces, setTraces] = useState<any[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [search, setSearch] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchTraces = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("traces")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setTraces(data);
        if (data.length > 0 && !selectedTrace) {
          setSelectedTrace(data[0]);
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTraces();
  }, []);

  // Yatırımcı demosu için gerçek veritabanına sahte log atma fonksiyonu
  const simulateTraffic = async () => {
    setSimulating(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const mockIntents = ["Extract Billing Database", "Read HR Documents", "Format JSON Response", "Git Commit Code"];
      const mockDecisions = ["BLOCK", "ALLOW", "ESCALATE"];
      const randomIntent = mockIntents[Math.floor(Math.random() * mockIntents.length)];
      const randomDecision = mockDecisions[Math.floor(Math.random() * mockDecisions.length)];
      
      const newTrace = {
        user_id: user.id,
        agent_name: "Demo Agent " + Math.floor(Math.random() * 100),
        model: "GPT-4o",
        user_actor: "user_" + Math.floor(Math.random() * 9999),
        intent: randomIntent,
        policy_triggered: randomDecision !== "ALLOW" ? "Demo Strict Rule" : "Default Allow",
        decision: randomDecision,
        latency: Math.floor(Math.random() * 150 + 15) + "ms",
        payload: `{"role": "user", "content": "Simulated request testing intent: ${randomIntent}"}`,
        hash: "sha256:" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')
      };

      const { error } = await supabase.from("traces").insert([newTrace]);
      if (!error) {
        fetchTraces(); // Ekranda hemen göster
      }
    }
    setSimulating(false);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col relative">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Trace & Evidence</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Cryptographic proof of every decision, enforcement, and execution boundary.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Demo butonu (Gerçek DB'ye yazar) */}
          <button onClick={simulateTraffic} disabled={simulating} type="button" className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50">
            {simulating ? <Loader2 className="w-4 h-4 animate-spin"/> : <Zap className="w-4 h-4"/>}
            Simulate Traffic
          </button>
          <button type="button" className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors">
            Export Audit Log
          </button>
        </div>
      </div>

      {/* SPLIT PANE LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        
        {/* LEFT PANE: TRACE LIST */}
        <div className="w-full lg:w-1/3 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
              <input 
                type="text" 
                placeholder="Search traces by ID or Agent..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-slate-400"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2"/>Syncing logs...</div>
            ) : traces.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Database className="w-8 h-8 text-slate-300 mx-auto mb-3"/>
                <p className="text-sm font-bold">No traces found.</p>
                <p className="text-xs mt-1">Click 'Simulate Traffic' to test.</p>
              </div>
            ) : (
              traces.filter(t => t.agent_name.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search)).map((trace) => (
                <div 
                  key={trace.id} 
                  onClick={() => setSelectedTrace(trace)}
                  className={`p-4 cursor-pointer transition-colors ${selectedTrace?.id === trace.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-mono font-bold text-slate-600 truncate max-w-[120px]">{trace.id.split('-')[0]}...</div>
                    <div className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3"/> {new Date(trace.created_at).toLocaleTimeString()}</div>
                  </div>
                  <div className="font-bold text-sm text-slate-900 truncate">{trace.agent_name}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded border ${
                      trace.decision === "ALLOW" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      trace.decision === "BLOCK" ? "bg-rose-50 text-rose-700 border-rose-200" :
                      "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {trace.decision}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{trace.latency}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT PANE: DEEP DIVE & PROVENANCE */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-y-auto">
          {!selectedTrace ? (
            <div className="h-full flex items-center justify-center text-slate-400 font-medium">Select a trace from the left to view evidence.</div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-black text-slate-900 font-mono">req_{selectedTrace.id.split('-')[0]}</h2>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black rounded-md border ${
                        selectedTrace.decision === "ALLOW" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        selectedTrace.decision === "BLOCK" ? "bg-rose-50 text-rose-700 border-rose-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {selectedTrace.decision === "BLOCK" && <Lock className="w-3 h-3"/>}
                        {selectedTrace.decision === "ESCALATE" && <AlertTriangle className="w-3 h-3"/>}
                        {selectedTrace.decision === "ALLOW" && <ShieldCheck className="w-3 h-3"/>}
                        {selectedTrace.decision} ENFORCED
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">Processed by Aegisora Proxy Node-04</p>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1">
                  <FileCode2 className="w-4 h-4"/> View Raw JSON
                </button>
              </div>

              {/* Context Details */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-slate-200">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Cpu className="w-3 h-3"/> Agent</div>
                  <div className="text-sm font-bold text-slate-900">{selectedTrace.agent_name}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Database className="w-3 h-3"/> Model</div>
                  <div className="text-sm font-bold text-slate-900">{selectedTrace.model}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Actor</div>
                  <div className="text-sm font-bold text-slate-900">{selectedTrace.user_actor}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Activity className="w-3 h-3"/> Latency</div>
                  <div className="text-sm font-bold text-slate-900">{selectedTrace.latency}</div>
                </div>
              </div>

              {/* Execution Pipeline */}
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Deterministic Execution Pipeline</h3>
                
                <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
                  
                  {/* Step 1: Request */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center text-blue-600">
                      <User className="w-5 h-5"/>
                    </div>
                    <div className="text-xs font-bold text-slate-700">Request</div>
                  </div>

                  {/* Step 2: Policy Match */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-600 flex items-center justify-center text-blue-600">
                      <ShieldAlert className="w-5 h-5"/>
                    </div>
                    <div className="text-xs font-bold text-slate-700">Policy Engine</div>
                    <div className="absolute -bottom-6 whitespace-nowrap text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {selectedTrace.policy_triggered}
                    </div>
                  </div>

                  {/* Step 3: Enforcement */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      selectedTrace.decision === 'BLOCK' ? 'bg-rose-100 border-rose-600 text-rose-600' : 
                      selectedTrace.decision === 'ESCALATE' ? 'bg-amber-100 border-amber-600 text-amber-600' : 
                      'bg-emerald-100 border-emerald-600 text-emerald-600'
                    }`}>
                      {selectedTrace.decision === 'BLOCK' ? <XCircle className="w-5 h-5"/> : 
                       selectedTrace.decision === 'ESCALATE' ? <AlertTriangle className="w-5 h-5"/> : 
                       <CheckCircle2 className="w-5 h-5"/>}
                    </div>
                    <div className="text-xs font-bold text-slate-700">{selectedTrace.decision}</div>
                  </div>

                  {/* Step 4: Execution Boundary */}
                  <div className="relative z-10 flex flex-col items-center gap-2 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-400 flex items-center justify-center text-slate-500">
                      <Cloud className="w-5 h-5"/>
                    </div>
                    <div className="text-xs font-bold text-slate-700">Provider API</div>
                    {selectedTrace.decision === 'BLOCK' && (
                      <div className="absolute -top-6 whitespace-nowrap text-[10px] font-black text-rose-600">Connection Dropped</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Evidence Record */}
              <div className="p-6 bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Fingerprint className="w-4 h-4"/> Cryptographic Evidence Record
                </h3>
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                  <div className="text-slate-400 mb-2"># Block Record Hash (Immutable)</div>
                  <div className="text-emerald-400 mb-4">{selectedTrace.hash}</div>
                  
                  <div className="text-slate-400 mb-2"># Intercepted Payload</div>
                  <div className="text-blue-300 whitespace-pre-wrap">{selectedTrace.payload}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}