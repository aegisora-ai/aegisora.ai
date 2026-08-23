/**
 * Agent Repository
 *
 * Provides agent persistence operations.
 */

import type { AgentStorageRecord, StorageAdapter } from "../types/storage";

export class AgentRepository {
  constructor(private readonly storage: StorageAdapter) {}

  async create(agent: AgentStorageRecord): Promise<AgentStorageRecord> {
    return this.storage.save(agent);
  }

  async get(agentId: string): Promise<AgentStorageRecord | null> {
    return this.storage.find<AgentStorageRecord>({
      agentId,
    });
  }

  async list(): Promise<AgentStorageRecord[]> {
    return this.storage.list<AgentStorageRecord>();
  }

  async remove(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }
}
