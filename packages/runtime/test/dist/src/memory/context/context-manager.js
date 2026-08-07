"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextManager = void 0;
class ContextManager {
    contexts;
    constructor() {
        this.contexts =
            new Map();
    }
    create(agentId, sessionId) {
        const context = {
            id: crypto.randomUUID(),
            agentId,
            sessionId,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.contexts.set(context.id, context);
        return context;
    }
    addMessage(id, message) {
        const context = this.contexts.get(id);
        if (!context) {
            throw new Error("Memory context not found");
        }
        context.messages.push(message);
        context.updatedAt =
            new Date();
        return context;
    }
    get(id) {
        const context = this.contexts.get(id);
        if (!context) {
            throw new Error("Memory context not found");
        }
        return context;
    }
    list() {
        return Array.from(this.contexts.values());
    }
}
exports.ContextManager = ContextManager;
