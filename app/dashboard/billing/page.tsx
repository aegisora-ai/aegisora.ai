"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Database,
  Cpu,
  Activity,
  ExternalLink,
  Check,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function BillingPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    agentCount: 0,
    incidentCount: 0,
    workspaceName: "Enterprise Workspace",
    createdAt: "2026-01-01",
  });

  useEffect(() => {
    async function fetchRealData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data: wsData } = await supabase
            .from("workspaces")
            .select("name, created_at")
            .eq("owner_id", user.id)
            .single();

          if (wsData) {
            setMetrics((prev) => ({
              ...prev,
              workspaceName: wsData.name || "Enterprise Workspace",
              createdAt: wsData.created_at
                ? wsData.created_at.split("T")[0]
                : "2026-01-01",
            }));
          }
        }

        const { count: agentsCnt } = await supabase
          .from("agents")
          .select("*", { count: "exact", head: true });

        const { count: incCnt } = await supabase
          .from("incidents")
          .select("*", { count: "exact", head: true });

        setMetrics((prev) => ({
          ...prev,
          agentCount: agentsCnt || 0,
          incidentCount: incCnt || 0,
        }));
      } catch (err) {
        console.error("Error fetching workspace data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRealData();
  }, [supabase]);

  // 💳 GERÇEK STRIPE CHECKOUT YÖNLENDİRMESİ
  const handleCheckout = async (planName: string, price: string) => {
    setUpgrading(planName);

    try {
      // Hazırladığımız API rotasına istek atıyoruz
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planName }),
      });

      const data = await res.json();

      if (data.url) {
        // Her şey başarılıysa kullanıcıyı gerçek Stripe ödeme ekranına yönlendir
        window.location.href = data.url;
      } else {
        console.error("Stripe URL alınamadı:", data.error);
        setUpgrading(null);
      }
    } catch (error) {
      console.error("Checkout işlemi başarısız:", error);
      setUpgrading(null);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-serif text-white tracking-tight">
            Billing & Subscriptions
          </h1>
          <p className="text-xs font-mono text-gray-400 mt-1">
            Manage your enterprise tier, payment methods (Google Pay, Apple Pay,
            Cards), and database telemetry.
          </p>
        </motion.div>
      </div>

      {/* Aktif Workspace Durumu */}
      <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0066EE]/10 border border-[#0066EE]/30 flex items-center justify-center text-[#0066EE]">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
              Active Workspace
            </span>
            <h3 className="text-xl font-serif font-semibold text-white mt-1">
              {metrics.workspaceName}
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Established: {metrics.createdAt} • Zero-Trust Mode Enforced
            </p>
          </div>
        </div>

        <button
          onClick={() => handleCheckout("Enterprise Custom Portal", "$199/mo")}
          className="flex items-center gap-2 bg-[#0066EE] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all shadow-md cursor-pointer"
        >
          <span>Manage Stripe Billing Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 🚀 GERÇEK ÖDEME SEÇENEKLİ PAKETLER (Google Pay & Apple Pay Entegre Edilebilir Alan) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Starter Developer",
            price: "$49",
            desc: "For independent engineers and small AI agent prototypes.",
            features: [
              "Up to 5 AI Agents",
              "Basic Telemetry Logs",
              "Standard Security Proxy",
            ],
          },
          {
            name: "Pro Enterprise",
            price: "$199",
            desc: "For growing companies scaling production AI fleets.",
            features: [
              "Unlimited AI Agents",
              "Real-time Threat Defense",
              "Compliance PDF Reports",
              "Priority Support",
            ],
            popular: true,
          },
          {
            name: "Global Scale",
            price: "$499",
            desc: "Custom zero-trust proxies and dedicated clusters.",
            features: [
              "Multi-region Clusters",
              "Custom LLM Firewalls",
              "Dedicated Account Manager",
              "99.99% SLA",
            ],
          },
        ].map((plan, idx) => (
          <div
            key={idx}
            className={`bg-[#121215] border rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all relative ${
              plan.popular
                ? "border-[#0066EE] shadow-blue-500/10"
                : "border-gray-800/80"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-6 bg-[#0066EE] text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-md">
                Recommended Tier
              </span>
            )}
            <div>
              <div className="flex justify-between items-center mb-4 mt-2">
                <h4 className="text-sm font-mono text-white font-bold">
                  {plan.name}
                </h4>
              </div>
              <div className="text-3xl font-serif font-semibold text-white mb-2">
                {plan.price}{" "}
                <span className="text-xs font-mono text-gray-500">/mo</span>
              </div>
              <p className="text-xs font-mono text-gray-400 mb-6">
                {plan.desc}
              </p>

              <div className="space-y-2 mb-8 border-t border-gray-800/80 pt-4">
                {plan.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-2 text-xs font-mono text-gray-300"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleCheckout(plan.name, plan.price)}
              disabled={upgrading === plan.name}
              className={`w-full py-3 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                plan.popular
                  ? "bg-[#0066EE] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {upgrading === plan.name
                  ? "Connecting to Stripe..."
                  : `Upgrade with Google Pay / Card`}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Gerçek Veritabanı Özet Metrikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-400">
              Active Deployed Agents
            </span>
            <Cpu className="w-4 h-4 text-[#0066EE]" />
          </div>
          <div className="text-3xl font-serif font-semibold text-white mb-1">
            {loading ? "..." : metrics.agentCount}
          </div>
          <p className="text-[11px] font-mono text-gray-500">
            Live from `agents` table
          </p>
        </div>

        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-400">
              Security Incidents Logged
            </span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-serif font-semibold text-white mb-1">
            {loading ? "..." : metrics.incidentCount}
          </div>
          <p className="text-[11px] font-mono text-gray-500">
            Live from `incidents` table
          </p>
        </div>

        <div className="bg-[#121215] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-gray-400">
              Payment Gateway Status
            </span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-serif font-semibold text-emerald-400 mb-1">
            Active
          </div>
          <p className="text-[11px] font-mono text-gray-500">
            Stripe Elements & Wallet Ready
          </p>
        </div>
      </div>
    </div>
  );
}
