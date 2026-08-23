export type AuditDecision = "ALLOW" | "BLOCK" | "ESCALATE";

export interface AuditEvent {
  id: string;

  timestamp: Date;

  agentId: string;

  action: string;

  decision: AuditDecision;

  riskScore: number;

  metadata?: Record<string, unknown>;
}
