"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const pricingPlans = [
  {
    name: "Developer Sandbox",
    badge: "Open Source",
    description:
      "Essential AI visibility and basic guardrails for local engineering testing and exploration.",
    price: "Free forever",
    highlight: false,
    features: [
      {
        category: "AI VISIBILITY",
        items: [
          "Local Agent Monitoring",
          "Basic Runtime Logs",
          "Prompt Interception",
        ],
      },
      {
        category: "SECURITY",
        items: ["Local Zero-Trust Proxy", "Rule-based Blocking"],
      },
      { category: "GOVERNANCE", items: ["Local Console Output"] },
      { category: "INTEGRATIONS", items: ["Localhost", "OpenAI API"] },
    ],
    ctaText: "View Documentation",
    ctaHref: "/docs",
  },
  {
    name: "Design Partner",
    badge: "Priority Access",
    description:
      "Cloud-managed runtime governance, continuous enforcement, and full swarm oversight.",
    price: "Limited spots available",
    highlight: true,
    features: [
      {
        category: "AI VISIBILITY",
        items: [
          "Full Swarm Monitoring",
          "Cloud Runtime Logs",
          "Decision Timeline",
          "Tool Usage Tracking",
        ],
      },
      {
        category: "SECURITY",
        items: [
          "Managed Zero-Trust Proxy",
          "PII Masking",
          "Advanced Risk Detection",
        ],
      },
      {
        category: "GOVERNANCE",
        items: ["Standard Audit Logs", "Dynamic Policy Library"],
      },
      { category: "INTEGRATIONS", items: ["OpenAI", "Anthropic", "Slack"] },
    ],
    ctaText: "Book a Demo",
    ctaHref: "/contact/sales",
  },
  {
    name: "Enterprise VPC",
    badge: "Custom",
    description:
      "Tailored runtime constitutions, dedicated deployment, and on-premise security infrastructure.",
    price: "For large-scale organizations",
    highlight: false,
    features: [
      {
        category: "AI VISIBILITY",
        items: [
          "Unlimited Agent Monitoring",
          "Real-time Enterprise Logs",
          "Granular Tool Auditing",
        ],
      },
      {
        category: "SECURITY",
        items: [
          "Dedicated Proxy Cluster",
          "Enterprise PII Masking",
          "Custom Policy Enforcement",
        ],
      },
      {
        category: "GOVERNANCE",
        items: [
          "SOC 2 / ISO Compliance Suite",
          "Multi-tier Approvals",
          "RBAC & SSO (SAML)",
        ],
      },
      {
        category: "INTEGRATIONS",
        items: ["Azure OpenAI", "AWS Bedrock", "Custom SIEM"],
      },
    ],
    ctaText: "Talk to Founders",
    ctaHref: "/contact/founders",
  },
];

export default function Pricing() {
  return (
    <section className="relative w-full py-28 px-6 bg-transparent font-sans flex flex-col items-center z-10 text-white overflo w-hidden">
      {/* Üst Başlık */}
      <div className="text-center max-w-3xl mb-16 flex flex-col items-center">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-blue-400 bg-blue-950/80 border b order-blue-800/50 px-3.5 py-1.5 rounded-full mb-4">
          Deployment Architecture
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white leading-[1.1] tracking-tight mb-6">
          Predictable runtime governance. Absolute scale.
        </h2>
        <p className="font-mono text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
          Govern AI swarms at the speed of thought. Built for modern engineering
          organizations and strict enterprise security requirements.
        </p>
      </div>

      {/* Kartlar Grid Yapısı */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-[2.5p] rounded-[2.5rem] p-8 flex flex-col justify-between border transition-all duration-300 ${
              plan.highlight
                ? "bg-zinc-900 b order-blue-500/60 shado w-[0_20px_50px_rgba(0,102,238,0.2)] lg:-translate-y-2"
                : "bg-zinc-950/80 b order-zinc-800/80 hover:b order-zinc-700 shado w-2xl"
            }`}
          >
            {/* Kart Üst Kısım */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {plan.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-3 py-1 rounded-full border ${
                    plan.highlight
                      ? "bg-blue-600/20 b order-blue-500/40 text-blue-300"
                      : "bg-zinc-900 b order-zinc-800 text-zinc-400"
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold font-serif text-white mb-2">
                  {plan.price}
                </h3>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="w-full h-[1px] bg-zinc-800/80 mb-6" />

              {/* Özellik Listesi */}
              <div className="space-y-6">
                {plan.features.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2.5">
                    <h4 className="text-[10px] font-mono font-semibold tracking-widest text-blue-400 uppercase">
                      {group.category}
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((item, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono"
                        >
                          <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Butonu */}
            <div className="mt-8 pt-6 b order-t b order-zinc-800/80">
              <Link
                href={plan.ctaHref}
                className={`w-full py-3.5 px-6 rounded-full font-medium text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white shado w-lg shado w-blue-600/30"
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border b order-zinc-800"
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
