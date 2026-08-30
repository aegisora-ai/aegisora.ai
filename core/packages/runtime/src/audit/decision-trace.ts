import type {
  EvidenceStore,
} from "@aegisora/audit";

export interface DecisionTraceProjection {
  enforcementStatus:
    | "not_executed"
    | "executed"
    | "prevented"
    | "escalated";

  executionOutcome:
    | "not_attempted"
    | "succeeded"
    | "failed";

  metadata?: Record<string, unknown>;
}

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

  /*
   * Backwards-compatible top-level lifecycle fields.
   */
  enforcementStatus?:
    | "not_executed"
    | "executed"
    | "prevented"
    | "escalated";

  executionOutcome?:
    | "not_attempted"
    | "succeeded"
    | "failed";

  /*
   * Canonical lifecycle projection.
   */
  canonical?: DecisionTraceProjection;

  /*
   * Evidence lifecycle projection.
   */
  evidence?: DecisionTraceProjection;
}

export class DecisionTraceStore {

  private traces: DecisionTrace[] = [];

  constructor(
    private readonly evidenceStore?: EvidenceStore,
  ) {}

  record(trace: DecisionTrace) {
    const enforcementStatus =
      trace.enforcementStatus ?? "not_executed";

    const executionOutcome =
      trace.executionOutcome ?? "not_attempted";

    const metadata = trace.metadata
      ? { ...trace.metadata }
      : undefined;

    this.traces.push({
      ...trace,

      enforcementStatus,
      executionOutcome,

      metadata,

      canonical: {
        enforcementStatus,
        executionOutcome,
        metadata: metadata
          ? { ...metadata }
          : undefined,
      },

      evidence: {
        enforcementStatus,
        executionOutcome,
        metadata: metadata
          ? { ...metadata }
          : undefined,
      },
    });
  }

  getAll() {
    return this.traces.map((trace) => ({
      ...trace,

      metadata: trace.metadata
        ? { ...trace.metadata }
        : undefined,

      canonical: trace.canonical
        ? {
            ...trace.canonical,
            metadata: trace.canonical.metadata
              ? { ...trace.canonical.metadata }
              : undefined,
          }
        : undefined,

      evidence: trace.evidence
        ? {
            ...trace.evidence,
            metadata: trace.evidence.metadata
              ? { ...trace.evidence.metadata }
              : undefined,
          }
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

    const executionOutcome =
      update.executionOutcome ?? "not_attempted";

    trace.enforcementStatus =
      update.enforcementStatus;

    trace.executionOutcome =
      executionOutcome;

    trace.metadata = {
      ...(trace.metadata ?? {}),
      ...(update.metadata ?? {}),
    };

    trace.canonical = {
      enforcementStatus:
        update.enforcementStatus,

      executionOutcome,

      metadata: {
        ...(trace.canonical?.metadata ?? {}),
        ...(update.metadata ?? {}),
      },
    };

    trace.evidence = {
      enforcementStatus:
        update.enforcementStatus,

      executionOutcome,

      metadata: {
        ...(trace.evidence?.metadata ?? {}),
        ...(update.metadata ?? {}),
      },
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
          executionOutcome,
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
