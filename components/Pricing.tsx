"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual",
  );

  const plans = [
    {
      name: "Starter",
      description:
        "Essential AI visibility and basic guardrails for growing engineering teams.",
      price: { monthly: "$49", annual: "$39" },
      period: "per user / month",
      popular: false,
      cta: "Start Free Trial",
      href: "http://localhost:3000/contact/sales",
      features: {
        "AI Visibility": [
          "AI Agent Monitoring",
          "Runtime Logs",
          "Prompt History",
          "Tool Usage",
          "Decision Timeline",
        ],
        Security: [
          "Zero-Trust Proxy",
          "PII Masking",
          "Runtime Policy Enforcement",
          "Neural Firewall",
          "Risk Detection",
        ],
        Governance: [
          "Audit Logs",
          "Compliance Reports",
          "Approval Workflows",
          "RBAC",
          "Policy Library",
        ],
        Analytics: [
          "AI Trust Score",
          "Agent Analytics",
          "Cost Analytics",
          "Behavioral Insights",
        ],
        Integrations: [
          "OpenAI",
          "Anthropic",
          "Azure OpenAI",
          "Slack",
          "GitHub",
          "Jira",
        ],
      },
    },
    {
      name: "Business",
      description:
        "Advanced runtime governance, continuous enforcement, and full swarm oversight.",
      price: { monthly: "$199", annual: "$159" },
      period: "per user / month",
      popular: true,
      cta: "Deploy Business Tier",
      href: "http://localhost:3000/contact/sales",
      features: {
        "AI Visibility": [
          "AI Agent Monitoring",
          "Runtime Logs",
          "Prompt History",
          "Tool Usage",
          "Decision Timeline",
        ],
        Security: [
          "Zero-Trust Proxy",
          "PII Masking",
          "Runtime Policy Enforcement",
          "Neural Firewall",
          "Risk Detection",
        ],
        Governance: [
          "Audit Logs",
          "Compliance Reports",
          "Approval Workflows",
          "RBAC",
          "Policy Library",
        ],
        Analytics: [
          "AI Trust Score",
          "Agent Analytics",
          "Cost Analytics",
          "Behavioral Insights",
        ],
        Integrations: [
          "OpenAI",
          "Anthropic",
          "Azure OpenAI",
          "Slack",
          "GitHub",
          "Jira",
        ],
      },
    },
    {
      name: "Enterprise",
      description:
        "Tailored runtime constitutions, dedicated deployment, and custom LLM security infrastructure.",
      price: { monthly: "Custom Pricing", annual: "Custom Pricing" },
      period: "for large-scale organizations",
      popular: false,
      cta: "Talk to Sales",
      href: "http://localhost:3000/contact/sales",
      features: {
        "AI Visibility": [
          "AI Agent Monitoring",
          "Runtime Logs",
          "Prompt History",
          "Tool Usage",
          "Decision Timeline",
        ],
        Security: [
          "Zero-Trust Proxy",
          "PII Masking",
          "Runtime Policy Enforcement",
          "Neural Firewall",
          "Risk Detection",
        ],
        Governance: [
          "Audit Logs",
          "Compliance Reports",
          "Approval Workflows",
          "RBAC",
          "Policy Library",
        ],
        Analytics: [
          "AI Trust Score",
          "Agent Analytics",
          "Cost Analytics",
          "Behavioral Insights",
        ],
        Integrations: [
          "OpenAI",
          "Anthropic",
          "Azure OpenAI",
          "Slack",
          "GitHub",
          "Jira",
        ],
      },
    },
  ];

  const categories = [
    "AI Visibility",
    "Security",
    "Governance",
    "Analytics",
    "Integrations",
  ];

  return (
    <section className="relative w-full py-32 px-6 bg-transparent font-sans z-10">
      {/* Header & Billing Toggle */}
      <div className="max-w-4xl mx-auto text-center mb-20 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 shadow-sm mb-6">
          <Shield className="w-4 h-4 text-[#0066EE]" />
          <span className="text-xs font-mono font-medium text-slate-800 uppercase tracking-wider">
            Enterprise Pricing Architecture
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#111111] tracking-tight mb-6">
          Predictable runtime governance. <br /> Absolute scale.
        </h2>

        <p className="font-mono text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed mb-10">
          Govern AI swarms at the speed of thought. Transparent plans designed
          for modern engineering organizations and security leaders.
        </p>

        {/* Monthly / Annual Switcher */}
        <div className="bg-slate-200/60 backdrop-blur-md p-1.5 rounded-full flex items-center border border-slate-300/50 shadow-inner">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full font-mono text-xs font-medium transition-all cursor-pointer ${
              billingCycle === "monthly"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-6 py-2 rounded-full font-mono text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
              billingCycle === "annual"
                ? "bg-[#0066EE] text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Annual Billing</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${billingCycle === "annual" ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"}`}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => {
          const isBusiness = plan.popular;
          const currentPrice = plan.price[billingCycle];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between backdrop-blur-3xl transition-all duration-300 ${
                isBusiness
                  ? "bg-[#111111] text-white border-2 border-[#0066EE] shadow-[0_30px_90px_rgba(0,102,238,0.25)] lg:-translate-y-4"
                  : "bg-white/90 text-slate-900 border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)]"
              }`}
            >
              {/* Highlight Badge for Business Plan */}
              {isBusiness && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0066EE] text-white font-mono text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Card Header */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3
                    className={`text-2xl font-serif tracking-tight ${isBusiness ? "text-white" : "text-[#111111]"}`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <p
                  className={`font-mono text-xs leading-relaxed mb-8 min-h-[40px] ${isBusiness ? "text-slate-400" : "text-slate-600"}`}
                >
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-8 border-b border-current/10">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-4xl lg:text-5xl font-serif tracking-tight ${isBusiness ? "text-white" : "text-slate-900"}`}
                    >
                      {currentPrice}
                    </span>
                    {currentPrice !== "Custom Pricing" && (
                      <span
                        className={`font-mono text-xs ${isBusiness ? "text-slate-400" : "text-slate-500"}`}
                      >
                        / {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Categorization */}
                <div className="space-y-6 mb-10">
                  {categories.map((category, catIdx) => (
                    <div key={catIdx} className="space-y-2.5">
                      <h4
                        className={`font-mono text-[11px] uppercase tracking-wider font-semibold ${isBusiness ? "text-blue-400" : "text-[#0066EE]"}`}
                      >
                        {category}
                      </h4>
                      <ul className="space-y-2">
                        {plan.features[
                          category as keyof typeof plan.features
                        ].map((feat, featIdx) => (
                          <li
                            key={featIdx}
                            className="flex items-start gap-2.5 text-xs font-mono"
                          >
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${isBusiness ? "text-blue-400" : "text-[#0066EE]"}`}
                            />
                            <span
                              className={
                                isBusiness ? "text-slate-300" : "text-slate-700"
                              }
                            >
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <div>
                <Link
                  href={plan.href}
                  className={`w-full py-4 rounded-2xl font-mono text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isBusiness
                      ? "bg-[#0066EE] hover:bg-[#005bb5] text-white shadow-blue-500/25 hover:shadow-blue-500/40"
                      : "bg-[#111111] hover:bg-black text-white shadow-slate-900/10 hover:shadow-slate-900/20"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
