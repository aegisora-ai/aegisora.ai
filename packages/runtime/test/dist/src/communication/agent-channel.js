"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentChannel = void 0;
class AgentChannel {
    bus;
    agentId;
    constructor(bus, agentId) {
        this.bus = bus;
        this.agentId = agentId;
    }
    /**
     * Receive messages
     */
    onMessage(handler) {
        this.bus.subscribe(this.agentId, handler);
    }
    /**
     * Send message
     */
    send(target, content) {
        return this.bus.send({
            id: crypto.randomUUID(),
            from: this.agentId,
            to: target,
            content,
            createdAt: new Date()
        });
    }
}
exports.AgentChannel = AgentChannel;
