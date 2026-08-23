export interface RuntimeContext {
  agentId: string;

  requestId: string;

  timestamp: Date;

  metadata?: Record<string, unknown>;
}
