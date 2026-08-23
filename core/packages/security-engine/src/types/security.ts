export type ThreatSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ThreatType =
  | "PROMPT_INJECTION"
  | "PII_EXPOSURE"
  | "SUSPICIOUS_BEHAVIOR"
  | "POLICY_VIOLATION";

export interface SecurityContext {
  agentId: string;

  action: string;

  input?: unknown;
}

export interface ThreatSignal {
  type: ThreatType;

  severity: ThreatSeverity;

  description: string;

  score: number;
}

export interface SecurityAnalysis {
  riskScore: number;

  threats: ThreatSignal[];
}
