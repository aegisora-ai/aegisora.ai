export type AgentStatus = "ACTIVE" | "DEGRADED" | "PAUSED";
export type AgentRisk = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type Decision = "ALLOW" | "BLOCK" | "ESCALATE";

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  risk: AgentRisk;
  riskScore: number;
  model: string;
  provider: string;
  tools: number;
  executionsToday: number;
  lastSeen: string;
  environment: "PRODUCTION" | "STAGING" | "DEVELOPMENT";
}

export interface DecisionEvent {
  id: string;
  agent: string;
  action: string;
  target: string;
  decision: Decision;
  risk: AgentRisk;
  timestamp: string;
}

export const agents: Agent[] = [
  {
    id: "finance-01",
    name: "Finance Operations",
    description: "Invoice, refund and payment workflows.",
    status: "ACTIVE",
    risk: "HIGH",
    riskScore: 78,
    model: "GPT-4.1",
    provider: "OpenAI",
    tools: 8,
    executionsToday: 1248,
    lastSeen: "12 sec ago",
    environment: "PRODUCTION",
  },
  {
    id: "support-01",
    name: "Customer Support",
    description: "Customer requests and account workflows.",
    status: "ACTIVE",
    risk: "MEDIUM",
    riskScore: 46,
    model: "Claude Sonnet",
    provider: "Anthropic",
    tools: 5,
    executionsToday: 6841,
    lastSeen: "8 sec ago",
    environment: "PRODUCTION",
  },
  {
    id: "sales-01",
    name: "Sales Copilot",
    description: "CRM recommendations and opportunity workflows.",
    status: "ACTIVE",
    risk: "LOW",
    riskScore: 24,
    model: "Gemini",
    provider: "Google",
    tools: 4,
    executionsToday: 2145,
    lastSeen: "21 sec ago",
    environment: "PRODUCTION",
  },
  {
    id: "hr-01",
    name: "HR Assistant",
    description: "Internal employee workflow automation.",
    status: "DEGRADED",
    risk: "HIGH",
    riskScore: 71,
    model: "GPT-4.1",
    provider: "OpenAI",
    tools: 6,
    executionsToday: 563,
    lastSeen: "2 min ago",
    environment: "STAGING",
  },
  {
    id: "devops-01",
    name: "DevOps Operator",
    description: "Infrastructure automation and observability.",
    status: "PAUSED",
    risk: "CRITICAL",
    riskScore: 91,
    model: "Claude Sonnet",
    provider: "Anthropic",
    tools: 13,
    executionsToday: 97,
    lastSeen: "14 min ago",
    environment: "PRODUCTION",
  },
];

export const recentDecisions: DecisionEvent[] = [
  {
    id: "decision-001",
    agent: "Finance Operations",
    action: "tool.call",
    target: "stripe.refund",
    decision: "BLOCK",
    risk: "CRITICAL",
    timestamp: "12 sec ago",
  },
  {
    id: "decision-002",
    agent: "Customer Support",
    action: "llm.request",
    target: "anthropic.messages",
    decision: "ALLOW",
    risk: "LOW",
    timestamp: "24 sec ago",
  },
  {
    id: "decision-003",
    agent: "HR Assistant",
    action: "data.read",
    target: "employee_records",
    decision: "ESCALATE",
    risk: "HIGH",
    timestamp: "39 sec ago",
  },
  {
    id: "decision-004",
    agent: "Sales Copilot",
    action: "tool.call",
    target: "hubspot.create",
    decision: "ALLOW",
    risk: "LOW",
    timestamp: "51 sec ago",
  },
];