export type SecurityDecision = 'ALLOW' | 'BLOCK' | 'ESCALATE';
export type ExecutionState = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'BLOCKED' | 'ESCALATED' | 'FAILED';

export interface AIAgent {
  id: string;
  name: string;
  model: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'OFFLINE';
}

export interface SecurityContext {
  intent: string;
  requestedResources: string[];
  confidenceScore: number;
  riskScore: number;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  agentId: string;
  decision: SecurityDecision;
  state: ExecutionState;
  context: SecurityContext;
  enforcedPolicies: string[];
}
