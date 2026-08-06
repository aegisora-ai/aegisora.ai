import type { AuditEvent } from "../events/audit-event";

export class MemoryAuditStore {
  private events: AuditEvent[] = [];

  async save(event: AuditEvent): Promise<void> {
    this.events.push(event);
  }

  async list(): Promise<AuditEvent[]> {
    return this.events;
  }
}
