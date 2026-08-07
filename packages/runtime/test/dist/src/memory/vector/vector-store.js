"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorMemoryStore = void 0;
class VectorMemoryStore {
    memories;
    constructor() {
        this.memories =
            new Map();
    }
    add(memory) {
        this.memories.set(memory.id, memory);
        return memory;
    }
    list() {
        return Array.from(this.memories.values());
    }
    findByAgent(agentId) {
        return this.list()
            .filter(m => m.agentId === agentId);
    }
    clear() {
        this.memories.clear();
    }
}
exports.VectorMemoryStore = VectorMemoryStore;
