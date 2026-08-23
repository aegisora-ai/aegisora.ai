/**
 * Trace contracts
 */

export interface TraceContext {
  traceId: string;

  requestId: string;

  agentId: string;

  startedAt: Date;

  completedAt?: Date;
}

export interface TraceSpan {
  spanId: string;

  traceId: string;

  name: string;

  startTime: Date;

  endTime?: Date;

  metadata?: Record<string, unknown>;
}
