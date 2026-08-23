/**
 * Decision Repository
 *
 * Handles persistence operations
 * for runtime decisions and evaluations.
 */

import type { DecisionStorageRecord, StorageAdapter } from "../types/storage";

export class DecisionRepository {
  constructor(private readonly storage: StorageAdapter) {}

  async create(
    decision: DecisionStorageRecord,
  ): Promise<DecisionStorageRecord> {
    return this.storage.save(decision);
  }

  async get(requestId: string): Promise<DecisionStorageRecord | null> {
    return this.storage.find<DecisionStorageRecord>({
      requestId,
    });
  }

  async list(): Promise<DecisionStorageRecord[]> {
    return this.storage.list<DecisionStorageRecord>();
  }

  async findByAgent(agentId: string): Promise<DecisionStorageRecord[]> {
    const decisions = await this.storage.list<DecisionStorageRecord>();

    return decisions.filter((decision) => decision.agentId === agentId);
  }

  async remove(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }
}
