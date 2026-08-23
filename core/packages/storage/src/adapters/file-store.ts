import {
  promises as fs,
} from "node:fs";

import {
  dirname,
} from "node:path";

import type {
  StorageAdapter,
  StorageQuery,
  StorageRecord,
} from "../types/storage";

export class FileStore implements StorageAdapter {

  constructor(
    private readonly filePath: string,
  ) {}

  private async readRecords():
    Promise<StorageRecord[]> {

    try {

      const raw =
        await fs.readFile(
          this.filePath,
          "utf8",
        );

      if (!raw.trim()) {
        return [];
      }

      const parsed =
        JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        throw new Error(
          "Storage file must contain an array.",
        );
      }

      return parsed.map(
        (record) => ({
          ...record,
          createdAt:
            new Date(record.createdAt),
          updatedAt:
            new Date(record.updatedAt),
        }),
      );

    } catch (error) {

      const code =
        error &&
        typeof error === "object" &&
        "code" in error
          ? String(
              (error as { code: unknown }).code,
            )
          : "";

      if (code === "ENOENT") {
        return [];
      }

      throw error;
    }
  }

  private async writeRecords(
    records: StorageRecord[],
  ): Promise<void> {

    await fs.mkdir(
      dirname(this.filePath),
      {
        recursive: true,
      },
    );

    await fs.writeFile(
      this.filePath,
      JSON.stringify(
        records,
        null,
        2,
      ),
      "utf8",
    );
  }

  async save<T extends StorageRecord>(
    record: T,
  ): Promise<T> {

    const records =
      await this.readRecords();

    const index =
      records.findIndex(
        (item) =>
          item.id === record.id,
      );

    if (index >= 0) {
      records[index] = record;
    } else {
      records.push(record);
    }

    await this.writeRecords(
      records,
    );

    return record;
  }

  async find<T extends StorageRecord>(
    query: StorageQuery,
  ): Promise<T | null> {

    const records =
      await this.readRecords();

    const result =
      records.find(
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

    return (
      (result as T) ??
      null
    );
  }

  async list<T extends StorageRecord>():
    Promise<T[]> {

    return (
      await this.readRecords()
    ) as T[];
  }

  async delete(
    id: string,
  ): Promise<boolean> {

    const records =
      await this.readRecords();

    const next =
      records.filter(
        (item) => item.id !== id,
      );

    if (
      next.length ===
      records.length
    ) {
      return false;
    }

    await this.writeRecords(
      next,
    );

    return true;
  }
}