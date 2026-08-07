"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    memories;
    constructor() {
        this.memories =
            new Map();
    }
    add(memory) {
        this.memories.set(memory.id, memory);
        return memory;
    }
    remove(id) {
        return this.memories.delete(id);
    }
    clear() {
        this.memories.clear();
    }
    list() {
        return Array.from(this.memories.values());
    }
    findByAgent(agentId) {
        return this.list().filter(m => m.agentId === agentId);
    }
}
exports.MemoryStore = MemoryStore;
