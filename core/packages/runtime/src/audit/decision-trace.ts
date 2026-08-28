import type {
  EvidenceStore,
} from "@aegisora/audit";

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

  traceId?: string;
  decisionId?: string;
  executionId?: string;
  evidenceId?: string;

  enforcementStatus?:
    | "not_executed"
    | "executed"
    | "prevented"
    | "escalated";

  executionOutcome?:
    | "not_attempted"
    | "succeeded"
    | "failed";
}

export class DecisionTraceStore {

  private traces: DecisionTrace[] = [];

  constructor(
    private readonly evidenceStore?: EvidenceStore,
  ) {}

  record(trace: DecisionTrace) {
    this.traces.push({
      ...trace,
      metadata: trace.metadata
        ? { ...trace.metadata }
        : undefined,
    });
  }

  getAll() {
    return this.traces.map((trace) => ({
      ...trace,
      metadata: trace.metadata
        ? { ...trace.metadata }
        : undefined,
    }));
  }

  getByAgent(agentId: string) {
    return this.getAll().filter(
      (trace) => trace.agentId === agentId,
    );
  }

  finalize(
    decisionId: string,
    update: {
      enforcementStatus:
        | "not_executed"
        | "executed"
        | "prevented"
        | "escalated";

      executionOutcome?:
        | "not_attempted"
        | "succeeded"
        | "failed";

      metadata?: Record<string, unknown>;
    },
  ): boolean {

    const trace = this.traces.find(
      (item) =>
        item.decisionId === decisionId ||
        item.id === decisionId,
    );

    if (!trace) {
      return false;
    }

    trace.enforcementStatus =
      update.enforcementStatus;

    trace.executionOutcome =
      update.executionOutcome;

    trace.metadata = {
      ...(trace.metadata ?? {}),
      ...(update.metadata ?? {}),
    };

    if (
      this.evidenceStore &&
      trace.evidenceId
    ) {
      const evidence =
        this.evidenceStore.getById(
          trace.evidenceId,
        );

      if (evidence) {
        this.evidenceStore.upsert({
          ...evidence,
          enforcementStatus:
            update.enforcementStatus,
          executionOutcome:
            update.executionOutcome,
          metadata: {
            ...(evidence.metadata ?? {}),
            ...(update.metadata ?? {}),
          },
        });
      }
    }

    return true;
  }
}
