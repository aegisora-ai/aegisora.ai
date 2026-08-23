/**
 * In-memory storage adapter.
 *
 * Default lightweight storage for
 * development, testing and runtime integration.
 */

import type {
  StorageAdapter,
  StorageQuery,
  StorageRecord,
} from "../types/storage";

export class MemoryStore implements StorageAdapter {

  private records: StorageRecord[] = [];

  async save<T extends StorageRecord>(
    record: T,
  ): Promise<T> {

    const existing =
      this.records.find(
        (item) => item.id === record.id,
      );

    if (existing) {

      this.records =
        this.records.map(
          (item) =>
            item.id === record.id
              ? record
              : item,
        );

    } else {

      this.records.push(record);
    }

    return record;
  }

  async find<T extends StorageRecord>(
    query: StorageQuery,
  ): Promise<T | null> {

    const result =
      this.records.find(
        (record) => {

          if (
            query.id !== undefined &&
            record.id !== query.id
          ) {
            return false;
          }

          if (
            query.agentId !== undefined &&
            ("agentId" in record) &&
            record.agentId !== query.agentId
          ) {
            return false;
          }

          if (
            query.requestId !== undefined &&
            ("requestId" in record) &&
            record.requestId !== query.requestId
          ) {
            return false;
          }

          return true;
        },
      );

    return (result as T) ?? null;
  }

  async list<T extends StorageRecord>():
    Promise<T[]> {

    return this.records as T[];
  }

  async delete(
    id: string,
  ): Promise<boolean> {

    const before =
      this.records.length;

    this.records =
      this.records.filter(
        (item) => item.id !== id,
      );

    return (
      this.records.length < before
    );
  }

  clear(): void {
    this.records = [];
  }
}