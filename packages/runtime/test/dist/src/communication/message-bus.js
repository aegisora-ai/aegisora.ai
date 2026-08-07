"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBus = void 0;
class MessageBus {
    handlers;
    constructor() {
        this.handlers =
            new Map();
    }
    /**
     * Subscribe agent
     */
    subscribe(agentId, handler) {
        const existing = this.handlers.get(agentId) ?? [];
        existing.push(handler);
        this.handlers.set(agentId, existing);
    }
    /**
     * Send message
     */
    async send(message) {
        const handlers = this.handlers.get(message.to) ?? [];
        for (const handler of handlers) {
            await handler(message);
        }
    }
    /**
     * Connected agents
     */
    agents() {
        return Array.from(this.handlers.keys());
    }
}
exports.MessageBus = MessageBus;
