"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentNetwork = void 0;
class AgentNetwork {
    nodes;
    constructor() {
        this.nodes =
            new Map();
    }
    connect(profile) {
        const node = {
            profile,
            status: "online",
            connectedAt: new Date()
        };
        this.nodes.set(profile.id, node);
        return node;
    }
    disconnect(agentId) {
        return this.nodes.delete(agentId);
    }
    get(agentId) {
        const node = this.nodes.get(agentId);
        if (!node) {
            throw new Error(`Agent not connected: ${agentId}`);
        }
        return node;
    }
    list() {
        return Array.from(this.nodes.values());
    }
    setStatus(agentId, status) {
        const node = this.get(agentId);
        node.status =
            status;
        return node;
    }
}
exports.AgentNetwork = AgentNetwork;
