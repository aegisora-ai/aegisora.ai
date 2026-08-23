export interface MemoryEntry {
  id: string;

  content: string;

  createdAt: Date;

  metadata?: Record<string, unknown>;
}

export class AgentMemory {
  private memories: MemoryEntry[] = [];

  add(entry: MemoryEntry): void {
    this.memories.push(entry);
  }

  all(): MemoryEntry[] {
    return this.memories;
  }

  search(query: string): MemoryEntry[] {
    return this.memories.filter((memory) =>
      memory.content.toLowerCase().includes(query.toLowerCase()),
    );
  }

  clear(): void {
    this.memories = [];
  }
}
