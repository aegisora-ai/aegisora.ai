"use client";
import React, { useState, useEffect } from "react";
import { 
  Bot, Search, Filter, Plus, ShieldAlert, ShieldCheck, 
  MoreVertical, Activity, AlertTriangle, Eye, ServerCrash, X, Loader2
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States
  const [formLoading, setFormLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("GPT-4o");
  const [risk, setRisk] = useState("Low");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchAgents = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setAgents(data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { error } = await supabase.from("agents").insert([
        { 
          user_id: user.id, 
          name, 
          description, 
          model, 
          risk_posture: risk,
          status: "Active"
        }
      ]);

      if (!error) {
        setIsModalOpen(false);
        setName("");
        setDescription("");
        fetchAgents(); // Listeyi yenile
      } else {
        alert("Error creating agent: " + error.message);
      }
    }
    setFormLoading(false);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* SHADOW AI DISCOVERY BANNER */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-indigo-900">Unmanaged AI Traffic Detected (Shadow AI)</h3>
            <p className="text-sm font-medium text-indigo-700 mt-0.5">Aegisora Proxy identified 2 new unknown agents making requests to OpenAI API.</p>
          </div>
        </div>
        <button type="button" className="shrink-0 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
          Review & Govern
        </button>
      </div>

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agent Security Registry</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage, discover, and enforce policies across all your AI agents.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800 transition-colors">
          <Plus className="w-4 h-4" /> Register Agent
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search agents by name, model, or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow placeholder:text-slate-400 font-medium"
          />
        </div>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4 text-slate-500" /> Filters
        </button>
      </div>

      {/* AGENTS DATA TABLE */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
            <p className="text-sm font-bold">Syncing with Aegisora Edge...</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <Bot className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-black text-slate-900 mb-1">No Agents Found</h3>
            <p className="text-sm mb-4">You haven't registered any AI agents to this workspace yet.</p>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors">Register First Agent</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Agent Details</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Base Model</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Risk Posture</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">Status</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {agents.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg border border-slate-200">
                          <Bot className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{agent.name}</div>
                          <div className="text-xs font-medium text-slate-500 mt-0.5 max-w-xs truncate">{agent.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md border border-slate-200">
                        {agent.model}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {agent.risk_posture === "Low" && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                        {agent.risk_posture === "Medium" && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                        {(agent.risk_posture === "High" || agent.risk_posture === "Critical") && <ShieldAlert className="w-4 h-4 text-rose-500" />}
                        <span className={`text-xs font-bold ${
                          agent.risk_posture === "Low" ? "text-emerald-700" :
                          agent.risk_posture === "Medium" ? "text-amber-700" :
                          "text-rose-700"
                        }`}>
                          {agent.risk_posture} Risk
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-black rounded-md border ${
                        agent.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        agent.status === "Blocked" ? "bg-rose-50 text-rose-700 border-rose-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {agent.status === "Active" && <Activity className="w-3 h-3" />}
                        {agent.status === "Blocked" && <ServerCrash className="w-3 h-3" />}
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button type="button" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ENTERPRISE SLIDE-OVER MODAL FOR REGISTRATION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full h-full sm:w-[500px] sm:h-[calc(100vh-2rem)] sm:my-4 sm:mr-4 rounded-none sm:rounded-2xl shadow-2xl flex flex-col border border-slate-200 animate-in slide-in-from-right duration-300">
            
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <div>
                <h2 className="text-xl font-black text-slate-900">Register New Agent</h2>
                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Aegisora Edge Network</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-900 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="agentForm" onSubmit={handleCreateAgent} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Agent Name</label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Customer Support Bot" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Description / Purpose</label>
                  <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What does this agent do?" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Base Model</label>
                    <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white appearance-none">
                      <option value="GPT-4o">OpenAI GPT-4o</option>
                      <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                      <option value="Llama 3 70B">Llama 3 70B</option>
                      <option value="Custom API">Custom API Endpoint</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Initial Risk Profile</label>
                    <select value={risk} onChange={(e) => setRisk(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white appearance-none">
                      <option value="Low">Low Risk (Internal)</option>
                      <option value="Medium">Medium (Customer Facing)</option>
                      <option value="High">High (Writes Data)</option>
                      <option value="Critical">Critical (Executes Code)</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <p className="text-xs font-medium text-blue-800">Upon registration, Aegisora will generate a unique proxy endpoint and API Key for this agent. You will change your agent's base URL to this endpoint.</p>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white rounded-b-2xl">
              <button form="agentForm" type="submit" disabled={formLoading} className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50">
                {formLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate Secure Endpoint"}
              </button>
            </div>
            
          </div>
        </div>
      )}
      
    </div>
  );
}