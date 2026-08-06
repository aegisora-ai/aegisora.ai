/**
 * Represents an incoming AI agent request.
 */
export interface AgentRequest {
  id: string;

  agentId: string;

  action: string;

  input: unknown;

  timestamp: Date;

  metadata?: Record<string, unknown>;
}
