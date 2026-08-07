"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentManager = void 0;
const agent_1 = require("../core/agent");
class AgentManager {
    agents;
    constructor() {
        this.agents =
            new Map();
    }
    /**
     * Create new autonomous agent
     */
    create(config) {
        const agent = new agent_1.Agent(config);
        this.agents.set(config.id, agent);
        return agent;
    }
    /**
     * Get agent by id
     */
    get(id) {
        const agent = this.agents.get(id);
        if (!agent) {
            throw new Error(`Agent not found: ${id}`);
        }
        return agent;
    }
    /**
     * Remove agent
     */
    remove(id) {
        return this.agents.delete(id);
    }
    /**
     * List all agents
     */
    list() {
        return Array.from(this.agents.values());
    }
    /**
     * Count agents
     */
    count() {
        return this.agents.size;
    }
}
exports.AgentManager = AgentManager;
