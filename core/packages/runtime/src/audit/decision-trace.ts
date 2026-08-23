export interface DecisionTrace {
  id: string;
  agentId: string;
  action: string;

  decision:
    | "allow"
    | "block"
    | "escalate";

  reason: string;
  timestamp: Date;
  riskScore?: number;
  metadata?: Record<string, unknown>;
}

export class DecisionTraceStore {
  private traces: DecisionTrace[] = [];

  record(trace: DecisionTrace) {
    this.traces.push({
      ...trace,
      metadata: trace.metadata
        ? { ...trace.metadata }
        : undefined,
    });
  }

  getAll() {
    return [...this.traces];
  }

  getByAgent(agentId: string) {
    return this.traces.filter(
      (trace) => trace.agentId === agentId,
    );
  }
}
