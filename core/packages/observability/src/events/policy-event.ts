/**
 * Policy evaluation events
 */

export type PolicyEventType =
  | "POLICY_CHECK_STARTED"
  | "POLICY_ALLOWED"
  | "POLICY_DENIED"
  | "POLICY_REVIEW";

export interface PolicyEvent {
  id: string;

  type: PolicyEventType;

  requestId: string;

  agentId: string;

  policyId?: string;

  decision: string;

  timestamp: Date;

  metadata?: Record<string, unknown>;
}
