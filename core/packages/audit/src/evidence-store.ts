import type {
  EvidenceRecord,
} from "@aegisora/core";

export interface EvidenceStore {
  record(
    evidence: EvidenceRecord,
  ): void;

  upsert(
    evidence: EvidenceRecord,
  ): void;

  getAll(): EvidenceRecord[];

  getById(
    evidenceId: string,
  ): EvidenceRecord | undefined;

  getByTraceId(
    traceId: string,
  ): EvidenceRecord[];

  getByDecisionId(
    decisionId: string,
  ): EvidenceRecord[];

  getByAgent(
    agentId: string,
  ): EvidenceRecord[];
}

/**
 * In-memory canonical evidence persistence.
 *
 * This is intentionally an implementation detail of the audit layer.
 * The shared EvidenceRecord contract remains owned by @aegisora/core.
 */
export class MemoryEvidenceStore
  implements EvidenceStore {

  private readonly records =
    new Map<string, EvidenceRecord>();

  private clone(
    evidence: EvidenceRecord,
  ): EvidenceRecord {
    return structuredClone(evidence);
  }

  record(
    evidence: EvidenceRecord,
  ): void {
    if (this.records.has(evidence.evidenceId)) {
      return;
    }

    this.records.set(
      evidence.evidenceId,
      this.clone(evidence),
    );
  }

  upsert(
    evidence: EvidenceRecord,
  ): void {
    this.records.set(
      evidence.evidenceId,
      this.clone(evidence),
    );
  }

  getAll(): EvidenceRecord[] {
    return Array.from(
      this.records.values(),
    ).map((record) =>
      this.clone(record),
    );
  }

  getById(
    evidenceId: string,
  ): EvidenceRecord | undefined {
    const record =
      this.records.get(evidenceId);

    return record
      ? this.clone(record)
      : undefined;
  }

  getByTraceId(
    traceId: string,
  ): EvidenceRecord[] {
    return this.getAll().filter(
      (record) =>
        record.traceId === traceId,
    );
  }

  getByDecisionId(
    decisionId: string,
  ): EvidenceRecord[] {
    return this.getAll().filter(
      (record) =>
        record.decisionId === decisionId,
    );
  }

  getByAgent(
    agentId: string,
  ): EvidenceRecord[] {
    return this.getAll().filter(
      (record) =>
        record.agentId === agentId,
    );
  }
}
