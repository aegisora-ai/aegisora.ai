/**
 * Execution context used during runtime governance.
 */
export interface RuntimeContext {
  requestId: string;

  agentId: string;

  userId?: string;

  environment: "development" | "production";

  permissions?: string[];

  metadata?: Record<string, unknown>;
}
