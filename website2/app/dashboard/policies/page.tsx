"use client";
import React, { useState, useEffect } from "react";
import { 
  FileText, Plus, Search, Filter, ShieldCheck, ShieldAlert, 
  Lock, Users, AlertTriangle, ArrowRight, ToggleLeft, ToggleRight,
  X, Loader2
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function PoliciesPage() {
  const [search, setSearch] = useState("");
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
  const [enforcement, setEnforcement] = useState("BLOCK");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchPolicies = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!error && data) setPolicies(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleCreatePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase.from("policies").insert([
        { user_id: user.id, name, intent, enforcement, status: true }
      ]);

      if (!error) {
        setIsModalOpen(false);
        setName("");
        setIntent("");
        setEnforcement("BLOCK");
        fetchPolicies(); // Listeyi anında güncelle
      } else {
        alert("Error creating policy: " + error.message);
      }
    }
    setFormLoading(false);
  };

  const togglePolicyStatus = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update (Kullanıcıya bekleme hissi vermemek için anında ekranda değiştir)
    setPolicies(policies.map(p => p.id === id ? { ...p, status: !currentStatus } : p));
    
    // Arkada veritabanını güncelle
    const { error } = await supabase
      .from("policies")
      .update({ status: !currentStatus })
      .eq("id", id);
      
    if (error) {
      // Hata olursa eski haline geri döndür
      fetchPolicies();
      alert("Failed to update status.");
    }
  };

  return (
    <div className="space-y-6 relative">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Policy Governance</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Define intent-based rules to control what your AI agents can see and do.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">
            Test in Simulator
          </button>
          <button onClick={() => setIsModalOpen(true)} type="button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" /> Create Policy
          </button>
        </div>
      </div>

      {/* QUICK METRICS (Dynamic) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck className="w-6 h-6" /></div>
          <div>
            <div className="text-2xl font-black text-slate-900">{policies.filter(p => p.status).length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Policies</div>
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4 opacity-50">
          <div className="p-3 bg-rose-50 rounded-lg text-rose-600"><ShieldAlert className="w-6 h-6" /></div>
          <div>
            <div className="text-2xl font-black text-slate-900">--</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blocks (7d)</div>
          </div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-4 opacity-50">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600"><Users className="w-6 h-6" /></div>
          <div>
            <div className="text-2xl font-black text-slate-900">--</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Escalations (7d)</div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search policies by name, intent, or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* POLICY CARDS LIST */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
          <p className="text-sm font-bold">Syncing Policies...</p>
        </div>
      ) : policies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white border border-slate-200 rounded-xl text-slate-500">
          <FileText className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-black text-slate-900 mb-1">No Policies Active</h3>
          <p className="text-sm mb-4">You haven't defined any security boundaries yet.</p>
          <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors">Create First Policy</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {policies.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((policy) => (
            <div key={policy.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-colors p-5 flex flex-col group">
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">{policy.name}</h3>
                    <span className={`px-2 py-0.5 text-[10px] font-black rounded-md border ${policy.status ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {policy.status ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mt-1 max-w-sm">{policy.intent}</p>
                </div>
                {/* DYNAMIC TOGGLE BUTTON */}
                <button onClick={() => togglePolicyStatus(policy.id, policy.status)} className="transition-transform active:scale-90">
                  {policy.status ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-300" />
                  )}
                </button>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-black rounded-md border ${
                    policy.enforcement === "ALLOW" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    policy.enforcement === "BLOCK" ? "bg-rose-50 text-rose-700 border-rose-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {policy.enforcement === "BLOCK" && <Lock className="w-3 h-3" />}
                    {policy.enforcement === "ESCALATE" && <AlertTriangle className="w-3 h-3" />}
                    {policy.enforcement === "ALLOW" && <ShieldCheck className="w-3 h-3" />}
                    {policy.enforcement}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors cursor-pointer" />
              </div>

            </div>
          ))}
        </div>
      )}

      {/* CREATE POLICY SLIDE-OVER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full h-full sm:w-[500px] sm:h-[calc(100vh-2rem)] sm:my-4 sm:mr-4 rounded-none sm:rounded-2xl shadow-2xl flex flex-col border border-slate-200 animate-in slide-in-from-right duration-300">
            
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <div>
                <h2 className="text-xl font-black text-slate-900">Define New Policy</h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Semantic Evaluation Rule</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-900 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="policyForm" onSubmit={handleCreatePolicy} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Policy Name</label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Strict PII Data Isolation" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Intent to Match</label>
                  <textarea required rows={3} value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="e.g. Block extraction of SSN, Credit Cards, or Emails" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50 focus:bg-white" />
                  <p className="text-xs text-slate-500 mt-2 font-medium">Aegisora LLM Engine will semantically evaluate agent requests against this intent.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Enforcement Action</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button type="button" onClick={() => setEnforcement("ALLOW")} className={`py-3 border-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${enforcement === 'ALLOW' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                      <ShieldCheck className="w-5 h-5"/> ALLOW
                    </button>
                    <button type="button" onClick={() => setEnforcement("BLOCK")} className={`py-3 border-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${enforcement === 'BLOCK' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                      <Lock className="w-5 h-5"/> BLOCK
                    </button>
                    <button type="button" onClick={() => setEnforcement("ESCALATE")} className={`py-3 border-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${enforcement === 'ESCALATE' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                      <AlertTriangle className="w-5 h-5"/> ESCALATE
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white rounded-b-2xl">
              <button form="policyForm" type="submit" disabled={formLoading} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50">
                {formLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Policy to Edge"}
              </button>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}