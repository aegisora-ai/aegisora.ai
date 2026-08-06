import { randomUUID } from "crypto";

import { MemoryAuditStore } from "../storage/memory-store";

import type { AuditDecision, AuditEvent } from "../events/audit-event";

export interface AuditInput {
  agentId: string;

  action: string;

  decision: AuditDecision;

  riskScore: number;

  metadata?: Record<string, unknown>;
}

export class AuditLogger {
  constructor(private store = new MemoryAuditStore()) {}

  async record(input: AuditInput): Promise<AuditEvent> {
    const event: AuditEvent = {
      id: randomUUID(),

      timestamp: new Date(),

      ...input,
    };

    await this.store.save(event);

    return event;
  }

  async getEvents() {
    return this.store.list();
  }
}
