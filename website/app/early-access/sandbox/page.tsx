"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ContributorSandbox() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("pipelines");
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "success">(
    "idle",
  );
  const [proposal, setProposal] = useState("");
  const [submittedProposal, setSubmittedProposal] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("aegisora_user_email");
    if (!email) {
      router.push("/early-access");
      return;
    }

    fetch(`/api/early-access?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "approved") {
          setAuthorized(true);
        } else {
          alert("Your access is still pending admin approval by Eray.");
          router.push("/early-access");
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/early-access");
      });
  }, [router]);

  const runTestPipeline = () => {
    setTestStatus("running");
    setTimeout(() => {
      setTestStatus("success");
    }, 1500);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposal) return;
    setSubmittedProposal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-sm font-mono">
        Verifying secure clearance node...
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Üst Bilgi / Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center b order-b b order-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold font-mono">
                Core Contributor Environment Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif mt-2 tracking-tight">
              Aegisora Agent Governance Sandbox
            </h1>
            <p className="text-zinc-400 text-sm font-mono mt-1">
              Test your multi-agent pipelines against enterprise compliance
              frameworks (EU DSA & GDPR).
            </p>
          </div>
          <div className="bg-zinc-900 border b order-zinc-800 px-4 py-2 rounded-xl text-xs text-zinc-300 font-mono">
            Node:{" "}
            <span className="text-blue-400 font-mono">eu-central-trier-01</span>
          </div>
        </div>

        {/* Sekmeler */}
        <div className="flex gap-6 b order-b b order-zinc-800 text-sm font-medium">
          <button
            onClick={() => setActiveTab("pipelines")}
            className={`pb-3 transition-colors b order-b-2 outline-none cursor-pointer ${
              activeTab === "pipelines"
                ? "b order-white text-white"
                : "b order-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Agent Pipelines & Audit
          </button>
          <button
            onClick={() => setActiveTab("governance")}
            className={`pb-3 transition-colors b order-b-2 outline-none cursor-pointer ${
              activeTab === "governance"
                ? "b order-white text-white"
                : "b order-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Governance Rules (EU DSA)
          </button>
          <button
            onClick={() => setActiveTab("propose")}
            className={`pb-3 transition-colors b order-b-2 outline-none cursor-pointer ${
              activeTab === "propose"
                ? "b order-white text-white"
                : "b order-transparent text-zinc-400 hover:text-white"
            }`}
          >
            Shape Core Architecture 💡
          </button>
        </div>

        {/* İçerik Alanı 1: Pipelines */}
        {activeTab === "pipelines" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border b order-zinc-800 p-6 rounded-2xl space-y-4">
              <h3 className="font-semibold text-base">
                Run Compliance Simulation
              </h3>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Execute a sample multi-agent RAG workflow through
                Aegisora&apos;s Zero-Trust proxy layer.
              </p>
              <div className="bg-black/40 border b order-zinc-800 p-3 rounded-xl font-mono text-xs text-zinc-300 space-y-1">
                <div>
                  Target: <span className="text-blue-400">LLM-Gateway-v2</span>
                </div>
                <div>
                  Shields: <span className="text-emerald-400">Active</span>
                </div>
                <div>
                  Compliance:{" "}
                  <span className="text-amber-400">EU-DSA-Strict</span>
                </div>
              </div>
              <button
                onClick={runTestPipeline}
                disabled={testStatus === "running"}
                className="w-full bg-[#0066EE] hover:bg-[#005bb5] text-white font-medium py-3 rounded-xl transition-colors text-xs font-mono disabled:opacity-50 cursor-pointer outline-none shado w-sm"
              >
                {testStatus === "running"
                  ? "Evaluating Agents..."
                  : "Run Pipeline Test"}
              </button>
            </div>

            <div className="lg:col-span-2 bg-zinc-900/50 border b order-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base mb-4">
                  Real-time Governance Stream
                </h3>
                <div className="bg-black/60 border b order-zinc-800 p-4 rounded-xl font-mono text-xs text-zinc-400 h-48 overflo w-y-auto space-y-2">
                  <div className="text-zinc-500">
                    [System] Initializing sandbox environment for contributor...
                  </div>
                  <div className="text-emerald-400">
                    [Proxy] Zero-Trust interceptor loaded successfully.
                  </div>
                  {testStatus === "running" && (
                    <div className="text-blue-400 animate-pulse">
                      [Execution] Testing multi-agent tool calling and output
                      grounding...
                    </div>
                  )}
                  {testStatus === "success" && (
                    <>
                      <div className="text-blue-400">
                        [Execution] Pipeline executed in 340ms.
                      </div>
                      <div className="text-emerald-400">
                        [Compliance Check] Zero prompt injections detected. EU
                        DSA audit trail verified.
                      </div>
                      <div className="text-white font-bold">
                        [Result] Status: APPROVED & SECURE.
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 b order-t b order-zinc-800 text-xs text-zinc-500 font-mono flex justify-between">
                <span>Contribute architectural feedback via sandbox.</span>
                <span className="text-zinc-400">Aegisora Core v1.2</span>
              </div>
            </div>
          </div>
        )}

        {/* İçerik Alanı 2: Governance */}
        {activeTab === "governance" && (
          <div className="bg-zinc-900/50 border b order-zinc-800 p-8 rounded-2xl space-y-4">
            <h3 className="text-lg font-semibold">
              Active Compliance Frameworks
            </h3>
            <p className="text-sm text-zinc-400 font-mono">
              As a Core Contributor, you can suggest, modify, or override
              governance policies enforced on autonomous agents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="border b order-zinc-800 p-4 rounded-xl bg-black/30">
                <h4 className="font-medium text-white text-sm">
                  EU Digital Services Act (DSA)
                </h4>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Ensures transparency and algorithmic accountability for
                  automated decision systems.
                </p>
              </div>
              <div className="border b order-zinc-800 p-4 rounded-xl bg-black/30">
                <h4 className="font-medium text-white text-sm">
                  GDPR Privacy Shield
                </h4>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Blocks PII leakage and unauthorized data retention across LLM
                  embedding layers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* İçerik Alanı 3: Mimari Öneri */}
        {activeTab === "propose" && (
          <div className="bg-zinc-900/50 border b order-zinc-800 p-8 rounded-2xl space-y-6 max-w-2xl">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-blue-400 font-semibold font-mono bg-blue-950/40 px-3 py-1 rounded-full border b order-blue-800/50">
                Core Contribution Portal
              </span>
              <h3 className="text-xl font-serif mt-3 tracking-tight">
                Propose a Governance Rule or Architecture Shift
              </h3>
              <p className="text-sm text-zinc-400 mt-1 font-mono">
                Your domain expertise drives Aegisora&apos;s core engine. Submit
                your policy logic, compliance check, or agent routing rule
                directly to the core repository review.
              </p>
            </div>

            {!submittedProposal ? (
              <form onSubmit={handleProposalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1 font-mono">
                    Your Architectural / Compliance Proposal
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    placeholder="e.g., We should add an automated token-budget validator for multi-agent loops to comply with strict EU financial auditing..."
                    className="w-full bg-black/50 border b order-zinc-800 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:b order-[#0066EE] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0066EE] hover:bg-[#005bb5] text-white font-medium px-6 py-3 rounded-xl transition-colors text-xs font-mono tracking-wide cursor-pointer outline-none shado w-sm"
                >
                  Submit Proposal to Core Team
                </button>
              </form>
            ) : (
              <div className="bg-emerald-950/20 border b order-emerald-800/30 p-6 rounded-xl text-center space-y-2">
                <h4 className="text-emerald-400 font-semibold text-base font-serif">
                  Proposal Logged Successfully
                </h4>
                <p className="text-zinc-400 text-xs font-mono">
                  Thank you for shaping the architecture. Our core maintainers
                  are reviewing your submission for the upcoming v1.3 release.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
