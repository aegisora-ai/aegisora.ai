/**
 * Security analysis events
 */

export type SecurityEventType =
  | "THREAT_DETECTED"
  | "SECURITY_SCAN_COMPLETED"
  | "SECURITY_BLOCKED";

export interface SecurityEvent {
  id: string;

  type: SecurityEventType;

  requestId: string;

  agentId: string;

  threat?: string;

  severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  timestamp: Date;

  metadata?: Record<string, unknown>;
}
