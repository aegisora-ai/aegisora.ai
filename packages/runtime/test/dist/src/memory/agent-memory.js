"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentMemory = void 0;
const memory_store_1 = require("./memory-store");
class AgentMemory {
    store;
    constructor(store = new memory_store_1.MemoryStore()) {
        this.store = store;
    }
    remember(agentId, content) {
        const entry = {
            id: crypto.randomUUID(),
            agentId,
            content: typeof content === "string"
                ? content
                : JSON.stringify(content),
            createdAt: new Date()
        };
        this.store.add(entry);
        return entry;
    }
    set(id, content) {
        return this.remember("default", {
            id,
            content
        });
    }
    get(id) {
        return this.store.list()
            .find(m => m.id === id);
    }
    recall(agentId) {
        return this.store.findByAgent(agentId);
    }
    clear(agentId) {
        this.recall(agentId)
            .forEach(m => this.store.remove(m.id));
    }
    list() {
        return this.store.list();
    }
}
exports.AgentMemory = AgentMemory;
