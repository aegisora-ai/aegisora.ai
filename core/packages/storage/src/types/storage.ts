/**
 * Aegisora Storage Types
 *
 * Shared contracts for persistence
 * across agents, decisions and runtime data.
 */

export type StorageProvider = "MEMORY" | "FILE" | "DATABASE";

export interface StorageRecord {
  id: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface AgentStorageRecord extends StorageRecord {
  agentId: string;

  name?: string;

  metadata?: Record<string, unknown>;
}

export interface DecisionStorageRecord extends StorageRecord {
  requestId: string;

  agentId: string;

  decision: string;

  reason: string;

  riskScore?: number;

  metadata?: Record<string, unknown>;
}

export interface StorageQuery {
  id?: string;

  agentId?: string;

  requestId?: string;
}

export interface StorageAdapter {
  save<T extends StorageRecord>(record: T): Promise<T>;

  find<T extends StorageRecord>(query: StorageQuery): Promise<T | null>;

  list<T extends StorageRecord>(): Promise<T[]>;

  delete(id: string): Promise<boolean>;
}
